"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:7000";

type OfferShape = {
  _id?: string;
  clientId?: string;
  handymanId?: string;
  title?: string;
  note?: string;
  amountCents?: number;
  currency?: string;
  status?: string;
  bookingID?: string;
};

const money = (cents?: number, currency = "CAD") =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency }).format((cents || 0) / 100);

export default function AcceptPage() {
  const sp = useSearchParams();
  const id = sp.get("id") || "";

  const [offer, setOffer] = useState<OfferShape | null>(null);
  const [rawGet, setRawGet] = useState<any>(null);
  const [rawPost, setRawPost] = useState<any>(null);
  const [bookingID, setBookingID] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [showDebug, setShowDebug] = useState(false);

  function unwrap(data: any): OfferShape {
    // handle { offer: {...} } or {...}
    return (data && data.offer) ? data.offer : data || {};
  }

  async function load() {
    if (!id) return setErr("Missing ?id=OFFER_ID");
    try {
      const res = await fetch(`${API_BASE}/api/handy-jobs/${id}`, { cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setRawGet(data);
      const o = unwrap(data);
      setOffer(o);
      if (o?.bookingID) setBookingID(o.bookingID);
    } catch (e: any) {
      setErr(e.message);
    }
  }

  useEffect(() => { load(); }, [id]);

  async function accept() {
    try {
      setMsg("Accepting…");
      const res = await fetch(`${API_BASE}/api/handy-jobs/${id}/accept`, { method: "POST" });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setRawPost(data);
      setMsg("Accepted ✔");

      // booking id may be { bookingID } or nested somewhere else
      const possible =
        data?.bookingID ||
        data?.bookingId ||
        data?.booking?.id ||
        data?.booking?._id;
      if (possible) setBookingID(String(possible));

      await load();
    } catch (e: any) {
      setMsg(`Error: ${e.message}`);
    }
  }

  if (err) return <div style={{ color: "red" }}>{err}</div>;
  if (!offer) return <div>Loading…</div>;

  const currency = (offer.currency || "CAD").toUpperCase();

  return (
    <div>
      <h2>Offer: {offer.title || "(no title)"}</h2>
      {offer.note && <p>{offer.note}</p>}
      <p>Client: {offer.clientId || "(none)"} • Handyman: {offer.handymanId || "(none)"}</p>
      <p>Amount: <strong>{money(offer.amountCents, currency)}</strong></p>
      <p>Status: {offer.status ?? "pending"}</p>

      <button onClick={accept}>Accept</button>
      {msg && <p>{msg}</p>}

      {bookingID && (
        <div style={{ marginTop: 10 }}>
          <p>Booking ID: <code>{bookingID}</code></p>
          <a href={`/clientPay?bookingId=${encodeURIComponent(bookingID)}`}>Payment Link →</a>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <button onClick={() => setShowDebug(d => !d)}>
          {showDebug ? "Hide debug" : "Show debug"}
        </button>
        {showDebug && (
          <div style={{ marginTop: 10 }}>
            <div><strong>GET /handy-jobs/:id raw</strong></div>
            <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(rawGet, null, 2)}</pre>
            <div><strong>POST /accept raw</strong></div>
            <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(rawPost, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
