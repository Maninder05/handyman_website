"use client";
// Page to choose a handyman for a selected service
import { useSearchParams, useRouter } from "next/navigation";
import { Bell, Home, MessageCircle, Settings, Users } from "lucide-react";
import Image from "next/image";

export default function ChooseHandymanPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const service = searchParams.get("service"); // e.g. "Plumbing"

  const handymen = [
    {
      name: "Kenji Teneka",
      rating: 5.0,
      reviews: 13,
      price: 55,
      image: "/images/kenji.jpg",
    },
    {
      name: "Luke Moretti",
      rating: 4.7,
      reviews: 11,
      price: 40,
      image: "/images/luke.jpg",
    },
    {
      name: "Johnny Consey",
      rating: 4.5,
      reviews: 8,
      price: 35,
      image: "/images/johnny.jpg",
    },
  ];

  // Function to handle choosing a handyman
  const handleChoose = (person: typeof handymen[0]) => {
    router.push(
      `/hire-handyman?name=${encodeURIComponent(
        person.name
      )}&price=${person.price}&service=${encodeURIComponent(service || "")}`
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#FFCC66] to-[#FF7E5F] shadow-md px-6 py-4 text-center">
        <h1 className="text-xl font-extrabold text-gray-900">
          {service ? `Choose Handyman for ${service}` : "Choose Handyman"}
        </h1>
        <p className="text-sm text-gray-800 mt-1">
          Compare and choose the right handyman for your job — fast, trusted,
          and nearby.
        </p>
      </header>

      {/* Handyman List */}
      <main className="flex-1 p-6 space-y-5">
        {handymen.map((person, idx) => (
          <div
            key={idx}
            className="bg-gray-800 rounded-2xl shadow-lg p-5 flex items-center gap-5 hover:shadow-xl transition"
          >
            <Image
              src={person.image}
              alt={person.name}
              width={64}
              height={64}
              className="rounded-full border-4 border-yellow-400 shadow-md"
            />
            <div className="flex-1">
              <p className="font-bold text-lg text-yellow-400">
                {person.name}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-yellow-500 text-gray-900 px-2 rounded text-sm font-semibold">
                  {person.rating.toFixed(1)}
                </span>
                <span className="text-yellow-400">
                  {"⭐".repeat(Math.round(person.rating))}
                </span>
                <span className="text-gray-400 text-sm">
                  [{person.reviews} reviews]
                </span>
              </div>
              <p className="mt-1 text-gray-300 font-medium">
                💵 {person.price} CAD/hr
              </p>
            </div>
            <button
              className="bg-yellow-400 text-gray-900 px-5 py-2 rounded-full font-semibold hover:bg-yellow-500 transition"
              onClick={() => handleChoose(person)}
            >
              Choose
            </button>
          </div>
        ))}
      </main>

      {/* Bottom Navigation */}
      <footer className="bg-gray-800 flex justify-around items-center h-14">
        <button
          onClick={() => router.push("/")}
          className="cursor-pointer hover:text-yellow-400 transition"
        >
          <Home className="w-6 h-6 text-gray-200" />
        </button>
        <button
          onClick={() => router.push("/messages")}
          className="cursor-pointer hover:text-yellow-400 transition"
        >
          <MessageCircle className="w-6 h-6 text-gray-200" />
        </button>
        <button
          onClick={() => router.push("/portfolio")}
          className="cursor-pointer hover:text-yellow-400 transition"
        >
          <Users className="w-6 h-6 text-gray-200" />
        </button>
        <button
          onClick={() => router.push("/notifications")}
          className="relative cursor-pointer hover:text-yellow-400 transition"
        >
          <Bell className="w-6 h-6 text-gray-200" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>
        <button
          onClick={() => router.push("/settings")}
          className="cursor-pointer hover:text-yellow-400 transition"
        >
          <Settings className="w-6 h-6 text-gray-200" />
        </button>
      </footer>
    </div>
  );
}
