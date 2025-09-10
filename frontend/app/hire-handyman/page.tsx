"use client";

import { useState } from "react";

export default function HandymanBooking() {
  const [selectedDate, setSelectedDate] = useState("25");
  const [selectedHours, setSelectedHours] = useState("1");
  const [selectedHandyman, setSelectedHandyman] = useState("kenji");
  const [showMenu, setShowMenu] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

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

  const menuItems = [
    { icon: "eye", text: "View Services", color: "text-teal-500" },
    { icon: "calendar-check", text: "Book Services", color: "text-green-500" },
    {
      icon: "map-marker-alt",
      text: "Track Bookings",
      color: "text-purple-500",
    },
    { icon: "crown", text: "Membership Plan", color: "text-yellow-500" },
    { icon: "question-circle", text: "FAQs", color: "text-indigo-500" },
    { icon: "user-cog", text: "Account Settings", color: "text-gray-500" },
  ];

  const handleConfirm = () => {
    setIsConfirmed(true);
    setTimeout(() => setIsConfirmed(false), 3000);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "eye":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        );
      case "calendar-check":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        );
      case "map-marker-alt":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        );
      case "crown":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        );
      case "question-circle":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "user-cog":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const selectedHandymanObj = handymen.find((h) => h.id === selectedHandyman);
  const totalPrice = selectedHandymanObj
    ? selectedHandymanObj.price * parseInt(selectedHours)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-teal-600 text-white p-6 rounded-b-2xl">
          <div className="flex justify-between items-center mb-4">
            <button className="text-white p-2 rounded-full hover:bg-teal-700 transition">
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-bold">HandyPro</h1>
            <div className="relative">
              <button
                className="text-white p-2 rounded-full hover:bg-teal-700 transition"
                onClick={() => setShowMenu(!showMenu)}
              >
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
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {menuItems.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className={`flex items-center px-4 py-2 text-sm hover:bg-gray-100 ${item.color}`}
                    >
                      {getIcon(item.icon)}
                      <span className="ml-2 text-gray-700">{item.text}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          <p className="text-center text-teal-100">
            Your perfect handyman is just a click away — choose and book now!
          </p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        [{handyman.reviews}]
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="text-gray-700 font-bold">
                        ${handyman.price} CAD/hr
                      </span>
                    </div>
                  </div>
                  <button
                    className={`py-2 px-4 rounded-lg font-semibold ${
                      selectedHandyman === handyman.id
                        ? "bg-teal-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-teal-600 hover:text-white"
                    }`}
                    onClick={() => setSelectedHandyman(handyman.id)}
                  >
                    {selectedHandyman === handyman.id ? "Chosen" : "Choose"}
                  </button>
                </div>
              ))}
            </div>
          </div>

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
                SELECT HOURS{" "}
                <span className="text-sm font-normal text-gray-500">
                  (of service you need)
                </span>
              </h3>
              <div className="relative">
                <select
                  className="w-full bg-white border border-gray-300 rounded-xl py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={selectedHours}
                  onChange={(e) => setSelectedHours(e.target.value)}
                >
                  {hoursOptions.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour} hr
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 p-5 rounded-xl mb-6">
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                Service Summary
              </h3>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Handyman Service</span>
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

            <button
              className="w-full bg-teal-600 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center hover:bg-teal-700 transition text-lg"
              onClick={handleConfirm}
            >
              Confirm Booking
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="bg-white border-t border-gray-200 p-4 rounded-t-2xl mt-6">
          <div className="flex justify-center items-center space-x-10">
            <button
              className={`flex flex-col items-center p-2 rounded-lg transition ${
                activeTab === "home"
                  ? "text-teal-600"
                  : "text-gray-500 hover:text-teal-600"
              }`}
              onClick={() => setActiveTab("home")}
            >
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-xs mt-1">Home</span>
            </button>
            <button
              className={`flex flex-col items-center p-2 rounded-lg transition ${
                activeTab === "chat"
                  ? "text-teal-600"
                  : "text-gray-500 hover:text-teal-600"
              }`}
              onClick={() => setActiveTab("chat")}
            >
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="text-xs mt-1">Chat</span>
            </button>
            <button
              className={`flex flex-col items-center p-2 rounded-lg transition ${
                activeTab === "services"
                  ? "text-teal-600"
                  : "text-gray-500 hover:text-teal-600"
              }`}
              onClick={() => setActiveTab("services")}
            >
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-xs mt-1">Services</span>
            </button>
            <button
              className={`flex flex-col items-center p-2 rounded-lg transition ${
                activeTab === "notifications"
                  ? "text-teal-600"
                  : "text-gray-500 hover:text-teal-600"
              }`}
              onClick={() => setActiveTab("notifications")}
            >
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="text-xs mt-1">Notifications</span>
            </button>
          </div>
        </div>

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
                  Your booking with {selectedHandymanObj?.name} for{" "}
                  {selectedDate}th (
                  {dates.find((d) => d.date === selectedDate)?.day}) for{" "}
                  {selectedHours} hour{selectedHours !== "1" ? "s" : ""} has
                  been confirmed.
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
