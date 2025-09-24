"use client";

import { useState, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, CheckCircle2 } from "lucide-react";
import {
  FiHome,
  FiMessageCircle,
  FiHelpCircle,
  FiBell,
  FiSettings,
  FiUser,
} from "react-icons/fi";

function cn(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(" ");
}

type Plan = {
  name: string;
  blurb: string;
  monthly: number;
  yearly: number;
  badge?: string;
  features: string[];
};

const PLANS: Plan[] = [
  /** Static plan data used to render the cards */
  {
    name: "Basic",
    blurb: "Great for individuals starting out.",
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
    blurb: "For weekend warriors & seasonal pros.",
    monthly: 12,
    yearly: 108,
    badge: "Popular", //Highlighted badge
    features: [
      "Everything in Basic",
      "5 featured listings / mo",
      "Priority placement in search",
      "Standard support",
    ],
  },
  {
    name: "Pro",
    blurb: "For full-time contractors who want more.",
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

const BillingToggle = memo(function BillingToggle({
  value,
  onChange,
}: {
  value: "monthly" | "yearly";
  onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span
        className={cn(
          "px-3 py-1 rounded-full border",
          value === "monthly"
            ? "border-gray-900 text-yellow-400"
            : "border-transparent text-gray-400"
        )}
      >
        Monthly
      </span>
      <button
        aria-label="Toggle billing period"
        onClick={onChange}
        className="relative inline-flex h-8 w-14 items-center rounded-full border border-gray-600 bg-gray-700"
      >
        <span
          className={cn(
            "inline-block h-6 w-6 transform rounded-full bg-yellow-400 transition",
            value === "yearly" ? "translate-x-7" : "translate-x-1"
          )}
        />
      </button>
      <span
        className={cn(
          "px-3 py-1 rounded-full border",
          value === "yearly"
            ? "border-gray-900 text-yellow-400"
            : "border-transparent text-gray-400"
        )}
      >
        Yearly{" "}
        <span className="ml-1 text-xs text-green-400">(Save ~20%)</span>
      </span>
    </div>
  );
});

const PlanCard = memo(function PlanCard({
  plan,
  billing,
}: {
  plan: Plan;
  billing: "monthly" | "yearly";
}) {
  const price = billing === "monthly" ? plan.monthly : plan.yearly;
  const cycle = billing === "monthly" ? "/month" : "/year";

  return (
    <article className="relative rounded-2xl border border-gray-700 shadow hover:shadow-lg hover:-translate-y-1 transition-all p-6 sm:p-8 flex flex-col min-h-[440px] bg-gray-800 text-gray-100">
      {plan.badge && (
        <span className="absolute -top-3 right-6 rounded-full border border-gray-700 bg-yellow-400 px-3 py-1 text-xs font-medium shadow-sm">
          {plan.badge}
        </span>
      )}

      <div>
        <h2 className="text-xl font-semibold tracking-tight text-yellow-400">
          {plan.name}
        </h2>
        <p className="mt-1 text-gray-300">{plan.blurb}</p>
        <div className="mt-5 flex items-end gap-2">
          <span className="text-4xl font-bold leading-none text-yellow-400">
            ${price}
          </span>
          <span className="mb-1 text-gray-400">{cycle}</span>
        </div>
      </div>

      <ul className="mt-6 space-y-3 text-sm text-gray-200">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <CheckCircle2
              className="h-5 w-5 mt-0.5 text-yellow-400"
              aria-hidden
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <Link
          href="/payment"
          className="block w-full rounded-xl border border-yellow-400 bg-yellow-400 text-gray-900 px-4 py-3 text-center font-medium hover:bg-yellow-500 hover:text-gray-900 transition"
        >
          Choose {plan.name}
        </Link>
        <p className="mt-3 text-center text-xs text-gray-400">
          {billing === "yearly"
            ? "Billed annually."
            : "Billed monthly. Cancel anytime."}
        </p>
      </div>
    </article>
  );
});

export default function MembershipPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col text-gray-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#FFCC66] to-[#FF7E5F] shadow-md relative">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Title */}
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-wide">
            Membership Plans
          </h1>
        </div>
      </header>

      {/* PLANS SECTION */}
      <main className="flex-1 overflow-y-auto">
        <section className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {PLANS.map((p) => (
              <PlanCard key={p.name} plan={p} billing={billing} />
            ))}
          </div>
          <div className="mt-8 flex justify-center md:justify-end">
            <BillingToggle
              value={billing}
              onChange={() =>
                setBilling(billing === "monthly" ? "yearly" : "monthly")
              }
            />
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6">
          <p className="mt-10 text-xs text-gray-400 text-center">
            Prices are in CAD. Taxes may apply. Changing plans prorates
            automatically.
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-gray-300 mt-10">
        <div className="max-w-5xl mx-auto flex justify-around py-5 text-sm">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiHome size={20} /> Home
          </Link>
          <Link
            href="/messages"
            className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiMessageCircle size={20} /> Messages
          </Link>
          <Link
            href="/help"
            className="flex flex-col items-center gap-1 hover:text-yellow-400 transition"
          >
            <FiHelpCircle size={20} /> Help
          </Link>
          <Link
            href="/notifications"
            className="flex flex-col items-center gap-1 hover:text-[#FF7E5F] transition"
          >
            <FiBell size={20} /> Notifications
          </Link>
          <Link
            href="/settings"
            className="flex flex-col items-center gap-1 hover:text-[#FF7E5F] transition"
          >
            <FiSettings size={20} /> Settings
          </Link>
        </div>
      </footer>
    </div>
  );
}