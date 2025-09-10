"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {FiHome, FiMessageCircle, FiHelpCircle, FiBell, FiSettings } from "react-icons/fi";

export default function OrderDetailsPage() {
  // track popup state (accepted / declined / null)
  const [popup, setPopup] = useState<"accepted" | "declined" | null>(null);

  // reset popup
  const handleClose = () => {
    setPopup(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      {/* Header with Back Arrow */}
      <div className="bg-cyan-500 p-4 relative shadow-md flex items-center justify-center">
        {/* path to home page after clicking on arrow */}
        <Link href="/h-portfolio">
          <button className="text-2xl absolute left-4 top-3 text-black">←</button>
        </Link>
        <h1 className="text-2xl font-bold text-black">Order Details</h1>
      </div>

      {/* main content */}
      <div className="flex-1 p-4 space-y-6">
        {/* booking card */}
        <div className="bg-white p-4 rounded-xl shadow-sm my-4 max-w-md mx-auto">
          <p className="text-sm text-gray-600">Booking ID: xx53@#!</p>
          <div className="flex items-center mt-3 gap-3">
            <div className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-lg">
              <span className="text-2xl">👷</span>
            </div>
            <div>
              <p className="font-semibold text-black text-sm">
                Residential Wiring Repair
              </p>
              <p className="text-xs text-gray-600">
                Date: <span className="text-black">25 July 2025</span>
              </p>
              <p className="text-xs text-gray-600">
                Time: <span className="text-black">5:30 PM</span>
              </p>
            </div>
          </div>
        </div>

        {/* buyer card */}
        <div className="bg-white p-4 rounded-xl shadow-sm my-4 max-w-md mx-auto">
          <h2 className="font-semibold mb-2 text-teal-600">Buyer Info</h2>
          <div className="flex gap-4 items-center">
            <Image
              src="/images/profilelogo.jpg"
              alt="buyer pic"
              width={56}
              height={56}
              className="rounded-full object-cover border border-teal-500 w-14 h-14"
            />
            <div>
              <p className="font-medium text-black">Mariene Bonelyn</p>
              <p className="text-green-600 text-xs">✅ Ready to Hire</p>
              <div className="mt-1 text-xs text-gray-700">
                <div className="flex items-center gap-1">
                  <span>📧</span>
                  <span className="hover:text-blue-600 cursor-pointer">
                    marienebonelyn@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span>📞</span>
                  <span className="hover:text-teal-600 cursor-pointer">
                    +1 (587)-XXX-XXXX
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* price card */}
        <div className="bg-white p-4 rounded-xl shadow-sm my-4 max-w-md mx-auto">
          <h2 className="font-semibold mb-2 text-teal-600">Price Details</h2>
          <div className="text-sm text-black flex justify-between">
            <span>Price</span>
            <span>$55.00</span>
          </div>
          <div className="text-sm text-black flex justify-between">
            <span>Subtotal</span>
            <span>$55 + $5</span>
          </div>
          <div className="font-bold text-black flex justify-between mt-1 text-sm">
            <span>Total</span>
            <span>$60.00</span>
          </div>
        </div>

        {/* accept / decline buttons */}
        <div className="flex justify-center gap-4 my-6 max-w-md mx-auto w-full">
          <button
            onClick={() => setPopup("accepted")}
            className="bg-teal-500 text-white px-6 py-2 rounded-full shadow"
          >
            Accept Order
          </button>
          <button
            onClick={() => setPopup("declined")}
            className="bg-red-500 text-white px-6 py-2 rounded-full shadow"
          >
            Decline Order
          </button>
        </div>
      </div>

      {/* popup modal */}
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-5 rounded-xl shadow-md text-center w-72">
            <h2 className="font-bold text-lg text-black mb-3">
              {popup === "accepted" ? "✅ Order Accepted" : "❌ Order Declined"}
            </h2>
            <p className="text-sm text-gray-700 mb-5">
              {popup === "accepted"
                ? "You accepted this order successfully."
                : "You declined this order."}
            </p>
            <button
              onClick={handleClose}
              className="bg-teal-500 hover:bg-teal-600 transition text-white px-5 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Footer Nav */}
       <footer className="bg-cyan-500 py-4 mt-auto">
        <div className="flex justify-around items-center text-neutral-900 text-sm font-medium">
          <Link href="/h-portfolio" className="flex flex-col items-center gap-1">
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
