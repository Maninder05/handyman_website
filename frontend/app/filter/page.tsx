"use client";
import React, { useState } from "react";

export default function FilterPage() {
  const [rate, setRate] = useState(50);
  const [distance, setDistance] = useState(1);
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const skillOptions = [
    "House Cleaning",
    "Floor Cleaning",
    "Disinfection",
    "Dusting & Vacuuming",
  ];

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <main className="bg-neutral-100 min-h-screen flex justify-center items-start py-12 text-neutral-900">
      {/* Filter Card */}
      <section className="bg-blue-500 text-black p-8 rounded-xl shadow-xl w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-8 text-neutral-100">
          Filter
        </h1>

        {/* Hourly Rate */}
        <div className="mb-8">
          <label className="block font-semibold mb-3 text-neutral-100">
            Hourly Rate
          </label>
          <input
            type="range"
            min="50"
            max="1000"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-black"
          />
          <div className="flex justify-between text-sm text-neutral-100 mt-1">
            <span>$50</span>
            <span>$1000</span>
          </div>
          <p className="text-sm mt-1 text-center text-white">
            Selected: ${rate}
          </p>
        </div>

        {/* Experience Dropdown */}
        <div className="mb-8">
          <label className="block font-semibold mb-3 text-neutral-100">
            Experience
          </label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300"
          >
            <option value="">Select Experience</option>
            <option value="1">1+ Years</option>
            <option value="3">3+ Years</option>
            <option value="5">5+ Years</option>
          </select>
        </div>

        {/* Distance */}
        <div className="mb-8">
          <label className="block font-semibold mb-3 text-neutral-100">
            Distance
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full accent-black"
          />
          <div className="flex justify-between text-sm text-neutral-100 mt-1">
            <span>1 km</span>
            <span>10 km</span>
          </div>
          <p className="text-sm mt-1 text-center text-white">
            Selected: {distance} km
          </p>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <label className="block font-semibold mb-3 text-neutral-100">
            Skills
          </label>
          <div className="flex flex-wrap gap-3">
            {skillOptions.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  skills.includes(skill)
                    ? "bg-white text-blue-600 font-semibold"
                    : "bg-blue-400 text-white hover:bg-blue-300"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => {
              setRate(50);
              setDistance(1);
              setExperience("");
              setSkills([]);
            }}
            className="px-8 py-2 bg-gray-300 rounded-xl font-semibold hover:bg-gray-400"
          >
            Reset
          </button>
          <button className="px-8 py-2 bg-white text-blue-600 rounded-xl font-semibold shadow hover:bg-gray-100">
            Apply Now →
          </button>
        </div>
      </section>
    </main>
  );
}
