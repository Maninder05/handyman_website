"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header with Back Arrow */}
      <div className="bg-teal-500 p-4 relative shadow-md flex items-center justify-center">
        <Link href="/dashboard">
          <button className="absolute left-4 top-4 text-black">
            <ArrowLeft size={24} />
          </button>
        </Link>
        <h1 className="text-xl font-bold text-black">Projects</h1>
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }}
        className="flex-1 p-4 space-y-6"
      > 
        {/* In Progress */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-black">In Progress</h2>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-4 shadow-md flex items-center space-x-4 cursor-pointer"
          >
            <Image
              src="/images/profilelogo.jpg"
              alt="Voltage Maintenance"
              width={90}
              height={90}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex flex-col">
              <span className="font-bold text-black">VOLTAGE MAINTENANCE</span>
              <span className="text-gray-600 text-sm">Client: Chris Matthem</span>
              <span className="text-blue-500 text-sm font-medium">In Progress ⏳</span>
              <span className="text-black font-semibold">$45/hr</span>
            </div>
          </motion.div>
        </div>

        {/* Completed */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-black">Completed</h2>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl p-4 shadow-md flex items-center space-x-4 mb-4 cursor-pointer"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gray-200">
              <span className="text-3xl">👷</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-black">RESIDENTIAL WIRING REPAIR</span>
              <span className="text-gray-600 text-sm">Client: Mariene Bonelyn</span>
              <span className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐ 5</span>
              <span className="text-black font-semibold">$55/hr</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl p-4 shadow-md flex items-center space-x-4 cursor-pointer"
          >
            <Image
              src="/images/profilelogo.jpg"
              alt="Power Outlet Repair"
              width={90}
              height={90}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex flex-col">
              <span className="font-bold text-black">POWER OUTLET/LOAD REPAIR</span>
              <span className="text-gray-600 text-sm">Client: Asha Sharma</span>
              <span className="text-yellow-500 text-sm">⭐⭐⭐⭐ 4.9</span>
              <span className="text-black font-semibold">$40/hr</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

       {/* Footer Nav */}
      <div className="mt-auto flex justify-around bg-white border-t py-3 shadow-inner">
        <Link href="/">
          <button className="flex flex-col items-center text-gray-700">
            <span className="text-lg">🏠</span>
            <span className="text-xs">Home</span>
          </button>
        </Link>
        <Link href="/chat">
          <button className="flex flex-col items-center text-gray-700">
            <span className="text-lg">💬</span>
            <span className="text-xs">Chat</span>
          </button>
        </Link>
        <Link href="/explore">
          <button className="flex flex-col items-center text-gray-700">
            <span className="text-lg">🔍</span>
            <span className="text-xs">Explore</span>
          </button>
        </Link>
        <Link href="/faq">
          <button className="flex flex-col items-center text-gray-700">
            <span className="text-lg">❓</span>
            <span className="text-xs">FAQ</span>
          </button>
        </Link>
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