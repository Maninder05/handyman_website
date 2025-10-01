"use client";

import { useState } from "react";
import Image from "next/image";

export default function CreateService() {
  // form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priceType, setPriceType] = useState("Hourly");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // errors + popup
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [popup, setPopup] = useState<string | null>(null);

  // upload image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setErrors({ image: "Only JPG, JPEG and PNG are allowed" });
      return;
    }
    if (file.size > 35 * 1024 * 1024) {
      setErrors({ image: "Image must be less than 35MB" });
      return;
    }

    setErrors({});
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // submit form
  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = "Title is required";
    if (!category) newErrors.category = "Category is required";
    if (!price) newErrors.price = "Price is required";
    if (!image) newErrors.image = "Image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // create FormData for file + fields
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("priceType", priceType);
      formData.append("price", price);
      if (image) {
        formData.append("image", image);
      }

      // call backend API
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/services`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        setPopup("Service Submitted Successfully ✅");
        setTitle("");
        setCategory("");
        setPrice("");
        setImage(null);
        setImagePreview(null);
      } else {
        const data = await res.json();
        setPopup(data.message || "Failed to submit service ❌");
      }
    } catch (err) {
      console.error("Error submitting service:", err);
      setPopup("Error submitting service ❌");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      {/* Header */}
      <header className="bg-yellow-500 p-6 shadow-md text-center">
        <h1 className="text-3xl font-bold text-white">Create Service</h1>
      </header>

      {/* Main content area */}
      <main className="flex-1 flex justify-center items-start py-10 px-4">
        {/* Form card */}
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-10 space-y-8">
          {/* the field to enter the title of the service */}
          <div>
            <label className="block mb-2 font-semibold text-neutral-800">
              Service Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg p-4 border border-gray-300 bg-neutral-50 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="Enter service title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* the field to choose the category */}
          <div>
            <label className="block mb-2 font-semibold text-neutral-800">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg p-4 border border-gray-300 bg-neutral-50 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none pr-8 transition cursor-pointer"
            >
              <option value="">Select Category</option>
              <option>Electrical Repair</option>
              <option>Plumbing</option>
              <option>HVAC</option>
              <option>Carpentry</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* the field to upload the image */}
          <div>
            <label className="block mb-2 font-semibold text-neutral-800">
              Image
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 flex justify-between items-center px-4 py-3 border border-gray-300 rounded-lg bg-neutral-50 cursor-pointer hover:bg-gray-100 transition">
                {image ? image.name : "No file chosen"}
                <span className="ml-2 text-gray-500">▼</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              {imagePreview && (
                <div className="w-24 h-24 relative border rounded-lg overflow-hidden shadow">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {/* The field to select the price type */}
          <div>
            <label className="block mb-2 font-semibold text-neutral-800">
              Price
            </label>
            <div className="flex gap-4">
              <select
                value={priceType}
                onChange={(e) => setPriceType(e.target.value)}
                className="rounded-lg p-4 border border-gray-300 bg-neutral-50 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition cursor-pointer"
              >
                <option>Hourly</option>
                <option>Fixed</option>
              </select>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="flex-1 rounded-lg p-4 border border-gray-300 bg-neutral-50 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                placeholder="Enter price"
              />
            </div>
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Both buttons are defined here */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setPopup("Draft Saved Successfully 📝")}
              className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition shadow"
            >
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition shadow"
            >
              Submit Now →
            </button>
          </div>
        </div>
      </main>

      {/* Function for popup */}
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow text-center w-80 text-neutral-800">
            <h2 className="text-lg font-bold mb-4">{popup}</h2>
            <button
              onClick={() => setPopup(null)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
