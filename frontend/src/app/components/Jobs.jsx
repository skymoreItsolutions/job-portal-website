"use client";
import React, { useState } from "react";
import { CiBookmarkPlus } from "react-icons/ci";
import { FaRegNewspaper } from "react-icons/fa"; // Media Icon
import { MdWork } from "react-icons/md"; // Full-time Icon
import { FaDollarSign } from "react-icons/fa"; // Salary Icon
import { FaMapMarkerAlt } from "react-icons/fa"; // Location Icon
import { IoLocation, IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";

import {
  FaInstagramSquare,
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
} from "react-icons/fa";

export default function Jobs() {
  const jobDetailsList = [
    {
      name: "Media",
      icon: <FaRegNewspaper />,
    },
    {
      name: "Full Time",
      icon: <MdWork />,
    },
    {
      name: "280000-320000",
      icon: <FaDollarSign />,
    },
    {
      name: "Los Angeles, USA",
      icon: <FaMapMarkerAlt />,
    },
  ];

  const topCompanies = [
    {
      icon: <FaInstagramSquare />,
      name: "Instagram",
      desc: "Elit velit mauris aliquam est diam. Leo sagittis consectetur diam morbi erat",
      jobs: 8,
    },
    {
      icon: <FaFacebookSquare />,
      name: "Facebook",
      desc: "At pellentesque amet odio cras imperdiet nisl. Ac magna aliquet massa leo",
      jobs: 12,
    },
    {
      icon: <FaTwitterSquare />,
      name: "Twitter",
      desc: "Odio aliquet tellus tellus maecenas. Faucibus in viverra venenatis phasellus",
      jobs: 11,
    },
    {
      icon: <FaLinkedin />,
      name: "LinkedIn",
      desc: "Et odio sem tellus ultrices posuere consequat. Tristique nascetur sapien ",
      jobs: 11,
    },
  ];

  //   categores

  const jobCategories = [
    { id: 10, label: "E-commerce" },
    { id: 10, label: "Telecommunication" },
    { id: 10, label: "Hotel & Tourism" },
    { id: 10, label: "Education" },
    { id: 10, label: "Financial Services" },
    { id: 10, label: "Healthcare" },
    { id: 10, label: "Information Technology" },
    { id: 10, label: "Marketing & Advertising" },
    { id: 10, label: "Engineering" },
    { id: 10, label: "Human Resources" },
  ];

  const [jobcategoreLength, setjobCategoreLength] = useState(6);

  const JobTypes = [
    { id: 10, label: "Full-time" },
    { id: 10, label: "Part-time" },
    { id: 10, label: "Freelance" },
    { id: 10, label: "Seasonal" },
    { id: 10, label: "Fixed Price" },
  ];
  const ExperienceLevel = [
    { id: 10, label: "No Experience" },
    { id: 10, label: "Fresher" },
    { id: 10, label: "Intermediate" },
    { id: 10, label: "Expert" },
  ];
  const datePosted = [
    { id: 10, label: "All" },
    { id: 10, label: "Last Hour" },
    { id: 10, label: "Last 24 Hours" },
    { id: 10, label: "Last 7 Days" },
    { id: 10, label: "Last 30 Days" },
  ];

  const tags = [
    { id: "1", name: "Engineering" },
    { id: "2", name: "Design" },
    { id: "3", name: "UI/UX" },
    { id: "4", name: "Marketing" },
    { id: "5", name: "Management" },
    { id: "6", name: "Software" },
    { id: "7", name: "Construction" },
  ];


  const jobListings = [
  { title: "Internal Integration Planner", company: "Bauch, Schuppe and Schulist Co", src: "/img/jobs/joblogo.png" },
  { title: "Software Development Engineer", company: "Tech Innovations Ltd.", src: "/img/jobs/joblogo.png" },
  { title: "Marketing Strategist", company: "Growth Solutions Inc.", src: "/img/jobs/joblogo.png" },
  { title: "UI/UX Designer", company: "Pixel Perfect Studios", src: "/img/jobs/joblogo.png" },
  { title: "Senior Data Analyst", company: "Data Insights Corp.", src: "/img/jobs/joblogo.png" },
  { title: "Project Manager", company: "Agile Project Solutions", src: "/img/jobs/joblogo.png" },
  { title: "Cloud Solutions Architect", company: "SkyTech Cloud Services", src: "/img/jobs/joblogo.png" },
  { title: "Financial Advisor", company: "WealthWise Consultancy", src: "/img/jobs/joblogo.png" },
  { title: "HR Business Partner", company: "People First HR", src: "/img/jobs/joblogo.png" },
  { title: "Cyber Security Engineer", company: "SecureNet Technologies", src: "/img/jobs/joblogo.png" },
  { title: "Network Administrator", company: "FastConnect Networks", src: "/img/jobs/joblogo.png" },
  { title: "Customer Support Manager", company: "ClientCare Solutions", src: "/img/jobs/joblogo.png" },
  { title: "E-commerce Specialist", company: "ShopEase Online", src: "/img/jobs/joblogo.png" },
  { title: "Legal Consultant", company: "Lex Partners LLP", src: "/img/jobs/joblogo.png" },
  { title: "Product Owner", company: "InnovateX Technologies", src: "/img/jobs/joblogo.png" },
  { title: "AI & Machine Learning Engineer", company: "DeepMind Systems", src: "/img/jobs/joblogo.png" },
  { title: "DevOps Engineer", company: "CodeFlow Solutions", src: "/img/jobs/joblogo.png" },
  { title: "Social Media Manager", company: "TrendBoost Marketing", src: "/img/jobs/joblogo.png" },
  { title: "Content Marketing Specialist", company: "Creative Content Agency", src: "/img/jobs/joblogo.png" },
  { title: "Operations Coordinator", company: "BizOps Management", src: "/img/jobs/joblogo.png" },
];

  return (
    <div className="container mx-auto">
      <div className="banner  h-[25vh] lg:h-[40vh] bg-black flex items-center justify-center text-white">
        <h1 className="font-bold text-3xl lg:text-5xl">Jobs</h1>
      </div>

      <div
        className="lg:hidden filter-btn px-5 my-3
    "
      >
        <button className="px-4 w-full flex items-center justify-center gap-x-2  py-2 font-bold rounded bg-[#309689] text-lg text-white">
          Filters <IoFilterSharp />
        </button>
      </div>

      <div className="mt-4 lg:mt-10 px-5  md:px-12 xl:px-32 container mx-auto  ">
        <div className="grid lg:grid-cols-3 gap-y-16 lg:gap-y-0 lg:gap-x-16">
          <div className="lg:col-span-1 ">
            <div className="bg-[#EBF5F4] rounded-2xl space-y-4 lg:space-y-5  sticky top-0 py-8 lg:py-4  px-3 lg:px-5">
              <div>
                <h6 className="font-semibold  text-lg">Search by job titile</h6>
                <label className="bg-white mt-3 relative w-full flex items-center py-2 px-12  rounded-2xl shadow-sm">
                  <input
                    type="text"
                    placeholder="Job title or company"
                    className="w-full outline-none bg-transparent"
                  />
                  <IoSearch className="absolute text-xl left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </label>
              </div>
              <div>
                <h6 className="font-semibold  text-lg">Location</h6>
                <label className="bg-white mt-3 relative w-full flex items-center py-2 px-12  rounded-2xl shadow-sm">
                  <input
                    type="text"
                    placeholder="Choose city"
                    className="w-full outline-none bg-transparent"
                  />
                  <IoLocation className="absolute text-xl left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </label>
              </div>
              <div>
                <h6 className="font-semibold  text-lg">Category</h6>
                <div className="space-y-2 mt-3">
                  {jobCategories
                    .slice(0, jobcategoreLength)
                    .map(({ id, label }) => (
                      <label key={id} className="flex justify-between">
                        <div className="flex  items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{label}</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500">({id})</span>
                        </div>
                      </label>
                    ))}
                  {jobCategories.length != jobcategoreLength && (
                    <button
                      onClick={() => setjobCategoreLength(jobCategories.length)}
                      className="lg:mt-3 px-4 py-2 font-semibold w-full rounded-lg bg-[#309689] text-base text-white"
                    >
                      Show More
                    </button>
                  )}
                </div>
              </div>
              <div>
                <h6 className="font-semibold  text-lg"> Job Type</h6>
                <div className="space-y-2 mt-3">
                  {JobTypes.slice().map(({ id, label }) => (
                    <label key={id} className="flex justify-between">
                      <div className="flex  items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{label}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500">({id})</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div>
                  <h6 className="font-semibold  text-lg"> Experience Level</h6>
                  <div className="space-y-2 mt-3">
                    {ExperienceLevel.map(({ id, label }) => (
                      <label key={id} className="flex justify-between">
                        <div className="flex  items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{label}</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500">({id})</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h6 className="font-semibold  text-lg"> Date Posted</h6>
                <div className="space-y-2 mt-3">
                  {datePosted.map(({ id, label }) => (
                    <label key={id} className="flex justify-between">
                      <div className="flex  items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{label}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500">({id})</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h6 className="font-semibold  text-lg">Salary</h6>
                <div className=" mt-3">
                  <div>
                    <input
                      type="range"
                      className="w-full h-2 bg-green-300 rounded-lg appearance-none cursor-pointer accent-green-500"
                    />{" "}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[#000000]">Salary : $0 -$9999</p>
                    <span className="text-[#309689] bg-[#3096891A] text-base  rounded font-semibold px-2 py-1">
                      Apply
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h6 className="font-semibold  text-lg"> Tags</h6>
                <div className=" space-y-2 mt-3 grid grid-cols-3 gap-4">
                  {tags.map(({ id, name }) => (
                    <h5 key={id} className="bg-[#3096881e] text-[#309689] rounded-2xl text-center p-1">{name}</h5>
                  ))}
                </div>
              </div>

              <div className="we-hiring h-[460px] relative  w-full rounded-2xl bg-[url('/img/jobs/imgbg.avif')] overflow-hidden p-8 text-white">
                <div className="relative z-10">
                  <h5 className="text-3xl lg:text-3xl font-bold">
                    WE ARE HIRING
                  </h5>
                  <p className="text-2xl">Apply Today !</p>
                </div>
                <div className="inset-0 absolute   backdrop-blur-3xl" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 ">
            <div className="">
              <div className="flex items-center justify-between">
                <p>showing 6-6 of 10 result</p>
                <button>Sort by latest</button>
              </div>

              <div className="mt-5 lg:mt-10 grid grid-cols-1 gap-y-5">
                {jobListings.map((elm, indx) => (
                  <div key={indx} className="mt-5 lg:mt-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[#309689] bg-[#3096891A] text-base px-2 rounded-2xl">
                        10 min ago
                      </span>
                      <button>
                        <CiBookmarkPlus />
                      </button>
                    </div>
                    <div className="flex flex-col md:flex-row gap-x-2 lg:items-center">
                      <img
                        src="/img/jobs/joblogo.png"
                        alt="job-logo"
                        className="w-5 h-5 lg:h-8 lg:w-8"
                      />
                      <div>
                        <h5 className="font-semibold text-lg lg:text-xl">
                          {elm.title}
                        </h5>
                        <p className="text-base">
                         {elm.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex  flex-col gap-y-5 lg:gap-y-0 md:flex-row justify-between">
                      <div className="grid grid-cols-1 gap-y-5 lg:gap-y-0 md:flex  items-center gap-x-4 text-black">
                        {jobDetailsList.map((elm, indx) => (
                          <div
                            key={indx}
                            className="flex items-center text-sm gap-x-2"
                          >
                            <span className="text-[#309689]">{elm.icon}</span>
                            <span className="text-[#6C757D]">{elm.name}</span>
                          </div>
                        ))}
                      </div>
                      <button className="px-4 py-2 rounded bg-[#309689] text-base text-white">
                        Job Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative flex  lg:justify-center items-center gap-x-4 mt-16 w-full ">
                <button className="bg-[#309689] text-white w-8 h-8 rounded text-sm ">
                  1
                </button>
                <button className=" h-7 w-8 border border-[#309689] rounded text-sm">
                  2
                </button>
                <button className="absolute right-0 border-2 px-4 border-[#6C757D] text-[#6C757D] rounded-lg">
                  Next{" "}
                </button>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="top-company bg-[#EBF5F4] container mx-auto mt-5 lg:mt-16 py-8 lg:py-16 px-5 md:px-12 xl:px-32 mb-8 lg:mb-16">
        <div className="text-center">
          <h5 className="text-3xl lg:text-4xl font-bold">Top compnay</h5>
          <p>
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet.
            Blandit a massa elementum
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 lg:gap-y-0 lg:grid-cols-4 gap-x-5 lg:gap-x-8 mt-4 lg:mt-8">
          {topCompanies.map((elm, indx) => (
            <div className="py-8 rounded-2xl  lg:py-5 px-5 bg-white text-center space-y-3">
              <div className="flex justify-center">
                <h5 className="text-5xl lg:text-3xl mx-auto">{elm.icon}</h5>
              </div>
              <h6 className="font-bold text-lg">{elm.name}</h6>
              <p>{elm.desc}</p>
              <button className="text-[#309689] rounded-2xl bg-[#3096891A] text-base px-2 py-1">
                {elm.jobs} open jobs
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
