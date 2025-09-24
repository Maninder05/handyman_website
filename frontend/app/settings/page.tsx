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
      "border-yellow-400 text-yellow-400 hover:bg-yellow-400/20 transition-colors " +
      "focus:outline-none focus:ring-2 focus:ring-yellow-500/40";
    if (As === Link)
      return (
        <Link
          href={href!}
          className={`${base} ${className}`}
          {...props}
        >
          {children}
        </Link>
      );
    return (
      <button className={`${base} ${className}`} {...props}>
        {children}
      </button>
    );
  };

  const Card = ({ children, className = "", padded = true }: any) => (
    <section
      className={`rounded-xl border bg-gray-800/90 ${
        padded ? "p-6" : ""
      } ${className} border-yellow-400/30 shadow-sm`}
    >
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* HEADER */}
      <header className="w-full sticky top-0 bg-gradient-to-r from-[#FFCC66] to-[#FF7E5F] shadow-md">
        <div className="mx-auto max-w-[1100px] px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight text-gray-900">
            Settings
          </div>
          <nav className="flex items-center gap-2 sm:gap-3">
            <button
              className="px-3 py-2 rounded-full hover:bg-yellow-400/20 text-sm text-gray-900 border border-transparent hover:border-yellow-400/40 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 transition bg-yellow-400"
              type="button"
            >
              Dark Mode
            </button>
          </nav>
        </div>
      </header>

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
                      "focus:outline-none focus:ring-2 focus:ring-yellow-400/40",
                      isActive
                        ? "bg-yellow-400/20 text-yellow-400 font-semibold"
                        : "text-gray-300 hover:bg-yellow-400/10 hover:text-yellow-300",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r",
                        isActive
                          ? "bg-yellow-400"
                          : "bg-transparent group-hover:bg-yellow-300/70",
                      ].join(" ")}
                    />
                    {item}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* MAIN CONTENT */}
          <main className="min-w-0">
            <h1 className="text-3xl font-bold mb-6 text-yellow-400">{active}</h1>

            {active === "Overview" && (
              <div className="space-y-6 animate-[fadeIn_.2s_ease]">
                <Card>
                  <h2 className="text-lg font-semibold mb-2 text-yellow-400">
                    Membership
                  </h2>
                  <p className="text-sm text-gray-300">
                    No membership plan is currently set.
                  </p>
                  <BrandBtn as={Link} href="/membership" className="mt-4">
                    Choose a Plan
                  </BrandBtn>
                </Card>

                <Card padded={false}>
                  <h2 className="text-lg font-semibold px-5 py-3 text-yellow-400">
                    Quick Links
                  </h2>
                  <div className="divide-y divide-yellow-400/20">
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
                        className="w-full text-left px-5 py-4 hover:bg-yellow-400/10 focus:bg-yellow-400/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-yellow-300">
                            {text}
                          </span>
                          <span
                            aria-hidden="true"
                            className="text-yellow-400 text-xl"
                          >
                            ›
                          </span>
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
                  <h2 className="text-lg font-semibold mb-2 text-yellow-400">
                    Membership
                  </h2>
                  <p className="text-sm text-gray-300">
                    No active membership plan.
                  </p>
                  <BrandBtn as={Link} href="/membership" className="mt-4">
                    Choose a Plan
                  </BrandBtn>
                </Card>
              </section>
            )}

            {active === "Security" && (
              <section className="max-w-xl space-y-4 animate-[fadeIn_.2s_ease]">
                <Card>
                  <h2 className="text-lg font-semibold mb-2 text-yellow-400">
                    Password
                  </h2>
                  <p className="text-sm text-gray-300 mb-4">
                    Last changed 3 months ago
                  </p>
                  <BrandBtn>Change Password</BrandBtn>
                </Card>
                <Card>
                  <h2 className="text-lg font-semibold mb-2 text-yellow-400">
                    Two-Step Verification
                  </h2>
                  <p className="text-sm text-gray-300">Auth app enabled</p>
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
                    className="block rounded-xl border border-yellow-400/30 p-5 hover:bg-yellow-400/10 focus:bg-yellow-400/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 transition shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-yellow-400">{title}</p>
                        <p className="text-sm text-gray-300">{desc}</p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="text-yellow-400 text-xl"
                      >
                        ›
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {active === "Profiles" && (
              <section className="max-w-xl space-y-4 animate-[fadeIn_.2s_ease]">
                <Card>
                  <h2 className="text-lg font-semibold mb-2 text-yellow-400">
                    Profiles
                  </h2>
                  <p className="text-sm text-gray-300">
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

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
