"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FiUser, FiPlus, FiDollarSign, FiShoppingBag, FiStar } from "react-icons/fi";

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
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:8000/api/handymen/me", {
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (res.ok) {
          const data: Profile = await res.json();
          setProfile(data);
        } else {
          // Profile doesn't exist yet, that's fine - show empty dashboard
          setProfile(null);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D4A574] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-gray-900 flex flex-col">
      {/* HEADER */}
      <header className="bg-[#1a1a1a] shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Portfolio
          </h1>

          <div className="flex items-center gap-4 relative">
            <button 
              onClick={toggleProfile} 
              className="p-2 rounded-full hover:bg-[#2a2a2a] transition"
            >
              <FiUser size={24} className="text-white" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-14 top-14 bg-white border border-gray-200 rounded-lg shadow-xl w-52 z-50">
                <ul className="text-sm text-gray-800">
                  <li>
                    <Link href="/handyAccount" className="block px-5 py-3 hover:bg-[#F5F5F0] transition font-medium">
                      View Account
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="w-full text-left px-5 py-3 text-[#C41E3A] hover:bg-red-50 transition font-medium">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

            <button onClick={toggleMenu} className="p-2 rounded-md bg-[#D4A574] text-[#1a1a1a] hover:bg-[#C4956A] transition">
              {showMenu ? <X size={26} /> : <Menu size={26} />}
            </button>

            {showMenu && (
              <div className="absolute right-0 top-14 bg-white border border-gray-200 rounded-xl shadow-xl w-72 text-sm z-50 overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  <li><Link href="/handyProfile" className="block px-5 py-3 hover:bg-[#F5F5F0] transition font-medium">Add Profile</Link></li>
                  <li><Link href="/handyAccount" className="block px-5 py-3 hover:bg-[#F5F5F0] transition font-medium">My Account</Link></li>
                  <li><Link href="/jobs-done" className="block px-5 py-3 hover:bg-[#F5F5F0] transition font-medium">My Projects</Link></li>
                  <li><Link href="/available-jobs" className="block px-5 py-3 hover:bg-[#F5F5F0] transition font-medium">Find Jobs</Link></li>
                  <li><Link href="/help" className="block px-5 py-3 hover:bg-[#F5F5F0] transition font-medium">Help & FAQ</Link></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-10">
        {/* PROFILE CARD - ALWAYS SHOWS (empty or filled) */}
        <section className="bg-gradient-to-br from-[#D4A574] to-[#C4956A] py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-8">
              {profile?.profileImage ? (
                <img src={profile.profileImage} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover mb-4"/>
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-white bg-white/20 flex items-center justify-center mb-4">
                  <FiUser size={40} className="text-white" />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {profile?.name || "Your Name"}
                </h2>
                <p className="text-white/90 text-sm">
                  {profile?.email || "your.email@example.com"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <p className="text-3xl font-bold text-white">{profile?.jobsDone || 0}</p>
                <p className="text-white/90 text-sm mt-1">Job Done</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <p className="text-3xl font-bold text-white">{profile?.inProgress || 0}</p>
                <p className="text-white/90 text-sm mt-1">Job In Progress</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <div className="flex items-center justify-center gap-1">
                  <p className="text-3xl font-bold text-white">{profile?.rating || 0}</p>
                  <FiStar className="text-yellow-300 fill-yellow-300" size={20} />
                </div>
                <p className="text-white/90 text-sm mt-1">Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* EARNINGS & ACTIVE ORDERS - ALWAYS SHOWS */}
        <section className="max-w-6xl mx-auto px-6 -mt-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#1a1a1a]">Your Earning</h3>
            <Link href="/earnings" className="text-[#D4A574] hover:text-[#C4956A] font-medium text-sm">
              View All
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#D4A574]/10 rounded-full flex items-center justify-center">
                  <FiDollarSign size={24} className="text-[#D4A574]" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#1a1a1a]">${profile?.earnings || 0}</p>
                  <p className="text-gray-500 text-sm">Your this month</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiShoppingBag size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#1a1a1a]">{profile?.activeOrders || 0}</p>
                  <p className="text-gray-500 text-sm">Active Order</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RECENT ORDERS - ALWAYS SHOWS */}
        <section className="max-w-6xl mx-auto px-6 mb-8">
          <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">Recent Orders</h3>

          {(!profile?.recentOrders || profile.recentOrders.length === 0) ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShoppingBag size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-400 text-lg mb-2">No recent orders</p>
              <p className="text-gray-500 text-sm mb-4">Complete jobs to see them here</p>
              <Link 
                href="/available-jobs"
                className="inline-block px-6 py-3 bg-[#D4A574] text-[#1a1a1a] rounded-lg hover:bg-[#C4956A] transition font-semibold"
              >
                Browse Available Jobs
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {profile.recentOrders.map((order, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#D4A574] to-[#C4956A] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl font-bold">{order.title.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#1a1a1a] text-lg mb-1">{order.title}</h4>
                      <p className="text-gray-600 text-sm">{order.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* MY SERVICES - ALWAYS SHOWS */}
        <section className="max-w-6xl mx-auto px-6 mb-8">
          <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">My Services</h3>

          {(!profile?.services || profile.services.length === 0) ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPlus size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-400 text-lg mb-2">No services added</p>
              <p className="text-gray-500 text-sm mb-4">Add your services to attract customers</p>
              <Link 
                href="/handyProfile"
                className="inline-block px-6 py-3 bg-[#D4A574] text-[#1a1a1a] rounded-lg hover:bg-[#C4956A] transition font-semibold"
              >
                Add Services
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {profile.services.map((service, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-5 border-2 border-gray-200 hover:border-[#D4A574] hover:shadow-xl transition">
                  <h4 className="font-bold text-[#1a1a1a] text-lg mb-2">{service.title}</h4>
                  <p className="text-gray-600 text-sm">{service.desc || "Professional service"}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SKILLS - ALWAYS SHOWS */}
        <section className="max-w-6xl mx-auto px-6 mb-8">
          <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">Skills & Expertise</h3>
          
          {(!profile?.skills || profile.skills.length === 0) ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiStar size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-400 text-lg mb-2">No skills added</p>
              <p className="text-gray-500 text-sm mb-4">Add your skills to your profile</p>
              <Link 
                href="/handyProfile"
                className="inline-block px-6 py-3 bg-[#D4A574] text-[#1a1a1a] rounded-lg hover:bg-[#C4956A] transition font-semibold"
              >
                Add Skills
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex flex-wrap gap-3">
                {profile.skills.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-[#D4A574] text-[#1a1a1a] rounded-full font-medium hover:bg-[#C4956A] transition">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* BIO - ALWAYS SHOWS */}
        <section className="max-w-6xl mx-auto px-6 mb-8">
          <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">About Me</h3>
          
          {!profile?.bio ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUser size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-400 text-lg mb-2">No bio added</p>
              <p className="text-gray-500 text-sm mb-4">Tell customers about yourself</p>
              <Link 
                href="/handyProfile"
                className="inline-block px-6 py-3 bg-[#D4A574] text-[#1a1a1a] rounded-lg hover:bg-[#C4956A] transition font-semibold"
              >
                Add Bio
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}