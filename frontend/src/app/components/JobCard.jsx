import Link from "next/link";
import React from "react";
import { CiBookmarkPlus } from "react-icons/ci";
import { FaDollarSign, FaMapMarkerAlt,  } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";


import { IoTimeOutline } from "react-icons/io5";

export default function JobCard({ jobcard }) {
  const { title, company, img ,jobType,salary,location,industry} = jobcard;

  const jobDetailsList = [
    {
      name: industry,
      icon: <IoBagOutline/>,
    },
    {
      name: jobType,
      icon: <IoTimeOutline/>,
    },
    {
      name: salary,
      icon: <FaDollarSign />,
    },
    {
      name: location,
      icon: <FaMapMarkerAlt />,
    },
  ];


  return (
    <>
      <div className="mt-5 lg:mt-10  space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[#309689] bg-[#3096891A] text-base px-2 rounded-2xl">
            10 min ago
          </span>
          <button>
            <CiBookmarkPlus />
          </button>
        </div>
        <div className="flex flex-row gap-x-4 lg:gap-x-2 items-center">
          <img src={img} alt="job-logo" className="w-8 h-8 lg:h-8 lg:w-8" />
          <div>
            <h5 className="font-semibold text-xl lg:text-xl">{title}</h5>
            <p className="text-base">{company}</p>
          </div>
        </div>
        <div className="flex  flex-col gap-y-5 lg:gap-y-0 md:flex-row justify-between">
          <div className="grid grid-cols-1 gap-y-5 lg:gap-y-0 md:flex  items-center gap-x-4 text-black">
            {jobDetailsList.map((elm, indx) => (
              <div key={indx} className="flex items-center text-base gap-x-2">
                <span className="text-[#309689]">{elm.icon}</span>
                <span className="text-[#6C757D]">{elm.name}</span>
              </div>
            ))}
          </div>
          <Link href={`/job-detail/${title.split(" ").join("-").toLowerCase()}`} className="px-4  lg:px-16 py-2 rounded bg-[#309689] text-base text-white">
            Apply Job
          </Link>
        </div>
      </div>
    </>
  );
}
