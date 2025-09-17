"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [active, setActive] = useState("Profile Settings");
  const navItems = ["Profile Settings", "Password", "Account Management", "Notifications"];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="w-full sticky top-0 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-[200px_1fr] gap-8">
          <aside>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActive(item)}
                  className={`w-full text-left rounded-lg px-4 py-3 transition ${
                    active === item
                      ? "bg-teal-100 text-black-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </aside>

          <main className="min-w-0">
            {active === "Profile Settings" && (
              <div className="rounded-xl border bg-white p-6 border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-[#59b6bd] focus:border-[#008080]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-[#59b6bd] focus:border-[#008080]"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-[#59b6bd] focus:border-[#008080]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-[#59b6bd] focus:border-[#008080]"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="bg-[#59b6bd] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#008080]">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {active === "Password" && (
              <div className="rounded-xl border bg-white p-6 border-gray-200 shadow-sm max-w-xl">
                <h2 className="text-xl font-semibold mb-6">Change Password</h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-[#59b6bd] focus:border-[#008080]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-[#59b6bd] focus:border-[#008080]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-[#59b6bd] focus:border-[#008080]"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="bg-[#59b6bd] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#008080]">
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {active === "Account Management" && (
              <div className="rounded-xl border bg-white p-6 border-gray-200 shadow-sm max-w-xl">
                <h2 className="text-xl font-semibold mb-6">Account Management</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                    <h3 className="font-medium text-red-800 mb-1">Delete Account</h3>
                    <p className="text-sm text-red-600">Permanently remove your account and data</p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="bg-red-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-red-700">
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {active === "Notifications" && (
              <div className="rounded-xl border bg-white p-6 border-gray-200 shadow-sm max-w-xl">
                <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#59b6bd] peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="bg-[#59b6bd] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#008080]">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}