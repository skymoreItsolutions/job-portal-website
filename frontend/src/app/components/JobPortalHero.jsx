'use client'

import { useRouter } from "next/navigation";
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

const route =useRouter();
const [searchinput,setSearchInput]=useState("")

  const handleSearch = () => {
   if(!searchinput.trim()){
    return;
   }
   route.push(`/jobs?page=1&job_title=${searchinput}`)
  };

  return (
    <div className="relative h-[450px] w-full ">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3)"
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative h-full py-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4" 
            aria-label="Find Your Dream Job Today!">
          Find Your Dream Job Today!
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 text-center mb-12 max-w-3xl">
          Connecting Talent with Opportunity: Your Gateway to Career Success
        </p>

        <div className="w-full max-w-4xl bg-white backdrop-blur-sm rounded-lg shadow-xl">
          <div className="flex flex-col  rounded-md md:flex-row ">


            <div className="relative flex-1">

              <input type="text" value={searchinput} onChange={(e)=>setSearchInput(e.target.value)} placeholder="Job Title or Company" className="pl-5 w-full py-4  focus:outline-none focus:none " />

            </div>


           
             

            <button
              className="flex-none rounded-r-lg bg-blue-600 hover:bg-blue-700 text-white px-8 py-4  font-medium transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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