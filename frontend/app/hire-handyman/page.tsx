"use client";

import { useState } from "react";

export default function HandymanBooking() {
  const [selectedDate, setSelectedDate] = useState("25");
  const [selectedHours, setSelectedHours] = useState("1");
  const [selectedHandyman, setSelectedHandyman] = useState("kenji");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const dates = [
    { day: "MON", date: "21" },
    { day: "TUE", date: "22" },
    { day: "WED", date: "23" },
    { day: "THU", date: "24" },
    { day: "FRI", date: "25" },
    { day: "SAT", date: "26" },
    { day: "SUN", date: "27" },
  ];

  const hoursOptions = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const handymen = [
    {
      id: "kenji",
      name: "Kenji Teneka",
      initials: "KT",
      rating: "5.0",
      reviews: "13 reviews",
      price: 55,
      color: "bg-teal-500",
    },
    {
      id: "michael",
      name: "Michael Johnson",
      initials: "MJ",
      rating: "4.8",
      reviews: "8 reviews",
      price: 50,
      color: "bg-teal-600",
    },
    {
      id: "sarah",
      name: "Sarah Williams",
      initials: "SW",
      rating: "4.9",
      reviews: "11 reviews",
      price: 60,
      color: "bg-teal-400",
    },
  ];

  const handleConfirm = () => {
    setIsConfirmed(true);
    setTimeout(() => setIsConfirmed(false), 3000);
  };

  const selectedHandymanObj = handymen.find((h) => h.id === selectedHandyman);
  const totalPrice = selectedHandymanObj
    ? selectedHandymanObj.price * parseInt(selectedHours)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-teal-600 text-white p-6 text-center">
          <h1 className="text-2xl font-bold">HandyPro Booking</h1>
          <p className="text-teal-100 mt-2">
            Book your handyman service in just a few clicks
          </p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Handyman Selection */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              SELECT HANDYMAN
            </h3>
            <div className="space-y-4">
              {handymen.map((handyman) => (
                <div
                  key={handyman.id}
                  className={`p-4 border-2 rounded-xl flex items-center gap-4 cursor-pointer transition ${
                    selectedHandyman === handyman.id
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedHandyman(handyman.id)}
                >
                  <div
                    className={`w-16 h-16 ${handyman.color} rounded-xl flex items-center justify-center text-white text-xl font-bold`}
                  >
                    {handyman.initials}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{handyman.name}</h4>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500 font-bold mr-1">
                        {handyman.rating}
                      </span>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm ml-2">
                        {handyman.reviews}
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="text-gray-700 font-bold">
                        ${handyman.price} CAD/hr
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date & Time Selection */}
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                SELECT DATE
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {dates.map((item, index) => (
                  <button
                    key={index}
                    className={`py-3 rounded-lg text-center transition ${
                      selectedDate === item.date
                        ? "bg-teal-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-teal-100"
                    }`}
                    onClick={() => setSelectedDate(item.date)}
                  >
                    <div
                      className={`text-xs font-medium ${
                        selectedDate === item.date
                          ? "text-teal-100"
                          : "text-gray-500"
                      }`}
                    >
                      {item.day}
                    </div>
                    <div className="font-semibold text-lg">{item.date}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                SELECT HOURS
              </h3>
              <div className="relative">
                <select
                  className="w-full bg-white border border-gray-300 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={selectedHours}
                  onChange={(e) => setSelectedHours(e.target.value)}
                >
                  {hoursOptions.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour} hour{hour !== "1" ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-teal-50 p-5 rounded-xl mb-6">
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                Booking Summary
              </h3>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Handyman</span>
                <span>{selectedHandymanObj?.name}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Hourly Rate</span>
                <span>${selectedHandymanObj?.price}.00</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Duration</span>
                <span>
                  {selectedHours} hour{selectedHours !== "1" ? "s" : ""}
                </span>
              </div>
              <div className="border-t border-gray-300 my-3"></div>
              <div className="flex justify-between font-semibold text-gray-800 text-lg">
                <span>Total</span>
                <span>${totalPrice}.00</span>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              className="w-full bg-teal-600 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center hover:bg-teal-700 transition text-lg"
              onClick={handleConfirm}
            >
              Confirm Booking
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {isConfirmed && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm mx-auto">
              <div className="text-center">
                <svg
                  className="w-16 h-16 text-green-500 mx-auto mb-4"
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
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Booking Confirmed!
                </h3>
                <p className="text-gray-600 mb-4">
                  Your booking with {selectedHandymanObj?.name} has been
                  confirmed for {selectedHours} hour
                  {selectedHours !== "1" ? "s" : ""}.
                </p>
                <button
                  className="bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-teal-700 transition"
                  onClick={() => setIsConfirmed(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
