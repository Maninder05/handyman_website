"use client";
import Image from "next/image";
import Link from "next/link";
import { FiHome, FiMessageCircle, FiHelpCircle, FiBell, FiSettings } from "react-icons/fi";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 text-neutral-800">
      {/* Header with Back Arrow */}
      <div className="bg-blue-500 p-4 relative shadow-md flex items-center justify-center">
        <Link href="/dashboard">
          <button className="text-2xl absolute left-4 top-3 text-white">←</button>
        </Link>
        <h1 className="text-2xl font-bold text-white">Projects</h1>
      </div>

      {/* Content */}
      {/* In Progress */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4 mt-6 text-center">
          In Progress
        </h2>
        <div className="bg-white flex-1 max-w-3xl mx-auto w-full rounded-2xl px-4 py-6">
          <Image
            src="/images/profilelogo.jpg"
            alt="Voltage Maintenance"
            width={90}
            height={90}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div className="flex flex-col mt-2">
            <p className="font-bold text-neutral-800">VOLTAGE MAINTENANCE</p>
            <p className="text-gray-600 text-sm">Client: Chris Matthem</p>
            <p className="text-blue-500 text-sm font-medium">In Progress ⏳</p>
            <p className="text-neutral-800 font-semibold">$45/hr</p>
          </div>
        </div>
      </div>

      {/* Completed */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4 mt-6 text-center">
          Completed
        </h2>
        <div className="bg-white flex-1 max-w-3xl mx-auto w-full rounded-2xl px-4 py-6 mb-4">
          <Image
            src="/images/profilelogo.jpg"
            alt="Residential Wiring Repair"
            width={90}
            height={90}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div className="flex flex-col mt-2">
            <p className="font-bold text-neutral-800">RESIDENTIAL WIRING REPAIR</p>
            <p className="text-gray-600 text-sm">Client: Mariene Bonelyn</p>
            <p className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐ 5</p>
            <p className="text-neutral-800 font-semibold">$55/hr</p>
          </div>
        </div>

        <div className="bg-white flex-1 max-w-3xl mx-auto w-full rounded-2xl px-4 py-6 mb-4">
          <Image
            src="/images/profilelogo.jpg"
            alt="Power Outlet Repair"
            width={90}
            height={90}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div className="flex flex-col mt-2">
            <p className="font-bold text-neutral-800">POWER OUTLET/LOAD REPAIR</p>
            <p className="text-gray-600 text-sm">Client: Asha Sharma</p>
            <p className="text-yellow-500 text-sm">⭐⭐⭐⭐ 4.9</p>
            <p className="text-neutral-800 font-semibold">$40/hr</p>
          </div>
        </div>
      </div>

      {/* Footer Nav */}
      <footer className="bg-blue-500 py-4 mt-auto">
        <div className="flex justify-around items-center text-white text-sm font-medium">
          <Link href="/" className="flex flex-col items-center gap-1">
            <FiHome size={20} /> Home
          </Link>
          <Link href="/messages" className="flex flex-col items-center gap-1">
            <FiMessageCircle size={20} /> Messages
          </Link>
          <Link href="/help" className="flex flex-col items-center gap-1">
            <FiHelpCircle size={20} /> Help
          </Link>
          <Link href="/notifications" className="flex flex-col items-center gap-1">
            <FiBell size={20} /> Notifications
          </Link>
          <Link href="/settings" className="flex flex-col items-center gap-1">
            <FiSettings size={20} /> Settings
          </Link>
        </div>
      </footer>
    </div>
  );
}
