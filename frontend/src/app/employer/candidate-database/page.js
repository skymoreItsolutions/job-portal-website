'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import { useRouter } from 'next/navigation';
import {
  UserIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  MapPinIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

const CandidatesDashboard = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    jobTitle: '',
    skills: '',
    experience: '',
    location: '',
    education: '',
    active: false,
    experienceType: 'any', // Fresher, Experienced, Any
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct query string from formData
    const queryParams = new URLSearchParams({
      job_title: formData.jobTitle,
      skills: formData.skills,
      experience: formData.experience,
      location: formData.location,
      education: formData.education,
      active: formData.active ? '1' : '',
      experienceType: formData.experienceType,
    }).toString();
    // Redirect to candidate-database page with query parameters
    router.push(`/employer/candidate-data?${queryParams}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="max-w-3xl mx-auto w-full">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
              Find Candidates
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Job Title Input */}
              <div>
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium text-gray-700"
                >
                  Keywords
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Job Title, Role, Skills"
                  className="mt-1 w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>

              {/* Experience Type Radio Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Experience Type
                </label>
                <div className="mt-1 flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="experienceType"
                      id="fresher"
                      value="fresher"
                      checked={formData.experienceType === 'fresher'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label
                      htmlFor="fresher"
                      className="ml-2 text-sm font-medium text-gray-700"
                    >
                      Fresher Only
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="experienceType"
                      id="experienced"
                      value="experienced"
                      checked={formData.experienceType === 'experienced'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label
                      htmlFor="experienced"
                      className="ml-2 text-sm font-medium text-gray-700"
                    >
                      Experienced
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="experienceType"
                      id="any"
                      value="any"
                      checked={formData.experienceType === 'any'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label
                      htmlFor="any"
                      className="ml-2 text-sm font-medium text-gray-700"
                    >
                      Any
                    </label>
                  </div>
                </div>
              </div>

              {/* Years of Experience */}
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700"
                >
                  Years of Experience
                </label>
                <select
                  name="experience"
                  id="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                >
                  <option value="">Select Experience</option>
                  <option value="0-2">0-2 Years</option>
                  <option value="3-5">3-5 Years</option>
                  <option value="6-10">6-10 Years</option>
                  <option value="10+">10+ Years</option>
                </select>
              </div>

              {/* Location Input */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., New York, NY"
                  className="mt-1 w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>

              {/* Minimum Education */}
              <div>
                <label
                  htmlFor="education"
                  className="block text-sm font-medium text-gray-700"
                >
                  Minimum Education
                </label>
                <select
                  name="education"
                  id="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                >
                  <option value="">Select Education</option>
                  <option value="10th">10th</option>
                  <option value="12th">12th</option>
                  <option value="iti">ITI</option>
                  <option value="diploma">Diploma</option>
                  <option value="graduate">Graduate</option>
                  <option value="post-graduate">Post Graduate</option>
                </select>
              </div>

              {/* Active Status Toggle */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="active"
                  id="active"
                  checked={formData.active}
                  onChange={handleInputChange}
                  className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="active"
                  className="ml-2 block text-sm font-medium text-gray-700"
                >
                  Currently Active
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-2 sm:py-3 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                >
                  Search Candidates
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatesDashboard;