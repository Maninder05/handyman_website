"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

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
      // use redirect only if 3DS required; otherwise stay on page
      redirect: "if_required",
      // (optional) return_url: `${window.location.origin}/pay/success`
    });

    setSubmitting(false);
    if (error) {
      setMessage(error.message || "Payment failed");
    } else {
      setMessage(`Payment status: ${paymentIntent?.status}`);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto", display: "grid", gap: 12 }}>
      <PaymentElement />
      <button
        onClick={handlePay}
        disabled={submitting || !stripe || !elements}
        style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #222" }}
      >
        {submitting ? "Processing…" : "Pay now"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default function PayPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // TODO: replace with real bookingId and amount from your page/state
    fetch("http://localhost:7000/api/payments/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingID: "B-1001", amount: 49.99 }),
    })
      .then((r) => r.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((e) => console.error(e));
  }, []);

  if (!clientSecret) return <p style={{ textAlign: "center", marginTop: 40 }}>Loading…</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}
