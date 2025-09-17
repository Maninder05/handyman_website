"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
      {/* Header */}
      <div className="bg-blue-500 p-4 flex items-center justify-center relative">
        <Link href="/h-portfolio">
          <button className="absolute left-4 text-white text-xl">←</button>
        </Link>
        <h1 className="text-xl font-bold text-white">Create Service</h1>
      </div>

      {/* Form */}
      <div className="flex-1 p-5 space-y-6 bg-white">
        {/* Title */}
        <div>
          <label className="block mb-2 font-semibold">Service Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg p-3 border bg-neutral-50"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg p-3 border bg-neutral-50"
          >
            <option value="">Select Category</option>
            <option>Electrical Repair</option>
            <option>Plumbing</option>
            <option>HVAC</option>
            <option>Carpentry</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>

        {/* Image */}
        <div>
          <label className="block mb-2 font-semibold">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded-lg bg-neutral-50"
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

        
      </div>

    </div>
  );
}
