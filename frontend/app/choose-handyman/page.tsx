"use client";
// Page to choose a handyman for a selected service 
import { useSearchParams, useRouter } from "next/navigation";
import { Bell, Home, MessageCircle, Settings, Users } from "lucide-react";

export default function ChooseHandymanPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const service = searchParams.get("service"); // e.g. "Plumbing"

  const handymen = [
    { name: "Kenji Teneka", rating: 5.0, reviews: 13, price: 55, image: "/images/kenji.jpg" },
    { name: "Luke Moretti", rating: 4.7, reviews: 11, price: 40, image: "/images/luke.jpg" },
    { name: "Johnny Consey", rating: 4.5, reviews: 8, price: 35, image: "/images/johnny.jpg" },
  ];

  // Function to handle choosing a handyman
  const handleChoose = (person: typeof handymen[0]) => {
    router.push(`/hire-handyman?name=${encodeURIComponent(person.name)}&price=${person.price}&service=${encodeURIComponent(service || '')}`
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-200">
      {/* Header */}
      <div className="bg-cyan-500 p-4 text-center">
        <h1 className="text-xl font-bold text-white">
          {service ? `Choose Handyman for ${service}` : "Choose Handyman"}
        </h1>
        <p className="text-sm text-white mt-1">
          Compare and choose the right handyman for your job <br />
          — fast, trusted, and nearby.
        </p>
      </div>

      {/* Handyman List */}
      <div className="flex-1 p-4 space-y-4">
        {handymen.map((person, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <img
              src={person.image}
              alt={person.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-bold">{person.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-yellow-500 text-white px-2 rounded text-sm">
                  {person.rating.toFixed(1)}
                </span>
                <span className="text-yellow-500">
                  {"⭐".repeat(Math.round(person.rating))}
                </span>
                <span className="text-gray-500 text-sm">[{person.reviews} reviews]</span>
              </div>
              <p className="mt-1 text-gray-700 font-medium">💵 {person.price} CAD/hr</p>
            </div>
            <button
              className="bg-cyan-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-teal-600"
              onClick={() => handleChoose(person)}
            >
              Choose
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-cyan-500 flex justify-around items-center h-14">
        <button onClick={() => router.push("/")} className="cursor-pointer hover:text-white transition">
          <Home className="w-6 h-6 text-black" />
        </button>
        <button onClick={() => router.push("/messages")} className="cursor-pointer hover:text-white transition">
          <MessageCircle className="w-6 h-6 text-black" />
        </button>
        <button onClick={() => router.push("/portfolio")} className="cursor-pointer hover:text-white transition">
          <Users className="w-6 h-6 text-black" />
        </button>
        <button onClick={() => router.push("/notifications")} className="relative cursor-pointer hover:text-white transition">
          <Bell className="w-6 h-6 text-black" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>
        <button onClick={() => router.push("/settings")} className="cursor-pointer hover:text-white transition">
          <Settings className="w-6 h-6 text-black" />
        </button>
      </div>
    </div>
  );
}
