"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FiUser } from "react-icons/fi";

export default function ProjectsPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();

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
      {/* ✅ Header same as Order Page */}
      <header className="bg-[#1C1C1C] shadow-md relative py-4 px-4 border-b-4 border-[#C8102E]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#FFFFFF]">My Projects</h1>

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

      {/* ✅ Main content remains the same */}
      <div className="flex-1 p-6 space-y-6 max-w-6xl mx-auto w-full">
        {/* In Progress jobs */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1E1E1E] mb-4 mt-6 text-center">
            In Progress
          </h2>
          <div className="bg-white flex-1 max-w-3xl mx-auto w-full rounded-2xl px-4 py-6 border border-[#CBB677]/40 shadow-sm">
            <Image
              src="/images/profilelogo.jpg"
              alt="Voltage Maintenance"
              width={90}
              height={90}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex flex-col mt-2">
              <p className="font-bold text-[#1E1E1E]">VOLTAGE MAINTENANCE</p>
              <p className="text-[#6B6B6B] text-sm">Client: Chris Matthem</p>
              <p className="text-[#C8102E] text-sm font-medium">
                In Progress ⏳
              </p>
              <p className="text-[#1E1E1E] font-semibold">$45/hr</p>
            </div>
          </div>
        </div>

        {/* Completed jobs */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1E1E1E] mb-4 mt-6 text-center">
            Completed
          </h2>
          <div className="bg-white flex-1 max-w-3xl mx-auto w-full rounded-2xl px-4 py-6 mb-4 border border-[#CBB677]/40 shadow-sm">
            <Image
              src="/images/profilelogo.jpg"
              alt="Residential Wiring Repair"
              width={90}
              height={90}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex flex-col mt-2">
              <p className="font-bold text-[#1E1E1E]">
                RESIDENTIAL WIRING REPAIR
              </p>
              <p className="text-[#6B6B6B] text-sm">Client: Mariene Bonelyn</p>
              <p className="text-[#CBB677] text-sm">⭐⭐⭐⭐⭐ 5</p>
              <p className="text-[#1E1E1E] font-semibold">$55/hr</p>
            </div>
          </div>

          <div className="bg-white flex-1 max-w-3xl mx-auto w-full rounded-2xl px-4 py-6 mb-4 border border-[#CBB677]/40 shadow-sm">
            <Image
              src="/images/profilelogo.jpg"
              alt="Power Outlet Repair"
              width={90}
              height={90}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex flex-col mt-2">
              <p className="font-bold text-[#1E1E1E]">
                POWER OUTLET/LOAD REPAIR
              </p>
              <p className="text-[#6B6B6B] text-sm">Client: Asha Sharma</p>
              <p className="text-[#CBB677] text-sm">⭐⭐⭐⭐ 4.9</p>
              <p className="text-[#1E1E1E] font-semibold">$40/hr</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
