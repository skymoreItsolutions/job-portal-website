"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SlCalender } from "react-icons/sl";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import axios from "axios";
import { baseurl } from "@/app/components/common";

export default function Page() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState(""); // Added for optional email
  const [error, setError] = useState(null); // Added for error handling

  const handleNext = async () => {
    try {
      // Validate required fields
      if (!fullName || !dob || !selectedGender || !number) {
        setError("Please fill in all required fields.");
        return;
      }

      const userData = {
        full_name: fullName,
        dob,
        gender: selectedGender.toLowerCase(), // Convert to lowercase to match backend
        email: email || null, // Include email if provided
        number, // Include number in the payload
        whatsapp_updates: isChecked, // Include WhatsApp preference
      };

      const token = localStorage.getItem("port_tok");
      if (!token) {
        setError("Authentication token not found. Please log in again.");
        return;
      }

      // Send POST request to the backend
      const response = await axios.post(`${baseurl}/candidate`, userData, {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming token-based auth
        },
      });

      if (response.status === 201) {
        // Successfully created candidate, navigate to the next page
        router.push("/candidate/educations");
      }
    } catch (err) {
      // Handle errors from the backend
      setError(
        err.response?.data?.errors
          ? Object.values(err.response.data.errors).join(", ")
          : "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="bg-[#e8e7ea] px-5 md:px-12 xl:px-32 py-8 lg:py-12">
      <div className="w-full xl:h-[85vh] lg:w-[85%] mx-auto flex flex-col lg:flex-row lg:items-stretch gap-8">
        {/* Left Section */}
        <div className="w-full flex flex-row lg:flex-1/2 gap-4 h-full">
          <div className="flex flex-col flex-1 h-full">
            <img
              src="https://cdn.apna.co/cloudinary/OnboardingV3NonJobContextBanner.png"
              alt="job banner"
              className="rounded-3xl object-center h-full w-full"
            />
            <img
              src="https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/OnboardingV3CompanyLogo.png"
              alt="company logo"
              className="mx-auto mt-4 h-auto"
            />
          </div>
          <div className="hidden md:flex lg:hidden flex-col flex-1 h-full">
            <img
              src="https://cdn.apna.co/cloudinary/OnboardingV3NonJobContextBanner.png"
              alt="job banner"
              className="rounded-3xl object-cover object-center h-full w-full max-h-[250px] md:max-h-[420px] lg:max-h-[100px]"
            />
            <img
              src="https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/OnboardingV3CompanyLogo.png"
              alt="company logo"
              className="mx-auto mt-4 h-auto"
            />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full flex flex-col justify-between bg-white rounded-3xl shadow-lg h-full">
          <div>
            <div className="p-4 border-b border-gray-300 flex flex-col sm:flex-row sm:items-center justify-between">
              <h6 className="font-semibold text-lg">Basic Details</h6>
              <div className="w-[250px] bg-gray-400 rounded-2xl p-2 overflow-x-hidden relative">
                <div className="bg-[#309689] w-[10%] h-full absolute left-0 top-0"></div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              <div>
                <label className="font-semibold text-sm">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div className="relative">
                <label className="font-semibold text-sm">Date of Birth (DOB)</label>
                <input
                  type="date"
                  placeholder="Choose date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <SlCalender className="absolute right-4 top-12 text-gray-500" />
              </div>

              <div>
                <label className="font-semibold text-sm">Gender</label>
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => setSelectedGender("Male")}
                    className={`px-6 py-2 border rounded-full transition ${
                      selectedGender === "Male"
                        ? "bg-[#309689] text-white border-green-500"
                        : "border-[#309689] text-[#309689]"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setSelectedGender("Female")}
                    className={`px-6 py-2 border rounded-full transition ${
                      selectedGender === "Female"
                        ? "bg-[#309689] text-white border-green-500"
                        : "border-[#309689] text-[#309689]"
                    }`}
                  >
                    Female
                  </button>
                  <button
                    onClick={() => setSelectedGender("Other")}
                    className={`px-6 py-2 border rounded-full transition ${
                      selectedGender === "Other"
                        ? "bg-[#309689] text-white border-green-500"
                        : "border-[#309689] text-[#309689]"
                    }`}
                  >
                    Other
                  </button>
                </div>
              </div>

              <div>
                <label className="font-semibold text-sm">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="font-semibold text-sm">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsChecked(!isChecked)}
              >
                {isChecked ? (
                  <MdCheckBox className="text-green-600 text-lg" />
                ) : (
                  <MdCheckBoxOutlineBlank className="text-gray-500 text-lg" />
                )}
                <p className="text-gray-600 text-sm">
                  Send me important job updates on WhatsApp
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-300">
            <button
              onClick={handleNext}
              className="w-full py-3 bg-[#309689] text-white font-semibold rounded-md hover:bg-[#3e6e68] active:-translate-y-2 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}