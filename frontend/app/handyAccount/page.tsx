"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiHome, FiMessageCircle, FiHelpCircle, FiBell, FiSettings } from "react-icons/fi";

export default function MyAccountPage() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* ================= HEADER ================= */}
      <section className="bg-yellow-600 pb-24 relative text-center shadow-md">
        <h1 className="text-2xl md:text-3xl mb-4 font-bold text-gray-900 pt-6 tracking-wide">
          My Account
        </h1>

        {/* Profile */}
        <div
          style={{ left: "50%", top: "100%", transform: "translate(-50%, -50%)" }}
          className="absolute z-30 w-48 h-48 md:w-52 md:h-52"
        >
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-900 shadow-xl">
            <Image
              src="/images/profile.jpg"
              alt="Handyman"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 z-40">
            <div className="flex items-center gap-2 bg-gray-800 text-yellow-500 px-4 py-2 rounded-lg shadow-md">
              <span className="text-sm md:text-base font-semibold whitespace-nowrap">
                $55 CAD/HR
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROFILE SECTION ================= */}
      <main className="flex-1 overflow-y-auto">
        <section className="bg-gray-800 flex flex-col items-center pt-32 pb-12 px-4 relative rounded-t-3xl shadow-xl">
          {/* Name */}
          <p className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
            Kenji Teneka
          </p>

          <div className="flex items-center gap-3 mb-4">
            <span className="bg-gray-700 text-yellow-400 text-sm px-4 py-1 rounded-full font-semibold">
              ✅ Verified Pro
            </span>
            <span className="bg-yellow-500 text-gray-900 text-sm px-4 py-1 rounded-full font-semibold">
              Top Rated
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-8">
            <span className="text-yellow-400 font-bold text-lg">5.0</span>
            <span className="text-yellow-300 text-xl">★</span>
            <span className="text-gray-400 text-sm">(20+ reviews)</span>
          </div>

          {/* Tabs Navigation */}
          <div className="w-full max-w-6xl bg-gray-900 px-6 py-8 rounded-2xl mb-8 shadow-lg">
            <div className="grid grid-cols-4 text-center text-lg">
              {[
                { label: "About", href: "#" },
                { label: "Services", href: "/handyServices" },
                { label: "Portfolio", href: "/handyDashboard" },
                { label: "Reviews", href: "/handyReviews" },
              ].map((tab) => (
                <Link
                  key={tab.label}
                  href={tab.href}
                  className={`py-2 font-semibold border-b-4 ${
                    tab.label === "About"
                      ? "border-yellow-500 text-yellow-400"
                      : "border-transparent text-gray-400 hover:text-yellow-400 transition"
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>

            {/* About Me */}
            <div className="mt-6 text-gray-100">
              <h3 className="text-2xl font-bold mb-3">About Me</h3>
              <p className="mb-2 text-base leading-relaxed text-gray-300">
                With over 6 years of hands-on experience, I provide handyman
                services that prioritize safety, efficiency, and satisfaction.
                Skilled in electrical, plumbing, and furniture assembly tasks, I
                ensure every job is done right the first time.
              </p>
              {showMore && (
                <p className="mb-2 text-gray-400 text-sm leading-relaxed">
                  I am also passionate about delivering creative solutions for
                  unique challenges. My clients value my attention to detail,
                  punctuality, and dedication to maintaining long-term
                  relationships built on trust. I am available for both residential
                  and commercial projects, offering flexible scheduling.
                </p>
              )}
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-yellow-400 font-semibold flex items-center gap-1 mt-2 hover:underline"
              >
                {showMore ? "Show Less ▲" : "Read More ▼"}
              </button>
            </div>
          </div>

          {/* Highlights of Handyman */}
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { title: "Experience", value: "6+ Years" },
              { title: "Projects Completed", value: "250+" },
              { title: "Availability", value: "Mon - Sat" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-700 rounded-xl p-6 text-center shadow hover:bg-yellow-600 hover:text-gray-900 transition"
              >
                <h4 className="text-lg font-semibold text-gray-200 mb-1">
                  {item.title}
                </h4>
                <p className="text-xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Work Skills */}
          <div className="w-full max-w-6xl bg-gray-900 px-6 py-8 rounded-2xl shadow-lg mb-10">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400">
              Work Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Residential Wiring", img: "/images/wiring-fix.jpg" },
                { name: "Voltage Testing", img: "/images/voltage-testing.jpg" },
                { name: "Load Fixation", img: "/images/load-fixation.jpg" },
                { name: "Power Outlet Repair", img: "/images/outlet-repair.jpg" },
              ].map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center gap-2 bg-gray-700 rounded-xl p-4 hover:bg-yellow-600 hover:text-gray-900 transition"
                >
                  <div className="relative w-30 h-30 overflow-hidden shadow rounded-lg">
                    <Image
                      src={skill.img}
                      alt={skill.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Preview */}
          <div className="w-full max-w-6xl bg-gray-900 px-6 py-8 rounded-2xl shadow-lg mb-10">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400">
              Availability
            </h3>
            <div className="grid grid-cols-7 gap-2 text-sm text-gray-300">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div
                  key={day}
                  className="bg-gray-700 text-yellow-400 p-3 rounded-lg text-center font-semibold hover:bg-yellow-600 hover:text-gray-900 transition"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-5xl mx-auto flex justify-around py-5 text-sm">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiHome size={20} /> Home
          </Link>
          <Link
            href="/messages"
            className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiMessageCircle size={20} /> Messages
          </Link>
          <Link
            href="/help"
            className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiHelpCircle size={20} /> Help
          </Link>
          <Link
            href="/notifications"
            className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiBell size={20} /> Notifications
          </Link>
          <Link
            href="/settings"
            className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiSettings size={20} /> Settings
          </Link>
        </div>
      </footer>
    </div>
  );
}
