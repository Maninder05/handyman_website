"use client";

import Link from "next/link";
import Image from "next/image";

export default function SigninPage() {

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop page refresh

    const form = e.currentTarget;
    const formData = new FormData(form);

    const username = formData.get("username")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    const userErr = document.getElementById("usernameError");
    const emailErr = document.getElementById("emailError");
    const passErr = document.getElementById("passwordError");
    const goLink = document.getElementById("goDashboard") as HTMLAnchorElement | null;

    if (!userErr || !emailErr || !passErr || !goLink) return;

    // clear old errors
    userErr.textContent = "";
    emailErr.textContent = "";
    passErr.textContent = "";

    let hasError = false;

    if (!username) {
      userErr.textContent = "This field is required.";
      hasError = true;
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      userErr.textContent = "Username must only have letters and numbers.";
      hasError = true;
    }

    if (!email) {
      emailErr.textContent = "This field is required.";
      hasError = true;
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      emailErr.textContent = "Email must end with @gmail.com.";
      hasError = true;
    }

    if (!password) {
      passErr.textContent = "This field is required.";
      hasError = true;
    } else if (password.length < 8) {
      passErr.textContent = "Password must be at least 8 characters.";
      hasError = true;
    }

    // if no errors, just click the hidden link to go to dashboard
    if (!hasError) {
      goLink.click();   // 👈 triggers the normal link
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">

        {/* top logo and heading */}
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

        {/* form area */}
        <div className="p-6">
          <form onSubmit={handleFormSubmit} className="space-y-4">

            <div>
              <label className="block text-gray-600 text-sm mb-1">Username</label>
              <input
                name="username"
                type="text"
                placeholder="username123"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none text-black"
              />
              <p id="usernameError" className="text-red-500 text-sm mt-1"></p>
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="xyz@gmail.com"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none text-black"
              />
              <p id="emailError" className="text-red-500 text-sm mt-1"></p>
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="********"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none text-black"
              />
              <p id="passwordError" className="text-red-500 text-sm mt-1"></p>
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

          {/* hidden link to go to dashboard after successful login */}
          <Link id="goDashboard" href="/h-portfolio" className="hidden">
            Go
          </Link>

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
