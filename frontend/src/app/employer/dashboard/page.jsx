'use client';

import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi';
import Sidebar from '../../components/Sidebar';
import { baseurl } from '@/app/components/common';
import { parseISO, addDays, isAfter } from 'date-fns';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
const EmployerDashboard = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    skills: '',
    salaryRange: '',
    jobType: 'full-time',
    location: '',
    deadline: '',
  });

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('employerToken');
      if (!token) return;

      try {
        const res = await axios.get(`${baseurl}/employer/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data && res.data.success) {
          setIsLoggedIn(res.data.data);
        }
      } catch (err) {
        console.error('Not logged in or invalid token');
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);


  console.log('isLoggedI',isLoggedIn.id)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const employerId = isLoggedIn.id;
          console.log('isLogged',employerId)
        const response = await fetch(`${baseurl}/jobs/employer/${employerId}`);
        const result = await response.json();

        if (result.status === 'success') {
          setJobs(result.data);
        } else {
          console.error('Failed to fetch jobs:', result.message);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, [isLoggedIn.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
 girl};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsJobModalOpen(false);
  };

  console.log('isLoggedIn.is_verified',isLoggedIn)

  // Check if employer is not verified
  if (isLoggedIn.is_verified === 0 || isLoggedIn.is_verified === null || isLoggedIn.is_blocked === 1 ) {
    return (
         <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-xl transform transition-all animate-fadeIn">
            <div className="flex items-center justify-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                Profile in Review Mode
                <span className="ml-3 inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </h2>
            </div>
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Your employer account is currently under review by our admin team. Once verified, you'll be able to post jobs and allow candidates to log in and apply. Please wait for admin approval or contact support for assistance.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/employer/verify-status" // Replace with your verification status page URL
                className="px-6 py-3 bg-[#02325a] text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Check Verification Status
              </a>
              <a
                href="/contact" // Replace with your support page URL
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300"
              >
                Contact Support
              </a>
            </div>
            <p className="text-sm text-gray-500 text-center mt-6">
              We typically review accounts within 24-48 hours. Thank you for your patience!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render the full dashboard if verified
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div  className={`flex-1 p-6 transition-all duration-300 ${
            isSidebarOpen ? 'ml-64' : 'ml-20'
          }`} >
        <div className=" mt-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Employer Dashboard</h1>
            <button
              onClick={() => router.push('/employer/post-job')}
              className="flex items-center px-4 py-2 bg-[#02325a] text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="mr-2" /> Post New Job
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard title="Total Job Visits" value="12,456" change={12} isPositive={true} />
            <MetricCard title="Total Applications" value="1,234" change={-5} isPositive={false} />
            <MetricCard title="Active Jobs" value="45" change={8} isPositive={true} />
            <MetricCard title="Pending Reviews" value="28" change={0} isPositive={true} />
          </div>
        </div>

        <div className="mb-8 px-[2%] py-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Job Postings</h2>
          <div className="grid grid-cols-1 gap-6">
            {jobs.length > 0 ? (
              jobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <p className="text-gray-600">No jobs posted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, change, isPositive }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">{value}</span>
        <div className={`flex items-center ${isPositive ? 'text-[#02325a]' : 'text-red-500'}`}>
          {isPositive ? <BiTrendingUp size={24} /> : <BiTrendingDown size={24} />}
          <span className="ml-1">{Math.abs(change)}%</span>
        </div>
      </div>
    </div>
  );
};

const JobCard = ({ job }) => {
  let additionalRequirements = { skills: [] };
  try {
    if (job?.additional_requirements && typeof job.additional_requirements === 'string') {
      additionalRequirements = JSON.parse(job.additional_requirements);
    }
  } catch (error) {
    console.error('Error parsing additional_requirements:', error);
  }

  const createdAt = job?.created_at ? parseISO(job.created_at) : new Date();
  const deadline = addDays(createdAt, job?.job_expire_time || 14);
  const deadlineFormatted = deadline.toLocaleDateString();
  const isExpired = isAfter(new Date(), deadline);
  const status = isExpired ? 'Expired' : 'Active';
  const verify = job.is_verified ? 'Active' : 'Not Active';

  const postedDate = createdAt.toLocaleDateString();

  return (
    <div className="bg-white w-full mx-auto shadow-md rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="p-6 sm:p-8">
        {/* Header with Job Title and Status */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
            {job?.job_title || 'Untitled Job'}
          </h3>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {status}
          </span>


          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              verify === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {verify}
          </span>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Job Info */}
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-gray-600 font-medium flex items-center">
              <span className="mr-2">📍</span> {job?.location || 'N/A'}
            </p>
            <p className="text-sm text-gray-600 font-medium flex items-center">
              <span className="mr-2">🗓️</span> Posted: {postedDate}
            </p>
            <p className="text-sm text-gray-600 font-medium flex items-center">
              <span className="mr-2">📅</span> Deadline: {deadlineFormatted}
            </p>
          </div>

          {/* Description and Skills */}
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-gray-700 line-clamp-3">
              {job?.job_description || 'No description available'}
            </p>
            <p className="text-sm text-gray-600 font-medium">
              <span className="font-semibold">Skills:</span>{' '}
              {additionalRequirements?.skills?.join(', ') || 'None'}
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-gray-600 font-medium">
              <span className="font-semibold">Applied:</span> {job?.applied_to_job || 26}
            </p>
            <p className="text-sm text-gray-600 font-medium">
              <span className="font-semibold">Matches:</span> {job?.database_matches || 'N/A'}
            </p>
            <p className="text-sm text-gray-600 font-medium">
              <span className="font-semibold">Posted by:</span> {job?.posted_by || 'Manshu'}
            </p>
          </div>

          {/* Compensation and Action */}
          <div className="flex flex-col justify-between space-y-4">
            <p className="text-lg font-bold text-gray-800">
              💰 {job?.compensation ? `$${parseInt(job.compensation).toLocaleString()}` : 'N/A'}
            </p>
            <p className="text-sm text-gray-600 font-medium">
              {job?.job_type || 'N/A'} • {job?.work_location_type || 'N/A'}
            </p>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;