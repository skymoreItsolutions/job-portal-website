'use client'

import React, { useState } from "react";
import { FaMapMarkerAlt, FaBriefcase, FaSearch } from "react-icons/fa";

const locations = [
  "New York",
  "San Francisco",
  "London",
  "Tokyo",
  "Singapore",
  "Berlin",
  "Toronto",
  "Sydney"
];

const categories = [
  "Technology",
  "Finance",
  "Marketing",
  "Healthcare",
  "Engineering",
  "Design",
  "Sales",
  "Education"
];

const JobPortalHero = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [locationDropdown, setLocationDropdown] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  const handleSearch = () => {
    console.log("Searching:", { selectedLocation, selectedCategory });
  };

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3)"
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4" 
            aria-label="Find Your Dream Job Today!">
          Find Your Dream Job Today!
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 text-center mb-12 max-w-3xl">
          Connecting Talent with Opportunity: Your Gateway to Career Success
        </p>

        <div className="w-full max-w-4xl bg-white backdrop-blur-sm rounded-lg shadow-xl">
          <div className="flex flex-col md:flex-row ">
            <div className="relative flex-1">
              <button
                className="w-full flex items-center justify-between bg-white p-4 border border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setLocationDropdown(!locationDropdown)}
                aria-label="Select Location"
              >
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-500 mr-2" />
                  {selectedLocation || "Select Location"}
                </div>
              </button>
              
              {locationDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
                  {locations.map((location) => (
                    <button
                      key={location}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      onClick={() => {
                        setSelectedLocation(location);
                        setLocationDropdown(false);
                      }}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative flex-1">
              <button
                className="w-full flex items-center justify-between bg-white p-4 rounded-r-y-lg  border border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setCategoryDropdown(!categoryDropdown)}
                aria-label="Select Category"
              >
                <div className="flex items-center">
                  <FaBriefcase className="text-gray-500 mr-2" />
                  {selectedCategory || "Select Category"}
                </div>
              </button>

              {categoryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      onClick={() => {
                        setSelectedCategory(category);
                        setCategoryDropdown(false);
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="flex-none bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={handleSearch}
              aria-label="Search Jobs"
            >
              <FaSearch className="mr-2" />
              Search Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPortalHero;