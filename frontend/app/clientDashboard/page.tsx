"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  FiHome,
  FiMessageCircle,
  FiHelpCircle,
  FiBell,
  FiSettings,
  FiUser,
} from "react-icons/fi";

export default function ClientDashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const router = useRouter();

  // logout
  const handleLogout = () => {
    router.push("/");
  };

  // toggle hamburger dropdown
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowProfileMenu(false); // close profile if menu is opened
  };

  // toggle profile dropdown
  const toggleProfile = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowMenu(false); // close menu if profile is opened
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col text-gray-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#FFCC66] to-[#FF7E5F] shadow-md relative">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Title */}
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-wide">
            Client Portal
          </h1>

          {/* Right side buttons */}
          <div className="flex items-center gap-4 relative">
            {/* Profile Icon */}
            <button
              onClick={toggleProfile}
              className="p-2 rounded-full hover:bg-yellow-500 transition"
            >
              <FiUser size={22} className="text-gray-900" />
            </button>

            {/* Profile dropdown */}
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
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {/* Menu button */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-yellow-500 bg-yellow-400 text-gray-900 transition"
            >
              {showMenu ? <X size={26} /> : <Menu size={26} />}
            </button>

            {/* Hamburger dropdown */}
            {showMenu && (
              <div className="absolute right-0 top-14 bg-gray-800 shadow-xl rounded-xl border w-56 text-sm z-50 overflow-hidden">
                <ul className="divide-y">
                  <li>
                    <Link
                      href="/browse-services"
                      className="block px-4 py-3 hover:bg-yellow-600 hover:text-gray-900 transition"
                    >
                      View Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/handyServices"
                      className="block px-4 py-3 hover:bg-yellow-600 hover:text-gray-900 transition"
                    >
                      Book Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/book-services"
                      className="block px-4 py-3 hover:bg-yellow-600 hover:text-gray-900 transition"
                    >
                      Track Booking
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

      {/* PROFILE SECTION */}
      <main className="flex-1 overflow-y-auto">
        <section className="bg-gray-700 text-white py-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* profile image */}
            <Image
              src="/images/client-profile.jpg"
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full border-4 border-yellow-400 mx-auto shadow-lg"
            />
            <h2 className="text-2xl font-bold mt-4 text-yellow-400">
              Alex Johnson
            </h2>
            <p className="text-sm text-gray-300">alex.johnson@email.com</p>

            {/* numbers for bookings, ongoing, rating */}
            <div className="flex justify-center gap-10 mt-6 text-gray-100">
              <div>
                <p className="text-xl font-bold">12</p>
                <p className="text-sm">Services Booked</p>
              </div>
              <div>
                <p className="text-xl font-bold">2</p>
                <p className="text-sm">Ongoing</p>
              </div>
              <div>
                <p className="text-xl font-bold">4.8</p>
                <p className="text-sm">Avg. Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT CARDS */}
        <section className="max-w-5xl mx-auto px-6 py-10 space-y-8">
          {/* spending and orders */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl shadow p-6 text-center">
              <p className="text-2xl font-bold text-yellow-400">$1,250</p>
              <p className="text-sm text-gray-300">Total Spent</p>
            </div>
            <div className="bg-gray-800 rounded-xl shadow p-6 text-center">
              <p className="text-2xl font-bold text-yellow-400">5</p>
              <p className="text-sm text-gray-300">Active Bookings</p>
            </div>
          </div>

          {/* recent bookings */}
          <div className="bg-gray-800 rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4 text-yellow-400">
              Recent Bookings
            </h3>
            <ul className="space-y-3">
              <li className="p-4 border rounded-lg hover:shadow transition">
                <p className="font-medium text-yellow-400">🛠 Furniture Assembly</p>
                <p className="text-sm text-gray-300">
                  Confirmed with Kenji Teneka yesterday.
                </p>
              </li>
              <li className="p-4 border rounded-lg hover:shadow transition">
                <p className="font-medium text-yellow-400">🌿 Gardening Service</p>
                <p className="text-sm text-gray-300">
                  Scheduled with Anna Lee next week.
                </p>
              </li>
            </ul>
          </div>

          {/* favorite services */}
          <div className="bg-gray-800 rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4 text-yellow-400">
              Favorite Services
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg hover:shadow transition">
                <p className="font-bold text-yellow-400">Cleaning</p>
                <p className="text-sm text-gray-300">
                  Weekly housekeeping services
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:shadow transition">
                <p className="font-bold text-yellow-400">Electrical Repair</p>
                <p className="text-sm text-gray-300">
                  Fast fixes for household issues
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-gray-300 mt-10">
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
            href="/help"
            className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiHelpCircle size={20} /> Help
          </Link>
          <Link
            href="/notifications"
            className="flex flex-col items-center gap-1 hover:text-[#FF7E5F] transition"
          >
            <FiBell size={20} /> Notifications
          </Link>
          <Link
            href="/settings"
            className="flex flex-col items-center gap-1 hover:text-[#FF7E5F] transition"
          >
            <FiSettings size={20} /> Settings
          </Link>
        </div>
      </footer>
    </div>
  );
}
