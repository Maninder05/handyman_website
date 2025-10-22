"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function BrowseServicesPage() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowProfileMenu(false);
  };
  const toggleProfile = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowMenu(false);
  };
  const handleLogout = () => router.push("/");

  const services = [
    { name: "Wiring Repair", price: 55, category: "Electrical", image: "" },
    { name: "Pipe Leakage Fix", price: 60, category: "Plumbing", image: "" },
    { name: "Custom Furniture", price: 75, category: "Carpentry", image: "" },
    { name: "Appliance Installation", price: 50, category: "Appliances", image: "" },
    { name: "Wall Painting", price: 65, category: "Painting & Finishing", image: "" },
    { name: "Deep Cleaning", price: 40, category: "Cleaning", image: "" },
    { name: "Lawn Mowing", price: 45, category: "Landscaping", image: "" },
    { name: "Flooring Installation", price: 80, category: "Renovation", image: "" },
    { name: "Door & Lock Repair", price: 55, category: "Carpentry", image: "" },
    { name: "Ceiling Fan Installation", price: 50, category: "Electrical", image: "" },
    { name: "Roof Leak Repair", price: 85, category: "Roofing", image: "" },
    { name: "Drywall & Plaster Fix", price: 70, category: "Renovation", image: "" },
    { name: "Furniture Assembly", price: 45, category: "General Repairs", image: "" },
  ];

  return (
    <main className="bg-[#F8F8F8] min-h-screen text-[#5C4033] flex flex-col">
      {/* ================= HEADER ================= */}
      <header className="bg-[#5C4033] shadow-md relative py-4 px-4 border-b-4 border-[#EED9C4]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#EED9C4] tracking-wide">
            Browse Services
          </h1>

          <div className="flex items-center gap-4 relative">
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

            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-[#EED9C4]/40 bg-[#C4956A] text-white transition"
            >
              {showMenu ? <X size={26} /> : <Menu size={26} />}
            </button>

            {showMenu && (
              <div className="absolute right-0 top-14 bg-[#FFF8F2] shadow-xl rounded-xl border border-[#EED9C4] w-56 text-sm z-50 overflow-hidden">
                <ul className="divide-y divide-[#EED9C4] text-[#5C4033]">
                  {[["Add Service", "/create-service"],
                    ["Add Profile", "/Add-profile"],
                    ["My Account", "/handyAccount"],
                    ["Track Order", "/order"],
                    ["Membership Plan", "/membership"],
                    ["FAQ", "/help"],
                    ["Account Settings", "/settings"]
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

      {/* ================= SERVICE CARDS ================= */}
      <section className="px-6 py-12 max-w-[1400px] mx-auto w-full">
        <h2 className="text-3xl font-bold mb-10 text-[#C4956A] text-center">
          Explore Handyman Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-lg 
                         border border-[#EED9C4] hover:shadow-2xl hover:-translate-y-2
                         transition-all duration-300 flex flex-col"
            >
              <div className="relative w-full h-48">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <span className="absolute bottom-3 left-4 bg-[#EED9C4] text-[#5C4033] px-3 py-1 rounded-full text-xs font-semibold shadow">
                  {service.category}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-[#5C4033] mb-2">
                  {service.name}
                </h3>
                <p className="text-[#C4956A] font-medium mb-4">
                  ${service.price} CAD / hr
                </p>
                <button
                  className="mt-auto bg-[#C4956A] text-white font-semibold py-2 rounded-xl 
                             hover:bg-[#B3835F] transition hover:scale-[1.02]"
                  onClick={() => router.push(`/book/${service.name}`)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
