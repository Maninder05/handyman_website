"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MyServicesPage() {
  // ✅ Define the service type
  interface Service {
    _id: string;
    title: string;
    category: string;
    priceType: string;
    price: number;
    image?: string;
    createdAt?: string;
    updatedAt?: string;
  }

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // ✅ For hydration fix

  // ✅ Prevent hydration mismatch (only render once on client)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ Fetch all services from backend
  useEffect(() => {
    if (!isClient) return; // run only on client

    const fetchServices = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/services`
        );
        if (!res.ok) throw new Error("Failed to fetch services");

        const data = await res.json();
        setServices(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error fetching services:", err.message);
        } else {
          console.error("Unknown error fetching services:", err);
        }
        setError("Failed to load services ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [isClient]);

  // ✅ Render nothing until on client to avoid hydration issues
  if (!isClient) return null;

  return (
    <main className="bg-[#F4F4F4] min-h-screen text-[#1C1C1C] flex flex-col">
      {/* ================= HEADER ================= */}
      <section className="bg-[#1C1C1C] pb-8 text-center shadow-md border-b-4 border-[#C8102E]">
        <h1 className="text-2xl md:text-3xl font-bold text-white pt-6 mb-4">
          My Services
        </h1>
        <div className="flex justify-center gap-4">
          {[
            { name: "About Me", href: "/handyAccount" },
            { name: "Services", href: "/handyServices" },
            { name: "Portfolio", href: "/handyDashboard" },
            { name: "Reviews", href: "/handyReviews" },
          ].map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                tab.name === "Services"
                  ? "bg-[#C8102E] text-white"
                  : "bg-[#C5A96A] text-[#1C1C1C] hover:bg-[#B99655] hover:text-[#1C1C1C] transition"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="px-4 py-10 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-[#C8102E]">
          Handyman Services Offered
        </h2>

        {/* Loading and error handling */}
        {loading ? (
          <p className="text-center text-[#C5A96A] text-lg font-semibold">
            Loading services...
          </p>
        ) : error ? (
          <p className="text-center text-[#C8102E] text-lg font-semibold">
            {error}
          </p>
        ) : services.length === 0 ? (
          <p className="text-center text-[#1C1C1C] text-lg font-semibold">
            No services added yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl hover:scale-105 hover:bg-[#C5A96A]/20 transition-transform duration-300"
              >
                <div className="relative w-full h-40">
                  <Image
                    src={
                      service.image
                        ? `${process.env.NEXT_PUBLIC_API_URL}${service.image}`
                        : "/images/default-service.jpg"
                    }
                    alt={service.title}
                    fill
                    className="object-cover"
                    unoptimized // ✅ helps with localhost images during dev
                  />
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-[#C8102E]">
                    {service.title}
                  </h3>
                  <p className="text-[#555]">{service.category}</p>
                  <p className="text-[#C5A96A] font-semibold">
                    {service.priceType}
                  </p>
                  <p className="text-[#1C1C1C] font-semibold">
                    ${service.price} CAD
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
