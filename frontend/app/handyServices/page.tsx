"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {FiHome, FiMessageCircle, FiHelpCircle, FiBell, FiSettings } from "react-icons/fi";  //Feather Icons for minimal, thin and modern design
 
export default function MyServicesPage() {
  //creating services arr so that map fxn can be implemented and each one of it's elements i.e. objs can be rendered recursively
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
    <main className="bg-neutral-100 min-h-screen text-neutral-900 flex flex-col">
      {/* Header */}
      <section className="bg-blue-500 pb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-100 pt-6 mb-4">
          My Services
        </h1>
 
        <div className="flex justify-center gap-4">
          {[
            { name: "About Me", href: "/handyAccount" },
            { name: "Services", href: "/handyServices" },
            { name: "Portfolio", href: "/handyDasboard" },
            { name: "Reviews", href: "/handyReviews" },
          ].map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                tab.name === "Services"
                  ? "bg-white text-blue-500"
                  : "bg-blue-400 text-white hover:bg-blue-300"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </section>
      {/* Services Grid */}
      <section className="px-4 py-10 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-neutral-900">Handyman Services Offered</h2>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
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
                <h3 className="text-lg font-bold text-neutral-900">{service.name}</h3>
                <p className="text-neutral-700">By Kenji Teneka</p>
                <p className="text-yellow-500 font-semibold">Rating: {service.rating}/5</p>
                <p className="text-neutral-900 font-semibold">${service.price} CAD/HR</p>
              </div>
            </div>
          ))}
        </div>
      </section>
 
 