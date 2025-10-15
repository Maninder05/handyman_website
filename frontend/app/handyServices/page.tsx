"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MyServicesPage() {
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
  const [isClient, setIsClient] = useState(false);

  // Popup state
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  // Form fields for editing
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priceType: "",
    price: "",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const fetchServices = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/services`
        );
        if (!res.ok) throw new Error("Failed to fetch services");

        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [isClient]);

  if (!isClient) return null;

  // =================== UPDATE LOGIC ===================
  const handleEditClick = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      category: service.category,
      priceType: service.priceType,
      price: service.price.toString(),
    });
    setShowPopup(true);
  };

  const handleUpdateService = async () => {
    if (!editingService) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/services/${editingService._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update service");

      const updated = await res.json();

      // Update frontend list immediately
      setServices((prev) =>
        prev.map((s) => (s._id === updated._id ? updated : s))
      );

      setShowPopup(false);
      setEditingService(null);
    } catch (err) {
      console.error("Error updating service:", err);
      alert("Error updating service ❌");
    }
  };

  // =================== DELETE LOGIC ===================
  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete service");

      // Remove from frontend
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting service:", err);
      alert("Error deleting service ❌");
    }
  };

  // =================== UI ===================
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
                  : "bg-[#C5A96A] text-[#1C1C1C] hover:bg-[#B99655] transition"
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
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl hover:scale-105 transition-transform duration-300"
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
                    unoptimized
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

                  {/* Update + Delete Buttons */}
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleEditClick(service)}
                      className="bg-[#C5A96A] text-[#1C1C1C] px-3 py-1 rounded-lg hover:bg-[#b08c4a] transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="bg-[#C8102E] text-white px-3 py-1 rounded-lg hover:bg-[#a40f25] transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= POPUP FORM ================= */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-[#C8102E]">
              Edit Service
            </h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="border rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="border rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Price Type"
                value={formData.priceType}
                onChange={(e) =>
                  setFormData({ ...formData, priceType: e.target.value })
                }
                className="border rounded-lg p-2"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="border rounded-lg p-2"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-300 text-black px-3 py-1 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateService}
                  className="bg-[#C8102E] text-white px-3 py-1 rounded-lg hover:bg-[#a40f25] transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
