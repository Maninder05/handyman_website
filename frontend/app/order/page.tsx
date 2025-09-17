"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiHome, FiMessageCircle, FiHelpCircle, FiBell, FiSettings } from "react-icons/fi";

export default function OrderDetailsPage() {
  // track popup state whether it is accepted or declined even if it is null
  const [popup, setPopup] = useState<"accepted" | "declined" | null>(null);

  // reset popup
  const handleClose = () => {
    setPopup(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 text-neutral-800">
      {/* Header */}
      <div className="bg-blue-500 p-4 relative shadow-md flex items-center justify-center">
        <Link href="/portfolio">
          <button className="text-2xl absolute left-4 top-3 text-white">←</button>
        </Link>
        <h1 className="text-2xl font-bold text-white">Order Details</h1>
      </div>

      {/* main content of the page */}
      <div className="flex-1 p-4 space-y-6">
        {/* booking card */}
        <div className="bg-white p-4 rounded-xl shadow-sm my-4 max-w-md mx-auto">
          <p className="text-sm text-gray-600">Booking ID: xx53@#!</p>
          <div className="flex items-center mt-3 gap-3">
            <div className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-lg">
              <span className="text-2xl">👷</span>
            </div>
            <div>
              <p className="font-semibold text-neutral-800 text-sm">
                Residential Wiring Repair
              </p>
              <p className="text-xs text-gray-600">
                Date: <span className="text-neutral-800">25 July 2025</span>
              </p>
              <p className="text-xs text-gray-600">
                Time: <span className="text-neutral-800">5:30 PM</span>
              </p>
            </div>
          </div>
        </div>

        {/* card having buyer info */}
        <div className="bg-white p-4 rounded-xl shadow-sm my-4 max-w-md mx-auto">
          <h2 className="font-semibold mb-2 text-blue-500">Buyer Info</h2>
          <div className="flex gap-4 items-center">
            <Image
              src="/images/profilelogo.jpg"
              alt="buyer pic"
              width={56}
              height={56}
              className="rounded-full object-cover border border-blue-500 w-14 h-14"
            />
            <div>
              <p className="font-medium text-neutral-800">Mariene Bonelyn</p>
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
                  <span className="hover:text-blue-600 cursor-pointer">
                    +1 (587)-XXX-XXXX
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* card for price */}
        <div className="bg-white p-4 rounded-xl shadow-sm my-4 max-w-md mx-auto">
          <h2 className="font-semibold mb-2 text-blue-500">Price Details</h2>
          <div className="text-sm text-neutral-800 flex justify-between">
            <span>Price</span>
            <span>$55.00</span>
          </div>
          <div className="text-sm text-neutral-800 flex justify-between">
            <span>Subtotal</span>
            <span>$55 + $5</span>
          </div>
          <div className="font-bold text-neutral-800 flex justify-between mt-1 text-sm">
            <span>Total</span>
            <span>$60.00</span>
          </div>
        </div>

        {/* buttons for accept and decline */}
        <div className="flex justify-center gap-4 my-6 max-w-md mx-auto w-full">
          <button
            onClick={() => setPopup("accepted")}
            className="bg-blue-500 text-white px-6 py-2 rounded-full shadow"
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

      {/* modal for the popup of accept and decline */}
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-5 rounded-xl shadow-md text-center w-72">
            <h2 className="font-bold text-lg text-neutral-800 mb-3">
              {popup === "accepted" ? "✅ Order Accepted" : "❌ Order Declined"}
            </h2>
            <p className="text-sm text-gray-700 mb-5">
              {popup === "accepted"
                ? "You accepted this order successfully."
                : "You declined this order."}
            </p>
            <button
              onClick={handleClose}
              className="bg-blue-500 hover:bg-blue-600 transition text-white px-5 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

        {/* footer with five elements */}
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

//Create a Next.js client component OrderDetailsPage based on the attached reference image. 
// Include a header with back button, booking details card, buyer info card, price details card, 
// and Accept/Decline buttons with a modal popup for each action. Add a footer with five navigation icons, 
// use Tailwind CSS and Next.js Image, and keep it clean and easy to customize.