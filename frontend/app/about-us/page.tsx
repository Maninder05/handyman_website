"use client";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-neutral-900 min-h-screen text-neutral-100">
      {/* Header */}
      <header className="w-full bg-neutral-950 border-b border-neutral-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/images/handyman-logo.jpg"
              alt="Handyman Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-xl font-bold text-blue-400">
              Handyman Services
            </h1>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium">
            {/* redirect to landing page */}
            <a href="/" className="hover:text-blue-400 transition">
              Home
            </a>
            <a href="#team" className="hover:text-blue-400 transition">
              Team
            </a>
            <a href="#story" className="hover:text-blue-400 transition">
              Our Story
            </a>
            <a href="#values" className="hover:text-blue-400 transition">
              Values
            </a>
          </nav>
        </div>
      </header>

      {/* Main Card */}
      <section
        className="relative w-full h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/about-us.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white max-w-3xl px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-neutral-900">
            About Handyman Services
          </h2>
          <p className="text-lg md:text-xl mb-6 text-neutral-100">
            Learn more about our journey, our team, and the values that drive
            us to deliver reliable home repair services every day.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="max-w-7xl mx-auto px-6 py-16">
        {/* Here h3 and p tags are enclosed within the grid for uniform alignment */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-blue-400 mb-6">
              Our Story
            </h3>
            <p className="text-neutral-300 mb-4">
              Handyman Services started with a simple mission: to make home
              repairs stress-free and reliable. Over the years, we've grown
              into a team of skilled professionals trusted by thousands of
              homeowners across Calgary and beyond.
            </p>
            <p className="text-neutral-300">
              From quick fixes to major renovations, we combine expertise,
              efficiency, and trust to deliver top-notch service to every
              client.
            </p>
          </div>
          <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/40 transition">
            <Image
              src="/images/our-story.png"
              alt="Our Story"
              fill
              className="object-cover"     //to adjust the image w/h so that it ultimately matches with the container's dimensions and covers it entirely 
            />
          </div>
        </div>
      </section>

      {/* Team Member Cards */}
      <section id="team" className="bg-neutral-950 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-blue-400 mb-12">
            Meet the Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Joe Kannis", role: "Founder & CEO", img: "/images/ceo.jpg" },
              { name: "Paul Byrenne", role: "Lead Technician", img: "/images/lead-technician.jpg" },
              { name: "Kristine Thomas", role: "Operations Manager", img: "/images/operation-manager.png" },
              { name: "John Doe", role: "Customer Support", img: "/images/customer-support.jpg" },
            ].map((member, i) => (
              <div
                key={i}
                className="group relative bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/40 transition"
              >
                <div className="relative w-full h-80">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h4 className="font-semibold text-blue-300">{member.name}</h4>
                  <p className="text-neutral-400 text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section id="values" className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-center text-blue-400 mb-12">
          Our Values
        </h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-neutral-950 rounded-2xl border border-neutral-800 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20 transition">
            <h4 className="font-semibold text-lg text-blue-300 mb-2">Trust</h4>
            <p className="text-neutral-400 text-sm">
              Building long-lasting relationships through honesty and reliability.
            </p>
          </div>
          <div className="p-6 bg-neutral-950 rounded-2xl border border-neutral-800 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20 transition">
            <h4 className="font-semibold text-lg text-blue-300 mb-2">Quality</h4>
            <p className="text-neutral-400 text-sm">
              Delivering exceptional service on every project, big or small.
            </p>
          </div>
          <div className="p-6 bg-neutral-950 rounded-2xl border border-neutral-800 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20 transition">
            <h4 className="font-semibold text-lg text-blue-300 mb-2">Efficiency</h4>
            <p className="text-neutral-400 text-sm">
              Completing tasks quickly without compromising quality or safety.
            </p>
          </div>
        </div>
      </section>

      {/* CTAs*/}
      <section className="bg-gradient-to-r from-blue-300 to-blue-200 py-16">
        <div className="max-w-5xl mx-auto text-center text-neutral-900">
          <h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
          <p className="mb-6 text-lg">
            Become a part of the Handyman family and enjoy reliable services at your doorstep.
          </p>
          <a
            href="/auth/signup"
            className="px-8 py-3 bg-neutral-900 hover:bg-neutral-800 text-blue-400 rounded-xl text-lg font-medium shadow-lg transition"
          >
            Sign Up Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-400 py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">
              Handyman Services
            </h4>
            <p className="text-sm">
              Reliable fixes at your doorstep. We make home repairs hassle-free with professional service.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-400">Home</a></li>
              <li><a href="#team" className="hover:text-blue-400">Team</a></li>
              <li><a href="#story" className="hover:text-blue-400">Our Story</a></li>
              <li><a href="#values" className="hover:text-blue-400">Values</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Contact</h4>
            <p className="text-sm">📍 Calgary, AB</p>
            <p className="text-sm">📞 +1 825-123-4567</p>
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
