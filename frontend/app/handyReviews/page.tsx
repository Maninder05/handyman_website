"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiHome, FiMessageCircle, FiHelpCircle, FiBell, FiSettings } from "react-icons/fi";
 
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
      comment: "Work was okay, but could have been faster. Communication was fine.",
      image: "/images/client3.jpg",
    },
  ];
 
  // Featured review = first review with rating === 5
  const featured = allReviews.find((r) => r.rating === 5);
 
  //using filter state to update the reviews based on the setFilter() fxn that gets triggered everytime dropdown menu input changes
  const [filter, setFilter] = React.useState("Most Recent");
 
  // Dynamic min and max ratings
  const maxRating = Math.max(...allReviews.map((r) => r.rating)); //allReviews obj is destructured
  const minRating = Math.min(...allReviews.map((r) => r.rating)); //returns an array of all reviews whose rating equals the min rating
 
  // Apply filter
  const filteredReviews =
    filter === "Highest Rated"
      ? allReviews.filter((r) => r.rating === maxRating)
      : filter === "Lowest Rated"
      ? allReviews.filter((r) => r.rating === minRating)
      : allReviews;
 return (
    <>
      <main className="bg-neutral-900 min-h-screen text-neutral-100 flex flex-col">
        {/* Header */}
        <section className="bg-blue-500 pb-24 relative text-center">
          <h1 className="text-2xl md:text-3xl mb-4 font-bold text-neutral-900 pt-6 tracking-wide">
            Reviews
          </h1>
 
          {/* Profile */}
          <div
            style={{ left: "50%", top: "100%", transform: "translate(-50%, -50%)" }}
            className="absolute z-30 w-48 h-48 md:w-52 md:h-52"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-neutral-200 shadow-xl">
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
              <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg shadow-md">
                <span className="text-sm md:text-base font-semibold whitespace-nowrap">
                  $55 CAD/HR
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-neutral-200 flex flex-col items-center pt-32 pb-16 px-4 relative">
          {/* Name */}
          <p className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
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
                    ? "bg-blue-500 text-white"
                    : "bg-neutral-300 text-neutral-800 hover:bg-neutral-400"
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>
 
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-blue-500 font-bold text-2xl">5.0</span>
              <span className="text-neutral-700 text-base">(20+ reviews)</span>
            </div>
            <p className="text-neutral-600 text-sm">
              Trusted by <span className="font-semibold">200+ homeowners</span>
            </p>
          </div>