"use client";

import { useState } from "react";

export default function HandymanLocator() {
  const [selectedArea, setSelectedArea] = useState<keyof typeof areas | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("map");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Sample handyman data by area - each area has unique handymen
  const areas = {
    tuscany: {
      name: "TUSCANY",
      handymen: 14,
      coordinates: { top: "15%", left: "15%" },
      handymenList: [
        {
          id: 1,
          name: "John Handyman",
          rating: 4.9,
          distance: "0.8 km",
          phone: "+1 (403) 555-0123",
          services: ["Plumbing", "Carpentry"],
        },
        {
          id: 2,
          name: "Mike Fixit",
          rating: 4.7,
          distance: "1.2 km",
          phone: "+1 (403) 555-0456",
          services: ["Electrical", "Painting"],
        },
        {
          id: 3,
          name: "Alex Repairs",
          rating: 4.8,
          distance: "0.5 km",
          phone: "+1 (403) 555-0789",
          services: ["General Repairs", "Assembly"],
        },
        {
          id: 4,
          name: "Tuscany Pro Services",
          rating: 4.6,
          distance: "1.5 km",
          phone: "+1 (403) 555-0198",
          services: ["Drywall", "Painting"],
        },
        {
          id: 5,
          name: "Mountain View Handyman",
          rating: 4.9,
          distance: "2.1 km",
          phone: "+1 (403) 555-0876",
          services: ["Deck Building", "Fencing"],
        },
      ],
    },
    brentwood: {
      name: "BRENTWOOD",
      handymen: 22,
      coordinates: { top: "15%", left: "75%" },
      handymenList: [
        {
          id: 6,
          name: "Dave Solutions",
          rating: 4.9,
          distance: "0.3 km",
          phone: "+1 (403) 555-0321",
          services: ["Plumbing", "HVAC"],
        },
        {
          id: 7,
          name: "Paul Repairs",
          rating: 4.6,
          distance: "0.9 km",
          phone: "+1 (403) 555-0654",
          services: ["Electrical", "Appliance Repair"],
        },
        {
          id: 8,
          name: "Brentwood Fixers",
          rating: 4.8,
          distance: "1.1 km",
          phone: "+1 (403) 555-0785",
          services: ["General Repairs", "Painting"],
        },
        {
          id: 9,
          name: "University Handyman",
          rating: 4.7,
          distance: "0.7 km",
          phone: "+1 (403) 555-0432",
          services: ["Furniture Assembly", "Mounting"],
        },
      ],
    },
    eagle: {
      name: "EAGLE RIDGE",
      handymen: 8,
      coordinates: { top: "50%", left: "35%" },
      handymenList: [
        {
          id: 10,
          name: "Eagle Handyman",
          rating: 4.8,
          distance: "1.1 km",
          phone: "+1 (403) 555-0987",
          services: ["Carpentry", "Painting"],
        },
        {
          id: 11,
          name: "Ridge Repair Services",
          rating: 4.7,
          distance: "0.8 km",
          phone: "+1 (403) 555-0765",
          services: ["Electrical", "Plumbing"],
        },
      ],
    },
    rundle: {
      name: "RUNDLE",
      handymen: 12,
      coordinates: { top: "75%", left: "75%" },
      handymenList: [
        {
          id: 12,
          name: "Rundle Repair Pros",
          rating: 4.7,
          distance: "0.7 km",
          phone: "+1 (403) 555-0765",
          services: ["General Repairs", "Assembly"],
        },
        {
          id: 13,
          name: "Fix It Fast",
          rating: 4.5,
          distance: "1.3 km",
          phone: "+1 (403) 555-0432",
          services: ["Plumbing", "Electrical"],
        },
        {
          id: 14,
          name: "Northeast Handyman",
          rating: 4.6,
          distance: "0.9 km",
          phone: "+1 (403) 555-0876",
          services: ["Painting", "Drywall"],
        },
      ],
    },
    crestmont: {
      name: "CRESTMONT",
      handymen: 7,
      coordinates: { top: "25%", left: "10%" },
      handymenList: [
        {
          id: 15,
          name: "Crestmont Craftsmen",
          rating: 4.9,
          distance: "0.4 km",
          phone: "+1 (403) 555-0876",
          services: ["Carpentry", "Custom Furniture"],
        },
        {
          id: 16,
          name: "Hilltop Handyman",
          rating: 4.8,
          distance: "1.2 km",
          phone: "+1 (403) 555-0543",
          services: ["Deck Building", "Fencing"],
        },
      ],
    },
    edgemont: {
      name: "EDGEMONT",
      handymen: 15,
      coordinates: { top: "25%", left: "65%" },
      handymenList: [
        {
          id: 17,
          name: "Edgemont Experts",
          rating: 4.8,
          distance: "0.6 km",
          phone: "+1 (403) 555-0543",
          services: ["Electrical", "Smart Home"],
        },
        {
          id: 18,
          name: "Precision Handyman",
          rating: 4.6,
          distance: "1.0 km",
          phone: "+1 (403) 555-0234",
          services: ["Painting", "Drywall"],
        },
        {
          id: 19,
          name: "North Star Repairs",
          rating: 4.7,
          distance: "0.8 km",
          phone: "+1 (403) 555-0654",
          services: ["Plumbing", "General Repairs"],
        },
      ],
    },
    aspen: {
      name: "ASPEN WOODS",
      handymen: 9,
      coordinates: { top: "50%", left: "65%" },
      handymenList: [
        {
          id: 20,
          name: "Aspen Woodworks",
          rating: 4.9,
          distance: "0.5 km",
          phone: "+1 (403) 555-0345",
          services: ["Cabinetry", "Custom Woodwork"],
        },
        {
          id: 21,
          name: "Westside Handyman",
          rating: 4.7,
          distance: "1.1 km",
          phone: "+1 (403) 555-0768",
          services: ["Painting", "Drywall"],
        },
      ],
    },
    bowness: {
      name: "BOWNESS",
      handymen: 11,
      coordinates: { top: "65%", left: "25%" },
      handymenList: [
        {
          id: 22,
          name: "Bowness Builders",
          rating: 4.7,
          distance: "0.8 km",
          phone: "+1 (403) 555-0678",
          services: ["Deck Building", "Fencing"],
        },
        {
          id: 23,
          name: "Riverbend Repairs",
          rating: 4.5,
          distance: "1.2 km",
          phone: "+1 (403) 555-0890",
          services: ["Plumbing", "General Repairs"],
        },
        {
          id: 24,
          name: "Bow Valley Handyman",
          rating: 4.6,
          distance: "0.9 km",
          phone: "+1 (403) 555-0324",
          services: ["Electrical", "Painting"],
        },
      ],
    },
  };

  // Filter areas based on search query
  // (filteredAreas was unused and has been removed)

  // Filter handymen based on search query for list view
  const filteredHandymen = Object.values(areas).flatMap((area) =>
    area.handymenList.filter(
      (handyman) =>
        handyman.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        handyman.services.some((service) =>
          service.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
  );

  type Handyman = {
    id: number;
    name: string;
    rating: number;
    distance: string;
    phone: string;
    services: string[];
  };

  const handleContact = (handyman: Handyman) => {
    alert(
      `Contacting ${handyman.name}\nPhone: ${
        handyman.phone
      }\nServices: ${handyman.services.join(", ")}`
    );
  };

  const handleAreaClick = (areaKey: keyof typeof areas) => {
    setSelectedArea(areaKey);
    setActiveTab("list");
    setShowSearchResults(false);
  };

  const handleBackToMap = () => {
    setSelectedArea(null);
    setActiveTab("map");
    setShowSearchResults(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      setShowSearchResults(true);
      setSelectedArea(null);
    } else {
      setShowSearchResults(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex flex-col">
      {/* Header */}
      <div className="bg-teal-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {activeTab === "list" && (
            <button
              className="text-white p-2 rounded-full hover:bg-teal-700 transition"
              onClick={handleBackToMap}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          <h1 className="text-xl font-bold">HandyPro Locator</h1>
          <button className="text-white p-2 rounded-full hover:bg-teal-700 transition">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-grow container mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === "map"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500"
              }`}
              onClick={() => {
                setActiveTab("map");
                setSelectedArea(null);
                setShowSearchResults(false);
              }}
            >
              Map View
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === "list"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500"
              }`}
              onClick={() => {
                setActiveTab("list");
                setShowSearchResults(false);
              }}
            >
              List View
            </button>
          </div>

          {/* Search Bar - Made more visible */}
          <div className="p-4 border-b border-gray-200 bg-teal-50">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Find Handymen in Calgary
            </h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search Location or Handyman"
                className="w-full pl-10 pr-4 py-3 border-2 border-teal-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black  placeholder:text-black bg-white"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4">
            {activeTab === "map" ? (
              <div>
                {/* Map Container */}
                <div className="bg-gray-100 rounded-xl h-96 mb-6 relative overflow-hidden border-2 border-teal-600">
                  {/* Calgary Map Visualization */}
                  <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
                    <div className="text-center w-full h-full relative">
                      {/* Quadrant Labels */}
                      <div className="absolute top-2 left-2 text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded-md shadow">
                        NW
                      </div>
                      <div className="absolute top-2 right-2 text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded-md shadow">
                        NE
                      </div>
                      <div className="absolute bottom-2 left-2 text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded-md shadow">
                        SW
                      </div>
                      <div className="absolute bottom-2 right-2 text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded-md shadow">
                        SE
                      </div>

                      {/* Bow River */}
                      <div className="absolute w-3/4 h-2 bg-blue-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"></div>

                      {/* Deerfoot Trail */}
                      <div className="absolute w-2 h-3/4 bg-gray-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"></div>

                      {/* Area Markers - Updated with better positioning */}
                      <div
                        className="absolute"
                        style={areas.tuscany.coordinates}
                      >
                        <button
                          className={`text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-110 ${
                            selectedArea === "tuscany"
                              ? "bg-red-600 ring-2 ring-red-300"
                              : "bg-red-500"
                          }`}
                          onClick={() => handleAreaClick("tuscany")}
                        >
                          {areas.tuscany.handymen}
                        </button>
                        <div className="text-xs mt-1 font-semibold text-gray-700 bg-white px-1 rounded shadow">
                          Tuscany
                        </div>
                      </div>

                      <div
                        className="absolute"
                        style={areas.brentwood.coordinates}
                      >
                        <button
                          className={`text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-110 ${
                            selectedArea === "brentwood"
                              ? "bg-red-600 ring-2 ring-red-300"
                              : "bg-red-500"
                          }`}
                          onClick={() => handleAreaClick("brentwood")}
                        >
                          {areas.brentwood.handymen}
                        </button>
                        <div className="text-xs mt-1 font-semibold text-gray-700 bg-white px-1 rounded shadow">
                          Brentwood
                        </div>
                      </div>

                      <div className="absolute" style={areas.eagle.coordinates}>
                        <button
                          className={`text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-110 ${
                            selectedArea === "eagle"
                              ? "bg-red-600 ring-2 ring-red-300"
                              : "bg-red-500"
                          }`}
                          onClick={() => handleAreaClick("eagle")}
                        >
                          {areas.eagle.handymen}
                        </button>
                        <div className="text-xs mt-1 font-semibold text-gray-700 bg-white px-1 rounded shadow">
                          Eagle Ridge
                        </div>
                      </div>

                      <div
                        className="absolute"
                        style={areas.rundle.coordinates}
                      >
                        <button
                          className={`text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-110 ${
                            selectedArea === "rundle"
                              ? "bg-red-600 ring-2 ring-red-300"
                              : "bg-red-500"
                          }`}
                          onClick={() => handleAreaClick("rundle")}
                        >
                          {areas.rundle.handymen}
                        </button>
                        <div className="text-xs mt-1 font-semibold text-gray-700 bg-white px-1 rounded shadow">
                          Rundle
                        </div>
                      </div>

                      <div
                        className="absolute"
                        style={areas.crestmont.coordinates}
                      >
                        <button
                          className={`text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-110 ${
                            selectedArea === "crestmont"
                              ? "bg-red-600 ring-2 ring-red-300"
                              : "bg-red-500"
                          }`}
                          onClick={() => handleAreaClick("crestmont")}
                        >
                          {areas.crestmont.handymen}
                        </button>
                        <div className="text-xs mt-1 font-semibold text-gray-700 bg-white px-1 rounded shadow">
                          Crestmont
                        </div>
                      </div>

                      <div
                        className="absolute"
                        style={areas.edgemont.coordinates}
                      >
                        <button
                          className={`text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-110 ${
                            selectedArea === "edgemont"
                              ? "bg-red-600 ring-2 ring-red-300"
                              : "bg-red-500"
                          }`}
                          onClick={() => handleAreaClick("edgemont")}
                        >
                          {areas.edgemont.handymen}
                        </button>
                        <div className="text-xs mt-1 font-semibold text-gray-700 bg-white px-1 rounded shadow">
                          Edgemont
                        </div>
                      </div>

                      <div className="absolute" style={areas.aspen.coordinates}>
                        <button
                          className={`text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-110 ${
                            selectedArea === "aspen"
                              ? "bg-red-600 ring-2 ring-red-300"
                              : "bg-red-500"
                          }`}
                          onClick={() => handleAreaClick("aspen")}
                        >
                          {areas.aspen.handymen}
                        </button>
                        <div className="text-xs mt-1 font-semibold text-gray-700 bg-white px-1 rounded shadow">
                          Aspen Woods
                        </div>
                      </div>

                      <div
                        className="absolute"
                        style={areas.bowness.coordinates}
                      >
                        <button
                          className={`text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-110 ${
                            selectedArea === "bowness"
                              ? "bg-red-600 ring-2 ring-red-300"
                              : "bg-red-500"
                          }`}
                          onClick={() => handleAreaClick("bowness")}
                        >
                          {areas.bowness.handymen}
                        </button>
                        <div className="text-xs mt-1 font-semibold text-gray-700 bg-white px-1 rounded shadow">
                          Bowness
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Legend */}
                <div className="mb-6 p-4 bg-teal-50 rounded-xl border border-teal-200">
                  <h3 className="font-semibold text-teal-800 mb-2">
                    Map Legend
                  </h3>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-700">
                      Number indicates available handymen in area
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-4 h-4 bg-blue-400 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-700">Bow River</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-4 h-4 bg-gray-600 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-700">
                      Deerfoot Trail
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {/* Back Button */}
                {selectedArea && (
                  <button
                    className="flex items-center text-teal-600 font-medium mb-4"
                    onClick={handleBackToMap}
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back to Map
                  </button>
                )}

                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  {showSearchResults
                    ? `Search Results for "${searchQuery}"`
                    : `Handymen in ${
                        selectedArea ? areas[selectedArea].name : "Calgary"
                      }`}
                </h2>

                {/* Handymen List */}
                <div className="space-y-4">
                  {(showSearchResults
                    ? filteredHandymen
                    : selectedArea
                    ? areas[selectedArea]?.handymenList
                    : Object.values(areas).flatMap((area) => area.handymenList)
                  ).length > 0 ? (
                    (showSearchResults
                      ? filteredHandymen
                      : selectedArea
                      ? areas[selectedArea]?.handymenList
                      : Object.values(areas).flatMap(
                          (area) => area.handymenList
                        )
                    ).map((handyman) => (
                      <div
                        key={handyman.id}
                        className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm"
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                            {handyman.name.charAt(0)}
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-bold text-gray-800">
                              {handyman.name}
                            </h3>
                            <div className="flex items-center mt-1">
                              <span className="text-yellow-500 font-bold mr-1">
                                {handyman.rating}
                              </span>
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className="w-4 h-4 fill-current"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-sm text-gray-600 ml-2">
                                • {handyman.distance} away
                              </span>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {handyman.services.map(
                                (service: string, index: number) => (
                                  <span
                                    key={index}
                                    className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full"
                                  >
                                    {service}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <button
                              className="mt-2 bg-teal-600 text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-teal-700 transition"
                              onClick={() => handleContact(handyman)}
                            >
                              Contact
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <svg
                        className="w-16 h-16 mx-auto text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="mt-4 text-gray-600">
                        No handymen found matching your search.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-auto">
        <div className="container mx-auto">
          <div className="flex justify-around items-center py-3">
            <button
              className={`flex flex-col items-center p-2 rounded-lg transition ${
                activeTab === "home"
                  ? "text-teal-600"
                  : "text-gray-500 hover:text-teal-600"
              }`}
              onClick={() => {
                setActiveTab("home");
                setSelectedArea(null);
                setShowSearchResults(false);
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-xs mt-1">Home</span>
            </button>
            <button
              className={`flex flex-col items-center p-2 rounded-lg transition ${
                activeTab === "map"
                  ? "text-teal-600"
                  : "text-gray-500 hover:text-teal-600"
              }`}
              onClick={() => {
                setActiveTab("map");
                setSelectedArea(null);
                setShowSearchResults(false);
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-xs mt-1">Map</span>
            </button>
            <button
              className={`flex flex-col items-center p-2 rounded-lg transition ${
                activeTab === "services"
                  ? "text-teal-600"
                  : "text-gray-500 hover:text-teal-600"
              }`}
              onClick={() => {
                setActiveTab("services");
                setSelectedArea(null);
                setShowSearchResults(false);
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1 1 724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-xs mt-1">Services</span>
            </button>
            <button
              className={`flex flex-col items-center p-2 rounded-lg transition ${
                activeTab === "messages"
                  ? "text-teal-600"
                  : "text-gray-500 hover:text-teal-600"
              }`}
              onClick={() => {
                setActiveTab("messages");
                setSelectedArea(null);
                setShowSearchResults(false);
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="text-xs mt-1">Messages</span>
            </button>
            <button
              className={`flex flex-col items-center p-2 rounded-lg transition ${
                activeTab === "profile"
                  ? "text-teal-600"
                  : "text-gray-500 hover:text-teal-600"
              }`}
              onClick={() => {
                setActiveTab("profile");
                setSelectedArea(null);
                setShowSearchResults(false);
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
