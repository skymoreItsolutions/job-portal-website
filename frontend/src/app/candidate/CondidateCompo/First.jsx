import React from 'react'
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { SlCalender } from "react-icons/sl";


const First = ({alldata,handelinputs,handelgender}) => {
    const isChecked=true
  return (
    <div>
            <div className="p-4 border-b border-gray-300 flex flex-col sm:flex-row sm:items-center justify-between">
              <h6 className="font-semibold text-lg">Basic Details</h6>
              <div className=" w-[250px] bg-gray-400 rounded-2xl p-2 overflow-x-hidden relative">
                    <div className="bg-[#309689] w-[10%] h-full absolute left-0 top-0 "></div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="font-semibold text-sm">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  name='full_name'
                  value={alldata.full_name}
                  onChange={(e) => handelinputs(e)}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div className="relative">
                <label className="font-semibold text-sm">Date of Birth (DOB)</label>
                <input
                  type="date"
                  placeholder="Choose date"
                  name='dob'
                  value={alldata.dob}
          onChange={(e) => handelinputs(e)}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                {/* <SlCalender className="absolute right-4 top-12 text-gray-500" /> */}
              </div>

              {/* Gender */}
              <div>
                <label className="font-semibold text-sm">Gender</label>
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => handelgender("Male")}
                    className={`px-6 py-2 border rounded-full transition ${
                      alldata.gender === "Male"
                        ? "bg-[#309689] text-white border-green-500"
                        : "border-[#309689] text-[#309689]"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => handelgender("Female")}
                    className={`px-6 py-2 border rounded-full transition ${
                        alldata.gender === "Female"
                        ? "bg-[#309689] text-white border-green-500"
                        : "border-[#309689] text-[#309689]"
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div>
                <label className="font-semibold text-sm">number (Optional)</label>
                <input
                  type="number"
                  placeholder="Enter  Number"
                  name="number"
                  onChange={(e)=>handelinputs(e)}
value={alldata.number}

                min={10}  
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div
                className="flex items-center gap-2 cursor-pointer"
                // onClick={() => setIsChecked(!isChecked)}
              >
                {isChecked ? (
                  <MdCheckBox className="text-green-600 text-lg" />
                ) : (
                  <MdCheckBoxOutlineBlank className="text-gray-500 text-lg" />
                )}
                <p className="text-gray-600 text-sm">Send me important job updates on WhatsApp</p>
              </div>
            </div>
          </div>
  )
}

export default First