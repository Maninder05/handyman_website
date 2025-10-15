"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FilterPage() {
  // this is for the dropdown menu
  const [showMenu, setShowMenu] = useState(false);

  // toggle profile dropdown
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // next.js router for changing pages
  const router = useRouter();

  // logout
  const handleLogout = () => {
    router.push("/");
  };

  // toggle hamburger dropdown
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowProfileMenu(false); // close profile if menu is opened
  };

  // toggle profile dropdown
  const toggleProfile = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowMenu(false); // close menu if profile is opened
  };
  const [rate, setRate] = useState(50);
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  // New address states
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");

  const skillOptions = [
    "House Cleaning",
    "Floor Cleaning",
    "Disinfection",
    "Dusting & Vacuuming",
    "Plumbing",
    "Electrical Work",
    "Carpentry",
    "Painting",
    "Furniture Assembly",
    "Appliance Repair",
  ];

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const applyFilters = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("⚠️ Please login first!");
        return;
      }

      const filters = {
        hourlyRate: rate,
        experience: Number(experience),
        skills,
        address: {
          address1,
          city,
          province,
        },
        attributes: { updatedAt: new Date().toISOString() },
      };

      const res = await fetch("http://localhost:7000/api/handymen/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(filters),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok) {
        alert("✅ Filters saved successfully!");
        console.log("Saved handyman:", data);
      } else {
        alert("❌ Error: " + (data.error || "Unknown error"));
        console.error("Error response:", data);
      }
    } catch (err: unknown) {
      console.error("Apply filters failed:", err);
      if (err instanceof Error) {
        alert("❌ Request failed: " + err.message);
      } else {
        alert("❌ Request failed: An unknown error occurred.");
      }
    }
  };

  return (
    <main className="bg-amber-50 min-h-screen text-gray-100 flex flex-col items-center ">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#FFCC66] to-[#FF7E5F] shadow-md relative w-full">
        <div className="w-full flex items-center justify-between px-20 py-6">
          {/* Title */}
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-wide">
            Handyman Portal
          </h1>

          {/* Right side buttons */}
          <div className="flex items-center gap-4 relative">
            {/* Profile Icon */}
            <button
              onClick={toggleProfile}
              className="p-2 rounded-full hover:bg-yellow-500 transition"
            >
              <FiUser size={22} className="text-gray-900" />
            </button>

            {/* Profile dropdown */}
            {showProfileMenu && (
              <div className="absolute right-14 top-14 bg-gray-800 rounded-xl shadow-lg border w-48 z-50">
                <ul className="text-sm divide-y">
                  <li>
                    <Link
                      href="/handyAccount"
                      className="block px-4 py-3 hover:bg-yellow-600 hover:text-gray-900 transition"
                    >
                      View Account
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {/* Menu button */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-yellow-500 bg-yellow-400 text-gray-900 transition"
            >
              {showMenu ? <X size={26} /> : <Menu size={26} />}
            </button>

            {/* Hamburger dropdown */}
            {showMenu && (
              <div className="absolute right-0 top-14 bg-gray-800 shadow-xl rounded-xl border w-56 text-sm z-50 overflow-hidden">
                <ul className="divide-y">
                  <li>
                    <Link
                      href="/create-service"
                      className="block px-4 py-3 hover:bg-yellow-600 hover:text-gray-900 transition"
                    >
                      Add Service
                    </Link>
                  </li>
                  {/*  Create Profile page */}
                  <li>
                    <Link
                      href="/Add-profile"
                      className="block px-4 py-3 hover:bg-yellow-600 hover:text-gray-900 transition"
                    >
                      Add profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/handyAccount"
                      className="block px-4 py-3 hover:bg-yellow-600 hover:text-gray-900 transition"
                    >
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/order"
                      className="block px-4 py-3 hover:bg-yellow-600 hover:text-gray-900 transition"
                    >
                      Track Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/membership"
                      className="block px-4 py-3 hover:bg-yellow-600 hover:text-gray-900 transition"
                    >
                      Membership Plan
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/help"
                      className="block px-4 py-3 hover:bg-yellow-600 hover:text-gray-900 transition"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings"
                      className="block px-4 py-3 hover:bg-yellow-600 hover:text-gray-900 transition"
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

      {/* Filter Card */}
      <section className="bg-white-100 text-gray-100 mt-12 p-8 rounded-2xl shadow-2xl w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
          Filters
        </h2>

        {/* Hourly Rate */}
        <div className="mb-10">
          <label className="block font-semibold mb-3 text-gray-900">
            Hourly Rate
          </label>
          <input
            type="range"
            min="50"
            max="1000"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-yellow-500"
          />
          <div className="flex justify-between text-sm text-gray-900 mt-1">
            <span>$50</span>
            <span>$1000</span>
          </div>
          <p className="text-sm mt-2 text-gray-800 text-center">
            Selected: ${rate}
          </p>
        </div>

        {/* Experience Dropdown */}
        <div className="mb-10">
          <label className="block font-semibold mb-3 text-gray-900">
            Experience
          </label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full p-3 rounded-lg bg-white-900 border border-gray-900 text-gray-900 focus:border-yellow-500 focus:ring focus:ring-yellow-400"
          >
            <option value="">Select Experience</option>
            <option value="1">1+ Years</option>
            <option value="3">3+ Years</option>
            <option value="5">5+ Years</option>
            <option value="10">10+ Years</option>
          </select>
        </div>

        {/* Address Section */}
        <div className="mb-10">
          <label className="block font-semibold mb-3 text-gray-900">
            Address
          </label>
          <input
            type="text"
            placeholder="Street name / House no"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg bg-white-900 border border-gray-900 text-gray-900 focus:border-yellow-500 focus:ring focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg bg-white-900 border border-gray-900 text-gray-900 focus:border-yellow-500 focus:ring focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="w-full p-3 rounded-lg bg-white-900 border border-gray-900 text-gray-900 focus:border-yellow-500 focus:ring focus:ring-yellow-400"
          />
        </div>

        {/* Skills */}
        <div className="mb-10">
          <label className="block font-semibold mb-3 text-gray-900">
            Skills
          </label>
          <div className="flex flex-wrap gap-3">
            {skillOptions.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  skills.includes(skill)
                    ? "bg-yellow-500 text-gray-900 shadow-md"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-12">
          <button
            onClick={() => {
              setRate(50);
              setExperience("");
              setSkills([]);
              setAddress1("");
              setCity("");
              setProvince("");
            }}
            className="px-8 py-3 bg-White-700 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Reset
          </button>
          <button
            onClick={applyFilters}
            className="px-8 py-3 bg-yellow-500 text-gray-900 rounded-xl font-semibold shadow-md hover:bg-yellow-400 transition"
          >
            Save
          </button>
        </div>
      </section>
    </main>
  );
}
