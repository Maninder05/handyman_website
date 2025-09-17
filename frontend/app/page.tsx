"use client"; //this makes current comp a Client Component i.e., being bundled and able to run in the browser so that hooks & event listeners can be implemented
import Image from "next/image";
import {useState} from 'react';
import { signIn } from "next-auth/react"; // for Google/Facebook OAuth

export default function LandingPage() {
  const [showSignup, setShowSignup] = useState(false);

  // form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  // validation messages
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!username.trim()) {
      newErrors.username = "Username cannot be empty";
    }

    // simple regex for emails
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      newErrors.email = "Enter a valid email address";
    }

    // password must be min 8 chars & 1 special char
    if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.password =
        "Password must be at least 8 chars long and contain a special character";
    }

    if (!userType) {
      newErrors.userType = "Please select a user type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form is valid ✅ (Here you’d connect with your backend API)");
    }
  };

  return (
    <main className="bg-neutral-900 min-h-screen text-neutral-100">
      {/* Navbar */}
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
            <a href="#services" className="hover:text-blue-400 transition">
              Services
            </a>
            {/* defining path to direct to a diff pg */}
            <a href="/about-us" className="hover:text-blue-400 transition">  
              About
            </a>
            {/* directing to another component within the same pg */}
            <a href="#facts" className="hover:text-blue-400 transition">
              Facts
            </a>
            <a href="#contact" className="hover:text-blue-400 transition">
              Contact
            </a>
            <button
              onClick={() => setShowSignup(true)}
              className="ml-6 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-neutral-900 rounded-lg shadow transition"
            >
              Sign Up
            </button>
            <a
              href="/auth/login"
              className="px-4 py-2 border border-yellow-400 text-yellow-400 rounded-lg hover:bg-neutral-800 transition"
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
          <p className="text-blue-400 font-semibold uppercase tracking-wider mb-3">
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
            href="/auth/signup"
            className="px-8 py-3 bg-blue-400 hover:bg-blue-500 text-neutral-900 rounded-xl text-lg font-medium shadow-lg transition"
          >
          Get Started Now
          </a>
        </div>
      </section>

      {/* Our Services */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-center text-blue-400 mb-12">
          Our Services
        </h3>
        {/* Cards will be rendered on the screen in the form of array elements recursively so as to use shared styling  */}
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
              className="p-6 bg-neutral-950 rounded-2xl border border-neutral-800 hover:border-blue-500 hover:shadow-lg hover:shadow-cyan-500/20 transition"
            >
              {/* Image Container Div */}
              <div className="relative w-85 h-70 rounded-xl overflow-hidden mb-1">
              <Image
              src={s.img}
              alt={s.title}
              fill                        // Now the img will hv the same w/h as the parent container
              />
              </div>
              <h4 className="font-semibold text-lg text-blue-400 mb-2">
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
            <h4 className="text-4xl font-bold text-blue-400 mb-2">10,000+</h4>
            <p className="text-neutral-400">Repairs completed this year</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-blue-400 mb-2">45 min</h4>
            <p className="text-neutral-400">Average response time</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-blue-400 mb-2">98%</h4>
            <p className="text-neutral-400">Customer satisfaction rate</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-400 to-blue-200 py-16">
        <div className="max-w-5xl mx-auto text-center text-neutral-900">
          <h3 className="text-3xl font-bold mb-4">Ready to get started?</h3>
          <p className="mb-6 text-lg">
            Book trusted professionals today and make your home repairs
            stress-free.
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
              Reliable fixes at your doorstep. We make home repairs hassle-free
              with professional service.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="hover:text-blue-400">
                  Services
                </a>
              </li>
              <li>
                <a href="/about-us" className="hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/help" className="hover:text-blue-400">
                  Help
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 id="contact" className="text-lg font-semibold mb-4 text-blue-400">
              Contact
            </h4>
            <p className="text-sm">📍 Calgary, AB</p>
            <p className="text-sm">📞 +1 825-123-4567</p>
            <p className="text-sm">✉ support@handyman.com</p>
          </div>
        </div>
        <div className="text-center mt-8 text-xs text-neutral-500">
          {/* Date obj renders getFullYear() method for calc the current date n time and returning current yr */}
          © {new Date().getFullYear()} Handyman Services. All rights reserved.    
        </div>
      </footer>

      {/* **************** SIGNUP MODAL******************************* */}
      {showSignup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl w-full max-w-md p-8 scale-95 hover:scale-100 transition-transform">
            {/* Close Button */}
            <button
              onClick={() => setShowSignup(false)}
              className="absolute top-3 right-3 text-neutral-400 hover:text-white"
            >
              ✕
            </button>
      
            {/* Title + tagline */}
            <h2 className="text-2xl font-bold text-blue-400 mb-2 text-center">
              Create Your Account
            </h2>
            <p className="text-sm text-neutral-400 mb-6 text-center">
              Join thousands of homeowners trusting us every day.
            </p>
      
            {/* Form */}
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Username */}
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-blue-400 outline-none"
                  required
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>
      
              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-blue-400 outline-none"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
      
              {/* Password */}
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-blue-400 outline-none"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
      
              {/* User Type (Side by Side Buttons) */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setUserType("customer")}
                  className={`w-1/2 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm transition ${
                    userType === "customer"
                      ? "bg-blue-400 text-black border-blue-400"
                      : "bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-blue-400"
                  }`}
                >
                  <Image
                    src="/images/dummy-client.jpg"
                    alt="Customer"
                    width={30}
                    height={30}
                  />
                  <span>Customer</span>
                </button>
      
                <button
                  type="button"
                  onClick={() => setUserType("handyman")}
                  className={`w-1/2 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm transition ${
                    userType === "handyman"
                      ? "bg-blue-400 text-black border-blue-400"
                      : "bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-blue-400"
                  }`}
                >
                  <Image
                    src="/images/dummy-handyman.jpg"
                    alt="Handyman"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <span>Handyman</span>
                </button>
              </div>
              {errors.userType && (
                <p className="text-red-500 text-sm mt-1">{errors.userType}</p>
              )}
      
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-400 hover:bg-blue-500 text-black py-2 rounded-lg transition"
              >
                Sign Up
              </button>
            </form>
      
            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-neutral-700"></div>
              <span className="px-2 text-neutral-500 text-xs">OR</span>
              <div className="flex-1 h-px bg-neutral-700"></div>
            </div>
      
            {/* Social Login tags */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => signIn("google")}
                className="flex items-center gap-2 justify-center px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm cursor-pointer hover:border-cyan-400 transition"
              >
                <Image src="/images/google-icon.png" alt="Google" width={30} height={30} />
                <span>Sign up with Google</span>
              </button>
              <button
                onClick={() => signIn("facebook")}
                className="flex items-center gap-2 justify-center px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm cursor-pointer hover:border-cyan-400 transition"
              >
                <Image src="/images/facebook-icon.png" alt="Facebook" width={30} height={30} />
                <span>Sign up with Facebook</span>
              </button>
            </div>
      
            {/* Already have an account */}
            <p className="text-sm text-neutral-400 mt-4 text-center">
              Already have an account?{" "}
              <a href="/auth/login" className="text-blue-400 hover:underline">
                Login
              </a>
            </p>
      
            {/* Forgot Password at the end */}
            <p className="text-sm text-blue-400 mt-2 cursor-pointer hover:underline text-center">
              Forgot Password?
            </p>
          </div>
        </div>
      )}
    </main>
  );
}


