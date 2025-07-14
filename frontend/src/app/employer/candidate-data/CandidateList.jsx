'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import { FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaGlobe, FaPhone } from 'react-icons/fa';
import { MdWorkHistory } from 'react-icons/md';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { baseurl } from '@/app/components/common';
import SkeletonLoader from './SkeletonLoader'; // Adjust path if SkeletonLoader is separate

const ProfileDetails = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="text-[#02325a]">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-gray-800">{value || 'N/A'}</p>
    </div>
  </div>
);

const CandidateCard = ({ candidate }) => {
  const router = useRouter();
  const [showPhone, setShowPhone] = useState(false);

  const formatExperience = () => {
    const years = candidate.experience_years || 0;
    const months = candidate.experience_months || 0;
    if (years === 0 && months === 0) return 'N/A';
    return `${years} Year${years !== 1 ? 's' : ''}${months > 0 ? `, ${months} Month${months !== 1 ? 's' : ''}` : ''}`;
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{candidate.full_name}</h1>
            <p className="text-gray-600">{candidate.job_title} at {candidate.company_name || 'N/A'}</p>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                candidate.active_user ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {candidate.active_user ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <ProfileDetails
            icon={<MdWorkHistory className="text-xl" />}
            label="Total Experience"
            value={formatExperience()}
          />
          <ProfileDetails
            icon={<FaMapMarkerAlt className="text-xl" />}
            label="Current Location"
            value={`${candidate.city || 'N/A'}, ${candidate.state || 'N/A'}`}
          />
          <ProfileDetails
            icon={<FaGlobe className="text-xl" />}
            label="Preferred Language"
            value={candidate.preferred_language || 'N/A'}
          />
          <ProfileDetails
            icon={<FaGraduationCap className="text-xl" />}
            label="Education"
            value={`${candidate.degree || 'N/A'} in ${candidate.specialization || 'N/A'}, ${candidate.college_name || 'N/A'}`}
          />
          <ProfileDetails
            icon={<FaBriefcase className="text-xl" />}
            label="Employment Type"
            value={candidate.employment_type || 'N/A'}
          />
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
            {candidate.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
              >
                {skill}
              </span>
            )) || <span className="text-gray-500">No skills listed</span>}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Work Preferences</h2>
          <div className="flex flex-wrap gap-2">
            {candidate.prefers_night_shift && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                Night Shift
              </span>
            )}
            {candidate.prefers_day_shift && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                Day Shift
              </span>
            )}
            {candidate.work_from_home && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                Work From Home
              </span>
            )}
            {candidate.work_from_office && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                Work From Office
              </span>
            )}
            {candidate.field_job && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                Field Job
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowPhone(!showPhone)}
            className="w-full bg-[#02325a] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            aria-label={showPhone ? 'Hide phone number' : 'Show phone number'}
          >
            <FaPhone />
            {showPhone ? candidate.number || 'N/A' : 'View Phone Number'}
          </button>
        </div>
      </div>
    </div>
  );
};

