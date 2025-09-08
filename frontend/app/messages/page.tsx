"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PortfolioPage() {
  const router = useRouter();
  const [isBuyer, setIsBuyer] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 ">
        <div>
            {/* Header */}
            <div className="bg-teal-500 p-6 relative mb-2">
              {/* Menu Button */}
              <button className="absolute right-4 top-6 text-white text-3xl">☰</button>
            </div>
        </div>
    </div>
  );
}
