"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CreateService() {
  // all fields in the form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priceType, setPriceType] = useState("Hourly");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // errors and popup
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [popup, setPopup] = useState<string | null>(null);

  // to uplaod the image in the form
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
    <div className="min-h-screen flex flex-col bg-neutral-100 text-neutral-800">
      {/* Header */}
      <div className="bg-blue-500 p-4 flex items-center justify-center relative">
        <Link href="/handyDashboard">
          <button className="absolute left-4 bottom-4 text-white text-xl">←</button>
        </Link>
        <h1 className="text-xl font-bold text-white">Create Service</h1>
      </div>

      {/* Form */}
      <div className="flex-1 p-5 space-y-6 bg-white">
        {/* Title */}
        <div>
          <label className="block mb-2 font-semibold text-neutral-800">
            Service Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg p-3 border bg-neutral-50 text-neutral-800"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Category select filed with five options */}
        <div>
          <label className="block mb-2 font-semibold text-neutral-800">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg p-3 border bg-neutral-50 text-neutral-800"
          >
            <option value="">Select Category</option>
            <option>Electrical Repair</option>
            <option>Plumbing</option>
            <option>HVAC</option>
            <option>Carpentry</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>

        {/* Image upload field */}
        <div>
          <label className="block mb-2 font-semibold text-neutral-800">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded-lg bg-neutral-50 text-neutral-800"
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Preview"
              width={120}
              height={120}
              className="rounded-md mt-2 shadow"
            />
          )}
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        </div>

        {/* Price details */}
        <div>
          <label className="block mb-2 font-semibold text-neutral-800">
            Price
          </label>
          <div className="flex gap-3">
            <select
              value={priceType}
              onChange={(e) => setPriceType(e.target.value)}
              className="rounded-lg p-3 border bg-neutral-50 text-neutral-800"
            >
              <option>Hourly</option>
              <option>Fixed</option>
            </select>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="flex-1 rounded-lg p-3 border bg-neutral-50 text-neutral-800"
            />
          </div>
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-around bg-neutral-200 py-4 border-t">
        <button
          onClick={() => setPopup("Draft Saved Successfully 📝")}
          className="bg-gray-500 text-white px-6 py-2 rounded-full"
        >
          Save As Draft
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded-full"
        >
          Submit Now →
        </button>
      </div>

      {/* Popup for draft and submit button */}
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow text-center w-80 text-neutral-800">
            <h2 className="text-lg font-bold mb-4">{popup}</h2>
            <button
              onClick={() => setPopup(null)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


