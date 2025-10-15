"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FiUser } from "react-icons/fi";

export default function OrderPage() {
  const [popup, setPopup] = useState<"accepted" | "declined" | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setPopup(null);
  };

  const handleLogout = () => {
    router.push("/");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowProfileMenu(false);
  };

  const toggleProfile = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col">
      {/* ✅ Header (Copied from Create Service page) */}
      <header className="bg-[#1C1C1C] shadow-md relative py-4 px-4 border-b-4 border-[#C8102E]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#FFFFFF]">My Orders</h1>

          <div className="flex items-center gap-4 relative">
            {/* Profile Icon */}
            <button
              onClick={toggleProfile}
              className="p-2 rounded-full hover:bg-[#C5A96A]/30 transition"
            >
              <FiUser size={22} className="text-[#FFFFFF]" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-14 top-14 bg-[#1C1C1C] rounded-xl shadow-lg border border-[#C5A96A]/40 w-48 z-50">
                <ul className="text-sm divide-y divide-[#333]">
                  <li>
                    <Link
                      href="/handyAccount"
                      className="block px-4 py-3 hover:bg-[#C8102E] hover:text-white transition text-[#FFFFFF]"
                    >
                      View Account
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-[#C8102E] hover:bg-[#C8102E]/20 transition"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {/* Hamburger Menu */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-[#C5A96A]/30 bg-[#C8102E] text-white transition"
            >
              {showMenu ? <X size={26} /> : <Menu size={26} />}
            </button>

            {/* Hamburger Dropdown */}
            {showMenu && (
              <div className="absolute right-0 top-14 bg-[#1C1C1C] shadow-xl rounded-xl border border-[#C5A96A]/40 w-56 text-sm z-50 overflow-hidden">
                <ul className="divide-y divide-[#333] text-[#FFFFFF]">
                  <li>
                    <Link
                      href="/create-service"
                      className="block px-4 py-3 hover:bg-[#C8102E] transition"
                    >
                      Add Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/Add-profile"
                      className="block px-4 py-3 hover:bg-[#C8102E] transition"
                    >
                      Add Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/handyAccount"
                      className="block px-4 py-3 hover:bg-[#C8102E] transition"
                    >
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/order"
                      className="block px-4 py-3 hover:bg-[#C8102E] transition"
                    >
                      Track Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/membership"
                      className="block px-4 py-3 hover:bg-[#C8102E] transition"
                    >
                      Membership Plan
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/help"
                      className="block px-4 py-3 hover:bg-[#C8102E] transition"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings"
                      className="block px-4 py-3 hover:bg-[#C8102E] transition"
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

      {/* main content of the page */}
      <div className="flex-1 p-6 space-y-6 max-w-6xl mx-auto w-full">
        {/* booking card */}
        <div className="bg-[#FFFFFF] p-6 rounded-2xl shadow-sm my-4 w-full border-t-4 border-[#C8102E]">
          <p className="text-sm text-gray-500">Booking ID: xx53@#!</p>
          <div className="flex items-center mt-3 gap-4">
            <div className="w-16 h-16 flex items-center justify-center bg-[#F4F4F4] rounded-lg">
              <span className="text-3xl">👷</span>
            </div>
            <div>
              <p className="font-semibold text-[#C5A96A] text-sm">
                Residential Wiring Repair
              </p>
              <p className="text-xs text-gray-500">
                Date: <span className="text-[#1C1C1C]">25 July 2025</span>
              </p>
              <p className="text-xs text-gray-500">
                Time: <span className="text-[#1C1C1C]">5:30 PM</span>
              </p>
            </div>
          </div>
        </div>

        {/* buyer info */}
        <div className="bg-[#FFFFFF] p-6 rounded-2xl shadow-sm my-4 w-full border-t-4 border-[#C8102E]">
          <h2 className="font-semibold mb-2 text-[#C5A96A]">Buyer Info</h2>
          <div className="flex gap-4 items-center">
            <Image
              src="/images/profilelogo.jpg"
              alt="buyer pic"
              width={64}
              height={64}
              className="rounded-full object-cover border border-[#C5A96A] w-16 h-16"
            />
            <div>
              <p className="font-medium text-[#1C1C1C]">Mariene Bonelyn</p>
              <p className="text-green-600 text-xs">✅ Ready to Hire</p>
              <div className="mt-1 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <span>📧</span>
                  <span className="hover:text-[#C5A96A] cursor-pointer">
                    marienebonelyn@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span>📞</span>
                  <span className="hover:text-[#C5A96A] cursor-pointer">
                    +1 (587)-XXX-XXXX
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* price details */}
        <div className="bg-[#FFFFFF] p-6 rounded-2xl shadow-sm my-4 w-full border-t-4 border-[#C8102E]">
          <h2 className="font-semibold mb-2 text-[#C5A96A]">Price Details</h2>
          <div className="text-sm flex justify-between text-[#1C1C1C]">
            <span>Price</span>
            <span>$55.00</span>
          </div>
          <div className="text-sm flex justify-between text-[#1C1C1C]">
            <span>Subtotal</span>
            <span>$55 + $5</span>
          </div>
          <div className="font-bold text-[#C8102E] flex justify-between mt-1 text-sm">
            <span>Total</span>
            <span>$60.00</span>
          </div>
        </div>

        {/* buttons */}
        <div className="flex justify-center gap-4 my-6 w-full">
          <button
            onClick={() => setPopup("accepted")}
            className="bg-[#C8102E] text-white px-8 py-3 rounded-full shadow hover:bg-[#A60E27] transition font-medium"
          >
            Accept Order
          </button>
          <button
            onClick={() => setPopup("declined")}
            className="bg-[#C5A96A] text-[#1C1C1C] px-8 py-3 rounded-full shadow hover:bg-[#B99655] transition font-medium"
          >
            Decline Order
          </button>
        </div>
      </div>

      {/* popup */}
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-md text-center w-80 border-t-4 border-[#C8102E] text-[#1C1C1C]">
            <h2 className="font-bold text-lg text-[#C5A96A] mb-3">
              {popup === "accepted" ? "✅ Order Accepted" : "❌ Order Declined"}
            </h2>
            <p className="text-sm mb-5">
              {popup === "accepted"
                ? "You accepted this order successfully."
                : "You declined this order."}
            </p>
            <button
              onClick={handleClose}
              className="bg-[#C8102E] hover:bg-[#A60E27] transition text-white px-5 py-2 rounded-lg font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
      </div>

  );
}
