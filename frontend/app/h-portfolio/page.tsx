"use client";

import Link from "next/link";
import Image from "next/image";

export default function PortfolioPage() {

  // ----- show the dropdown menu -----
  function openMenu() {
    const menuBox = document.getElementById("dropMenu");
    if (menuBox) {
      menuBox.classList.remove("hidden"); // make it visible
    }
  }

  // ----- hide the dropdown menu -----
  function closeMenu() {
    const menuBox = document.getElementById("dropMenu");
    if (menuBox) {
      menuBox.classList.add("hidden"); // hide it again
    }
  }

  // ----- turn the switch ON or OFF -----
  function flipToggle() {
    // find the two parts of the switch
    const track = document.getElementById("toggleTrack");
    const circle = document.getElementById("toggleCircle");
    if (!track || !circle) return;  // stop if we can’t find them

    // check what color the track is right now
    const isGray = track.classList.contains("bg-gray-400");

    if (isGray) {
      // switch is OFF → turn it ON
      track.classList.remove("bg-gray-400"); // remove gray color
      track.classList.add("bg-black");       // add black color
      circle.classList.add("translate-x-7"); // move the circle to the right
    } else {
      // switch is ON → turn it OFF
      track.classList.remove("bg-black");    // remove black color
      track.classList.add("bg-gray-400");    // add gray color
      circle.classList.remove("translate-x-7"); // move the circle back
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">

      {/* ---------- top bar ---------- */}
      <div className="bg-neutral-100 p-4 relative shadow-md flex items-center justify-center">
        <Link href="/auth/login">
          <button className="text-2xl absolute left-4 top-3 text-black">←</button>
        </Link>

        <h1 className="text-2xl font-bold text-black">Profile</h1>

        <button
          onClick={openMenu}
          className="hover:opacity-80 absolute text-black right-4 top-3"
        >
          ☰
        </button>

        {/* ---------- dropdown menu ---------- */}
        <div
          id="dropMenu"
          className="hidden absolute right-6 top-16 bg-white shadow-lg rounded-lg w-56 text-black text-sm z-50"
        >
          <button
            onClick={closeMenu}
            className="block text-right w-full px-4 py-2 text-gray-500 hover:text-black"
          >
            ✕
          </button>
          <ul className="divide-y">
            <li><Link href="/create-service" className="block px-4 py-3 hover:bg-gray-50">Add Service</Link></li>
            <li><Link href="/account" className="block px-4 py-3 hover:bg-gray-50">My Account</Link></li>
            <li><Link href="/order" className="block px-4 py-3 hover:bg-gray-50">Track Order</Link></li>
            <li><Link href="/membership" className="block px-4 py-3 hover:bg-gray-50">Membership Plan</Link></li>
            <li><Link href="/faq" className="block px-4 py-3 hover:bg-gray-50">FAQ</Link></li>
            <li><Link href="/settings" className="block px-4 py-3 hover:bg-gray-50">Account Settings</Link></li>
          </ul>
        </div>
      </div>

      {/* ---------- profile info ---------- */}
      <div className="bg-cyan-500 text-white px-6 pb-8 pt-6">
        <div className="flex items-center space-x-4">
          <Image
            src="/images/profile.jpg"
            alt="profile"
            width={90}
            height={90}
            className="rounded-full border-4 border-white shadow-lg"
          />
          <div className="text-black px-5 py-3 rounded-lg">
            <h2 className="font-semibold text-lg">Kenji Teneka</h2>
            <p className="text-sm">kenjitenka@gmail.com</p>
          </div>
        </div>

        <div className="flex justify-around mt-6">
          <Link href="/jobs-done">
            <div className="text-black px-4 py-3 rounded-lg text-center cursor-pointer">
              <p className="text-lg font-bold">15</p>
              <p className="text-m font-semibold">Job Done</p>
            </div>
          </Link>
          <Link href="/jobs-done">
            <div className="text-black px-4 py-3 rounded-lg text-center cursor-pointer">
              <p className="text-lg font-bold">3</p>
              <p className="text-m font-semibold">Job In Progress</p>
            </div>
          </Link>
          <Link href="/ratings">
            <div className="text-black px-4 py-3 rounded-lg text-center cursor-pointer">
              <p className="text-lg font-bold">5</p>
              <p className="text-m font-semibold">Rating ⭐</p>
            </div>
          </Link>
        </div>
      </div>

      {/* ---------- toggle switch ---------- */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <span className="font-semibold text-black">Switch To Buyer</span>
        <button
          onClick={flipToggle}
          id="toggleTrack"
          className="w-14 h-7 flex items-center rounded-full p-1 bg-gray-400 transition"
        >
          <div
            id="toggleCircle"
            className="w-5 h-5 bg-white rounded-full shadow transform"
          />
        </button>
      </div>

      {/* ---------- stats cards ---------- */}
      <div className="px-6 py-5 flex gap-5">
        <div className="flex-1 bg-white p-5 rounded-lg text-center">
          <p className="font-bold text-xl text-cyan-600">$800</p>
          <p className="text-sm text-gray-600">Your Earning</p>
        </div>
        <div className="flex-1 bg-white p-5 rounded-lg text-center">
          <p className="font-bold text-xl text-cyan-600">3</p>
          <p className="text-sm text-gray-600">Active Orders</p>
        </div>
      </div>

      {/* ---------- recent order ---------- */}
      <div className="px-6">
        <h3 className="font-semibold mb-3 text-black">Recent Orders</h3>
        <div className="bg-white p-5 rounded-lg">
          <p className="font-bold text-black">🔧 ELECTRICAL REPAIR</p>
          <p className="text-sm text-gray-600">
            John Patrosky recently booked for the electrical repair service.
          </p>
        </div>
      </div>

      {/* ---------- footer nav ---------- */}
      <footer className="bg-cyan-500 py-4 mt-auto">
        <div className="flex justify-around items-center text-neutral-900 text-sm font-medium">
          <Link href="/h-portfolio" className="flex flex-col items-center gap-1">
            <span>🏠</span> Home
          </Link>
          <Link href="/messages" className="flex flex-col items-center gap-1">
            <span>💬</span> Messages
          </Link>
          <Link href="/help" className="flex flex-col items-center gap-1">
            <span>❓</span> Help
          </Link>
          <Link href="/notifications" className="flex flex-col items-center gap-1">
            <span>🔔</span> Notifications
          </Link>
          <Link href="/settings" className="flex flex-col items-center gap-1">
            <span>⚙️</span> Settings
          </Link>
        </div>
      </footer>
    </div>
  );
}
