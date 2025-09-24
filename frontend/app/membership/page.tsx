// membership
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
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-[#FFCC66] to-[#FF7E5F] shadow-md">
        <div className="mx-auto max-w-[1100px] px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-wide text-gray-900">Membership</h1>
          <nav className="flex items-center gap-2 sm:gap-3" />
        </div>
      </header>

      <section className="mx-auto max-w-[1100px] px-6 py-10">
        {/* Pricing */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-yellow-400">Pricing</h2>
          <p className="mt-2 text-gray-300">
            Choose the plan that fits your work style. <br />
            Whether you’re just starting out or managing multiple jobs, we’ve got you covered.
          </p>

          {/* Toggle — dark theme with yellow accent */}
          <div className="mt-6 flex justify-center">
            <div
              role="tablist"
              aria-label="Billing period"
              className="inline-flex items-center rounded-full bg-gray-800 border border-gray-700 p-1 shadow-sm"
            >
              <button
                role="tab"
                aria-selected={billing === "monthly"}
                onClick={() => setBilling("monthly")}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  billing === "monthly"
                    ? "bg-gray-900 border border-gray-700 text-yellow-400 shadow-sm font-medium"
                    : "text-gray-300 hover:text-yellow-300"
                }`}
              >
                Monthly
              </button>

              <button
                role="tab"
                aria-selected={billing === "yearly"}
                onClick={() => setBilling("yearly")}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  billing === "yearly"
                    ? "bg-gray-900 border border-gray-700 text-yellow-400 shadow-sm font-medium"
                    : "text-gray-300 hover:text-yellow-300"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PLANS.map((plan) => {
            const price = billing === "monthly" ? plan.monthly : plan.yearly;
            const cycle = billing === "monthly" ? "/month" : "/year";

            return (
              <article
                key={plan.name}
                className="relative rounded-2xl border border-gray-700 shadow hover:shadow-lg hover:-translate-y-1 transition-all p-6 sm:p-8 flex flex-col min-h-[440px] bg-gray-800"
              >
                {plan.badge && (
                  <span className="absolute -top-3 right-6 rounded-full border border-gray-700 bg-yellow-400 px-3 py-1 text-xs font-medium text-gray-900 shadow-sm">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-yellow-400">{plan.name}</h3>
                  <p className="mt-1 text-gray-300">{plan.tagline}</p>
                  <div className="mt-5 flex items-end gap-2">
                    <span className="text-4xl font-bold leading-none text-yellow-400">${price}</span>
                    <span className="mb-1 text-gray-400">{cycle}</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-gray-200">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 mt-0.5 text-yellow-400" aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Link
                    href="/payment"
                    className="block w-full rounded-xl  bg-yellow-400 text-gray-900 px-4 py-3 text-center font-medium hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-[#59b6bd]/40"
                  >
                    Choose {plan.name}
                  </Link>
                  <p className="mt-3 text-center text-xs text-gray-400">
                    {billing === "yearly" ? "Billed annually. Cancel anytime." : "Billed monthly. Cancel anytime."}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="mx-auto max-w-[1100px] px-6">
        <p className="mt-10 text-xs text-gray-400 text-center">
          Prices are in CAD. Taxes may apply. <br /> All rights reserved.
        </p>
      </footer>

      <div className="h-24" />
    </main>
  );
}
