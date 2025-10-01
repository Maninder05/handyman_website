"use client"; //this makes current comp a Client Component i.e., being bundled and able to run in the browser so that hooks & event listeners can be implemented
import Image from "next/image";
import { useRouter } from "next/navigation";
// import Footer from "@/components/Footer"


export default function LandingPage() {

  const router = useRouter();

  return (
  <main className="bg-neutral-900 min-h-screen text-neutral-100">
  {/* Navbar */}
  <header className="w-full bg-neutral-950 border-b border-neutral-800 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Image
          src="/images/handy-web-logo.jpg"
          alt="Handyman Logo"
          width={60}
          height={60}
          className="rounded-full"
        />
        <h1 className="text-xl font-bold text-[#FFCC66]">Handyman Services</h1>
      </div>
      <nav className="flex items-center gap-6 text-sm font-medium">
        <a href="#services" className="hover:text-[#FFCC66] transition">
          Services
        </a>
        <a href="/about-us" className="hover:text-[#FFCC66] transition">
          About
        </a>
        <a href="#facts" className="hover:text-[#FFCC66] transition">
          Facts
        </a>
        <a href="#contact" className="hover:text-[#FFCC66] transition">
          Contact
        </a>
         <button
          onClick={() => router.push("/signup")}
          className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FFCC66] to-[#FF7E5F] px-5 py-2 text-black font-bold transform transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
        Sign Up
        </button>
       <a
         onClick={() => router.push("/signup?mode=login")}
        className="px-4 py-2 border border-[#FFCC66] text-[#FFCC66] rounded-lg bg-black font-bold transform transition-transform duration-300 hover:scale-105 active:scale-95 hover:bg-[#f6ae1f] hover:text-black hover:border-black cursor-pointer"
       >
        Login
       </a>
      </nav>
    </div>
  </header>

  {/* Card */}
  <section
    className="relative w-full h-[80vh] flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: "url('/images/handyman-home.jpg')" }}
  >
    <div className="absolute inset-0 bg-black/60"></div>
    <div className="relative z-10 text-center text-white max-w-3xl px-4">
      <p className="text-[#FFCC66] font-semibold uppercase tracking-wider mb-3">
        Trusted by 5000+ Homeowners
      </p>
      <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
        Reliable Fixes, Right at Your Doorstep
      </h2>
      <p className="text-lg md:text-xl mb-8 text-neutral-200">
        From quick fixes to big renovations — our skilled handymen ensure
        quality, trust, and efficiency every time.
      </p>
     <a
      onClick={() => router.push("/signup")}
      className="px-5 py-2 rounded-xl text-lg shadow-lg bg-gradient-to-r from-[#FFCC66] to-[#FF7E5F] text-black font-bold transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 active:translate-y-1 active:scale-95 cursor-pointer inline-block"
     >
       Get Started Now 
     </a>
    </div>
  </section>

  {/* Our Services */}
  <section id="services" className="max-w-7xl mx-auto px-6 py-16">
    <h3 className="text-3xl font-bold text-center text-[#FFCC66] mb-12">
      Our Services
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: "Electrical Repairs",
          desc: "Safe and reliable wiring, outlet repair, and fixture installation.",
          img: "/images/elec-handyman.jpg",
        },
        {
          title: "Plumbing Solutions",
          desc: "Fix leaks, unclog drains, and install water systems with ease.",
          img: "/images/plumbing-handyman.jpg",
        },
        {
          title: "Furniture Assembly",
          desc: "Assemble flat-pack furniture and install shelves quickly and securely.",
          img: "/images/furniture-handyman.jpg",
        },
      ].map((s, i) => (
        <div
          key={i}
          className="p-6 bg-neutral-950 rounded-2xl border border-neutral-800 hover:border-[#FFCC66] hover:shadow-lg hover:shadow-[#FFCC66]/20 transition"
        >
          <div className="relative w-85 h-70 rounded-xl overflow-hidden mb-1">
            <Image src={s.img} alt={s.title} fill />
          </div>
          <h4 className="font-semibold text-lg text-[#FFCC66] mb-2">
            {s.title}
          </h4>
          <p className="text-neutral-400 text-sm">{s.desc}</p>
        </div>
      ))}
    </div>
  </section>

  {/* Facts */}
  <section
    id="facts"
    className="bg-neutral-950 py-16 border-y border-neutral-800"
  >
    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
      <div>
        <h4 className="text-4xl font-bold text-[#FFCC66] mb-2">10,000+</h4>
        <p className="text-neutral-400">Repairs completed this year</p>
      </div>
      <div>
        <h4 className="text-4xl font-bold text-[#FFCC66] mb-2">45 min</h4>
        <p className="text-neutral-400">Average response time</p>
      </div>
      <div>
        <h4 className="text-4xl font-bold text-[#FFCC66] mb-2">98%</h4>
        <p className="text-neutral-400">Customer satisfaction rate</p>
      </div>
    </div>
  </section>

  {/* CTA */}
  <section className="bg-gradient-to-r from-[#ecd4a6] to-[#eeb84b] py-16">
    <div className="max-w-5xl mx-auto text-center text-neutral-900">
      <h3 className="text-3xl font-bold mb-4">Ready to get started?</h3>
      <p className="mb-6 text-lg">
        Book trusted professionals today and make your home repairs stress-free.
      </p>
      <a
        onClick={() => router.push("/signup")}
        className="px-8 py-3 bg-neutral-900 hover:bg-neutral-800 text-[#FFCC66] rounded-xl text-lg font-medium shadow-lg transition"
      >
        Sign Up Now
      </a>
    </div>
  </section>

  {/* Footer */}
  <footer className="bg-neutral-950 text-neutral-400 py-10">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
      <div>
        <h4 className="text-lg font-semibold mb-4 text-[#FFCC66]">
          Handyman Services
        </h4>
        <p className="text-sm">
          Reliable fixes at your doorstep. We make home repairs hassle-free with
          professional service.
        </p>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4 text-[#FFCC66]">
          Quick Links 
        </h4>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="#services" className="hover:text-[#FFCC66]">
              Services
            </a>
          </li>
          <li>
            <a href="/about-us" className="hover:text-[#FFCC66]">
              About Us
            </a>
          </li>
          <li>
            <a href="/help" className="hover:text-[#FFCC66]">
              Help
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 id="contact" className="text-lg font-semibold mb-4 text-[#FFCC66]">
          Contact
        </h4>
        <p className="text-sm"> Calgary, AB</p>
        <p className="text-sm"> +1 825-123-4567</p>
        <p className="text-sm">✉ support@handyman.com</p>
      </div>
    </div>
    <div className="text-center mt-8 text-xs text-neutral-500">
      © {new Date().getFullYear()} Handyman Services. All rights reserved.
    </div>
  </footer>
  </main> 
  );
}



// //taken help from past projects
// //https://www.geeksforgeeks.org/
// //https://medium.com/nerd-for-tech
// //https://stackoverflow.com/questions


