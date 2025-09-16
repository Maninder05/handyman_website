// pages/review.js (for Pages Router) or app/review/page.js (for App Router)
"use client";

import { useState } from "react";

export default function SellerReview() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log({ rating, feedback, recommendation });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-green-200">
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
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
              className="px-8 py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition text-lg"
            >
              Submit Another Review
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Green Header */}
      <header className="bg-green-800 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">HandyPro</h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="hover:text-green-200 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-200 transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-200 transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-200 transition">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <button className="md:hidden text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-green-200">
          <div className="md:flex">
            {/* Service Details Section */}
            <div className="md:w-2/5 bg-green-50 p-8 border-r border-green-200">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-green-800 mb-2">
                  Seller Review
                </h1>
                <div className="h-1 w-20 bg-green-600 mx-auto mb-4"></div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Electrical Repair Service
                </h2>
                <p className="text-gray-600 mb-2">Provided by</p>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-800 font-bold">KT</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Kenji Tomeka</p>
                    <p className="text-sm text-gray-600">
                      Licensed Electrician
                    </p>
                  </div>
                </div>
                <p className="text-green-700 font-medium text-lg mb-6">
                  $85.00 / hour
                </p>

                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="flex items-center mb-3">
                    <svg
                      className="w-5 h-5 text-green-700 mr-2"
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
                      className="w-5 h-5 text-green-700 mr-2"
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
                  <div className="bg-white p-3 rounded-lg border border-green-200 text-center">
                    <p className="text-2xl font-bold text-green-700">4.8</p>
                    <p className="text-xs text-gray-600">Average Rating</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-green-200 text-center">
                    <p className="text-2xl font-bold text-green-700">127</p>
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
                  <label className="block text-gray-800 mb-4 text-lg font-medium">
                    How would you rate this service?
                  </label>
                  <div className="flex space-x-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-4xl ${
                          star <= rating ? "text-yellow-500" : "text-gray-300"
                        } hover:text-yellow-600 transition-colors`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <p className="text-center text-gray-800 text-lg mt-3 font-medium">
                    {rating}/5 stars
                  </p>
                </div>

                <div className="mb-8">
                  <label className="block text-gray-800 mb-3 text-lg font-medium">
                    Your Feedback
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent h-40 text-gray-900 placeholder-gray-600"
                    placeholder="Please share details about your experience with this service. What did you like? What could be improved?"
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-gray-800 mb-3 text-lg font-medium">
                    Would you recommend this service to others?
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setRecommendation(true)}
                      className={`px-6 py-3 rounded-lg font-medium transition ${
                        recommendation === true
                          ? "bg-green-700 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setRecommendation(false)}
                      className={`px-6 py-3 rounded-lg font-medium transition ${
                        recommendation === false
                          ? "bg-green-700 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-green-700 text-white rounded-lg font-medium text-lg hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!rating || !feedback || recommendation === null}
              >
                SUBMIT REVIEW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Green Footer */}
      <footer className="bg-green-800 text-white py-6 px-6 mt-8">
        <div className="container mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">HandyPro</h3>
              <p className="text-green-200">Quality home services</p>
            </div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="hover:text-green-200 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-green-200 transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-green-200 transition">
                Contact Us
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-200 transition">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="hover:text-green-200 transition">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#" className="hover:text-green-200 transition">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="border-t border-green-700 mt-6 pt-6">
            <p className="text-sm text-green-200">
              © 2025 HandyPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
