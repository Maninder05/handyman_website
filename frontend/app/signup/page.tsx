"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function Signup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultMode = searchParams.get("mode") === "login";

  const [showSignup, setShowSignup] = useState(!defaultMode);
  const [showLogin, setShowLogin] = useState(defaultMode);

  // Signup state
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // ---------- Validation ----------
  const validateSignup = () => {
    const errs: Record<string, string> = {};
    if (username.trim().length < 3) errs.username = "Username must be at least 3 characters";
    if (!email.includes("@")) errs.email = "Invalid email format";
    if (password.length < 6) errs.password = "Password must be at least 6 characters";
    if (!["customer", "handyman"].includes(userType)) errs.userType = "Select a valid user type";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateLogin = () => {
    const errs: Record<string, string> = {};
    if (!loginEmail.includes("@")) errs.email = "Invalid email format";
    if (loginPassword.length < 6) errs.password = "Password must be at least 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // If OAuth returned token in query -> save and redirect
  useEffect(() => {
    const token = searchParams.get("token");
    const type = searchParams.get("userType");
    
    if (token) {
      localStorage.setItem("token", token);
      
      //  FIXED: Redirect based on user type
      if (type === "customer") {
        router.push("/clientProfile");
      } else {
        router.push("/handyDashboard");
      }
    }
  }, [searchParams, router]);

  // ---------- API Calls ----------
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) return;

    try {
      const res = await axios.post(
        `${API_BASE}/api/users/signup`,
        { username, email, password, userType },
        { withCredentials: true }
      );

      alert(res.data.message || "Signup successful");
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      
      setShowSignup(false);
      
      //  FIXED: Redirect based on userType
      if (userType === "customer") {
        router.push("/clientDashboard");
      } else {
        router.push("/handyDashboard");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;

    try {
      const res = await axios.post(
        `${API_BASE}/api/users/login`,
        { email: loginEmail, password: loginPassword },
        { withCredentials: true }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      
      setShowLogin(false);
      
      //  FIXED: Redirect based on userType from backend response
      if (res.data.userType === "customer") {
        router.push("/clientDashboard");
      } else {
        router.push("/handyDashboard");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // OAuth redirects to backend. Backend will redirect back to this page with ?token=...
  const oauthGoogle = () => {
    window.location.href = `${API_BASE}/api/users/auth/google`;
  };
  const oauthFacebook = () => {
    window.location.href = `${API_BASE}/api/users/auth/facebook`;
  };

  return (
    <main className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl w-full max-w-md p-8 scale-95 hover:scale-100 transition-transform">
            <button
              onClick={() => {
                setShowSignup(false);
                router.push("/");
              }}
              className="absolute top-3 right-3 text-neutral-400 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-[#FFCC66] mb-2 text-center">
              Create Your Account
            </h2>
            <p className="text-sm text-neutral-400 mb-6 text-center">
              Join thousands of homeowners trusting us every day.
            </p>
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-[#FFCC66] outline-none"
                  required
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-[#FFCC66] outline-none"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-[#FFCC66] outline-none"
                  required
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* User Type Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setUserType("customer")}
                  className={`w-1/2 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm transition ${
                    userType === "customer"
                      ? "bg-[#FFCC66] text-black border-[#FFCC66]"
                      : "bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-[#FFCC66]"
                  }`}
                >
                  <Image src="/images/dummy-client.jpg" alt="Customer" width={30} height={30} />
                  <span>Customer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("handyman")}
                  className={`w-1/2 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm transition ${
                    userType === "handyman"
                      ? "bg-[#FFCC66] text-black border-[#FFCC66]"
                      : "bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-[#FFCC66]"
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
              {errors.userType && <p className="text-red-500 text-sm mt-1">{errors.userType}</p>}

              <button
                type="submit"
                className="w-full bg-[#FFCC66] hover:opacity-90 text-black py-2 rounded-lg transition"
              >
                Sign Up
              </button>
            </form>

            {/* Social Buttons */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-neutral-700"></div>
              <span className="px-2 text-neutral-500 text-xs">OR</span>
              <div className="flex-1 h-px bg-neutral-700"></div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={oauthGoogle}
                className="flex items-center gap-2 justify-center px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm cursor-pointer hover:border-[#FFCC66] transition"
              >
                <Image src="/images/google-icon.png" alt="Google" width={30} height={30} />
                <span>Sign up with Google</span>
              </button>
              <button
                onClick={oauthFacebook}
                className="flex items-center gap-2 justify-center px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm cursor-pointer hover:border-[#FFCC66] transition"
              >
                <Image src="/images/facebook-icon.png" alt="Facebook" width={30} height={30} />
                <span>Sign up with Facebook</span>
              </button>
            </div>

            <p className="text-sm text-neutral-400 mt-4 text-center">
              Already have an account?{" "}
              <a
                onClick={() => {
                  setShowSignup(false);
                  setShowLogin(true);
                }}
                className="text-[#FFCC66] cursor-pointer hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl w-full max-w-md p-8 scale-95 hover:scale-100 transition-transform">
            <button
              onClick={() => {
                setShowLogin(false);
                router.push("/");
              }}
              className="absolute top-3 right-3 text-neutral-400 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-[#FFCC66] mb-2 text-center">Welcome Back</h2>
            <p className="text-sm text-neutral-400 mb-6 text-center">
              Login to continue managing your home services.
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-[#FFCC66] outline-none"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-[#FFCC66] outline-none"
                  required
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-[#FFCC66] hover:opacity-90 text-black py-2 rounded-lg transition font-semibold"
              >
                Login
              </button>
            </form>

            {/* Social */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-neutral-700"></div>
              <span className="px-2 text-neutral-500 text-xs">OR</span>
              <div className="flex-1 h-px bg-neutral-700"></div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={oauthGoogle}
                className="flex items-center gap-2 justify-center px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm cursor-pointer hover:border-[#FFCC66] transition"
              >
                <Image src="/images/google-icon.png" alt="Google" width={30} height={30} />
                <span>Login with Google</span>
              </button>
              <button
                onClick={oauthFacebook}
                className="flex items-center gap-2 justify-center px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm cursor-pointer hover:border-[#FFCC66] transition"
              >
                <Image src="/images/facebook-icon.png" alt="Facebook" width={30} height={30} />
                <span>Login with Facebook</span>
              </button>
            </div>

            <p className="text-sm text-neutral-400 mt-4 text-center">
              Don&apos;t have an account?{" "}
              <a
                onClick={() => {
                  setShowLogin(false);
                  setShowSignup(true);
                }}
                className="text-[#FFCC66] hover:underline cursor-pointer"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      )}
    </main>
  );
}