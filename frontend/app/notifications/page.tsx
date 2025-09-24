"use client";

import Link from "next/link";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* HEADER */}
      <header className="w-full sticky top-0 border-b border-gray-700 bg-gradient-to-r from-[#FFCC66] to-[#FF7E5F]">
        <div className="mx-auto max-w-[1100px] px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight text-gray-900">
            Notifications
          </div>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/handyDashboard"
              className="px-3 py-2 rounded-full bg-black/20 text-gray-900 text-sm hover:bg-black/30"
            >
              Profile
            </Link>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-[1100px] px-6 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-lg font-medium text-gray-100">
            No notifications yet
          </p>
          <p className="text-sm text-gray-400 mt-2">
            When you have updates, they’ll show up here.
          </p>
        </div>
      </div>
    </div>
  );
}
