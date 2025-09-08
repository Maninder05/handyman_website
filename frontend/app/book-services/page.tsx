"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Home, MessageCircle, Settings, Users } from "lucide-react";
import SideMenu from "../components/SideMenu"; 

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
    <div className="min-h-screen w-full flex flex-col bg-gray-200">
      {/* Header */}
      <div className="bg-teal-500 flex items-center justify-between p-4 relative">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute left-4 text-black text-2xl"
        >
          ←
        </button>
        <h1 className="text-lg font-bold mx-auto text-white">Book Services</h1>
        {/* Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="absolute right-4 text-black text-3xl"
        >
          ☰
        </button>
      </div>

      {/* Subtitle */}
      <div className="text-center mt-4 px-4">
        <h2 className="text-lg font-bold italic">What do you need done?</h2>
        <p className="text-sm text-gray-600 mt-1">
          Whatever the task — plumbing, electrical, furniture, or more — we’ve
          got the right pro for the job.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 flex-1">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow flex flex-col items-center justify-center p-6 hover:bg-gray-100 cursor-pointer"
          >
            <span className="text-4xl">{service.icon}</span>
            <p className="mt-2 font-medium">{service.name}</p>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-teal-500 flex justify-around items-center py-3">
        <button>
          <Home className="w-7 h-7 text-black" />
        </button>
        <button>
          <MessageCircle className="w-7 h-7 text-black" />
        </button>
        <button>
          <Users className="w-7 h-7 text-black" />
        </button>
        <button className="relative">
          <Bell className="w-7 h-7 text-black" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
        <button>
          <Settings className="w-7 h-7 text-black" />
        </button>
      </div>

      {/* Next Button */}
      <div className="bg-gray-200 p-4 flex justify-end">
        <button className="bg-gray-300 text-black px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-400">
          Next →
        </button>
      </div>

      {/* Side Menu */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}
