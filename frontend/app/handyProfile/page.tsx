"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiCamera, FiPlus, FiTrash2 } from "react-icons/fi";

type ProfileFormData = {
  name: string;
  email: string;
  phone: string;
  bio: string;
  services: string[];
  skills: string[];
};

type Service = {
  title: string;
  desc: string;
};

type Order = {
  title: string;
  desc: string;
};

type Profile = {
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  jobsDone: number;
  inProgress: number;
  rating: number;
  earnings: number;
  activeOrders: number;
  services: Service[];
  recentOrders: Order[];
  skills?: string[];
  profileImage?: string;
};

const LOCAL_KEY = "handyman_profile";

export default function AddProfilePage() {
  const router = useRouter();

  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
  const [saving, setSaving] = useState(false);

  // Helpers
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setProfilePic(f);
    if (f) setPreviewUrl(URL.createObjectURL(f));
    else setPreviewUrl(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const addService = () => {
    const s = newService.trim();
    if (!s) return;
    if (!formData.services.includes(s)) {
      setFormData({ ...formData, services: [...formData.services, s] });
    }
    setNewService("");
  };

  const removeService = (s: string) =>
    setFormData({ ...formData, services: formData.services.filter((svc) => svc !== s) });

  const addSkill = () => {
    const s = newSkill.trim();
    if (!s) return;
    if (!formData.skills.includes(s)) {
      setFormData({ ...formData, skills: [...formData.skills, s] });
    }
    setNewSkill("");
  };

  const removeSkill = (s: string) =>
    setFormData({ ...formData, skills: formData.skills.filter((sk) => sk !== s) });

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim() || formData.name.includes("@") || formData.name.length < 3)
      errs.name = "Name must be at least 3 characters and cannot include '@'";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Enter a valid email";
    if (!formData.bio.trim()) errs.bio = "Bio is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const fileToDataUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject("Failed to read file");
      reader.onloadend = () => {
        if (typeof reader.result === "string") resolve(reader.result);
        else reject("No result");
      };
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);

    try {
      let profileImage = "";
      if (profilePic) profileImage = await fileToDataUrl(profilePic);

      const profileToSave: Profile = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        bio: formData.bio.trim(),
        jobsDone: 0,
        inProgress: 0,
        rating: 0,
        earnings: 0,
        activeOrders: 0,
        services: formData.services.map((s) => ({ title: s, desc: "" })),
        recentOrders: [],
        skills: formData.skills.length ? formData.skills : undefined,
        profileImage: profileImage || undefined,
      };

      // Save to localStorage
      localStorage.setItem(LOCAL_KEY, JSON.stringify(profileToSave));

      router.push("/handyDashboard");
    } catch (err) {
      console.error("Error creating profile:", err);
      alert("Error: Could not create profile. See console for details.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md py-4 px-6 flex justify-center items-center border-b">
        <h1 className="text-2xl font-bold text-gray-800 tracking-wide">Create Handyman Profile</h1>
      </header>

      <main className="flex-1 flex justify-center items-start p-6">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl w-full max-w-5xl flex overflow-hidden">
          {/* LEFT PANEL */}
          <div className="w-1/3 bg-gray-50 flex flex-col items-center p-6 gap-4 overflow-y-auto">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#FFCC66] shadow-md">
              {previewUrl ? (
                <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <FiUser size={50} />
                </div>
              )}

              <label className="absolute bottom-0 right-0 bg-[#FFCC66] p-2 rounded-full cursor-pointer hover:brightness-95 transition">
                <FiCamera size={18} />
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>

            <div className="w-full flex flex-col gap-3">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className={`w-full p-3 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"} focus:border-[#FFCC66] outline-none transition`} required />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className={`w-full p-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:border-[#FFCC66] outline-none transition`} required />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone (Optional)" className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#FFCC66] outline-none transition" />
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-2/3 p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Write a short bio..." className={`w-full p-3 rounded-lg border ${errors.bio ? "border-red-500" : "border-gray-300"} focus:border-[#FFCC66] outline-none transition resize-none h-24`} required />
              {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}

              {/* Services */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Services Offered</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.services.map((s, i) => (
                    <div key={i} className="flex items-center gap-1 bg-[#FFCC66] text-gray-900 px-3 py-1 rounded-full">
                      <span className="text-sm">{s}</span>
                      <button type="button" onClick={() => removeService(s)} className="ml-1">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={newService} onChange={(e) => setNewService(e.target.value)} placeholder="Add a service..." className="flex-1 p-3 rounded-lg border border-gray-300 focus:border-[#FFCC66] outline-none transition" />
                  <button type="button" onClick={addService} className="bg-[#B22222] hover:bg-[#8B0000] text-white px-4 py-2 rounded-lg flex items-center gap-1">
                    <FiPlus /> Add
                  </button>
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Skills</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.skills.map((s, i) => (
                    <div key={i} className="flex items-center gap-1 bg-[#FFCC66] text-gray-900 px-3 py-1 rounded-full">
                      <span className="text-sm">{s}</span>
                      <button type="button" onClick={() => removeSkill(s)} className="ml-1">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add a skill..." className="flex-1 p-3 rounded-lg border border-gray-300 focus:border-[#FFCC66] outline-none transition" />
                  <button type="button" onClick={addSkill} className="bg-[#B22222] hover:bg-[#8B0000] text-white px-4 py-2 rounded-lg flex items-center gap-1">
                    <FiPlus /> Add
                  </button>
                </div>
              </div>
            </div>

            {/* Submit + Cancel */}
            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-[#B22222] hover:bg-[#8B0000] text-white font-semibold py-3 rounded-lg transition"
              >
                {saving ? "Saving..." : "Create Profile"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/handyDashboard")}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
