// app/pay/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// Your Express payment-backend base URL (port 7000 by default)
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";

// Display-only; server still computes the real amount
const PLANS = [
  { name: "Basic",    monthly: 10, yearly: 96,  tagline: "Great for individuals starting out." },
  { name: "Seasonal", monthly: 12, yearly: 108, tagline: "For weekend warriors & seasonal pros." },
  { name: "Pro",      monthly: 15, yearly: 144, tagline: "For full-time contractors who want more." },
] as const;

type Billing = "monthly" | "yearly";

function Summary({
  planName,
  billing,
  displayAmount,
  tagline,
}: {
  planName: string;
  billing: Billing;
  displayAmount: string;
  tagline?: string;
}) {
  return (
    <aside className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-8 text-zinc-100">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-7 w-7 rounded-lg bg-yellow-400" />
        <span className="text-sm text-zinc-400">Handyman Inc</span>
      </div>

      <h2 className="text-xl font-semibold">Subscribe to {planName}</h2>
      <p className="text-sm text-zinc-400 mt-1">{tagline}</p>

      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-zinc-300">{planName} Plan</span>
          <span className="font-medium">${displayAmount}</span>
        </div>
        <div className="flex items-center justify-between text-zinc-400 text-sm">
          <span>Subtotal</span>
          <span>${displayAmount}</span>
        </div>
        <div className="flex items-center justify-between text-zinc-400 text-sm">
          <span>Tax</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="border-t border-zinc-800 pt-2 flex items-center justify-between">
          <span className="text-zinc-300">Total due today</span>
          <span className="text-lg font-bold">${displayAmount}</span>
        </div>
        <p className="text-xs text-zinc-500">
          {billing === "yearly" ? "Billed annually." : "Billed monthly."} Cancel anytime.
        </p>
      </div>
    </aside>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handlePay = async () => {
    if (!stripe || !elements) return;
    setSubmitting(true);
    setMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    setSubmitting(false);

    if (error) {
      setMessage(error.message || "Payment failed");
    } else {
      setMessage(`Payment status: ${paymentIntent?.status}`);
      // e.g., router.push(`/pay/success?pi=${paymentIntent?.id}`)
    }
  };

  return (
    <div className="space-y-4">
      <PaymentElement />
      <button
        onClick={handlePay}
        disabled={submitting || !stripe || !elements}
        className="w-full rounded-xl bg-yellow-400 text-zinc-900 font-medium py-3 hover:bg-yellow-500 disabled:opacity-60"
      >
        {submitting ? "Processing…" : "Subscribe"}
      </button>
      {message && <p className="text-sm text-center text-zinc-300">{message}</p>}
      <p className="text-[11px] text-center text-zinc-500">
        By confirming your subscription, you allow Handyman Inc to charge your
        card according to our Terms.
      </p>
    </div>
  );
}

export default function PayPage() {
  const search = useSearchParams();
  const planName = (search.get("plan") || "Basic").trim();
  const billing = ((search.get("billing") as Billing) || "monthly");

  const plan = useMemo(
    () =>
      PLANS.find((p) => p.name.toLowerCase() === planName.toLowerCase()) ??
      PLANS[0],
    [planName]
  );
  const displayAmount = (
    billing === "monthly" ? plan.monthly : plan.yearly
  ).toFixed(2);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadErr, setLoadErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoadErr(null);
      setClientSecret(null);
      try {
        // Your backend requires bookingID + amount (in cents)
        const bookingID = `B-${Date.now()}`; // replace with your real ID if you have one
        const amountCents =
          (billing === "monthly" ? plan.monthly : plan.yearly) * 100;

        const res = await fetch(`${API_URL}/api/payments/create-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingID,
            amount: amountCents, // cents
          }),
        });

        const text = await res.text();

        if (!res.ok) {
          setLoadErr(`Server ${res.status}: ${text.slice(0, 300)}`);
          return;
        }

        let data: any;
        try {
          data = JSON.parse(text);
        } catch {
          setLoadErr("Non-JSON response from API: " + text.slice(0, 300));
          return;
        }

        if (!data?.clientSecret) {
          setLoadErr("API OK but missing clientSecret");
          return;
        }

        setClientSecret(data.clientSecret);
      } catch (err: any) {
        setLoadErr(err?.message || "Network error");
      }
    })();
  }, [plan.name, billing]);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="w-full border-b border-zinc-900 bg-zinc-950/80 sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-yellow-400" />
            <p className="text-sm text-zinc-300">Handyman Inc</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6 md:gap-8">
          {/* Left: Summary */}
          <div className="lg:sticky lg:top-24 self-start">
          <Summary
            planName={plan.name}
            billing={billing}
            displayAmount={displayAmount}
            tagline={plan.tagline}
          />
        </div>

          {/* Right: Elements checkout */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-4">Payment method</h2>

            {loadErr && (
              <p className="mb-4 text-sm text-red-400">
                Couldn’t start checkout: {loadErr}
              </p>
            )}

            {!clientSecret && !loadErr && (
              <div className="text-sm text-zinc-400">Loading checkout…</div>
            )}

            {clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "night",
                    variables: {
                      colorPrimary: "#facc15",
                      colorText: "#e5e7eb",
                      fontFamily:
                        "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
                    },
                  },
                }}
              >
                <CheckoutForm />
              </Elements>
            )}
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-zinc-500">
          Need help? Contact support@handyman.example
        </p>
      </section>
    </main>
  );
}
