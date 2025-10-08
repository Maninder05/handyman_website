"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FiUser } from "react-icons/fi";

type Service = { title: string; desc: string; };
type Order = { title: string; desc: string; };
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

  // Fetch only logged-in handyman profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:8000/api/handymen/me", {
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data: Profile = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const toggleMenu = () => { setShowMenu(s => !s); setShowProfileMenu(false); };
  const toggleProfile = () => { setShowProfileMenu(s => !s); setShowMenu(false); };
  const handleAddProfileClick = () => router.push("/handyProfile");

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-gray-900 flex flex-col">
      {/* HEADER  */}
      <header className="bg-[#1a1a1a] shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Handyman <span className="text-[#D4A574]">Dashboard</span>
          </h1>

          <div className="flex items-center gap-4 relative">
            <button onClick={toggleProfile} className="p-2 rounded-full hover:bg-[#2a2a2a] transition">
              <FiUser size={24} className="text-white" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-14 top-14 bg-white border border-gray-200 rounded-lg shadow-lg w-52 z-50">
                <ul className="text-sm text-gray-800">
                  <li>
                    <Link href="/handyAccount" className="block px-5 py-3 hover:bg-[#F5F5F0] font-medium">View Account</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="w-full text-left px-5 py-3 text-[#C41E3A] hover:bg-red-50 font-medium">Logout</button>
                  </li>
                </ul>
              </div>
            )}

            <button onClick={toggleMenu} className="p-2 rounded-md bg-[#D4A574] text-[#1a1a1a] hover:bg-[#C4956A] transition">
              {showMenu ? <X size={26} /> : <Menu size={26} />}
            </button>

            {showMenu && (
              <div className="absolute right-0 top-14 bg-white border border-gray-200 rounded-xl shadow-lg w-72 text-sm z-50 overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  <li><Link href="/create-service" className="block px-5 py-3 hover:bg-[#F5F5F0] font-medium">Add Service</Link></li>
                  <li><button onClick={handleAddProfileClick} className="w-full text-left px-5 py-3 hover:bg-[#F5F5F0] font-medium">Add Profile</button></li>
                  <li><Link href="/handyAccount" className="block px-5 py-3 hover:bg-[#F5F5F0] font-medium">My Account</Link></li>
                  <li><Link href="/order" className="block px-5 py-3 hover:bg-[#F5F5F0] font-medium">Track Order</Link></li>
                  <li><Link href="/membership" className="block px-5 py-3 hover:bg-[#F5F5F0] font-medium">Membership Plan</Link></li>
                  <li><Link href="/help" className="block px-5 py-3 hover:bg-[#F5F5F0] font-medium">FAQ</Link></li>
                  <li><Link href="/settings" className="block px-5 py-3 hover:bg-[#F5F5F0] font-medium">Account Settings</Link></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* PROFILE SECTION */}
      <main className="flex-1 overflow-y-auto pb-20">
        {profile ? (
          <div className="max-w-6xl mx-auto px-6 py-10">
            {/* Profile Card */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] px-8 py-10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {profile.profileImage ? (
                    <img src={profile.profileImage} alt="Profile" className="rounded-full border-4 border-[#D4A574] w-28 h-28 object-cover shadow-lg"/>
                  ) : (
                    <div className="w-28 h-28 rounded-full border-4 border-[#D4A574] bg-[#3a3a3a] flex items-center justify-center">
                      <FiUser size={48} className="text-[#D4A574]" />
                    </div>
                  )}
                  <div className="text-center md:text-left flex-1">
                    <h2 className="text-3xl font-bold text-white mb-2">{profile.name}</h2>
                    <p className="text-[#D4A574] mb-1">{profile.email}</p>
                    {profile.phone && <p className="text-gray-300 text-sm">{profile.phone}</p>}
                  </div>
                </div>
              </div>
              
              <div className="px-8 py-6 bg-[#F5F5F0]">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold text-[#D4A574]">{profile.jobsDone}</p>
                    <p className="text-sm text-gray-600 mt-1">Jobs Completed</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#D4A574]">{profile.inProgress}</p>
                    <p className="text-sm text-gray-600 mt-1">In Progress</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#D4A574]">{profile.rating}</p>
                    <p className="text-sm text-gray-600 mt-1">Rating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-2">Total Earnings</p>
                    <p className="text-4xl font-bold text-[#D4A574]">${profile.earnings}</p>
                  </div>
                  <div className="w-16 h-16 bg-[#D4A574]/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-2">Active Orders</p>
                    <p className="text-4xl font-bold text-[#1a1a1a]">{profile.activeOrders}</p>
                  </div>
                  <div className="w-16 h-16 bg-[#1a1a1a]/5 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📋</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            {profile.bio && (
              <div className="bg-white shadow-lg rounded-xl p-8 mb-8 border border-gray-200">
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4 pb-3 border-b-2 border-[#D4A574]">About Me</h3>
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
              </div>
            )}

            {/* Services Grid */}
            <div className="bg-white shadow-lg rounded-xl p-8 mb-8 border border-gray-200">
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-6 pb-3 border-b-2 border-[#D4A574]">Services Offered</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.services.map((s,i) => (
                  <div key={i} className="p-5 border-2 border-gray-200 rounded-lg bg-[#F5F5F0] hover:border-[#D4A574] hover:shadow-md transition">
                    <p className="font-bold text-[#1a1a1a] mb-1">{s.title}</p>
                    <p className="text-sm text-gray-600">{s.desc || "—"}</p>
                  </div>
                ))}
                {profile.services.length === 0 && (
                  <p className="text-gray-500 text-sm col-span-full text-center py-4">No services added.</p>
                )}
              </div>
            </div>

            {/* Skills Section */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="bg-white shadow-lg rounded-xl p-8 mb-8 border border-gray-200">
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-6 pb-3 border-b-2 border-[#D4A574]">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-3">
                  {profile.skills.map((s,i) => (
                    <span key={i} className="bg-[#D4A574] text-[#1a1a1a] px-4 py-2 rounded-full font-medium hover:bg-[#C4956A] transition">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Orders */}
            <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-6 pb-3 border-b-2 border-[#D4A574]">Recent Orders</h3>
              {(!profile.recentOrders || profile.recentOrders.length === 0) ? (
                <p className="text-gray-500 text-center py-8">No recent orders to display.</p>
              ) : (
                <ul className="space-y-4">
                  {profile.recentOrders.map((order, i) => (
                    <li key={i} className="p-5 border-l-4 border-[#D4A574] bg-[#F5F5F0] rounded-lg hover:shadow-md transition">
                      <p className="font-bold text-[#1a1a1a] text-lg mb-1">{order.title}</p>
                      <p className="text-gray-600">{order.desc}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="bg-white rounded-xl shadow-lg p-12 text-center max-w-md border border-gray-200">
              <div className="w-24 h-24 bg-[#F5F5F0] rounded-full flex items-center justify-center mx-auto mb-6">
                <FiUser size={48} className="text-[#D4A574]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">No Profile Found</h3>
              <p className="text-gray-600 mb-6">Create your professional profile to start receiving job requests.</p>
              <button onClick={handleAddProfileClick} className="px-8 py-3 bg-[#D4A574] text-[#1a1a1a] rounded-lg hover:bg-[#C4956A] transition font-semibold shadow-md">
                Create Profile
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}