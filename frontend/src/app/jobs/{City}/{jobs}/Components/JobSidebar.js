import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  AlertCircle, 
  Star, 
  Search,
  Filter,
  Award,
  Building
} from 'lucide-react';
import { Job } from '../types/Job';

interface JobSidebarProps {
  jobs: Job[];
  selectedJobId: string;
  onJobSelect: (jobId: string) => void;
}

export const JobSidebar: React.FC<JobSidebarProps> = ({ jobs, selectedJobId, onJobSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'urgent' && job.urgent) ||
                         (filterType === 'featured' && job.featured) ||
                         (filterType === 'remote' && job.type === 'Remote');
    
    return matchesSearch && matchesFilter;
  });

  const getExperienceLevelColor = (level: string) => {
    switch (level) {
      case 'Entry': return 'bg-green-100 text-green-700';
      case 'Mid': return 'bg-blue-100 text-blue-700';
      case 'Senior': return 'bg-purple-100 text-purple-700';
      case 'Lead': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-fit sticky top-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Available Positions</h2>
        <p className="text-slate-300 text-sm">{filteredJobs.length} of {jobs.length} jobs</p>
      </div>
      
      {/* Search and Filter */}
      <div className="p-4 border-b border-gray-200 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
              filterType === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('urgent')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
              filterType === 'urgent' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Urgent
          </button>
          <button
            onClick={() => setFilterType('featured')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
              filterType === 'featured' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Featured
          </button>
          <button
            onClick={() => setFilterType('remote')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
              filterType === 'remote' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Remote
          </button>
        </div>
      </div>
      
      {/* Job list */}
      <div className="max-h-[700px] overflow-y-auto">
        {filteredJobs.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No jobs match your criteria</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => onJobSelect(job.id)}
              className={`p-6 border-b border-gray-100 cursor-pointer transition-all duration-300 hover:bg-gray-50 relative ${
                selectedJobId === job.id 
                  ? 'bg-blue-50 border-l-4 border-l-blue-600 shadow-md' 
                  : 'hover:shadow-sm'
              }`}
            >
              {/* Featured/Urgent badges */}
              <div className="absolute top-4 right-4 flex gap-1">
                {job.featured && (
                  <div className="bg-yellow-400 text-yellow-900 rounded-full p-1">
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                )}
                {job.urgent && (
                  <div className="bg-red-500 text-white rounded-full p-1 animate-pulse">
                    <AlertCircle className="w-3 h-3" />
                  </div>
                )}
              </div>

              <div className="flex items-start gap-4 pr-8">
                <div className="relative">
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0 shadow-sm"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate mb-1 group-hover:text-blue-600 transition-colors duration-200">
                    {job.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-3 h-3 text-gray-400" />
                    <p className="text-sm text-gray-600 truncate">{job.company}</p>
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{job.type}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <DollarSign className="w-3 h-3" />
                      <span className="truncate font-medium">{job.salary}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getExperienceLevelColor(job.experienceLevel)}`}>
                      {job.experienceLevel}
                    </span>
                    <span className="text-xs text-gray-400">Posted {job.posted}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};