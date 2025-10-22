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
    fetchServices();
  }, []);

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
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update service");

      const updatedService = await res.json();
      setServices((prev) =>
        prev.map((s) =>
          s._id === editingService._id ? { ...s, ...updatedService } : s
        )
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
      <section className="bg-[#D4A574] pb-8 text-center shadow-md border-b-4 border-[#EED9C4]">
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
                  ? "bg-[#EED9C4] text-[#1C1C1C]"
                  : "bg-[#C4956A] hover:bg-[#B98556] text-white transition"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="px-6 py-12 max-w-[1600px] mx-auto w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-10 text-[#C4956A] text-center">
          Handyman Services Offered
        </h2>

        {loading ? (
          <p className="text-center text-[#C4956A] text-lg font-semibold">
            Loading services...
          </p>
        ) : error ? (
          <p className="text-center text-[#C4956A] text-lg font-semibold">
            {error}
          </p>
        ) : services.length === 0 ? (
          <p className="text-center text-[#1C1C1C] text-lg font-semibold">
            No services added yet.
          </p>
        ) : (
          <div className="flex flex-col gap-10 w-full items-center">
            {services.map((service) => (
              <div
                key={service._id}
                className="flex flex-col md:flex-row w-[93%] md:w-[90%] lg:w-[85%] xl:w-[80%]
                           bg-white rounded-3xl overflow-hidden 
                           shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                           hover:shadow-[0_15px_45px_rgba(0,0,0,0.12)]
                           transition-all duration-500 
                           border border-[#EED9C4]
                           hover:-translate-y-2"
                style={{
                  minHeight: "280px", // slightly reduced height
                }}
              >
                {/* Image */}
                <div className="relative w-full md:w-[38%] h-[240px] md:h-auto">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="w-full md:w-[62%] p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#C4956A] mb-3 border-b border-[#EED9C4] pb-2">
                      {service.title}
                    </h3>

                    <div className="flex flex-col gap-1 text-[15px] text-[#5C4033] leading-relaxed">
                      <p>
                        <span className="font-semibold text-[#C4956A]">
                          Category:
                        </span>{" "}
                        {service.category}
                      </p>
                      <p>
                        <span className="font-semibold text-[#C4956A]">
                          Type:
                        </span>{" "}
                        {service.priceType}
                      </p>
                      <p>
                        <span className="font-semibold text-[#C4956A]">
                          Price:
                        </span>{" "}
                        ${service.price} CAD
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-5">
                    <button
                      onClick={() => handleEditClick(service)}
                      className="flex-1 bg-[#EED9C4] hover:bg-[#E3C7A8] text-[#1C1C1C] py-2.5 rounded-xl font-semibold hover:scale-[1.03] hover:shadow-md transition-all"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="flex-1 bg-[#D4A574] hover:bg-[#C4956A] text-white py-2.5 rounded-xl font-semibold hover:scale-[1.03] hover:shadow-md transition-all"
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

      {/* POPUP FORM */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 relative">
            <h2 className="text-2xl font-bold mb-5 text-[#C4956A] text-center">
              Edit Service
            </h2>

            <div className="flex flex-col gap-4">
              {["title", "category", "priceType", "price"].map((field) => (
                <input
                  key={field}
                  type={field === "price" ? "number" : "text"}
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                  value={formData[field as keyof typeof formData]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [field]: e.target.value,
                    })
                  }
                  className="border border-[#EED9C4] rounded-lg p-2 focus:border-[#C4956A] outline-none text-[#5C4033]"
                />
              ))}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-[#D4A574] hover:bg-[#C4956A] text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateService}
                  className="bg-[#EED9C4] hover:bg-[#E3C7A8] text-[#1C1C1C] px-4 py-2 rounded-lg font-semibold transition"
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
