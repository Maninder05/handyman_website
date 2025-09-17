"use client";


import Link from "next/link";
import Image from "next/image";


export default function OrderDetailsPage() {
  // track popup state (accepted / declined / null)
 

  // reset popup
  

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 text-neutral-800">
      {/* Header with Back Arrow */}
      <div className="bg-blue-500 p-4 relative shadow-md flex items-center justify-center">
        <Link href="/portfolio">
          <button className="text-2xl absolute left-4 top-3 text-white">←</button>
        </Link>
        <h1 className="text-2xl font-bold text-white">Order Details</h1>
      </div>

      {/* main content */}
      <div className="flex-1 p-4 space-y-6">
        {/* booking card */}
        <div className="bg-white p-4 rounded-xl shadow-sm my-4 max-w-md mx-auto">
          <p className="text-sm text-gray-600">Booking ID: xx53@#!</p>
          <div className="flex items-center mt-3 gap-3">
            <div className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-lg">
              <span className="text-2xl">👷</span>
            </div>
            <div>
              <p className="font-semibold text-neutral-800 text-sm">
                Residential Wiring Repair
              </p>
              <p className="text-xs text-gray-600">
                Date: <span className="text-neutral-800">25 July 2025</span>
              </p>
              <p className="text-xs text-gray-600">
                Time: <span className="text-neutral-800">5:30 PM</span>
              </p>
            </div>
          </div>
        </div>

        {/* buyer card */}
        <div className="bg-white p-4 rounded-xl shadow-sm my-4 max-w-md mx-auto">
          <h2 className="font-semibold mb-2 text-blue-500">Buyer Info</h2>
          <div className="flex gap-4 items-center">
            <Image
              src="/images/profilelogo.jpg"
              alt="buyer pic"
              width={56}
              height={56}
              className="rounded-full object-cover border border-blue-500 w-14 h-14"
            />
            <div>
              <p className="font-medium text-neutral-800">Mariene Bonelyn</p>
              <p className="text-green-600 text-xs">✅ Ready to Hire</p>
              <div className="mt-1 text-xs text-gray-700">
                <div className="flex items-center gap-1">
                  <span>📧</span>
                  <span className="hover:text-blue-600 cursor-pointer">
                    marienebonelyn@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span>📞</span>
                  <span className="hover:text-blue-600 cursor-pointer">
                    +1 (587)-XXX-XXXX
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* price card */}
        <div className="bg-white p-4 rounded-xl shadow-sm my-4 max-w-md mx-auto">
          <h2 className="font-semibold mb-2 text-blue-500">Price Details</h2>
          <div className="text-sm text-neutral-800 flex justify-between">
            <span>Price</span>
            <span>$55.00</span>
          </div>
          <div className="text-sm text-neutral-800 flex justify-between">
            <span>Subtotal</span>
            <span>$55 + $5</span>
          </div>
          <div className="font-bold text-neutral-800 flex justify-between mt-1 text-sm">
            <span>Total</span>
            <span>$60.00</span>
          </div>
        </div>

        </div>

     

    
    </div>
  );
}
