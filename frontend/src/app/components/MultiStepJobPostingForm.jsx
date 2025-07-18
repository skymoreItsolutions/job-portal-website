"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FaCheck,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { baseurl } from "./common";
import CreatableSelect from "react-select/creatable";
import debounce from "lodash/debounce";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";

import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
// import TextAlign from '@tiptap/extension-text-align';
// import Superscript from '@tiptap/extension-superscript';
// import Subscript from '@tiptap/extension-subscript';
// import TextStyle from '@tiptap/extension-text-style';
// import Color from '@tiptap/extension-color';

const MultiStepJobPostingForm = ({ userdata, companies }) => {
  const skillsOptions = [
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "Python", label: "Python" },
    { value: "Django", label: "Django" },
    { value: "PHP", label: "PHP" },
    { value: "Laravel", label: "Laravel" },
    { value: "MySQL", label: "MySQL" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Java", label: "Java" },
    { value: "C++", label: "C++" },
    { value: "C#", label: "C#" },
    { value: "Ruby", label: "Ruby" },
    { value: "Go", label: "Go" },
    { value: "Swift", label: "Swift" },
    { value: "Kotlin", label: "Kotlin" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "R", label: "R" },
    { value: "Scala", label: "Scala" },
    { value: "Angular", label: "Angular" },
    { value: "Vue.js", label: "Vue.js" },
    { value: "Express.js", label: "Express.js" },
    { value: "Spring Boot", label: "Spring Boot" },
    { value: "Flask", label: "Flask" },
    { value: "Ruby on Rails", label: "Ruby on Rails" },
    { value: ".NET", label: ".NET" },
    { value: "jQuery", label: "jQuery" },
    { value: "TensorFlow", label: "TensorFlow" },
    { value: "PyTorch", label: "PyTorch" },
    { value: "PostgreSQL", label: "PostgreSQL" },
    { value: "Oracle", label: "Oracle" },
    { value: "Redis", label: "Redis" },
    { value: "SQLite", label: "SQLite" },
    { value: "Cassandra", label: "Cassandra" },
    { value: "AWS", label: "AWS" },
    { value: "Azure", label: "Azure" },
    { value: "Google Cloud", label: "Google Cloud" },
    { value: "Docker", label: "Docker" },
    { value: "Kubernetes", label: "Kubernetes" },
    { value: "Jenkins", label: "Jenkins" },
    { value: "Terraform", label: "Terraform" },
    { value: "Ansible", label: "Ansible" },
    { value: "Git", label: "Git" },
    { value: "CI/CD", label: "CI/CD" },
    { value: "SQL", label: "SQL" },
    { value: "Tableau", label: "Tableau" },
    { value: "Power BI", label: "Power BI" },
    { value: "Pandas", label: "Pandas" },
    { value: "NumPy", label: "NumPy" },
    { value: "Hadoop", label: "Hadoop" },
    { value: "Spark", label: "Spark" },
    { value: "Sass", label: "Sass" },
    { value: "Tailwind CSS", label: "Tailwind CSS" },
    { value: "Bootstrap", label: "Bootstrap" },
    { value: "Figma", label: "Figma" },
    { value: "Adobe XD", label: "Adobe XD" },
    { value: "Communication", label: "Communication" },
    { value: "Teamwork", label: "Teamwork" },
    { value: "Problem Solving", label: "Problem Solving" },
    { value: "Leadership", label: "Leadership" },
    { value: "Time Management", label: "Time Management" },
    { value: "GraphQL", label: "GraphQL" },
    { value: "REST API", label: "REST API" },
    { value: "Web Security", label: "Web Security" },
    { value: "Agile Methodology", label: "Agile Methodology" },
    { value: "Scrum", label: "Scrum" },
  ];

  const editorStyles = `
  .tiptap-editor {
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    padding: 1rem;
    min-height: 150px;
    font-size: 0.875rem;
    line-height: 1.5;
    transition: all 0.3s ease;
  }
  .tiptap-editor:focus-within {
    outline: none;
    ring: 2px solid #3b82f6;
  }
  .tiptap-editor.ProseMirror p.is-empty::before {
    content: 'Start typing your job overview...';
    color: #9ca3af;
    float: left;
    pointer-events: none;
    height: 0;
  }
  .tiptap-editor u {
    text-decoration: underline;
  }
  .tiptap-editor s {
    text-decoration: line-through;
  }
  .tiptap-editor sup {
    vertical-align: super;
    font-size: smaller;
  }
  .tiptap-editor sub {
    vertical-align: sub;
    font-size: smaller;
  }
  .tiptap-editor .text-left {
    text-align: left;
  }
  .tiptap-editor .text-center {
    text-align: center;
  }
  .tiptap-editor .text-right {
    text-align: right;
  }
  .tiptap-editor .text-justify {
    text-align: justify;
  }
  .tiptap-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    padding: 0.5rem;
    background-color: #f3f4f6;
    border-bottom: 1px solid #d1d5db;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
  .tiptap-toolbar button {
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    background-color: #ffffff;
    border: 1px solid #d1d5db;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .tiptap-toolbar button:hover {
    background-color: #e5e7eb;
  }
  .tiptap-toolbar button.active {
    background-color: #bfdbfe;
  }
  .tiptap-toolbar select {
    padding: 0.25rem;
    border-radius: 0.25rem;
    border: 1px solid #d1d5db;
    background-color: #ffffff;
    cursor: pointer;
  }
`;

const generateJobDescription = async () => {
  // Ensure required fields exist
  if (!formData.jobTitle || !formData.industry) {
    setErrors((prev) => ({
      ...prev,
      jobOverview:
        "Job Title and Industry are required to generate a description.",
    }));
    return;
  }

  setIsSubmitting(true);
  setApiError(null);

  try {
    // Send formData directly (structured JSON)
    const response = await axios.post(
      `${baseurl}/generate-job-description`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

      console.log('response',response)

    const generatedText =
      response.data?.jobOverview?.trim() || "Failed to generate description.";
 console.log('respgeneratedTextonse',generatedText)
    // Update form state and localStorage

  
    setFormData((prev) => ({
      ...prev,
      jobOverview: generatedText,
    }));


    localStorage.setItem(
      "jobPostingFormData",
      JSON.stringify({
        data: { ...formData, jobOverview: generatedText },
        timestamp: new Date().getTime(),
      })
    );

    setErrors((prev) => ({ ...prev, jobOverview: null }));
  } catch (error) {
    setApiError("Failed to generate job description. Please try again.");
    console.error("API Error:", error);
  } finally {
    setIsSubmitting(false);
  }
};


  const courseOptions = {
    Undergraduate: [
      { value: "BA", label: "BA (Bachelor of Arts)" },
      { value: "B.Arch", label: "B.Arch (Bachelor of Architecture)" },
      { value: "BBA", label: "BBA (Bachelor of Business Administration)" },
      { value: "BCA", label: "BCA (Bachelor of Computer Applications)" },
      { value: "B.Com", label: "B.Com (Bachelor of Commerce)" },
      { value: "B.Des", label: "B.Des (Bachelor of Design)" },
      { value: "B.Ed", label: "B.Ed (Bachelor of Education)" },
      { value: "B.Pharm", label: "B.Pharm (Bachelor of Pharmacy)" },
      { value: "B.Sc", label: "B.Sc (Bachelor of Science)" },
      { value: "B.Tech", label: "B.Tech (Bachelor of Technology)" },
      { value: "BDS", label: "BDS (Bachelor of Dental Surgery)" },
      { value: "BFA", label: "BFA (Bachelor of Fine Arts)" },
      { value: "BHM", label: "BHM (Bachelor of Hotel Management)" },
      {
        value: "BJMC",
        label: "BJMC (Bachelor of Journalism and Mass Communication)",
      },
      { value: "BPT", label: "BPT (Bachelor of Physiotherapy)" },
      { value: "BUMS", label: "BUMS (Bachelor of Unani Medicine and Surgery)" },
      { value: "BVC", label: "BVC (Bachelor of Visual Communication)" },
      { value: "LLB", label: "LLB (Bachelor of Laws)" },
      {
        value: "MBBS",
        label: "MBBS (Bachelor of Medicine, Bachelor of Surgery)",
      },
    ],
    Postgraduate: [
      { value: "MA", label: "MA (Master of Arts)" },
      { value: "M.Arch", label: "M.Arch (Master of Architecture)" },
      { value: "MBA", label: "MBA (Master of Business Administration)" },
      { value: "MCA", label: "MCA (Master of Computer Applications)" },
      { value: "M.Com", label: "M.Com (Master of Commerce)" },
      { value: "M.Des", label: "M.Des (Master of Design)" },
      { value: "M.Ed", label: "M.Ed (Master of Education)" },
      { value: "M.Pharm", label: "M.Pharm (Master of Pharmacy)" },
      { value: "M.Sc", label: "M.Sc (Master of Science)" },
      { value: "M.Tech", label: "M.Tech (Master of Technology)" },
      { value: "MDS", label: "MDS (Master of Dental Surgery)" },
      { value: "MFA", label: "MFA (Master of Fine Arts)" },
      {
        value: "MJMC",
        label: "MJMC (Master of Journalism and Mass Communication)",
      },
      { value: "MPT", label: "MPT (Master of Physiotherapy)" },
      { value: "LLM", label: "LLM (Master of Laws)" },
      { value: "MD", label: "MD (Doctor of Medicine)" },
      { value: "MS", label: "MS (Master of Surgery)" },
    ],
    Diploma: [
      { value: "DCA", label: "DCA (Diploma in Computer Applications)" },
      { value: "D.Ed", label: "D.Ed (Diploma in Education)" },
      {
        value: "DMLT",
        label: "DMLT (Diploma in Medical Laboratory Technology)",
      },
      { value: "D.Pharm", label: "D.Pharm (Diploma in Pharmacy)" },
      {
        value: "PGDCA",
        label: "PGDCA (Post Graduate Diploma in Computer Applications)",
      },
      { value: "PGDM", label: "PGDM (Post Graduate Diploma in Management)" },
      { value: "DCH", label: "DCH (Diploma in Child Health)" },
      { value: "DHT", label: "DHT (Diploma in Hospitality and Tourism)" },
    ],
  };

  const specializationOptions = {
    // Undergraduate Specializations
    BA: [
      { value: "Economics", label: "Economics" },
      { value: "English", label: "English" },
      { value: "History", label: "History" },
      { value: "Political Science", label: "Political Science" },
      { value: "Sociology", label: "Sociology" },
      { value: "Psychology", label: "Psychology" },
      { value: "Geography", label: "Geography" },
      { value: "Philosophy", label: "Philosophy" },
      { value: "Hindi", label: "Hindi" },
      { value: "Sanskrit", label: "Sanskrit" },
    ],
    "B.Arch": [
      { value: "Architectural Design", label: "Architectural Design" },
      { value: "Urban Planning", label: "Urban Planning" },
      { value: "Sustainable Architecture", label: "Sustainable Architecture" },
    ],
    BBA: [
      { value: "Marketing", label: "Marketing" },
      { value: "Finance", label: "Finance" },
      { value: "Human Resources", label: "Human Resources" },
      { value: "International Business", label: "International Business" },
      { value: "Entrepreneurship", label: "Entrepreneurship" },
    ],
    BCA: [
      { value: "Computer Science", label: "Computer Science" },
      { value: "Information Technology", label: "Information Technology" },
      { value: "Data Science", label: "Data Science" },
      { value: "Cloud Computing", label: "Cloud Computing" },
      { value: "Cybersecurity", label: "Cybersecurity" },
    ],
    "B.Com": [
      { value: "Accounting", label: "Accounting" },
      { value: "Finance", label: "Finance" },
      { value: "Taxation", label: "Taxation" },
      { value: "Banking and Insurance", label: "Banking and Insurance" },
    ],
    "B.Des": [
      { value: "Fashion Design", label: "Fashion Design" },
      { value: "Graphic Design", label: "Graphic Design" },
      { value: "Interior Design", label: "Interior Design" },
      { value: "Product Design", label: "Product Design" },
    ],
    "B.Ed": [
      { value: "Special Education", label: "Special Education" },
      { value: "Mathematics Education", label: "Mathematics Education" },
      { value: "Science Education", label: "Science Education" },
      { value: "English Education", label: "English Education" },
    ],
    "B.Pharm": [
      { value: "Pharmaceutical Chemistry", label: "Pharmaceutical Chemistry" },
      { value: "Pharmacology", label: "Pharmacology" },
      { value: "Pharmaceutics", label: "Pharmaceutics" },
    ],
    "B.Sc": [
      { value: "Physics", label: "Physics" },
      { value: "Chemistry", label: "Chemistry" },
      { value: "Mathematics", label: "Mathematics" },
      { value: "Biology", label: "Biology" },
      { value: "Biotechnology", label: "Biotechnology" },
      { value: "Microbiology", label: "Microbiology" },
      { value: "Computer Science", label: "Computer Science" },
      { value: "Environmental Science", label: "Environmental Science" },
    ],
    "B.Tech": [
      { value: "Computer Science", label: "Computer Science" },
      { value: "Mechanical Engineering", label: "Mechanical Engineering" },
      { value: "Electrical Engineering", label: "Electrical Engineering" },
      { value: "Civil Engineering", label: "Civil Engineering" },
      { value: "Aerospace Engineering", label: "Aerospace Engineering" },
      { value: "Chemical Engineering", label: "Chemical Engineering" },
      {
        value: "Electronics and Communication",
        label: "Electronics and Communication",
      },
      { value: "Artificial Intelligence", label: "Artificial Intelligence" },
    ],
    BDS: [
      { value: "Orthodontics", label: "Orthodontics" },
      { value: "Periodontics", label: "Periodontics" },
      { value: "Oral Surgery", label: "Oral Surgery" },
    ],
    BFA: [
      { value: "Painting", label: "Painting" },
      { value: "Sculpture", label: "Sculpture" },
      { value: "Applied Arts", label: "Applied Arts" },
    ],
    BHM: [
      { value: "Hotel Operations", label: "Hotel Operations" },
      {
        value: "Food and Beverage Management",
        label: "Food and Beverage Management",
      },
      { value: "Tourism Management", label: "Tourism Management" },
    ],
    BJMC: [
      { value: "Journalism", label: "Journalism" },
      { value: "Advertising", label: "Advertising" },
      { value: "Public Relations", label: "Public Relations" },
    ],
    BPT: [
      { value: "Orthopedic Physiotherapy", label: "Orthopedic Physiotherapy" },
      {
        value: "Neurological Physiotherapy",
        label: "Neurological Physiotherapy",
      },
      { value: "Sports Physiotherapy", label: "Sports Physiotherapy" },
    ],
    BUMS: [
      { value: "Unani Medicine", label: "Unani Medicine" },
      { value: "Herbal Medicine", label: "Herbal Medicine" },
    ],
    BVC: [
      { value: "Film Making", label: "Film Making" },
      { value: "Animation", label: "Animation" },
      { value: "Photography", label: "Photography" },
    ],
    LLB: [
      { value: "Criminal Law", label: "Criminal Law" },
      { value: "Corporate Law", label: "Corporate Law" },
      { value: "Constitutional Law", label: "Constitutional Law" },
    ],
    MBBS: [
      { value: "General Medicine", label: "General Medicine" },
      { value: "Surgery", label: "Surgery" },
      { value: "Pediatrics", label: "Pediatrics" },
    ],
    // Postgraduate Specializations
    MA: [
      { value: "English", label: "English" },
      { value: "History", label: "History" },
      { value: "Sociology", label: "Sociology" },
      { value: "Economics", label: "Economics" },
      { value: "Political Science", label: "Political Science" },
      { value: "Psychology", label: "Psychology" },
      { value: "Public Administration", label: "Public Administration" },
    ],
    "M.Arch": [
      { value: "Urban Design", label: "Urban Design" },
      { value: "Landscape Architecture", label: "Landscape Architecture" },
      { value: "Sustainable Architecture", label: "Sustainable Architecture" },
    ],
    MBA: [
      { value: "Marketing", label: "Marketing" },
      { value: "Finance", label: "Finance" },
      { value: "Operations", label: "Operations" },
      { value: "Human Resources", label: "Human Resources" },
      { value: "Business Analytics", label: "Business Analytics" },
      { value: "International Business", label: "International Business" },
    ],
    MCA: [
      { value: "Software Development", label: "Software Development" },
      { value: "Data Science", label: "Data Science" },
      { value: "Cybersecurity", label: "Cybersecurity" },
      { value: "Artificial Intelligence", label: "Artificial Intelligence" },
      { value: "Cloud Computing", label: "Cloud Computing" },
    ],
    "M.Com": [
      { value: "Accounting and Finance", label: "Accounting and Finance" },
      { value: "Business Policy", label: "Business Policy" },
      { value: "Taxation", label: "Taxation" },
    ],
    "M.Des": [
      { value: "Fashion Design", label: "Fashion Design" },
      { value: "Graphic Design", label: "Graphic Design" },
      { value: "Industrial Design", label: "Industrial Design" },
    ],
    "M.Ed": [
      { value: "Educational Technology", label: "Educational Technology" },
      { value: "Curriculum Development", label: "Curriculum Development" },
      { value: "Special Education", label: "Special Education" },
    ],
    "M.Pharm": [
      { value: "Pharmacology", label: "Pharmacology" },
      { value: "Pharmaceutical Analysis", label: "Pharmaceutical Analysis" },
      { value: "Pharmacy Practice", label: "Pharmacy Practice" },
    ],
    "M.Sc": [
      { value: "Physics", label: "Physics" },
      { value: "Chemistry", label: "Chemistry" },
      { value: "Mathematics", label: "Mathematics" },
      { value: "Biotechnology", label: "Biotechnology" },
      { value: "Microbiology", label: "Microbiology" },
      { value: "Data Science", label: "Data Science" },
      { value: "Environmental Science", label: "Environmental Science" },
    ],
    "M.Tech": [
      { value: "Computer Science", label: "Computer Science" },
      { value: "Mechanical Engineering", label: "Mechanical Engineering" },
      { value: "Electrical Engineering", label: "Electrical Engineering" },
      { value: "VLSI Design", label: "VLSI Design" },
      { value: "Robotics", label: "Robotics" },
      { value: "Structural Engineering", label: "Structural Engineering" },
    ],
    MDS: [
      { value: "Prosthodontics", label: "Prosthodontics" },
      { value: "Endodontics", label: "Endodontics" },
      { value: "Oral Pathology", label: "Oral Pathology" },
    ],
    MFA: [
      { value: "Painting", label: "Painting" },
      { value: "Applied Arts", label: "Applied Arts" },
      { value: "Sculpture", label: "Sculpture" },
    ],
    MJMC: [
      { value: "Digital Media", label: "Digital Media" },
      { value: "Broadcast Journalism", label: "Broadcast Journalism" },
      { value: "Public Relations", label: "Public Relations" },
    ],
    MPT: [
      { value: "Orthopedic Physiotherapy", label: "Orthopedic Physiotherapy" },
      {
        value: "Cardiopulmonary Physiotherapy",
        label: "Cardiopulmonary Physiotherapy",
      },
      {
        value: "Neurological Physiotherapy",
        label: "Neurological Physiotherapy",
      },
    ],
    LLM: [
      { value: "International Law", label: "International Law" },
      { value: "Corporate Law", label: "Corporate Law" },
      {
        value: "Intellectual Property Law",
        label: "Intellectual Property Law",
      },
    ],
    MD: [
      { value: "General Medicine", label: "General Medicine" },
      { value: "Pediatrics", label: "Pediatrics" },
      { value: "Radiology", label: "Radiology" },
    ],
    MS: [
      { value: "General Surgery", label: "General Surgery" },
      { value: "Orthopedics", label: "Orthopedics" },
      { value: "Ophthalmology", label: "Ophthalmology" },
    ],

    DCA: [
      { value: "Programming", label: "Programming" },
      { value: "Database Management", label: "Database Management" },
      { value: "Networking", label: "Networking" },
    ],
    "D.Ed": [
      {
        value: "Early Childhood Education",
        label: "Early Childhood Education",
      },
      { value: "Special Education", label: "Special Education" },
    ],
    DMLT: [
      { value: "Clinical Pathology", label: "Clinical Pathology" },
      { value: "Microbiology", label: "Microbiology" },
      { value: "Biochemistry", label: "Biochemistry" },
    ],
    "D.Pharm": [
      { value: "Pharmacy Practice", label: "Pharmacy Practice" },
      { value: "Pharmaceutical Marketing", label: "Pharmaceutical Marketing" },
    ],
    PGDCA: [
      { value: "Software Development", label: "Software Development" },
      { value: "Data Analytics", label: "Data Analytics" },
    ],
    PGDM: [
      { value: "Marketing Management", label: "Marketing Management" },
      { value: "Financial Management", label: "Financial Management" },
      { value: "Operations Management", label: "Operations Management" },
    ],
    DCH: [
      { value: "Pediatric Care", label: "Pediatric Care" },
      { value: "Neonatology", label: "Neonatology" },
    ],
    DHT: [
      { value: "Tourism Management", label: "Tourism Management" },
      { value: "Hospitality Operations", label: "Hospitality Operations" },
    ],
    // Vocational Specializations
    VIT: [
      { value: "Web Development", label: "Web Development" },
      { value: "Cybersecurity", label: "Cybersecurity" },
      { value: "Mobile App Development", label: "Mobile App Development" },
    ],
    VHM: [
      { value: "Culinary Arts", label: "Culinary Arts" },
      { value: "Housekeeping", label: "Housekeeping" },
      { value: "Front Office Management", label: "Front Office Management" },
    ],
    VFT: [
      { value: "Fashion Design", label: "Fashion Design" },
      { value: "Textile Design", label: "Textile Design" },
    ],
    VAG: [
      { value: "Organic Farming", label: "Organic Farming" },
      { value: "Horticulture", label: "Horticulture" },
    ],
  };

  const industryOptions = [
    { value: "Technology", label: "Technology" },
    { value: "Finance", label: "Finance" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Education", label: "Education" },
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Retail", label: "Retail" },
    { value: "Marketing", label: "Marketing" },
  ];

  const departmentOptions = [
    { value: "Engineering", label: "Engineering" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Marketing", label: "Marketing" },
    { value: "Sales", label: "Sales" },
    { value: "Finance", label: "Finance" },
    { value: "Operations", label: "Operations" },
    { value: "Customer Service", label: "Customer Service" },
  ];

  const [allSkillsOptions, setAllSkillsOptions] = useState(skillsOptions);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: userdata?.company_name || "",
    newCompanyName: "",
    panCard: null,
    gstCertificate: null,
    jobTitle: "",
    jobType: "",
    locations: [],
    payType: "",
    minSalary: "",
    maxSalary: "",
    incentive: "",
    educationLevel: "",
    course: "",
    specialization: "",
    englishLevel: "",
    experienceLevel: "",
    experienceMax: "",
    genderPreference: "No Preference",
    preferredRoles: [],
    jobOverview: "",
    keyResponsibilities: "",
    requiredSkills: [],
    perks: [],
    interviewMode: "Online",
    contactPreference: [],
    interviewLocation: "",
    contactEmail: userdata?.contact_email || "",
    contactPhone: userdata?.contact_phone || "",
    interviewDate: "",
    interviewTime: "",
    notEmail: false,
    viewedNumber: false,
    joiningFee: false,
    jobExpireTime: 7,
    numberOfCandidatesRequired: 1,
    industry: "",
    department: "",
    jobRole: "",
  });
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [locationInputs, setLocationInputs] = useState(["", "", ""]);
  const [showNewCompanyFields, setShowNewCompanyFields] = useState(false);

  const formatINR = (value) => {
    if (!value) return "";
    const num = parseFloat(value.toString().replace(/,/g, ""));
    if (isNaN(num)) return "";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    })
      .format(num)
      .replace("₹", "");
  };

  const parseINR = (value) => {
    return value.replace(/[^0-9]/g, "");
  };

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
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              format: "json",
              q: query,
              limit: 5,
            },
            headers: {
              "User-Agent": "YourAppName/1.0 (contact@example.com)",
            },
          }
        );
        setLocationSuggestions((prev) => {
          const newSuggestions = [...prev];
          newSuggestions[index] = response.data;
          return newSuggestions;
        });
      } catch (error) {
        console.error("Nominatim API error:", error);
        setErrors((prev) => ({
          ...prev,
          locations: "Failed to fetch location suggestions",
        }));
      }
    }, 500),
    []
  );

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("employerToken");
      if (!token) return;

      try {
        const res = await axios.get(`${baseurl}/employer/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data && res.data.success) {
          setIsLoggedIn(res.data.data);
        }
      } catch (err) {
        console.error("Not logged in or invalid token");
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("jobPostingFormData");
    if (savedData) {
      const { data, timestamp } = JSON.parse(savedData);
      const now = new Date().getTime();
      const thirtyMinutesInMs = 30 * 60 * 1000;
      if (now - timestamp <= thirtyMinutesInMs) {
        setFormData(data);
        setLocationInputs(
          data.locations
            .map((loc) => loc.address || "")
            .concat(["", "", ""])
            .slice(0, 3)
        );
        const customSkills = data.requiredSkills
          .filter((skill) => !skillsOptions.some((opt) => opt.value === skill))
          .map((skill) => ({ value: skill, label: skill }));
        setAllSkillsOptions([...skillsOptions, ...customSkills]);
        setShowNewCompanyFields(!!data.newCompanyName);
      } else {
        localStorage.removeItem("jobPostingFormData");
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox" && name !== "contactPreference") {
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
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        ...(name === "educationLevel" &&
        !["Graduated", "Masters"].includes(value)
          ? { course: "", specialization: "" }
          : {}),
        ...(name === "course" ? { specialization: "" } : {}),
      }));
    }
    localStorage.setItem(
      "jobPostingFormData",
      JSON.stringify({
        data: {
          ...formData,
          [name]: type === "file" ? files[0] : value,
          ...(name === "educationLevel" &&
          !["Graduated", "Masters"].includes(value)
            ? { course: "", specialization: "" }
            : {}),
          ...(name === "course" ? { specialization: "" } : {}),
        },
        timestamp: new Date().getTime(),
      })
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
      "jobPostingFormData",
      JSON.stringify({
        data: {
          ...formData,
          locations: formData.locations.map((loc, i) =>
            i === index
              ? {
                  address: suggestion.display_name,
                  lat: parseFloat(suggestion.lat),
                  lon: parseFloat(suggestion.lon),
                }
              : loc
          ),
        },
        timestamp: new Date().getTime(),
      })
    );
  };

  const removeLocation = (index) => {
    setFormData((prev) => {
      const newLocations = prev.locations.filter((_, i) => i !== index);
      return { ...prev, locations: newLocations };
    });
    setLocationInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = "";
      return newInputs;
    });
    setLocationSuggestions((prev) => {
      const newSuggestions = [...prev];
      newSuggestions[index] = [];
      return newSuggestions;
    });
    localStorage.setItem(
      "jobPostingFormData",
      JSON.stringify({
        data: {
          ...formData,
          locations: formData.locations.filter((_, i) => i !== index),
        },
        timestamp: new Date().getTime(),
      })
    );
  };

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.companyName && !formData.newCompanyName) {
          newErrors.companyName =
            "Either select a company or enter a new company name";
        }
        if (showNewCompanyFields) {
          if (!formData.newCompanyName)
            newErrors.newCompanyName = "New company name is required";
          if (!formData.panCard) newErrors.panCard = "PAN card is required";
          if (!formData.gstCertificate)
            newErrors.gstCertificate = "GST certificate is required";
        }
        if (!formData.jobTitle) newErrors.jobTitle = "Job title is required";
        if (formData.locations.length === 0)
          newErrors.locations = "At least one location is required";
        if (!formData.payType) newErrors.payType = "Pay type is required";
        if (!formData.minSalary) {
          newErrors.minSalary =
            formData.payType === "Salary + Incentive"
              ? "Salary is required"
              : "Minimum salary is required";
        }
        if (formData.payType !== "Fixed Salary" && !formData.maxSalary) {
          newErrors.maxSalary =
            formData.payType === "Salary + Incentive"
              ? "Incentive up to is required"
              : "Maximum salary is required";
        }
        break;
      case 2:
        if (!formData.educationLevel)
          newErrors.educationLevel = "Education level is required";
        if (["Graduated", "Masters"].includes(formData.educationLevel)) {
          if (!formData.course) newErrors.course = "Course is required";
          if (!formData.specialization)
            newErrors.specialization = "Specialization is required";
        }
        if (!formData.englishLevel)
          newErrors.englishLevel = "English level is required";
        if (!formData.experienceLevel)
          newErrors.experienceLevel = "Minimum experience is required";
        if (
          formData.experienceMax &&
          parseInt(formData.experienceMax) < parseInt(formData.experienceLevel)
        ) {
          newErrors.experienceMax =
            "Maximum experience must be greater than or equal to minimum";
        }
        break;
      case 3:
        if (!formData.jobOverview)
          newErrors.jobOverview = "Job overview is required";
        if (formData.requiredSkills.length === 0)
          newErrors.requiredSkills = "At least one skill is required";
        break;
      case 4:
        if (
          (formData.contactPreference.includes("Email") &&
            !formData.contactEmail) ||
          (formData.contactPreference.includes("Phone") &&
            !formData.contactPhone)
        ) {
          newErrors.contact =
            "Selected contact preference requires a valid email or phone";
        }
        if (
          formData.interviewMode !== "Online" &&
          !formData.interviewLocation
        ) {
          newErrors.interviewLocation =
            "Interview location is required for Walk-in or Hybrid mode";
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
    const token = localStorage.getItem("employerToken");
    if (!token) {
      setApiError("Please log in to submit a job posting.");
      return;
    }

    if (!validateStep(currentStep)) {
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(true);

    const apiData = new FormData();
    apiData.append("employer_id", isLoggedIn.id);

    // Company handling
    if (
      showNewCompanyFields &&
      formData.newCompanyName &&
      formData.panCard &&
      formData.gstCertificate
    ) {
      // Register new company with documents
      apiData.append("newCompanyName", formData.newCompanyName); // Use 'newCompanyName' to match backend
      apiData.append("pan_card", formData.panCard);
      apiData.append("gst_certificate", formData.gstCertificate);
    } else if (!showNewCompanyFields && formData.companyName) {
      // Use existing company
      const selectedCompany = companies?.find(
        (company) => company.name === formData.companyName
      );
      if (selectedCompany) {
        apiData.append("company_id", selectedCompany.id);
      } else {
        setApiError(
          "Please select a valid company or provide new company details."
        );
        setIsSubmitting(false);
        return;
      }
    } else {
      setApiError(
        "Either select an existing company or provide new company details with PAN and GST documents."
      );
      setIsSubmitting(false);
      return;
    }

    // Job details
    apiData.append("job_title", formData.jobTitle);
    apiData.append("job_type", formData.jobType);
    apiData.append(
      "work_location_type",
      formData.interviewMode === "Online"
        ? "Work from Home"
        : formData.interviewMode === "Walk-in"
        ? "Work from Office"
        : "Hybrid"
    );
    apiData.append("joining_fee", formData.joiningFee ? "1" : "0");
    apiData.append("basic_requirements", formData.keyResponsibilities || null);
    apiData.append(
      "total_experience_required",
      parseInt(formData.experienceLevel) || 0
    );
    apiData.append(
      "total_experience_max",
      parseInt(formData.experienceMax) || null
    );
    apiData.append("other_job_titles", JSON.stringify(formData.preferredRoles));
    apiData.append("job_expire_time", parseInt(formData.jobExpireTime) || 7);
    apiData.append(
      "number_of_candidates_required",
      parseInt(formData.numberOfCandidatesRequired) || 1
    );
    apiData.append("latitude", formData.locations[0]?.lat || null);
    apiData.append("longitude", formData.locations[0]?.lon || null);
    apiData.append(
      "location",
      formData.locations.map((loc) => loc.address).join("; ")
    );
    apiData.append("min_salary", parseINR(formData.minSalary) || null);
    apiData.append("max_salary", parseINR(formData.maxSalary) || null);
    apiData.append("incentive", parseINR(formData.incentive) || 0);
    apiData.append("pay_type", formData.payType);
    apiData.append(
      "additional_requirements",
      JSON.stringify(formData.requiredSkills)
    );
    apiData.append(
      "is_walkin_interview",
      formData.interviewMode === "Walk-in" ? "1" : "0"
    );
    apiData.append(
      "communication_preference",
      formData.contactPreference || "No Preference"
    );
    apiData.append(
      "degree_specialization",
      JSON.stringify([
        formData.educationLevel,
        formData.course,
        formData.specialization,
      ])
    );
    apiData.append("job_description", formData.jobOverview);
    apiData.append("english_level", formData.englishLevel || null);
    apiData.append(
      "gender_preference",
      formData.genderPreference || "No Preference"
    );
    apiData.append("perks", JSON.stringify(formData.perks));
    apiData.append("interview_location", formData.interviewLocation || null);
    apiData.append("contact_email", formData.contactEmail || null);
    apiData.append("contact_phone", formData.contactPhone || null);
    apiData.append("interview_date", formData.interviewDate || null);
    apiData.append("interview_time", formData.interviewTime || null);
    apiData.append("not_email", formData.notEmail ? "1" : "0");
    apiData.append("viewed_number", formData.viewedNumber ? "1" : "0");
    apiData.append("industry", formData.industry);
    apiData.append("department", formData.department);
    apiData.append("job_role", formData.jobRole);
    apiData.append("compensation", "0"); // Ensure compensation is handled correctly

    try {
      const response = await axios.post(`${baseurl}/job-posts`, apiData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Job posting submitted successfully!");
      // Reset form
      setFormData({
        companyName: "",
        newCompanyName: "",
        panCard: null,
        gstCertificate: null,
        jobTitle: "",
        jobType: "",
        locations: [],
        payType: "",
        minSalary: "",
        maxSalary: "",
        incentive: "",
        educationLevel: "",
        course: "",
        specialization: "",
        englishLevel: "",
        experienceLevel: "",
        experienceMax: "",
        genderPreference: "No Preference",
        preferredRoles: [],
        jobOverview: "",
        keyResponsibilities: "",
        requiredSkills: [],
        perks: [],
        interviewMode: "Online",
        contactPreference: "No Preference",
        interviewLocation: "",
        contactEmail: "",
        contactPhone: "",
        interviewDate: "",
        interviewTime: "",
        joiningFee: false,
        jobExpireTime: 7,
        numberOfCandidatesRequired: 1,
        industry: "",
        department: "",
        jobRole: "",
        compensation: "",
      });
      setAllSkillsOptions(skillsOptions);
      setLocationInputs(["", "", ""]);
      setLocationSuggestions([]);
      setCurrentStep(1);
      setShowConfirmation(false);
      setShowNewCompanyFields(false);
      localStorage.removeItem("jobPostingFormData");
      setApiError(null);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        setApiError("Validation failed. Please check the form fields.");
      } else {
        setApiError(
          error.response?.data?.message || "Failed to create job post"
        );
      }
      console.error("API Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkillsInputChange = (inputValue, actionMeta) => {
    if (inputValue.includes(",")) {
      const newSkill = inputValue.replace(",", "").trim();
      if (newSkill) {
        const newOption = { value: newSkill, label: newSkill };
        setAllSkillsOptions((prev) => [...prev, newOption]);
        setFormData((prev) => ({
          ...prev,
          requiredSkills: [...prev.requiredSkills, newSkill],
        }));
        localStorage.setItem(
          "jobPostingFormData",
          JSON.stringify({
            data: {
              ...formData,
              requiredSkills: [...formData.requiredSkills, newSkill],
            },
            timestamp: new Date().getTime(),
          })
        );
      }
      return "";
    }
    return inputValue;
  };

  const educationLevelToCourseKey = {
    Graduated: "Undergraduate",
    Masters: "Postgraduate",
    Others: "Diploma",
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3], // Support H1, H2, H3
      }),
      Underline,
      Strike,
    ],
    editorProps: {
      attributes: {
        class:
          "tiptap-editor p-5 min-h-[250px] border-2 border-blue-500 rounded-lg shadow-lg focus:ring-4 focus:ring-blue-300 transition-all duration-300 bg-white",
      },
    },

    content: formData.jobOverview ,
    immediatelyRender: false,
    editable: true,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({
        ...prev,
        jobOverview: editor.getHTML(),
      }));
      localStorage.setItem(
        "jobPostingFormData",
        JSON.stringify({
          data: {
            ...formData,
            jobOverview: editor.getHTML(),
          },
          timestamp: new Date().getTime(),
        })
      );
    },
  });




  useEffect(() => {
    if (editor && formData.jobOverview) {
      editor.commands.setContent(formData.jobOverview);
      console.log("Editor Content Updated:", editor.getHTML());
    }
  }, [formData.jobOverview, editor]);


  
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
              <label className="block text-sm font-semibold text-gray-800">
                Company Name *
              </label>
              <div className="flex items-center space-x-2">
                <select
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  disabled={showNewCompanyFields}
                  className={`mt-2 w-full rounded-lg border ${
                    errors.companyName ? "border-red-500" : "border-gray-300"
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                    showNewCompanyFields ? "bg-gray-100 cursor-not-allowed" : ""
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
                      {company.name}{" "}
                      {company.is_approved ? "" : "(Not Approved)"}
                    </option>
                  ))}
                </select>
                <motion.button
                  type="button"
                  onClick={() => setShowNewCompanyFields(!showNewCompanyFields)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-2 p-3 bg-[#02325a] text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                  title={
                    showNewCompanyFields
                      ? "Cancel New Company"
                      : "Hire for Another Company"
                  }
                >
                  {showNewCompanyFields ? <FaTimes /> : <FaPlus />}
                </motion.button>
              </div>
              {errors.companyName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.companyName}
                </p>
              )}
            </div>
            <AnimatePresence>
              {showNewCompanyFields && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-800">
                      New Company Name *
                    </label>
                    <input
                      type="text"
                      name="newCompanyName"
                      value={formData.newCompanyName}
                      onChange={handleInputChange}
                      className={`mt-2 w-full rounded-lg border ${
                        errors.newCompanyName
                          ? "border-red-500"
                          : "border-gray-300"
                      } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    />
                    {errors.newCompanyName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.newCompanyName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800">
                      PAN Card *
                    </label>
                    <input
                      type="file"
                      name="panCard"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleInputChange}
                      className={`mt-2 w-full rounded-lg border ${
                        errors.panCard ? "border-red-500" : "border-gray-300"
                      } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    />
                    {errors.panCard && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.panCard}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800">
                      GST Certificate *
                    </label>
                    <input
                      type="file"
                      name="gstCertificate"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleInputChange}
                      className={`mt-2 w-full rounded-lg border ${
                        errors.gstCertificate
                          ? "border-red-500"
                          : "border-gray-300"
                      } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    />
                    {errors.gstCertificate && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.gstCertificate}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Job Title *
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className={`mt-2 w-full rounded-lg border ${
                  errors.jobTitle ? "border-red-500" : "border-gray-300"
                } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              />
              {errors.jobTitle && (
                <p className="mt-1 text-xs text-red-500">{errors.jobTitle}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Job Type *
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                className={`mt-2 w-full rounded-lg border ${
                  errors.jobType ? "border-red-500" : "border-gray-300"
                } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              >
                <option value="">Select Job Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Freelance">Remote</option>
              </select>
              {errors.jobType && (
                <p className="mt-1 text-xs text-red-500">{errors.jobType}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Office Address / Landmark * (Select up to 3)
              </label>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="mt-2 relative">
                  <input
                    type="text"
                    value={locationInputs[index]}
                    onChange={(e) =>
                      handleLocationInputChange(e.target.value, index)
                    }
                    placeholder={`Enter location ${index + 1}`}
                    className={`w-full rounded-lg border ${
                      errors.locations ? "border-red-500" : "border-gray-300"
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
                          onClick={() =>
                            handleLocationSelect(suggestion, index)
                          }
                          className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition-all duration-200"
                        >
                          {suggestion.display_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {errors.locations && (
                <p className="mt-1 text-xs text-red-500">{errors.locations}</p>
              )}
              {formData.locations.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Selected:{" "}
                    {formData.locations.map((loc) => loc.address).join(", ")}
                  </p>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Industry *
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className={`mt-2 w-full rounded-lg border ${
                  errors.industry ? "border-red-500" : "border-gray-300"
                } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              >
                <option value="">Select Industry</option>
                {industryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.industry && (
                <p className="mt-1 text-xs text-red-500">{errors.industry}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={`mt-2 w-full rounded-lg border ${
                  errors.department ? "border-red-500" : "border-gray-300"
                } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              >
                <option value="">Select Department</option>
                {departmentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="mt-1 text-xs text-red-500">{errors.department}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Job Role *
              </label>
              <input
                type="text"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleInputChange}
                className={`mt-2 w-full rounded-lg border ${
                  errors.jobRole ? "border-red-500" : "border-gray-300"
                } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              />
              {errors.jobRole && (
                <p className="mt-1 text-xs text-red-500">{errors.jobRole}</p>
              )}
            </div>
            {/* ... (keeping existing job title, job type, locations sections) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800">
                  Pay Type *
                </label>
                <select
                  name="payType"
                  value={formData.payType}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${
                    errors.payType ? "border-red-500" : "border-gray-300"
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                >
                  <option value="">Select Pay Type</option>
                  <option value="Salary">Salary</option>
                  <option value="Salary + Incentive">Salary + Incentive</option>
                </select>
                {errors.payType && (
                  <p className="mt-1 text-xs text-red-500">{errors.payType}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800">
                  Minimum Salary (INR) *
                </label>
                <input
                  type="text"
                  name="minSalary"
                  value={formatINR(formData.minSalary)}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${
                    errors.minSalary ? "border-red-500" : "border-gray-300"
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  placeholder="₹0"
                />
                {errors.minSalary && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.minSalary}
                  </p>
                )}
              </div>
              {formData.payType && (
                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    Maximum Salary (INR) *
                  </label>
                  <input
                    type="text"
                    name="maxSalary"
                    value={formatINR(formData.maxSalary)}
                    onChange={handleInputChange}
                    className={`mt-2 w-full rounded-lg border ${
                      errors.maxSalary ? "border-red-500" : "border-gray-300"
                    } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    placeholder="₹0"
                  />
                  {errors.maxSalary && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.maxSalary}
                    </p>
                  )}
                </div>
              )}
              {formData.payType === "Salary + Incentive" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    Incentive Up To (INR) *
                  </label>
                  <input
                    type="text"
                    name="incentive"
                    value={formatINR(formData.incentive)}
                    onChange={handleInputChange}
                    className={`mt-2 w-full rounded-lg border ${
                      errors.incentive ? "border-red-500" : "border-gray-300"
                    } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    placeholder="₹0"
                  />
                  {errors.incentive && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.incentive}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800">
                  Number of Vacancies Required *
                </label>
                <input
                  type="number"
                  name="numberOfCandidatesRequired"
                  value={formData.numberOfCandidatesRequired}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${
                    errors.numberOfCandidatesRequired
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  min="1"
                />
                {errors.numberOfCandidatesRequired && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.numberOfCandidatesRequired}
                  </p>
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
              <label className="block text-sm font-semibold text-gray-800">
                Education Level *
              </label>
              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleInputChange}
                className={`mt-2 w-full rounded-lg border ${
                  errors.educationLevel ? "border-red-500" : "border-gray-300"
                } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              >
                <option value="">Select Education Level</option>
                <option value="Graduation Not Required">
                  Graduation Not Required
                </option>
                <option value="Graduated">Graduated</option>
                <option value="Masters">Masters</option>
                <option value="Others">Others</option>
              </select>
              {errors.educationLevel && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.educationLevel}
                </p>
              )}
            </div>
            <AnimatePresence>
              {["Graduated", "Masters"].includes(formData.educationLevel) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-800">
                      Course *
                    </label>
                    <CreatableSelect
                      name="course"
                      options={
                        courseOptions[
                          educationLevelToCourseKey[formData.educationLevel]
                        ] || []
                      }
                      className="mt-2 text-sm"
                      classNamePrefix="select"
                      value={
                        formData.course
                          ? {
                              value: formData.course,
                              label:
                                courseOptions[
                                  educationLevelToCourseKey[
                                    formData.educationLevel
                                  ]
                                ]?.find(
                                  (option) => option.value === formData.course
                                )?.label || formData.course,
                            }
                          : null
                      }
                      onChange={(selected) => {
                        const value = selected ? selected.value : "";
                        setFormData((prev) => ({
                          ...prev,
                          course: value,
                          specialization: "", // Reset specialization when course changes
                        }));
                        localStorage.setItem(
                          "jobPostingFormData",
                          JSON.stringify({
                            data: {
                              ...formData,
                              course: value,
                              specialization: "",
                            },
                            timestamp: new Date().getTime(),
                          })
                        );
                      }}
                      placeholder="Search or select a course..."
                      isClearable
                      isSearchable
                      isDisabled={!formData.educationLevel}
                      noOptionsMessage={() => "No courses available"}
                      // Disable creating new options
                      onCreateOption={null}
                    />
                    {errors.course && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.course}
                      </p>
                    )}
                  </div>
                  {formData.course && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-800">
                        Specialization *
                      </label>
                      <select
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        className={`mt-2 w-full rounded-lg border ${
                          errors.specialization
                            ? "border-red-500"
                            : "border-gray-300"
                        } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                      >
                        <option value="">Select Specialization</option>
                        {specializationOptions[formData.course]?.map(
                          (option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          )
                        )}
                      </select>
                      {errors.specialization && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.specialization}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                English Level Required *
              </label>
              <select
                name="englishLevel"
                value={formData.englishLevel}
                onChange={handleInputChange}
                className={`mt-2 w-full rounded-lg border ${
                  errors.englishLevel ? "border-red-500" : "border-gray-300"
                } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              >
                <option value="">Select English Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Fluent">Fluent</option>
              </select>
              {errors.englishLevel && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.englishLevel}
                </p>
              )}
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800">
                  Minimum Experience (Years) *
                </label>
                <input
                  type="number"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${
                    errors.experienceLevel
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  min="0"
                />
                {errors.experienceLevel && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.experienceLevel}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800">
                  Maximum Experience (Years)
                </label>
                <input
                  type="number"
                  name="experienceMax"
                  value={formData.experienceMax}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${
                    errors.experienceMax ? "border-red-500" : "border-gray-300"
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  min={formData.experienceLevel || 0}
                />
                {errors.experienceMax && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.experienceMax}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Gender Preference
              </label>
              <div className="mt-3 grid grid-cols-2 gap-4">
                {["No Preference", "Male", "Female"].map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="genderPreference"
                      value={option}
                      checked={formData.genderPreference === option}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-[#02325a] focus:ring-blue-500 transition-all duration-300"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      {option}
                    </label>
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
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-gray-800">
                Job Overview *
              </label>
              <motion.button
                type="button"
                onClick={generateJobDescription}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-[#02325a] text-white rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400"
                disabled={isSubmitting}
                title="Generate Job Description with AI"
              >
                Generate with AI
              </motion.button>

            
            </div>

            <div
        className={`mt-2 border rounded-lg ${
          errors.jobOverview ? "border-red-500" : "border-gray-300"
        }`}
      >
        <div className="tiptap-toolbar">
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-3 py-1.5 mr-1 rounded ${
              editor?.isActive("heading", { level: 1 }) ? "active" : ""
            }`}
            aria-label="Toggle Heading 1"
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-3 py-1.5 mr-1 rounded ${
              editor?.isActive("heading", { level: 2 }) ? "active" : ""
            }`}
            aria-label="Toggle Heading 2"
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-3 py-1.5 mr-1 rounded ${
              editor?.isActive("heading", { level: 3 }) ? "active" : ""
            }`}
            aria-label="Toggle Heading 3"
            title="Heading 3"
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`px-3 py-1.5 mr-1 rounded ${
              editor?.isActive("bold") ? "active" : ""
            }`}
            aria-label="Toggle Bold"
            title="Bold (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`px-3 py-1.5 mr-1 rounded ${
              editor?.isActive("italic") ? "active" : ""
            }`}
            aria-label="Toggle Italic"
            title="Italic (Ctrl+I)"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={`px-3 py-1.5 mr-1 rounded ${
              editor?.isActive("underline") ? "active" : ""
            }`}
            aria-label="Toggle Underline"
            title="Underline"
          >
            <u>U</u>
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            className={`px-3 py-1.5 mr-1 rounded ${
              editor?.isActive("strike") ? "active" : ""
            }`}
            aria-label="Toggle Strikethrough"
            title="Strikethrough"
          >
            <s>S</s>
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`px-3 py-1.5 mr-1 rounded ${
              editor?.isActive("bulletList") ? "active" : ""
            }`}
            aria-label="Toggle Bullet List"
            title="Bullet List"
          >
            • List
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`px-3 py-1.5 mr-1 rounded ${
              editor?.isActive("orderedList") ? "active" : ""
            }`}
            aria-label="Toggle Ordered List"
            title="Ordered List"
          >
            1. List
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()}
            className="px-3 py-1.5 rounded"
            aria-label="Clear Formatting"
            title="Clear Formatting"
          >
            Clear
          </button>
        </div>
        <EditorContent editor={editor} className="tiptap-editor" />
      </div>

       
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Required Skills * (Type and add with comma)
              </label>
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
                  const values = selected
                    ? selected.map((option) => option.value)
                    : [];
                  setFormData((prev) => ({ ...prev, requiredSkills: values }));
                  localStorage.setItem(
                    "jobPostingFormData",
                    JSON.stringify({
                      data: { ...formData, requiredSkills: values },
                      timestamp: new Date().getTime(),
                    })
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
                      "jobPostingFormData",
                      JSON.stringify({
                        data: {
                          ...formData,
                          requiredSkills: [
                            ...formData.requiredSkills,
                            newSkill,
                          ],
                        },
                        timestamp: new Date().getTime(),
                      })
                    );
                  }
                }}
                placeholder="Select or type skills (add with comma)..."
                formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
              />
              {errors.requiredSkills && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.requiredSkills}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Optional Perks
              </label>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Health Insurance",
                  "Remote Work",
                  "Provident Fund",
                  "Transportation Allowance",
                ].map((perk) => (
                  <div key={perk} className="flex items-center">
                    <input
                      type="checkbox"
                      name="perks"
                      value={perk}
                      checked={formData.perks.includes(perk)}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-[#02325a] focus:ring-blue-500 transition-all duration-300"
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
              <label className="block text-sm font-semibold text-gray-800">
                Interview Mode *
              </label>
              <div className="mt-3 grid grid-cols-3 gap-4">
                {["Online", "Walk-in", "Hybrid"].map((mode) => (
                  <div key={mode} className="flex items-center">
                    <input
                      type="radio"
                      name="interviewMode"
                      value={mode}
                      checked={formData.interviewMode === mode}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-[#02325a] focus:ring-blue-500 transition-all duration-300"
                    />
                    <label className="ml-2 text-sm text-gray-700">{mode}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Contact Preference *
              </label>
              <div className="mt-3 grid grid-cols-3 gap-4">
                {["Call", "Whatsapp", "No Preference"].map((preference) => (
                  <div key={preference} className="flex items-center">
                    <input
                      type="radio"
                      name="contactPreference"
                      value={preference}
                      checked={formData.contactPreference === preference}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contactPreference: e.target.value,
                        }))
                      }
                      className="h-5 w-5 text-[#02325a] focus:ring-blue-500 transition-all duration-300"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      {preference}
                    </label>
                  </div>
                ))}
              </div>
              {errors.contact && (
                <p className="mt-1 text-xs text-red-500">{errors.contact}</p>
              )}
            </div>
            {formData.interviewMode !== "Online" && (
              <div>
                <label className="block text-sm font-semibold text-gray-800">
                  Interview Location *
                </label>
                <input
                  type="text"
                  name="interviewLocation"
                  value={formData.interviewLocation}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${
                    errors.interviewLocation
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                />
                {errors.interviewLocation && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.interviewLocation}
                  </p>
                )}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${
                    errors.contact ? "border-red-500" : "border-gray-300"
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  placeholder="Enter contact email"
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
                <label className="block text-sm font-semibold text-gray-800">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  className={`mt-2 w-full rounded-lg border ${
                    errors.contact ? "border-red-500" : "border-gray-300"
                  } px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  placeholder="Enter contact phone"
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
            {errors.contact && (
              <p className="mt-1 text-xs text-red-500">{errors.contact}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800">
                  Interview Date
                </label>
                <input
                  type="date"
                  name="interviewDate"
                  value={formData.interviewDate}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800">
                  Interview Time
                </label>
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

  console.log("userdata?.company_name", userdata);
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
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {apiError}
            </div>
          )}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">
                Post a New Job
              </h2>
              <span className="text-sm text-gray-500 font-medium">
                Step {currentStep} of 4
              </span>
            </div>
            <div className="mt-6">
              <div className="relative">
                <div className="overflow-hidden h-2 rounded-full bg-gray-200">
                  <motion.div
                    animate={{ width: `${(currentStep / 4) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {[
                    "Basic Info",
                    "Qualifications",
                    "Description",
                    "Interview",
                  ].map((label, index) => (
                    <div key={index} className="text-center">
                      <div
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-semibold ${
                          currentStep >= index + 1
                            ? "bg-[#02325a] text-white"
                            : "bg-gray-200 text-gray-500"
                        } transition-all duration-300`}
                      >
                        {index + 1}
                      </div>
                      <span className="block mt-1 text-xs text-gray-600">
                        {label}
                      </span>
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
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-[#02325a] to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                }`}
              >
                {isSubmitting
                  ? "Submitting..."
                  : currentStep === 4
                  ? "Review"
                  : "Next"}
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
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Review Job Posting
                </h3>
                <div className="space-y-6">
                  <div>
                    <dt className="font-semibold text-gray-800">
                      Company Name
                    </dt>
                    <dd className="text-gray-600">
                      {formData.newCompanyName ||
                        formData.companyName ||
                        "Not specified"}
                    </dd>
                  </div>
                  {showNewCompanyFields && (
                    <>
                      <div>
                        <dt className="font-semibold text-gray-800">
                          PAN Card
                        </dt>
                        <dd className="text-gray-600">
                          {formData.panCard
                            ? formData.panCard.name
                            : "Not specified"}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-gray-800">
                          GST Certificate
                        </dt>
                        <dd className="text-gray-600">
                          {formData.gstCertificate
                            ? formData.gstCertificate.name
                            : "Not specified"}
                        </dd>
                      </div>
                    </>
                  )}
                  <div>
                    <dt className="font-semibold text-gray-800">Job Title</dt>
                    <dd className="text-gray-600">
                      {formData.jobTitle || "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Locations</dt>
                    <dd className="text-gray-600">
                      {formData.locations
                        .map((loc) => loc.address)
                        .join(", ") || "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Job Type</dt>
                    <dd className="text-gray-600">
                      {formData.jobType || "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Salary</dt>
                    <dd className="text-gray-600">
                      {formData.minSalary &&
                        (formData.payType === "Fixed Salary"
                          ? formData.minSalary
                          : formData.payType === "Salary + Incentive"
                          ? `${formData.minSalary} (Salary) + Up to ${formData.maxSalary} (Incentive)`
                          : `${formData.minSalary} - ${formData.maxSalary}`)}{" "}
                      {formData.payType || "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">
                      Education Level
                    </dt>
                    <dd className="text-gray-600">
                      {formData.educationLevel || "Not specified"}
                    </dd>
                  </div>
                  {formData.course && (
                    <div>
                      <dt className="font-semibold text-gray-800">Course</dt>
                      <dd className="text-gray-600">
                        {formData.course || "Not specified"}
                      </dd>
                    </div>
                  )}
                  {formData.specialization && (
                    <div>
                      <dt className="font-semibold text-gray-800">
                        Specialization
                      </dt>
                      <dd className="text-gray-600">
                        {formData.specialization || "Not specified"}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="font-semibold text-gray-800">
                      English Level
                    </dt>
                    <dd className="text-gray-600">
                      {formData.englishLevel || "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Experience</dt>
                    <dd className="text-gray-600">
                      {formData.experienceLevel}{" "}
                      {formData.experienceMax
                        ? ` - ${formData.experienceMax} years`
                        : "years"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">
                      Gender Preference
                    </dt>
                    <dd className="text-gray-600">
                      {formData.genderPreference || "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">
                      Preferred Roles
                    </dt>
                    <dd className="text-gray-600">
                      {formData.preferredRoles.join(", ") || "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">
                      Job Overview
                    </dt>
                    <dd className="text-gray-600">
                      {formData.jobOverview || "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">
                      Key Responsibilities
                    </dt>
                    <dd className="text-gray-600">
                      {formData.keyResponsibilities || "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">
                      Required Skills
                    </dt>
                    <dd className="text-gray-600">
                      {formData.requiredSkills.join(", ") || "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Perks</dt>
                    <dd className="text-gray-600">
                      {formData.perks.join(", ") || "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">
                      Interview Mode
                    </dt>
                    <dd className="text-gray-600">
                      {formData.interviewMode || "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">
                      Interview Location
                    </dt>
                    <dd className="text-gray-600">
                      {formData.interviewLocation || "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">
                      Contact Information
                    </dt>
                    <dd className="text-gray-600">
                      {formData.contactEmail || formData.contactPhone
                        ? `${formData.contactEmail} ${formData.contactPhone}`
                        : "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">
                      Contact Preference
                    </dt>
                    <dd className="text-gray-600">
                      {formData.contactPreference || "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">
                      Interview Date & Time
                    </dt>
                    <dd className="text-gray-600">
                      {formData.interviewDate && formData.interviewTime
                        ? `${formData.interviewDate} at ${formData.interviewTime}`
                        : "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Joining Fee</dt>
                    <dd className="text-gray-600">
                      {formData.joiningFee ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">Job Expiry</dt>
                    <dd className="text-gray-600">
                      {formData.jobExpireTime} days
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-800">
                      Number of Candidates Required
                    </dt>
                    <dd className="text-gray-600">
                      {formData.numberOfCandidatesRequired}
                    </dd>
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
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-[#00223f] to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                    }`}
                  >
                    <FaCheck className="mr-2" />
                    {isSubmitting ? "Submitting..." : "Submit Job Posting"}
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
