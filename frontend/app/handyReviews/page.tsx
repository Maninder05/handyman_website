"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FiHome,
  FiMessageCircle,
  FiHelpCircle,
  FiBell,
  FiSettings,
} from "react-icons/fi";

export default function ReviewsPage() {
  const allReviews = [
    {
      name: "Marlene Bonelyn",
      rating: 5,
      job: "Residential Wiring Repair",
      comment:
        "He was punctual, professional, and explained every step clearly. The wiring was done very neatly. Thanks!",
      image: "/images/client1.jpg",
    },
    {
      name: "Asha Sharma",
      rating: 4,
      job: "Load Repair",
      comment:
        "Very skilled and quick service, though slightly delayed arrival. Overall very satisfied!",
      image: "/images/client2.jpg",
    },
    {
      name: "Chris Mathem",
      rating: 3,
      job: "Voltage Maintenance",
      comment:
        "Work was okay, but could have been faster. Communication was fine.",
      image: "/images/client3.jpg",
    },
  ];

  const featured = allReviews.find((r) => r.rating === 5);

  const [filter, setFilter] = React.useState("Most Recent");

  // Dynamic min and max ratings
  const maxRating = Math.max(...allReviews.map((r) => r.rating));
  const minRating = Math.min(...allReviews.map((r) => r.rating));

  // Apply filter
  const filteredReviews =
    filter === "Highest Rated"
      ? allReviews.filter((r) => r.rating === maxRating)
      : filter === "Lowest Rated"
      ? allReviews.filter((r) => r.rating === minRating)
      : allReviews;

  return (
    <>
      <main className="bg-gray-900 min-h-screen text-gray-100 flex flex-col">
        {/* Header */}
        <section className="bg-yellow-600 pb-24 relative text-center shadow-md">
          <h1 className="text-2xl md:text-3xl mb-4 font-bold text-gray-900 pt-6 tracking-wide">
            Reviews
          </h1>

          {/* Profile */}
          <div
            style={{
              left: "50%",
              top: "100%",
              transform: "translate(-50%, -50%)",
            }}
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

            {/* Price */}
            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 z-40">
              <div className="flex items-center gap-2 bg-gray-900 text-yellow-400 px-4 py-2 rounded-lg shadow-md">
                <span className="text-sm md:text-base font-semibold whitespace-nowrap">
                  $55 CAD/HR
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 flex flex-col items-center pt-32 pb-16 px-4 relative">
          {/* Name */}
          <p className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
            Kenji Teneka
          </p>

          {/* Nav Tabs */}
          <div className="flex gap-4 mb-6">
            {[
              { name: "About Me", href: "/handyAccount" },
              { name: "Services", href: "/handyServices" },
              { name: "Portfolio", href: "/handyDashboard" },
              { name: "Reviews", href: "#" }, // Current page
            ].map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  tab.name === "Reviews"
                    ? "bg-gray-900 text-yellow-400"
                    : "bg-yellow-500 text-gray-900 hover:bg-yellow-400 hover:text-gray-900 transition"
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-yellow-400 font-bold text-2xl">5.0</span>
              <span className="text-gray-300 text-base">(20+ reviews)</span>
            </div>
            <p className="text-gray-400 text-sm">
              Trusted by <span className="font-semibold">200+ homeowners</span>
            </p>
          </div>

          {/* Featured Review */}
          {featured && (
            <div className="w-full max-w-4xl bg-gray-900 px-6 py-6 rounded-2xl shadow-xl border-l-4 border-yellow-400 mb-12">
              <h3 className="text-xl font-bold text-yellow-400 mb-3">
                Featured Review
              </h3>
              <div className="flex items-start gap-4">
                <Image
                  src={featured.image}
                  alt={featured.name}
                  width={120}
                  height={30}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-100">{featured.name}</p>
                  <p className="text-sm text-gray-400 italic">{featured.job}</p>
                  <p className="text-sm text-gray-300 mt-2">{featured.comment}</p>
                  <p className="text-yellow-400 font-bold mt-1">
                    Rating: {featured.rating}/5
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reviews List */}
          <div className="w-full max-w-4xl bg-gray-900 px-6 py-8 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-yellow-400">All Reviews</h3>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)} //i.e. val in the dropdown current input
                className="bg-gray-800 text-gray-300 px-3 py-1 rounded-md text-sm"
              >
                <option>Most Recent</option>
                <option>Highest Rated</option>
                <option>Lowest Rated</option>
              </select>
            </div>

            {/* the array filteredReviews is mapped to the review cards that appear on screen */}
            {filteredReviews.map((review, i) => (
              <div
                key={i}
                className="border-b border-gray-700 last:border-0 py-5 flex gap-4"
              >
                <Image
                  src={review.image}
                  alt={review.name}
                  width={120}
                  height={30}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-100">{review.name}</p>
                  <p className="text-sm text-gray-400 italic">{review.job}</p>
                  <p className="text-sm text-gray-300 mt-1">{review.comment}</p>
                  <p className="text-yellow-400 font-bold mt-1">
                    Rating: {review.rating}/5
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
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
    </>
  );
}

//I tak ehelp from W3 school//
//https://medium.com/tag/coding//
