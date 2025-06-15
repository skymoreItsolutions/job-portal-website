import React from 'react'
   import { FiBriefcase, FiCalendar, FiDollarSign, FiClock } from 'react-icons/fi';

const Three = ({alldata,handelinputs}) => {
  return (

<div className="bg-white rounded-xl shadow-sm p-6 lg:p-8  hover:shadow-md transition-shadow duration-300">
  {/* Header with Icon */}
  <div className="flex items-center mb-6">
    <div className="bg-emerald-100 p-3 rounded-lg mr-4">
      <FiBriefcase className="text-emerald-600 text-xl" />
    </div>
    <div>
      <h2 className="text-xl font-bold text-gray-800">Work Experience</h2>
      <p className="text-gray-500 text-sm">Tell us about your professional background</p>
    </div>
  </div>

  <div className="space-y-6">
    {/* Experience Duration */}
    <div className="animate-fade-in">
      <h6 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
        <FiClock className="mr-2 text-emerald-500" />
        Total Years of Experience
      </h6>
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="years" className="block text-xs text-gray-500 mb-1">Years</label>
          <select
            name="experience_years"
            value={alldata.experience_years}
            onChange={handelinputs}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select years</option>
            {[...Array(12)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1} {index === 0 ? 'year' : 'years'}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="months" className="block text-xs text-gray-500 mb-1">Months (optional)</label>
          <select
            name="experience_months"
            value={alldata.experience_months}
            onChange={handelinputs}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select months</option>
            {[...Array(12)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1} {index === 0 ? 'month' : 'months'}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>

    {/* Job Title */}
    <div className="animate-fade-in">
      <h6 className="text-sm font-medium text-gray-700 mb-3">Job Title</h6>
      <input
        type="text"
        placeholder="e.g. Senior Software Engineer"
        name="job_roles"
        value={alldata.job_roles}
        onChange={handelinputs}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
      />
    </div>

    {/* Job Role */}
    <div className="animate-fade-in">
      <h6 className="text-sm font-medium text-gray-700 mb-3">Job Role</h6>
      <input
        type="text"
        placeholder="Select up to 10 roles for this job"
        name="job_title"
        value={alldata.job_title}
        onChange={handelinputs}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
      />
      <p className="text-xs text-gray-500 mt-1">Separate multiple roles with commas</p>
    </div>

    {/* Company Name */}
    <div className="animate-fade-in">
      <h6 className="text-sm font-medium text-gray-700 mb-3">Company Name</h6>
      <input
        type="text"
        placeholder="e.g. Tech Solutions Inc."
        name="company_name"
        value={alldata.company_name}
        onChange={handelinputs}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
      />
    </div>

    {/* Current Salary */}
    <div className="animate-fade-in">
      <h6 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
        <FiDollarSign className="mr-2 text-emerald-500" />
        Current Salary
      </h6>
      <div className="relative">
        <input
          type="text"
          placeholder="e.g. 75,000"
          name="current_salary"
          value={alldata.current_salary}
          onChange={handelinputs}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 pl-10"
        />
        <span className="absolute left-3 top-3.5 text-gray-400">$</span>
      </div>
    </div>

    {/* Start Date */}
    <div className="animate-fade-in">
      <h6 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
        <FiCalendar className="mr-2 text-emerald-500" />
        Start Date
      </h6>
      <div className="relative">
        <input
          type="date"
          name="start_date"
          value={alldata.start_date}
          onChange={handelinputs}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 appearance-none"
        />
      </div>
    </div>
  </div>
</div>
  )
}

export default Three