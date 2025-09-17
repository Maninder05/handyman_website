// app/portfolio/page.tsx
"use client";

// react stuff
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// icons
import { Menu, X } from "lucide-react";
import { FiHome, FiMessageCircle, FiHelpCircle, FiBell, FiSettings } from "react-icons/fi";

export default function PortfolioPage() {
  // this is for the little menu (open / close)
  const [showMenu, setShowMenu] = useState(false);

  // this is for switching between buyer and seller
  const [buyerMode, setBuyerMode] = useState(false);

  // next.js router for changing pages
  const router = useRouter();

  // when we click the switch button
  const handleSwitchClick = () => {
    setBuyerMode(!buyerMode);
    if (!buyerMode) {
      // go to buyer page
      router.push("../portfolio");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">

      {/* top header bar */}
      <div className="bg-neutal-100 p-4 relative shadow-md flex items-center justify-center">
        
        {/* back arrow button */}
        <Link href="/auth/login">
          <button className="text-2xl absolute left-4 top-3 text-black">←</button>
        </Link>

        <h1 className="text-2xl font-bold text-black">Profile</h1>

        {/* menu button (hamburger or X) */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="hover:opacity-80 absolute  text-black right-4 top-3"
        >
          {showMenu ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* the dropdown menu when you click */}
        {showMenu && (
          <div className="absolute right-6 top-16 bg-white shadow-lg rounded-lg w-56 text-black text-sm z-50">
            <ul className="divide-y">
              <li><Link href="/create-service" className="block px-4 py-3 hover:bg-gray-50">Add Service</Link></li>
               <li><Link href="/account" className="block px-4 py-3 hover:bg-gray-50">My Account</Link></li>
              <li><Link href="/order" className="block px-4 py-3 hover:bg-gray-50">Track Order</Link></li>
              <li><Link href="/membership" className="block px-4 py-3 hover:bg-gray-50">Membership Plan</Link></li>
              <li><Link href="/faq" className="block px-4 py-3 hover:bg-gray-50">FAQ</Link></li>
              <li><Link href="/settings" className="block px-4 py-3 hover:bg-gray-50">Account Settings</Link></li>
            </ul>
          </div>
        )}
      </div>

      {/* profile area */}
      <div className="bg-cyan-500 text-white px-6 pb-8 pt-6">
        <div className="flex items-center space-x-4">
          <Image
            src="/images/profile.jpg"
            alt="profile"
            width={90}
            height={90}
            className="rounded-full border-4 border-white shadow-lg"
          />
          <div className=" text-black px-5 py-3 rounded-lg">
            <h2 className="font-semibold text-lg">Kenji Teneka</h2>
            <p className="text-sm">kenjitenka@gmail.com</p>
          </div>
        </div>

        {/* numbers for jobs done, etc */}
        <div className="flex justify-around mt-6">
          <Link href="/jobs">
            <div className=" text-black px-4 py-3 rounded-lg text-center cursor-pointer">
              <p className="text-lg font-bold text-black">15</p>
              <p className="text-m font-semibold">Job Done</p>
            </div>
          </Link>
          <Link href="/progress">
            <div className=" text-black px-4 py-3 rounded-lg text-center cursor-pointer">
              <p className="text-lg font-bold text-black">3</p>
              <p className="text-m font-semibold">Job In Progress</p>
            </div>
          </Link>
          <Link href="/ratings">
            <div className=" text-black px-4 py-3 rounded-lg text-center cursor-pointer">
              <p className="text-lg font-bold text-black">5</p>
              <p className="text-m font-semibold">Rating ⭐</p>
            </div>
          </Link>
        </div>
      </div>

      {/* toggle switch for buyer/seller */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <span className="font-semibold text-black">Switch To Buyer</span>
        <button
          onClick={handleSwitchClick}
          className={`w-14 h-7 flex items-center rounded-full p-1 transition ${buyerMode ? "bg-black" : "bg-gray-400"}`}
        >
          {/* the little round circle */}
          <div
            className={`w-5 h-5 bg-white rounded-full shadow transform ${buyerMode ? "translate-x-7" : "translate-x-0"}`}
          />
        </button>
      </div>

      {/* money and orders */}
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

      {/* recent orders */}
      <div className="px-6">
        <h3 className="font-semibold mb-3 text-black">Recent Orders</h3>
        <div className="bg-white p-5 rounded-lg">
          <p className="font-bold text-black">🔧 ELECTRICAL REPAIR</p>
          <p className="text-sm text-gray-600">
            John Patrosky recently booked for the electrical repair service.
          </p>
        </div>
      </div>

      {/* bottom nav bar */}
      <footer className="bg-cyan-500 py-4 mt-auto">
        <div className="flex justify-around items-center text-neutral-900 text-sm font-medium">
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
