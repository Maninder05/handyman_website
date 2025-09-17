"use client";

import Link from "next/link";
import Image from "next/image";

export default function OrderDetailsPage() {

  // show Accepted box
  function acceptOrder() {
    document.getElementById("accepted")!.style.display = "flex";
  }

  // show Declined box
  function declineOrder() {
    document.getElementById("declined")!.style.display = "flex";
  }

  // hide both boxes
  function closeBox() {
    document.getElementById("accepted")!.style.display = "none";
    document.getElementById("declined")!.style.display = "none";
  }

  return (
    <div style={{minHeight:"100vh"}} className="flex flex-col bg-neutral-100">
      
      {/* header */}
      <div className="bg-cyan-500 p-4 relative shadow-md flex items-center justify-center">
        <Link href="/portfolio">
          <button className="text-2xl absolute left-4 top-3 text-black">←</button>
        </Link>
        <h1 className="text-2xl font-bold text-black">Order Details</h1>
      </div>

      {/* main stuff */}
      <div className="flex-1 p-4 space-y-6">
        
        {/* booking info */}
        <div className="bg-white p-4 rounded-xl shadow-sm my-4 max-w-md mx-auto">
          <p className="text-sm text-gray-600">Booking ID: xx53@#!</p>
          <div className="flex items-center mt-3 gap-3">
            <div className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-lg">
              <span className="text-2xl">👷</span>
            </div>
            <div>
              <p className="font-semibold text-black text-sm">Residential Wiring Repair</p>
              <p className="text-xs text-gray-600">Date: <span className="text-black">25 July 2025</span></p>
              <p className="text-xs text-gray-600">Time: <span className="text-black">5:30 PM</span></p>
            </div>
          </div>
        </div>

        {/* buyer info */}
        <div className="bg-white p-4 rounded-xl shadow-sm my-4 max-w-md mx-auto">
          <h2 className="font-semibold mb-2 text-teal-600">Buyer Info</h2>
          <div className="flex gap-4 items-center">
            <Image
              src="/images/profilelogo.jpg"
              alt="buyer pic"
              width={56}
              height={56}
              className="rounded-full object-cover border border-teal-500 w-14 h-14"
            />
            <div>
              <p className="font-medium text-black">Mariene Bonelyn</p>
              <p className="text-green-600 text-xs">✅ Ready to Hire</p>
              <div className="mt-1 text-xs text-gray-700">
                <div>📧 marienebonelyn@gmail.com</div>
                <div>📞 +1 (587)-XXX-XXXX</div>
              </div>
            </div>
          </div>
        </div>

        {/* price info */}
        <div className="bg-white p-4 rounded-xl shadow-sm my-4 max-w-md mx-auto">
          <h2 className="font-semibold mb-2 text-teal-600">Price Details</h2>
          <div className="text-sm text-black flex justify-between"><span>Price</span><span>$55.00</span></div>
          <div className="text-sm text-black flex justify-between"><span>Subtotal</span><span>$55 + $5</span></div>
          <div className="font-bold text-black flex justify-between mt-1 text-sm"><span>Total</span><span>$60.00</span></div>
        </div>

        {/* buttons */}
        <div className="flex justify-center gap-4 my-6 max-w-md mx-auto w-full">
          <button onClick={acceptOrder} className="bg-teal-500 text-white px-6 py-2 rounded-full shadow">Accept Order</button>
          <button onClick={declineOrder} className="bg-red-500 text-white px-6 py-2 rounded-full shadow">Decline Order</button>
        </div>
      </div>

      {/* accepted popup */}
      <div id="accepted"
           style={{display:"none"}}
           className="fixed inset-0 items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white p-5 rounded-xl shadow-md text-center w-72 m-auto">
          <h2 className="font-bold text-lg text-black mb-3">✅ Order Accepted</h2>
          <p className="text-sm text-gray-700 mb-5">You accepted this order successfully.</p>
          <button onClick={closeBox} className="bg-teal-500 text-white px-5 py-2 rounded-lg">Close</button>
        </div>
      </div>

      {/* declined popup */}
      <div id="declined"
           style={{display:"none"}}
           className="fixed inset-0 items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white p-5 rounded-xl shadow-md text-center w-72 m-auto">
          <h2 className="font-bold text-lg text-black mb-3">❌ Order Declined</h2>
          <p className="text-sm text-gray-700 mb-5">You declined this order.</p>
          <button onClick={closeBox} className="bg-teal-500 text-white px-5 py-2 rounded-lg">Close</button>
        </div>
      </div>

      {/* ---------- footer nav ---------- */}
      <footer className="bg-cyan-500 py-4 mt-auto">
        <div className="flex justify-around items-center text-neutral-900 text-sm font-medium">
          <Link href="/h-portfolio" className="flex flex-col items-center gap-1">
            <span>🏠</span> Home
          </Link>
          <Link href="/messages" className="flex flex-col items-center gap-1">
            <span>💬</span> Messages
          </Link>
          <Link href="/help" className="flex flex-col items-center gap-1">
            <span>❓</span> Help
          </Link>
          <Link href="/notifications" className="flex flex-col items-center gap-1">
            <span>🔔</span> Notifications
          </Link>
          <Link href="/settings" className="flex flex-col items-center gap-1">
            <span>⚙️</span> Settings
          </Link>
        </div>
      </footer>
    </div>
  );
}
