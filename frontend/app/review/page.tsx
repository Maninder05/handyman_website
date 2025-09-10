// pages/review.js (for Pages Router) or app/review/page.js (for App Router)
"use client";

import { useState } from "react";

export default function SellerReview() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, feedback });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Thank You!
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Your feedback has been submitted successfully.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition text-lg"
            >
              Submit Another Review
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Service Details Section */}
          <div className="md:w-2/5 bg-indigo-50 p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-indigo-800 mb-2">
                Seller Review
              </h1>
              <div className="h-1 w-20 bg-indigo-600 mx-auto mb-4"></div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Electrical Repair Service
              </h2>
              <p className="text-gray-600 mb-2">Provided by</p>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-bold">KT</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Kenji Tomeka</p>
                  <p className="text-sm text-gray-600">Licensed Electrician</p>
                </div>
              </div>
              <p className="text-indigo-600 font-medium text-lg mb-6">
                $85.00 / hour
              </p>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <svg
                    className="w-5 h-5 text-indigo-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-700">kenjiteneka@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-indigo-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-gray-700">+1 (587)-XXX-XXXX</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Service Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <p className="text-2xl font-bold text-indigo-600">4.8</p>
                  <p className="text-xs text-gray-600">Average Rating</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <p className="text-2xl font-bold text-indigo-600">127</p>
                  <p className="text-xs text-gray-600">Jobs Completed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Form Section */}
          <div className="md:w-3/5 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Share Your Experience
              </h2>
              <p className="text-gray-600">
                Your feedback helps us improve our services
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Rate Your Experience
              </h3>

              <div className="mb-8">
                <label className="block text-gray-700 mb-4 text-lg">
                  How would you rate this service?
                </label>
                <div className="flex space-x-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-4xl ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      } hover:text-yellow-500 transition-colors`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <p className="text-center text-gray-600 text-lg mt-3">
                  {rating}/5 stars
                </p>
              </div>

              <div className="mb-8">
                <label className="block text-gray-700 mb-3 text-lg">
                  Your Feedback
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-40"
                  placeholder="Please share details about your experience with this service. What did you like? What could be improved?"
                />
              </div>

              <div className="mb-8">
                <label className="block text-gray-700 mb-3 text-lg">
                  Would you recommend this service to others?
                </label>
                <div className="flex space-x-4">
                  <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition">
                    Yes
                  </button>
                  <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition">
                    No
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-indigo-600 text-white rounded-lg font-medium text-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!rating || !feedback}
            >
              SUBMIT REVIEW
            </button>
          </div>
        </div>

        <div className="bg-gray-800 text-white p-6 text-center">
          <p className="text-sm text-gray-400">
            © 2025 HandyPro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
