"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiHome, FiMessageCircle, FiHelpCircle, FiBell, FiSettings,} from "react-icons/fi";

export default function MyAccountPage() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      {/* ================= HEADER ================= */}
      <section className="bg-blue-500 pb-24 relative text-center">
        <h1 className="text-2xl md:text-3xl mb-4 font-bold text-white pt-6 tracking-wide">
          My Account
        </h1>

        {/* Profile */}
        {/* element is fixed, because left and top are positioning properties relative to its containing block (parent with position: relative) */}
        <div
          // place center x-axis relative to parent , place element just below the parent, shift left/up by half of element's w/h
          style={{ left: "50%", top: "100%", transform: "translate(-50%, -50%)" }}
          className="absolute z-30 w-48 h-48 md:w-52 md:h-52"
        >
          {/* circle image wrapper (relative so price can position relative to it) */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
            <Image
              src="/images/profile.jpg"
              alt="Handyman"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* price badge attached immediately to the right of the circle */}
          <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 z-40">
            <div className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-lg shadow-md">
              <span className="text-sm md:text-base font-semibold whitespace-nowrap">
                $55 CAD/HR
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROFILE SECTION ================= */}
      <main className="flex-1 overflow-y-auto">
        <section className="bg-white flex flex-col items-center pt-32 pb-12 px-4 relative">
          {/* Name */}
          <p className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
            Kenji Teneka
          </p>

          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-100 text-blue-700 text-sm px-4 py-1 rounded-full font-semibold">
              ✅ Verified Pro
            </span>
            <span className="bg-orange-500 text-neutral-900 text-sm px-4 py-1 rounded-full font-semibold">
              Top Rated
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-8">
            <span className="text-orange-500 font-bold text-lg">5.0</span>
            <span className="text-yellow-400 text-xl">★</span>
            <span className="text-neutral-700 text-sm">(20+ reviews)</span>
          </div>

          {/* Tabs Navigation */}
          <div className="w-full max-w-6xl bg-neutral-100 px-6 py-8 rounded-2xl mb-8 shadow-lg">
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
                      ? "border-blue-500 text-blue-500"
                      : "border-transparent text-neutral-500 hover:text-blue-400"
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>

            {/* About Me */}
            <div className="mt-6 text-neutral-900">
              <h3 className="text-2xl font-bold mb-3">About Me</h3>
              <p className="mb-2 text-base leading-relaxed">
                With over 6 years of hands-on experience, I provide handyman
                services that prioritize safety, efficiency, and satisfaction.
                Skilled in electrical, plumbing, and furniture assembly tasks, I
                ensure every job is done right the first time.
              </p>
              {showMore && (
                <p className="mb-2 text-neutral-700 text-sm leading-relaxed">
                  I am also passionate about delivering creative solutions for
                  unique challenges. My clients value my attention to detail,
                  punctuality, and dedication to maintaining long-term
                  relationships built on trust. I am available for both residential
                  and commercial projects, offering flexible scheduling.
                </p>
              )}
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-blue-500 font-semibold flex items-center gap-1"
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
                className="bg-neutral-100 rounded-xl p-6 text-center shadow hover:bg-blue-50 transition"
              >
                <h4 className="text-lg font-semibold text-neutral-700 mb-1">
                  {item.title}
                </h4>
                <p className="text-xl font-bold text-blue-600">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Work Skills */}
          <div className="w-full max-w-6xl bg-neutral-100 px-6 py-8 rounded-2xl shadow-lg mb-10">
            <h3 className="text-2xl font-bold mb-6 text-neutral-900">
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
                  className="flex flex-col items-center gap-2 bg-blue-100 rounded-xl p-4 hover:bg-blue-300 transition"
                >
                  <div className="relative w-30 h-30 overflow-hidden shadow">
                    <Image
                      src={skill.img}
                      alt={skill.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-neutral-900">
                    {skill.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Preview */}
          <div className="w-full max-w-6xl bg-neutral-100 px-6 py-8 rounded-2xl shadow-lg mb-10">
            <h3 className="text-2xl font-bold mb-6 text-neutral-900">
              Availability
            </h3>
            <div className="grid grid-cols-7 gap-2 text-sm text-neutral-700">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div
                  key={day}
                  className="bg-blue-100 text-blue-700 p-3 rounded-lg text-center font-semibold"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-neutral-300">
        <div className="max-w-5xl mx-auto flex justify-around py-5 text-sm">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 hover:text-blue-400 transition"
          >
            <FiHome size={20} /> Home
          </Link>
          <Link
            href="/messages"
            className="flex flex-col items-center gap-1 hover:text-blue-400 transition"
          >
            <FiMessageCircle size={20} /> Messages
          </Link>
          <Link
            href="/help"
            className="flex flex-col items-center gap-1 hover:text-blue-400 transition"
          >
            <FiHelpCircle size={20} /> Help
          </Link>
          <Link
            href="/notifications"
            className="flex flex-col items-center gap-1 hover:text-blue-400 transition"
          >
            <FiBell size={20} /> Notifications
          </Link>
          <Link
            href="/settings"
            className="flex flex-col items-center gap-1 hover:text-blue-400 transition"
          >
            <FiSettings size={20} /> Settings
          </Link>
        </div>
      </footer>
    </div>
  );
}