const CandidateList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    job_title: searchParams.get('job_title') || '',
    skills: searchParams.get('skills') || '',
    education: searchParams.get('education') || '',
    experience: searchParams.get('experience') || '',
    location: searchParams.get('location') || '',
    active: searchParams.get('active') || '',
    experienceType: searchParams.get('experienceType') || '',
  });

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
    total: 0,
    per_page: 10,
  });

  useEffect(() => {
    console.log('searchParams:', Object.fromEntries(searchParams));
    console.log('Current URL:', window.location.href);
  }, [searchParams]);

  const exportToExcel = () => {
    const worksheetData = candidates.map((candidate) => ({
      'Full Name': candidate.full_name || 'N/A',
      'Job Title': candidate.job_title || 'N/A',
      'Phone Number': candidate.number || 'N/A',
      'Email': candidate.email || 'N/A',
      'Preferred Shift': candidate.prefers_night_shift
        ? 'Night'
        : candidate.prefers_day_shift
        ? 'Day'
        : 'N/A',
      'Field Job': candidate.field_job ? 'Yes' : 'No',
      'Work From Home': candidate.work_from_home ? 'Yes' : 'No',
      'Work From Office': candidate.work_from_office ? 'Yes' : 'No',
      'Company': candidate.company_name || 'N/A',
      'Experience': `${candidate.experience_years || 0} Years, ${candidate.experience_months || 0} Months`,
      'Location': `${candidate.city || 'N/A'}, ${candidate.state || 'N/A'}`,
      'Language': candidate.preferred_language || 'N/A',
      'Education': `${candidate.degree || 'N/A'} in ${candidate.specialization || 'N/A'}, ${candidate.college_name || 'N/A'}`,
      'Employment Type': candidate.employment_type || 'N/A',
      'Skills': candidate.skills?.join(', ') || 'N/A',
      'Status': candidate.active_user ? 'Active' : 'Inactive',
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidates');
    XLSX.writeFile(workbook, 'candidates.xlsx');
  };

  const fetchCandidates = async (page = 1, perPage = pagination.per_page) => {
    setLoading(true);
    setError(null);
    try {
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '' && value !== null)
      );
      const queryParams = new URLSearchParams({
        ...cleanedFilters,
        page,
        per_page: perPage,
      }).toString();
      console.log('Fetching from:', `${baseurl}/filter?${queryParams}`);
      const response = await axios.get(`${baseurl}/filter?${queryParams}`);
      console.log('API Response:', response.data);

      const data = response.data.data || [];
      const responsePagination = response.data.pagination || {
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: perPage,
        next_page_url: null,
        prev_page_url: null,
      };

      setCandidates(data);
      setPagination({ ...responsePagination, per_page: perPage });
    } catch (err) {
      console.error('Error fetching candidates:', err);
      setError(
        err.response?.data?.messages ||
          err.message ||
          'An error occurred while fetching candidates.'
      );
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '' && value !== null)
    );
    const queryString = new URLSearchParams(cleanedFilters).toString();
    router.push(`/employer/candidate-data?${queryString}`, { scroll: false });
    fetchCandidates(1, pagination.per_page);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      fetchCandidates(page, pagination.per_page);
    }
  };

  const handlePerPageChange = (e) => {
    const perPage = parseInt(e.target.value, 10);
    setPagination((prev) => ({ ...prev, per_page: perPage, current_page: 1 }));
    fetchCandidates(1, perPage);
  };

  useEffect(() => {
    fetchCandidates(1, pagination.per_page);
  }, [searchParams, pagination.per_page]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto w-full">
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                Filter Candidates
              </h2>
              <form className="space-y-5 sm:space-y-6" onSubmit={handleFilterSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Keywords</label>
                  <input
                    type="text"
                    name="job_title"
                    placeholder="e.g., Software Engineer"
                    value={filters.job_title}
                    onChange={handleFilterChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    aria-label="Search by job title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    placeholder="e.g., React, SQL"
                    value={filters.skills}
                    onChange={handleFilterChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    aria-label="Search by skills"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Education</label>
                  <select
                    name="education"
                    value={filters.education}
                    onChange={handleFilterChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    aria-label="Filter by education"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience</label>
                  <select
                    name="experience"
                    value={filters.experience}
                    onChange={handleFilterChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    aria-label="Filter by experience"
                  >
                    <option value="">Select Experience</option>
                    <option value="0-2">0-2 Years</option>
                    <option value="3-5">3-5 Years</option>
                    <option value="6-10">6-10 Years</option>
                    <option value="10+">10+ Years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="active"
                    value={filters.active}
                    onChange={handleFilterChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    aria-label="Filter by status"
                  >
                    <option value="">Select Status</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g., New York, NY"
                    value={filters.location}
                    onChange={handleFilterChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    aria-label="Search by location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience Type</label>
                  <select
                    name="experienceType"
                    value={filters.experienceType}
                    onChange={handleFilterChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    aria-label="Filter by experience type"
                  >
                    <option value="">Select Experience Type</option>
                    <option value="any">Any</option>
                    <option value="relevant">Relevant</option>
                    <option value="total">Total</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#02325a] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  aria-label="Search candidates"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Candidate Profiles
                </h2>
                <button
                  onClick={exportToExcel}
                  className="py-2 px-4 bg-[#00223f] text-white rounded-lg text-sm sm:text-base hover:bg-green-700 transition-colors"
                  aria-label="Export candidates to Excel"
                >
                  Export as Excel
                </button>
              </div>
              {!loading && candidates.length > 0 && (
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                  <button
                    onClick={() => handlePageChange(pagination.current_page - 1)}
                    disabled={!pagination.prev_page_url}
                    className={`py-2 px-4 rounded-lg text-sm sm:text-base ${
                      !pagination.prev_page_url
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#02325a] text-white hover:bg-blue-700'
                    }`}
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  <span className="text-sm sm:text-base text-gray-700">
                    Page {pagination.current_page} of {pagination.last_page} ({pagination.total} candidates)
                  </span>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700" htmlFor="per-page">
                      Items per page:
                    </label>
                    <select
                      id="per-page"
                      value={pagination.per_page}
                      onChange={handlePerPageChange}
                      className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      aria-label="Select items per page"
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                    </select>
                  </div>
                  <button
                    onClick={() => handlePageChange(pagination.current_page + 1)}
                    disabled={!pagination.next_page_url}
                    className={`py-2 px-4 rounded-lg text-sm sm:text-base ${
                      !pagination.next_page_url
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#02325a] text-white hover:bg-blue-700'
                    }`}
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </div>
              )}
              {loading ? (
                <SkeletonLoader count={pagination.per_page} />
              ) : error ? (
                <p className="text-red-600 text-center text-sm sm:text-base">{error}</p>
              ) : candidates.length === 0 ? (
                <p className="text-gray-500 text-center text-sm sm:text-base">
                  No candidates found. Try adjusting your filters.
                </p>
              ) : (
                <div className="space-y-6">
                  {candidates.map((candidate) => (
                    <CandidateCard
                      key={candidate.id || `${candidate.full_name}-${candidate.email}`}
                      candidate={candidate}
                    />
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

export default CandidateList;