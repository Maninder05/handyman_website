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

  const handleLogout = () => {
    router.push("/");
  };

  // toggle menus
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowProfileMenu(false);
  };

  const toggleProfile = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowMenu(false);
  };

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
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("priceType", priceType);
      formData.append("price", price);
      if (image) {
        formData.append("image", image);
      }

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
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col">
      {/* Header with dropdowns */}
      <header className="bg-[#1C1C1C] shadow-md relative py-4 px-4 border-b-4 border-[#C8102E]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#FFFFFF]">Create Service</h1>

          {/* Right side icons (profile + menu) */}
          <div className="flex items-center gap-4 relative">
            {/* Profile Icon */}
            <button
              onClick={toggleProfile}
              className="p-2 rounded-full hover:bg-[#C5A96A]/30 transition"
            >
              <FiUser size={22} className="text-[#FFFFFF]" />
            </button>

            {/* Profile dropdown */}
            {showProfileMenu && (
              <div className="absolute right-14 top-14 bg-[#1C1C1C] rounded-xl shadow-lg border border-[#C5A96A]/40 w-48 z-50">
                <ul className="text-sm divide-y divide-[#333]">
                  <li>
                    <Link
                      href="/handyAccount"
                      className="block px-4 py-3 hover:bg-[#C8102E] hover:text-white transition text-[#FFFFFF]"
                    >
                      View Account
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-[#C8102E] hover:bg-[#C8102E]/20 transition"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {/* Menu button */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-[#C5A96A]/30 bg-[#C8102E] text-white transition"
            >
              {showMenu ? <X size={26} /> : <Menu size={26} />}
            </button>

            {/* Hamburger dropdown */}
            {showMenu && (
              <div className="absolute right-0 top-14 bg-[#1C1C1C] shadow-xl rounded-xl border border-[#C5A96A]/40 w-56 text-sm z-50 overflow-hidden">
                <ul className="divide-y divide-[#333] text-[#FFFFFF]">
                  <li>
                    <Link
                      href="/create-service"
                      className="block px-4 py-3 hover:bg-[#C8102E] transition"
                    >
                      Add Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/Add-profile"
                      className="block px-4 py-3 hover:bg-[#C8102E] transition"
                    >
                      Add profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/handyAccount"
                      className="block px-4 py-3 hover:bg-[#C8102E] transition"
                    >
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/order"
                      className="block px-4 py-3 hover:bg-[#C8102E] transition"
                    >
                      Track Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/membership"
                      className="block px-4 py-3 hover:bg-[#C8102E] transition"
                    >
                      Membership Plan
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/help"
                      className="block px-4 py-3 hover:bg-[#C8102E] transition"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings"
                      className="block px-4 py-3 hover:bg-[#C8102E] transition"
                    >
                      Account Settings
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 flex justify-center items-start py-10 px-4">
        {/* Form card */}
        <div className="w-full max-w-4xl bg-[#FFFFFF] rounded-xl shadow-lg p-10 space-y-8 border-t-4 border-[#C8102E]">
          {/* Service Title */}
          <div>
            <label className="block mb-2 font-semibold text-[#1C1C1C]">
              Service Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg p-4 border border-[#B3B3B3] bg-[#F4F4F4] text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#C8102E] transition"
              placeholder="Enter service title"
            />
            {errors.title && (
              <p className="text-[#C8102E] text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold text-[#1C1C1C]">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg p-4 border border-[#B3B3B3] bg-[#F4F4F4] text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#C8102E] appearance-none pr-8 transition cursor-pointer"
            >
              <option value="">Select Category</option>
              <option>Electrical Repair</option>
              <option>Plumbing</option>
              <option>HVAC</option>
              <option>Carpentry</option>
            </select>
            {errors.category && (
              <p className="text-[#C8102E] text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 font-semibold text-[#1C1C1C]">
              Image
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 flex justify-between items-center px-4 py-3 border border-[#B3B3B3] rounded-lg bg-[#F4F4F4] cursor-pointer hover:bg-[#EAEAEA] transition">
                {image ? image.name : "No file chosen"}
                <span className="ml-2 text-[#B3B3B3]">▼</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              {imagePreview && (
                <div className="w-24 h-24 relative border border-[#B3B3B3] rounded-lg overflow-hidden shadow">
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
              <p className="text-[#C8102E] text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 font-semibold text-[#1C1C1C]">
              Price
            </label>
            <div className="flex gap-4">
              <select
                value={priceType}
                onChange={(e) => setPriceType(e.target.value)}
                className="rounded-lg p-4 border border-[#B3B3B3] bg-[#F4F4F4] text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#C8102E] transition cursor-pointer"
              >
                <option>Hourly</option>
                <option>Fixed</option>
              </select>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="flex-1 rounded-lg p-4 border border-[#B3B3B3] bg-[#F4F4F4] text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#C8102E] transition"
                placeholder="Enter price"
              />
            </div>
            {errors.price && (
              <p className="text-[#C8102E] text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#EAEAEA]">
            <button
              onClick={() => setPopup("Draft Saved Successfully 📝")}
              className="bg-[#C5A96A] text-[#1C1C1C] px-5 py-2 rounded-lg hover:bg-[#B99655] transition shadow"
            >
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#C8102E] text-white px-5 py-2 rounded-lg hover:bg-[#A60E27] transition shadow"
            >
              Submit Now →
            </button>
          </div>
        </div>
      </main>

      {/* Popup */}
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow text-center w-80 text-[#1C1C1C]">
            <h2 className="text-lg font-bold mb-4">{popup}</h2>
            <button
              onClick={() => setPopup(null)}
              className="bg-[#C8102E] text-white px-4 py-2 rounded-lg hover:bg-[#A60E27] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}





//ChatGPT (https://chat.openai.com - For explanations, debugging help, and understanding coding concepts.
//W3Schools (https://www.w3schools.com - To learn HTML, CSS, JavaScript, and React syntax.
//MDN Web Docs (https://developer.mozilla.org - For detailed documentation and best practices in web development.
//Stack Overflow (https://stackoverflow.com - To find solutions to coding errors and implementation issues.
