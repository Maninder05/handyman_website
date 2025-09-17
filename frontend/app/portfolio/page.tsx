"use client";
//Prompt: Add Comments in the code , Reference: chatgpt.com
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bell, Home, MessageCircle, Settings, Users } from "lucide-react";

export default function PortfolioPage() {
  const router = useRouter();
  const [isBuyer, setIsBuyer] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-cyan-500 p-6 relative">
        {/* Menu Button */}
        <button className="absolute right-4 top-6 text-white text-3xl">☰</button>

        {/* Profile Info */}
        <div className="flex flex-col items-center mt-6">
          <img src="../images/kenji.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white shadow-md"
          />
          <h2 className="text-lg font-bold text-black mt-3">Kenji Teneka</h2>
          <p className="text-sm text-black">kenjiteneka@gmail.com</p>
        </div>

        {/* Stats */}
        <div className="flex justify-around text-center mt-6 mb-1 text-black font-semibold">
          <div>
            <p className="text-xl">15</p>
            <p className="text-sm">Job Done</p>
          </div>
          <div>
            <p className="text-xl">3</p>
            <p className="text-sm">Job In Progress</p>
          </div>
          <div>
            <p className="text-xl">5 ⭐</p>
            <p className="text-sm">Rating</p>
          </div>
        </div>
      </div>

      {/* Switch to Handyman */}
      <div className="px-6 mb-2">
        <div className="bg-white flex justify-between items-center px-5 py-4 rounded-xl shadow-md">
          <p className="font-medium">Switch To Handyman</p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isBuyer}
              onChange={() => {
                setIsBuyer(!isBuyer);
                if (!isBuyer) {
                  router.push("/handyDashboard"); // Redirect to Handyman Dashboard
                }
              }}
              className="sr-only"
            />
            <div className="w-12 h-6 bg-gray-300 rounded-full p-1 flex items-center">
              <div
                className={`w-5 h-5 rounded-full bg-cyan-500 transition-transform ${
                  isBuyer ? "translate-x-6" : ""
                }`}
              />
            </div>
          </label>
        </div>
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-200">
        {/* Earnings */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Your Earning</h3>
            <a href="#" className="text-sm text-cyan-600 hover:underline">
              View All
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-purple-100 p-4 rounded-xl text-center">
              <p className="text-2xl font-bold">$800</p>
              <p className="text-sm text-gray-700">Your this month</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-xl text-center">
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-gray-700">Active Order</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <h3 className="font-semibold mb-3">Recent Orders</h3>
          <div className="bg-purple-100 p-4 rounded-xl flex items-center gap-3">
            <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full shadow">
              🏠
            </div>
            <div>
              <p className="font-bold">ELECTRICAL REPAIR 👨‍🔧</p>
              <p className="text-sm text-gray-600">
                John Patronsky recently booked for the “electrical repair” service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-cyan-500 flex justify-around items-center h-14">
        <button onClick={() => router.push("/")} className="cursor-pointer hover:text-white transition">
          <Home className="w-6 h-6 text-black" />
        </button>
        <button onClick={() => router.push("/messages")} className="cursor-pointer hover:text-white transition">
          <MessageCircle className="w-6 h-6 text-black" />
        </button>
        <button onClick={() => router.push("/portfolio")} className="cursor-pointer hover:text-white transition">
          <Users className="w-6 h-6 text-black" />
        </button>
        <button onClick={() => router.push("/notifications")} className="relative cursor-pointer hover:text-white transition">
          <Bell className="w-6 h-6 text-black" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>
        <button onClick={() => router.push("/settings")} className="cursor-pointer hover:text-white transition">
          <Settings className="w-6 h-6 text-black" />
        </button>
      </div>
    </div>
  );
}
