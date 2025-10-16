import Job from '../models/handyJobs.js';
import HandyProfile from '../models/HandyAddProfile.js';

// Get all jobs for the logged-in handyman
export const getMyJobs = async (req, res) => {
  try {
    // Get email from JWT token that middleware attached
    const email = req.user?.email;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find all jobs where this handyman is assigned
    // Sort by newest first
    const jobs = await Job.find({ handymanEmail: email }).sort({ createdAt: -1 });
    
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all available jobs that no one has accepted yet
export const getAvailableJobs = async (req, res) => {
  try {
    // Find jobs that are still open (no handyman assigned)
    const jobs = await Job.find({ status: 'open' }).sort({ createdAt: -1 });
    
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching available jobs:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Handyman accepts a job
export const acceptJob = async (req, res) => {
  try {
    const email = req.user?.email;
    const { jobId } = req.params;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Get handyman's profile to get their name
    const profile = await HandyProfile.findOne({ email });
    if (!profile) {
      return res.status(404).json({ message: "Please create your profile first" });
    }

    // Find the job by ID
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Make sure job is still available
    if (job.status !== 'open') {
      return res.status(400).json({ message: "Job is no longer available" });
    }

    // Assign this job to the handyman
    job.handymanEmail = email;
    job.handymanName = profile.name;
    job.status = 'in_progress';
    await job.save();

    // Update handyman's profile stats
    profile.inProgress = (profile.inProgress || 0) + 1;
    profile.activeOrders = (profile.activeOrders || 0) + 1;
    await profile.save();

    res.status(200).json({
      message: "Job accepted successfully",
      job: job
    });
  } catch (err) {
    console.error("Error accepting job:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Handyman marks job as complete
export const completeJob = async (req, res) => {
  try {
    const email = req.user?.email;
    const { jobId } = req.params;
    const { hoursWorked } = req.body;
    
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Validate hours worked
    if (!hoursWorked || hoursWorked <= 0) {
      return res.status(400).json({ message: "Please provide valid hours worked" });
    }

    // Find the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Make sure this handyman owns this job
    if (job.handymanEmail !== email) {
      return res.status(403).json({ message: "This is not your job" });
    }

    // Make sure job is currently in progress
    if (job.status !== 'in_progress') {
      return res.status(400).json({ message: "Job is not in progress" });
    }

    // Calculate total payment
    const totalPayment = job.pricePerHour * hoursWorked;

    // Update the job
    job.status = 'completed';
    job.hoursWorked = hoursWorked;
    job.totalPayment = totalPayment;
    job.completedAt = new Date();
    await job.save();

    // Update handyman's profile stats
    const profile = await HandyProfile.findOne({ email });
    if (profile) {
      // Increase completed jobs count
      profile.jobsDone = (profile.jobsDone || 0) + 1;
      
      // Decrease in progress count (make sure it doesn't go below 0)
      profile.inProgress = Math.max((profile.inProgress || 1) - 1, 0);
      
      // Add to total earnings
      profile.earnings = (profile.earnings || 0) + totalPayment;
      
      // Decrease active orders count
      profile.activeOrders = Math.max((profile.activeOrders || 1) - 1, 0);
      
      // Add to recent orders list
      if (!profile.recentOrders) {
        profile.recentOrders = [];
      }
      profile.recentOrders.unshift({
        title: job.title,
        desc: `Completed for ${job.clientName} - Earned $${totalPayment}`
      });
      
      // Keep only the last 5 recent orders
      if (profile.recentOrders.length > 5) {
        profile.recentOrders = profile.recentOrders.slice(0, 5);
      }
      
      await profile.save();
    }

    res.status(200).json({
      message: "Job completed successfully",
      job: job,
      earnings: totalPayment
    });
  } catch (err) {
    console.error("Error completing job:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Customer rates a completed job
export const rateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { rating, review } = req.body;
    
    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Find the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Can only rate completed jobs
    if (job.status !== 'completed') {
      return res.status(400).json({ message: "Can only rate completed jobs" });
    }

    // Save the rating and review to the job
    job.rating = rating;
    job.review = review || null;
    await job.save();

    // Update handyman's overall rating
    const profile = await HandyProfile.findOne({ email: job.handymanEmail });
    if (profile) {
      // Get all completed jobs for this handyman that have ratings
      const completedJobs = await Job.find({
        handymanEmail: job.handymanEmail,
        status: 'completed',
        rating: { $ne: null } // $ne means "not equal" - only jobs with ratings
      });
      
      // Calculate average rating from all rated jobs
      if (completedJobs.length > 0) {
        const totalRating = completedJobs.reduce((sum, j) => sum + j.rating, 0);
        // Round to 1 decimal place
        profile.rating = Math.round((totalRating / completedJobs.length) * 10) / 10;
        await profile.save();
      }
    }

    res.status(200).json({
      message: "Rating submitted successfully",
      job: job
    });
  } catch (err) {
    console.error("Error rating job:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};