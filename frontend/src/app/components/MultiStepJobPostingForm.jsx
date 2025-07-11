'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaCheck, FaTimes, FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { baseurl } from './common';
import CreatableSelect from 'react-select/creatable';
import debounce from 'lodash/debounce';

const MultiStepJobPostingForm = ({ userdata, companies }) => {
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
    { value: 'Java', label: 'Java' },
    { value: 'C++', label: 'C++' },
    { value: 'C#', label: 'C#' },
    { value: 'Ruby', label: 'Ruby' },
    { value: 'Go', label: 'Go' },
    { value: 'Swift', label: 'Swift' },
    { value: 'Kotlin', label: 'Kotlin' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'R', label: 'R' },
    { value: 'Scala', label: 'Scala' },
    { value: 'Angular', label: 'Angular' },
    { value: 'Vue.js', label: 'Vue.js' },
    { value: 'Express.js', label: 'Express.js' },
    { value: 'Spring Boot', label: 'Spring Boot' },
    { value: 'Flask', label: 'Flask' },
    { value: 'Ruby on Rails', label: 'Ruby on Rails' },
    { value: '.NET', label: '.NET' },
    { value: 'jQuery', label: 'jQuery' },
    { value: 'TensorFlow', label: 'TensorFlow' },
    { value: 'PyTorch', label: 'PyTorch' },
    { value: 'PostgreSQL', label: 'PostgreSQL' },
    { value: 'Oracle', label: 'Oracle' },
    { value: 'Redis', label: 'Redis' },
    { value: 'SQLite', label: 'SQLite' },
    { value: 'Cassandra', label: 'Cassandra' },
    { value: 'AWS', label: 'AWS' },
    { value: 'Azure', label: 'Azure' },
    { value: 'Google Cloud', label: 'Google Cloud' },
    { value: 'Docker', label: 'Docker' },
    { value: 'Kubernetes', label: 'Kubernetes' },
    { value: 'Jenkins', label: 'Jenkins' },
    { value: 'Terraform', label: 'Terraform' },
    { value: 'Ansible', label: 'Ansible' },
    { value: 'Git', label: 'Git' },
    { value: 'CI/CD', label: 'CI/CD' },
    { value: 'SQL', label: 'SQL' },
    { value: 'Tableau', label: 'Tableau' },
    { value: 'Power BI', label: 'Power BI' },
    { value: 'Pandas', label: 'Pandas' },
    { value: 'NumPy', label: 'NumPy' },
    { value: 'Hadoop', label: 'Hadoop' },
    { value: 'Spark', label: 'Spark' },
    { value: 'Sass', label: 'Sass' },
    { value: 'Tailwind CSS', label: 'Tailwind CSS' },
    { value: 'Bootstrap', label: 'Bootstrap' },
    { value: 'Figma', label: 'Figma' },
    { value: 'Adobe XD', label: 'Adobe XD' },
    { value: 'Communication', label: 'Communication' },
    { value: 'Teamwork', label: 'Teamwork' },
    { value: 'Problem Solving', label: 'Problem Solving' },
    { value: 'Leadership', label: 'Leadership' },
    { value: 'Time Management', label: 'Time Management' },
    { value: 'GraphQL', label: 'GraphQL' },
    { value: 'REST API', label: 'REST API' },
    { value: 'Web Security', label: 'Web Security' },
    { value: 'Agile Methodology', label: 'Agile Methodology' },
    { value: 'Scrum', label: 'Scrum' },
  ];

  const courseOptions = {
    'Graduated': [
      { value: 'BCA', label: 'BCA' },
      { value: 'B.Tech', label: 'B.Tech' },
      { value: 'B.Sc', label: 'B.Sc' },
      { value: 'BBA', label: 'BBA' },
      { value: 'BA', label: 'BA' },
    ],
    'Masters': [
      { value: 'MCA', label: 'MCA' },
      { value: 'M.Tech', label: 'M.Tech' },
      { value: 'M.Sc', label: 'M.Sc' },
      { value: 'MBA', label: 'MBA' },
      { value: 'MA', label: 'MA' },
    ],
  };

  const specializationOptions = {
    'BCA': [
      { value: 'Computer Science', label: 'Computer Science' },
      { value: 'Information Technology', label: 'Information Technology' },
      { value: 'Data Science', label: 'Data Science' },
    ],
    'B.Tech': [
      { value: 'Computer Science', label: 'Computer Science' },
      { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
      { value: 'Electrical Engineering', label: 'Electrical Engineering' },
      { value: 'Civil Engineering', label: 'Civil Engineering' },
    ],
    'B.Sc': [
      { value: 'Physics', label: 'Physics' },
      { value: 'Chemistry', label: 'Chemistry' },
      { value: 'Mathematics', label: 'Mathematics' },
      { value: 'Biology', label: 'Biology' },
    ],
    'BBA': [
      { value: 'Marketing', label: 'Marketing' },
      { value: 'Finance', label: 'Finance' },
      { value: 'Human Resources', label: 'Human Resources' },
    ],
    'BA': [
      { value: 'English', label: 'English' },
      { value: 'History', label: 'History' },
      { value: 'Economics', label: 'Economics' },
    ],
    'MCA': [
      { value: 'Software Development', label: 'Software Development' },
      { value: 'Data Science', label: 'Data Science' },
      { value: 'Cybersecurity', label: 'Cybersecurity' },
    ],
    'M.Tech': [
      { value: 'Computer Science', label: 'Computer Science' },
      { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
      { value: 'Electrical Engineering', label: 'Electrical Engineering' },
    ],
    'M.Sc': [
      { value: 'Physics', label: 'Physics' },
      { value: 'Chemistry', label: 'Chemistry' },
      { value: 'Mathematics', label: 'Mathematics' },
    ],
    'MBA': [
      { value: 'Marketing', label: 'Marketing' },
      { value: 'Finance', label: 'Finance' },
      { value: 'Operations', label: 'Operations' },
    ],
    'MA': [
      { value: 'English', label: 'English' },
      { value: 'History', label: 'History' },
      { value: 'Sociology', label: 'Sociology' },
    ],
  };

  const [allSkillsOptions, setAllSkillsOptions] = useState(skillsOptions);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: userdata?.company_name || '',
    newCompanyName: '',
    panCard: null,
    gstCertificate: null,
    jobTitle: '',
    jobType: '',
    locations: [],
    payType: '',
    minSalary: '',
    maxSalary: '',
    educationLevel: '',
    course: '',
    specialization: '',
    englishLevel: '',
    experienceLevel: '',
    experienceMax: '',
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
    notEmail: false,
    viewedNumber: false,
    joiningFee: false,
    jobExpireTime: 7,
    numberOfCandidatesRequired: 1,
  });
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [locationInputs, setLocationInputs] = useState(['', '', '']);
  const [showNewCompanyFields, setShowNewCompanyFields] = useState(false);


  const fetchLocationSuggestions = useCallback(
    debounce(async (query, index) => {
      if (!query || query.length < 3) {
        setLocationSuggestions((prev) => {
          const newSuggestions = [...prev];
          newSuggestions[index] = [];
          return newSuggestions;
        });
        return;
      }

      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            format: 'json',
            q: query,
            addressdetails: 1,
            limit: 5,
          },
          headers: {
            'User-Agent': 'YourAppName/1.0 (contact@example.com)',
          },
        });
        setLocationSuggestions((prev) => {
          const newSuggestions = [...prev];
          newSuggestions[index] = response.data;
          return newSuggestions;
        });
      } catch (error) {
        console.error('Nominatim API error:', error);
        setErrors((prev) => ({ ...prev, locations: 'Failed to fetch location suggestions' }));
      }
    }, 500),
    [],
  );

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('employerToken');
      if (!token) return;

      try {
        const res = await axios.get(`${baseurl}/employer/profile`, {
          headers: { Authorization: `Bearer ${token}` },
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

  useEffect(() => {
    const savedData = localStorage.getItem('jobPostingFormData');
    if (savedData) {
      const { data, timestamp } = JSON.parse(savedData);
      const now = new Date().getTime();
      const thirtyMinutesInMs = 30 * 60 * 1000;
      if (now - timestamp <= thirtyMinutesInMs) {
        setFormData(data);
        setLocationInputs(
          data.locations.map((loc) => loc.address || '').concat(['', '', '']).slice(0, 3),
        );
        const customSkills = data.requiredSkills
          .filter((skill) => !skillsOptions.some((opt) => opt.value === skill))
          .map((skill) => ({ value: skill, label: skill }));
        setAllSkillsOptions([...skillsOptions, ...customSkills]);
        setShowNewCompanyFields(!!data.newCompanyName);
      } else {
        localStorage.removeItem('jobPostingFormData');
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? Array.isArray(prev[name])
            ? [...prev[name], value]
            : [value]
          : Array.isArray(prev[name])
          ? prev[name].filter((item) => item !== value)
          : [],
      }));
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        ...(name === 'educationLevel' && !['Graduated', 'Masters'].includes(value)
          ? { course: '', specialization: '' }
          : {}),
        ...(name === 'course' ? { specialization: '' } : {}),
      }));
    }
    localStorage.setItem(
      'jobPostingFormData',
      JSON.stringify({
        data: {
          ...formData,
          [name]: type === 'file' ? files[0] : value,
          ...(name === 'educationLevel' && !['Graduated', 'Masters'].includes(value)
            ? { course: '', specialization: '' }
            : {}),
          ...(name === 'course' ? { specialization: '' } : {}),
        },
        timestamp: new Date().getTime(),
      }),
    );
  };

  const handleLocationInputChange = (value, index) => {
    setLocationInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = value;
      return newInputs;
    });
    setFormData((prev) => {
      const newLocations = [...prev.locations];
      newLocations[index] = { address: value, lat: null, lon: null };
      return { ...prev, locations: newLocations.filter((loc) => loc.address) };
    });
    fetchLocationSuggestions(value, index);
  };

  const handleLocationSelect = (suggestion, index) => {
    setFormData((prev) => {
      const newLocations = [...prev.locations];
      newLocations[index] = {
        address: suggestion.display_name,
        lat: parseFloat(suggestion.lat),
        lon: parseFloat(suggestion.lon),
      };
      return { ...prev, locations: newLocations.filter((loc) => loc.address) };
    });
    setLocationInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = suggestion.display_name;
      return newInputs;
    });
    setLocationSuggestions((prev) => {
      const newSuggestions = [...prev];
      newSuggestions[index] = [];
      return newSuggestions;
    });
    localStorage.setItem(
      'jobPostingFormData',
      JSON.stringify({
        data: {
          ...formData,
          locations: formData.locations.map((loc, i) =>
            i === index ? { address: suggestion.display_name, lat: parseFloat(suggestion.lat), lon: parseFloat(suggestion.lon) } : loc,
          ),
        },
        timestamp: new Date().getTime(),
      }),
    );
  };

  const removeLocation = (index) => {
    setFormData((prev) => {
      const newLocations = prev.locations.filter((_, i) => i !== index);
      return { ...prev, locations: newLocations };
    });
    setLocationInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = '';
      return newInputs;
    });
    setLocationSuggestions((prev) => {
      const newSuggestions = [...prev];
      newSuggestions[index] = [];
      return newSuggestions;
    });
    localStorage.setItem(
      'jobPostingFormData',
      JSON.stringify({
        data: { ...formData, locations: formData.locations.filter((_, i) => i !== index) },
        timestamp: new Date().getTime(),
      }),
    );
  };

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.companyName && !formData.newCompanyName) {
          newErrors.companyName = 'Either select a company or enter a new company name';
        }
        if (showNewCompanyFields) {
          if (!formData.newCompanyName) newErrors.newCompanyName = 'New company name is required';
          if (!formData.panCard) newErrors.panCard = 'PAN card is required';
          if (!formData.gstCertificate) newErrors.gstCertificate = 'GST certificate is required';
        }
        if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required';
        if (formData.locations.length === 0) newErrors.locations = 'At least one location is required';
        if (!formData.payType) newErrors.payType = 'Pay type is required';
        if (!formData.minSalary) {
          newErrors.minSalary = formData.payType === 'Salary + Incentive' ? 'Salary is required' : 'Minimum salary is required';
        }
        if (formData.payType !== 'Fixed Salary' && !formData.maxSalary) {
          newErrors.maxSalary = formData.payType === 'Salary + Incentive' ? 'Incentive up to is required' : 'Maximum salary is required';
        }
        break;
      case 2:
        if (!formData.educationLevel) newErrors.educationLevel = 'Education level is required';
        if (['Graduated', 'Masters'].includes(formData.educationLevel)) {
          if (!formData.course) newErrors.course = 'Course is required';
          if (!formData.specialization) newErrors.specialization = 'Specialization is required';
        }
        if (!formData.englishLevel) newErrors.englishLevel = 'English level is required';
        if (!formData.experienceLevel) newErrors.experienceLevel = 'Minimum experience is required';
        if (formData.experienceMax && parseInt(formData.experienceMax) < parseInt(formData.experienceLevel)) {
          newErrors.experienceMax = 'Maximum experience must be greater than or equal to minimum';
        }
        break;
      case 3:
        if (!formData.jobOverview) newErrors.jobOverview = 'Job overview is required';
        if (formData.requiredSkills.length === 0) newErrors.requiredSkills = 'At least one skill is required';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    setIsSubmitting(true);

    const apiData = new FormData();
    apiData.append('employer_id', isLoggedIn.id);
    apiData.append('job_title', formData.jobTitle);
    apiData.append('job_type', formData.jobType);

    apiData.append('work_location_type', formData.interviewMode === 'Online' ? 'Work from Home' : formData.interviewMode === 'Walk-in' ? 'Work from Office' : 'Hybrid');


    apiData.append('joining_fee', formData.joiningFee);
    apiData.append('basic_requirements', formData.keyResponsibilities || 'null');
  


    apiData.append('total_experience_required', parseInt(formData.experienceLevel) || 0);
    apiData.append('total_experience_max', parseInt(formData.experienceMax) || null);
    apiData.append('other_job_titles', JSON.stringify(formData.preferredRoles));


    apiData.append('job_expire_time', parseInt(formData.jobExpireTime) || 7);
    apiData.append('number_of_candidates_required', parseInt(formData.numberOfCandidatesRequired));
    apiData.append('latitude', formData.locations[0]?.lat || null);
    apiData.append('longitude', formData.locations[0]?.lon || null);




    apiData.append('location', formData.locations.map(loc => loc.address).join('; '));

    apiData.append('work_location_type', formData.interviewMode === 'Online' ? 'Work from Home' : formData.interviewMode === 'Walk-in' ? 'Work from Office' : 'Hybrid');
    apiData.append('compensation', formData.payType === 'Fixed Salary' ? formData.minSalary : `${formData.minSalary}-${formData.maxSalary}`);
    apiData.append('pay_type', formData.payType === 'Salary + Incentive' ? 'Salary' : formData.payType === 'Fixed Salary' ? 'Salary' : formData.payType); // Map to backend values


    apiData.append('additional_requirements', JSON.stringify(formData.requiredSkills));
    apiData.append('is_walkin_interview', formData.interviewMode === 'Walk-in');
    apiData.append('communication_preference', formData.contactPreference[0] || 'No Preference');

  
    apiData.append('degree_specialization', JSON.stringify([formData.educationLevel, formData.course, formData.specialization]));
    apiData.append('job_description', formData.jobOverview);
   

    apiData.append('english_level', formData.englishLevel);
    apiData.append('gender_preference', formData.genderPreference);
    apiData.append('perks', JSON.stringify(formData.perks));
    apiData.append('interview_location', formData.interviewLocation);
    apiData.append('contact_email', formData.contactEmail);
    apiData.append('contact_phone', formData.contactPhone);
    apiData.append('interview_date', formData.interviewDate);
    apiData.append('interview_time', formData.interviewTime);
    apiData.append('not_email', formData.notEmail);
    apiData.append('viewed_number', formData.viewedNumber);


    if (showNewCompanyFields && formData.newCompanyName) {
      apiData.append('company_name', formData.newCompanyName);
      if (formData.panCard) apiData.append('pan_card', formData.panCard);
      if (formData.gstCertificate) apiData.append('gst_certificate', formData.gstCertificate);
    } else {
      apiData.append('company_name', formData.companyName);
    }

    try {
      const response = await axios.post(`${baseurl}/job-posts`, apiData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Job posting submitted successfully!');
      setFormData({
        companyName: '',
        newCompanyName: '',
        panCard: null,
        gstCertificate: null,
        jobTitle: '',
        jobType: '',
        locations: [],
        payType: '',
        minSalary: '',
        maxSalary: '',
        educationLevel: '',
        course: '',
        specialization: '',
        englishLevel: '',
        experienceLevel: '',
        experienceMax: '',
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
      setAllSkillsOptions(skillsOptions);
      setLocationInputs(['', '', '']);
      setLocationSuggestions([]);
      setCurrentStep(1);
      setShowConfirmation(false);
      setShowNewCompanyFields(false);
      localStorage.removeItem('jobPostingFormData');
      setApiError(null);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        setApiError('Validation failed. Please check the form fields.');
      } else {
        setApiError(error.response?.data?.message || 'Failed to create job post');
      }
      console.error('API Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkillsInputChange = (inputValue, actionMeta) => {
    if (inputValue.includes(',')) {
      const newSkill = inputValue.replace(',', '').trim();
      if (newSkill) {
        const newOption = { value: newSkill, label: newSkill };
        setAllSkillsOptions((prev) => [...prev, newOption]);
        setFormData((prev) => ({
          ...prev,
          requiredSkills: [...prev.requiredSkills, newSkill],
        }));
        localStorage.setItem(
          'jobPostingFormData',
          JSON.stringify({
            data: { ...formData, requiredSkills: [...formData.requiredSkills, newSkill] },
            timestamp: new Date().getTime(),
          }),
        );
      }
      return '';
    }
    return inputValue;
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
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-800">Company Name *</label>
              <div className="flex items-center space-x-2">
                <select
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  disabled={showNewCompanyFields}
                  className={`mt-2 w-full rounded-lg border ${
                    errors.companyName ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                    showNewCompanyFields ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                >
                  <option value="">Select a company</option>
                  {userdata?.company_name && (
                    <option key="userdata" value={userdata.company_name}>
                      {userdata.company_name}
                    </option>
                  )}
                  {companies?.map((company) => (
                    <option
                      key={company.id}
                      value={company.name}
                      disabled={!company.is_approved}
                    >
                      {company.name} {company.is_approved ? '' : '(Not Approved)'}
                    </option>
                  ))}
                </select>
                <motion.button
                  type="button"
                  onClick={() => setShowNewCompanyFields(!showNewCompanyFields)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                  title={showNewCompanyFields ? 'Cancel New Company' : 'Hire for Another Company'}
                >
                  {showNewCompanyFields ? <FaTimes /> : <FaPlus />}
                </motion.button>
              </div>
              {errors.companyName && <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>}
            </div>
            <AnimatePresence>
              {showNewCompanyFields && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-800">New Company Name *</label>
                    <input
                      type="text"
                      name="newCompanyName"
                      value={formData.newCompanyName}
                      onChange={handleInputChange}
                      className={`mt-2 w-full rounded-lg border ${
                        errors.newCompanyName ? 'border-red-500' : 'border-gray-300'
                      } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    />
                    {errors.newCompanyName && (
                      <p className="mt-1 text-xs text-red-500">{errors.newCompanyName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800">PAN Card *</label>
                    <input
                      type="file"
                      name="panCard"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleInputChange}
                      className={`mt-2 w-full rounded-lg border ${
                        errors.panCard ? 'border-red-500' : 'border-gray-300'
                      } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    />
                    {errors.panCard && (
                      <p className="mt-1 text-xs text-red-500">{errors.panCard}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800">GST Certificate *</label>
                    <input
                      type="file"
                      name="gstCertificate"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleInputChange}
                      className={`mt-2 w-full rounded-lg border ${
                        errors.gstCertificate ? 'border-red-500' : 'border-gray-300'
                      } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    />
                    {errors.gstCertificate && (
                      <p className="mt-1 text-xs text-red-500">{errors.gstCertificate}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div>
              <label className="block text-sm font-semibold text-gray-800">Job Title *</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className={`mt-2 w-full rounded-lg border ${
                  errors.jobTitle ? 'border-red-500' : 'border-gray-300'
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
                className={`mt-2 w-full rounded-lg border ${
                  errors.jobType ? 'border-red-500' : 'border-gray-300'
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
              <label className="block text-sm font-semibold text-gray-800">Office Address / Landmark * (Select up to 3)</label>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="mt-2 relative">
                  <input
                    type="text"
                    value={locationInputs[index]}
                    onChange={(e) => handleLocationInputChange(e.target.value, index)}
                    placeholder={`Enter location ${index + 1}`}
                    className={`w-full rounded-lg border ${
                      errors.locations ? 'border-red-500' : 'border-gray-300'
                    } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  />
                  {formData.locations[index]?.address && (
                    <button
                      type="button"
                      onClick={() => removeLocation(index)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-600"
                    >
                      <FaTimes />
                    </button>
                  )}
                  {locationSuggestions[index]?.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
                      {locationSuggestions[index].map((suggestion) => (
                        <div
                          key={suggestion.place_id}
                          onClick={() => handleLocationSelect(suggestion, index)}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition-all duration-200"
                        >
                          {suggestion.display_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {errors.locations && <p className="mt-1 text-xs text-red-500">{errors.locations}</p>}
              {formData.locations.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Selected: {formData.locations.map((loc) => loc.address).join(', ')}
                  </p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800">Pay Type *</label>
                <select
                  name="payType"
                  value={formData.payType}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${
                    errors.payType ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                >
                  <option value="">Select Pay Type</option>
                  <option value="Salary">Salary</option>
                  <option value="Salary + Incentive">Salary + Incentive</option>
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
                    className={`mt-2 w-full rounded-lg border ${
                      errors.minSalary ? 'border-red-500' : 'border-gray-300'
                    } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  />
                  {errors.minSalary && <p className="mt-1 text-xs text-red-500">{errors.minSalary}</p>}
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800">
                      {formData.payType === 'Salary + Incentive' ? 'Salary *' : 'Minimum Salary *'}
                    </label>
                    <input
                      type="number"
                      name="minSalary"
                      value={formData.minSalary || ''}
                      onChange={handleInputChange}
                      className={`mt-2 w-full rounded-lg border ${
                        errors.minSalary ? 'border-red-500' : 'border-gray-300'
                      } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    />
                    {errors.minSalary && <p className="mt-1 text-xs text-red-500">{errors.minSalary}</p>}
                  </div>
                  {formData.payType && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-800">
                        {formData.payType === 'Salary + Incentive' ? 'Incentive Up To *' : 'Maximum Salary *'}
                      </label>
                      <input
                        type="number"
                        name="maxSalary"
                        value={formData.maxSalary || ''}
                        onChange={handleInputChange}
                        className={`mt-2 w-full rounded-lg border ${
                          errors.maxSalary ? 'border-red-500' : 'border-gray-300'
                        } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                      />
                      {errors.maxSalary && <p className="mt-1 text-xs text-red-500">{errors.maxSalary}</p>}
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800">Number of Vacancies Required *</label>
                <input
                  type="number"
                  name="numberOfCandidatesRequired"
                  value={formData.numberOfCandidatesRequired}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${
                    errors.numberOfCandidatesRequired ? 'border-red-500' : 'border-gray-300'
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
                className={`mt-2 w-full rounded-lg border ${
                  errors.educationLevel ? 'border-red-500' : 'border-gray-300'
                } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              >
                <option value="">Select Education Level</option>
                <option value="Graduation Not Required">Graduation Not Required</option>
                <option value="Graduated">Graduated</option>
                <option value="Masters">Masters</option>
                <option value="Others">Others</option>
              </select>
              {errors.educationLevel && (
                <p className="mt-1 text-xs text-red-500">{errors.educationLevel}</p>
              )}
            </div>
            <AnimatePresence>
              {['Graduated', 'Masters'].includes(formData.educationLevel) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-800">Course *</label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      className={`mt-2 w-full rounded-lg border ${
                        errors.course ? 'border-red-500' : 'border-gray-300'
                      } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    >
                      <option value="">Select Course</option>
                      {courseOptions[formData.educationLevel]?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.course && (
                      <p className="mt-1 text-xs text-red-500">{errors.course}</p>
                    )}
                  </div>
                  {formData.course && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-800">Specialization *</label>
                      <select
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        className={`mt-2 w-full rounded-lg border ${
                          errors.specialization ? 'border-red-500' : 'border-gray-300'
                        } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                      >
                        <option value="">Select Specialization</option>
                        {specializationOptions[formData.course]?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.specialization && (
                        <p className="mt-1 text-xs text-red-500">{errors.specialization}</p>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <div>
              <label className="block text-sm font-semibold text-gray-800">English Level Required *</label>
              <select
                name="englishLevel"
                value={formData.englishLevel}
                onChange={handleInputChange}
                className={`mt-2 w-full rounded-lg border ${
                  errors.englishLevel ? 'border-red-500' : 'border-gray-300'
                } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              >
                <option value="">Select English Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Fluent">Fluent</option>
              </select>
              {errors.englishLevel && (
                <p className="mt-1 text-xs text-red-500">{errors.englishLevel}</p>
              )}
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800">Minimum Experience (Years) *</label>
                <input
                  type="number"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${
                    errors.experienceLevel ? 'border-red-500' : 'border-gray-300'
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
                  className={`mt-2 w-full rounded-lg border ${
                    errors.experienceMax ? 'border-red-500' : 'border-gray-300'
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
                className={`mt-2 w-full rounded-lg border ${
                  errors.jobOverview ? 'border-red-500' : 'border-gray-300'
                } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none`}
              />
              {errors.jobOverview && <p className="mt-1 text-xs text-red-500">{errors.jobOverview}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">Required Skills * (Type and add with comma)</label>
              <CreatableSelect
                isMulti
                name="requiredSkills"
                options={allSkillsOptions}
                className="mt-2 text-sm"
                classNamePrefix="select"
                value={formData.requiredSkills.map((skill) => ({
                  value: skill,
                  label: skill,
                }))}
                onChange={(selected) => {
                  const values = selected ? selected.map((option) => option.value) : [];
                  setFormData((prev) => ({ ...prev, requiredSkills: values }));
                  localStorage.setItem(
                    'jobPostingFormData',
                    JSON.stringify({ data: { ...formData, requiredSkills: values }, timestamp: new Date().getTime() }),
                  );
                }}
                onInputChange={handleSkillsInputChange}
                onCreateOption={(inputValue) => {
                  const newSkill = inputValue.trim();
                  if (newSkill) {
                    const newOption = { value: newSkill, label: newSkill };
                    setAllSkillsOptions((prev) => [...prev, newOption]);
                    setFormData((prev) => ({
                      ...prev,
                      requiredSkills: [...prev.requiredSkills, newSkill],
                    }));
                    localStorage.setItem(
                      'jobPostingFormData',
                      JSON.stringify({
                        data: { ...formData, requiredSkills: [...formData.requiredSkills, newSkill] },
                        timestamp: new Date().getTime(),
                      }),
                    );
                  }
                }}
                placeholder="Select or type skills (add with comma)..."
                formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
              />
              {errors.requiredSkills && (
                <p className="mt-1 text-xs text-red-500">{errors.requiredSkills}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">Optional Perks</label>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Health Insurance',
                  'Remote Work',
                  'Provident Fund',
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
                  className={`mt-2 w-full rounded-lg border ${
                    errors.interviewLocation ? 'border-red-500' : 'border-gray-300'
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
                  disabled
                  value={userdata?.contact_email}

                  className={`mt-2 w-full rounded-lg bg-slate-200 border ${
                    errors.contact ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                />
                <div className="mt-2">
                  <label className="flex items-center text-sm text-gray-800">
                    <input
                      type="checkbox"
                      name="notEmail"
                      checked={formData.notEmail}
                      onChange={handleInputChange}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    Do not use email
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800">Contact Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={userdata.contact_phone}
                
     className={`mt-2 w-full rounded-lg bg-slate-200 border ${
                    errors.contact ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                />
                <div className="mt-2">
                  <label className="flex items-center text-sm text-gray-800">
                    <input
                      type="checkbox"
                      name="viewedNumber"
                      checked={formData.viewedNumber}
                      onChange={handleInputChange}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    Allow phone number to be viewed
                  </label>
                </div>
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


  console.log('userdata?.company_name',userdata)
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
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-semibold ${
                          currentStep >= index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
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
                className={`flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  currentStep === 1
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
                className={`flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isSubmitting
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
                    <dd className="text-gray-600">{formData.newCompanyName || formData.companyName || 'Not specified'}</dd>
                  </div>
                  {showNewCompanyFields && (
                    <>
                      <div>
                        <dt className="font-semibold text-gray-800">PAN Card</dt>
                        <dd className="text-gray-600">{formData.panCard ? formData.panCard.name : 'Not specified'}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-gray-800">GST Certificate</dt>
                        <dd className="text-gray-600">{formData.gstCertificate ? formData.gstCertificate.name : 'Not specified'}</dd>
                      </div>
                    </>
                  )}
                  <div>
                    <dt className="font-semibold text-gray-800">Job Title</dt>
                    <dd className="text-gray-600">{formData.jobTitle || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Locations</dt>
                    <dd className="text-gray-600">{formData.locations.map((loc) => loc.address).join(', ') || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Job Type</dt>
                    <dd className="text-gray-600">{formData.jobType || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Salary</dt>
                    <dd className="text-gray-600">
                      {formData.minSalary && (
                        formData.payType === 'Fixed Salary' ? 
                        formData.minSalary : 
                        formData.payType === 'Salary + Incentive' ? 
                        `${formData.minSalary} (Salary) + Up to ${formData.maxSalary} (Incentive)` : 
                        `${formData.minSalary} - ${formData.maxSalary}`
                      )} {formData.payType || 'Not specified'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Education Level</dt>
                    <dd className="text-gray-600">{formData.educationLevel || 'Not specified'}</dd>
                  </div>
                  {formData.course && (
                    <div>
                      <dt className="font-semibold text-gray-800">Course</dt>
                      <dd className="text-gray-600">{formData.course || 'Not specified'}</dd>
                    </div>
                  )}
                  {formData.specialization && (
                    <div>
                      <dt className="font-semibold text-gray-800">Specialization</dt>
                      <dd className="text-gray-600">{formData.specialization || 'Not specified'}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="font-semibold text-gray-800">English Level</dt>
                    <dd className="text-gray-600">{formData.englishLevel || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Experience</dt>
                    <dd className="text-gray-600">
                      {formData.experienceLevel} {formData.experienceMax ? ` - ${formData.experienceMax} years` : 'years'}
                    </dd>
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
                    className={`flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isSubmitting
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