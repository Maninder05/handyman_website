// app/page.tsx
"use client";

import React from "react";

export default function Home() {
  const handleContactClick = () => {
    alert("Thank you for your interest! I’ll get back to you soon.");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-lg w-full rounded-2xl bg-white shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Handyman Portfolio
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome to my handyman portfolio. I specialize in home repairs,
          renovations, and maintenance services. 🚧🔧
        </p>
        <button
          onClick={handleContactClick}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Contact Me
        </button>
      </div>
    </main>
  );
}