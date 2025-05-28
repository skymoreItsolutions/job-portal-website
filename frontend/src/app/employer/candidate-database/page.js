'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import React from 'react';
import {
  UserIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  MapPinIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

/**
 * @author
 * @function CandidatesDashboard
 */
const CandidatesDashboard = (props) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    skills: '',
    experience: '',
    location: '',
    education: '',
    active: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search Filters:', formData);
    // Add your search logic here (e.g., API call)
  };

  // Mock candidate data for display
  const candidates = [
    {
      id: 1,
      name: 'John Doe',
      jobTitle: 'Senior Software Engineer',
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: '6-10 Years',
      location: 'New York, NY',
      education: "Bachelor's Degree",
      active: true,
    },
    {
      id: 2,
      name: 'Jane Smith',
      jobTitle: 'Data Scientist',
      skills: ['Python', 'Machine Learning', 'SQL'],
      experience: '3-5 Years',
      location: 'San Francisco, CA',
      education: "Master's Degree",
      active: false,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto w-full">
          {/* Form Column */}
          <div className="w-full lg:w-1/2">
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
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Engineer"
                    className="mt-1 w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  />
                </div>

                {/* Skills Input */}
                <div>
                  <label
                    htmlFor="skills"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    id="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="e.g., JavaScript, Python, React"
                    className="mt-1 w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  />
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
                    <option value="high-school">High School</option>
                    <option value="associate">Associate Degree</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="phd">PhD</option>
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
                    className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                  >
                    Search Candidates
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Candidate Profiles Column */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                Candidate Profiles
              </h2>
              {candidates.length === 0 ? (
                <p className="text-gray-500 text-center text-sm sm:text-base">
                  No candidates found. Try adjusting your filters.
                </p>
              ) : (
                <div className="space-y-6">
                  {candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-gray-200 rounded-xl p-5 sm:p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <UserIcon className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600" />
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                          {candidate.name}
                        </h3>
                      </div>
                      <div className="space-y-3">
                        <p className="flex items-center text-gray-700 text-sm sm:text-base">
                          <BriefcaseIcon className="h-4 sm:h-5 w-4 sm:w-5 text-gray-500 mr-2" />
                          <span className="font-medium">Job Title:</span>{' '}
                          {candidate.jobTitle}
                        </p>
                        <p className="flex items-center text-gray-700 text-sm sm:text-base">
                          <CodeBracketIcon className="h-4 sm:h-5 w-4 sm:w-5 text-gray-500 mr-2" />
                          <span className="font-medium">Skills:</span>{' '}
                          <span className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="inline-block bg-blue-100 text-blue-800 text-xs sm:text-sm font-semibold px-2 sm:px-2.5 py-0.5 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </span>
                        </p>
                        <p className="flex items-center text-gray-700 text-sm sm:text-base">
                          <BriefcaseIcon className="h-4 sm:h-5 w-4 sm:w-5 text-gray-500 mr-2" />
                          <span className="font-medium">Experience:</span>{' '}
                          {candidate.experience}
                        </p>
                        <p className="flex items-center text-gray-700 text-sm sm:text-base">
                          <MapPinIcon className="h-4 sm:h-5 w-4 sm:w-5 text-gray-500 mr-2" />
                          <span className="font-medium">Location:</span>{' '}
                          {candidate.location}
                        </p>
                        <p className="flex items-center text-gray-700 text-sm sm:text-base">
                          <AcademicCapIcon className="h-4 sm:h-5 w-4 sm:w-5 text-gray-500 mr-2" />
                          <span className="font-medium">Education:</span>{' '}
                          {candidate.education}
                        </p>
                        <p className="flex items-center text-gray-700 text-sm sm:text-base">
                          <span
                            className={`inline-block h-4 sm:h-5 w-4 sm:w-5 rounded-full mr-2 ${
                              candidate.active ? 'bg-green-400' : 'bg-red-400'
                            }`}
                          />
                          <span className="font-medium">Status:</span>{' '}
                          <span
                            className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold rounded-full ${
                              candidate.active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {candidate.active ? 'Active' : 'Inactive'}
                          </span>
                        </p>
                      </div>
                      <button
                        className="mt-4 sm:mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 sm:py-2.5 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-sm sm:text-base"
                        onClick={() => alert(`View profile of ${candidate.name}`)}
                      >
                        View Profile
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatesDashboard;