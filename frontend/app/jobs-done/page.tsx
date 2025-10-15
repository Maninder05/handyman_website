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
      {/* 🌟 Header */}
      <header className="bg-[#5C4033] shadow-md relative py-4 px-4 border-b-4 border-[#C4956A]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#EED9C4]">My Projects</h1>

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

      {/* 🌸 Main Content */}
      <div className="flex-1 p-6 space-y-6 max-w-6xl mx-auto w-full">
        {/* In Progress Projects */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#5C4033] mb-4 mt-6 text-center">
            In Progress
          </h2>
          <div className="bg-white flex-1 max-w-3xl mx-auto w-full rounded-2xl px-4 py-6 border-t-4 border-[#C4956A] shadow-md">
            <div className="flex items-center gap-4">
              <Image
                src="/images/profilelogo.jpg"
                alt="Voltage Maintenance"
                width={90}
                height={90}
                className="w-16 h-16 rounded-xl object-cover border border-[#EED9C4]"
              />
              <div className="flex flex-col">
                <p className="font-bold text-[#5C4033]">
                  Voltage Maintenance
                </p>
                <p className="text-[#6D4C41] text-sm">Client: Chris Matthem</p>
                <p className="text-[#C4956A] text-sm font-medium">
                  In Progress ⏳
                </p>
                <p className="text-[#5C4033] font-semibold">$45/hr</p>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Projects */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#5C4033] mb-4 mt-6 text-center">
            Completed
          </h2>

          {[
            {
              title: "Residential Wiring Repair",
              client: "Mariene Bonelyn",
              rating: "⭐⭐⭐⭐⭐ 5",
              price: "$55/hr",
            },
            {
              title: "Power Outlet/Load Repair",
              client: "Asha Sharma",
              rating: "⭐⭐⭐⭐ 4.9",
              price: "$40/hr",
            },
          ].map((project, index) => (
            <div
              key={index}
              className="bg-white flex-1 max-w-3xl mx-auto w-full rounded-2xl px-4 py-6 mb-4 border-t-4 border-[#C4956A] shadow-md"
            >
              <div className="flex items-center gap-4">
                <Image
                  src="/images/profilelogo.jpg"
                  alt={project.title}
                  width={90}
                  height={90}
                  className="w-16 h-16 rounded-xl object-cover border border-[#EED9C4]"
                />
                <div className="flex flex-col">
                  <p className="font-bold text-[#5C4033]">{project.title}</p>
                  <p className="text-[#6D4C41] text-sm">
                    Client: {project.client}
                  </p>
                  <p className="text-[#C4956A] text-sm">{project.rating}</p>
                  <p className="text-[#5C4033] font-semibold">
                    {project.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
