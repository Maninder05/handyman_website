"use client";

import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const [active, setActive] = useState<
    "Overview" | "Membership" | "Security" | "Devices" | "Profiles"
  >("Overview");

  const navItems: Array<typeof active> = [
    "Overview",
    "Membership",
    "Security",
    "Devices",
    "Profiles",
  ];

  const BrandBtn = ({
    children,
    as: As = "button",
    href,
    className = "",
    ...props
  }: any) => {
    const base =
      "inline-flex items-center justify-center rounded-lg border text-sm px-3 py-2 " +
      "border-[#59b6bd] text-[#0b4e54] hover:bg-[#59b6bd]/10 transition-colors " +
      "focus:outline-none focus:ring-2 focus:ring-[#59b6bd]/40";
    if (As === Link) return <Link href={href!} className={`${base} ${className}`} {...props}>{children}</Link>;
    return <button className={`${base} ${className}`} {...props}>{children}</button>;
  };

  const Card = ({ children, className = "", padded = true }: any) => (
    <section className={`rounded-xl border bg-white/90 ${padded ? "p-6" : ""} ${className} border-[#59b6bd]/25 shadow-sm`}>{children}</section>
  );

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* HEADER */}
      <header className="w-full sticky top-0 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-[#59b6bd]/25">
        <div className="mx-auto max-w-[1100px] px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight text-[#0b4e54]">Settings</div>
          <nav className="flex items-center gap-2 sm:gap-3">
            <button
              className="px-3 py-2 rounded-full hover:bg-[#59b6bd]/10 text-sm text-[#0b4e54] border border-transparent hover:border-[#59b6bd]/30 focus:outline-none focus:ring-2 focus:ring-[#59b6bd]/40 transition"
              type="button"
            >
              Dark Mode
            </button>
          </nav>
        </div>
      </header>

      {/* BODY */}
      <div className="mx-auto max-w-[1100px] px-6 py-8">
        <div className="grid grid-cols-[240px_1fr] gap-10">
          {/* SIDEBAR */}
          <aside className="pr-8">
            <nav aria-label="Account settings" className="space-y-1">
              {navItems.map((item) => {
                const isActive = active === item;
                return (
                  <button
                    key={item}
                    onClick={() => setActive(item)}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "group relative block w-full text-left rounded-md px-3 py-2 transition",
                      "focus:outline-none focus:ring-2 focus:ring-[#59b6bd]/30",
                      isActive
                        ? "bg-[#59b6bd]/10 text-[#0b4e54] font-semibold"
                        : "text-neutral-700 hover:bg-[#59b6bd]/10 hover:text-[#0b4e54]"
                    ].join(" ")}
                  >
                    {/* active left bar */}
                    <span
                      className={[
                        "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r",
                        isActive ? "bg-[#59b6bd]" : "bg-transparent group-hover:bg-[#59b6bd]/70"
                      ].join(" ")}
                    />
                    {item}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* MAIN */}
          <main className="min-w-0">
            <h1 className="text-3xl font-bold mb-6 text-[#0b4e54]">{active}</h1>

            {active === "Overview" && (
              <div className="space-y-6 animate-[fadeIn_.2s_ease]">
                <Card>
                  <h2 className="text-lg font-semibold mb-2 text-[#0b4e54]">Membership</h2>
                  <p className="text-sm text-neutral-600">
                    No membership plan is currently set.
                  </p>
                  <BrandBtn as={Link} href="/membership" className="mt-4">Choose a Plan</BrandBtn>
                </Card>

                <Card padded={false}>
                  <h2 className="text-lg font-semibold px-5 py-3 text-[#0b4e54]">Quick Links</h2>
                  <div className="divide-y divide-[#59b6bd]/20">
                    {[
                      { text: "Change plan", target: "Membership" },
                      { text: "Manage payment method", target: "Membership" },
                      { text: "Manage access and devices", target: "Devices" },
                      { text: "Update password", target: "Security" },
                      { text: "Update profile", target: "Profiles" },
                      { text: "Edit settings", target: "Overview" },
                    ].map(({ text, target }) => (
                      <button
                        key={text}
                        onClick={() => setActive(target as typeof active)}
                        className="w-full text-left px-5 py-4 hover:bg-[#59b6bd]/10 focus:bg-[#59b6bd]/10 focus:outline-none focus:ring-2 focus:ring-[#59b6bd]/30 transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-[#0b4e54]">{text}</span>
                          <span aria-hidden="true" className="text-[#59b6bd] text-xl">›</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {active === "Membership" && (
              <section className="max-w-xl space-y-4 animate-[fadeIn_.2s_ease]">
                <Card>
                  <h2 className="text-lg font-semibold mb-2 text-[#0b4e54]">Membership</h2>
                  <p className="text-sm text-neutral-600">No active membership plan.</p>
                  <BrandBtn as={Link} href="/membership" className="mt-4">Choose a Plan</BrandBtn>
                </Card>
              </section>
            )}

            {active === "Security" && (
              <section className="max-w-xl space-y-4 animate-[fadeIn_.2s_ease]">
                <Card>
                  <h2 className="text-lg font-semibold mb-2 text-[#0b4e54]">Password</h2>
                  <p className="text-sm text-neutral-600 mb-4">Last changed 3 months ago</p>
                  <BrandBtn>Change Password</BrandBtn>
                </Card>
                <Card>
                  <h2 className="text-lg font-semibold mb-2 text-[#0b4e54]">Two-Step Verification</h2>
                  <p className="text-sm text-neutral-700">Auth app enabled</p>
                  <div className="mt-3 flex gap-2">
                    <BrandBtn>Manage 2FA</BrandBtn>
                    <BrandBtn>Backup Codes</BrandBtn>
                  </div>
                </Card>
              </section>
            )}

            {active === "Devices" && (
              <div className="space-y-6 max-w-xl animate-[fadeIn_.2s_ease]">
                {[
                  {
                    title: "Access and devices",
                    desc: "Manage signed-in devices",
                  },
                  {
                    title: "Mobile download devices",
                    desc: "Using 0 of 2 download devices",
                  },
                ].map(({ title, desc }) => (
                  <a
                    key={title}
                    className="block rounded-xl border border-[#59b6bd]/25 p-5 hover:bg-[#59b6bd]/10 focus:bg-[#59b6bd]/10 focus:outline-none focus:ring-2 focus:ring-[#59b6bd]/30 transition shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[#0b4e54]">{title}</p>
                        <p className="text-sm text-neutral-600">{desc}</p>
                      </div>
                      <span aria-hidden="true" className="text-[#59b6bd] text-xl">›</span>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {active === "Profiles" && (
              <section className="max-w-xl space-y-4 animate-[fadeIn_.2s_ease]">
                <Card>
                  <h2 className="text-lg font-semibold mb-2 text-[#0b4e54]">Profiles</h2>
                  <p className="text-sm text-neutral-700">
                    Manage who can access and personalize content.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <BrandBtn>Add Profile</BrandBtn>
                    <BrandBtn>Edit Profiles</BrandBtn>
                  </div>
                </Card>
              </section>
            )}
          </main>
        </div>
      </div>

      {/* keep if you're using animate-[fadeIn_.2s_ease] */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
