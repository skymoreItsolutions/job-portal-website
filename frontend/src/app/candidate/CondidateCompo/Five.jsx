"use client"
import React, { useState } from 'react'

    import { FiUploadCloud, FiFileText, FiCheckCircle, FiX, FiEye, FiEyeOff } from 'react-icons/fi';

const Five = ({alldata,handelinputs,handelresume,resume,addskilles,setalldata}) => {
  const [showpassword,setShowpassword]=useState(false)
const [defaultskill,setDefaultskil]=useState("")


  return (

<div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 hover:shadow-md transition-shadow duration-300">
  {/* Header */}
  <div className="mb-6">
    <h2 className="text-xl font-bold text-gray-800">Profile Details</h2>
    <p className="text-gray-500 text-sm">Complete your professional profile</p>
  </div>

  <div className="space-y-6">
    {/* Preferred Language */}
    <div className="animate-fade-in">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Preferred Language
      </label>
      <input
        type="text"
        placeholder="e.g. Hindi, English, Spanish"
        name="preferred_language"
        value={alldata?.preferred_language || ''}
        onChange={handelinputs}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
      />
    </div>

    {/* Skills Input */}
    <div className="animate-fade-in">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Skills
        <span className="text-xs text-gray-500 ml-1">(Add up to 10 skills)</span>
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Type a skill and press Enter"
          name="skills"
          value={defaultskill}
          onChange={(e) => setDefaultskil(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (defaultskill.trim()) {
                addskilles(defaultskill.trim());
                setDefaultskil("");
              }
            }
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
        />
        <span className="absolute right-3 top-3.5 text-xs text-gray-400">
          {alldata?.skills?.length || 0}/10
        </span>
      </div>
      
      {/* Skills Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {alldata?.skills?.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-sm"
          >
            {item}
            <button
              type="button"
              onClick={() => {
                const updatedSkills = [...alldata.skills];
                updatedSkills.splice(index, 1);
                setalldata({...alldata, skills: updatedSkills});
              }}
              className="ml-1.5 text-emerald-600 hover:text-emerald-800"
            >
              <FiX size={14} />
            </button>
          </div>
        ))}
      </div>
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
          value={alldata.password || ''}
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
        
        {/* Styled upload area */}
        <label
          htmlFor="resume-upload"
          className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
            resume
              ? "border-emerald-100 bg-emerald-50"
              : "border-gray-300 hover:border-emerald-400 bg-gray-50 group-hover:bg-white"
          }`}
        >
          {resume ? (
            // Uploaded state
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
                  handleRemoveResume();
                }}
                className="mt-3 flex items-center text-xs text-red-500 hover:text-red-600 transition-colors"
              >
                <FiX className="mr-1" /> Remove file
              </button>
            </div>
          ) : (
            // Empty state
            <>
              <FiUploadCloud className="w-8 h-8 text-gray-400 mb-2 group-hover:text-emerald-500 transition-colors" />
              <p className="text-sm text-gray-600 text-center">
                <span className="font-medium text-emerald-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">PDF, DOCX (Max. 5MB)</p>
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
  )
}

export default Five