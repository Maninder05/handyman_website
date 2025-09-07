"use client";

type Plan = {
  name: string;
  price: string;
  note: string;
  badge?: string;
  cta: string;
};

const plans: Plan[] = [
  { name: "Basic",    price: "$10/month", note: "For individuals starting out.",     cta: "SUBSCRIBE" },
  { name: "Seasonal", price: "$10/month", note: "For professionals needing more.",   badge: "POPULAR", cta: "SUBSCRIBE" },
  { name: "Pro",      price: "$15/month", note: "For large organizations.",          cta: "SUBSCRIBE" },
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-8 text-4xl font-extrabold">
          Choose a plan to kick start your needs.
        </h1>

        {/* Ensure all cards stretch to same height */}
        <section className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-full flex-col">
                {/* Reserve space for a badge so title lines up across cards */}
                <div className="mb-3 h-6">
                  {p.badge && (
                    <span className="inline-block rounded-md bg-red-700 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                      {p.badge}
                    </span>
                  )}
                </div>

                <h2 className="text-3xl font-extrabold">{p.name}</h2>

                {/* Reserve consistent space for price + note so the divider aligns */}
                <div className="mt-4 min-h-[72px]">
                  <div className="text-2xl font-extrabold tabular-nums">{p.price}</div>
                  <div className="text-sm text-gray-600">{p.note}</div>
                </div>

                <hr className="mt-4 border-gray-200" />

                {/* Push button to the bottom so all buttons align */}
                <div className="mt-auto pt-6">
                  <button
                    className="w-full rounded-full bg-red-700 px-6 py-3 text-base font-semibold text-white transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    // onClick={() => alert(`Subscribe: ${p.name}`)}
                  >
                    {p.cta}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
