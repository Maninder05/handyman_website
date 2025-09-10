"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CreateService() {
  // form data
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priceType, setPriceType] = useState("Hourly");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // errors and popup
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
  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};


    if (!title) newErrors.title = "Title is required";
    if (!category) newErrors.category = "Category is required";
    if (!price) newErrors.price = "Price is required";
    if (!image) newErrors.image = "Image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setPopup("Service Submitted Successfully ✅");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      {/* Header with Back Arrow */}
      <div className="bg-cyan-500 p-4 relative shadow-md flex items-center justify-center">
        <Link href="/dashboard">
          <button className="text-2xl absolute left-4 top-3 text-black">
            ←
          </button>
        </Link>
        <h1 className="text-2xl font-bold text-black">Create Service</h1>
      </div>

      {/* Form */}
      <div className="flex-1 p-5 space-y-6 bg-cyan-100 text-black">
        {/* Title */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-black">Service Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl p-3 border border-gray-300 text-black bg-white"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-black">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl p-3 border border-gray-300 text-black bg-white"
          >
            <option value="">Select Category</option>
            <option>Electrical Repair</option>
            <option>Plumbing</option>
            <option>HVAC</option>
            <option>Carpentry</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-black">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="p-2 border border-gray-300 rounded-xl text-black bg-white"
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Preview"
              width={120}
              height={120}
              className="rounded-md mt-2"
            />
          )}
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-black">Price</label>
          <div className="flex space-x-3">
            <select
              value={priceType}
              onChange={(e) => setPriceType(e.target.value)}
              className="rounded-xl p-3 border border-gray-300 text-black bg-white"
            >
              <option>Hourly</option>
              <option>Fixed</option>
            </select>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="flex-1 rounded-xl p-3 border border-gray-300 text-black bg-white"
            />
          </div>
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-around bg-gray-100 border-t py-4">
        <button
          onClick={() => setPopup("Draft Saved Successfully 📝")}
          className="bg-gray-500 text-white px-6 py-2 rounded-full shadow-md"
        >
          Save As Draft
        </button>
        <button
          onClick={handleSubmit}
          className="bg-cyan-500 text-white px-6 py-2 rounded-full shadow-md"
        >
          Submit Now →
        </button>
      </div>

      {/* Popup */}
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-80 text-black">
            <h2 className="text-xl font-bold mb-4">{popup}</h2>
            <button
              onClick={() => setPopup(null)}
              className="bg-cyan-500 text-white px-6 py-2 rounded-xl shadow"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
