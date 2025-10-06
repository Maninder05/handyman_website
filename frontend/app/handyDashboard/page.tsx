"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FiUser } from "react-icons/fi";

type Service = {
  title: string;
  desc: string;
};

type Order = {
  title: string;
  desc: string;
};

type Profile = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  skills?: string[];
  profileImage?: string;
  jobsDone: number;
  inProgress: number;
  rating: number;
  earnings: number;
  activeOrders: number;
  services: Service[];
  recentOrders: Order[];
};

export default function HandyDashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  // Fetch handyman profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Replace with logged-in handyman's ID if authentication is added
        const response = await fetch("http://localhost:8000/api/handymen"); 
        const data: Profile[] = await response.json();
        if (data.length > 0) {
          setProfile(data[0]); // use first handyman for now
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => router.push("/");

  const toggleMenu = () => {
    setShowMenu((s) => !s);
    setShowProfileMenu(false);
  };

  const toggleProfile = () => {
    setShowProfileMenu((s) => !s);
    setShowMenu(false);
  };

  const handleAddProfileClick = () => router.push("/handyProfile");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* HEADER */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-[#B22222] tracking-wide">
            Handyman Dashboard
          </h1>

          <div className="flex items-center gap-4 relative">
            <button onClick={toggleProfile} className="p-2 rounded-full hover:bg-gray-100 transition" aria-label="profile menu">
              <FiUser size={22} className="text-gray-800" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-14 top-12 bg-white border rounded-lg shadow-lg w-48 z-50">
                <ul className="text-sm text-gray-800">
                  <li>
                    <Link href="/handyAccount" className="block px-4 py-3 hover:bg-gray-100">View Account</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100">Logout</button>
                  </li>
                </ul>
              </div>
            )}

            <button onClick={toggleMenu} className="p-2 rounded-md bg-[#B22222] text-white hover:bg-[#8B0000] transition" aria-label="open menu">
              {showMenu ? <X size={26} /> : <Menu size={26} />}
            </button>

            {showMenu && (
              <div className="absolute right-0 top-14 bg-white border rounded-xl shadow-lg w-64 text-sm z-50 overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  <li><Link href="/create-service" className="block px-4 py-3 hover:bg-gray-100">Add Service</Link></li>
                  <li><button onClick={handleAddProfileClick} className="w-full text-left px-4 py-3 hover:bg-gray-100">Add Profile</button></li>
                  <li><Link href="/handyAccount" className="block px-4 py-3 hover:bg-gray-100">My Account</Link></li>
                  <li><Link href="/order" className="block px-4 py-3 hover:bg-gray-100">Track Order</Link></li>
                  <li><Link href="/membership" className="block px-4 py-3 hover:bg-gray-100">Membership Plan</Link></li>
                  <li><Link href="/help" className="block px-4 py-3 hover:bg-gray-100">FAQ</Link></li>
                  <li><Link href="/settings" className="block px-4 py-3 hover:bg-gray-100">Account Settings</Link></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* PROFILE SECTION */}
      <main className="flex-1 overflow-y-auto pb-20">
        {profile ? (
          <>
            <section className="bg-[#B22222] text-white py-10">
              <div className="max-w-5xl mx-auto text-center">
                {profile.profileImage && (
                  <img src={profile.profileImage} alt="Profile" width={120} height={120} className="rounded-full border-4 border-[#FFCC66] mx-auto shadow-lg object-cover w-28 h-28"/>
                )}
                <h2 className="text-2xl font-semibold mt-4 text-white">{profile.name}</h2>
                <p className="text-sm text-gray-200">{profile.email}</p>

                <div className="flex justify-center gap-10 mt-6 text-white">
                  <div><p className="text-xl font-bold">{profile.jobsDone}</p><p className="text-sm opacity-90">Jobs Done</p></div>
                  <div><p className="text-xl font-bold">{profile.inProgress}</p><p className="text-sm opacity-90">In Progress</p></div>
                  <div><p className="text-xl font-bold">{profile.rating}</p><p className="text-sm opacity-90">Rating</p></div>
                </div>
              </div>
            </section>

            <section className="max-w-5xl mx-auto px-6 py-10 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white border rounded-xl shadow-sm p-6 text-center">
                  <p className="text-2xl font-bold text-[#B22222]">${profile.earnings}</p>
                  <p className="text-sm text-gray-500">Total Earnings</p>
                </div>
                <div className="bg-white border rounded-xl shadow-sm p-6 text-center">
                  <p className="text-2xl font-bold text-[#B22222]">{profile.activeOrders}</p>
                  <p className="text-sm text-gray-500">Active Orders</p>
                </div>
              </div>

              <div className="bg-white border rounded-xl shadow-sm p-6">
                <h3 className="font-semibold mb-4 text-[#B22222]">Recent Orders</h3>
                {(!profile.recentOrders || profile.recentOrders.length === 0) ? (
                  <p className="text-gray-500 text-sm">No recent orders.</p>
                ) : (
                  <ul className="space-y-3">
                    {profile.recentOrders.map((order, i) => (
                      <li key={i} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                        <p className="font-semibold text-gray-800">{order.title}</p>
                        <p className="text-sm text-gray-600">{order.desc}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="bg-white border rounded-xl shadow-sm p-6">
                <h3 className="font-semibold mb-4 text-[#B22222]">My Services</h3>
                {(!profile.services || profile.services.length === 0) ? (
                  <p className="text-gray-500 text-sm">No services added yet.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {profile.services.map((service, i) => (
                      <div key={i} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                        <p className="font-bold text-gray-800">{service.title}</p>
                        <p className="text-sm text-gray-600">{service.desc || "—"}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <p>No profile added yet.</p>
            <button onClick={handleAddProfileClick} className="mt-4 px-4 py-2 bg-[#B22222] text-white rounded hover:bg-[#8B0000] transition">Add Profile</button>
          </div>
        )}
      </main>
    </div>
  );
}
