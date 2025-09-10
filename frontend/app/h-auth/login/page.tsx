"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();

  // form fields
  const [role, setRole] = useState("Handyman");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // errors
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // reset errors before checking again
    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    // username must exist and only letters/numbers
    if (!username) {
      setUsernameError("This field is required.");
      hasError = true;
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setUsernameError("Username must only contain letters and numbers.");
      hasError = true;
    }

    // email must exist and end with @gmail.com
    if (!email) {
      setEmailError("This field is required.");
      hasError = true;
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      setEmailError("Email must end with @gmail.com.");
      hasError = true;
    }

    // password must be at least 8 characters
    if (!password) {
      setPasswordError("This field is required.");
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      hasError = true;
    }

    // if all good then go to dashboard
    if (!hasError) {
      router.push("/h-portfolio");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        {/* top logo and text */}
        <div className="bg-cyan-600 p-6 text-center">
          <Image
            src="/images/handymenlogo.jpg"
            alt="Handyman Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
          <h2 className="text-lg mt-2 text-white font-semibold">
            Sign In to access handyman services
          </h2>
        </div>

        <div className="p-6">
          {/* role toggle */}
          <div className="flex justify-center mb-6">
            <div className="relative flex bg-gray-200 rounded-full p-1 w-64">
              <span
                className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-cyan-500 transition-transform ${
                  role === "Handyman" ? "translate-x-0" : "translate-x-full"
                }`}
              />
              <button
                type="button"
                onClick={() => setRole("Handyman")}
                className={`relative flex-1 z-10 py-2 rounded-full font-medium ${
                  role === "Handyman" ? "text-white" : "text-gray-600"
                }`}
              >
                Handyman
              </button>
              <button
                type="button"
                onClick={() => setRole("Client")}
                className={`relative flex-1 z-10 py-2 rounded-full font-medium ${
                  role === "Client" ? "text-white" : "text-gray-600"
                }`}
              >
                Client
              </button>
            </div>
          </div>

          {/* form inputs */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Username</label>
              <input
                type="text"
                placeholder="username123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none text-black"
              />
              {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="xyz@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none text-black"
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none text-black"
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-cyan-600 hover:underline">
                Forgot Password? Reset
              </a>
            </div>

            <button
              type="submit"
              className="block w-full bg-cyan-600 text-white text-center py-2 rounded-lg hover:shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* bottom links */}
          <div className="mt-4 text-center">
            <p className="text-sm text-black">
              Don’t have an account?{" "}
              <Link href="/h-auth/signup" className="text-cyan-600 font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          {/* social sign in */}
          <div className="flex justify-center gap-6 mt-6">
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white border rounded-lg flex items-center justify-center hover:shadow-lg"
            >
              <Image src="/images/googleicon.png" alt="Google" width={24} height={24} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white border rounded-lg flex items-center justify-center hover:shadow-lg"
            >
              <Image src="/images/githublogo.png" alt="GitHub" width={24} height={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
