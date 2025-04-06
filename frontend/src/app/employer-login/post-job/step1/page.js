"use client";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { HiQuestionMarkCircle, HiTemplate } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";

export default function Page() {
  const steps = [
    { id: 1, label: "Job details" },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];

  const [activeStep, setActiveStep] = useState(1);

  return (
    <>
      <div className="px-5 md:px-12 xl:px-32 py-4 bg-gray-100 shadow-md">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
            <FaArrowLeftLong className="text-base" />
            <span>Post a Job</span>
          </div>
          <div className="flex items-center gap-5 text-sm md:text-base font-medium text-gray-700">
            <button className="flex items-center gap-2 hover:text-blue-600 transition">
              <HiQuestionMarkCircle className="text-lg" />
              Support
            </button>
            <button className="p-2 rounded hover:bg-gray-200 transition">
              <RxCross2 className="text-xl" />
            </button>
          </div>
        </header>
      </div>

      <div className="px-5 md:px-12 xl:px-32 bg-[#F3F2EF] py-6 md:py-10 space-y-6">
        <div className="flex items-center justify-between">
          <h5 className="text-gray-700 text-lg lg:text-xl font-semibold">
            Post a new job
          </h5>
          <button className="flex items-center gap-x-1 border border-gray-300 p-2 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200 transition">
            <HiTemplate />
            Use a Template
          </button>
        </div>

        <div className="flex items-center justify-between bg-white py-4 px-4 rounded-md shadow-sm relative overflow-hidden">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex-1 flex gap-x-2 flex-row items-center relative"
            >
              {/* Step Circle */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium z-10
                  ${
                    activeStep === step.id
                      ? "bg-gray-700 text-white"
                      : activeStep > step.id
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-200 text-gray-500"
                  }`}
              >
                {step.id}
              </div>

              {/* Step Label */}
              {step.label && (
                <span className=" text-sm font-medium text-gray-700">
                  {step.label}
                </span>
              )}

              {/* Connector Line */}
              {idx !== steps.length - 1 && (
                <div className="absolute top-4 left-1/2 w-full h-0.5 bg-gray-300 z-0 translate-x-1/2" />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-md shadow-sm py-5 px-4 space-y-5">
          <div className="space-y-2">
            <h6 className="text-base font-semibold">Job Details</h6>
            <p className="text-sm text-gray-500">
              We use this information to find the best candidates for the job.
            </p>
            <p className="text-xs text-red-500">*Marked fields are mandatory</p>
          </div>

          <div className="flex items-center gap-x-4">
            <h6 className="text-sm font-medium text-gray-700">
              Company you belong to{" "}
              <span className="font-semibold">dummy Pro</span> (Consultancy)
            </h6>
            <button className="text-green-600 font-medium text-sm hover:underline">
              Change
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company input */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium">
                Company you're hiring for *
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select Company"
                  className="w-full border rounded-md p-2 pr-8 text-sm outline-none focus:ring-2 ring-blue-300"
                />
                <button className="absolute right-2 top-2.5 text-gray-500 hover:text-red-500">
                  <RxCross2 />
                </button>
              </div>
            </div>

            {/* Job Title */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium">
                Job Title / Designation *
              </label>
              <input
                type="text"
                placeholder="Eg. Accountant"
                className="w-full border rounded-md p-2 text-sm outline-none focus:ring-2 ring-blue-300"
              />
            </div>
          </div>

          {/* Type of Job */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Type of Job *</label>
            <div className="flex flex-wrap gap-3">
              {["Full time", "Part time", "Both (Full-Time And Part-Time)"].map(
                (type, i) => (
                  <button
                    key={i}
                    className="py-1 px-4 border rounded-full text-sm hover:bg-gray-100"
                  >
                    {type}
                  </button>
                )
              )}
            </div>
            <div className="flex items-center gap-x-2 mt-2">
              <input type="checkbox" id="nightShift" />
              <label htmlFor="nightShift" className="text-sm text-gray-700">
                This is a night shift job
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm py-5 px-4 space-y-4">
          <div>
            <h6 className="text-base font-semibold">Location</h6>
            <p className="text-xs text-gray-500">
              Let candidates know where they will be working from.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">Work Location Type *</label>
            <div className="flex flex-wrap gap-3 mt-2">
              {["Work from Office", "Work from Home", "Field Job"].map(
                (type, i) => (
                  <button
                    key={i}
                    className="py-1 px-4 border rounded-full text-sm hover:bg-gray-100"
                  >
                    {type}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm py-5 px-4 space-y-4">
          <div>
            <h6 className="text-base font-semibold">Compensation</h6>
            <p className="text-xs text-gray-500">
              Job postings with right salary & incentives will help you find the
              right candidates.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">
              What is the pay type? *
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              {["Fixed Only", "Fixed + Incentive", "Incentive only"].map(
                (type, i) => (
                  <button
                    key={i}
                    className="py-1 px-4 border rounded-full text-sm hover:bg-gray-100"
                  >
                    {type}
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold">
              Do you offer any additional perks ?
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              {[
                "Flexible Working Hours",
                "Weekly Payout",
                "Overtime Pay",
                "Joining Bonus",
                "Annual Bonus",
                "PF",
                "Travel Allowance (TA)",
                "Petrol Allowance",
                "Mobile Allowance",
                "Internet Allowance",
                "Laptop",
                "Health Insurance",
                "ESI (ESIC)",
                "Food/Meals",
                "Accommodation",
              ].map((type, i) => (
                <button
                  key={i}
                  className="py-1 flex items-center gap-x-2 px-4 border rounded-full text-sm hover:bg-gray-100"
                >
                  {type}{" "}
                  <span className="">
                    <FaPlus />
                  </span>
                </button>
              ))}
            </div>

            <button className="flex mt-4 items-center gap-x-2 text-green-600 text-sm font-semibold">
              {" "}
              <FaPlus /> Add Other perks
            </button>
          </div>

          <div>
            <label className="text-sm font-semibold">
              Is there any joining fee or deposit required from the candidate? *
            </label>

            <div className="flex items-center gap-x-2 mt-4">
              <button className="py-1 flex items-center gap-x-2 px-4 border rounded-full text-sm hover:bg-gray-100">
                Yes
              </button>
              <button className="py-1 flex items-center gap-x-2 px-4 border rounded-full text-sm hover:bg-gray-100">
                No
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm py-5 px-4 space-y-4 flex justify-center items-center">
          <button className="px-5 rounded-sm py-2 text-white font-semibold bg-[#005F3E] ">
            {" "}
            continue
          </button>
        </div>
      </div>
    </>
  );
}
