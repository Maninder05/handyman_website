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
    <main className="bg-gray-900 min-h-screen text-gray-100 flex flex-col items-center py-12 px-4">
      {/* Header */}
      <section className="bg-yellow-600 w-full py-10 shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-wide">
          Find Your Perfect Handyman
        </h1>
      </section>

      {/* Filter Card */}
      <section className="bg-gray-800 text-gray-100 mt-12 p-8 rounded-2xl shadow-2xl w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-yellow-400 mb-10 text-center">
          Filters
        </h2>

        {/* Hourly Rate */}
        <div className="mb-10">
          <label className="block font-semibold mb-3 text-gray-200">
            Hourly Rate
          </label>
          <input
            type="range"
            min="50"
            max="1000"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-yellow-500"
          />
          <div className="flex justify-between text-sm text-gray-400 mt-1">
            <span>$50</span>
            <span>$1000</span>
          </div>
          <p className="text-sm mt-2 text-yellow-400 text-center">
            Selected: ${rate}
          </p>
        </div>

        {/* Experience Dropdown */}
        <div className="mb-10">
          <label className="block font-semibold mb-3 text-gray-200">
            Experience
          </label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:border-yellow-500 focus:ring focus:ring-yellow-400"
          >
            <option value="">Select Experience</option>
            <option value="1">1+ Years</option>
            <option value="3">3+ Years</option>
            <option value="5">5+ Years</option>
          </select>
        </div>

        {/* Distance */}
        <div className="mb-10">
          <label className="block font-semibold mb-3 text-gray-200">
            Distance
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full accent-yellow-500"
          />
          <div className="flex justify-between text-sm text-gray-400 mt-1">
            <span>1 km</span>
            <span>10 km</span>
          </div>
          <p className="text-sm mt-2 text-yellow-400 text-center">
            Selected: {distance} km
          </p>
        </div>

        {/* Skills */}
        <div className="mb-10">
          <label className="block font-semibold mb-3 text-gray-200">
            Skills
          </label>
          <div className="flex flex-wrap gap-3">
            {skillOptions.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  skills.includes(skill)
                    ? "bg-yellow-500 text-gray-900 shadow-md"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-12">
          <button
            onClick={() => {
              setRate(50);
              setDistance(1);
              setExperience("");
              setSkills([]);
            }}
            className="px-8 py-3 bg-gray-700 text-gray-200 rounded-xl font-semibold hover:bg-gray-600 transition"
          >
            Reset
          </button>
          <button className="px-8 py-3 bg-yellow-500 text-gray-900 rounded-xl font-semibold shadow-md hover:bg-yellow-400 transition">
            Apply Filters →
          </button>
        </div>
      </section>
    </main>
  );
}
