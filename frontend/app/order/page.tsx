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
    <div className="min-h-screen flex flex-col bg-[#1E1E1E] text-[#F9F9F9]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#C8102E] to-[#CBB677] p-4 relative shadow-md flex items-center justify-center">
        {/* back button removed */}
        <h1 className="text-2xl font-extrabold text-white">Order Details</h1>
      </div>

      {/* main content of the page */}
      <div className="flex-1 p-6 space-y-6 max-w-6xl mx-auto w-full">
        {/* booking card */}
        <div className="bg-[#2A2A2A] p-6 rounded-2xl shadow-sm my-4 w-full border border-[#3A3A3A]">
          <p className="text-sm text-[#6B6B6B]">Booking ID: xx53@#!</p>
          <div className="flex items-center mt-3 gap-4">
            <div className="w-16 h-16 flex items-center justify-center bg-[#3A3A3A] rounded-lg">
              <span className="text-3xl">👷</span>
            </div>
            <div>
              <p className="font-semibold text-[#CBB677] text-sm">
                Residential Wiring Repair
              </p>
              <p className="text-xs text-[#6B6B6B]">
                Date: <span className="text-[#F9F9F9]">25 July 2025</span>
              </p>
              <p className="text-xs text-[#6B6B6B]">
                Time: <span className="text-[#F9F9F9]">5:30 PM</span>
              </p>
            </div>
          </div>
        </div>

        {/* card having buyer info */}
        <div className="bg-[#2A2A2A] p-6 rounded-2xl shadow-sm my-4 w-full border border-[#3A3A3A]">
          <h2 className="font-semibold mb-2 text-[#CBB677]">Buyer Info</h2>
          <div className="flex gap-4 items-center">
            <Image
              src="/images/profilelogo.jpg"
              alt="buyer pic"
              width={64}
              height={64}
              className="rounded-full object-cover border border-[#CBB677] w-16 h-16"
            />
            <div>
              <p className="font-medium text-[#F9F9F9]">Mariene Bonelyn</p>
              <p className="text-green-400 text-xs">✅ Ready to Hire</p>
              <div className="mt-1 text-xs text-[#6B6B6B]">
                <div className="flex items-center gap-1">
                  <span>📧</span>
                  <span className="hover:text-[#CBB677] cursor-pointer">
                    marienebonelyn@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span>📞</span>
                  <span className="hover:text-[#CBB677] cursor-pointer">
                    +1 (587)-XXX-XXXX
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* card for price */}
        <div className="bg-[#2A2A2A] p-6 rounded-2xl shadow-sm my-4 w-full border border-[#3A3A3A]">
          <h2 className="font-semibold mb-2 text-[#CBB677]">Price Details</h2>
          <div className="text-sm text-[#F9F9F9] flex justify-between">
            <span>Price</span>
            <span>$55.00</span>
          </div>
          <div className="text-sm text-[#F9F9F9] flex justify-between">
            <span>Subtotal</span>
            <span>$55 + $5</span>
          </div>
          <div className="font-bold text-[#CBB677] flex justify-between mt-1 text-sm">
            <span>Total</span>
            <span>$60.00</span>
          </div>
        </div>

        {/* buttons for accept and decline */}
        <div className="flex justify-center gap-4 my-6 w-full">
          <button
            onClick={() => setPopup("accepted")}
            className="bg-[#C8102E] text-white px-8 py-3 rounded-full shadow hover:bg-[#A60D24] transition font-medium"
          >
            Accept Order
          </button>
          <button
            onClick={() => setPopup("declined")}
            className="bg-[#6B6B6B] text-white px-8 py-3 rounded-full shadow hover:bg-[#555555] transition font-medium"
          >
            Decline Order
          </button>
        </div>
      </div>

      {/* modal for the popup of accept and decline */}
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#2A2A2A] p-6 rounded-2xl shadow-md text-center w-80 border border-[#3A3A3A]">
            <h2 className="font-bold text-lg text-[#CBB677] mb-3">
              {popup === "accepted" ? "✅ Order Accepted" : "❌ Order Declined"}
            </h2>
            <p className="text-sm text-[#F9F9F9] mb-5">
              {popup === "accepted"
                ? "You accepted this order successfully."
                : "You declined this order."}
            </p>
            <button
              onClick={handleClose}
              className="bg-[#C8102E] hover:bg-[#A60D24] transition text-white px-5 py-2 rounded-lg font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* footer with five elements */}
      <footer className="bg-[#1E1E1E] text-[#F9F9F9] mt-10 border-t-4 border-[#C8102E]">
        <div className="max-w-6xl mx-auto flex justify-around py-5 text-sm">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 hover:text-[#C8102E] transition"
          >
            <FiHome size={20} /> Home
          </Link>
          <Link
            href="/messages"
            className="flex flex-col items-center gap-1 hover:text-[#C8102E] transition"
          >
            <FiMessageCircle size={20} /> Messages
          </Link>
          <Link
            href="/help"
            className="flex flex-col items-center gap-1 hover:text-[#C8102E] transition"
          >
            <FiHelpCircle size={20} /> Help
          </Link>
          <Link
            href="/notifications"
            className="flex flex-col items-center gap-1 hover:text-[#C8102E] transition"
          >
            <FiBell size={20} /> Notifications
          </Link>
          <Link
            href="/settings"
            className="flex flex-col items-center gap-1 hover:text-[#C8102E] transition"
          >
            <FiSettings size={20} /> Settings
          </Link>
        </div>
      </footer>
    </div>
  );
}
