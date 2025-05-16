"use client";
import React, { useState } from "react";

import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";



const Second=({alldata,handelinputs})=> {





  return (
   
    <div className="w-full p-6 flex flex-col space-y-6 bg-white ">
    <h2 className="text-2xl font-bold text-gray-800 mb-2">Education Details</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Education */}
      <div className="space-y-1">
        <label htmlFor="degree" className="block text-sm font-medium text-gray-700">Higher Education</label>
        <input
          type="text"
          placeholder="e.g. Bachelor of Science"
          id="degree"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
       
          name="degree"
             value={alldata.degree}
          onChange={(e) => handelinputs(e)}
        />
      </div>
      
      {/* Passing Marks */}
      <div className="space-y-1">
        <label htmlFor="passing_marks" className="block text-sm font-medium text-gray-700">Passing Marks (%)</label>
        <input
          type="number"
          placeholder="e.g. 85"
          id="passing_marks"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          name="passing_marks"
          value={alldata.passing_marks}
          onChange={(e) => handelinputs(e)}
          min="0"
          max="100"
        />
      </div>
      
      {/* University/School */}
      <div className="space-y-1">
        <label htmlFor="college_name" className="block text-sm font-medium text-gray-700">University/School Name</label>
        <input
          type="text"
          placeholder="e.g. Harvard University"
          id="college_name"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          name="college_name"
          value={alldata.college_name}
          onChange={(e) => handelinputs(e)}
        />
      </div>
      
      {/* City */}
      <div className="space-y-1">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          placeholder="e.g. New York"
          id="city"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          name="city"
          value={alldata.city}
          onChange={(e) => handelinputs(e)}
        />
      </div>
      
      {/* State */}
      <div className="space-y-1">
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          placeholder="e.g. California"
          id="state"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          name="state"
          value={alldata.state}
          onChange={(e) => handelinputs(e)}
        />
      </div>
      
      {/* Address - spans full width */}
      <div className="space-y-1 md:col-span-2">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Full Address</label>
        <input
          type="text"
          placeholder="e.g. 123 Main St, Apt 4B"
          id="address"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          name="address"
          value={alldata.address}
          onChange={(e) => handelinputs(e)}
        />
      </div>
    </div>
  </div>
    
  );
}
export default Second
