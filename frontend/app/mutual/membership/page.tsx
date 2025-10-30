"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import Header from "../../components/handyHeader";

export default function MembershipPage() {
  const [billing, setBilling] = useState<Billing>("monthly");

  type Billing = "monthly" | "yearly";

  const PLANS = [
    {
      name: "Basic",
      tagline: "Great for individuals starting out.",
      monthly: 10,
      yearly: 96,
      features: [
        "Create a profile",
        "Browse & request jobs",
        "In-app messaging",
        "Email support",
      ],
    },
    {
      name: "Seasonal",
      tagline: "For weekend warriors & seasonal pros.",
      monthly: 12,
      yearly: 108,
      badge: "Popular",
      features: [
        "Everything in Basic",
        "5 featured listings / mo",
        "Priority placement in search",
        "Standard support",
      ],
    },
    {
      name: "Pro",
      tagline: "For full-time contractors who want more.",
      monthly: 15,
      yearly: 144,
      features: [
        "Everything in Seasonal",
        "Unlimited featured listings",
        "Verified badge",
        "Priority support",
      ],
    },
  ];

  const router = useRouter();
  const handleLogout = () => router.push("/");

  return (
    <main className="min-h-screen bg-white">
      <div>
        <Header pageTitle="Buy Membership" onLogout={handleLogout} />
      </div>

      <section className="mx-auto max-w-[1100px] px-6 py-10">
        {/* Pricing */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-black">
            Pricing
          </h2>
          <p className="mt-2 text-black">
            Choose the plan that fits your work style. <br />
            Whether you’re just starting out or managing multiple jobs, we’ve
            got you covered.
          </p>

          {/* Toggle — dark theme with yellow accent */}
          <div className="mt-6 flex justify-center">
            <div
              role="tablist"
              aria-label="Billing period"
              className="inline-flex items-center rounded-fullbg-[#D4A574]  border border-gray-700 p-1 shadow-sm"
            >
              <button
                role="tab"
                aria-selected={billing === "monthly"}
                onClick={() => setBilling("monthly")}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  billing === "monthly"
                    ? "bg-gray-900 border border-gray-700bg-gray-300 shadow-sm font-medium"
                    : "text-black bg-gray-600"
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
                    ? "bg-gray-900 border border-gray-700bg-gray-300 shadow-sm font-medium"
                    : "text-gray-300 bg-gray-600"
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
                className="relative rounded-2xl border bg-[#D4A574] text-white border-gray-700 shadow hover:shadow-lg hover:-translate-y-1 transition-all p-6 sm:p-8 flex flex-col min-h-[440px]bg-[#D4A574] "
              >
                {plan.badge && (
                  <span className="absolute -top-3 right-6 rounded-full border border-gray-700 bg-gray-300 px-3 py-1 text-xs font-medium text-black shadow-sm">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-semibold tracking-tightbg-gray-300">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-white">{plan.tagline}</p>
                  <div className="mt-5 flex items-end gap-2">
                    <span className="text-4xl font-bold leading-nonebg-gray-300">
                      ${price}
                    </span>
                    <span className="mb-1 text-white">{cycle}</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-white">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2
                        className="h-5 w-5 mt-0.5bg-gray-300"
                        aria-hidden
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Link
                    href={`/pay?plan=${encodeURIComponent(
                      plan.name
                    )}&billing=${billing}`}
                    className="block w-full rounded-xl bg-gray-300 text-gray-900 px-4 py-3 text-center font-medium hover:bg-gray-400"
                  >
                    Choose {plan.name}
                  </Link>
                  <p className="mt-3 text-center text-xs text-white">
                    {billing === "yearly"
                      ? "Billed annually. Cancel anytime."
                      : "Billed monthly. Cancel anytime."}
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
