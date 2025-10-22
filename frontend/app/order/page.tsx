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

  const handleClose = () => setPopup(null);
  const handleLogout = () => router.push("/");
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowProfileMenu(false);
  };
  const toggleProfile = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F1] flex flex-col">
      {/* ✅ Header */}
      <header className="bg-[#5C4033] shadow-md relative py-4 px-4 border-b-4 border-[#C4956A]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#EED9C4]">My Orders</h1>

          <div className="flex items-center gap-4 relative">
            {/* Profile Icon */}
            <button
              onClick={toggleProfile}
              className="p-2 rounded-full hover:bg-[#EED9C4]/30 transition"
            >
              <FiUser size={22} className="text-[#EED9C4]" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-14 top-14 bg-[#5C4033] rounded-xl shadow-lg border border-[#C4956A]/40 w-48 z-50">
                <ul className="text-sm divide-y divide-[#6D4C41]">
                  <li>
                    <Link
                      href="/handyAccount"
                      className="block px-4 py-3 hover:bg-[#C4956A] hover:text-white transition text-[#EED9C4]"
                    >
                      View Account
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-[#C4956A] hover:bg-[#EED9C4]/30 transition"
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
              className="p-2 rounded-md hover:bg-[#EED9C4]/30 bg-[#C4956A] text-white transition"
            >
              {showMenu ? <X size={26} /> : <Menu size={26} />}
            </button>

            {/* Hamburger Dropdown */}
            {showMenu && (
              <div className="absolute right-0 top-14 bg-[#5C4033] shadow-xl rounded-xl border border-[#C4956A]/40 w-56 text-sm z-50 overflow-hidden">
                <ul className="divide-y divide-[#6D4C41] text-[#EED9C4]">
                  {[
                    { label: "Add Service", href: "/create-service" },
                    { label: "Add Profile", href: "/Add-profile" },
                    { label: "My Account", href: "/handyAccount" },
                    { label: "Track Order", href: "/order" },
                    { label: "Membership Plan", href: "/membership" },
                    { label: "FAQ", href: "/help" },
                    { label: "Account Settings", href: "/settings" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="block px-4 py-3 hover:bg-[#C4956A] hover:text-white transition"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 🌟 Main Content */}
      <div className="flex-1 p-6 space-y-6 max-w-6xl mx-auto w-full">
        {/* Booking Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md my-4 w-full border-t-4 border-[#C4956A]">
          <p className="text-sm text-gray-500">Booking ID: xx53@#!</p>
          <div className="flex items-center mt-3 gap-4">
            <div className="w-16 h-16 flex items-center justify-center bg-[#FAF6F1] rounded-lg">
              <span className="text-3xl">👷</span>
            </div>
            <div>
              <p className="font-semibold text-[#C4956A] text-sm">
                Residential Wiring Repair
              </p>
              <p className="text-xs text-gray-500">
                Date: <span className="text-[#5C4033]">25 July 2025</span>
              </p>
              <p className="text-xs text-gray-500">
                Time: <span className="text-[#5C4033]">5:30 PM</span>
              </p>
            </div>
          </div>
        </div>

        {/* Buyer Info */}
        <div className="bg-white p-6 rounded-2xl shadow-md my-4 w-full border-t-4 border-[#C4956A]">
          <h2 className="font-semibold mb-2 text-[#C4956A]">Buyer Info</h2>
          <div className="flex gap-4 items-center">
            <Image
              src="/images/profilelogo.jpg"
              alt="buyer pic"
              width={64}
              height={64}
              className="rounded-full object-cover border border-[#EED9C4] w-16 h-16"
            />
            <div>
              <p className="font-medium text-[#5C4033]">Mariene Bonelyn</p>
              <p className="text-green-600 text-xs">✅ Ready to Hire</p>
              <div className="mt-1 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <span>📧</span>
                  <span className="hover:text-[#C4956A] cursor-pointer">
                    marienebonelyn@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span>📞</span>
                  <span className="hover:text-[#C4956A] cursor-pointer">
                    +1 (587)-XXX-XXXX
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div className="bg-white p-6 rounded-2xl shadow-md my-4 w-full border-t-4 border-[#C4956A]">
          <h2 className="font-semibold mb-2 text-[#C4956A]">Price Details</h2>
          <div className="text-sm flex justify-between text-[#5C4033]">
            <span>Price</span>
            <span>$55.00</span>
          </div>
          <div className="text-sm flex justify-between text-[#5C4033]">
            <span>Subtotal</span>
            <span>$55 + $5</span>
          </div>
          <div className="font-bold text-[#C4956A] flex justify-between mt-1 text-sm">
            <span>Total</span>
            <span>$60.00</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 my-6 w-full">
          <button
            onClick={() => setPopup("accepted")}
            className="bg-[#C4956A] text-white px-8 py-3 rounded-full shadow-md hover:bg-[#B38157] transition font-medium"
          >
            Accept Order
          </button>
          <button
            onClick={() => setPopup("declined")}
            className="bg-[#EED9C4] text-[#5C4033] px-8 py-3 rounded-full shadow-md hover:bg-[#E3C7A8] transition font-medium"
          >
            Decline Order
          </button>
        </div>
      </div>

      {/* Popup */}
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-md text-center w-80 border-t-4 border-[#C4956A] text-[#5C4033]">
            <h2 className="font-bold text-lg text-[#C4956A] mb-3">
              {popup === "accepted" ? "✅ Order Accepted" : "❌ Order Declined"}
            </h2>
            <p className="text-sm mb-5">
              {popup === "accepted"
                ? "You accepted this order successfully."
                : "You declined this order."}
            </p>
            <button
              onClick={handleClose}
              className="bg-[#C4956A] hover:bg-[#B38157] transition text-white px-5 py-2 rounded-lg font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
