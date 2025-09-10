// app/portfolio/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBuyerMode, setIsBuyerMode] = useState(false);
  const router = useRouter();

  // switch toggle
  const handleSwitch = () => {
    setIsBuyerMode(!isBuyerMode);
    if (!isBuyerMode) {
      router.push("/buyer");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between bg-teal-500 px-6 py-6 text-white relative shadow-md"
      >
        {/* Back Arrow (go to Home) */}
        {/* path to signup/signin */}
        <button
          onClick={() => router.push("/")}
          className="text-xl hover:opacity-80"
        >
          &larr;
        </button>

        <h1 className="text-xl font-bold">Portfolio</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hover:opacity-80"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute right-6 top-16 bg-white shadow-lg rounded-lg w-56 text-black text-sm z-50"
          >
            {/* path to add service page */}
            <ul className="divide-y">
              <Link href="/add-service">
                <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  Add Service
                </li>
              </Link>
              {/* path to track order page */}
              <Link href="/track-order">
                <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  Track Order
                </li>
              </Link>
              {/* path to wishlist page */}
              <Link href="/wishlist">
                <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  My Wishlist
                </li>
              </Link>
              {/* path to membership page */}
              <Link href="/membership">
                <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  Membership Plan
                </li>
              </Link>
              {/* path to faq page */}
              <Link href="/faq">
                <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  FAQ
                </li>
              </Link>
              {/* path to settings page */}
              <Link href="/settings">
                <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  Account Settings
                </li>
              </Link>
            </ul>
          </motion.div>
        )}
      </motion.div>

      {/* Profile Info */}
      <div className="bg-teal-500 text-white px-6 pb-8 pt-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4"
        >
          <Image
            src="/images/profilelogo.jpg"
            alt="profile"
            width={90}
            height={90}
            className="rounded-full border-4 border-white shadow-lg"
          />
          <div className="bg-white text-black px-5 py-3 rounded-lg">
            <h2 className="font-semibold text-lg">Kenji Teneka</h2>
            <p className="text-sm">kenjitenka@gmail.com</p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="flex justify-around mt-6">
          {/* path to jobs done page */}
          <Link href="/jobs">
            <div className="bg-white text-black px-4 py-3 rounded-lg text-center cursor-pointer">
              <p className="text-lg font-bold text-teal-600">15</p>
              <p className="text-xs">Job Done</p>
            </div>
          </Link>
          {/* path to in progress jobs page */}
          <Link href="/progress">
            <div className="bg-white text-black px-4 py-3 rounded-lg text-center cursor-pointer">
              <p className="text-lg font-bold text-teal-600">3</p>
              <p className="text-xs">Job In Progress</p>
            </div>
          </Link>
          {/* path to ratings page */}
          <Link href="/ratings">
            <div className="bg-white text-black px-4 py-3 rounded-lg text-center cursor-pointer">
              <p className="text-lg font-bold text-teal-600">5</p>
              <p className="text-xs">Rating ⭐</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Switch to Buyer */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <span className="font-semibold text-black">Switch To Buyer</span>
        <button
          onClick={handleSwitch}
          className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
            isBuyerMode ? "bg-black" : "bg-gray-400"
          }`}
        >
          <motion.div
            animate={{ x: isBuyerMode ? 28 : 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="w-5 h-5 bg-white rounded-full shadow"
          />
        </button>
      </div>

      {/* Earnings */}
      <div className="px-6 py-5 flex gap-5">
        <div className="flex-1 bg-gray-100 p-5 rounded-lg text-center">
          <p className="font-bold text-xl text-teal-600">$800</p>
          <p className="text-sm text-gray-600">Your Earning</p>
        </div>
        <div className="flex-1 bg-gray-100 p-5 rounded-lg text-center">
          <p className="font-bold text-xl text-teal-600">3</p>
          <p className="text-sm text-gray-600">Active Orders</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="px-6">
        <h3 className="font-semibold mb-3 text-black">Recent Orders</h3>
        <div className="bg-gray-100 p-5 rounded-lg">
          <p className="font-bold text-black">🔧 ELECTRICAL REPAIR</p>
          <p className="text-sm text-gray-600">
            John Patrosky recently booked for the electrical repair service.
          </p>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="mt-auto flex justify-around bg-white border-t py-3 shadow-inner">
        {/* path to portfolio page */}
        <Link href="/">
          <button className="flex flex-col items-center text-gray-700">
            <span className="text-lg">🏠</span>
            <span className="text-xs">Home</span>
          </button>
        </Link>
        {/* path to messages page */}
        <Link href="/chat">
          <button className="flex flex-col items-center text-gray-700">
            <span className="text-lg">💬</span>
            <span className="text-xs">Chat</span>
          </button>
        </Link>
        {/* path to services page */}
        <Link href="/explore">
          <button className="flex flex-col items-center text-gray-700">
            <span className="text-lg">🔍</span>
            <span className="text-xs">Explore</span>
          </button>
        </Link>
        {/* path to faq page */}
        <Link href="/faq">
          <button className="flex flex-col items-center text-gray-700">
            <span className="text-lg">❓</span>
            <span className="text-xs">FAQ</span>
          </button>
        </Link>
        {/* path to settings page */}
        <Link href="/settings">
          <button className="flex flex-col items-center text-gray-700">
            <span className="text-lg">⚙️</span>
            <span className="text-xs">Settings</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
