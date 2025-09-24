// settings (dark theme to match Help Centre)
"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [active, setActive] = useState("Profile Settings");
  const navItems = ["Profile Settings", "Password", "Account Management", "Notifications"];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* HEADER */}
      <header className="w-full fixed top-0 z-50 bg-gradient-to-r from-[#FFCC66] to-[#FF7E5F] shadow-md">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900">Settings</h1>
        </div>
      </header>

      {/* Content padding to offset fixed header */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-[200px_1fr] gap-8">
          {/* SIDEBAR */}
          <aside>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = active === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setActive(item)}
                    aria-current={isActive ? "page" : undefined}
                    className={`w-full text-left rounded-lg px-4 py-3 transition
                      ${isActive
                        ? "bg-yellow-400 text-gray-900 font-semibold"
                        : "text-gray-300 hover:bg-gray-800 hover:text-gray-100"}`}
                  >
                    {item}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* MAIN */}
          <main className="min-w-0">
            {/* Profile Settings */}
            {active === "Profile Settings" && (
              <div className="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-6 text-yellow-400">Profile Settings</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">First Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400
                                 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Last Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400
                                 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400
                                 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Mobile Number *</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400
                                 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium
                                     bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Password */}
            {active === "Password" && (
              <div className="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-sm max-w-xl">
                <h2 className="text-xl font-semibold mb-6 text-yellow-400">Change Password</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-gray-900 text-gray-100
                                 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-gray-900 text-gray-100
                                 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-gray-900 text-gray-100
                                 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium
                                     bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition">
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {/* Account Management */}
            {active === "Account Management" && (
              <div className="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-sm max-w-xl">
                <h2 className="text-xl font-semibold mb-6 text-yellow-400">Account Management</h2>

                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-lg border border-red-700 bg-red-900/20">
                    <h3 className="font-medium text-red-300 mb-1">Delete Account</h3>
                    <p className="text-sm text-red-200/90">Permanently remove your account and data.</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium
                                     bg-red-600 text-white hover:bg-red-700 transition">
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Notifications */}
            {active === "Notifications" && (
              <div className="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-sm max-w-xl">
                <h2 className="text-xl font-semibold mb-6 text-yellow-400">Notification Preferences</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium text-gray-100">Email Notifications</h3>
                      <p className="text-sm text-gray-300">Receive updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-600 rounded-full peer
                                      peer-checked:bg-yellow-400
                                      peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-400/60
                                      after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                                      after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                                      peer-checked:after:translate-x-full" />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium
                                     bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition">
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
