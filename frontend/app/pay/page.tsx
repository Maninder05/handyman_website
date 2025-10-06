// frontend/app/pay/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

// ----------------- Config -----------------
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";

// PayPal (client env)
const PAYPAL_ENV = (process.env.NEXT_PUBLIC_PAYPAL_ENV || "sandbox").toLowerCase();
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
const PAYPAL_CURRENCY = process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || "CAD";

// Map your PayPal plan IDs from .env.local
const PAYPAL_PLANS: Record<string, { monthly?: string; yearly?: string }> = {
  Basic: {
    monthly: process.env.NEXT_PUBLIC_PAYPAL_PLAN_BASIC_MONTHLY,
    yearly: process.env.NEXT_PUBLIC_PAYPAL_PLAN_BASIC_YEARLY,
  },
  Seasonal: {
    monthly: process.env.NEXT_PUBLIC_PAYPAL_PLAN_SEASONAL_MONTHLY,
    yearly: process.env.NEXT_PUBLIC_PAYPAL_PLAN_SEASONAL_YEARLY,
  },
  Pro: {
    monthly: process.env.NEXT_PUBLIC_PAYPAL_PLAN_PRO_MONTHLY,
    yearly: process.env.NEXT_PUBLIC_PAYPAL_PLAN_PRO_YEARLY,
  },
};

// Display-only; server verifies/records the real amount
const PLANS = [
  { name: "Basic",    monthly: 10, yearly: 96,  tagline: "Great for individuals starting out." },
  { name: "Seasonal", monthly: 12, yearly: 108, tagline: "For weekend warriors & seasonal pros." },
  { name: "Pro",      monthly: 15, yearly: 144, tagline: "For full-time contractors who want more." },
] as const;

type Billing = "monthly" | "yearly";

// ----------------- UI Bits -----------------
function Summary({
  planName, billing, displayAmount, tagline,
}: { planName: string; billing: Billing; displayAmount: string; tagline?: string }) {
  return (
    <aside className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-8 text-zinc-100">
      <div className="flex items-center gap-2 mb-6">
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

// load external script (PayPal SDK)
function useScript(src: string) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => setLoaded(true);
    s.onerror = () => setLoaded(false);
    document.body.appendChild(s);
    return () => {
      try { document.body.removeChild(s); } catch {}
    };
  }, [src]);
  return loaded;
}

declare global {
  interface Window { paypal: any }
}

