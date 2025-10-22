"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BrowseServicesPage() {
  const [filter, setFilter] = useState("All");
  const services = [
    { name: "Residential Wiring Repair", image: "/images/wiring-fix.jpg", rating: 5, price: 55, category: "Electrical" },
    { name: "Load Repair", image: "/images/load-fixation.jpg", rating: 4, price: 50, category: "Electrical" },
    { name: "Voltage Maintenance", image: "/images/voltage-testing.jpg", rating: 3, price: 45, category: "Maintenance" },
    { name: "Appliance Installation", image: "/images/outlet-repair.jpg", rating: 5, price: 60, category: "Installation" },
  ];

  const filteredServices = filter === "All" ? services : services.filter((s) => s.category === filter);

  return (
    <main className="bg-[#F8F8F8] min-h-screen text-[#5C4033] flex flex-col">
      <section className="bg-[#5C4033] pb-6 text-center shadow-md border-b-4 border-[#EED9C4]">
        <h1 className="text-3xl font-bold text-[#EED9C4] pt-6 mb-4">
          Browse Services
        </h1>
        <div className="flex justify-center gap-4 flex-wrap">
          {["All", "Electrical", "Maintenance", "Installation"].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition
                ${
                  filter === category
                    ? "bg-[#C4956A] text-white"
                    : "bg-[#EED9C4] text-[#5C4033] hover:bg-[#E3C7A8]"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 py-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl hover:scale-105 hover:bg-[#EED9C4]/20 transition-transform duration-300 border border-[#EED9C4]"
            >
              <div className="relative w-full h-40">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#C4956A]">{service.name}</h3>
                <p className="text-[#5C4033]">⭐ {service.rating}/5</p>
                <p className="text-[#5C4033] font-semibold">${service.price} CAD/HR</p>
                <Link
                  href={`/bookHandyman?service=${encodeURIComponent(service.name)}`}
                  className="mt-2 bg-[#C4956A] text-white text-center rounded-lg py-2 hover:bg-[#D4A574] transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
