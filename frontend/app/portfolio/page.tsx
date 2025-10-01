"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FiHome,
  FiMessageCircle,
  FiHelpCircle,
  FiBell,
  FiSettings,
  FiUser,
} from "react-icons/fi";

export default function PortfolioPage() {
  const router = useRouter();
  const [isBuyer, setIsBuyer] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col text-gray-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#FFCC66] to-[#FF7E5F] shadow-md relative">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-extrabold text-gray-900 tracking-wide">
            Handyman Portfolio
          </h1>
          <button
            className="p-2 rounded-full hover:bg-yellow-500 transition"
            onClick={() => router.push("/handyAccount")}
          >
            <FiUser size={20} className="text-gray-900" />
          </button>
        </div>
      </header>

      {/* PROFILE SECTION */}
      <main className="flex-1 overflow-y-auto">
        <section className="bg-gray-700 text-white py-8">
          <div className="flex flex-col items-center">
            <img
              src="/images/kenji.jpg"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-lg object-cover"
            />
            <h2 className="text-lg font-bold mt-3 text-yellow-400">
              Kenji Teneka
            </h2>
            <p className="text-xs text-gray-300">kenjiteneka@gmail.com</p>

            {/* stats */}
            <div className="flex justify-center gap-6 mt-4 text-gray-100 text-sm">
              <div>
                <p className="text-base font-bold">15</p>
                <p>Jobs Done</p>
              </div>
              <div>
                <p className="text-base font-bold">3</p>
                <p>In Progress</p>
              </div>
              <div>
                <p className="text-base font-bold">5.0 ⭐</p>
                <p>Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT CARDS */}
        <section className="px-4 py-6 space-y-6">
          {/* Switch */}
          <div className="bg-gray-800 rounded-lg shadow p-4 flex items-center justify-between">
            <span className="font-medium text-yellow-400">
              Switch To Buyer Mode
            </span>
            <button
              onClick={() => {
                setIsBuyer(!isBuyer);
                if (!isBuyer) router.push("/clientDashboard");
              }}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                isBuyer ? "bg-yellow-500" : "bg-gray-600"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transform ${
                  isBuyer ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Earnings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg shadow p-4 text-center">
              <p className="text-lg font-bold text-yellow-400">$800</p>
              <p className="text-xs text-gray-300">This Month</p>
            </div>
            <div className="bg-gray-800 rounded-lg shadow p-4 text-center">
              <p className="text-lg font-bold text-yellow-400">3</p>
              <p className="text-xs text-gray-300">Active Orders</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-gray-800 rounded-lg shadow p-4">
            <h3 className="font-semibold mb-3 text-yellow-400 text-sm">
              Recent Orders
            </h3>
            <div className="p-3 border rounded-lg hover:shadow transition">
              <p className="font-bold text-yellow-400 text-sm">
                ELECTRICAL REPAIR 👨‍🔧
              </p>
              <p className="text-xs text-gray-300">
                John Patronsky booked this service recently.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-gray-300">
        <div className="flex justify-around py-3 text-xs">
          <button
            onClick={() => router.push("/")}
            className="flex flex-col items-center gap-0.5 hover:text-yellow-400 transition"
          >
            <FiHome size={18} /> Home
          </button>
          <button
            onClick={() => router.push("/messages")}
            className="flex flex-col items-center gap-0.5 hover:text-yellow-400 transition"
          >
            <FiMessageCircle size={18} /> Messages
          </button>
          <button
            onClick={() => router.push("/portfolio")}
            className="flex flex-col items-center gap-0.5 hover:text-yellow-400 transition"
          >
            <FiUser size={18} /> Portfolio
          </button>
          <button
            onClick={() => router.push("/notifications")}
            className="relative flex flex-col items-center gap-0.5 hover:text-yellow-400 transition"
          >
            <FiBell size={18} /> Notifications
            <span className="absolute top-0 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={() => router.push("/settings")}
            className="flex flex-col items-center gap-0.5 hover:text-yellow-400 transition"
          >
            <FiSettings size={18} /> Settings
          </button>
        </div>
      </footer>
    </div>
  );
}
