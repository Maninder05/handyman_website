"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Home, MessageCircle, Settings, Users } from "lucide-react";
import SideMenu from "../components/SideMenu";

export default function ServicesPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-gray-300 flex items-center justify-between p-4 relative">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute left-4 text-black text-2xl"
        >
          ←
        </button>
        <h1 className="text-lg font-bold mx-auto">Handyman Services</h1>

        {/* Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="absolute right-4 text-black text-3xl"
        >
          ☰
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-cyan-500">
        <input
          type="text"
          placeholder="Search Handyman"
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
        />
      </div>

      {/* Promo Banner */}
      <div className="p-4 bg-cyan-500">
        <div className="bg-white rounded-xl shadow flex items-center justify-between p-4">
          <div>
            <h2 className="text-sm font-bold text-purple-600">
              Handyman Services Now Available At Your Home
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              No more long waits or unreliable fixes. With just a few clicks,
              get skilled professionals at your doorstep when you need them,
              where you need them. Because your time and home deserve better
              care.
            </p>
          </div>
          <img
            src="/images/services-banner.jpg"
            alt="Handyman Services"
            className="w-20 h-20 rounded-lg object-cover ml-3"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-cyan-500 px-4 py-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Category</h3>
          <a href="#" className="text-sm text-purple-600 hover:underline">
            Book Services
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow flex flex-col items-center p-4">
            <span className="text-3xl">🚰</span>
            <p className="mt-2 font-medium">Plumbing</p>
          </div>
          <div className="bg-white rounded-xl shadow flex flex-col items-center p-4">
            <span className="text-3xl">⚡</span>
            <p className="mt-2 font-medium">Technician</p>
          </div>
          <div className="bg-white rounded-xl shadow flex flex-col items-center p-4">
            <span className="text-3xl">🧹</span>
            <p className="mt-2 font-medium">House Clean</p>
          </div>
          <div className="bg-white rounded-xl shadow flex flex-col items-center p-4">
            <span className="text-3xl">👨‍🎨</span>
            <p className="mt-2 font-medium">Painting</p>
          </div>
        </div>
      </div>

      {/* Recommended Services */}
      <div className="p-4 bg-gray-100 flex-1">
        <h3 className="font-semibold mb-3">Recommended Services</h3>
        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <img
            src="/images/profile.jpg"
            alt="Kenji"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-bold">TECHNICAL REPAIR</p>
            <p className="text-sm text-gray-600">By Kenji Teneka</p>
            <p className="text-yellow-500 text-sm">⭐ 5</p>
            <p className="font-semibold text-black">$55/hr</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-cyan-500 flex justify-around items-center h-14">
        <button
          onClick={() => router.push("/")}
          className="cursor-pointer hover:text-white transition"
        >
          <Home className="w-6 h-6 text-black" />
        </button>
        <button
          onClick={() => router.push("/messages")}
          className="cursor-pointer hover:text-white transition"
        >
          <MessageCircle className="w-6 h-6 text-black" />
        </button>
        <button
          onClick={() => router.push("/portfolio")}
          className="cursor-pointer hover:text-white transition"
        >
          <Users className="w-6 h-6 text-black" />
        </button>
        <button
          onClick={() => router.push("/notifications")}
          className="relative cursor-pointer hover:text-white transition"
        >
          <Bell className="w-6 h-6 text-black" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>
        <button
          onClick={() => router.push("/settings")}
          className="cursor-pointer hover:text-white transition"
        >
          <Settings className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Side Menu */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}

 