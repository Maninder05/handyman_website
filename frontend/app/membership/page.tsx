"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { FiHome, FiMessageCircle, FiHelpCircle, FiBell, FiSettings } from "react-icons/fi";

const PLANS = [
  {
    name: "Basic",
    blurb: "Great for individuals starting out.",
    monthly: 10,
    yearly: 96,
    features: ["Create a profile", "Browse & request jobs", "In‑app messaging", "Email support"],
  },
  {
    name: "Seasonal",
    blurb: "For weekend warriors & seasonal pros.",
    monthly: 12,
    yearly: 108,
    badge: "Popular",
    features: ["Everything in Basic", "5 featured listings / mo", "Priority placement in search", "Standard support"],
  },
  {
    name: "Pro",
    blurb: "For full‑time contractors who want more.",
    monthly: 15,
    yearly: 144,
    features: ["Everything in Seasonal", "Unlimited featured listings", "Verified badge", "Priority support"],
  },
];

const NAV_ITEMS = [
  { href: "/", icon: FiHome, label: "Home" },
  { href: "/messages", icon: FiMessageCircle, label: "Messages" },
  { href: "/help", icon: FiHelpCircle, label: "Help" },
  { href: "/notifications", icon: FiBell, label: "Notifications" },
  { href: "/settings", icon: FiSettings, label: "Settings" },
];

export default function MembershipPage() {
  const [billing, setBilling] = useState("monthly");

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <header className="w-full sticky top-0 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-neutral-100">
        <div className="mx-auto max-w-[1100px] px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight">Membership</div>
          <nav className="flex items-center gap-2 sm:gap-3" />
        </div>
      </header>

      <section className="mx-auto max-w-[1100px] px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PLANS.map((plan) => {
            const price = billing === "monthly" ? plan.monthly : plan.yearly;
            const cycle = billing === "monthly" ? "/month" : "/year";
            
            return (
              <article key={plan.name} className="relative rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 flex flex-col min-h-[440px]">
                {plan.badge && (
                  <span className="absolute -top-3 right-6 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium shadow-sm">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h2 className="text-xl font-semibold tracking-tight">{plan.name}</h2>
                  <p className="mt-1 text-neutral-600">{plan.blurb}</p>
                  <div className="mt-5 flex items-end gap-2">
                    <span className="text-4xl font-bold leading-none">${price}</span>
                    <span className="mb-1 text-neutral-600">{cycle}</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Link
                    href="/payment"
                    className="block w-full rounded-xl border border-neutral-300 bg-neutral-900 text-white px-4 py-3 text-center font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                  >
                    Choose {plan.name}
                  </Link>
                  <p className="mt-3 text-center text-xs text-neutral-500">
                    {billing === "yearly" ? "Billed annually." : "Billed monthly. Cancel anytime."}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
        
        <div className="mt-8 flex justify-center md:justify-end">
          <div className="flex items-center gap-3 text-sm">
            <span className={`px-3 py-1 rounded-full border ${billing === "monthly" ? "border-neutral-900" : "border-transparent text-neutral-500"}`}>
              Monthly
            </span>
            <button 
              aria-label="Toggle billing period" 
              onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")} 
              className="relative inline-flex h-8 w-14 items-center rounded-full border border-neutral-300"
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-neutral-900 transition ${billing === "yearly" ? "translate-x-7" : "translate-x-1"}`} />
            </button>
            <span className={`px-3 py-1 rounded-full border ${billing === "yearly" ? "border-neutral-900" : "border-transparent text-neutral-500"}`}>
              Yearly <span className="ml-1 text-xs text-green-600">(Save ~20%)</span>
            </span>
          </div>
        </div>
      </section>
      
      <footer className="mx-auto max-w-[1100px] px-6">
        <p className="mt-10 text-xs text-neutral-500 text-center">
          Prices are in CAD. Taxes may apply. Changing plans prorates automatically.
        </p>
      </footer>

      <div className="h-24" />
      
      
    </main>
  );
}