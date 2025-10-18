"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FiUser, FiShoppingBag, FiHeart, FiMapPin } from "react-icons/fi";

type JobRequest = {
  _id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "completed";
  budget: number;
  createdAt: string;
};

type ClientProfile = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  jobsPosted: number;
  activeJobs: number;
  totalSpent: number;
  savedHandymen: string[];
  recentJobs: JobRequest[];
};

export default function ClientProfile() {
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
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:8000/api/clients/me", {
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (res.ok) {
          const data: ClientProfile = await res.json();
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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const toggleMenu = () => { setShowMenu(s => !s); setShowProfileMenu(false); };
  const toggleProfile = () => { setShowProfileMenu(s => !s); setShowMenu(false); };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#CBB677] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-gray-900 flex flex-col">
      {/* HEADER */}
      <header className="bg-[#1a1a1a] shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            My Profile
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
                    <Link href="/clientAccount" className="block px-5 py-3 hover:bg-[#F9F9F9] transition font-medium">
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

            <button onClick={toggleMenu} className="p-2 rounded-md bg-[#CBB677] text-[#1a1a1a] hover:bg-[#B8A167] transition">
              {showMenu ? <X size={26} /> : <Menu size={26} />}
            </button>

            {showMenu && (
              <div className="absolute right-0 top-14 bg-white border border-gray-200 rounded-xl shadow-xl w-72 text-sm z-50 overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  <li><Link href="/post-job" className="block px-5 py-3 hover:bg-[#F9F9F9] transition font-medium">Post a Job</Link></li>
                  <li><Link href="/my-jobs" className="block px-5 py-3 hover:bg-[#F9F9F9] transition font-medium">My Jobs</Link></li>
                  <li><Link href="/find-handyman" className="block px-5 py-3 hover:bg-[#F9F9F9] transition font-medium">Find Handyman</Link></li>
                  <li><Link href="/saved" className="block px-5 py-3 hover:bg-[#F9F9F9] transition font-medium">Saved Handymen</Link></li>
                  <li><Link href="/settings" className="block px-5 py-3 hover:bg-[#F9F9F9] transition font-medium">Settings</Link></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-10">
        {/* PROFILE CARD */}
        <section className="bg-gradient-to-br from-[#CBB677] to-[#B8A167] py-8">
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
                <p className="text-white/90 text-sm mb-2">
                  {profile?.email || "your.email@example.com"}
                </p>
                {profile?.address && (
                  <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                    <FiMapPin size={16} />
                    <span>{profile.address}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <p className="text-3xl font-bold text-white">{profile?.jobsPosted || 0}</p>
                <p className="text-white/90 text-sm mt-1">Jobs Posted</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <p className="text-3xl font-bold text-white">{profile?.activeJobs || 0}</p>
                <p className="text-white/90 text-sm mt-1">Active Jobs</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <p className="text-3xl font-bold text-white">${profile?.totalSpent || 0}</p>
                <p className="text-white/90 text-sm mt-1">Total Spent</p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS CARDS */}
        <section className="max-w-6xl mx-auto px-6 -mt-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#CBB677]/10 rounded-full flex items-center justify-center">
                  <FiShoppingBag size={24} className="text-[#CBB677]" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#1a1a1a]">{profile?.activeJobs || 0}</p>
                  <p className="text-gray-500 text-sm">Active Jobs</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FiHeart size={24} className="text-red-500" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#1a1a1a]">{profile?.savedHandymen?.length || 0}</p>
                  <p className="text-gray-500 text-sm">Saved Handymen</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RECENT JOBS */}
        <section className="max-w-6xl mx-auto px-6 mb-8">
          <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">Recent Job Requests</h3>

          {(!profile?.recentJobs || profile.recentJobs.length === 0) ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShoppingBag size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-400 text-lg mb-2">No jobs posted yet</p>
              <p className="text-gray-500 text-sm mb-4">Post your first job to find handymen</p>
              <Link 
                href="/post-job"
                className="inline-block px-6 py-3 bg-[#CBB677] text-[#1a1a1a] rounded-lg hover:bg-[#B8A167] transition font-semibold"
              >
                Post a Job
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {profile.recentJobs.map((job) => (
                <div key={job._id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#CBB677] to-[#B8A167] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl font-bold">{job.title.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-[#1a1a1a] text-lg mb-1">{job.title}</h4>
                          <p className="text-gray-600 text-sm mb-2">{job.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          job.status === 'open' ? 'bg-blue-100 text-blue-700' :
                          job.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {job.status === 'open' ? 'Open' : 
                           job.status === 'in_progress' ? 'In Progress' : 
                           'Completed'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <p className="text-[#CBB677] font-bold text-lg">
                          Budget: ${job.budget}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Posted: {new Date(job.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CONTACT INFO */}
        {profile && (
          <section className="max-w-6xl mx-auto px-6 mb-8">
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">Contact Information</h3>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-gray-800 font-medium">{profile.email}</p>
                </div>
                {profile.phone && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="text-gray-800 font-medium">{profile.phone}</p>
                  </div>
                )}
                {profile.address && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="text-gray-800 font-medium">{profile.address}</p>
                  </div>
                )}
              </div>
              <Link 
                href="/edit-profile"
                className="inline-block mt-6 px-6 py-3 bg-[#CBB677] text-[#1a1a1a] rounded-lg hover:bg-[#B8A167] transition font-semibold"
              >
                Edit Profile
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}