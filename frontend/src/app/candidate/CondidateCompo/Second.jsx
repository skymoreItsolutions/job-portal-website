"use client";
import React, { useState } from "react";
import { FiBook, FiAward, FiMapPin, FiHome } from "react-icons/fi";

const Second = ({ alldata, handelinputs }) => {
  const degreePrograms = [
    "BCA (Bachelor of Computer Applications)",
    "B.A (Bachelor of Arts)",
    "B.Sc (Bachelor of Science)",
    "B.Com (Bachelor of Commerce)",
    "B.Tech (Bachelor of Technology)",
    "M.A (Master of Arts)",
    "M.Sc (Master of Science)",
    "M.Com (Master of Commerce)",
    "MCA (Master of Computer Applications)",
    "M.Tech (Master of Technology)",
    "Ph.D (Doctor of Philosophy)",
    "Other",
  ];

  return (
    <div className="w-full p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header with Icon */}
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-3 rounded-lg mr-4">
          <FiBook className="text-blue-600 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Education Details
          </h2>
          <p className="text-gray-500 text-sm">
            Fill in your academic information
          </p>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Degree Program Dropdown */}
        <div className="space-y-2 animate-fade-in">
          <label
            htmlFor="education_level"
            className="flex items-center text-sm font-medium text-gray-700"
          >
            <FiAward className="mr-2 text-blue-500" />
            Degree Program
          </label>
          <select
            id="education_level"
            name="education_level"
            value={alldata.education_level || ""}
            onChange={handelinputs}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
          >
            <option value="" disabled>
              Select Degree Program
            </option>
            {degreePrograms.map((program) => (
              <option key={program} value={program}>
                {program}
              </option>
            ))}
          </select>
        </div>

        {/* Degree Field */}
        {/* <div className="space-y-2 animate-fade-in">
          <label
            htmlFor="degree"
            className="flex items-center text-sm font-medium text-gray-700"
          >
            <FiAward className="mr-2 text-blue-500" />
            Specialization
          </label>
          <input
            type="text"
            placeholder="e.g. Computer Science"
            id="degree"
            name="degree"
            value={alldata.degree}
            onChange={handelinputs}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
          />
        </div> */}

        {/* Passing Marks Field */}
        <div className="space-y-2 animate-fade-in">
          <label
            htmlFor="passing_marks"
            className="block text-sm font-medium text-gray-700"
          >
            Passing Marks (%)
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="e.g. 85"
              id="passing_marks"
              name="passing_marks"
              value={alldata.passing_marks}
              onChange={handelinputs}
              min="0"
              max="100"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
            <span className="absolute right-4 top-3.5 text-gray-400">%</span>
          </div>
        </div>

        {/* University/School Field */}
        <div className="space-y-2 animate-fade-in">
          <label
            htmlFor="college_name"
            className="flex items-center text-sm font-medium text-gray-700"
          >
            <FiBook className="mr-2 text-blue-500" />
            University/School Name
          </label>
          <input
            type="text"
            placeholder="e.g. Harvard University"
            id="college_name"
            name="college_name"
            value={alldata.college_name}
            onChange={handelinputs}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
          />
        </div>

        {/* City Field */}
        <div className="space-y-2 animate-fade-in">
          <label
            htmlFor="city"
            className="flex items-center text-sm font-medium text-gray-700"
          >
            <FiMapPin className="mr-2 text-blue-500" />
            City
          </label>
          <input
            type="text"
            placeholder="e.g. New York"
            id="city"
            name="city"
            value={alldata.city}
            onChange={handelinputs}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
          />
        </div>

        {/* State Field */}
        <div className="space-y-2 animate-fade-in">
          <label
            htmlFor="state"
            className="flex items-center text-sm font-medium text-gray-700"
          >
            <FiMapPin className="mr-2 text-blue-500" />
            State
          </label>
          <input
            type="text"
            placeholder="e.g. California"
            id="state"
            name="state"
            value={alldata.state}
            onChange={handelinputs}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
          />
        </div>

        {/* Address Field - Full Width */}
        <div className="space-y-2 md:col-span-2 animate-fade-in">
          <label
            htmlFor="address"
            className="flex items-center text-sm font-medium text-gray-700"
          >
            <FiHome className="mr-2 text-blue-500" />
            Full Address
          </label>
          <input
            type="text"
            placeholder="e.g. 123 Main St, Apt 4B"
            id="address"
            name="address"
            value={alldata.address}
            onChange={handelinputs}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};
export default Second;