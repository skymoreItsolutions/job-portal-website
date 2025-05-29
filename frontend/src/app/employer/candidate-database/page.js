'use client';
import { useState,useEffect } from 'react';
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

  // State for candidates data and pagination
  const [candidates, setCandidates] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    per_page: 10,
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Fetch candidates from the backend
  const fetchCandidates = async (pageUrl = 'https://jobprtal.skymoreitsolutions.com/api/v1/candidate/filter') => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(pageUrl, {
        params: {
          job_title: formData.jobTitle,
          skills: formData.skills,
          experience: formData.experience,
          location: formData.location,
          education: formData.education,
          active: formData.active ? 1 : undefined,
        },
      });
      setCandidates(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(
        err.response?.data?.messages || 'An error occurred while fetching candidates.'
      );
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCandidates();
  };

  // Handle pagination
  const handlePageChange = (url) => {
    if (url) {
      fetchCandidates(url);
    }
  };

  // Initial fetch on component mount (optional)
  useEffect(() => {
    fetchCandidates();
  }, []);

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
                    disabled={loading}
                    className={`w-full py-2 sm:py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ${
                      loading
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {loading ? 'Searching...' : 'Search Candidates'}
                  </button>
                </div>
              </form>

              {/* Error Message */}
            {  console.log(error)}
              {error && (
                <div className="mt-4 text-red-600 text-sm sm:text-base">
                  {typeof error === 'object'
                    ? Object.values(error).flat().join(', ')
                    : error}
                </div>
              )}
            </div>
          </div>

          {/* Candidate Profiles Column */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                Candidate Profiles
              </h2>
              {loading ? (
                <p className="text-gray-500 text-center text-sm sm:text-base">
                  Loading candidates...
                </p>
              ) : candidates.length === 0 ? (
                <p className="text-gray-500 text-center text-sm sm:text-base">
                  No candidates found. Try adjusting your filters.
                </p>
              ) : (
                <>
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
                            {candidate.job_title}
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
                            {candidate.experience
                              ? `${candidate.experience} Years`
                              : 'N/A'}
                          </p>
                          <p className="flex items-center text-gray-700 text-sm sm:text-base">
                            <MapPinIcon className="h-4 sm:h-5 w-4 sm:w-5 text-gray-500 mr-2" />
                            <span className="font-medium">Location:</span>{' '}
                            {candidate.location || 'N/A'}
                          </p>
                          <p className="flex items-center text-gray-700 text-sm sm:text-base">
                            <AcademicCapIcon className="h-4 sm:h-5 w-4 sm:w-5 text-gray-500 mr-2" />
                            <span className="font-medium">Education:</span>{' '}
                            {candidate.education || 'N/A'}
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

                  {/* Pagination Controls */}
                  <div className="mt-6 flex justify-between items-center">
                    <button
                      onClick={() => handlePageChange(pagination.prev_page_url)}
                      disabled={!pagination.prev_page_url || loading}
                      className={`py-2 px-4 rounded-lg text-sm sm:text-base ${
                        !pagination.prev_page_url || loading
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      Previous
                    </button>
                    <span className="text-sm sm:text-base text-gray-700">
                      Page {pagination.current_page} of {pagination.last_page}
                    </span>
                    <button
                      onClick={() => handlePageChange(pagination.next_page_url)}
                      disabled={!pagination.next_page_url || loading}
                      className={`py-2 px-4 rounded-lg text-sm sm:text-base ${
                        !pagination.next_page_url || loading
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatesDashboard;