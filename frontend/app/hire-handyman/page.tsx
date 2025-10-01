"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiHome,
  FiMessageCircle,
  FiBell,
  FiSettings,
  FiUser,
} from "react-icons/fi";

export default function HandymanBooking() {
  const router = useRouter();
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
    { id: "kenji", name: "Kenji Teneka", rating: "5.0", reviews: "13 reviews", price: 55 },
    { id: "michael", name: "Michael Johnson", rating: "4.8", reviews: "8 reviews", price: 50 },
    { id: "sarah", name: "Sarah Williams", rating: "4.9", reviews: "11 reviews", price: 60 },
  ];

  const selectedHandymanObj = handymen.find(h => h.id === selectedHandyman);
  const totalPrice = selectedHandymanObj ? selectedHandymanObj.price * parseInt(selectedHours) : 0;

  const handleConfirm = () => {
    setIsConfirmed(true);
    setTimeout(() => setIsConfirmed(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#FFCC66] to-[#FF7E5F] shadow-md text-center py-3 px-6">
        <h1 className="text-xl font-bold text-gray-900">HandyPro Booking</h1>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">

          {/* HANDYMAN SELECTION */}
          <div className="bg-gray-800 rounded-xl shadow p-6 w-full h-full flex flex-col">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">Select Handyman</h3>
            <div className="flex-1 overflow-y-auto space-y-3">
              {handymen.map(h => (
                <div
                  key={h.id}
                  onClick={() => setSelectedHandyman(h.id)}
                  className={`p-4 rounded-lg border transition cursor-pointer ${
                    selectedHandyman === h.id
                      ? "border-[#FFCC66] bg-gray-700"
                      : "border-gray-600 hover:border-[#FFCC66]"
                  }`}
                >
                  <p className="font-bold text-yellow-400">{h.name}</p>
                  <p className="text-sm text-gray-300">⭐ {h.rating} · {h.reviews}</p>
                  <p className="mt-1 font-semibold">${h.price}/hr</p>
                </div>
              ))}
            </div>
          </div>

          {/* DATE, HOURS & SUMMARY */}
          <div className="bg-gray-800 rounded-xl shadow p-6 w-full h-full flex flex-col justify-between space-y-5">

            <div className="space-y-5 flex-1 overflow-y-auto">
              {/* DATE SELECTION */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Select Date</h3>
                <div className="grid grid-cols-7 gap-2">
                  {dates.map((d, i) => (
                    <button
                      key={i}
                      className={`py-2 rounded-lg text-sm transition ${
                        selectedDate === d.date
                          ? "bg-gradient-to-r from-[#FFCC66] to-[#FF7E5F] text-gray-900"
                          : "bg-gray-700 text-gray-100 hover:bg-gradient-to-r hover:from-[#FFCC66] hover:to-[#FF7E5F] hover:text-gray-900"
                      }`}
                      onClick={() => setSelectedDate(d.date)}
                    >
                      <div>{d.day}</div>
                      <div className="font-bold">{d.date}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* HOURS SELECTION */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Select Hours</h3>
                <select
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFCC66]"
                  value={selectedHours}
                  onChange={e => setSelectedHours(e.target.value)}
                >
                  {hoursOptions.map(h => (
                    <option key={h} value={h}>{h} hour{h !== "1" ? "s" : ""}</option>
                  ))}
                </select>
              </div>

              {/* BOOKING SUMMARY */}
              <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">Booking Summary</h3>
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>Handyman</span><span>{selectedHandymanObj?.name}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>Hourly Rate</span><span>${selectedHandymanObj?.price}.00</span>
                </div>
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>Duration</span><span>{selectedHours} hour{selectedHours !== "1" ? "s" : ""}</span>
                </div>
                <div className="border-t border-gray-600 my-2"></div>
                <div className="flex justify-between font-semibold text-yellow-400">
                  <span>Total</span><span>${totalPrice}.00</span>
                </div>
              </div>
            </div>

            {/* CONFIRM BUTTON */}
            <button
              className="w-full bg-gradient-to-r from-[#FFCC66] to-[#FF7E5F] text-gray-900 font-semibold py-3 rounded-lg hover:opacity-90 transition mt-2"
              onClick={handleConfirm}
            >
              Confirm Booking
            </button>
          </div>

        </div>
      </main>

      {/* FOOTER NAVIGATION */}
      <footer className="bg-gray-800 flex justify-around items-center h-14 text-gray-300">
        <button onClick={() => router.push("/")} className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"><FiHome size={20}/> Home</button>
        <button onClick={() => router.push("/messages")} className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"><FiMessageCircle size={20}/> Messages</button>
        <button onClick={() => router.push("/portfolio")} className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"><FiUser size={20}/> Profile</button>
        <button onClick={() => router.push("/notifications")} className="flex flex-col items-center gap-1 hover:text-yellow-400 transition relative"><FiBell size={20}/> <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span></button>
        <button onClick={() => router.push("/settings")} className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"><FiSettings size={20}/> Settings</button>
      </footer>

      {/* CONFIRMATION MODAL */}
      {isConfirmed && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-sm mx-auto text-gray-100 text-center">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">Booking Confirmed!</h3>
            <p className="mb-4">
              Your booking with {selectedHandymanObj?.name} has been confirmed for {selectedHours} hour{selectedHours !== "1" ? "s" : ""}.
            </p>
            <button className="bg-gradient-to-r from-[#FFCC66] to-[#FF7E5F] text-gray-900 font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition" onClick={() => setIsConfirmed(false)}>OK</button>
          </div>
        </div>
      )}

    </div>
  );
}
