// frontend: app/create-service/page.tsx  (or wherever your CreateService component lives)
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FiUser } from "react-icons/fi";

export default function CreateService() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priceType, setPriceType] = useState("Hourly");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [popup, setPopup] = useState<string | null>(null);

  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();

  const handleLogout = () => router.push("/");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowProfileMenu(false);
  };

  const toggleProfile = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowMenu(false);
  };

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

  // Shared submit function used for publish + draft
  const submitToServer = async (isDraft = false) => {
    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = "Title is required";
    if (!category) newErrors.category = "Category is required";
    if (!price) newErrors.price = "Price is required";
    // If publishing, image is required; drafts can be saved without image
    if (!image && !isDraft) newErrors.image = "Image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("priceType", priceType);
      formData.append("price", price);
      formData.append("isDraft", isDraft ? "true" : "false");
      if (image) formData.append("image", image);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/services`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        setPopup(isDraft ? "Draft saved ✅" : "Service submitted ✅");
        // clear only if published; for draft you might keep fields — but user wanted same behavior earlier, I'll clear both
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

  const handleSubmit = async () => {
    await submitToServer(false);
  };

  const handleSaveDraft = async () => {
    await submitToServer(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] flex flex-col">
      {/* Header */}
      <header className="bg-[#5C4033] shadow-md relative py-4 px-4 border-b-4 border-[#EED9C4]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#EED9C4] tracking-wide">
            Create Service
          </h1>

          <div className="flex items-center gap-4 relative">
            {/* Profile Icon */}
            <button
              onClick={toggleProfile}
              className="p-2 rounded-full hover:bg-[#C4956A]/30 transition"
            >
              <FiUser size={22} className="text-[#EED9C4]" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-14 top-14 bg-[#FFF8F2] rounded-xl shadow-lg border border-[#EED9C4] w-48 z-50">
                <ul className="text-sm divide-y divide-[#EED9C4]">
                  <li>
                    <Link
                      href="/handyAccount"
                      className="block px-4 py-3 hover:bg-[#EED9C4]/40 transition text-[#5C4033]"
                    >
                      View Account
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-[#C4956A] hover:bg-[#EED9C4]/40 transition"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {/* Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-[#EED9C4]/40 bg-[#C4956A] text-white transition"
            >
              {showMenu ? <X size={26} /> : <Menu size={26} />}
            </button>

            {showMenu && (
              <div className="absolute right-0 top-14 bg-[#FFF8F2] shadow-xl rounded-xl border border-[#EED9C4] w-56 text-sm z-50 overflow-hidden">
                <ul className="divide-y divide-[#EED9C4] text-[#5C4033]">
                  {[
                    ["Add Service", "/create-service"],
                    ["Add Profile", "/Add-profile"],
                    ["My Account", "/handyAccount"],
                    ["Track Order", "/order"],
                    ["Membership Plan", "/membership"],
                    ["FAQ", "/help"],
                    ["Account Settings", "/settings"],
                  ].map(([label, href]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="block px-4 py-3 hover:bg-[#EED9C4]/50 transition"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Section (same design you provided) */}
      <main className="flex-1 flex justify-center items-start py-14 px-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-12 space-y-10 border-t-4 border-[#EED9C4]">
          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold text-[#5C4033]">
              Service Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl p-4 border border-[#EED9C4] bg-[#FFF8F2] text-[#5C4033] focus:outline-none focus:ring-2 focus:ring-[#C4956A] transition"
              placeholder="Enter service title"
            />
            {errors.title && (
              <p className="text-[#C4956A] text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold text-[#5C4033]">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl p-4 border border-[#EED9C4] bg-[#FFF8F2] text-[#5C4033] focus:outline-none focus:ring-2 focus:ring-[#C4956A] appearance-none pr-8 transition cursor-pointer"
            >
              <option value="">Select Category</option>
              <option>Electrical</option>
              <option>Plumbing</option>
              <option>Carpentry</option>
              <option>Appliances</option>
              <option>Painting & Finishing</option>
              <option>Cleaning</option>
              <option>Landscaping</option>
              <option>Renovation</option>
              <option>Roofing</option>
              <option>General Repairs</option>
            </select>
            {errors.category && (
              <p className="text-[#C4956A] text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 font-semibold text-[#5C4033]">
              Upload Service Image
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 flex justify-between items-center px-4 py-3 border border-[#EED9C4] rounded-xl bg-[#FFF8F2] cursor-pointer hover:bg-[#FAF0E6] transition">
                {image ? image.name : "Choose image file"}
                <span className="ml-2 text-[#C4956A]">📁</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              {imagePreview && (
                <div className="w-24 h-24 relative border border-[#EED9C4] rounded-xl overflow-hidden shadow">
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
              <p className="text-[#C4956A] text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {/* Price Section */}
          <div>
            <label className="block mb-2 font-semibold text-[#5C4033]">
              Price
            </label>
            <div className="flex gap-4">
              <select
                value={priceType}
                onChange={(e) => setPriceType(e.target.value)}
                className="rounded-xl p-4 border border-[#EED9C4] bg-[#FFF8F2] text-[#5C4033] focus:outline-none focus:ring-2 focus:ring-[#C4956A] transition cursor-pointer"
              >
                <option>Hourly</option>
                <option>Fixed</option>
              </select>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="flex-1 rounded-xl p-4 border border-[#EED9C4] bg-[#FFF8F2] text-[#5C4033] focus:outline-none focus:ring-2 focus:ring-[#C4956A] transition"
                placeholder="Enter price"
              />
            </div>
            {errors.price && (
              <p className="text-[#C4956A] text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-[#EED9C4]/60">
            <button
              onClick={handleSaveDraft}
              className="bg-[#EED9C4] text-[#5C4033] px-6 py-3 rounded-xl hover:bg-[#E3C7A8] transition shadow font-medium"
            >
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#C4956A] text-white px-6 py-3 rounded-xl hover:bg-[#B07E54] transition shadow font-medium"
            >
              Submit Now →
            </button>
          </div>
        </div>
      </main>

      {/* Popup */}
      {popup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-[#FFF8F2] p-6 rounded-xl shadow text-center w-80 text-[#5C4033]">
            <h2 className="text-lg font-bold mb-4">{popup}</h2>
            <button
              onClick={() => setPopup(null)}
              className="bg-[#C4956A] text-white px-4 py-2 rounded-lg hover:bg-[#B07E54] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
