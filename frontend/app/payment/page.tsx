"use client";

import { useState } from "react";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [saveCard, setSaveCard] = useState(false);
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [paymentDate] = useState(new Date());
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setPaymentProcessed(true);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: { target: { value: string } }) => {
    const formatted = formatCardNumber(e.target.value);
    setCardDetails((prev) => ({
      ...prev,
      number: formatted,
    }));
  };

  const handlePayPalRedirect = () => {
    // In a real application, this would redirect to PayPal
    window.open("https://www.paypal.com", "_blank");
    setPaymentProcessed(true);
  };

  const handleGoToReview = () => {
    setShowReview(true);
  };

  const handleSubmitReview = () => {
    setShowSuccessModal(true);
  };

  const handleReset = () => {
    setShowReview(false);
    setPaymentProcessed(false);
    setShowSuccessModal(false);
  };

  // Star rating component
  const StarRating = () => (
    <div className="flex justify-center space-x-2 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          className={`text-3xl ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          } hover:text-yellow-500 transition-colors`}
        >
          ★
        </button>
      ))}
    </div>
  );

  // Custom modal to replace alert
  const SuccessModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm mx-4">
        <svg
          className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-6">
          Your review has been submitted successfully.
        </p>
        <button
          onClick={handleReset}
          className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
        >
          Go to Payment Page
        </button>
      </div>
    </div>
  );

  if (showReview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Leave a Review
              </h1>
              <p className="text-gray-600">
                Share your experience with our service
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Rate your experience
              </h2>
              <StarRating />
              <p className="text-center text-gray-600">{rating}/5 stars</p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Your Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-32"
                placeholder="Tell us about your experience..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowReview(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Back
              </button>
              <button
                onClick={handleSubmitReview}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                disabled={rating === 0}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
        {showSuccessModal && <SuccessModal />}
      </div>
    );
  }

  if (paymentProcessed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
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
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                THANK YOU!
              </h1>
              <p className="text-gray-600">Your Payment is Processed.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium text-black">
                  {paymentDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium text-black">
                  {paymentDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="text-xl font-bold text-green-600">$115</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleReset}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Go to Home
              </button>
              <button
                onClick={handleGoToReview}
                className="flex-1 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition"
              >
                Go to Review
              </button>
            </div>
          </div>

          <div className="bg-gray-800 text-white p-6 text-center">
            <div className="flex justify-center space-x-6 mb-4">
              {/* Social icons */}
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">f</span>
              </div>
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">t</span>
              </div>
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">i</span>
              </div>
              <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">in</span>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              © 2025 HandyPro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Make Payment
            </h1>
            <p className="text-gray-600 mb-8">
              Flexible payment options — we accept Stripe and PayPal for your
              convenience.
            </p>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                PAYMENT METHODS
              </h2>

              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 text-center font-medium ${
                    paymentMethod === "card"
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-gray-300 text-gray-700 hover:border-indigo-300"
                  }`}
                >
                  Credit / Debit Card
                </button>
                <button
                  onClick={() => setPaymentMethod("paypal")}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 text-center font-medium ${
                    paymentMethod === "paypal"
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-gray-300 text-gray-700 hover:border-indigo-300"
                  }`}
                >
                  PayPal
                </button>
              </div>

              {paymentMethod === "card" ? (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={cardDetails.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="number"
                        value={cardDetails.number}
                        onChange={handleCardNumberChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardDetails.expiry}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="123"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="saveCard"
                        checked={saveCard}
                        onChange={() => setSaveCard(!saveCard)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="saveCard"
                        className="ml-2 block text-gray-700"
                      >
                        Save this card for future payments
                      </label>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">AMOUNT TO BE PAID:</span>
                      <span className="text-xl font-bold text-indigo-700">
                        $115
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition mt-6"
                  >
                    Pay Now
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="mb-6">
                    <svg
                      className="w-16 h-16 mx-auto text-blue-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M7.2 18c-.3 0-.6-.1-.8-.4l-3.8-5c-.3-.4-.3-1 .1-1.3.4-.3 1-.3 1.3.1l3.8 5c.3.4.3 1-.1 1.3-.2.2-.4.3-.5.3zm9.6 0c-.1 0-.3 0-.5-.2-.4-.3-.4-.9-.1-1.3l3.8-5c.3-.4.9-.4 1.3-.1.4.3.4.9.1 1.3l-3.8 5c-.2.3-.5.4-.8.4zm-11.1-5c-.3 0-.6-.1-.8-.4-.3-.4-.3-1 .1-1.3l8-6c.4-.3 1-.3 1.3.1.3.4.3 1-.1 1.3l-8 6c-.2.2-.4.3-.5.3zm14 0c-.1 0-.3 0-.5-.2l-8-6c-.4-.3-.4-.9-.1-1.3.3-.4.9-.4 1.3-.1l8 6c.4.3.4.9.1 1.3-.2.3-.5.4-.8.4z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-6">
                    You will be redirected to PayPal to complete your payment.
                  </p>
                  <button
                    onClick={handlePayPalRedirect}
                    className="w-full py-3 bg-yellow-400 text-black rounded-lg font-medium hover:bg-yellow-500 transition flex items-center justify-center"
                  >
                    <svg
                      className="w-6 h-6 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M7.2 18c-.3 0-.6-.1-.8-.4l-3.8-5c-.3-.4-.3-1 .1-1.3.4-.3 1-.3 1.3.1l3.8 5c.3.4.3 1-.1 1.3-.2.2-.4.3-.5.3zm9.6 0c-.1 0-.3 0-.5-.2-.4-.3-.4-.9-.1-1.3l3.8-5c.3-.4.9-.4 1.3-.1.4.3.4.9.1 1.3l-3.8 5c-.2.3-.5.4-.8.4zm-11.1-5c-.3 0-.6-.1-.8-.4-.3-.4-.3-1 .1-1.3l8-6c.4-.3 1-.3 1.3.1.3.4.3 1-.1 1.3l-8 6c-.2.2-.4.3-.5.3zm14 0c-.1 0-.3 0-.5-.2l-8-6c-.4-.3-.4-.9-.1-1.3.3-.4.9-.4 1.3-.1l8 6c.4.3.4.9.1 1.3-.2.3-.5.4-.8.4z" />
                    </svg>
                    Continue to PayPal
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="md:w-1/2 bg-indigo-50 p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4 p-3 bg-white rounded-lg">
                  <div>
                    <h3 className="font-medium text-black">Handyman Service</h3>
                    <p className="text-sm text-gray-600">
                      Basic plumbing repair
                    </p>
                  </div>
                  <span className="font-bold text-black">$85</span>
                </div>

                <div className="flex justify-between items-center mb-4 p-3 bg-white rounded-lg">
                  <div>
                    <h3 className="font-medium text-black">Materials Fee</h3>
                    <p className="text-sm text-gray-600">Parts and supplies</p>
                  </div>
                  <span className="font-bold text-black">$30</span>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="font-medium text-black">$115</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Tax:</span>
                  <span className="font-medium text-black">$0</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700">Service Fee:</span>
                  <span className="font-medium text-black">$0</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-300">
                  <span className="text-lg font-bold text-gray-800">
                    Total:
                  </span>
                  <span className="text-lg font-bold text-indigo-700">
                    $115
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Why choose us?
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
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
                  <span className="text-black">Secure payment processing</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
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
                  <span className="text-black">Money-back guarantee</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
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
                  <span className="text-black">24/7 customer support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 text-white p-6 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            {/* Social icons */}
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">f</span>
            </div>
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">t</span>
            </div>
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">i</span>
            </div>
            <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">in</span>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            © 2025 HandyPro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
