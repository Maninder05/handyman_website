"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HelpCentrePage() {
  const [q, setQ] = useState(""); 

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="w-full fixed top-0 z-50 bg-white border-b border-neutral-100">
        <div className="mx-auto max-w-[1100px] px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight">Help Centre</div>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link href="/profile" className="px-3 py-2 rounded-full hover:bg-neutral-100 text-sm">
              Profile
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-6">
        <section className="py-14 sm:py-20 md:py-28">
          <h1 className="font-semibold leading-tight tracking-tight text-center text-3xl sm:text-5xl md:text-6xl max-w-4xl mx-auto">
            Hello User, how can we help?
          </h1>

          <div className="mt-4 flex justify-center">
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search how-tos and more"
                className="h-10 w-72 rounded-full border border-neutral-200 px-4 text-sm
                           focus:outline-none focus:ring-0"
                aria-label="Search help articles"
              />
              <button
                type="button"
                className="h-10 inline-flex items-center justify-center rounded-full px-4
                           text-sm font-medium leading-none bg-[#59b6bd] text-white
                           hover:bg-[#023c41]">Search</button>
            </form>
          </div>
        </section>

        <section className="mt-8 max-w-5xl mx-auto px-6 text-left">
          <h2 className="text-2xl font-semibold mb-6">Help Topics</h2>
          <div className="flex justify-between gap-4">
            <Link
              href="/payment"
              className="flex-1 text-center px-6 py-3 rounded-lg bg-neutral-100 text-neutral-800 font-medium hover:bg-[#59b6bd] hover:text-white"
            >
              Billing & Payments
            </Link>
            <Link
              href="/create-service"
              className="flex-1 text-center px-6 py-3 rounded-lg bg-neutral-100 text-neutral-800 font-medium hover:bg-[#59b6bd] hover:text-white"
            >
              Create Services
            </Link>
            <Link
              href="/membership"
              className="flex-1 text-center px-6 py-3 rounded-lg bg-neutral-100 text-neutral-800 font-medium hover:bg-[#59b6bd] hover:text-white"
            >
              Membership Plan
            </Link>
            <Link
              href="/messages"
              className="flex-1 text-center px-6 py-3 rounded-lg bg-neutral-100 text-neutral-800 font-medium hover:bg-[#59b6bd] hover:text-white"
            >
              Report an Issue
            </Link>
          </div>
        </section>

        <section className="mt-6 max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Guides for getting started</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <Link
              href="/book-services"
              className="rounded-lg border border-neutral-200 p-4 text-left shadow-sm hover:bg-neutral-50 transition-colors"
            >
              <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden mb-3 bg-neutral-100">
                <Image
                  src="/images/getstarted.jpg"
                  alt="Book a handyman for your home"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                  priority
                />
              </div>
              <h3 className="font-semibold mb-1">How to book a handyman for your home</h3>
              <p className="text-sm text-neutral-600">
                Step-by-step guide to finding and booking the right professional
              </p>
            </Link>
            <Link
              href="/create-service"
              className="rounded-lg border border-neutral-200 p-4 text-left shadow-sm hover:bg-neutral-50 transition-colors">
              <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden mb-3 bg-neutral-100">
                <Image
                  src="/images/firsthandyman.jpg"
                  alt="Posting your first handyman service"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold mb-1">Posting your first handyman service</h3>
              <p className="text-sm text-neutral-600">
                Learn how to create and publish your service offerings
              </p>
            </Link>
            <Link
              href="/portfolio"
              className="rounded-lg border border-neutral-200 p-4 text-left shadow-sm hover:bg-neutral-50 transition-colors">
              <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden mb-3 bg-neutral-100">
                <Image
                  src="/images/managing.jpg"
                  alt="Managing your profile details"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold mb-1">Managing your profile details</h3>
              <p className="text-sm text-neutral-600">
                Keep your information up to date for better matches
              </p>
            </Link>

            <Link
              href="/account"
              className="rounded-lg border border-neutral-200 p-4 text-left shadow-sm hover:bg-neutral-50 transition-colors"
            >
              <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden mb-3 bg-neutral-100">
                <Image
                  src="/images/protection.jpg"
                  alt="HandyCover protection for customers"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold mb-1">HandyCover protection for customers</h3>
              <p className="text-sm text-neutral-600">
                Understand how our protection plan keeps you covered
              </p>
            </Link>
          </div>
        </section>

        <section className="mt-10 max-w-5xl mx-auto px-6">
          <h2 className="mb-8 text-center text-4xl sm::text-5xl font-extrabold uppercase tracking-tight">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {q: "How do I book a handyman?", a: "Search for a service, pick a time that works, and confirm your booking. You’ll get a confirmation email with the details."},
              {q: "What are the payment options?", a: "We accept credit/debit cards and major digital wallets. Payments are held securely and released after the job is completed."},
              {q: "Can I cancel or reschedule?", a: "Yes. You can cancel or reschedule from your bookings page. Fees may apply for late cancellations depending on the provider’s policy."},
              {q: "Are handymen verified?", a: "All pros complete ID verification and profile checks. Check ratings and reviews on each profile before booking."},
              {q: "How are prices determined?", a: "Pricing is set by each provider based on task type, duration, and materials. You’ll see an estimate before confirming."},
              {q: "Do I need to provide tools or materials?", a: "Most handymen bring their own basic tools. If special materials are required, you’ll discuss this with your provider before the job."},
              {q: "Is my payment secure?", a: "Yes. All payments go through our secure system. Providers are paid only after the work is confirmed as complete."},
              {q: "What if I’m not satisfied with the work?", a: "You can report issues directly in the app. Our support team will step in to resolve disputes and ensure fair outcomes."},
              {q: "Do you offer insurance or protection?", a: "Yes, jobs booked through our platform are covered by HandyCover for customers, giving you peace of mind in case of accidents or damages."},
              {q: "How do I become a handyman on the platform?", a: "Sign up, complete verification, and list your services. Once approved, you’ll start receiving customer requests in your area."},
            ].map(({q, a}, i) => (
              <details key={i} className="group rounded-2xl bg-neutral-100/80 px-5 sm:px-6 py-4 sm:py-5 shadow-sm hover:bg-neutral-100 transition">
                <summary className="list-none cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 text-base sm:text-lg font-medium ">{q}</div>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-neutral-200 transition-colors group-open:bg-[#008080]">
                      <svg 
                        viewBox="0 0 24 24"
                        className="h-5 w-5 transition-transform group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true">
                          <path d="m6 9 6 6 6 -6" /> 
                      </svg>
                    </span>
                  </div>
                </summary>
                <div className="pt-3 sm:pt-4 text-sm sm:text-[15px] leading-relaxed text-neutral-700">{a}</div>
              </details>
            ))}
          </div>
        </section>
        <footer className="mt-16 w-full h-20" />
      </main>
    </div>
  );
}
