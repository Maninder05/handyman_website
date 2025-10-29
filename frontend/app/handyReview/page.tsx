import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, MessageSquare, Calendar, User } from "lucide-react";

interface Review {
  _id: string;
  rating: number;
  comment: string;
  serviceType: string;
  createdAt: string;
  clientId?: { name: string; profilePic?: string };
  images?: string[];
}

interface Props {
  handymanId?: string;
}

const HandymanReviewSection: React.FC<Props> = ({ handymanId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [average, setAverage] = useState("0.0");
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("recent");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!handymanId) return;
    setLoading(true);
    axios
      .get(`/api/reviews/handyman/${handymanId}`, { params: { sort } })
      .then((res) => {
        setReviews(res.data.reviews || []);
        setAverage(res.data.averageRating || "0.0");
        setTotal(res.data.totalReviews || 0);
      })
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [handymanId, sort]);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }
      />
    ));

  if (!handymanId)
    return (
      <div className="p-6 bg-white rounded-lg shadow text-center text-gray-500">
        <MessageSquare className="mx-auto text-gray-300 mb-2" size={40} />
        Handyman ID missing.
      </div>
    );

  if (loading)
    return (
      <div className="p-6 bg-white rounded-lg shadow animate-pulse text-gray-400">
        Loading reviews...
      </div>
    );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">{average}</h2>
          <div className="flex">{renderStars(parseFloat(average))}</div>
          <p className="text-gray-600 text-sm">{total} total reviews</p>
        </div>
        <select
          className="border px-3 py-2 rounded text-sm"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="recent">Most Recent</option>
          <option value="highRated">Highest Rated</option>
          <option value="lowRated">Lowest Rated</option>
        </select>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center text-gray-500">
          <MessageSquare className="mx-auto mb-2 text-gray-300" size={40} />
          No reviews yet.
        </div>
      ) : (
        reviews.map((r) => (
          <div key={r._id} className="border-t pt-4 mt-4">
            <div className="flex justify-between">
              <div className="flex items-center space-x-3">
                {r.clientId?.profilePic ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`/uploads/${r.clientId.profilePic}`}
                    alt={r.clientId.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <User className="text-blue-500" />
                )}
                <div>
                  <p className="font-semibold">
                    {r.clientId?.name || "Client"}
                  </p>
                  <p className="text-sm text-gray-500">{r.serviceType}</p>
                </div>
              </div>
              <div className="text-right text-sm text-gray-500 flex items-center gap-1">
                <Calendar size={12} />
                {new Date(r.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="flex mt-1">{renderStars(r.rating)}</div>
            <p className="mt-2 text-gray-700">{r.comment}</p>
            {Array.isArray(r.images) && r.images.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {r.images.map((img, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={`/uploads/reviews/${img}`}
                    className="w-16 h-16 object-cover rounded-md border"
                    alt=""
                  />
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default HandymanReviewSection;
