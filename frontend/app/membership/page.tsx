"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

type Billing = "monthly" | "yearly";

const PLANS = [
  {
    name: "Basic",
    tagline: "Great for individuals starting out.",
    monthly: 10,
    yearly: 96,
    features: ["Create a profile", "Browse & request jobs", "In-app messaging", "Email support"],
  },
  {
    name: "Seasonal",
    tagline: "For weekend warriors & seasonal pros.",
    monthly: 12,
    yearly: 108,
    badge: "Popular",
    features: ["Everything in Basic", "5 featured listings / mo", "Priority placement in search", "Standard support"],
  },
  {
    name: "Pro",
    tagline: "For full-time contractors who want more.",
    monthly: 15,
    yearly: 144,
    features: ["Everything in Seasonal", "Unlimited featured listings", "Verified badge", "Priority support"],
  },
];

export default function MembershipPage() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <header className="w-full sticky top-0 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-neutral-100">
        <div className="mx-auto max-w-[1100px] px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight">Membership</div>
          <nav className="flex items-center gap-2 sm:gap-3" />
        </div>
      </header>

      <section className="mx-auto max-w-[1100px] px-6 py-10">
        {/* Pricing header + top toggle */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Pricing</h1>
          <p className="mt-2 text-neutral-600">
            Choose the plan that fits your work style. <br />
            Whether you’re just starting out or managing multiple jobs, we’ve got you covered.
          </p>

          {/* Segmented toggle (Monthly / Yearly) */}
          <div className="mt-6 flex justify-center">
            <div
              role="tablist"
              aria-label="Billing period"
              className="inline-flex items-center rounded-full bg-neutral-100 p-1 shadow-sm"
            >
              <button
                role="tab"
                aria-selected={billing === "monthly"}
                onClick={() => setBilling("monthly")}
                className={`px-4 py-2 rounded-full text-sm transition
                  ${billing === "monthly"
                    ? "bg-white border border-neutral-300 shadow-sm font-medium"
                    : "text-neutral-600 hover:text-neutral-800"}
                `}
              >
                Monthly
              </button>

              <button
                role="tab"
                aria-selected={billing === "yearly"}
                onClick={() => setBilling("yearly")}
                className={`px-4 py-2 rounded-full text-sm transition
                  ${billing === "yearly"
                    ? "bg-white border border-neutral-300 shadow-sm font-medium"
                    : "text-neutral-600 hover:text-neutral-800"}
                `}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PLANS.map((plan) => {
            const price = billing === "monthly" ? plan.monthly : plan.yearly;
            const cycle = billing === "monthly" ? "/month" : "/year";

            return (
              <article
                key={plan.name}
                className="relative rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 flex flex-col min-h-[440px]"
              >
                {plan.badge && (
                  <span className="absolute -top-3 right-6 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium shadow-sm">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h2 className="text-xl font-semibold tracking-tight">{plan.name}</h2>
                  <p className="mt-1 text-neutral-600">{plan.tagline}</p>
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
                    className="block w-full rounded-xl border border-[#59b6bd] bg-[#59b6bd] text-white px-4 py-3 text-center font-medium hover:bg-[#59b6bd]/90 focus:outline-none focus:ring-2 focus:ring-[#59b6bd]/50"
                  >
                    Choose {plan.name}
                  </Link>
                  <p className="mt-3 text-center text-xs text-neutral-500">
                    {billing === "yearly" ? "Billed annually. Cancel anytime" : "Billed monthly. Cancel anytime."}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="mx-auto max-w-[1100px] px-6">
        <p className="mt-10 text-xs text-neutral-500 text-center">
          Prices are in CAD. Taxes may apply.<br /> All rights reserved. 
        </p>
      </footer>

      <div className="h-24" />
    </main>
  );
}
