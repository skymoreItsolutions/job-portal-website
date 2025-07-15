import React, { useState } from 'react';
import { JobDetails } from './JobDetails';
import { JobSidebar } from './JobSidebar';
import { mockJobs } from '../data/mockJobs';
import { Briefcase, TrendingUp, Users, MapPin } from 'lucide-react';

export const JobViewPage: React.FC = () => {
  const [selectedJobId, setSelectedJobId] = useState<string>(mockJobs[0].id);
  
  const selectedJob = mockJobs.find(job => job.id === selectedJobId) || mockJobs[0];

  const handleJobSelect = (jobId: string) => {
    setSelectedJobId(jobId);
  };

  const stats = [
    { icon: Briefcase, label: 'Total Jobs', value: mockJobs.length.toString(), color: 'blue' },
    { icon: TrendingUp, label: 'Featured', value: mockJobs.filter(job => job.featured).length.toString(), color: 'yellow' },
    { icon: Users, label: 'Companies', value: new Set(mockJobs.map(job => job.company)).size.toString(), color: 'green' },
    { icon: MapPin, label: 'Locations', value: new Set(mockJobs.map(job => job.location)).size.toString(), color: 'purple' },
  ];

  const getStatColor = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-500 to-blue-600';
      case 'yellow': return 'from-yellow-500 to-yellow-600';
      case 'green': return 'from-green-500 to-green-600';
      case 'purple': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Board</h1>
              <p className="text-gray-600">Discover your next career opportunity</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                Post a Job
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                For Employers
              </button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-r from-white to-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3">
                  <div className={`bg-gradient-to-r ${getStatColor(stat.color)} p-2 rounded-lg`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job details - takes up 2 columns on large screens */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <JobDetails job={selectedJob} />
          </div>
          
          {/* Job sidebar - takes up 1 column on large screens */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <JobSidebar 
              jobs={mockJobs}
              selectedJobId={selectedJobId}
              onJobSelect={handleJobSelect}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold mb-4">Job Board</h3>
              <p className="text-gray-400 mb-4">
                Connecting talented professionals with amazing opportunities. 
                Find your dream job or discover your next great hire.
              </p>
              <div className="flex gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                  Get Started
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Job Seekers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Career Advice</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Resume Builder</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Salary Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Post Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Find Candidates</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Resources</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Job Board. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};