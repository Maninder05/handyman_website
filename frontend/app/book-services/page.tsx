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
      <div className="bg-cyan-500 flex items-center justify-between px-6 h-16 relative">
        <button
          onClick={() => router.back()}
          className="absolute left-4 text-black text-xl cursor-pointer"
        >
          ←
        </button>
        <h1 className="text-md font-bold mx-auto text-white">Book Services</h1>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="absolute right-4 text-black text-2xl cursor-pointer"
        >
          ☰
        </button>
      </div>

      {/* Subtitle */}
      <div className="text-center mt-6 px-6">
        <h2 className="text-md font-semibold italic">What do you need done?</h2>
        <p className="text-sm text-gray-600 mt-1">
          Whatever the task — plumbing, electrical, furniture, or more — we’ve
          got the right pro for the job.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-3 gap-5 p-5 flex-1">
        {services.map((service) => (
          <div
            key={service.name}
            onClick={() =>
              router.push(`/choose-handyman?service=${service.name}`)
            }
            className="bg-white rounded-lg shadow flex flex-col items-center justify-center p-4 hover:bg-gray-100 cursor-pointer transition"
          >
            <span className="text-3xl">{service.icon}</span>
            <p className="mt-1 font-medium text-sm">{service.name}</p>
          </div>
        ))}
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
          onClick={() => router.push("/portofolio")}
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
