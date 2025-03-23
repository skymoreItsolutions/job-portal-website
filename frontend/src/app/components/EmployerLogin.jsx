"use client";
import React, { useState, useEffect } from "react";
import { FaBuilding, FaPlayCircle } from "react-icons/fa";
import Marquee from "react-fast-marquee";

export default function EmployerLogin() {
  const [candidates, setCandidates] = useState(0);
  const [employers, setEmployers] = useState(0);
  const [cities, setCities] = useState(0);

  useEffect(() => {
    const counterInterval = setInterval(() => {
      setCandidates((prev) => (prev < 6 ? prev + 1 : prev));
      setEmployers((prev) => (prev < 7 ? prev + 1 : prev));
      setCities((prev) => (prev < 900 ? prev + 100 : prev));
    }, 50);

    return () => clearInterval(counterInterval);
  }, []);

  return (
    <div className="mx-auto  px-5 md:px-12 xl:px-32">
      <div className="flex flex-wrap items-center justify-between py-10 md:py-12 xl:py-16 gap-8">
        <div className="w-full lg:w-1/2 space-y-5 text-center lg:text-left">
          <h5 className="text-2xl md:text-3xl xl:text-5xl font-bold text-gray-800">
            Hire the Right Talent, Fast and Easy.
          </h5>
          <p className="text-base text-gray-600">
            Accelerate your hiring process with our powerful job portal.
            Whether you're looking for entry-level or experienced professionals,
            we provide the tools to find the perfect match for your business.
          </p>
          <div className="flex justify-center lg:justify-start items-center gap-x-3 text-green-800">
            <FaPlayCircle className="text-lg" />
            <span className="text-sm font-medium">Watch video</span>
          </div>
          <hr />
          {/* Counter Section */}
          <div className="flex flex-wrap justify-center lg:justify-between gap-5">
            <div className="text-center">
              <h6 className="text-2xl lg:text-3xl font-bold text-green-800">
                {candidates.toLocaleString()} Crores +
              </h6>
              <p className="text-sm md:text-base text-gray-700">Qualified Candidates</p>
            </div>
            <div className="text-center">
              <h6 className="text-2xl lg:text-3xl font-bold text-green-800">
                {employers.toLocaleString()} Lakhs +
              </h6>
              <p className="text-sm md:text-base text-gray-700">Employers using apna</p>
            </div>
            <div className="text-center">
              <h6 className="text-2xl lg:text-3xl font-bold text-green-800">
                {cities.toLocaleString()} +
              </h6>
              <p className="text-sm md:text-base text-gray-700">Available Cities</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/5">
          <div className="shadow-xl rounded-xl p-6 bg-white">
            <div className="mb-6 text-center lg:text-left">
              <h6 className="text-2xl font-semibold text-gray-800">Let’s get started</h6>
              <p className="text-gray-600">Hire top talent faster with our platform</p>
            </div>

            <div className="mb-6">
              <h6 className="text-lg mb-2 font-semibold text-gray-800">Mobile number</h6>
              <input
                type="text"
                placeholder="Enter 10 digit mobile number"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
              />
              <button className="w-full cursor-pointer mt-4 py-2 bg-[#309689] text-white rounded-md hover:bg-[#365b56] active:-translate-y-3 transition duration-300">
                Continue
              </button>
              <div className="relative mt-4 flex items-center justify-center">
                <hr className="border-gray-300 w-full" />
                <p className="absolute bg-white text-gray-700 px-2 text-xs">OR</p>
              </div>
            </div>

            <div className="text-center">
              <button className="flex items-center justify-center gap-x-2 text-xs text-gray-500 font-semibold hover:underline">
                <FaBuilding />
                Click here for Enterprise login
              </button>
              <p className="mt-4 text-sm text-gray-500">
                By clicking continue, you agree to the{" "}
                <span className="text-blue-400 cursor-pointer">Terms of Service</span> &{" "}
                <span className="text-blue-400 cursor-pointer">Privacy Policy</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 lg:py-8 space-y-7">
        <h6 className="text-xl lg:text-xl font-semibold">Trusted by 1,000+ enterprises for seamless hiring solutions</h6>

        <Marquee>
    <div className="flex items-center gap-x-10 text-3xl lg:text-5xl font-semibold">
    🚀 Find Your Dream Job | 🔍 Thousands of Job Listings | 💼 Hire Top Talent Fast | 📢 Apply Now & Get Hired | 🌟 Trusted by Leading Enterprises
    </div>
</Marquee>


      </div>
    </div>
  );
}
