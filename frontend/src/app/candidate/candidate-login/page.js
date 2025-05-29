"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import axios from "axios";
import { baseurl } from "@/app/components/common";
import First from "../condidatecompo/First";
import Second from "../condidatecompo/Second";
import Three from "../condidatecompo/Three";
import Four from "../condidatecompo/Four";
import Five from "../condidatecompo/Five";
import data from "@/app/jobdata";
import Swal from "sweetalert2";

export default function Page() {
  const router = useRouter();
  // const [isChecked, setIsChecked] = useState(false);
  // const [selectedGender, setSelectedGender] = useState(null);
  // const [fullName, setFullName] = useState("");
  // const [dob, setDob] = useState("");
  // const [number, setNumber] = useState("");
  const [alldata,setalldata]=useState({
    full_name:"",
    dob:undefined,
    gender:"",
    number:undefined,
    degree:"",
    college_name:"",
    passing_marks:undefined,
    experience_years:undefined,
    job_roles:"",
    job_title:"",
    experience_months	:undefined,
    company_name:"",
    prefers_night_shift:0,
    prefers_day_shift:1,
    work_from_home:0,
    work_from_office	:1,
    field_job:0,
    preferred_language:"",
    skills:"",
    pursuing: 0

  })

  const [resume,setResume]=useState();


  const handelresume=(e)=>{
     const file = e.target.files[0];
  if (file) {
    setResume(file);
  }
  }

const [nextlen,setnextlen]=useState(1)

  const handelinputs=(e)=>{
    const { name, value } = e.target;
  setalldata((prevData) => ({
    ...prevData,
    [name]: value,
  }));
    // setalldata({...alldata,[e.vtagate.name]:e.tagate.value})
  }
const handelgender=(gender)=>{
  setalldata({...alldata,gender})

}

  const handleNext = async() => {
    const userData = {
      full_name: fullName,
      dob,
      gender: selectedGender,
      number,
    };
   const token=  localStorage.getItem("port_tok")
const response = await axios.post(`${baseurl}/candidate-educations/${token}`,userData)
  router.push("/candidate/educations");
  };

const handelcheckbox=(key,value)=>{
setalldata({...alldata,[key]:value})

}



const handelSubmit=async()=>{

const formData= new FormData();

Object.entries(alldata).forEach(([key, value]) => {


  if (value === undefined || value === null) {
      formData.append(key, "");
    } else {
      formData.append(key, value);
    }
  });

  
 if (resume) {
    formData.append("resume", resume); 
  }
 const token= localStorage.getItem("port_tok")
const response= await axios.post(`${baseurl}/updatecandidate/${token}`,formData);
if(response.data.success){
  Swal.fire({
    title:"Submit Success",
      text: "You clicked the button!",
  icon: "success"
  })
  router.push("/")

}else{
   Swal.fire({
    title:"Submit Error",
      text: "You clicked the button!",
  icon: "error"
  })
}

}


const getcondidate=async(token)=>{
  if(!token){
      router.push("/")

  }
  else{
  const response= await axios.get(`${baseurl}/candidateinfo/${token}`)
  if(response.data.success){
setalldata(response.data.candidate)
  }
  }
}

useEffect(()=>{
 const token= localStorage.getItem("port_tok")
 getcondidate(token)
},[])


  return (
    <div className="bg-[#e8e7ea] px-5 md:px-12 xl:px-32 py-8 lg:py-12">
      <div className="w-full xl:h-[85vh] lg:w-[85%] mx-auto flex flex-col lg:flex-row lg:items-stretch gap-8">
        {/* Left Section */}
        <div className="w-full flex flex-row lg:flex-1/2 gap-4 h-full">
          <div className="flex flex-col flex-1 h-full">
            <img
              src="https://cdn.apna.co/cloudinary/OnboardingV3NonJobContextBanner.png"
              alt="job banner"
              className="rounded-3xl object-center h-full w-full"
            />
            <img
              src="https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/OnboardingV3CompanyLogo.png"
              alt="company logo"
              className="mx-auto mt-4 h-auto"
            />
          </div>
          <div className="hidden md:flex lg:hidden flex-col flex-1 h-full">
            <img
              src="https://cdn.apna.co/cloudinary/OnboardingV3NonJobContextBanner.png"
              alt="job banner"
              className="rounded-3xl object-cover object-center h-full w-full max-h-[250px] md:max-h-[420px] lg:max-h-[100px]"
            />
            <img
              src="https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/OnboardingV3CompanyLogo.png"
              alt="company logo"
              className="mx-auto mt-4 h-auto"
            />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full  flex  flex-col justify-between bg-white rounded-3xl shadow-lg h-full">
         {nextlen==1 && <First  alldata={alldata} handelinputs={handelinputs} handelgender={handelgender}/>}
         {nextlen==2 && <Second  alldata={alldata} handelinputs={handelinputs} handelgender={handelgender}/>}
         {nextlen==3 && <Three  alldata={alldata} handelinputs={handelinputs} handelgender={handelgender}/>}
         {nextlen==4 && <Four  alldata={alldata} handelinputs={handelinputs}  handelcheckbox={handelcheckbox}/>}
         {nextlen==5 && <Five  resume={resume} handelresume={handelresume}  alldata={alldata} handelinputs={handelinputs} handelgender={handelgender}/>}

          <div className="p-4 border-t border-gray-300 flex justify-between">
          <button  disabled={nextlen==1} onClick={()=>setnextlen(nextlen-1)} className=" py-3 px-5  bg-[#fc3e3e] text-white font-semibold rounded-md hover:bg-[#3e6e68] active:-translate-y-2 transition">
              Prev
            </button>
          { nextlen<5 && <button  disabled={nextlen==5} onClick={()=>setnextlen(nextlen+1)} className=" py-3 px-5 bg-[#309689] text-white font-semibold rounded-md hover:bg-[#3e6e68] active:-translate-y-2 transition">
              Next
            </button>
}
   { nextlen==5 && <button   onClick={handelSubmit} className=" py-3 px-5 bg-[#309689] text-white font-semibold rounded-md hover:bg-[#3e6e68] active:-translate-y-2 transition">
              Submit
            </button>
}
          </div>
        </div>
      </div>
    </div>
  );
}