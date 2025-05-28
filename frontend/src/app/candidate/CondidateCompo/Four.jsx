import React from 'react'
import { MdCheckBoxOutlineBlank } from "react-icons/md";
const Four = ({alldata,handelinputs,handelcheckbox}) => {
  return (
    <div className="question space-y-4 lg:space-y-6 p-4 lg:p-6  overflow-y-auto  xl:max-h-[500px]">
            <div>
              <h6 className="text-sm font-semibold">Preferred Shifts</h6>
              <div className="space-y-4 mt-4">
                <div className="px-4  py-3 border border-gray-200  w-full flex justify-between">
                  Night Shift
                 
    
                  <input type="checkbox" name="prefers_night_shift" id="" checked={alldata.prefers_night_shift}  onChange={()=>handelcheckbox("prefers_night_shift",alldata.prefers_night_shift?0:1)} />
                </div>
                <div className="px-4  py-3 border border-gray-200  w-full flex justify-between">
                  Day Shift
                  
                  <input type="checkbox" name="prefers_day_shift" id="" checked={alldata.prefers_day_shift} onChange={()=>handelcheckbox("prefers_day_shift",alldata.prefers_day_shift?0:1)} />

                </div>
              </div>
            </div>
            <div>
              <h6 className="text-sm font-semibold">Preferred Workplace</h6>
              <div className="space-y-4 mt-4">
                <div className="px-4  py-3 border border-gray-200  w-full flex justify-between">
                  Work from Home
                  <input type="checkbox" name="work_from_home" id="" checked={alldata.work_from_home} onChange={()=>handelcheckbox("work_from_home",alldata.work_from_home?0:1)} />

                </div>
                <div className="px-4  py-3 border border-gray-200  w-full flex justify-between">
                  Work from Office
                  <input type="checkbox" name="work_from_office" id="" checked={alldata.work_from_office} onChange={()=>handelcheckbox("work_from_office",alldata.work_from_office?0:1)} />

                </div>
                <div className="px-4  py-3 border border-gray-200  w-full flex justify-between">
                  Field Job
                  <input type="checkbox" name="field_job" id="" checked={alldata.field_job} onChange={()=>handelcheckbox("field_job",alldata.field_job?0:1)} />

                </div>
              </div>
            </div>

            <div>
              <h6 className="text-sm font-semibold"> Preferred Employment Type</h6>
              <div className="space-y-4 mt-4">
                <div className="px-4  py-3 border border-gray-200  w-full flex justify-between">
                Full Time

                  <input type="radio"  name="employment_type" id=""  onChange={()=>handelcheckbox("employment_type","full time")} />

                </div>
                <div className="px-4  py-3 border border-gray-200  w-full flex justify-between">
                Part Time

                  <input type="radio" name="employment_type" id=""  onChange={()=>handelcheckbox("employment_type","part time")} />

                </div>
              </div>
            </div>
          </div>

  )
}

export default Four