"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiUser, FiCamera, FiPlus, FiTrash2 } from "react-icons/fi";
import axios from "axios";

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  bio: string;
  services: string[];
  skills: string[];
}

export default function AddProfilePage() {
  const router = useRouter();

  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    phone: "",
    bio: "",
    services: [],
    skills: [],
  });

  const [newService, setNewService] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // File change handler
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setProfilePic(e.target.files[0]);
  };

  // Input change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Add/remove services
  const addService = () => {
    const s = newService.trim();
    if (s && !formData.services.includes(s)) {
      setFormData({ ...formData, services: [...formData.services, s] });
      setNewService("");
    }
  };

  const removeService = (s: string) =>
    setFormData({ ...formData, services: formData.services.filter((service) => service !== s) });

  // Add/remove skills
  const addSkill = () => {
    const s = newSkill.trim();
    if (s && !formData.skills.includes(s)) {
      setFormData({ ...formData, skills: [...formData.skills, s] });
      setNewSkill("");
    }
  };

  const removeSkill = (s: string) =>
    setFormData({ ...formData, skills: formData.skills.filter((skill) => skill !== s) });

  // Validation
  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim() || formData.name.includes("@") || formData.name.length < 3)
      errs.name = "Name must be at least 3 characters and cannot include '@'";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Enter a valid email";
    if (!formData.bio.trim()) errs.bio = "Bio is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      let profileImage = "";
      if (profilePic) {
        const reader = new FileReader();
        profileImage = await new Promise<string>((resolve, reject) => {
          reader.readAsDataURL(profilePic);
          reader.onloadend = () =>
            typeof reader.result === "string" ? resolve(reader.result) : reject("Failed to read file");
        });
      }

      const payload = { ...formData, profileImage };

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/handymen`, payload, { withCredentials: true });

      alert("Profile created successfully!");
      router.push("/handyAccount");
    } catch (err: unknown) {
      console.error(err);
      alert("Error: Could not create profile. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-yellow-400 shadow-md py-4 px-6 flex justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-wide">Handyman Profile</h1>
      </header>

      <main className="flex-1 flex justify-center items-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl w-full max-w-5xl h-[90vh] flex overflow-hidden"
        >
          {/* LEFT PANEL */}
          <div className="w-1/3 bg-gray-50 flex flex-col items-center p-6 gap-4 overflow-y-auto">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-yellow-400 shadow-md">
              {profilePic ? (
                <Image src={URL.createObjectURL(profilePic)} alt="Profile" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <FiUser size={50} />
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full cursor-pointer hover:bg-yellow-500 transition">
                <FiCamera size={20} />
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
            <div className="w-full flex flex-col gap-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className={`w-full p-3 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:border-yellow-400 outline-none transition`}
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full p-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:border-yellow-400 outline-none transition`}
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone (Optional)"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-yellow-400 outline-none transition"
              />
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-2/3 p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write a short bio..."
                className={`w-full p-3 rounded-lg border ${
                  errors.bio ? "border-red-500" : "border-gray-300"
                } focus:border-yellow-400 outline-none transition resize-none h-24`}
                required
              />
              {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}

              {/* Services */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Services Offered</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.services.map((s, i) => (
                    <div key={i} className="flex items-center gap-1 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full">
                      {s}
                      <button type="button" onClick={() => removeService(s)}>
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    placeholder="Add a service..."
                    className="flex-1 p-3 rounded-lg border border-gray-300 focus:border-yellow-400 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={addService}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg flex items-center gap-1"
                  >
                    <FiPlus /> Add
                  </button>
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Skills</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.skills.map((s, i) => (
                    <div key={i} className="flex items-center gap-1 bg-green-400 text-gray-900 px-3 py-1 rounded-full">
                      {s}
                      <button type="button" onClick={() => removeSkill(s)}>
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill..."
                    className="flex-1 p-3 rounded-lg border border-gray-300 focus:border-green-400 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="bg-green-400 hover:bg-green-500 text-gray-900 px-4 py-2 rounded-lg flex items-center gap-1"
                  >
                    <FiPlus /> Add
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition"
            >
              Create Profile
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
