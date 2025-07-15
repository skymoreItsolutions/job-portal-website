import React from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

import { FiCalendar } from "react-icons/fi";

const First = ({ alldata, handelinputs, handelgender }) => {

  console.log(alldata)
  const isChecked = true;
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-6 space-y-6">
        <div className="animate-fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="John Doe"
              name="full_name"
              value={alldata.full_name || ""}
              onChange={handelinputs}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
          </div>
        </div>

        
        <div className="animate-fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <div className="relative">
            <input
              type="date"
              name="dob"
              value={alldata.dob  || ""}
              onChange={handelinputs}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 appearance-none"
            />
            <FiCalendar className="absolute right-3 top-3.5 text-gray-400" />
          </div>
        </div>

        
        <div className="animate-fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <div className="flex gap-3">
            {["Male", "Female"].map((gender) => (
              <button
                key={gender}
                onClick={() => handelgender(gender)}
                className={`flex-1 py-2.5 px-4 rounded-lg border transition-all duration-200 ${
                  alldata.gender === gender
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-md"
                    : "border-gray-300 text-gray-700 hover:border-emerald-300"
                }`}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>

        {/* Phone Number Field */}
        <div className="animate-fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="tel"
            placeholder="+91 (___) ___-____"
            name="number"
            value={alldata.number  || ""}
            onChange={handelinputs}
            minLength={10}
            maxLength={15}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
          />
        </div>

        {/* WhatsApp Checkbox */}
        <div
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200 animate-fade-in"
          onClick={() => setIsChecked(!isChecked)}
        >
          {isChecked ? (
            <MdCheckBox className="text-emerald-500 text-xl flex-shrink-0" />
          ) : (
            <MdCheckBoxOutlineBlank className="text-gray-400 text-xl flex-shrink-0" />
          )}
          <p className="text-gray-600 text-sm">
            Send me important job updates on WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
};

export default First;
