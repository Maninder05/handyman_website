"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface Service {
  _id: string;
  title: string;
  category: string;
  priceType: string;
  price: number;
  image?: string;
}

export default function ProfileServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [updatedData, setUpdatedData] = useState<Partial<Service>>({});
  const [popupVisible, setPopupVisible] = useState(false);

  // Fetch all services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services`);
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services ❌");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Handle Delete
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`);
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting service:", err);
      alert("Failed to delete service ❌");
    }
  };

  // Handle Edit (open popup)
  const handleEdit = (service: Service) => {
    setEditingService(service);
    setUpdatedData(service);
    setPopupVisible(true);
  };

  // Handle Update (submit form)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      const formData = new FormData();
      Object.entries(updatedData).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, String(value));
      });

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/services/${editingService._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setServices((prev) =>
        prev.map((s) => (s._id === editingService._id ? res.data.service : s))
      );
      setPopupVisible(false);
      alert("Service updated successfully ✅");
    } catch (err) {
      console.error("Error updating service:", err);
      alert("Failed to update service ❌");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading services...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Your Added Services ✨
      </h1>

      {/* Service Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-3xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
          >
            {/* Image */}
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={
                  service.image
                    ? `${process.env.NEXT_PUBLIC_API_URL}${service.image}`
                    : "/images/default-service.jpg"
                }
                alt={service.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{service.title}</h3>
              <p className="text-gray-500 text-sm mb-3 capitalize">
                Category: {service.category}
              </p>
              <p className="text-gray-700 font-medium mb-2">
                {service.priceType === "hourly"
                  ? `$${service.price}/hour`
                  : `$${service.price} total`}
              </p>

              {/* Buttons */}
              <div className="mt-auto flex gap-3">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Popup */}
      {popupVisible && editingService && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Service</h2>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <input
                type="text"
                value={updatedData.title || ""}
                onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
                placeholder="Service Title"
                className="border p-2 rounded-lg"
                required
              />
              <input
                type="text"
                value={updatedData.category || ""}
                onChange={(e) => setUpdatedData({ ...updatedData, category: e.target.value })}
                placeholder="Category"
                className="border p-2 rounded-lg"
                required
              />
              <select
                value={updatedData.priceType || ""}
                onChange={(e) => setUpdatedData({ ...updatedData, priceType: e.target.value })}
                className="border p-2 rounded-lg"
              >
                <option value="hourly">Hourly</option>
                <option value="fixed">Fixed</option>
              </select>
              <input
                type="number"
                value={updatedData.price || ""}
                onChange={(e) => setUpdatedData({ ...updatedData, price: Number(e.target.value) })}
                placeholder="Price"
                className="border p-2 rounded-lg"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
  const file = e.target.files?.[0];
  if (file) {
    setUpdatedData({ ...updatedData, image: file as unknown as string });
  }
}}

                className="border p-2 rounded-lg"
              />

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setPopupVisible(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
