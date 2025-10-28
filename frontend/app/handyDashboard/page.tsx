"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Briefcase, Settings, HelpCircle, Crown, Wrench } from "lucide-react";
import { FiUser, FiPlus, FiDollarSign, FiShoppingBag, FiStar } from "react-icons/fi";

type Service = { title: string; desc: string; };
type Order = { title: string; desc: string; status: string; };
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
  planType?: 'Basic' | 'Standard' | 'Premium';
  verified?: boolean;
  jobAcceptCount?: number;
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
          router.push("/signup?mode=login");
          return;
        }

        const res = await fetch("http://localhost:8000/api/handymen/me", {
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (res.ok) {
          const data: Profile = await res.json();
          setProfile(data);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

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
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Handyman Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4 relative">
            <button 
              onClick={toggleProfile} 
              className="p-2 rounded-full hover:bg-[#2a2a2a] transition"
            >
              {profile?.profileImage ? (
                <img src={profile.profileImage} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <FiUser size={24} className="text-white" />
              )}
            </button>

            {showProfileMenu && (
              <div className="absolute right-14 top-14 bg-white border border-gray-200 rounded-lg shadow-xl w-52 z-50">
                <ul className="text-sm text-gray-800">
                  <li>
                    <Link href="/handyAccount" className="block px-5 py-3 hover:bg-[#F5F5F0] transition font-medium">
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings" className="block px-5 py-3 hover:bg-[#F5F5F0] transition font-medium">
                      Settings
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

            <button onClick={toggleMenu} className="p-2 rounded-md bg-[#CBB677] text-white hover:bg-[#B8A565] transition">
              {showMenu ? <X size={26} /> : <Menu size={26} />}
            </button>

            {showMenu && (
              <div className="absolute right-0 top-14 bg-white border border-gray-200 rounded-xl shadow-xl w-72 text-sm z-50 overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  <li>
                    <Link href="/handyman/find-jobs" className="flex items-center gap-3 px-5 py-3 hover:bg-[#F5F5F0] transition font-medium">
                      <Briefcase size={20} className="text-[#CBB677]" />
                      Find Jobs
                    </Link>
                  </li>
                  <li>
                    <Link href="/handyman/my-services" className="flex items-center gap-3 px-5 py-3 hover:bg-[#F5F5F0] transition font-medium">
                      <Wrench size={20} className="text-[#CBB677]" />
                      My Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/handyman/membership" className="flex items-center gap-3 px-5 py-3 hover:bg-[#F5F5F0] transition font-medium">
                      <Crown size={20} className="text-[#CBB677]" />
                      Membership Plan
                    </Link>
                  </li>
                  <li>
                    <Link href="/handyman/help" className="flex items-center gap-3 px-5 py-3 hover:bg-[#F5F5F0] transition font-medium">
                      <HelpCircle size={20} className="text-[#CBB677]" />
                      Help & Support
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings" className="flex items-center gap-3 px-5 py-3 hover:bg-[#F5F5F0] transition font-medium">
                      <Settings size={20} className="text-[#CBB677]" />
                      Settings
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-10">
        {/* PROFILE CARD WITH INLINE BADGES */}
        <section className="bg-gradient-to-br from-[#CBB677] to-[#B8A565] py-8">
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
                {/* Name with Inline Badges */}
                <div className="flex items-center gap-2 justify-center mb-2">
                  <h2 className="text-2xl font-bold text-white">
                    {profile?.name || "Your Name"}
                  </h2>
                  
                  {/* Membership Badge - Inline with Name */}
                  {profile?.planType === 'Premium' && (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                      👑 PREMIUM
                    </span>
                  )}
                  {profile?.planType === 'Standard' && (
                    <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                      ⭐ STANDARD
                    </span>
                  )}
                  {profile?.planType === 'Basic' && (
                    <span className="px-3 py-1 bg-gray-400 text-white text-xs font-bold rounded-full flex items-center gap-1">
                      🆓 BASIC
                    </span>
                  )}
                  
                  {/* Verified Badge */}
                  {profile?.verified && (
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                      ✅ VERIFIED
                    </span>
                  )}
                </div>
                
                <p className="text-white/90 text-sm">
                  {profile?.email || "your.email@example.com"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <p className="text-3xl font-bold text-white">{profile?.jobsDone || 0}</p>
                <p className="text-white/90 text-sm mt-1">Jobs Completed</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <p className="text-3xl font-bold text-white">{profile?.inProgress || 0}</p>
                <p className="text-white/90 text-sm mt-1">In Progress</p>
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

        {/* EARNINGS & ACTIVE ORDERS */}
        <section className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Total Earnings</p>
                  <p className="text-3xl font-bold text-[#1a1a1a]">${profile?.earnings || 0}</p>
                  <p className="text-gray-400 text-xs mt-1">This Month</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-[#CBB677] to-[#B8A565] rounded-xl flex items-center justify-center">
                  <FiDollarSign size={24} className="text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Active Orders</p>
                  <p className="text-3xl font-bold text-[#1a1a1a]">{profile?.activeOrders || 0}</p>
                  <p className="text-gray-400 text-xs mt-1">Currently Working</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-[#CBB677] to-[#B8A565] rounded-xl flex items-center justify-center">
                  <FiShoppingBag size={24} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="max-w-6xl mx-auto px-6 mb-8">
          <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">Quick Actions</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/handyman/find-jobs" className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:border-[#CBB677] hover:shadow-xl transition text-center group">
              <Briefcase size={32} className="text-[#CBB677] mx-auto mb-3 group-hover:scale-110 transition" />
              <h4 className="font-bold text-[#1a1a1a]">Find Jobs</h4>
              <p className="text-gray-500 text-sm mt-1">Browse available jobs</p>
            </Link>

            <Link href="/handyman/my-services" className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:border-[#CBB677] hover:shadow-xl transition text-center group">
              <Wrench size={32} className="text-[#CBB677] mx-auto mb-3 group-hover:scale-110 transition" />
              <h4 className="font-bold text-[#1a1a1a]">My Services</h4>
              <p className="text-gray-500 text-sm mt-1">Manage your services</p>
            </Link>

            <Link href="/handyman/membership" className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:border-[#CBB677] hover:shadow-xl transition text-center group">
              <Crown size={32} className="text-[#CBB677] mx-auto mb-3 group-hover:scale-110 transition" />
              <h4 className="font-bold text-[#1a1a1a]">Membership</h4>
              <p className="text-gray-500 text-sm mt-1">View your plan</p>
            </Link>

            <Link href="/handyman/help" className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:border-[#CBB677] hover:shadow-xl transition text-center group">
              <HelpCircle size={32} className="text-[#CBB677] mx-auto mb-3 group-hover:scale-110 transition" />
              <h4 className="font-bold text-[#1a1a1a]">Help</h4>
              <p className="text-gray-500 text-sm mt-1">Get support</p>
            </Link>
          </div>
        </section>

        {/* RECENT ORDERS */}
        <section className="max-w-6xl mx-auto px-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#1a1a1a]">Recent Orders</h3>
            <Link href="/handyman/find-jobs" className="text-[#D4A574] hover:text-[#C4956A] font-medium text-sm">
              View All Jobs
            </Link>
          </div>

          {(!profile?.recentOrders || profile.recentOrders.length === 0) ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShoppingBag size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-400 text-lg mb-2">No recent orders</p>
              <p className="text-gray-500 text-sm mb-4">Accept jobs to see them here</p>
              <Link 
                href="/handyman/find-jobs"
                className="inline-block px-6 py-3 bg-[#CBB677] text-white rounded-lg hover:bg-[#B8A565] transition font-semibold"
              >
                Browse Available Jobs
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {profile.recentOrders.slice(0, 3).map((order, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#D4A574] to-[#C4956A] rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xl font-bold">{order.title.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#1a1a1a] text-lg mb-1">{order.title}</h4>
                        <p className="text-gray-600 text-sm">{order.desc}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* MY SERVICES */}
        <section className="max-w-6xl mx-auto px-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#1a1a1a]">My Services</h3>
            <Link href="/handyman/my-services" className="text-[#D4A574] hover:text-[#C4956A] font-medium text-sm">
              Manage Services
            </Link>
          </div>

          {(!profile?.services || profile.services.length === 0) ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPlus size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-400 text-lg mb-2">No services added</p>
              <p className="text-gray-500 text-sm mb-4">Add your services to attract clients</p>
              <Link 
                href="/handyman/my-services"
                className="inline-block px-6 py-3 bg-[#CBB677] text-white rounded-lg hover:bg-[#B8A565] transition font-semibold"
              >
                Add Services
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {profile.services.slice(0, 6).map((service, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-5 border-2 border-gray-200 hover:border-[#D4A574] hover:shadow-xl transition">
                  <h4 className="font-bold text-[#1a1a1a] text-lg mb-2">{service.title}</h4>
                  <p className="text-gray-600 text-sm">{service.desc || "Professional service"}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}