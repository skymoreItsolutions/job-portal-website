import React from 'react'

const Three = ({alldata,handelinputs}) => {
  return (
    <div className="question space-y-4 lg:space-y-4 p-4 lg:p-6  overflow-y-auto  xl:max-h-[500px]">
    {/* <div>
      <h6 className="text-sm font-semibold">
        Do you have work experience?
      </h6>
      <div className="flex items-center gap-x-4 mt-2">
        <button
          className={`border rounded-full px-5 py-1 text-xs transition ${
            selected === "yes"
              ? "bg-[#eaf8f4] text-[#208268]"
              : "border-gray-400 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setSelected("yes")}
        >
          Yes
        </button>
        <button
          className={`border rounded-full px-5 py-1 text-xs transition ${
            selected === "no"
              ? "bg-[#eaf8f4] text-[#208268]"
              : "border-gray-400 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setSelected("no")}
        >
          No
        </button>
      </div>
    </div>

    {selected && ( */}
      <div className="space-y-4">
        <div>
          <h6 className="text-sm font-semibold">
            Total Years of Experience
          </h6>
          <div className="flex gap-x-4 mt-2 items-center">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="">Year</label>
              <select
               
                id=""
                name="experience_years"
                value={alldata.experience_years}
                onChange={(e)=>handelinputs(e)}
                className="w-full py-2 rounded border border-gray-400 focus:border-green-800 px-4"
              >
                <option value="">Years</option>
                {[...Array(12)].map((_, index) => (
      <option key={index + 1} value={index + 1}>
        {index + 1}
      </option>))}
              </select>
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="">Months (optional)</label>
              <select
               name="experience_months"
               value={alldata.experience_months}
               onChange={(e)=>handelinputs(e)}
                id=""
                className="w-full py-2 rounded border border-gray-400 focus:border-green-800 px-4"
              >
 <option value="">Months</option>
    {[...Array(12)].map((_, index) => (
      <option key={index + 1} value={index + 1}>
        {index + 1}
      </option>))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <h6 className="text-sm font-semibold">Job Title</h6>

          <div className="flex items-center gap-x-4 mt-2">
            <input
              type="text"
              placeholder="e.g Teacher"
              name="job_roles"
               value={alldata.job_roles}
               onChange={(e)=>handelinputs(e)}
              className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
            />
          </div>
        </div>
        <div>
          <h6 className="text-sm font-semibold">Job Role</h6>

          <div className="flex items-center gap-x-4 mt-2">
            <input
              type="text"
              placeholder="Selected up to 10 role of this job"
              name="job_title"
              value={alldata.job_title}
              onChange={(e)=>handelinputs(e)}
              className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
            />
          </div>
        </div>
        <div>
          <h6 className="text-sm font-semibold">Company Name</h6>

          <div className="flex items-center gap-x-4 mt-2">
            <input
              type="text"
              placeholder="e.g Job portal tech"
              name="company_name"
              value={alldata.company_name}
              onChange={(e)=>handelinputs(e)}
              className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
            />
          </div>
        </div>

        <div>
          <h6 className="text-sm font-semibold">Current Salary</h6>

          <div className="flex items-center gap-x-4 mt-2">
            <input
               name="current_salary"
               value={alldata.current_salary}
               onChange={(e)=>handelinputs(e)}
               placeholder='Current Salary'
              id=""
              className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
            />
              
          </div>
        </div>

        <div>
          <h6 className="text-sm font-semibold">Start Date</h6>

          <div className="flex items-center gap-x-4 mt-2">
          <input
          type='date'
              name="start_date"
              value={alldata.start_date}
              onChange={(e)=>handelinputs(e)}
              id=""
              className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
           />
              

           
          </div>
        </div>
      </div>

  </div>
  )
}

export default Three