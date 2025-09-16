"use client";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header
        className="w-full sticky top-0 border-b border-neutral-200" style={{ backgroundColor: "#59b6bd" }}
      >
        <div className="mx-auto max-w-[1100px] px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight text-white">
            Notifications
          </div>
          <nav className="flex items-center gap-2 sm:gap-3">
            <button className="px-3 py-2 rounded-full bg-white/20 text-white text-sm hover:bg-white/30">
              Dark Mode
            </button>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-[1100px] px-6 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-lg font-medium text-neutral-700">
            No notifications yet
          </p>
          <p className="text-sm text-neutral-500 mt-2">
            When you have updates, they’ll show up here.
          </p>
        </div>
      </div>
    </div>
  );
}
