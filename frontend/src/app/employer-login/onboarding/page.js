"use client";
import { useState } from "react";
import LeftCommonCard from "../LeftCommonCard";


export default function page() {
  const employeeOptions = [
    { label: "0-50", value: "0-50" },
    { label: "51-100", value: "51-100" },
    { label: "101-300", value: "101-300" },
    { label: "301-500", value: "301-500" },
    { label: "501", value: "1000" },
    { label: "1000+", value: "1000 above" },
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    workEmail: "",
    isConsultancy: false,
    agreedTerms: false,
    employees: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

 

  return (
    <div className="container mx-auto relative flex flex-col-reverse lg:flex-row items-center xl:items-stretch   py-12 md:py-0 gap-y-10">
      <div className="absolute inset-0 bg-[#d2dfdd00] -z-10" />

      <div className="w-full lg:w-[40%] p-6 md:p-10 lg:p-16 bg-[#37283A]">
        <LeftCommonCard/>
      </div>

      <div className="w-full flex justify-center bg-[#fff] px-4 md:px-10 py-6">
        <div className="max-w-lg mx-auto lg:max-w-[80%] border border-gray-500 bg-white shadow-2xl rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Let’s get you started!</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Your full name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Company name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. Swiggy"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex items-center mt-3 space-x-2">
                <input
                  type="checkbox"
                  name="isConsultancy"
                  checked={formData.isConsultancy}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <label className="text-gray-600 text-sm">This is a consultancy (Hiring or staffing agency)</label>
              </div>
            </div>

            <div>
              <p className="text-gray-700 font-medium">Number of employees in your company</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {employeeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`border px-4 py-1.5 rounded-full text-sm transition ${
                      formData.employees === option.value
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-blue-100 text-gray-800"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, employees: option.value })
                    }
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Work email (Optional)</label>
              <input
                type="email"
                name="workEmail"
                value={formData.workEmail}
                onChange={handleChange}
                placeholder="Enter your work email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-start mt-2 space-x-2">
              <input
                type="checkbox"
                name="agreedTerms"
                checked={formData.agreedTerms}
                onChange={handleChange}
                className="w-5 h-5 mt-1"
                required
              />
              <label className="text-gray-600 text-sm">
                I agree to Apna's{" "}
                <span className="text-blue-600 underline">Terms of Service</span> and{" "}
                <span className="text-blue-600 underline">Privacy Policy</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#309689] text-white font-semibold rounded-md hover:bg-[#267a73] transition transform hover:-translate-y-1"
            >
              Post a job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
