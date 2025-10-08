"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";

export default function ClientPayPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId"); // /clientPay?bookingId=BK1001

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) {
      setError("No booking ID provided.");
      setLoading(false);
      return;
    }
    const createIntent = async () => {
      try {
        const res = await fetch(`${API_URL}/api/client-pay/create-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingID: bookingId }),
        });
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || `HTTP ${res.status}`);
        }
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err: any) {
        setError("Failed to start payment. " + (err?.message || "Unknown error"));
      } finally {
        setLoading(false);
      }
    };
    createIntent();
  }, [bookingId]);

  if (loading) return <p className="text-center mt-10">Loading payment...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (!clientSecret) return <p className="text-center mt-10">No payment available.</p>;

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md border rounded-2xl p-6 shadow-sm bg-white">
        <h1 className="text-2xl font-semibold mb-4">Pay for Booking #{bookingId}</h1>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      </div>
    </main>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    setSubmitting(true);
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message || "Payment failed. Try again.");
    } else {
      setMessage("Payment successful! We'll confirm once processed.");
    }
    setSubmitting(false);
  };

  return (
    <div>
      <PaymentElement />
      <button
        onClick={handleSubmit}
        disabled={!stripe || !elements || submitting}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? "Processing..." : "Pay Now"}
      </button>
      {message && <p className="mt-3 text-sm text-gray-700 text-center">{message}</p>}
    </div>
  );
}
