"use client";
import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import {
  FiUploadCloud,
  FiFileText,
  FiCheckCircle,
  FiX,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const Five = ({ alldata, handelinputs, handelresume, resume, setalldata }) => {
  const [showpassword, setShowpassword] = useState(false);

  // Initial language and skill options
  const [languageOptions, setLanguageOptions] = useState([
    { value: "Afrikaans", label: "Afrikaans" },
    { value: "Albanian", label: "Albanian" },
    { value: "Amharic", label: "Amharic" },
    { value: "Yoruba", label: "Yoruba" },
    { value: "Zulu", label: "Zulu" },
  ]);

  const [skillOptions, setSkillOptions] = useState([
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "Raspberry Pi", label: "Raspberry Pi" },
    { value: "Virtual Reality", label: "Virtual Reality" },
    { value: "Augmented Reality", label: "Augmented Reality" },
  ]);

  // Custom styles for react-select to match existing form styling
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #d1d5db",
      borderRadius: "0.5rem",
      padding: "0.5rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#10b981",
      },
      "&:focus-within": {
        borderColor: "#10b981",
        boxShadow: "0 0 0 2px rgba(16, 185, 128, 0.5)",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#d1fae5",
      color: "#065f46",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#065f46",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#065f46",
      "&:hover": {
        backgroundColor: "#059669",
        color: "white",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  // Handle language selection
  const handleLanguageChange = (selectedOptions) => {
    const selectedLanguages = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setalldata({ ...alldata, preferred_languages: selectedLanguages });
  };

  // Handle skill selection
  const handleSkillChange = (selectedOptions) => {
    const selectedSkills = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setalldata({ ...alldata, skills: selectedSkills.slice(0, 10) }); // Limit to 10 skills
  };

  // Handle input change to detect comma
  const handleInputChange = (inputValue, actionMeta, type) => {
    const lastChar = inputValue[inputValue.length - 1];
    const isComma = lastChar === ",";

    if (isComma) {
      const newValue = inputValue.slice(0, -1).trim(); // Remove the comma and trim spaces
      if (newValue) {
        if (type === "language") {
          // Prevent duplicate languages
          const isDuplicate = languageOptions.some(
            (option) => option.value.toLowerCase() === newValue.toLowerCase()
          );
          if (!isDuplicate) {
            const newOption = { value: newValue, label: newValue };
            setLanguageOptions((prev) => [...prev, newOption]);
            setalldata({
              ...alldata,
              preferred_languages: [...alldata.preferred_languages, newValue],
            });
          }
        } else if (type === "skill") {
          // Prevent duplicate skills
          const isDuplicate = skillOptions.some(
            (option) => option.value.toLowerCase() === newValue.toLowerCase()
          );
          if (!isDuplicate) {
            const newOption = { value: newValue, label: newValue };
            setSkillOptions((prev) => [...prev, newOption]);
            setalldata({
              ...alldata,
              skills: [...alldata.skills, newValue].slice(0, 10), // Limit to 10 skills
            });
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Profile Details</h2>
        <p className="text-gray-500 text-sm">
          Complete your professional profile
        </p>
      </div>

      <div className="space-y-6">
        {/* Preferred Languages Multi-Select */}
        <div className="animate-fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Languages
            <span className="text-xs text-gray-500 ml-1">
              (Search and select multiple)
            </span>
          </label>
          <CreatableSelect
            isMulti
            name="preferred_languages"
            options={languageOptions}
            value={
              alldata?.preferred_languages?.map((lang) => ({
                value: lang,
                label: lang,
              })) || []
            }
            onChange={handleLanguageChange}
            onInputChange={(inputValue, actionMeta) =>
              handleInputChange(inputValue, actionMeta, "language")
            }
            styles={customStyles}
            placeholder="Search or create languages..."
            className="w-full"
            classNamePrefix="select"
          />
        </div>

        {/* Skills Multi-Select */}
        <div className="animate-fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills
            <span className="text-xs text-gray-500 ml-1">
              (Search and select up to 10 skills)
            </span>
          </label>
          <CreatableSelect
            isMulti
            name="skills"
            options={skillOptions}
            value={
              alldata?.skills?.map((skill) => ({
                value: skill,
                label: skill,
              })) || []
            }
            onChange={handleSkillChange}
            onInputChange={(inputValue, actionMeta) =>
              handleInputChange(inputValue, actionMeta, "skill")
            }
            styles={customStyles}
            placeholder="Search or create skills..."
            className="w-full"
            classNamePrefix="select"
          />

          <span className="text-xs text-gray-400 mt-1">
            {alldata?.skills?.length || 0}/10 skills selected
          </span>
        </div>

        {/* Password */}
        <div className="animate-fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showpassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={alldata.password || ""}
              minLength={6}
              onChange={handelinputs}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowpassword(!showpassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showpassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
        </div>

        {/* Resume Upload */}
        <div className="animate-fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Resume
          </label>
          <div className="relative group">
            {/* Hidden file input */}
            <input
              type="file"
              id="resume-upload"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handelresume}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="resume-upload"
              className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
                resume
                  ? "border-emerald-100 bg-emerald-50"
                  : "border-gray-300 hover:border-emerald-400 bg-gray-50 group-hover:bg-white"
              }`}
            >
              {resume ? (
                <div className="flex flex-col items-center w-full">
                  <div className="relative mb-3">
                    <FiFileText className="w-10 h-10 text-emerald-500" />
                    <FiCheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-white bg-emerald-500 rounded-full p-0.5" />
                  </div>

                  <div className="w-full text-center">
                    <p className="text-sm font-medium text-gray-800 truncate max-w-xs">
                      {resume.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(resume.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handelresume({ target: { files: [] } }); // Reset resume
                    }}
                    className="mt-3 flex items-center text-xs text-red-500 hover:text-red-600 transition-colors"
                  >
                    <FiX className="mr-1" /> Remove file
                  </button>
                </div>
              ) : (
                <>
                  <FiUploadCloud className="w-8 h-8 text-gray-400 mb-2 group-hover:text-emerald-500 transition-colors" />
                  <p className="text-sm text-gray-600 text-center">
                    <span className="font-medium text-emerald-600">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PDF, DOCX (Max. 5MB)
                  </p>
                </>
              )}
            </label>
            {/* Animated border effect */}
            {!resume && (
              <div className="absolute inset-0 border-2 border-transparent rounded-xl pointer-events-none group-hover:border-emerald-200 transition-all duration-300" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Five;
