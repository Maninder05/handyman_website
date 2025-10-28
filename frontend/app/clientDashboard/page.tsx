"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, Briefcase, Users, Calendar, HelpCircle, Settings } from "lucide-react";
import { FiUser, FiDollarSign, FiShoppingBag } from "react-icons/fi";

type Booking = {
  id: string;
  service: string;
  handyman: string;
  status: 'pending' | 'accepted' | 'declined' | 'in-progress' | 'completed';
  date: string;
};

type ClientProfile = {
  _id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  profileImage?: string;
  servicesBooked: number;
  ongoingServices: number;
  totalSpent: number;
  activeBookings: number;
  recentBookings: Booking[];
};

export default function ClientDashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profile, setProfile] = useState<ClientProfile | null>(null);
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

        const res = await fetch("http://localhost:8000/api/clients/me", {
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          console.log("Client profile data:", data);
          setProfile(data);
        } else {
          console.error("Failed to fetch profile:", res.status);
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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowProfileMenu(false);
  };

  const toggleProfile = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowMenu(false);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'declined': return 'bg-red-100 text-red-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#CBB677] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col text-gray-900">
      {/* HEADER */}
      <header className="bg-[#1a1a1a] shadow-md relative">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Client Dashboard
          </h1>

          <div className="flex items-center gap-4 relative">
            <button
              onClick={toggleProfile}
              className="p-2 rounded-full hover:bg-[#2a2a2a] transition"
            >
              {profile?.profileImage ? (
                <Image src={profile.profileImage} alt="Profile" width={32} height={32} className="rounded-full" />
              ) : (
                <FiUser size={24} className="text-white" />
              )}
            </button>

            {showProfileMenu && (
              <div className="absolute right-14 top-14 bg-white border border-gray-200 rounded-lg shadow-xl w-52 z-50">
                <ul className="text-sm text-gray-800">
                  <li>
                    <Link
                      href="/clientAccount"
                      className="block px-5 py-3 hover:bg-[#F5F5F0] transition font-medium"
                    >
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings"
                      className="block px-5 py-3 hover:bg-[#F5F5F0] transition font-medium"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-5 py-3 text-[#C41E3A] hover:bg-red-50 transition font-medium"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

            <button
              onClick={toggleMenu}
              className="p-2 rounded-md bg-[#CBB677] text-white hover:bg-[#B8A565] transition"
            >
              {showMenu ? <X size={26} /> : <Menu size={26} />}
            </button>

            {showMenu && (
              <div className="absolute right-0 top-14 bg-white border border-gray-200 rounded-xl shadow-xl w-72 text-sm z-50 overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  <li>
                    <Link
                      href="/client/post-job"
                      className="flex items-center gap-3 px-5 py-3 hover:bg-[#F5F5F0] transition font-medium"
                    >
                      <Briefcase size={20} className="text-[#CBB677]" />
                      Post a Job
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/client/find-handyman"
                      className="flex items-center gap-3 px-5 py-3 hover:bg-[#F5F5F0] transition font-medium"
                    >
                      <Users size={20} className="text-[#CBB677]" />
                      Find Handyman
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/client/bookings"
                      className="flex items-center gap-3 px-5 py-3 hover:bg-[#F5F5F0] transition font-medium"
                    >
                      <Calendar size={20} className="text-[#CBB677]" />
                      Recent Bookings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/client/help"
                      className="flex items-center gap-3 px-5 py-3 hover:bg-[#F5F5F0] transition font-medium"
                    >
                      <HelpCircle size={20} className="text-[#CBB677]" />
                      Help & Support
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-5 py-3 hover:bg-[#F5F5F0] transition font-medium"
                    >
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

      {/* PROFILE SECTION */}
      <main className="flex-1 overflow-y-auto">
        <section className="bg-gradient-to-br from-[#CBB677] to-[#B8A565] py-8">
          <div className="max-w-6xl mx-auto text-center px-6">
            {profile?.profileImage ? (
              <Image
                src={profile.profileImage}
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full border-4 border-white mx-auto shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border-4 border-white bg-white/20 flex items-center justify-center mx-auto mb-4">
                <FiUser size={40} className="text-white" />
              </div>
            )}
            <h2 className="text-2xl font-bold text-white mt-4">
              {profile?.firstName && profile?.lastName 
                ? `${profile.firstName} ${profile.lastName}` 
                : profile?.name || "Your Name"}
            </h2>
            <p className="text-sm text-white/90">
              {profile?.email || "your.email@example.com"}
            </p>

            <div className="flex justify-center gap-10 mt-6 text-white">
              <div>
                <p className="text-xl font-bold">{profile?.servicesBooked || 0}</p>
                <p className="text-sm">Services Booked</p>
              </div>
              <div>
                <p className="text-xl font-bold">{profile?.ongoingServices || 0}</p>
                <p className="text-sm">Ongoing</p>
              </div>
              <div>
                <p className="text-xl font-bold">{profile?.activeBookings || 0}</p>
                <p className="text-sm">Active Bookings</p>
              </div>
            </div>
          </div>
        </section>

        {/* SPENDING & BOOKINGS */}
        <section className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Total Spent</p>
                  <p className="text-3xl font-bold text-[#1a1a1a]">${profile?.totalSpent || 0}</p>
                  <p className="text-gray-400 text-xs mt-1">All Time</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-[#CBB677] to-[#B8A565] rounded-xl flex items-center justify-center">
                  <FiDollarSign size={24} className="text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Active Bookings</p>
                  <p className="text-3xl font-bold text-[#1a1a1a]">{profile?.activeBookings || 0}</p>
                  <p className="text-gray-400 text-xs mt-1">In Progress</p>
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
            <Link href="/client/post-job" className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:border-[#CBB677] hover:shadow-xl transition text-center group">
              <Briefcase size={32} className="text-[#CBB677] mx-auto mb-3 group-hover:scale-110 transition" />
              <h4 className="font-bold text-[#1a1a1a]">Post a Job</h4>
              <p className="text-gray-500 text-sm mt-1">Hire handymen</p>
            </Link>

            <Link href="/client/find-handyman" className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:border-[#CBB677] hover:shadow-xl transition text-center group">
              <Users size={32} className="text-[#CBB677] mx-auto mb-3 group-hover:scale-110 transition" />
              <h4 className="font-bold text-[#1a1a1a]">Find Handyman</h4>
              <p className="text-gray-500 text-sm mt-1">Browse profiles</p>
            </Link>

            <Link href="/client/bookings" className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:border-[#CBB677] hover:shadow-xl transition text-center group">
              <Calendar size={32} className="text-[#CBB677] mx-auto mb-3 group-hover:scale-110 transition" />
              <h4 className="font-bold text-[#1a1a1a]">Bookings</h4>
              <p className="text-gray-500 text-sm mt-1">Track orders</p>
            </Link>

            <Link href="/client/help" className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:border-[#CBB677] hover:shadow-xl transition text-center group">
              <HelpCircle size={32} className="text-[#CBB677] mx-auto mb-3 group-hover:scale-110 transition" />
              <h4 className="font-bold text-[#1a1a1a]">Help</h4>
              <p className="text-gray-500 text-sm mt-1">Get support</p>
            </Link>
          </div>
        </section>

        {/* RECENT BOOKINGS WITH STATUS */}
        <section className="max-w-6xl mx-auto px-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#1a1a1a]">Recent Bookings</h3>
            <Link href="/client/bookings" className="text-[#CBB677] hover:text-[#B8A565] font-medium text-sm">
              View All
            </Link>
          </div>

          {(!profile?.recentBookings || profile.recentBookings.length === 0) ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-400 text-lg mb-2">No bookings yet</p>
              <p className="text-gray-500 text-sm mb-4">Post your first job to get started</p>
              <Link 
                href="/client/post-job"
                className="inline-block px-6 py-3 bg-[#CBB677] text-white rounded-lg hover:bg-[#B8A565] transition font-semibold shadow-lg hover:shadow-xl"
              >
                Post a Job
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {profile.recentBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-[#1a1a1a] text-lg mb-1">{booking.service}</h4>
                      <p className="text-gray-600 text-sm mb-2">Handyman: {booking.handyman}</p>
                      <p className="text-gray-500 text-xs">{booking.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}