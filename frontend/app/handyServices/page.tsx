"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
    <main className="bg-[#F4F4F4] min-h-screen text-[#1C1C1C] flex flex-col">
      {/* ================= HEADER ================= */}
      <section className="bg-[#1C1C1C] pb-8 text-center shadow-md border-b-4 border-[#C8102E]">
        <h1 className="text-2xl md:text-3xl font-bold text-white pt-6 mb-4">
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
                  ? "bg-[#C8102E] text-white"
                  : "bg-[#C5A96A] text-[#1C1C1C] hover:bg-[#B99655] hover:text-[#1C1C1C] transition"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="px-4 py-10 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-[#C8102E]">
          Handyman Services Offered
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl hover:scale-105 hover:bg-[#C5A96A]/20 transition-transform duration-300"
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
                <h3 className="text-lg font-bold text-[#C8102E]">
                  {service.name}
                </h3>
                <p className="text-[#555]">By Kenji Teneka</p>
                <p className="text-[#C5A96A] font-semibold">
                  Rating: {service.rating}/5
                </p>
                <p className="text-[#1C1C1C] font-semibold">
                  ${service.price} CAD/HR
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
