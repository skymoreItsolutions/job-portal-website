import React from "react";
import { CiBookmarkPlus } from "react-icons/ci";
import { FaDollarSign, FaMapMarkerAlt, FaRegNewspaper } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { FaBriefcase, FaUserTie, FaClock, FaGraduationCap, FaMoneyBillWave } from "react-icons/fa";

export default function JobDetails() {
  const jobDetailsList = [
    {
      name: "Media",
      icon: <FaRegNewspaper />,
    },
    {
      name: "Full Time",
      icon: <MdWork />,
    },
    {
      name: "280000-320000",
      icon: <FaDollarSign />,
    },
    {
      name: "Los Angeles, USA",
      icon: <FaMapMarkerAlt />,
    },
  ];

  const tags = [
    { id: "1", name: "Full-time" },
    { id: "2", name: "E-commerce" },
    { id: "3", name: "New York" },
    { id: "4", name: "Corporate" },
    { id: "5", name: "Location" },
  ];

  return (
    <div className="container mx-auto">
      <div className="banner  h-[25vh] lg:h-[40vh] bg-black flex items-center justify-center text-white">
        <h1 className="font-bold text-3xl lg:text-5xl">Job Details</h1>
      </div>

      <div className="px-5 md:px-12 xl:px-32">
        <div className="mt-5 lg:mt-10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[#309689] bg-[#3096891A] text-base px-2 rounded-2xl">
              10 min ago
            </span>
            <button>
              <CiBookmarkPlus />
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-x-2 lg:items-center">
            <img
              src="/img/jobs/joblogo.png"
              alt="job-logo"
              className="w-5 h-5 lg:h-8 lg:w-8"
            />
            <div>
              <h5 className="font-semibold text-lg lg:text-xl">
                Corporate Solutions Executive
              </h5>
              <p className="text-base">Leffler and Sons</p>
            </div>
          </div>
          <div className="flex  flex-col gap-y-5 lg:gap-y-0 md:flex-row justify-between">
            <div className="grid grid-cols-1 gap-y-5 lg:gap-y-0 md:flex  items-center gap-x-4 text-black">
              {jobDetailsList.map((elm, indx) => (
                <div key={indx} className="flex items-center text-sm gap-x-2">
                  <span className="text-[#309689]">{elm.icon}</span>
                  <span className="text-[#6C757D]">{elm.name}</span>
                </div>
              ))}
            </div>
            <button className="px-4  lg:px-16 py-2 rounded bg-[#309689] text-base text-white">
              Apply Job
            </button>
          </div>
        </div>

        <div className=" grid lg:grid-cols-3 gap-x-8  mt-4 lg:mt-12">
          <div className="lg:col-span-2">
            <div className="space-y-4 lg:space-y-8">
              <div className="space-y-4">
                <h5 className="font-bold text-xl lg:text-2xl ">
                  Job Description
                </h5>
                <div className="space-y-2 text-base">
                  <p>
                    Nunc sed a nisl purus. Nibh dis faucibus proin lacus
                    tristique. Sit congue non vitae odio sit erat in. Felis eu
                    ultrices a sed massa. Commodo fringilla sed tempor risus
                    laoreet ultricies ipsum. Habitasse morbi faucibus in iaculis
                    lectus. Nisi enim feugiat enim volutpat. Sem quis viverra
                    viverra odio mauris nunc.
                  </p>
                  <p>
                    {" "}
                    Et nunc ut tempus duis nisl sed massa. Ornare varius
                    faucibus nisi vitae vitae cras ornare. Cras facilisis
                    dignissim augue lorem amet adipiscing cursus fames mauris.
                    Tortor amet porta proin in. Orci imperdiet nisi dignissim
                    pellentesque morbi vitae. Quisque tincidunt metus lectus
                    porta eget blandit euismod sem nunc. Tortor gravida amet
                    amet sapien mauris massa.Tortor varius nam maecenas duis
                    blandit elit sit sit. Ante mauris morbi diam habitant donec.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h5 className="font-semibold text-xl lg:text-2xl ">
                  Key Responsibilities
                </h5>
                <div className="space-y-2">
                  <ul className="text-base space-y-4">
                    <li className="flex items-baseline gap-x-2">
                      <FaCheck />

                      <p>
                        Et nunc ut tempus duis nisl sed massa. Ornare varius
                        faucibus nisi vitae vitae cras ornare. Cras facilisis
                        dignissim augu
                      </p>
                    </li>
                    <li className="flex items-baseline gap-x-2">
                      <FaCheck />

                      <p>
                        Cras facilisis dignissim augue lorem amet adipiscing
                        cursus fames mauris. Tortor amet porta proin in
                      </p>
                    </li>
                    <li className="flex items-baseline gap-x-2">
                      <FaCheck />

                      <p>
                        Ornare varius faucibus nisi vitae vitae cras ornare.
                        Cras facilisis dignissim augue lorem amet adipiscing
                        cursus fames
                      </p>
                    </li>
                    <li className="flex items-baseline gap-x-2">
                      <FaCheck />

                      <p>
                        Tortor amet porta proin in. Orci imperdiet nisi
                        dignissim pellentesque morbi vitae. Quisque tincidunt
                        metus lectus porta{" "}
                      </p>
                    </li>
                    <li className="flex items-baseline gap-x-2">
                      <FaCheck />

                      <p>
                        Tortor amet porta proin in. Orci imperdiet nisi
                        dignissim pellentesque morbi vitae. Quisque tincidunt
                        metus lectus porta{" "}
                      </p>
                    </li>
                    <li className="flex items-baseline gap-x-2">
                      <FaCheck />

                      <p>
                        Tortor amet porta proin in. Orci imperdiet nisi
                        dignissim pellentesque morbi vitae. Quisque tincidunt
                        metus lectus porta{" "}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <h5 className="font-semibold text-xl lg:text-2xl ">
                  Professional Skills
                </h5>
                <div className="space-y-2">
                  <ul className="text-base space-y-4">
                    <li className="flex items-baseline gap-x-2">
                      <FaCheck />

                      <p>
                        Et nunc ut tempus duis nisl sed massa. Ornare varius
                        faucibus nisi vitae vitae cras ornare.
                      </p>
                    </li>
                    <li className="flex items-baseline gap-x-2">
                      <FaCheck />

                      <p>Ornare varius faucibus nisi vitae vitae cras ornare</p>
                    </li>
                    <li className="flex items-baseline gap-x-2">
                      <FaCheck />

                      <p>
                        Tortor amet porta proin in. Orci imperdiet nisi
                        dignissim pellentesque morbi vitaes
                      </p>
                    </li>
                    <li className="flex items-baseline gap-x-2">
                      <FaCheck />

                      <p>
                        Tortor amet porta proin in. Orci imperdiet nisi
                        dignissim pellentesque morbi vitae
                      </p>
                    </li>
                    <li className="flex items-baseline gap-x-2">
                      <FaCheck />

                      <p>
                        Tortor amet porta proin in. Orci imperdiet nisi
                        dignissim pellentesque morbi vitae
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <h5 className="font-semibold text-xl lg:text-2xl ">
                  Professional Skills
                </h5>
                <div className=" space-y-2 mt-3 flex flex-wrap gap-4">
                  {tags.map(({ id, name }) => (
                    <h5
                      key={id}
                      className="bg-[#3096881e] text-[#309689] rounded-2xl text-center py-1 px-4 lg:px-6"
                    >
                      {name}
                    </h5>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-0">
                    <div className="job-overview">
                        <h4 className="capitalize font-semibold">job overview</h4>
                        <ul className="mt-4 space-y-4 lg:space-y-6">
  <li className="flex items-center gap-x-4">
    <FaBriefcase />
    <div>
      <h6 className="font-semibold">Job Type</h6>
      <p>Corporate Solutions Executive</p>
    </div>
  </li>
  <li className="flex items-center gap-x-4">
    <FaUserTie />
    <div>
      <h6 className="font-semibold">Job Title</h6>
      <p>Full-time</p>
    </div>
  </li>
  <li className="flex items-center gap-x-4">
    <FaClock />
    <div>
      <h6 className="font-semibold">Experience</h6>
      <p>5 years</p>
    </div>
  </li>
  <li className="flex items-center gap-x-4">
    <FaGraduationCap />
    <div>
      <h6 className="font-semibold">Degree</h6>
      <p>Master’s</p>
    </div>
  </li>
  <li className="flex items-center gap-x-4">
    <FaMoneyBillWave />
    <div>
      <h6 className="font-semibold">Offered Salary</h6>
      <p>$4,000 - $420,000</p>
    </div>
  </li>
  <li className="flex items-center gap-x-4">
    <FaMapMarkerAlt />
    <div>
      <h6 className="font-semibold">Location</h6>
      <p>New York, USA</p>
    </div>
  </li>
</ul>
                    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
