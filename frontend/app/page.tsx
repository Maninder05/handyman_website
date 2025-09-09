// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <div>{"Test"}</div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
// app/signin/page.tsx (Next.js 13+ with App Router)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [role, setRole] = useState<"handyman" | "client">("client");
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Header */}
      <div className="relative bg-teal-500 text-center p-6">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="absolute left-4 top-4 text-white text-2xl font-bold hover:text-gray-200"
        >
          ←
        </button>

        <div>
          <p className="text-white mt-4 font-medium">
            Sign Up to book trusted handyman.
          </p>
        </div>

        {/* User Icon */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-24 flex items-center justify-center">
            <img src="/images/usersignup.png" alt="User Signup" />
          </div>
        </div>

        {/* Role Switch */}
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={() => setRole("handyman")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              role === "handyman"
                ? "bg-white text-teal-600"
                : "text-white hover:bg-teal-400"
            }`}
          >
            🧑‍🔧 Handyman
          </button>
          <button
            onClick={() => setRole("client")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              role === "client"
                ? "bg-white text-teal-600"
                : "text-white hover:bg-teal-400"
            }`}
          >
            👩 Client
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 space-y-4 max-w-lg mx-auto">
        <div>
          <label className="block text-xs font-bold text-gray-600">
            USERNAME
          </label>
          <input
            type="email"
            placeholder="xyz@gmail.com"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-600">
            PASSWORD
          </label>
          <input
            type="password"
            placeholder="**********"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-sm text-center">
          <a href="#" className="text-red-500 hover:underline">
            Forget Password?
          </a>{" "}
          <a href="#" className="text-gray-600 hover:underline">
            Reset
          </a>
        </div>

        {/* Sign Up Button */}
        <button 
              onClick={() => router.push("/portfolio")}
        className="w-full py-3 bg-gray-200 text-teal-600 font-semibold rounded-full hover:bg-teal-500 hover:text-white transition">
          Sign In
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          New to Handyman App?{" "}
          <a href="/auth/signup" className="text-teal-600 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

