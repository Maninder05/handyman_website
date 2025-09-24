"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  FiHome,
  FiMessageCircle,
  FiHelpCircle,
  FiBell,
  FiSettings,
  FiUser,
} from "react-icons/fi";

export default function BookServicesPage() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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

  // toggle menus
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowProfileMenu(false);
  };

  const toggleProfile = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowMenu(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#FFCC66] to-[#FF7E5F] shadow-md relative">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4 relative">
          {/* Back Button (left aligned) */}
          <button
            onClick={() => router.back()}
            className="text-gray-900 font-bold text-lg hover:text-yellow-600 transition"
          >
            ← Back
          </button>

          {/* Title */}
          <h1 className="text-xl font-extrabold text-gray-900 tracking-wide">
            Book Services
          </h1>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-4 relative">
            {/* Profile */}
            <button
              onClick={toggleProfile}
              className="p-2 rounded-full hover:bg-yellow-500 transition"
            >
              <FiUser size={22} className="text-gray-900" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-14 top-14 bg-gray-800 rounded-xl shadow-lg border w-48 z-50">
                <ul className="text-sm divide-y">
                  <li>
                    <Link
                      href="/clientAccount"
                      className="block px-4 py-3 hover:bg-yellow-600 hover:text-gray-900 transition"
                    >
                      View Account
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push("/")}
                      className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {/* Hamburger */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-yellow-500 bg-yellow-400 text-gray-900 transition"
            >
              {showMenu ? <X size={26} /> : <Menu size={26} />}
            </button>

            {showMenu && (
              <div className="absolute right-0 top-14 bg-gray-800 shadow-xl rounded-xl border w-56 text-sm z-50 overflow-hidden">
                <ul className="divide-y">
                  <li>
                    <Link
                      href="/portfolio"
                      className="block px-4 py-3 hover:bg-yellow-600 hover:text-gray-900 transition"
                    >
                      My Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/order"
                      className="block px-4 py-3 hover:bg-yellow-600 hover:text-gray-900 transition"
                    >
                      Track Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/membership"
                      className="block px-4 py-3 hover:bg-yellow-600 hover:text-gray-900 transition"
                    >
                      Membership Plan
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="block px-4 py-3 hover:bg-yellow-600 hover:text-gray-900 transition"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings"
                      className="block px-4 py-3 hover:bg-yellow-600 hover:text-gray-900 transition"
                    >
                      Account Settings
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
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

      {/* FOOTER NAV */}
      <footer className="bg-gray-800 text-gray-300 mt-6">
        <div className="max-w-5xl mx-auto flex justify-around py-5 text-sm">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiHome size={20} /> Home
          </Link>
          <Link
            href="/messages"
            className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiMessageCircle size={20} /> Messages
          </Link>
          <Link
            href="/portfolio"
            className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiUser size={20} /> Portfolio
          </Link>
          <Link
            href="/notifications"
            className="relative flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiBell size={20} /> Notifications
            <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </Link>
          <Link
            href="/settings"
            className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiSettings size={20} /> Settings
          </Link>
        </div>
      </footer>
    </div>
  );
}
