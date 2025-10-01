// Author: Navi
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
  { name: "Basic", monthly: 10, yearly: 96, tagline: "Great for individuals starting out." },
  { name: "Seasonal", monthly: 12, yearly: 108, tagline: "For weekend warriors & seasonal pros." },
  { name: "Pro", monthly: 15, yearly: 144, tagline: "For full-time contractors who want more." },
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
        <span className="text-sm text-zinc-400">Handyman</span>
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

type CheckoutFormProps = {
  bookingID: string;
  planName: string;
  billing: Billing;
  displayAmount: string;
  currency?: string; // optional display-only
};

// ✅ Checkout with spinner → success → (View Receipt) → loading → receipt (all in one popup)
function CheckoutForm({
  bookingID,
  planName,
  billing,
  displayAmount,
  currency = "CAD",
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // modal state
  const [showModal, setShowModal] = useState(false);
  type ModalView = "success" | "loadingReceipt" | "receipt";
  const [view, setView] = useState<ModalView>("success");

  const [paidAt, setPaidAt] = useState<string | null>(null);

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
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      setPaidAt(new Date().toLocaleString());
      setView("success");
      setShowModal(true);
      return;
    }

    if (paymentIntent?.status === "processing") {
      setMessage("Your payment is processing. You’ll get an update shortly.");
    } else if (paymentIntent?.status === "requires_action") {
      setMessage("Additional authentication required. Please try again.");
    } else if (paymentIntent) {
      setMessage(`Payment status: ${paymentIntent.status}`);
    } else {
      setMessage("Something unexpected happened.");
    }
  };

  const openReceipt = () => {
    setView("loadingReceipt");
    // Simulate a short load; replace with a real fetch if you later generate a receipt server-side
    setTimeout(() => setView("receipt"), 900);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="space-y-4">
        <PaymentElement />
        <button
          onClick={handlePay}
          disabled={submitting || !stripe || !elements}
          className="w-full rounded-xl bg-yellow-400 text-zinc-900 font-medium py-3 hover:bg-yellow-500 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {submitting && (
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
              <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
          )}
          {submitting ? "Processing…" : "Subscribe"}
        </button>

        {message && (
          <p className="text-sm text-center text-zinc-300">{message}</p>
        )}

        <p className="text-[11px] text-center text-zinc-500">
          By confirming your subscription, you allow Handyman to charge your card according to our Terms.
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" onClick={closeModal} />
          {/* Dialog */}
          <div className="relative z-10 w-[min(92vw,30rem)] rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            {view === "success" && (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/15">
                  <svg className="h-6 w-6 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-zinc-100">Payment successful 🎉</h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Your subscription is now active{paidAt ? ` • ${paidAt}` : ""}.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 py-2.5 text-zinc-200 hover:bg-zinc-700"
                  >
                    Close
                  </button>
                  <button
                    onClick={openReceipt}
                    className="flex-1 rounded-xl bg-yellow-400 py-2.5 text-zinc-900 font-medium hover:bg-yellow-500"
                  >
                    View Receipt
                  </button>
                </div>
              </div>
            )}

            {view === "loadingReceipt" && (
              <div className="flex flex-col items-center justify-center py-10">
                <svg className="h-8 w-8 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
                <p className="mt-3 text-sm text-zinc-300">Generating receipt…</p>
              </div>
            )}

            {view === "receipt" && (
              <div>
                <h3 className="text-lg font-semibold text-zinc-100 text-center">Receipt</h3>
                <p className="text-xs text-zinc-500 text-center mt-1">Thank you for your purchase.</p>

                <div className="mt-5 grid grid-cols-1 gap-3 text-sm">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-400">Booking ID</span>
                    <span className="text-zinc-100">{bookingID}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Plan</span>
                    <span className="text-zinc-100">{planName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Billing</span>
                    <span className="text-zinc-100">
                      {billing === "yearly" ? "Yearly" : "Monthly"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Amount Paid</span>
                    <span className="text-zinc-100">
                      ${displayAmount} {currency}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Date</span>
                    <span className="text-zinc-100">
                      {paidAt ?? new Date().toLocaleString()}
                    </span>
                  </div>
                  {/* Add more fields later if you store them server-side:
                      - Payment method brand/last4
                      - Tax, subtotal
                      - Invoice number / Stripe receipt URL
                  */}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 rounded-xl bg-yellow-400 py-2.5 text-zinc-900 font-medium hover:bg-yellow-500"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
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

  // Keep the bookingID we send to backend, so we can show it on the receipt
  const [bookingID, setBookingID] = useState<string>(() => `B-${Date.now()}`);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadErr, setLoadErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoadErr(null);
      setClientSecret(null);
      try {
        // generate a new booking id whenever plan/billing changes so it matches the intent
        const newId = `B-${Date.now()}`;
        setBookingID(newId);

        const amountCents =
          (billing === "monthly" ? plan.monthly : plan.yearly) * 100;

        const res = await fetch(`${API_URL}/api/payments/create-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingID: newId,
            amount: amountCents, // cents expected by your backend (per your earlier service)
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
            <p className="text-sm text-zinc-300">Handyman</p>
          </div>
        </div>
      </header>

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

          {/* Right: Checkout */}
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
                <CheckoutForm
                  bookingID={bookingID}
                  planName={plan.name}
                  billing={billing}
                  displayAmount={displayAmount}
                  currency="CAD"
                />
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
