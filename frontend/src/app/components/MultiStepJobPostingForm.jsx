'use client';



import { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { baseurl } from './common';
import Select from 'react-select';

const MultiStepJobPostingForm = ({ userdata }) => {
  const skillsOptions = [
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Python', label: 'Python' },
    { value: 'Django', label: 'Django' },
    { value: 'PHP', label: 'PHP' },
    { value: 'Laravel', label: 'Laravel' },
    { value: 'MySQL', label: 'MySQL' },
    { value: 'MongoDB', label: 'MongoDB' },
  ];
  console.log('userdata', userdata)
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    jobType: '',
    location: '',
    payType: '',
    minSalary: '',
    maxSalary: '',
    educationLevel: '',
    experienceLevel: '',
    genderPreference: 'No Preference',
    preferredRoles: [],
    jobOverview: '',
    keyResponsibilities: '',
    requiredSkills: [],
    perks: [],
    interviewMode: 'Online',
    contactPreference: [],
    interviewLocation: '',
    contactEmail: '',
    contactPhone: '',
    interviewDate: '',
    interviewTime: '',
    experienceMax: '',

  });

  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [apiError, setApiError] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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


  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const savedData = localStorage.getItem('jobPostingFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          [name]: Array.isArray(prev[name]) ? [...prev[name], value] : [value],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: Array.isArray(prev[name]) ? prev[name].filter((item) => item !== value) : [],
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    localStorage.setItem('jobPostingFormData', JSON.stringify(formData));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required';
        if (!formData.location) newErrors.location = 'Location is required';
        break;
      case 2:
        if (!formData.educationLevel) newErrors.educationLevel = 'Education level is required';
        if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
        break;
      case 3:
        if (!formData.jobOverview) newErrors.jobOverview = 'Job overview is required';
       
        break;
      case 4:
        if (!formData.contactEmail && !formData.contactPhone) {
          newErrors.contact = 'Either email or phone is required';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    console.log(currentStep)
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setShowConfirmation(true);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  console.log(isLoggedIn.id)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;


    const apiData = {
      employer_id: isLoggedIn.id,

      job_title: formData.jobTitle,
      job_type: formData.jobType,
      location: formData.location,
      work_location_type: formData.interviewMode === 'Online' ? 'Work from Home' : formData.interviewMode === 'Walk-in' ? 'Work from Office' : 'Hybrid',
      compensation: `${formData.minSalary}-${formData.maxSalary}`,
      pay_type: formData.payType,
      joining_fee: false,
      basic_requirements: formData.keyResponsibilities || 'null',
      additional_requirements: JSON.stringify(formData.requiredSkills),
      is_walkin_interview: formData.interviewMode === 'Walk-in',
      communication_preference: formData.contactPreference.includes('Phone') ? 'Call' : formData.contactPreference.includes('Email') ? 'Whatsapp' : 'No Preference',
      total_experience_required: formData.experienceLevel === 'Entry Level' ? 0 : formData.experienceLevel === 'Mid Level' ? 3 : formData.experienceLevel === 'Senior Level' ? 7 : 10,
      other_job_titles: JSON.stringify(formData.preferredRoles),
      degree_specialization: JSON.stringify([formData.educationLevel]),
      job_description: formData.jobOverview,
      job_expire_time: parseInt(formData.jobExpireTime),
      number_of_candidates_required: parseInt(formData.numberOfCandidatesRequired),
    };

    try {
      const response = await axios.post(`${baseurl}/job-posts`, apiData, {
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization header if needed, e.g., 'Bearer ' + token
        },
      });

      // Handle success
      alert('Job posting submitted successfully!');
      setFormData({
        companyName: '',

        jobTitle: '',
        jobType: '',
        location: '',
        payType: '',
        minSalary: '',
        maxSalary: '',
        educationLevel: '',
        experienceLevel: '',
        genderPreference: 'No Preference',
        preferredRoles: [],
        jobOverview: '',
        keyResponsibilities: '',
        requiredSkills: [],
        perks: [],
        interviewMode: 'Online',
        contactPreference: [],
        interviewLocation: '',
        contactEmail: '',
        contactPhone: '',
        interviewDate: '',
        interviewTime: '',
        joiningFee: false,
        jobExpireTime: 7,
        numberOfCandidatesRequired: 1,
      });
      setCurrentStep(1);
      setShowConfirmation(false);
      localStorage.removeItem('jobPostingFormData');
      setApiError(null);
    } catch (error) {
      // Handle API errors
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        setApiError('Validation failed. Please check the form fields.');
      } else {
        setApiError(error.response?.data?.message || 'Failed to create job post');
      }
      console.error('API Error:', error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-800">Company Name *</label>
              <select
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className={`mt-2 w-full rounded-lg border ${errors.companyName ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              >
                <option value="">Select a company</option>o
                <option value={userdata?.company_name}>
                  {userdata?.company_name}
                </option>


              </select>
              {errors.companyName && <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">Job Title *</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className={`mt-2 w-full rounded-lg border ${errors.jobTitle ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              />
              {errors.jobTitle && <p className="mt-1 text-xs text-red-500">{errors.jobTitle}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">Job Type *</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                className={`mt-2 w-full rounded-lg border ${errors.jobType ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              >
                <option value="">Select Job Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Freelance">Remote</option>
              </select>
              {errors.jobType && <p className="mt-1 text-xs text-red-500">{errors.jobType}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`mt-2 w-full rounded-lg border ${errors.location ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              />
              {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800">Pay Type *</label>
                <select
                  name="payType"
                  value={formData.payType}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${errors.payType ? 'border-red-500' : 'border-gray-300'
                    } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                >
                  <option value="">Select Pay Type</option>
                  <option value="Salary">Salary</option>
                  <option value="Fixed Salary">Fixed Salary</option>
                </select>
                {errors.payType && <p className="mt-1 text-xs text-red-500">{errors.payType}</p>}
              </div>

              {formData.payType === 'Fixed Salary' ? (
                <div>
                  <label className="block text-sm font-semibold text-gray-800">Fixed Salary *</label>
                  <input
                    type="number"
                    name="minSalary"
                    value={formData.minSalary || ''}
                    onChange={handleInputChange}
                    className={`mt-2 w-full rounded-lg border ${errors.minSalary ? 'border-red-500' : 'border-gray-300'
                      } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  />
                  {errors.minSalary && <p className="mt-1 text-xs text-red-500">{errors.minSalary}</p>}
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800">Minimum Salary *</label>
                    <input
                      type="number"
                      name="minSalary"
                      value={formData.minSalary || ''}
                      onChange={handleInputChange}
                      className={`mt-2 w-full rounded-lg border ${errors.minSalary ? 'border-red-500' : 'border-gray-300'
                        } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    />
                    {errors.minSalary && <p className="mt-1 text-xs text-red-500">{errors.minSalary}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800">Maximum Salary *</label>
                    <input
                      type="number"
                      name="maxSalary"
                      value={formData.maxSalary || ''}
                      onChange={handleInputChange}
                      className={`mt-2 w-full rounded-lg border ${errors.maxSalary ? 'border-red-500' : 'border-gray-300'
                        } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    />
                    {errors.maxSalary && <p className="mt-1 text-xs text-red-500">{errors.maxSalary}</p>}
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-semibold text-gray-800">Job Expiry (days) *</label>
                <input
                  type="number"
                  name="jobExpireTime"
                  value={formData.jobExpireTime}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${errors.jobExpireTime ? 'border-red-500' : 'border-gray-300'
                    } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  min="1"
                />
                {errors.jobExpireTime && <p className="mt-1 text-xs text-red-500">{errors.jobExpireTime}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800">Number of Vacancies Required *</label>
                <input
                  type="number"
                  name="numberOfCandidatesRequired"
                  value={formData.numberOfCandidatesRequired}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${errors.numberOfCandidatesRequired ? 'border-red-500' : 'border-gray-300'
                    } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  min="1"
                />
                {errors.numberOfCandidatesRequired && (
                  <p className="mt-1 text-xs text-red-500">{errors.numberOfCandidatesRequired}</p>
                )}
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-800">Education Level *</label>
              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleInputChange}
                className={`mt-2 w-full rounded-lg border ${errors.educationLevel ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              >
                <option value="">Select Education Level</option>
                <option value="High School">High School</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="PhD">PhD</option>
              </select>
              {errors.educationLevel && (
                <p className="mt-1 text-xs text-red-500">{errors.educationLevel}</p>
              )}
            </div>

            {/* Conditionally show course/stream dropdown */}
            {['Bachelor\'s Degree', 'Master\'s Degree', 'PhD'].includes(formData.educationLevel) && (
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-800">Course / Stream *</label>
                <select
                  name="courseStream"
                  value={formData.courseStream}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${errors.courseStream ? 'border-red-500' : 'border-gray-300'
                    } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                >
                  <option value="">Select Course / Stream</option>

                  {/* Bachelor's options */}
                  {formData.educationLevel === "Bachelor's Degree" && (
                    <>
                      <option value="B.Sc (Bachelor of Science)">B.Sc (Bachelor of Science)</option>
                      <option value="B.Com (Bachelor of Commerce)">B.Com (Bachelor of Commerce)</option>
                      <option value="B.Tech (Bachelor of Technology)">B.Tech (Bachelor of Technology)</option>
                      <option value="BBA (Bachelor of Business Administration)">BBA (Bachelor of Business Administration)</option>
                      <option value="BA (Bachelor of Arts)">BA (Bachelor of Arts)</option>
                      <option value="BCA (Bachelor of Computer Applications)">BCA (Bachelor of Computer Applications)</option>
                      <option value="B.Pharm (Bachelor of Pharmacy)">B.Pharm (Bachelor of Pharmacy)</option>
                      <option value="B.Ed (Bachelor of Education)">B.Ed (Bachelor of Education)</option>
                      <option value="LLB (Bachelor of Law)">LLB (Bachelor of Law)</option>
                      <option value="B.Arch (Bachelor of Architecture)">B.Arch (Bachelor of Architecture)</option>

                    </>
                  )}

                  {/* Master's options */}
                  {formData.educationLevel === "Master's Degree" && (
                    <>
                      <option value="M.Sc (Master of Science)">M.Sc (Master of Science)</option>
                      <option value="M.Com (Master of Commerce)">M.Com (Master of Commerce)</option>
                      <option value="M.Tech (Master of Technology)">M.Tech (Master of Technology)</option>
                      <option value="MBA (Master of Business Administration)">MBA (Master of Business Administration)</option>
                      <option value="MA (Master of Arts)">MA (Master of Arts)</option>
                      <option value="MCA (Master of Computer Applications)">MCA (Master of Computer Applications)</option>
                      <option value="M.Pharm (Master of Pharmacy)">M.Pharm (Master of Pharmacy)</option>
                      <option value="M.Ed (Master of Education)">M.Ed (Master of Education)</option>
                      <option value="LLM (Master of Law)">LLM (Master of Law)</option>
                      <option value="M.Arch (Master of Architecture)">M.Arch (Master of Architecture)</option>
                    </>
                  )}

                  {/* PhD options */}
                  {formData.educationLevel === "PhD" && (
                    <>
                      <option value="PhD in Computer Science">PhD in Computer Science</option>
                      <option value="PhD in Management">PhD in Management</option>
                      <option value="PhD in Chemistry">PhD in Chemistry</option>
                    </>
                  )}
                </select>
                {errors.courseStream && (
                  <p className="mt-1 text-xs text-red-500">{errors.courseStream}</p>
                )}
              </div>
            )}


            {/* <div>
              <label className="block text-sm font-semibold text-gray-800">Experience Level *</label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleInputChange}
                className={`mt-2 w-full rounded-lg border ${errors.experienceLevel ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              >
                <option value="">Select Experience Level</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
                <option value="Executive">Executive</option>
              </select>
              {errors.experienceLevel && <p className="mt-1 text-xs text-red-500">{errors.experienceLevel}</p>}
            </div> */}

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800">Minimum Experience (Years)</label>
                <input
                  type="number"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${errors.experienceMin ? 'border-red-500' : 'border-gray-300'
                    } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  min="0"
                />
                {errors.experienceLevel && <p className="mt-1 text-xs text-red-500">{errors.experienceLevel}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800">Maximum Experience (Years)</label>
                <input
                  type="number"
                  name="experienceMax"
                  value={formData.experienceMax}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${errors.experienceMax ? 'border-red-500' : 'border-gray-300'
                    } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  min={formData.experienceLevel || 0}
                />
                {errors.experienceMax && <p className="mt-1 text-xs text-red-500">{errors.experienceMax}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">Gender Preference</label>
              <div className="mt-3 grid grid-cols-2 gap-4">
                {['No Preference', 'Male', 'Female', 'Other'].map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="genderPreference"
                      value={option}
                      checked={formData.genderPreference === option}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 transition-all duration-300"
                    />
                    <label className="ml-2 text-sm text-gray-700">{option}</label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">Preferred Roles</label>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Software Engineer', 'Product Manager', 'Designer', 'Marketing Specialist', 'Sales Representative'].map(
                  (role) => (
                    <div key={role} className="flex items-center">
                      <input
                        type="checkbox"
                        name="preferredRoles"
                        value={role}
                        checked={formData.preferredRoles.includes(role)}
                        onChange={handleInputChange}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 transition-all duration-300"
                      />
                      <label className="ml-2 text-sm text-gray-700">{role}</label>
                    </div>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-800">Job Overview *</label>
              <textarea
                name="jobOverview"
                value={formData.jobOverview}
                onChange={handleInputChange}
                rows={5}
                className={`mt-2 w-full rounded-lg border ${errors.jobOverview ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none`}
              />
              {errors.jobOverview && <p className="mt-1 text-xs text-red-500">{errors.jobOverview}</p>}
            </div>

            {/* <div>
              <label className="block text-sm font-semibold text-gray-800">Key Responsibilities *</label>
              <textarea
                name="keyResponsibilities"
                value={formData.keyResponsibilities}
                onChange={handleInputChange}
                rows={5}
                placeholder="Enter responsibilities (one per line)"
                className={`mt-2 w-full rounded-lg border ${errors.keyResponsibilities ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none`}
              />
              {errors.keyResponsibilities && <p className="mt-1 text-xs text-red-500">{errors.keyResponsibilities}</p>}
            </div> */}

            <Select
              isMulti
              name="requiredSkills"
              options={skillsOptions}
              className="mt-2 text-sm"
              classNamePrefix="select"
              value={skillsOptions.filter(option =>
                formData.requiredSkills.includes(option.value)
              )}
              onChange={(selected) => {
                const values = selected.map(option => option.value);
                setFormData((prev) => ({ ...prev, requiredSkills: values }));
              }}
              placeholder="Select skills..."
            />



            <div>
              <label className="block text-sm font-semibold text-gray-800">Optional Perks</label>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Health Insurance',
                  'Remote Work',
                  'Flexible Hours',
                  'Professional Development',
                  'Transportation Allowance',
                ].map((perk) => (
                  <div key={perk} className="flex items-center">
                    <input
                      type="checkbox"
                      name="perks"
                      value={perk}
                      checked={formData.perks.includes(perk)}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 transition-all duration-300"
                    />
                    <label className="ml-2 text-sm text-gray-700">{perk}</label>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-800">Interview Mode *</label>
              <div className="mt-3 grid grid-cols-3 gap-4">
                {['Online', 'Walk-in', 'Hybrid'].map((mode) => (
                  <div key={mode} className="flex items-center">
                    <input
                      type="radio"
                      name="interviewMode"
                      value={mode}
                      checked={formData.interviewMode === mode}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 transition-all duration-300"
                    />
                    <label className="ml-2 text-sm text-gray-700">{mode}</label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">Contact Preference *</label>
              <div className="mt-3 grid grid-cols-3 gap-4">
                {['Email', 'Phone', 'LinkedIn'].map((preference) => (
                  <div key={preference} className="flex items-center">
                    <input
                      type="checkbox"
                      name="contactPreference"
                      value={preference}
                      checked={formData.contactPreference.includes(preference)}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 transition-all duration-300"
                    />
                    <label className="ml-2 text-sm text-gray-700">{preference}</label>
                  </div>
                ))}
              </div>
              {errors.contactPreference && <p className="mt-1 text-xs text-red-500">{errors.contactPreference}</p>}
            </div>

            {formData.interviewMode !== 'Online' && (
              <div>
                <label className="block text-sm font-semibold text-gray-800">Interview Location *</label>
                <input
                  type="text"
                  name="interviewLocation"
                  value={formData.interviewLocation}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${errors.interviewLocation ? 'border-red-500' : 'border-gray-300'
                    } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                />
                {errors.interviewLocation && <p className="mt-1 text-xs text-red-500">{errors.interviewLocation}</p>}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${errors.contact ? 'border-red-500' : 'border-gray-300'
                    } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800">Contact Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${errors.contact ? 'border-red-500' : 'border-gray-300'
                    } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                />
              </div>
            </div>
            {errors.contact && <p className="mt-1 text-xs text-red-500">{errors.contact}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800">Interview Date</label>
                <input
                  type="date"
                  name="interviewDate"
                  value={formData.interviewDate}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800">Interview Time</label>
                <input
                  type="time"
                  name="interviewTime"
                  value={formData.interviewTime}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-2xl rounded-2xl p-8"
        >
          {apiError && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">{apiError}</div>
          )}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">Post a New Job</h2>
              <span className="text-sm text-gray-500 font-medium">Step {currentStep} of 4</span>
            </div>
            <div className="mt-6">
              <div className="relative">
                <div className="overflow-hidden h-2 rounded-full bg-gray-200">
                  <motion.div
                    animate={{ width: `${(currentStep / 4) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {['Basic Info', 'Qualifications', 'Description', 'Interview'].map((label, index) => (
                    <div key={index} className="text-center">
                      <div
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                          } transition-all duration-300`}
                      >
                        {index + 1}
                      </div>
                      <span className="block mt-1 text-xs text-gray-600">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

            <div className="mt-10 flex flex-col sm:flex-row justify-between gap-4">
              <motion.button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                whileHover={{ scale: currentStep === 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentStep === 1 ? 1 : 0.95 }}
                className={`flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <FaChevronLeft className="mr-2" />
                Back
              </motion.button>

              <motion.button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className={`flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${isSubmitting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                  }`}
              >
                {isSubmitting ? 'Submitting...' : currentStep === 4 ? 'Review' : 'Next'}
                {!isSubmitting && <FaChevronRight className="ml-2" />}
              </motion.button>
            </div>
          </form>
        </motion.div>

        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Review Job Posting</h3>
                <div className="space-y-6">
                  <div>
                    <dt className="font-semibold text-gray-800">Company Name</dt>
                    <dd className="text-gray-600">{formData.companyName || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Job Title</dt>
                    <dd className="text-gray-600">{formData.jobTitle || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Location</dt>
                    <dd className="text-gray-600">{formData.location || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Job Type</dt>
                    <dd className="text-gray-600">{formData.jobType || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Salary Range</dt>
                    <dd className="text-gray-600">
                      {formData.minSalary && formData.maxSalary
                        ? `${formData.minSalary} - ${formData.maxSalary} (${formData.payType || 'Not specified'})`
                        : 'Not specified'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Education Level</dt>
                    <dd className="text-gray-600">{formData.educationLevel || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Experience Level</dt>
                    <dd className="text-gray-600">{formData.experienceLevel || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Gender Preference</dt>
                    <dd className="text-gray-600">{formData.genderPreference || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Preferred Roles</dt>
                    <dd className="text-gray-600">{formData.preferredRoles.join(', ') || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Job Overview</dt>
                    <dd className="text-gray-600">{formData.jobOverview || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Key Responsibilities</dt>
                    <dd className="text-gray-600">{formData.keyResponsibilities || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Required Skills</dt>
                    <dd className="text-gray-600">{formData.requiredSkills.join(', ') || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Perks</dt>
                    <dd className="text-gray-600">{formData.perks.join(', ') || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Interview Mode</dt>
                    <dd className="text-gray-600">{formData.interviewMode || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Interview Location</dt>
                    <dd className="text-gray-600">{formData.interviewLocation || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Contact Information</dt>
                    <dd className="text-gray-600">
                      {formData.contactEmail || formData.contactPhone
                        ? `${formData.contactEmail} ${formData.contactPhone}`
                        : 'Not specified'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Contact Preference</dt>
                    <dd className="text-gray-600">{formData.contactPreference.join(', ') || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Interview Date & Time</dt>
                    <dd className="text-gray-600">
                      {formData.interviewDate && formData.interviewTime
                        ? `${formData.interviewDate} at ${formData.interviewTime}`
                        : 'Not specified'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Joining Fee</dt>
                    <dd className="text-gray-600">{formData.joiningFee ? 'Yes' : 'No'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Job Expiry</dt>
                    <dd className="text-gray-600">{formData.jobExpireTime} days</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Number of Candidates Required</dt>
                    <dd className="text-gray-600">{formData.numberOfCandidatesRequired}</dd>
                  </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
                  <motion.button
                    type="button"
                    onClick={() => setShowConfirmation(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
                  >
                    <FaTimes className="mr-2" />
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className={`flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${isSubmitting
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                      }`}
                  >
                    <FaCheck className="mr-2" />
                    {isSubmitting ? 'Submitting...' : 'Submit Job Posting'}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>

  );
};

export default MultiStepJobPostingForm;