"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CreateService() {
  // normal states for the form
  const [title, setTitle] = useState("Residential and Community Wiring Repair");
  const [category, setCategory] = useState("Electrical Repair");
  const [priceType, setPriceType] = useState("Hourly");
  const [price, setPrice] = useState("55");

  // image and preview
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // errors and popup messages
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [popup, setPopup] = useState<string | null>(null);

  // handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.type)) {
      setErrors({ image: "Only JPEG, JPG, PNG are allowed" });
      setImage(null);
      setImagePreview(null);
      return;
    }

    if (file.size > 35 * 1024 * 1024) {
      setErrors({ image: "Image must be less than 35MB" });
      setImage(null);
      setImagePreview(null);
      return;
    }

    setErrors({});
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // handle submit
  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!category.trim()) newErrors.category = "Category is required";
    if (!price.trim()) newErrors.price = "Price is required";
    if (!image) newErrors.image = "Image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setPopup("Service Submitted Successfully ✅");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-teal-500 p-4 relative shadow-md flex items-center justify-center">
        <Link href="/dashboard"> {/*add the path to the dashboar*/}
          <button className="absolute left-4 top-4 text-black">
            <ArrowLeft size={24} />
          </button>
        </Link>
        <h1 className="text-xl font-bold text-black">Order Details</h1>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 p-5 space-y-6 bg-teal-100"
      >
        {/* Title */}
        <div className="flex flex-col">
          <label className="text-black font-medium mb-2">Service Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl p-3 border border-gray-300 outline-none bg-white text-black"
          />
          <AnimatePresence>
            {errors.title && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.title}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-black font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl p-3 border border-gray-300 outline-none bg-white text-black"
          >
            <option value="">Select Category</option>
            <option>Electrical Repair</option>
            <option>Plumbing</option>
            <option>HVAC</option>
            <option>Carpentry</option>
          </select>
          <AnimatePresence>
            {errors.category && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.category}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label className="text-black font-medium mb-2">Image</label>
          <label className="rounded-xl p-6 border-2 border-dashed border-gray-400 bg-white flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:bg-teal-50">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md"
              />
            ) : (
              <>
                <span className="text-4xl">📤</span>
                <p className="text-gray-600 text-sm mt-2">Upload Image</p>
                <p className="text-xs text-gray-500 mt-1">
                  Max 35MB | JPG, PNG, JPEG
                </p>
              </>
            )}
          </label>
          <AnimatePresence>
            {errors.image && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.image}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="text-black font-medium mb-2">Price</label>
          <div className="flex space-x-3">
            <select
              value={priceType}
              onChange={(e) => setPriceType(e.target.value)}
              className="rounded-xl p-3 border border-gray-300 outline-none bg-white text-black"
            >
              <option>Hourly</option>
              <option>Fixed</option>
            </select>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="flex-1 rounded-xl p-3 border border-gray-300 outline-none bg-white text-black"
            />
          </div>
          <AnimatePresence>
            {errors.price && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.price}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Buttons */}
      <div className="flex justify-around bg-gray-100 border-t py-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPopup("Draft Saved Successfully 📝")}
          className="bg-gray-500 text-white px-6 py-2 rounded-full shadow-md"
        >
          Save As Draft
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="bg-teal-500 text-white px-6 py-2 rounded-full shadow-md"
        >
          Submit Now →
        </motion.button>
      </div>

      {/* Popup */}
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-80">
            <h2 className="text-xl font-bold text-black mb-4">{popup}</h2>
            <button
              onClick={() => setPopup(null)}
              className="bg-teal-500 text-white px-6 py-2 rounded-xl shadow hover:bg-teal-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
