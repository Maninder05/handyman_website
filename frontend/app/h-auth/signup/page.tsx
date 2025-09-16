"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();

  const [role, setRole] = useState("Handyman");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    // Username validation
    if (!username) {
      setUsernameError("This field is required.");
      hasError = true;
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setUsernameError("Username must only contain letters and numbers.");
      hasError = true;
    }

    // Email validation
    if (!email) {
      setEmailError("This field is required.");
      hasError = true;
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      setEmailError("Email must end with @gmail.com.");
      hasError = true;
    }

    // Password validation
    if (!password) {
      setPasswordError("This field is required.");
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      hasError = true;
    }

    // Only redirect if no errors
    {/* path to dashboard after sign up */}
    if (!hasError) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-700 ease-out opacity-0 animate-fadeSlideIn">
        {/* Header */}
        <div className="bg-cyan-400 p-6 text-center">
          <Image
            src="/images/handymenlogo.jpg"
            alt="Handyman"
            width={80}
            height={80}
            className="mx-auto"
          />
          <h2 className="text-lg mt-2 text-white font-semibold">
            We will get everything fixed for you !
          </h2>
        </div>

        <div className="p-6">
          {/* Toggle */}
          <div className="flex justify-center mb-6">
            <div className="relative flex bg-neutral-100 rounded-full p-1 w-64">
              <span
                className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-cyan-400 transition-transform duration-300 ${
                  role === "Handyman" ? "translate-x-0" : "translate-x-full"
                }`}
              />
              <button
                type="button"
                onClick={() => setRole("Handyman")}
                className={`relative flex-1 z-10 py-2 rounded-full font-medium transition ${
                  role === "Handyman" ? "text-white" : "text-gray-600"
                }`}
              >
                Handyman
              </button>
              <button
                type="button"
                onClick={() => setRole("Client")}
                className={`relative flex-1 z-10 py-2 rounded-full font-medium transition ${
                  role === "Client" ? "text-white" : "text-gray-600"
                }`}
              >
                Client
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-cyan-400 focus:outline-none text-black transition transform focus:scale-[1.02]"
                placeholder="username123"
              />
              {usernameError && (
                <p className="text-red-500 text-sm mt-1 animate-fadeIn">
                  {usernameError}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none text-black transition transform focus:scale-[1.02]"
                placeholder="xyz@gmail.com"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1 animate-fadeIn">
                  {emailError}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-cyan-400 focus:outline-none text-black transition transform focus:scale-[1.02]"
                placeholder="********"
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1 animate-fadeIn">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            {/* path to forgot password page */}
            <div className="text-right">
              <a href="#" className="text-sm text-red-400 hover:underline">
                Forgot Password? Reset
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="block w-full bg-cyan-400 text-white text-center py-2 rounded-lg transition transform hover:scale-105 hover:shadow-lg"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          {/* path to sign up page */}
          <div className="mt-4 text-center">
            <p className="text-sm text-black">
              Already have an account?{" "}
              <Link
                href="/h-auth/login"
                className="text-cyan-400 font-medium hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>

          {/* Social Sign In */}
          <div className="flex justify-center gap-6 mt-6">
            {/* Google */}
            {/* path to google login */}
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white border rounded-lg flex items-center justify-center transition transform hover:scale-110 hover:shadow-lg"
            >
              <Image
                src="/images/googleicon.png"
                alt="Google"
                width={24}
                height={24}
              />
            </a>
            {/* GitHub */}
            {/* path to github login */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white border rounded-lg flex items-center justify-center transition transform hover:scale-110 hover:shadow-lg"
            >
              <Image
                src="/images/githublogo.png"
                alt="GitHub"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeSlideIn {
          animation: fadeSlideIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
