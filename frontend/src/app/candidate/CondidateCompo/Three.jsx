import React from "react";
import { FiBriefcase, FiCalendar, FiDollarSign, FiClock } from "react-icons/fi";
import { FiAward } from "react-icons/fi";

const Three = ({ alldata, handelinputs }) => {
  const jobRolesOptions = [
    { label: "Software Engineer", value: "Software Engineer" },
    { label: "Frontend Developer", value: "Frontend Developer" },
    { label: "Backend Developer", value: "Backend Developer" },
    { label: "Full Stack Developer", value: "Full Stack Developer" },
    { label: "Data Scientist", value: "Data Scientist" },
    { label: "Machine Learning Engineer", value: "Machine Learning Engineer" },
    { label: "AI Researcher", value: "AI Researcher" },
    { label: "DevOps Engineer", value: "DevOps Engineer" },
    { label: "Cloud Architect", value: "Cloud Architect" },
    { label: "Database Administrator", value: "Database Administrator" },
    { label: "Cybersecurity Analyst", value: "Cybersecurity Analyst" },
    { label: "Penetration Tester", value: "Penetration Tester" },
    { label: "Security Engineer", value: "Security Engineer" },
    { label: "QA Engineer", value: "QA Engineer" },
    { label: "Test Automation Engineer", value: "Test Automation Engineer" },
    { label: "Mobile App Developer", value: "Mobile App Developer" },
    { label: "iOS Developer", value: "iOS Developer" },
    { label: "Android Developer", value: "Android Developer" },
    { label: "Game Developer", value: "Game Developer" },
    { label: "UI/UX Designer", value: "UI/UX Designer" },
    { label: "Product Designer", value: "Product Designer" },
    { label: "Graphic Designer", value: "Graphic Designer" },
    { label: "Web Designer", value: "Web Designer" },
    { label: "Product Manager", value: "Product Manager" },
    { label: "Project Manager", value: "Project Manager" },
    { label: "Scrum Master", value: "Scrum Master" },
    { label: "Business Analyst", value: "Business Analyst" },
    { label: "Systems Analyst", value: "Systems Analyst" },
    { label: "Technical Writer", value: "Technical Writer" },
    { label: "IT Support Specialist", value: "IT Support Specialist" },
    { label: "Network Engineer", value: "Network Engineer" },
    { label: "System Administrator", value: "System Administrator" },
    { label: "IT Manager", value: "IT Manager" },
    {
      label: "Chief Technology Officer (CTO)",
      value: "Chief Technology Officer (CTO)",
    },
    {
      label: "Chief Information Officer (CIO)",
      value: "Chief Information Officer (CIO)",
    },
    { label: "Data Analyst", value: "Data Analyst" },
    { label: "Data Engineer", value: "Data Engineer" },
    { label: "Big Data Engineer", value: "Big Data Engineer" },
    { label: "ETL Developer", value: "ETL Developer" },
    { label: "AI Engineer", value: "AI Engineer" },
    { label: "Blockchain Developer", value: "Blockchain Developer" },
    { label: "Smart Contract Developer", value: "Smart Contract Developer" },
    { label: "Web3 Developer", value: "Web3 Developer" },
    { label: "Embedded Systems Engineer", value: "Embedded Systems Engineer" },
    { label: "Hardware Engineer", value: "Hardware Engineer" },
    { label: "FPGA Engineer", value: "FPGA Engineer" },
    { label: "Robotics Engineer", value: "Robotics Engineer" },
    { label: "Automation Engineer", value: "Automation Engineer" },
    { label: "Technical Recruiter", value: "Technical Recruiter" },
    { label: "Recruiter", value: "Recruiter" },
    { label: "HR Manager", value: "HR Manager" },
    { label: "Salesforce Developer", value: "Salesforce Developer" },
    { label: "SAP Consultant", value: "SAP Consultant" },
    { label: "Oracle Developer", value: "Oracle Developer" },
    { label: "ERP Consultant", value: "ERP Consultant" },
    { label: "CRM Specialist", value: "CRM Specialist" },
    { label: "SEO Specialist", value: "SEO Specialist" },
    {
      label: "Digital Marketing Specialist",
      value: "Digital Marketing Specialist",
    },
    { label: "Content Strategist", value: "Content Strategist" },
    { label: "Social Media Manager", value: "Social Media Manager" },
    { label: "Marketing Analyst", value: "Marketing Analyst" },
    { label: "Copywriter", value: "Copywriter" },
    { label: "Content Writer", value: "Content Writer" },
    { label: "Cloud Engineer", value: "Cloud Engineer" },
    { label: "AWS Specialist", value: "AWS Specialist" },
    { label: "Azure Engineer", value: "Azure Engineer" },
    { label: "GCP Engineer", value: "GCP Engineer" },
    { label: "Technical Architect", value: "Technical Architect" },
    { label: "Solutions Architect", value: "Solutions Architect" },
    { label: "Enterprise Architect", value: "Enterprise Architect" },
    { label: "Site Reliability Engineer", value: "Site Reliability Engineer" },
    { label: "Performance Engineer", value: "Performance Engineer" },
    { label: "Release Manager", value: "Release Manager" },
    { label: "Build Engineer", value: "Build Engineer" },
    { label: "Operations Manager", value: "Operations Manager" },
    { label: "IT Auditor", value: "IT Auditor" },
    { label: "Compliance Analyst", value: "Compliance Analyst" },
    { label: "Game Designer", value: "Game Designer" },
    { label: "Level Designer", value: "Level Designer" },
    { label: "3D Artist", value: "3D Artist" },
    { label: "Animator", value: "Animator" },
    { label: "Video Editor", value: "Video Editor" },
    { label: "Audio Engineer", value: "Audio Engineer" },
    { label: "Music Producer", value: "Music Producer" },
    { label: "Voice Artist", value: "Voice Artist" },
    { label: "Legal Advisor", value: "Legal Advisor" },
    { label: "Finance Analyst", value: "Finance Analyst" },
    { label: "Accountant", value: "Accountant" },
    { label: "Treasury Manager", value: "Treasury Manager" },
    { label: "Investment Analyst", value: "Investment Analyst" },
    { label: "Insurance Analyst", value: "Insurance Analyst" },
    { label: "Support Engineer", value: "Support Engineer" },
    { label: "Service Desk Analyst", value: "Service Desk Analyst" },
    { label: "Tech Evangelist", value: "Tech Evangelist" },
    { label: "Instructional Designer", value: "Instructional Designer" },
    { label: "Online Tutor", value: "Online Tutor" },
    { label: "AI Prompt Engineer", value: "AI Prompt Engineer" },
  ];

  const experienceLevelOptions = [
    { value: "Fresher", label: "Fresher (0-6 months)" },
    { value: "Experienced", label: "Experienced (6 months - 30 years)" },
    { value: "Both", label: "Both (0-30 years)" },
  ];

  // Determine experience range based on selected experience level
  const getExperienceRange = () => {
    switch (alldata.experience_level) {
      case "Fresher":
        return { years: [...Array(1)].map((_, i) => i), months: [...Array(7)].map((_, i) => i) };
      case "Experienced":
        return { years: [...Array(31)].map((_, i) => i), months: [...Array(12)].map((_, i) => i) };
      case "Both":
        return { years: [...Array(31)].map((_, i) => i), months: [...Array(12)].map((_, i) => i) };
      default:
        return { years: [...Array(31)].map((_, i) => i), months: [...Array(12)].map((_, i) => i) };
    }
  };

  const { years, months } = getExperienceRange();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center mb-6">
        <div className="bg-emerald-100 p-3 rounded-lg mr-4">
          <FiBriefcase className="text-emerald-600 text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Work Experience</h2>
          <p className="text-gray-500 text-sm">
            Tell us about your professional background
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2 animate-fade-in mb-6">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <FiAward className="mr-2 text-blue-500" />
            Are you currently Working in this Company?
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="is_working"
                value="Yes"
                checked={alldata.is_working === "Yes"}
                onChange={handelinputs}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="is_working"
                value="No"
                checked={alldata.is_working === "No"}
                onChange={handelinputs}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        <div className="space-y-2 animate-fade-in mb-6">
          <label
            htmlFor="notice_period"
            className="flex items-center text-sm font-medium text-gray-700 mb-3"
          >
            <FiAward className="mr-2 text-blue-500" />
            Notice Period
          </label>
          <div className="flex flex-wrap gap-3">
            {[
              "No notice Period",
              "Less than 15 Days",
              "1 month",
              "2 month",
              "3 Or more months",
            ].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() =>
                  handelinputs({
                    target: { name: "notice_period", value: level },
                  })
                }
                className={`px-4 py-2 rounded-full border ${
                  alldata.notice_period === level
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                } transition-all duration-200`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 animate-fade-in mb-6">
          <label
            htmlFor="experience_level"
            className="flex items-center text-sm font-medium text-gray-700 mb-3"
          >
            <FiClock className="mr-2 text-emerald-500" />
            Experience Level
          </label>
          <select
            name="experience_level"
            value={alldata.experience_level || ""}
            onChange={handelinputs}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select experience level</option>
            {experienceLevelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="animate-fade-in">
          <h6 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <FiClock className="mr-2 text-emerald-500" />
            Total Years of Experience
          </h6>
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="years"
                className="block text-xs text-gray-500 mb-1"
              >
                Years
              </label>
              <select
                name="experience_years"
                value={alldata.experience_years}
                onChange={handelinputs}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year} {year === 1 ? "year" : "years"}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label
                htmlFor="months"
                className="block text-xs text-gray-500 mb-1"
              >
                Months (optional)
              </label>
              <select
                name="experience_months"
                value={alldata.experience_months}
                onChange={handelinputs}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select months</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month} {month === 1 ? "month" : "months"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

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
          <p className="text-xs text-gray-500 mt-1">
            Separate multiple roles with commas
          </p>
        </div>

        <div className="animate-fade-in">
          <h6 className="text-sm font-medium text-gray-700 mb-3">
            Company Name
          </h6>
          <input
            type="text"
            placeholder="e.g. Tech Solutions Inc."
            name="company_name"
            value={alldata.company_name}
            onChange={handelinputs}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
          />
        </div>

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
  );
};

export default Three;