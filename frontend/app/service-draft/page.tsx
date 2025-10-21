"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function SavedDraftsPage() {
  interface Service {
    _id: string;
    title: string;
    category: string;
    priceType: string;
    price: number;
    image?: string;
    isDraft?: boolean;
  }

  const [drafts, setDrafts] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/drafts`);
        if (!res.ok) throw new Error("Failed to fetch drafts");
        const data = await res.json();
        setDrafts(data);
      } catch (err) {
        console.error("Error fetching drafts:", err);
        setError("Failed to load drafts ❌");
      } finally {
        setLoading(false);
      }
    };
    fetchDrafts();
  }, []);

  const handleLogout = () => router.push("/");
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowProfileMenu(false);
  };
  const toggleProfile = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowMenu(false);
  };

  const handlePublish = async (service: Service) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${service._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDraft: false }),
      });
      if (!res.ok) throw new Error("Failed to publish");
      setDrafts((prev) => prev.filter((d) => d._id !== service._id));
      alert("Published successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to publish ❌");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this draft permanently?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setDrafts((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete ❌");
    }
  };

  return (
    <main className="bg-[#F8F8F8] min-h-screen text-[#5C4033] flex flex-col">
      {/* HEADER */}
      <header className="bg-[#5C4033] shadow-md relative py-4 px-4 border-b-4 border-[#EED9C4]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#EED9C4] tracking-wide">
            Saved Drafts
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

      {/* BODY SECTION */}
      <section className="px-6 py-12 max-w-[1600px] mx-auto w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-10 text-[#C4956A] text-center">
          Your Saved Drafts
        </h2>

        {loading ? (
          <p className="text-center text-[#C4956A] text-lg font-semibold">
            Loading drafts...
          </p>
        ) : error ? (
          <p className="text-center text-[#C4956A] text-lg font-semibold">
            {error}
          </p>
        ) : drafts.length === 0 ? (
          <p className="text-center text-[#5C4033] text-lg font-semibold">
            No drafts saved yet.
          </p>
        ) : (
          <div className="flex flex-col gap-10 w-full items-center">
            {drafts.map((draft) => (
              <div
                key={draft._id}
                className="flex flex-col md:flex-row w-[93%] md:w-[90%] lg:w-[85%] xl:w-[80%]
                           bg-white rounded-3xl overflow-hidden 
                           shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                           hover:shadow-[0_15px_45px_rgba(0,0,0,0.12)]
                           transition-all duration-500 
                           border border-[#EED9C4]
                           hover:-translate-y-2"
              >
                {/* IMAGE */}
                <div className="relative w-full md:w-[38%] h-[240px] md:h-auto">
                  <Image
                    src={
                      draft.image
                        ? `${process.env.NEXT_PUBLIC_API_URL}${draft.image}`
                        : "/images/default-service.jpg"
                    }
                    alt={draft.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
                </div>

                {/* CONTENT */}
                <div className="w-full md:w-[62%] p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#C4956A] mb-3 border-b border-[#EED9C4] pb-2">
                      {draft.title}
                    </h3>

                    <div className="flex flex-col gap-1 text-[15px] text-[#5C4033] leading-relaxed">
                      <p>
                        <span className="font-semibold text-[#C4956A]">
                          Category:
                        </span>{" "}
                        {draft.category}
                      </p>
                      <p>
                        <span className="font-semibold text-[#C4956A]">
                          Type:
                        </span>{" "}
                        {draft.priceType}
                      </p>
                      <p>
                        <span className="font-semibold text-[#C4956A]">
                          Price:
                        </span>{" "}
                        ${draft.price} CAD
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-5">
                    <button
                      onClick={() => handlePublish(draft)}
                      className="flex-1 bg-[#EED9C4] hover:bg-[#E3C7A8] text-[#1C1C1C] py-2.5 rounded-xl font-semibold hover:scale-[1.03] hover:shadow-md transition-all"
                    >
                      Publish
                    </button>
                    <button
                      onClick={() => handleDelete(draft._id)}
                      className="flex-1 bg-[#D4A574] hover:bg-[#C4956A] text-white py-2.5 rounded-xl font-semibold hover:scale-[1.03] hover:shadow-md transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
