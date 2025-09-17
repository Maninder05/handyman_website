"use client";

import { useState } from "react";

interface Handyman {
  id: number;
  initials: string;
  name: string;
  rating: number;
  reviews: number;
  skills: string[];
  rate: number;
  experience: string;
  distance: number;
  about: string;
  responseTime: string;
  availability: string;
}

export default function HandymanFinder() {
  // State for filter vals
  const [hourlyRate, setHourlyRate] = useState(500);
  const [experience, setExperience] = useState("");
  const [distance, setDistance] = useState(5);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [filtersApplied, setFiltersApplied] = useState(false);

  // State for modals
  const [showContactModal, setShowContactModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedHandyman, setSelectedHandyman] = useState<Handyman | null>(
    null
  );

  // Skills options
  const skillsOptions = [
    "House Cleaning",
    "Floor Cleaning",
    "Disinfection",
    "Dusting & Vacuuming",
    "Plumbing",
    "Electrical",
    "Carpentry",
    "Painting",
  ];

  // Experience options
  const experienceOptions = [
    "Less than 1 year",
    "1-3 years",
    "3-5 years",
    "5+ years",
  ];

  // Sample handymen data
  const handymenData: Handyman[] = [
    {
      id: 1,
      initials: "MS",
      name: "Mike Smith",
      rating: 4.3,
      reviews: 86,
      skills: ["Plumbing", "Electrical"],
      rate: 85,
      experience: "1-3 years",
      distance: 5,
      about:
        "Skilled handyman with expertise in basic plumbing and electrical work.",
      responseTime: "Within 2 hours",
      availability: "Mon-Fri: 8am-6pm, Sat: 9am-2pm",
    },
    {
      id: 2,
      initials: "JD",
      name: "John Doe",
      rating: 4.9,
      reviews: 128,
      skills: ["House Cleaning", "Floor Cleaning", "Disinfection"],
      rate: 65,
      experience: "5+ years",
      distance: 2,
      about:
        "Professional cleaner with over 5 years of experience. Specializes in deep cleaning and disinfection services.",
      responseTime: "Within 1 hour",
      availability: "Mon-Sun: 7am-8pm",
    },
    {
      id: 3,
      initials: "AJ",
      name: "Anna Johnson",
      rating: 5.0,
      reviews: 204,
      skills: ["Dusting & Vacuuming", "Painting"],
      rate: 75,
      experience: "3-5 years",
      distance: 3,
      about:
        "Detail-oriented cleaner with expertise in dusting, vacuuming, and interior painting.",
      responseTime: "Within 3 hours",
      availability: "Mon-Fri: 9am-5pm",
    },
  ];

  // Filtered handymen based on criteria
  const [filteredHandymen, setFilteredHandymen] = useState<Handyman[]>([]);

  // Handle skill selection
  const handleSkillChange = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Handle reset
  const handleReset = () => {
    setHourlyRate(500);
    setExperience("");
    setDistance(5);
    setSelectedSkills([]);
    setFiltersApplied(false);
    setFilteredHandymen([]);
  };

  // Handle apply filters
  const handleApply = () => {
    // Filter handymen based on criteria
    const filtered = handymenData.filter((handyman) => {
      return (
        handyman.rate <= hourlyRate &&
        (experience === "" || handyman.experience === experience) &&
        handyman.distance <= distance &&
        (selectedSkills.length === 0 ||
          selectedSkills.some((skill) => handyman.skills.includes(skill)))
      );
    });

    setFilteredHandymen(filtered);
    setFiltersApplied(true);
  };

  // Handle contact now
  const handleContactNow = (handyman: Handyman) => {
    setSelectedHandyman(handyman);
    setShowContactModal(true);
  };

  // Handle schedule appointment
  const handleScheduleAppointment = (handyman: Handyman) => {
    setSelectedHandyman(handyman);
    setShowScheduleModal(true);
  };

  // Handle send message
  const handleSendMessage = () => {
    if (selectedHandyman) {
      alert(
        `Message sent to ${selectedHandyman.name}! He will respond within ${selectedHandyman.responseTime}.`
      );
      setShowContactModal(false);
    }
  };

  // Handle schedule confirmation
  const handleConfirmSchedule = () => {
    if (selectedHandyman) {
      alert(`Appointment scheduled with ${selectedHandyman.name}!`);
      setShowScheduleModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      {/* Header */}
      <header className="bg-teal-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">HandyPro Finder</h1>
            <div className="relative w-96">
              <input
                type="text"
                placeholder="Search for handymen or services..."
                className="w-full pl-10 pr-4 py-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg
                  className="w-5 h-5"
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
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Section */}
          <div className="w-full lg:w-1/4 bg-white rounded-2xl shadow-lg p-6 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Filters</h2>

            {/* Hourly Rate Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Hourly Rate
              </h3>
              <div className="flex justify-between mb-2">
                <span className="text-teal-600 font-bold">$50</span>
                <span className="text-teal-600 font-bold">$1000</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center mt-3">
                <span className="text-lg font-bold text-teal-700">
                  ${hourlyRate}
                </span>
              </div>
            </div>

            {/* Experience Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Experience
              </h3>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Select Experience Level</option>
                {experienceOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Distance Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Distance
              </h3>
              <div className="flex justify-between mb-2">
                <span className="text-teal-600 font-bold">1 km</span>
                <span className="text-teal-600 font-bold">10 km</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={distance}
                onChange={(e) => setDistance(parseInt(e.target.value))}
                className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center mt-3">
                <span className="text-lg font-bold text-teal-700">
                  {distance} km
                </span>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Skills
              </h3>
              <div className="space-y-3">
                {skillsOptions.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`skill-${index}`}
                      checked={selectedSkills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`skill-${index}`}
                      className="ml-3 text-gray-700"
                    >
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handleReset}
                className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg font-medium hover:bg-teal-50 transition"
              >
                Reset
              </button>
              <button
                onClick={handleApply}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition flex items-center"
              >
                Apply Now
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="w-full lg:w-3/4">
            {!filtersApplied ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <svg
                  className="w-24 h-24 mx-auto text-gray-300"
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
                <h2 className="text-2xl font-bold text-gray-800 mt-4">
                  Apply Filters to See Handymen
                </h2>
                <p className="text-gray-600 mt-2">
                  Use the filters on the left to find handymen that match your
                  criteria.
                </p>
                <button
                  onClick={handleApply}
                  className="mt-6 px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
                >
                  Apply Filters
                </button>
              </div>
            ) : filteredHandymen.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <svg
                  className="w-24 h-24 mx-auto text-gray-300"
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
                <h2 className="text-2xl font-bold text-gray-800 mt-4">
                  No Handymen Found
                </h2>
                <p className="text-gray-600 mt-2">
                  No handymen match your current filters. Try adjusting your
                  criteria.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 px-6 py-3 border border-teal-600 text-teal-600 rounded-lg font-medium hover:bg-teal-50 transition"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div>
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Available Handymen
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Found {filteredHandymen.length} handymen matching your
                    criteria
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredHandymen.map((handyman) => (
                    <div
                      key={handyman.id}
                      className="bg-white rounded-2xl shadow-lg p-6"
                    >
                      <div className="flex items-start">
                        <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                          {handyman.initials}
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-gray-800">
                            {handyman.name}
                          </h2>
                          <div className="flex items-center mt-2">
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
                              {handyman.rating} ({handyman.reviews} reviews)
                            </span>
                          </div>
                          <div className="mt-4">
                            <span className="text-lg font-bold text-teal-700">
                              ${handyman.rate}
                            </span>
                            <span className="text-gray-600">/hour</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          Skills & Services
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {handyman.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          Experience
                        </h3>
                        <p className="text-black font-medium">
                          {handyman.experience}
                        </p>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          Distance
                        </h3>
                        <p className="text-gray-700">
                          {handyman.distance} km away
                        </p>
                      </div>

                      <div className="mt-6 flex space-x-4">
                        <button
                          onClick={() => handleContactNow(handyman)}
                          className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
                        >
                          Contact Now
                        </button>
                        <button
                          onClick={() => handleScheduleAppointment(handyman)}
                          className="flex-1 px-4 py-2 border border-teal-600 text-black rounded-lg font-medium hover:bg-teal-50 transition"
                        >
                          Schedule Appointment
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactModal && selectedHandyman && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Contact {selectedHandyman.name}
            </h3>
            <p className="text-gray-600 mb-4">
              Would you like to contact {selectedHandyman.name} now? He
              typically responds within {selectedHandyman.responseTime}.
            </p>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowContactModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
              >
                Contact Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Appointment Modal */}
      {showScheduleModal && selectedHandyman && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Schedule with {selectedHandyman.name}
            </h3>
            <p className="text-gray-600 mb-4">
              Select a date and time for your appointment with{" "}
              {selectedHandyman.name}.
            </p>

            <div className="mb-4">
              <label className="block text-black font-medium mb-2">
                Select Date
              </label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-black font-medium mb-2">
                Select Time
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                <option value="">Select a time</option>
                <option value="9:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSchedule}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
