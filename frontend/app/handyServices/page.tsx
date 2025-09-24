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

export default function MyServicesPage() {
  const services = [
    {
      name: "Residential Wiring Repair",
      image: "/images/wiring-fix.jpg",
      rating: 5,
      price: 55,
    },
    {
      name: "Load Repair",
      image: "/images/load-fixation.jpg",
      rating: 4,
      price: 50,
    },
    {
      name: "Voltage Maintenance",
      image: "/images/voltage-testing.jpg",
      rating: 3,
      price: 45,
    },
    {
      name: "Appliance Installation",
      image: "/images/outlet-repair.jpg",
      rating: 5,
      price: 60,
    },
  ];

  return (
    <main className="bg-gray-900 min-h-screen text-gray-100 flex flex-col">
      {/* Header */}
      <section className="bg-yellow-600 pb-8 text-center shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 pt-6 mb-4">
          My Services
        </h1>

        <div className="flex justify-center gap-4">
          {[
            { name: "About Me", href: "/handyAccount" },
            { name: "Services", href: "/handyServices" },
            { name: "Portfolio", href: "/handyDashboard" },
            { name: "Reviews", href: "/handyReviews" },
          ].map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                tab.name === "Services"
                  ? "bg-gray-900 text-yellow-400"
                  : "bg-yellow-500 text-gray-900 hover:bg-yellow-400 hover:text-gray-900 transition"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-10 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-yellow-400">
          Handyman Services Offered
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl hover:scale-105 hover:bg-yellow-600 transition-transform duration-300"
            >
              <div className="relative w-full h-40">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex flex-col gap-1">
                <h3 className="text-lg font-bold text-yellow-400">
                  {service.name}
                </h3>
                <p className="text-gray-300">By Kenji Teneka</p>
                <p className="text-yellow-500 font-semibold">
                  Rating: {service.rating}/5
                </p>
                <p className="text-gray-100 font-semibold">
                  ${service.price} CAD/HR
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-800 text-gray-400 mt-15">
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
    </main>
  );
}

//I take help from W3 school//
//https://medium.com/tag/coding//
//https://tailwindcss.com//
//https://youtu.be/DZKOunP-WLQ?si=u2jdWzgrZYCwfIzA
