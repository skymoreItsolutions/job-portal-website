"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LeftCommonCard from "../LeftCommonCard";
import axios from "axios";
import { baseurl } from "@/app/components/common";
import Swal from 'sweetalert2';
export default function Page() {
  const router = useRouter();
  const employeeOptions = [
    { label: "0-50", value: "0-50" },
    { label: "51-100", value: "51-100" },
    { label: "101-300", value: "101-300" },
    { label: "301-500", value: "301-500" },
    { label: "501-1000", value: "501-1000" },
    { label: "1000 above", value: "1000 above" },
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    workEmail: "",
    password: "",
    isConsultancy: false,
    agreedTerms: false,
    employees: "",
    // Optional fields (uncomment if needed)
    // companyLocation: "",
    // contactPerson: "",
    // contactPhone: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Replace with actual session_token source
  const sessionToken = localStorage.getItem("employer_token") || "your-session-token-here"; // Update as needed

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!formData.agreedTerms) {
      setError("You must agree to the terms and conditions.");
      setLoading(false);
      return;
    }

    const payload = {
      name: formData.fullName,
      contact_email: formData.workEmail,
      company_name: formData.companyName,
      password: formData.password,
      session_token: sessionToken,

    };

    try {
      const response = await axios.post(`${baseurl}employer/signup`, payload);
      console.log("Signup successful:", response.data);
      localStorage.setItem("employerToken", response.data.token);

      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'You have successfully signed up!',
        confirmButtonColor: '#309689',
        timer: 2000, // Auto-close after 2 seconds
        timerProgressBar: true,
      });


      router.push("/employer/dashboard"); // Redirect to dashboard or job posting page
    } catch (err) {
      console.error("Signup error:", err);
      let errorMessage = "An error occurred during signup.";
      if (err.response?.data?.errors) {
        errorMessage = Object.values(err.response.data.errors).join(", ");
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (!err.response) {
        errorMessage = "Network error. Please check your connection.";
      }

      // Show SweetAlert2 error notification
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
        confirmButtonColor: '#309689',
      });

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const companies = [
    "Swiggy",
    "Zomato",
    "Amazon",
    "Google",
    "Flipkart",
    "Infosys",
    "TCS",
    "Wipro",
  ];

  const [company, setCompany] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = companies.filter((item) =>
    item.toLowerCase().includes(company.toLowerCase())
  );

  const handleSelect = (value) => {
    setCompany(value);
    setFormData((prev) => ({ ...prev, companyName: value }));
    setShowDropdown(false);
  };

  return (
    <div className="container mx-auto relative flex flex-col-reverse lg:flex-row items-center xl:items-stretch py-12 md:py-0 gap-y-10">
      <div className="absolute inset-0 bg-[#d2dfdd00] -z-10" />
      <div className="w-full lg:w-[40%] p-6 md:p-10 lg:p-16 bg-[#37283A]">
        <LeftCommonCard />
      </div>
      <div className="w-full flex justify-center bg-[#fff] px-4 md:px-10 py-6">
        <div className="max-w-lg mx-auto lg:max-w-[80%] border border-gray-500 bg-white shadow-2xl rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Let’s get you started!</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Your full name
              </label>
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

            <div className="relative">
              <label className="block text-gray-700 font-semibold mb-1">
                Company name
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="e.g. Swiggy"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required // Added to ensure company name is provided
              />
              {showDropdown && company && filtered.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow max-h-48 overflow-y-auto text-sm">
                  {filtered.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelect(item)}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex items-center mt-3 space-x-2">
                <input
                  type="checkbox"
                  name="isConsultancy"
                  checked={formData.isConsultancy}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <label className="text-gray-600 text-sm">
                  This is a consultancy (Hiring or staffing agency)
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Work email
              </label>
              <input
                type="email"
                name="workEmail"
                value={formData.workEmail}
                onChange={handleChange}
                placeholder="Enter your work email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <p className="text-gray-700 font-medium">
                Number of employees in your company
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {employeeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`border px-4 py-1.5 rounded-full text-sm transition ${formData.employees === option.value
                        ? "bg-[#309689] text-white"
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
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}