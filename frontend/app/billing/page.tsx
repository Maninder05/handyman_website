"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {FiHome, FiMessageCircle, FiHelpCircle, FiBell,FiSettings, } from "react-icons/fi";

export default function BillingPage() {
  const totalAmount = 4955.67;

  const deposits = 700;
  const refunds = 150;

  const transactions = [
    {
      job: "Residential Wiring Repair",
      image: "/images/wiring-fix.jpg",
      price: 200,
    },
    {
      job: "Load Repair",
      image: "/images/load-fixation.jpg",
      price: 150,
    },
    {
      job: "Voltage Maintenance",
      image: "/images/voltage-testing.jpg",
      price: 300,
    },
    {
      job: "Appliance Installation",
      image: "/images/outlet-repair.jpg",
      price: 400,
    },
  ];

  return (
    <main className="bg-neutral-100 min-h-screen flex flex-col">
      {/* Header */}
      <section className="relative bg-cyan-500 py-10 px-6 overflow-hidden">
        {/* Floating background */}
        <div className="absolute inset-0 opacity-10">
          {/* animation-pulse creates subtle fading in and out effect */}
          <div className="w-64 h-64 bg-cyan-300 rounded-full absolute -top-16 -left-16 animate-pulse"></div> 
          <div className="w-64 h-64 bg-cyan-300 rounded-full absolute -bottom-16 -right-16 animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-bold text-neutral-900">Billing and Payments</h1>
          <p className="text-4xl font-extrabold text-neutral-900 mt-2">${totalAmount.toFixed(2)}</p>
          <p className="text-neutral-700 mt-2 italic">“Track all your earnings and refunds in one place.”</p>
        </div>
      </section>
      <section className="bg-gray-200 px-6 py-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <p className="text-3xl font-bold text-neutral-900">${deposits}</p>
            <p className="text-gray-500 mt-1">Deposits</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <p className="text-3xl font-bold text-neutral-900">${refunds}</p>
            <p className="text-gray-500 mt-1">Refunds</p>
          </div>
        </div>
      </section>

      {/* Transactions Header */}
      <section className="bg-cyan-100 px-6 py-4 mt-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-neutral-900">Transactions</h2>
          <Link href="#" className="text-cyan-600 font-semibold hover:underline">
            See All
          </Link>
        </div>

        {/* Transaction List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {transactions.map((tx, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                  <Image
                    src={tx.image}
                    alt={tx.job}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-semibold text-neutral-900">{tx.job}</p>
              </div>
              <p className="font-bold text-neutral-900">${tx.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cyan-500 py-4 mt-auto">
        <div className="flex justify-around items-center text-neutral-900 text-sm font-medium">
          <Link href="/" className="flex flex-col items-center gap-1">
            <FiHome size={20} /> Home
          </Link>
          <Link href="/messages" className="flex flex-col items-center gap-1">
            <FiMessageCircle size={20} /> Messages
          </Link>
          <Link href="/help" className="flex flex-col items-center gap-1">
            <FiHelpCircle size={20} /> Help
          </Link>
          <Link href="/notifications" className="flex flex-col items-center gap-1">
            <FiBell size={20} /> Notifications
          </Link>
          <Link href="/settings" className="flex flex-col items-center gap-1">
            <FiSettings size={20} /> Settings
          </Link>
        </div>
      </footer>
    </main>
  );
}
