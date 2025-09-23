"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Home, MessageCircle, Settings, Users, Search } from "lucide-react";
import SideMenu from "../components/SideMenu";

export default function ServicesPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-cyan-50 to-gray-100">
      {/* ================= HEADER ================= */}
      <header className="bg-white shadow-sm flex items-center justify-between p-4 relative">
        <button
          onClick={() => router.back()}
          className="absolute left-4 text-gray-700 text-2xl hover:text-cyan-600 transition"
        >
          ←
        </button>
        <h1 className="text-lg font-bold mx-auto text-gray-800">
          Handyman Services
        </h1>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="absolute right-4 text-gray-700 text-2xl hover:text-cyan-600 transition"
        >
          ☰
        </button>
      </header>

      {/* ================= SEARCH ================= */}
      <div className="p-4 bg-cyan-600">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search handyman, services..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>

      {/* ================= PROMO BANNER ================= */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-md flex items-center justify-between p-4">
          <div className="max-w-sm">
            <h2 className="text-sm font-bold text-cyan-700">
              Reliable Services At Your Doorstep
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Get skilled professionals without the hassle. From plumbing to painting, 
              we bring the right handyman to your home — quickly, safely, and affordably.
            </p>
          </div>
          <img
            src="/images/services-banner.jpg"
            alt="Handyman Services"
            className="w-20 h-20 rounded-lg object-cover ml-3"
          />
        </div>
      </div>

      {/* ================= CATEGORIES ================= */}
      <section className="px-4 py-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">Categories</h3>
          <button
            onClick={() => router.push("/book")}
            className="text-sm text-cyan-600 hover:underline"
          >
            Book Service →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { emoji: "🚰", name: "Plumbing" },
            { emoji: "⚡", name: "Technician" },
            { emoji: "🧹", name: "House Cleaning" },
            { emoji: "🎨", name: "Painting" },
          ].map((cat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col items-center p-4 cursor-pointer"
            >
              <span className="text-3xl">{cat.emoji}</span>
              <p className="mt-2 font-medium text-gray-700">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= RECOMMENDED ================= */}
      <section className="p-4 flex-1">
        <h3 className="font-semibold mb-3 text-gray-800">
          Recommended Services
        </h3>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl shadow flex items-center gap-3 hover:shadow-lg transition"
            >
              <img
                src="/images/profile.jpg"
                alt="Kenji"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <p className="font-bold text-gray-800">TECHNICAL REPAIR</p>
                <p className="text-sm text-gray-600">By Kenji Teneka</p>
                <p className="text-yellow-500 text-sm">⭐ 5.0</p>
              </div>
              <p className="font-semibold text-cyan-600">$55/hr</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BOTTOM NAV ================= */}
      <nav className="bg-white shadow-inner flex justify-around items-center h-14 border-t">
        <button
          onClick={() => router.push("/")}
          className="flex flex-col items-center text-gray-600 hover:text-cyan-600 transition"
        >
          <Home className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => router.push("/messages")}
          className="flex flex-col items-center text-gray-600 hover:text-cyan-600 transition"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs">Messages</span>
        </button>
        <button
          onClick={() => router.push("/portfolio")}
          className="flex flex-col items-center text-gray-600 hover:text-cyan-600 transition"
        >
          <Users className="w-5 h-5" />
          <span className="text-xs">Portfolio</span>
        </button>
        <button
          onClick={() => router.push("/notifications")}
          className="relative flex flex-col items-center text-gray-600 hover:text-cyan-600 transition"
        >
          <Bell className="w-5 h-5" />
          <span className="text-xs">Alerts</span>
          <span className="absolute top-0 right-3 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>
        <button
          onClick={() => router.push("/settings")}
          className="flex flex-col items-center text-gray-600 hover:text-cyan-600 transition"
        >
          <Settings className="w-5 h-5" />
          <span className="text-xs">Settings</span>
        </button>
      </nav>

      {/* ================= SIDE MENU ================= */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}
