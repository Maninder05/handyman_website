"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {FiHome, FiMessageCircle, FiHelpCircle, FiBell, FiSettings, FiPlus, FiSend } from "react-icons/fi";

export default function MessagesPage() {
  const handyman = {
    name: "Kenji Teneka",
    image: "/images/profile.jpg",
    price: 55,
  };

  const messages = [
    { text: "Hello, I need your help with wiring repair.", sender: "client" },
    { text: "Sure! I can help you tomorrow.", sender: "handyman" },
    { text: "Great! What time are you available?", sender: "client" },
    { text: "I can come at 10 AM.", sender: "handyman" },
    { text: "Perfect, see you then.", sender: "client" },
    { text: "See you!", sender: "handyman" },
  ];

  return (
    <main className="bg-neutral-100 min-h-screen flex flex-col">
      {/* Header */}
      <section className="bg-cyan-500 py-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Messages</h1>
      </section>
    
      {/* Handyman Header */}
      <section className="bg-white py-4 px-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-neutral-300">
            <Image
              src={handyman.image}
              alt={handyman.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-left">
            <p className="font-bold text-neutral-900">{handyman.name}</p>
            <p className="text-neutral-700 font-semibold">${handyman.price} CAD/HR</p>
          </div>
        </div>

        {/* Button */}
        <div>
          <Link
            href="/hire-handyman"
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-cyan-600"
          >
            Hire Me
          </Link>
        </div>
      </section>

      {/* Messages Screen */}
      <section className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gray-200">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "client" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-xl break-words ${
                msg.sender === "client"
                  ? "bg-white text-neutral-900 rounded-bl-none"
                  : "bg-cyan-500 text-white rounded-br-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </section>

      {/* Input Bar */}
      <section className="bg-white flex items-center px-4 py-3 gap-3 shadow-md">
        {/* Add Icon */}
        <button className="bg-gray-300 p-3 rounded-full hover:bg-gray-400">
          <FiPlus size={20} />
        </button>

        <input
          type="text"
          placeholder="Type Here"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder:text-black"
        />
        <FiSend size={24} className="text-cyan-500 cursor-pointer" />
      </section>

      {/* Footer */}
      <footer className="bg-cyan-500 py-4 mt-auto">
        <div className="flex justify-around items-center text-neutral-900 text-sm font-medium">
          <Link href="/" className="flex flex-col items-center gap-1">
            <FiHome size={20} /> Home
          </Link>
          <Link href="/messages" className="flex flex-col items-center gap-1">
            <FiMessageCircle size={20} /> Messages
          </Link>
          <Link href="/help" className="flex flex-col items-center gap-1">
            <FiHelpCircle size={20} /> Help
          </Link>
          <Link href="/notifications" className="flex flex-col items-center gap-1">
            <FiBell size={20} /> Notifications
          </Link>
          <Link href="/settings" className="flex flex-col items-center gap-1">
            <FiSettings size={20} /> Settings
          </Link>
        </div>
      </footer>
    </main>
  );
}
