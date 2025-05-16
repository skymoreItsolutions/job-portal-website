'use client';

import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '../../components/Sidebar';
import { baseurl } from '@/app/components/common';
import { parseISO, addDays, isAfter } from 'date-fns'
const data = [
  { name: 'Jan', applications: 400 },
  { name: 'Feb', applications: 300 },
  { name: 'Mar', applications: 600 },
  { name: 'Apr', applications: 800 },
  { name: 'May', applications: 700 },
];

const recentJobs = [
  { id: 1, title: 'Senior React Developer', status: 'Active', verified: true },
  { id: 2, title: 'UX Designer', status: 'Pending', verified: false },
  { id: 3, title: 'Product Manager', status: 'Expired', verified: true },
];



const EmployerDashboard = () => {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
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
    const fetchJobs = async () => {
      try {
        const employerId = 1;
        const response = await fetch(`${baseurl}/jobs/employer/${employerId}`)
        const result = await response.json();
        console.log('result', result);

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
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsJobModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />


      <div className="flex-1 overflow-auto">
        <div className="px-8 mt-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Employer Dashboard</h1>
            <button

              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

        <div className="mb-8 px-[2%] py-5 ">
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
        <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <BiTrendingUp size={24} /> : <BiTrendingDown size={24} />}
          <span className="ml-1">{Math.abs(change)}%</span>
        </div>
      </div>
    </div>
  );
};




const JobCard = ({ job }) => {
  // Safely parse additional_requirements
  let additionalRequirements = { skills: [] };
  try {
    if (job?.additional_requirements && typeof job.additional_requirements === 'string') {
      additionalRequirements = JSON.parse(job.additional_requirements);
    }
  } catch (error) {
    console.error('Error parsing additional_requirements:', error);
  }

  // Calculate deadline
  const createdAt = job?.created_at ? parseISO(job.created_at) : new Date();
  const deadline = addDays(createdAt, job?.job_expire_time || 14);
  const deadlineFormatted = deadline.toLocaleDateString();

  // Determine status based on deadline
  const isExpired = isAfter(new Date(), deadline);
  const status = isExpired ? 'Expired' : 'Active';

  const postedDate = createdAt.toLocaleDateString();

  // Toggle menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Menu actions (example)
  const menuActions = [
    { label: 'View Details', action: () => console.log('View job:', job.id) },
    { label: 'Edit Job', action: () => console.log('Edit job:', job.id) },
    { label: 'Delete Job', action: () => console.log('Delete job:', job.id) },
  ];

  return (
    // <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    //   <div className="flex justify-between items-center mb-4">
    //     <h3 className="text-lg font-semibold text-gray-800">{job?.job_title || 'Untitled Job'}</h3>
    //     <span
    //       className={`px-2 py-1 text-xs font-medium rounded-full ${
    //         status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
    //       }`}
    //     >
    //       {status}
    //     </span>
    //   </div>
    //   <p className="text-gray-600 text-sm mb-3 line-clamp-2">
    //     {job?.job_description || 'No description available'}
    //   </p>
    //   <div className="text-sm text-gray-500 mb-2 flex items-center gap-4">
    //     <span>📍 {job?.location || 'N/A'}</span>
    //     <span>💰 ${job?.compensation ? parseInt(job.compensation).toLocaleString() : 'N/A'}</span>
    //   </div>
    //   <div className="text-sm text-gray-500 mb-2">
    //     <span>Skills: {additionalRequirements?.skills?.join(', ') || 'None'}</span>
    //   </div>
    //   <div className="text-sm text-gray-500 mb-3">
    //     <span>
    //       {job?.job_type || 'N/A'} • {job?.work_location_type || 'N/A'} •{' '}
    //       {job?.total_experience_required || 0} yrs exp
    //     </span>
    //   </div>
    //   <div className="flex justify-between items-center">
    //     <span className="text-sm text-gray-500">Deadline: {deadlineFormatted}</span>
    //     <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
    //       View Details
    //     </button>
    //   </div>
    // </div>
    <>

      <div className='bg-white w-full h-[250px] shadow-xs p-6 rounded-lg  hover:shadow-lg transition-shadow'>

        <div className="flex justify-between w-full h-full items-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div className="h-[140px]  p-4 rounded-xl flex flex-col justify-between shadow">
              <div>
                <h3 className="text-4xl font-bold text-gray-800">{job?.job_title || 'Untitled Job'}</h3>
                <p className="text-sm text-gray-700 font-medium">📍 {job?.location || 'N/A'}</p>
              </div>
              <p className="text-xs text-gray-600 font-semibold">🗓️ Posted on: {postedDate}</p>
            </div>


            <div className="h-[140px]  p-4 rounded-xl flex flex-col justify-between shadow">
              <div>
                <p className="text-sm text-gray-700 font-medium line-clamp-2">
                  {job?.job_description || 'No description available'}
                </p>
                <p className="text-xs text-gray-600 mt-2 font-semibold">
                  🛠️ Skills: {additionalRequirements?.skills?.join(', ') || 'None'}
                </p>
              </div>
              <p className="text-xs text-gray-700 font-semibold">
                {job?.job_type || 'N/A'} • {job?.work_location_type || 'N/A'}
              </p>
            </div>


            <div className="h-[140px] bg-red-100 p-4 rounded-xl flex flex-col justify-between shadow">
              <div>
                <p className="text-sm text-gray-700 font-bold">
                  ✅ Applied: <span className="font-medium">{job?.applied_to_job || 26}</span>
                </p>
                <p className="text-sm text-gray-700 font-bold">
                  🔍 Matches: <span className="font-medium">{job?.database_matches || 'N/A'}</span>
                </p>
              </div>
              <p className="text-xs text-gray-600 font-semibold">👤 Posted by: {job?.posted_by || 'Manshu'}</p>
            </div>


            <div className="h-[140px]  p-4 rounded-xl flex flex-col justify-between shadow">
              <div>
                <p className="text-sm text-gray-800 font-bold">
                  💰 {job?.compensation ? `$${parseInt(job.compensation).toLocaleString()}` : 'N/A'}
                </p>
                <p className="text-sm text-gray-700 font-semibold">📅 Deadline: {deadlineFormatted}</p>
              </div>
              <button className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-all duration-200">
                {job?.select_plan || 'Select Plan'}
              </button>
            </div>
          </div>

        </div>
      </div>

    </>
  );
};


export default EmployerDashboard;