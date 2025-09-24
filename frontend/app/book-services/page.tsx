"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiHome,
  FiMessageCircle,
  FiHelpCircle,
  FiBell,
  FiSettings,
  FiUsers,
} from "react-icons/fi";

export default function BookServicesPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    { name: "Plumbing", icon: "🚰" },
    { name: "Technician", icon: "⚡" },
    { name: "Lawn Care", icon: "🌱" },
    { name: "Plastering", icon: "🧱" },
    { name: "Laundry", icon: "🧺" },
    { name: "Shifting", icon: "🚚" },
    { name: "House Clean", icon: "🧹" },
    { name: "Painting", icon: "👨‍🎨" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#FFCC66] to-[#FF7E5F] shadow-md relative">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <button
            onClick={() => router.back()}
            className="text-gray-900 font-bold text-lg hover:text-yellow-600 transition"
          >
            ← Back
          </button>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-wide">
            Book Services
          </h1>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-gray-900 font-bold text-2xl hover:text-yellow-600 transition"
          >
            ☰
          </button>
        </div>
      </header>

      {/* SUBTITLE */}
      <section className="text-center mt-6 px-6">
        <h2 className="text-lg font-semibold italic text-yellow-400">
          What do you need done?
        </h2>
        <p className="text-sm text-gray-300 mt-1">
          From plumbing to painting — book the right pro for your task.
        </p>
      </section>

      {/* SERVICES GRID */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-6 flex-1 max-w-5xl mx-auto">
        {services.map((service) => (
          <div
            key={service.name}
            onClick={() =>
              router.push(`/choose-handyman?service=${service.name}`)
            }
            className="bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center justify-center hover:bg-gray-700 cursor-pointer transition"
          >
            <span className="text-3xl">{service.icon}</span>
            <p className="mt-3 font-medium text-yellow-400">{service.name}</p>
          </div>
        ))}
      </section>

      {/* FOOTER NAVIGATION */}
      <footer className="bg-gray-800 text-gray-300 mt-6">
        <div className="max-w-5xl mx-auto flex justify-around py-5 text-sm">
          <button
            onClick={() => router.push("/")}
            className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiHome size={20} /> Home
          </button>
          <button
            onClick={() => router.push("/messages")}
            className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiMessageCircle size={20} /> Messages
          </button>
          <button
            onClick={() => router.push("/portfolio")}
            className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiUsers size={20} /> Portfolio
          </button>
          <button
            onClick={() => router.push("/notifications")}
            className="relative flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiBell size={20} /> Notifications
            <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={() => router.push("/settings")}
            className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiSettings size={20} /> Settings
          </button>
        </div>
      </footer>
    </div>
  );
}
