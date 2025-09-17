"use client";
 
import { useSearchParams } from "next/navigation";


import { Bell, Home, MessageCircle, Settings, Users } from "lucide-react";
 
export default function ChooseHandymanPage() {


  const searchParams = useSearchParams();


  const service = searchParams.get("service"); // service = Plumbing
 
  const handymen = [


    { name: "Kenji Teneka", rating: 5.0, reviews: 13, price: 55, image: "/images/kenji.jpg" },


    { name: "Luke Moretti", rating: 4.7, reviews: 11, price: 40, image: "/images/luke.jpg" },


    { name: "Johnny Consey", rating: 4.5, reviews: 8, price: 35, image: "/images/johnny.jpg" },


  ];
 
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
<img src={person.image} alt={person.name} className="w-16 h-16 rounded-full object-cover" />
<div className="flex-1">
<p className="font-bold">{person.name}</p>
<div className="flex items-center gap-2">
<span className="bg-yellow-500 text-white px-2 rounded text-sm">{person.rating.toFixed(1)}</span>
<span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
<span className="text-gray-500 text-sm">[{person.reviews} reviews]</span>
</div>
<p className="mt-1 text-gray-700 font-medium">💵 {person.price} CAD/hr</p>
</div>
<button className="bg-cyan-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-teal-600">
  Choose
</button>
</div>


        ))}
</div>
 
      {/* Bottom Navigation */}
<div className="bg-cyan-500 flex justify-around items-center py-3">
<button><Home className="w-7 h-7 text-black" /></button>
<button><MessageCircle className="w-7 h-7 text-black" /></button>
<button><Users className="w-7 h-7 text-black" /></button>
<button className="relative">
<Bell className="w-7 h-7 text-black" />
<span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
</button>
<button><Settings className="w-7 h-7 text-black" /></button>
</div>
</div>


  );


}
 