// ----------------- Page -----------------
export default function PayPage() {
  const search = useSearchParams();

  const planName = (search.get("plan") || "Basic").trim();
  const billing = ((search.get("billing") as Billing) || "monthly");
  const success = search.get("success") === "1";
  const sessionId = search.get("session_id");

  const plan = useMemo(
    () => PLANS.find((p) => p.name.toLowerCase() === planName.toLowerCase()) ?? PLANS[0],
    [planName]
  );
  const displayAmount = (billing === "monthly" ? plan.monthly : plan.yearly).toFixed(2);

  const [bookingId] = useState<string>(() => `B-${Date.now()}`);
  const [creating, setCreating] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  // -------- STRIPE (Hosted Checkout redirect) --------
  const handleSubscribe = async () => {
    try {
      setCreating(true);
      setErr(null);
      setInfo(null);
      setSaveMsg(null);

      const res = await fetch(`${API_URL}/api/subscriptions/checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planName: plan.name, billing, bookingId }),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(`Server ${res.status}: ${text.slice(0, 300)}`);

      const data = JSON.parse(text);
      if (!data?.url) throw new Error("No Checkout URL from API");
      window.location.href = data.url;
    } catch (e: any) {
      setErr(e?.message || "Failed to start checkout");
    } finally {
      setCreating(false);
    }
  };

  // Auto-confirm after Stripe redirect back
  useEffect(() => {
    (async () => {
      if (!success || !sessionId) return;
      try {
        setConfirming(true);
        setSaveMsg("Finalizing your subscription…");
        const res = await fetch(`${API_URL}/api/subscriptions/confirm`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Confirm failed");
        setSaveMsg("Subscription saved in your account ✅");
      } catch (e: any) {
        setSaveMsg(`Couldn’t save subscription: ${e.message}`);
      } finally {
        setConfirming(false);
      }
    })();
  }, [success, sessionId]);

  const manualConfirm = async () => {
    if (!sessionId) return;
    try {
      setConfirming(true);
      setSaveMsg("Finalizing your subscription…");
      const res = await fetch(`${API_URL}/api/subscriptions/confirm?session_id=${encodeURIComponent(sessionId)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Confirm failed");
      setSaveMsg("Subscription saved in your account ✅");
    } catch (e: any) {
      setSaveMsg(`Couldn’t save subscription: ${e.message}`);
    } finally {
      setConfirming(false);
    }
  };

  // -------- PAYPAL (Subscriptions) --------
  const planId = PAYPAL_PLANS[plan.name]?.[billing];
  const paypalContainerRef = useRef<HTMLDivElement>(null);

  // Disable extra funding methods (card/venmo) to avoid SDK errors for subs
  const sdkUrl = `${
    PAYPAL_ENV === "live" ? "https://www.paypal.com" : "https://www.sandbox.paypal.com"
  }/sdk/js?client-id=${encodeURIComponent(PAYPAL_CLIENT_ID)}&vault=true&intent=subscription&currency=${encodeURIComponent(
    PAYPAL_CURRENCY
  )}&disable-funding=card,venmo`;

  const paypalLoaded = useScript(sdkUrl);

  useEffect(() => {
    if (!paypalLoaded || !window.paypal || !planId || !paypalContainerRef.current) return;

    // clear previous renders (if plan/billing changes)
    paypalContainerRef.current.innerHTML = "";

    window.paypal.Buttons({
      style: { shape: "pill", tagline: false },
      createSubscription: (_data: any, actions: any) => {
        return actions.subscription.create({
          plan_id: planId,
          custom_id: bookingId,
          application_context: { brand_name: "Handyman" },
        });
      },
      onApprove: async (data: any) => {
        try {
          setErr(null);
          setInfo("Finalizing your PayPal subscription…");
          setSaveMsg(null);

          const res = await fetch(`${API_URL}/api/paypal/confirm-subscription`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              subscriptionId: data.subscriptionID,
              planName: plan.name,
              billing,
              bookingId,
            }),
          });

          const text = await res.text();
          let result: any = {};
          try { result = JSON.parse(text); } catch {}
          if (!res.ok) throw new Error(result?.error || text || `Server ${res.status}`);

          setInfo("PayPal subscription saved ✅");
        } catch (e: any) {
          setErr(e?.message || "Couldn’t save PayPal subscription");
        }
      },
      onCancel: () => {
        setInfo("PayPal checkout cancelled");
      },
      onError: (error: any) => {
        setErr(error?.message || error?.toString?.() || "PayPal checkout error");
      },
    }).render(paypalContainerRef.current);
  }, [paypalLoaded, planId, plan.name, billing, bookingId]);

  // ----------------- Render -----------------
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
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
          <div className="lg:sticky lg:top-24 self-start">
            <Summary
              planName={plan.name}
              billing={billing}
              displayAmount={displayAmount}
              tagline={plan.tagline}
            />
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-4">Choose a payment method</h2>

            {/* Messages */}
            {err && <p className="mb-3 text-sm text-red-400">{err}</p>}
            {info && <p className="mb-3 text-sm text-zinc-300">{info}</p>}
            {saveMsg && <p className="mb-3 text-sm text-zinc-300">{saveMsg}</p>}

            {/* Stripe */}
            <button
              onClick={handleSubscribe}
              disabled={creating}
              className="w-full rounded-xl bg-yellow-400 text-zinc-900 font-medium py-3 hover:bg-yellow-500 disabled:opacity-60"
            >
              {creating ? "Redirecting…" : "Pay with Card (Stripe)"}
            </button>

            <div className="my-4 flex items-center gap-3 text-xs text-zinc-500">
              <div className="h-px flex-1 bg-zinc-800" />
              or
              <div className="h-px flex-1 bg-zinc-800" />
            </div>

            {/* PayPal */}
            {!planId && (
              <p className="text-sm text-red-400">
                Missing PayPal plan id for {plan.name} / {billing}. Set it in .env.local.
              </p>
            )}
            <div ref={paypalContainerRef} />

            {/* Manual confirm (Stripe) */}
            {success && sessionId && (
              <button
                onClick={manualConfirm}
                disabled={confirming}
                className="mt-4 w-full rounded-xl border border-zinc-700 bg-zinc-800 py-2.5 text-zinc-200 hover:bg-zinc-700"
              >
                {confirming ? "Confirming…" : "Finalize (if not saved yet)"}
              </button>
            )}

            <p className="text-[11px] text-center text-zinc-500 mt-3">
              You’ll be redirected or shown a secure window to complete your subscription.
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-zinc-500">
          Need help? Contact support@handyman.example
        </p>
      </section>
    </main>
  );
}
