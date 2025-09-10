"use client";

import { useState } from "react";
import { Bell, Home, MessageCircle, Settings, Users } from "lucide-react";
import SideMenu from "../components/SideMenu"; 

export default function PortfolioPage() {
  const [isHandyman, setIsHandyman] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-teal-500 p-6 relative mb-2">
        {/* Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="absolute right-4 top-6 text-white text-3xl"
        >
          ☰
        </button>

        {/* Profile Info */}
        <div className="flex flex-col items-center mt-6">
          <img
            src="/images/profile.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white shadow-md"
          />
          <h2 className="text-lg font-bold text-black mt-3">Kenji Teneka</h2>
          <p className="text-sm text-black">kenjiteneka@gmail.com</p>
        </div>

        {/* Stats for Jobs done, Jobs in progress, Rating */}
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
      <div className="px-20 mb-2">
        <div className="bg-white flex justify-between items-center px-5 py-4 rounded-xl shadow-md">
          <p className="font-medium">Switch To Handyman</p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isHandyman}
              onChange={() => setIsHandyman(!isHandyman)}
              className="sr-only"
            />
            <div className="w-12 h-6 bg-gray-300 rounded-full p-1 flex items-center">
              <div
                className={`w-5 h-5 rounded-full bg-teal-500 transition-transform ${
                  isHandyman ? "translate-x-6" : ""
                }`}
              />
            </div>
          </label>
        </div>
      </div>
      


      {/* Earnings */}
      <div className="p-6 bg-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Your Earning</h3>
          <a href="#" className="text-sm text-teal-600 hover:underline">
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
      <div className="p-6 bg-gray-200">
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

      {/* Bottom Navigation */}
      <div className="mt-auto bg-teal-500 flex justify-around items-center py-3">
        <button>
          <Home className="w-7 h-7 text-white" />
        </button>
        <button>
          <MessageCircle className="w-7 h-7 text-white" />
        </button>
        <button>
          <Users className="w-7 h-7 text-white" />
        </button>
        <button className="relative">
          <Bell className="w-7 h-7 text-white" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
        <button>
          <Settings className="w-7 h-7 text-white" />
        </button>
      </div>

      {/* Side Menu */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      
    </div>
  );
}
