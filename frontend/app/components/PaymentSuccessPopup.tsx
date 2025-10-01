// components/PaymentSuccessPopup.tsx
"use client";

import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  amount?: number | string;     // e.g. "15.00" or 15
  planName?: string;            // e.g. "Pro"
  billing?: "monthly" | "yearly";
  onClose: () => void;
  onViewReceipt?: () => void;   // optional handler
};

export default function PaymentSuccessPopup({
  open,
  amount,
  planName,
  billing,
  onClose,
  onViewReceipt,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const amountStr =
    typeof amount === "number" ? amount.toFixed(2) : amount ?? undefined;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pay-success-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative z-[101] w-[92%] max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl animate-in fade-in zoom-in-95"
      >
        {/* Animated ring + check */}
        <div className="mx-auto mb-4 grid place-items-center">
          <div className="relative h-16 w-16">
            {/* spinning subtle ring */}
            <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin-slow" />
            {/* check path */}
            <svg
              viewBox="0 0 52 52"
              className="relative z-10 h-16 w-16"
              aria-hidden="true"
            >
              <circle
                cx="26"
                cy="26"
                r="25"
                fill="none"
                className="stroke-[4] stroke-emerald-500/40"
              />
              <path
                d="M14 27 l8 8 l16 -16"
                fill="none"
                className="stroke-[4] stroke-emerald-400"
                style={{
                  strokeDasharray: 60,
                  strokeDashoffset: 60,
                  animation: "dash 600ms ease-out forwards",
                  animationDelay: "120ms",
                }}
              />
            </svg>
          </div>
        </div>

        <h3
          id="pay-success-title"
          className="text-center text-lg font-semibold text-zinc-100"
        >
          Payment successful
        </h3>
        <p className="mt-1 text-center text-sm text-zinc-400">
          {planName ? (
            <>
              You’re subscribed to <span className="text-zinc-200">{planName}</span>{" "}
              {billing ? <span>({billing})</span> : null}.
            </>
          ) : (
            "Your subscription is now active."
          )}
        </p>

        {amountStr && (
          <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-center">
            <p className="text-xs text-zinc-400">Amount charged</p>
            <p className="mt-0.5 text-xl font-bold text-zinc-100">${amountStr}</p>
          </div>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="rounded-xl bg-yellow-400 py-2.5 font-medium text-zinc-900 hover:bg-yellow-500"
          >
            Continue
          </button>
          <button
            onClick={onViewReceipt ?? onClose}
            className="rounded-xl bg-zinc-800 py-2.5 font-medium text-zinc-100 hover:bg-zinc-700"
          >
            View receipt
          </button>
        </div>

        {/* Close (X) */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              d="M6 6l12 12M18 6L6 18"
              className="stroke-current"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* local keyframes (checkmark) + slow spin */}
        <style jsx>{`
          @keyframes dash {
            to {
              stroke-dashoffset: 0;
            }
          }
          .animate-spin-slow {
            animation: spin 2.6s linear infinite;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

