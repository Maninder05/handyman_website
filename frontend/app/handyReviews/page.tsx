"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiHome, FiMessageCircle, FiHelpCircle, FiBell, FiSettings } from "react-icons/fi";
 
export default function ReviewsPage() {
  const allReviews = [
    {
      name: "Marlene Bonelyn",
      rating: 5,
      job: "Residential Wiring Repair",
      comment:
        "He was punctual, professional, and explained every step clearly. The wiring was done very neatly. Thanks!",
      image: "/images/client1.jpg",
    },
    {
      name: "Asha Sharma",
      rating: 4,
      job: "Load Repair",
      comment:
        "Very skilled and quick service, though slightly delayed arrival. Overall very satisfied!",
      image: "/images/client2.jpg",
    },
    {
      name: "Chris Mathem",
      rating: 3,
      job: "Voltage Maintenance",
      comment: "Work was okay, but could have been faster. Communication was fine.",
      image: "/images/client3.jpg",
    },
  ];
 
  // Featured review = first review with rating === 5
  const featured = allReviews.find((r) => r.rating === 5);
 
  //using filter state to update the reviews based on the setFilter() fxn that gets triggered everytime dropdown menu input changes
  const [filter, setFilter] = React.useState("Most Recent");
 
  // Dynamic min and max ratings
  const maxRating = Math.max(...allReviews.map((r) => r.rating)); //allReviews obj is destructured
  const minRating = Math.min(...allReviews.map((r) => r.rating)); //returns an array of all reviews whose rating equals the min rating
 
  // Apply filter
  const filteredReviews =
    filter === "Highest Rated"
      ? allReviews.filter((r) => r.rating === maxRating)
      : filter === "Lowest Rated"
      ? allReviews.filter((r) => r.rating === minRating)
      : allReviews;
 