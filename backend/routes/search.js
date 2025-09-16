import { Router } from 'express';
import Handyman from '../models/Handyman.js';

const router = Router();

const escRegex = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

router.post('/search', async (req, res) => {
  try {
    const {
      services,
      city,
      minRate,
      maxRate,
      minRating,
      start,
      end,
      sort = 'rating',
      page = 1,
      limit: rawLimit = 12,
    } = req.body || {};

    const limit = Math.min(Math.max(parseInt(rawLimit || 12, 10), 1), 100);
    const skip = (Math.max(parseInt(page || 1, 10), 1) - 1) * limit;

    // basic validation (minimal)
    if ((start && !end) || (!start && end)) {
      return res.status(400).json({ error: { message: 'Provide both start and end for availability filtering.' } });
    }
    let startDate = null, endDate = null;
    if (start && end) {
      startDate = new Date(start);
      endDate = new Date(end);
      if (isNaN(startDate) || isNaN(endDate)) {
        return res.status(400).json({ error: { message: 'Invalid start/end datetime.' } });
      }
      if (startDate >= endDate) {
        return res.status(400).json({ error: { message: '`start` must be earlier than `end`.' } });
      }
    }

    // $match
    const match = {};
    if (Array.isArray(services) && services.length) {
      match.services = { $all: services.map(s => String(s).toLowerCase()) };
    }
    if (typeof minRate === 'number' || typeof maxRate === 'number') {
      match.hourlyRate = {};
      if (typeof minRate === 'number') match.hourlyRate.$gte = minRate;
      if (typeof maxRate === 'number') match.hourlyRate.$lte = maxRate;
    }
    if (typeof minRating === 'number') {
      match.ratingAvg = { $gte: minRating };
    }
    if (city) {
      match.city = { $regex: new RegExp(`^${escRegex(city)}$`, 'i') };
    }

    // sort
    let sortStage = { ratingAvg: -1, hourlyRate: 1 }; // default "rating"
    if (sort === 'rate_asc') sortStage = { hourlyRate: 1 };
    if (sort === 'rate_desc') sortStage = { hourlyRate: -1 };

    // pipeline
    const pipeline = [{ $match: match }];

    if (startDate && endDate) {
      pipeline.push(
        {
          $lookup: {
            from: 'bookings',
            let: { hId: '$_id', reqStart: startDate, reqEnd: endDate },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$handymanId', '$$hId'] },
                      { $in: ['$status', ['pending', 'confirmed']] },
                      { $lt: ['$start', '$$reqEnd'] },
                      { $gt: ['$end', '$$reqStart'] },
                    ],
                  },
                },
              },
            ],
            as: 'conflicts',
          },
        },
        { $match: { $expr: { $eq: [{ $size: '$conflicts' }, 0] } } }
      );
    }

    // total
    const countRes = await Handyman.aggregate([...pipeline, { $count: 'total' }]);
    const total = countRes[0]?.total || 0;

    // results
    const results = await Handyman.aggregate([
      ...pipeline,
      { $sort: sortStage },
      { $skip: skip },
      { $limit: limit },
      { $project: { conflicts: 0, __v: 0, createdAt: 0, updatedAt: 0 } },
    ]);

    const totalPages = Math.max(Math.ceil(total / limit), 1);

    return res.json({ page: Math.floor(skip / limit) + 1, limit, total, totalPages, results });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: { message: 'Internal server error.' } });
  }
});

export default router;
