"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import {FiHome, FiMessageCircle, FiHelpCircle, FiBell, FiSettings, FiUser} from "react-icons/fi";

export default function PortfolioPage() {
  // this is for the little menu (open / close)
  const [showMenu, setShowMenu] = useState(false);

  // toggle profile dropdown
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // this is for switching between buyer and seller
  const [buyerMode, setBuyerMode] = useState(false);

  // next.js router for changing pages
  const router = useRouter();

  // when we click the switch button
  const handleSwitchClick = () => {
    setBuyerMode(!buyerMode);
    if (!buyerMode) {
      router.push("../clientDashboard");
    }
  };

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
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      {/* ================= HEADER ================= */}
      <header className="bg-white shadow-md relative">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Title */}
          <h1 className="text-2xl font-extrabold text-blue-600 tracking-wide">
            Handyman Portal
          </h1>

          {/* Right side buttons */}
          <div className="flex items-center gap-4 relative">
            {/* Profile Icon */}
            <button
              onClick={toggleProfile}
              className="p-2 rounded-full hover:bg-neutral-100 transition"
            >
              <FiUser size={22} className="text-neutral-700" />
            </button>

            {/* Profile dropdown */}
            {showProfileMenu && (
              <div className="absolute right-14 top-14 bg-gray-400 rounded-xl shadow-lg border w-48 z-50">
                <ul className="text-sm divide-y">
                  <li>
                    <Link
                      href="/account"
                      className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      View Account
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition"
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
              className="p-2 rounded-md hover:bg-neutral-100 transition"
            >
              {showMenu ? <X size={26} /> : <Menu size={26} />}
            </button>

            {/* Hamburger dropdown */}
            {showMenu && (
              <div className="absolute right-0 top-14 bg-gray-400 shadow-xl rounded-xl border w-56 text-sm z-50 overflow-hidden">
                <ul className="divide-y">
                  <li>
                    <Link
                      href="/create-service"
                      className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      Add Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/account"
                      className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/order"
                      className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      Track Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/membership"
                      className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      Membership Plan
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings"
                      className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition"
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

      {/* ================= PROFILE SECTION ================= */}
      <main className="flex-1 overflow-y-auto">
        <section className="bg-gradient-to-r from-blue-400 to-blue-500 text-white py-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* profile image */}
            <Image
              src="/images/profile.jpg"
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full border-4 border-white mx-auto shadow-lg"
            />
            <h2 className="text-2xl font-bold mt-4">Kenji Teneka</h2>
            <p className="text-sm opacity-90">kenjitenka@gmail.com</p>

            {/* numbers for jobs done, progress, rating */}
            <div className="flex justify-center gap-10 mt-6">
              <div>
                <p className="text-xl font-bold">15</p>
                <p className="text-sm">Jobs Done</p>
              </div>
              <div>
                <p className="text-xl font-bold">3</p>
                <p className="text-sm">In Progress</p>
              </div>
              <div>
                <p className="text-xl font-bold">5.0</p>
                <p className="text-sm">Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CONTENT CARDS ================= */}
        <section className="max-w-5xl mx-auto px-6 py-10 space-y-8">
          {/* toggle switch for buyer/seller */}
          <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between">
            <span className="font-medium text-neutral-700">
              Switch To Buyer Mode
            </span>
            <button
              onClick={handleSwitchClick}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
                buyerMode ? "bg-blue-500" : "bg-gray-400"
              }`}
            >
              {/* the little round circle */}
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transform ${
                  buyerMode ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* earnings and orders */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <p className="text-2xl font-bold text-blue-500">$800</p>
              <p className="text-sm text-neutral-600">Total Earnings</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <p className="text-2xl font-bold text-blue-500">3</p>
              <p className="text-sm text-neutral-600">Active Orders</p>
            </div>
          </div>

          {/* recent orders */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4 text-neutral-800">
              Recent Orders
            </h3>
            <ul className="space-y-3">
              <li className="p-4 border rounded-lg hover:shadow transition">
                <p className="font-medium text-neutral-900">
                  🔧 Electrical Repair
                </p>
                <p className="text-sm text-neutral-600">
                  John Patrosky booked this service yesterday.
                </p>
              </li>
              <li className="p-4 border rounded-lg hover:shadow transition">
                <p className="font-medium text-neutral-900">🚰 Plumbing Fix</p>
                <p className="text-sm text-neutral-600">
                  Anna Lee scheduled for next week.
                </p>
              </li>
            </ul>
          </div>

          {/* services */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4 text-neutral-800">My Services</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg hover:shadow transition">
                <p className="font-bold text-blue-500">Painting</p>
                <p className="text-sm text-neutral-600">
                  Offered at $150 per room
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:shadow transition">
                <p className="font-bold text-blue-500">Carpentry</p>
                <p className="text-sm text-neutral-600">
                  Custom furniture and repairs
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-neutral-300 mt-10">
        <div className="max-w-5xl mx-auto flex justify-around py-5 text-sm">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 hover:text-blue-400 transition"
          >
            <FiHome size={20} /> Home
          </Link>
          <Link
            href="/messages"
            className="flex flex-col items-center gap-1 hover:text-blue-400 transition"
          >
            <FiMessageCircle size={20} /> Messages
          </Link>
          <Link
            href="/help"
            className="flex flex-col items-center gap-1 hover:text-blue-400 transition"
          >
            <FiHelpCircle size={20} /> Help
          </Link>
          <Link
            href="/notifications"
            className="flex flex-col items-center gap-1 hover:text-blue-400 transition"
          >
            <FiBell size={20} /> Notifications
          </Link>
          <Link
            href="/settings"
            className="flex flex-col items-center gap-1 hover:text-blue-400 transition"
          >
            <FiSettings size={20} /> Settings
          </Link>
        </div>
      </footer>
    </div>
  );
}
