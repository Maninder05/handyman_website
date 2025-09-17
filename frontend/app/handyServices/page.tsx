"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {FiHome, FiMessageCircle, FiHelpCircle, FiBell, FiSettings } from "react-icons/fi";  //Feather Icons for minimal, thin and modern design
 
export default function MyServicesPage() {
  //creating services arr so that map fxn can be implemented and each one of it's elements i.e. objs can be rendered recursively
  const services = [
    {
      name: "Residential Wiring Repair",
      image: "/images/wiring-fix.jpg",
      rating: 5,
      price: 55,
    },
    {
      name: "Load Repair",
      image: "/images/load-fixation.jpg",
      rating: 4,
      price: 50,
    },
    {
      name: "Voltage Maintenance",
      image: "/images/voltage-testing.jpg",
      rating: 3,
      price: 45,
    },
    {
      name: "Appliance Installation",
      image: "/images/outlet-repair.jpg",
      rating: 5,
      price: 60,
    },
  ];