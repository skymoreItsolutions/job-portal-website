"use client"
import { baseurl } from '@/app/components/common';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaUser, FaBirthdayCake, FaPhone, FaGraduationCap, FaUniversity, FaBriefcase,
  FaBuilding, FaClock, FaSun, FaMoon, FaHome, FaLaptop, FaLanguage, FaCode,
  FaLock, FaEdit, FaChartLine, FaUserTie, FaRegStar, FaStar
} from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import Link from 'next/link';

const Dashboard = () => {
  const router = useRouter();
  const [userData, setalldata] = useState({
    full_name: "",
    dob: undefined,
    gender: "",
    number: undefined,
    degree: "",
    college_name: "",
    passing_marks: undefined,
    experience_years: undefined,
    job_roles: "",
    job_title: "",
    experience_months: undefined,
    company_name: "",
    prefers_night_shift: 0,
    prefers_day_shift: 1,
    work_from_home: 0,
    work_from_office: 1,
    field_job: 0,
    preferred_language: "",
    skills: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  const fetchData = async (token) => {
    if (!token) {
      router.push("/");
    } else {
      try {
        setLoading(true);
        const response = await axios.get(`${baseurl}/candidateinfo/${token}`);
        if (response.data.success) {
          setalldata(response.data.candidate);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("port_tok");
    fetchData(token);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaUserTie className="mr-2 text-blue-600" /> Candidate Portal
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
              <IoMdNotificationsOutline size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
              <FiSettings size={20} />
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {userData.full_name ? userData.full_name.charAt(0).toUpperCase() : "U"}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 mb-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Welcome back, {userData.full_name || "Candidate"}!
              </h2>
              <p className="opacity-90">Here's your complete profile overview</p>
            </div>
            <Link href={"/candidate/candidate-login"} className="mt-4 md:mt-0 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium flex items-center">
              <FaEdit className="mr-2" /> Edit Profile
            </Link>
          </div>
        </div>

        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <FaUser className="mr-2" /> Profile
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'stats' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <FaChartLine className="mr-2" /> Statistics
          </button>
        </div>

        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <DashboardCard title="Personal Information" icon={<FaUser className="text-blue-500" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField icon={<FaUser />} label="Full Name" value={userData.full_name || "Not provided"} />
                  <InfoField icon={<FaBirthdayCake />} label="Date of Birth" value={userData.dob || "Not provided"} />
                  <InfoField icon={<FaUser />} label="Gender" value={userData.gender || "Not provided"} />
                  <InfoField icon={<FaPhone />} label="Phone Number" value={userData.number || "Not provided"} />
                </div>
              </DashboardCard>

              <DashboardCard title="Education" icon={<FaGraduationCap className="text-blue-500" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField icon={<FaGraduationCap />} label="Degree" value={userData.degree || "Not provided"} />
                  <InfoField icon={<FaUniversity />} label="College Name" value={userData.college_name || "Not provided"} />
                  <InfoField icon={<FaGraduationCap />} label="Passing Marks" value={userData.passing_marks || "Not provided"} />
                </div>
              </DashboardCard>

              <DashboardCard title="Work Experience" icon={<FaBriefcase className="text-blue-500" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField icon={<FaClock />} label="Experience (Years)" value={userData.experience_years || "0"} />
                  <InfoField icon={<FaClock />} label="Experience (Months)" value={userData.experience_months || "0"} />
                  <InfoField icon={<FaBriefcase />} label="Job Title" value={userData.job_title || "Not provided"} />
                  <InfoField icon={<FaBuilding />} label="Company Name" value={userData.company_name || "Not provided"} />
                  <div className="md:col-span-2">
                    <InfoField icon={<FaBriefcase />} label="Job Roles" value={userData.job_roles || "Not provided"} />
                  </div>
                </div>
              </DashboardCard>
            </div>

            <div className="space-y-6">
              <DashboardCard title="Preferences" icon={<FaRegStar className="text-blue-500" />}>
                <div className="space-y-4">
                  <PreferenceField
                    icon={userData.prefers_day_shift ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-indigo-500" />}
                    label="Shift Preference"
                    value={userData.prefers_day_shift ? "Day Shift" : "Night Shift"}
                  />
                  <PreferenceField
                    icon={userData.work_from_home ? <FaHome className="text-green-500" /> : <FaBuilding className="text-gray-500" />}
                    label="Work Location"
                    value={userData.work_from_home ? "Work From Home" : "Work From Office"}
                  />
                  <PreferenceField
                    icon={<FaBriefcase className={userData.field_job ? "text-orange-500" : "text-blue-500"} />}
                    label="Job Type"
                    value={userData.field_job ? "Field Job" : "Office Job"}
                  />
                </div>
              </DashboardCard>

              <DashboardCard title="Skills & Language" icon={<FaCode className="text-blue-500" />}>
                <div className="space-y-4">
                  <InfoField icon={<FaLanguage />} label="Preferred Language" value={userData.preferred_language || "Not provided"} />
                  <div>
                    <div className="flex items-center mb-2">
                      <FaCode className="text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-500">Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {userData.skills ? (
                        userData.skills.split(',').map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {skill.trim()}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-800 font-semibold">Not provided</span>
                      )}
                    </div>
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard title="Account Information" icon={<FaLock className="text-blue-500" />}>
                <InfoField icon={<FaLock />} label="Password" value="••••••••" />
                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors">
                  Change Password
                </button>
              </DashboardCard>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Your Profile Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Profile Completion"
                value="75%"
                icon={<FaUser className="text-blue-500" />}
                progress={75}
              />
              <StatCard
                title="Profile Strength"
                value={userData.skills ? "Good" : "Basic"}
                icon={<FaStar className="text-yellow-500" />}
                progress={userData.skills ? 80 : 40}
              />
              <StatCard
                title="Last Updated"
                value="2 days ago"
                icon={<FaEdit className="text-green-500" />}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const DashboardCard = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="border-b border-gray-200 px-6 py-4 flex items-center">
      <div className="mr-3">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const InfoField = ({ icon, label, value }) => (
  <div>
    <div className="flex items-center mb-1">
      <span className="text-gray-500 mr-2">{icon}</span>
      <span className="text-sm font-medium text-gray-500">{label}</span>
    </div>
    <p className="text-gray-800 font-semibold">{value}</p>
  </div>
);

const PreferenceField = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mt-1 mr-3">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-gray-800 font-semibold">{value}</p>
    </div>
  </div>
);

const StatCard = ({ title, value, icon, progress }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-xs">
    <div className="flex items-center justify-between mb-3">
      <h4 className="text-sm font-medium text-gray-500">{title}</h4>
      {icon}
    </div>
    <p className="text-2xl font-bold text-gray-900 mb-3">{value}</p>
    {progress && (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    )}
  </div>
);

export default Dashboard;
