"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HelpCentrePage() {
  const router = useRouter();  // Navigator
  const [q, setQ] = useState(""); // Search query state

  function onSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`/help/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="w-full sticky top-0 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-neutral-100">
        <div className="mx-auto max-w-[1100px] px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight">Help Centre</div>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link href="/menu" className="px-3 py-2 rounded-full hover:bg-neutral-100 text-sm">
              Menu
            </Link>
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
            <form onSubmit={onSearch} className="flex items-center gap-2">
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
                type="submit"
                className="h-10 inline-flex items-center justify-center rounded-full px-4
                           text-sm font-medium leading-none bg-[#59b6bd] text-white
                           hover:bg-[#023c41]"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        <section className="mt-6 max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Guides for getting started</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <Link href="/guides/book-handyman" className="rounded-lg border border-neutral-200 p-6 text-center shadow-sm hover:bg-neutral-50">
              How to book a handyman for your home
            </Link>
            <Link href="/guides/post-service" className="rounded-lg border border-neutral-200 p-6 text-center shadow-sm hover:bg-neutral-50">
              Posting your first handyman service
            </Link>
            <Link href="/guides/manage-profile" className="rounded-lg border border-neutral-200 p-6 text-center shadow-sm hover:bg-neutral-50">
              Managing and updating your profile details
            </Link>
            <Link href="/guides/handycover" className="rounded-lg border border-neutral-200 p-6 text-center shadow-sm hover:bg-neutral-50">
              HandyCover protection for customers
            </Link>
          </div>
        </section>

        <section className="mt-8 max-w-5xl mx-auto px-6 text-left">
          <h2 className="text-2xl font-semibold mb-6">Help Topics</h2>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/yet2make" className="px-6 py-3 rounded-lg bg-neutral-100 text-neutral-800 font-medium hover:bg-blue-200 inline-block">
              Live Chat Support
            </Link>
            <Link href="/yet2make" className="px-6 py-3 rounded-lg bg-neutral-100 text-neutral-800 font-medium hover:bg-blue-200 inline-block">
              Billing &amp; Payments
            </Link>
            <Link href="/yet2make" className="px-6 py-3 rounded-lg bg-neutral-100 text-neutral-800 font-medium hover:bg-blue-200 inline-block">
              Report an Issue
            </Link>
            <Link href="/membership" className="px-6 py-3 rounded-lg bg-neutral-100 text-neutral-800 font-medium hover:bg-blue-200 inline-block">
              Membership Plan
            </Link>
          </div>
        </section>

        <section className="mt-10 max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>

          <div className="space-y-3">
            <details className="group rounded-lg border border-neutral-200 px-5 py-4">
              <summary className="cursor-pointer font-medium list-none">
                How do I book a handyman?
              </summary>
              <div className="mt-2 text-sm text-neutral-700">
                Search for a service, pick a time that works, and confirm your booking. 
                You’ll get a confirmation email with the details.
              </div>
            </details>

            <details className="group rounded-lg border border-neutral-200 px-5 py-4">
              <summary className="cursor-pointer font-medium list-none">
                What are the payment options?
              </summary>
              <div className="mt-2 text-sm text-neutral-700">
                We accept credit/debit cards and major digital wallets. Payments are held 
                securely and released after the job is completed.
              </div>
            </details>

            <details className="group rounded-lg border border-neutral-200 px-5 py-4">
              <summary className="cursor-pointer font-medium list-none">
                Can I cancel or reschedule?
              </summary>
              <div className="mt-2 text-sm text-neutral-700">
                Yes. You can cancel or reschedule from your bookings page. Fees may apply 
                for late cancellations depending on the provider’s policy.
              </div>
            </details>

            <details className="group rounded-lg border border-neutral-200 px-5 py-4">
              <summary className="cursor-pointer font-medium list-none">
                Are handymen verified?
              </summary>
              <div className="mt-2 text-sm text-neutral-700">
                All pros complete ID verification and profile checks. Check ratings and 
                reviews on each profile before booking.
              </div>
            </details>

            <details className="group rounded-lg border border-neutral-200 px-5 py-4">
              <summary className="cursor-pointer font-medium list-none">
                How are prices determined?
              </summary>
              <div className="mt-2 text-sm text-neutral-700">
                Pricing is set by each provider based on task type, duration, and materials. 
                You’ll see an estimate before confirming.
              </div>
            </details>

            <details className="group rounded-lg border border-neutral-200 px-5 py-4">
              <summary className="cursor-pointer font-medium list-none">
                Do I need to provide tools or materials?
              </summary>
              <div className="mt-2 text-sm text-neutral-700">
                Most handymen bring their own basic tools. If special materials are required, 
                you’ll discuss this with your provider before the job.
              </div>
            </details>

            <details className="group rounded-lg border border-neutral-200 px-5 py-4">
              <summary className="cursor-pointer font-medium list-none">
                Is my payment secure?
              </summary>
              <div className="mt-2 text-sm text-neutral-700">
                Yes. All payments go through our secure system. Providers are paid only 
                after the work is confirmed as complete.
              </div>
            </details>

            <details className="group rounded-lg border border-neutral-200 px-5 py-4">
              <summary className="cursor-pointer font-medium list-none">
                What if I’m not satisfied with the work?
              </summary>
              <div className="mt-2 text-sm text-neutral-700">
                You can report issues directly in the app. Our support team will step in 
                to resolve disputes and ensure fair outcomes.
              </div>
            </details>

            <details className="group rounded-lg border border-neutral-200 px-5 py-4">
              <summary className="cursor-pointer font-medium list-none">
                Do you offer insurance or protection?
              </summary>
              <div className="mt-2 text-sm text-neutral-700">
                Yes, jobs booked through our platform are covered by HandyCover for customers, 
                giving you peace of mind in case of accidents or damages.
              </div>
            </details>

            <details className="group rounded-lg border border-neutral-200 px-5 py-4">
              <summary className="cursor-pointer font-medium list-none">
                How do I become a handyman on the platform?
              </summary>
              <div className="mt-2 text-sm text-neutral-700">
                Sign up, complete verification, and list your services. Once approved, 
                you’ll start receiving customer requests in your area.
              </div>
            </details>
          </div>
        </section>

        <footer className="mt-16 w-full h-20" />
      </main>
    </div>
  );
}
