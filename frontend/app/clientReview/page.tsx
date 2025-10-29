import React, { useState, useRef } from "react";
import axios from "axios";
import { Star, Upload, X, Send } from "lucide-react";

type Job = {
  handymanId: string;
  _id: string;
  serviceType: string;
};

interface ClientReviewFormProps {
  job: Job;
  onCancel: () => void;
  onReviewSubmitted?: () => void;
}

const ClientReviewForm: React.FC<ClientReviewFormProps> = ({
  job,
  onCancel,
  onReviewSubmitted,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 5 - images.length);
    setImages((prev) => [...prev, ...files]);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1 || comment.trim().length < 10)
      return setError("Please give at least 1 star and 10+ characters.");

    setLoading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("handymanId", job.handymanId);
      form.append("jobId", job._id);
      form.append("serviceType", job.serviceType);
      form.append("rating", rating.toString());
      form.append("comment", comment);
      images.forEach((f) => form.append("images", f));

      const token = localStorage.getItem("token");
      await axios.post("/api/reviews", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onReviewSubmitted?.();
    } catch {
      setError("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl mx-auto"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-xl">Write a Review</h2>
        <button type="button" onClick={onCancel}>
          <X />
        </button>
      </div>

      <div>
        <p className="font-medium mb-1">Rating</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={28}
              className={
                i <= rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }
              onClick={() => setRating(i)}
            />
          ))}
        </div>
      </div>

      <textarea
        className="w-full border rounded p-2 text-sm"
        rows={4}
        placeholder="Share your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="flex flex-wrap gap-3">
        {images.map((img, i) => (
          <div key={i} className="relative">
            <img
              src={URL.createObjectURL(img)}
              alt=""
              className="w-16 h-16 object-cover rounded border"
            />
            <button
              type="button"
              onClick={() => setImages(images.filter((_, x) => x !== i))}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        {images.length < 5 && (
          <label className="border-2 border-dashed rounded w-16 h-16 flex flex-col items-center justify-center cursor-pointer">
            <Upload size={18} />
            <input
              type="file"
              ref={fileRef}
              onChange={handleUpload}
              className="hidden"
              accept="image/*"
              multiple
            />
          </label>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center"
      >
        {loading ? (
          "Submitting..."
        ) : (
          <>
            <Send className="mr-2" /> Submit
          </>
        )}
      </button>
    </form>
  );
};

export default ClientReviewForm;
