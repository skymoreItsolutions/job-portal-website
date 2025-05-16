import React from 'react'
import { FiUploadCloud, FiFileText, FiX, FiCheckCircle } from "react-icons/fi";

const Five = ({alldata,handelinputs,handelresume,resume}) => {
  return (
     <div className="question space-y-4 lg:space-y-4 p-4 lg:p-6  overflow-y-auto  xl:max-h-[500px]">

      <div className="space-y-4">
       

        <div>
          <h6 className="text-sm font-semibold">Preferred Language</h6>

          <div className="flex items-center gap-x-4 mt-2">
            <input
              type="text"
              placeholder="e.g Hindi"
              name="preferred_language"
               value={alldata.preferred_language}
               onChange={(e)=>handelinputs(e)}
              className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
            />
          </div>
        </div>


        <div>
          <h6 className="text-sm font-semibold">Skills</h6>

          <div className="flex items-center gap-x-4 mt-2">
            <input
              type="text"
              placeholder="Selected up to 10 role of this job"
              name="skills"
              value={alldata.skills}
              onChange={(e)=>handelinputs(e)}
              className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
            />
          </div>
        </div>

        <div className="space-y-2">
      <h6 className="text-sm font-semibold text-gray-700">Upload Resume</h6>
      
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
              ? "border-green-100 bg-green-50"
              : "border-gray-300 hover:border-green-400 bg-gray-50 group-hover:bg-white"
          }`}
        >
          {resume ? (
            // Uploaded state
            <div className="flex flex-col items-center w-full">
              <div className="relative mb-3">
                <FiFileText className="w-10 h-10 text-green-500" />
                <FiCheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-white bg-green-500 rounded-full p-0.5" />
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
              <FiUploadCloud className="w-8 h-8 text-gray-400 mb-2 group-hover:text-green-500 transition-colors" />
              <p className="text-sm text-gray-600 text-center">
                <span className="font-medium text-green-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">PDF, DOCX (Max. 5MB)</p>
            </>
          )}
        </label>
        
        {/* Animated border effect */}
        {!resume && (
          <div className="absolute inset-0 border-2 border-transparent rounded-xl pointer-events-none group-hover:border-green-200 transition-all duration-300" />
        )}
      </div>
    </div>

        
      </div>

  </div>
  )
}

export default Five