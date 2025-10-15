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
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priceType: "",
    price: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`);
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
  }, []);

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

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to delete service");

      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting service:", err);
      alert("Error deleting service ❌");
    }
  };

  return (
    <main className="bg-[#F4F4F4] min-h-screen text-[#1C1C1C] flex flex-col">
      {/* HEADER */}
      <section className="bg-[#1C1C1C] pb-8 text-center shadow-md border-b-4 border-[#C8102E]">
        <h1 className="text-3xl md:text-4xl font-bold text-white pt-6 mb-4">
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

      {/* SERVICES GRID */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-[#C8102E] text-center">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service) => (
              <div
                key={service._id}
                className="relative bg-gradient-to-br from-[#f9fafb] via-white to-[#f0f0f0] rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:-translate-y-3 transition-all duration-500 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-tr from-[#C8102E]/10 via-transparent to-[#C5A96A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

                {/* Image */}
                <div className="relative w-full h-56">
                  <Image
                    src={
                      service.image
                        ? `${process.env.NEXT_PUBLIC_API_URL}${service.image}`
                        : "/images/default-service.jpg"
                    }
                    alt={service.title}
                    fill
                    className="object-cover rounded-t-3xl"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative p-6 z-10">
                  <h3 className="text-xl font-bold text-[#C8102E] mb-1">
                    {service.title}
                  </h3>
                  <p className="text-[#555] text-sm mb-2 italic">
                    {service.category}
                  </p>

                  <div className="flex justify-between items-center mt-2 mb-4">
                    <p className="text-[#C5A96A] font-semibold">
                      {service.priceType}
                    </p>
                    <p className="text-[#1C1C1C] font-semibold text-lg">
                      ${service.price} CAD
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleEditClick(service)}
                      className="flex-1 bg-gradient-to-r from-[#f6d365] to-[#fda085] text-[#1C1C1C] py-2 rounded-xl font-semibold hover:scale-[1.03] hover:shadow-md transition-all"
                    >
                      ✏️ Update
                    </button>
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="flex-1 bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white py-2 rounded-xl font-semibold hover:scale-[1.03] hover:shadow-md transition-all"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* POPUP FORM */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 relative">
            <h2 className="text-2xl font-bold mb-5 text-[#C8102E] text-center">
              Edit Service
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="border border-gray-300 rounded-lg p-2 focus:border-[#C8102E] outline-none"
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="border border-gray-300 rounded-lg p-2 focus:border-[#C8102E] outline-none"
              />
              <input
                type="text"
                placeholder="Price Type"
                value={formData.priceType}
                onChange={(e) =>
                  setFormData({ ...formData, priceType: e.target.value })
                }
                className="border border-gray-300 rounded-lg p-2 focus:border-[#C8102E] outline-none"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="border border-gray-300 rounded-lg p-2 focus:border-[#C8102E] outline-none"
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateService}
                  className="bg-[#C8102E] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#a40f25] transition"
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
