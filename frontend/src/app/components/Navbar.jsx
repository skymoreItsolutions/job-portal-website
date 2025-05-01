'use client'

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { baseurl } from './common';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loginType, setLoginType] = useState('');
const [otpsended,SetotpSend]=useState(false)
const [otp,setotp]=useState('')
const [loading,setLoading]=useState(false)

const [email,setemail]=useState("")
const navigation=useRouter()
const handelotp=async()=>{
  setLoading(true)
if(email.trim()){
  const response=await axios.post(`${baseurl}/send-otp`,{email:email})
  console.log(response.data)
  SetotpSend(true)
}

setLoading(false)
}

const handelSendopt=async()=>{
  setLoading(true)
  if(otp.length==6){ 

    const response=await axios.post(`${baseurl}/verify-otp`,{email:email,otp:otp})


  if(response.data.success){
    localStorage.setItem("port_tok",response.data.token)
    setShowModal(false)
    navigation.push('/candidate/candidate-login')
  }
  }
  setLoading(false)

}


  return (
    <>
      {/* Navbar */}
      <nav className="bg-white p-4 shadow-md sticky top-0 z-50 px-[8%] ">
        <div className="mx-auto flex justify-between items-center">
          <div className="text-black text-2xl font-bold">
            <Link href="/">MyCompany</Link>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-black hover:text-gray-600">Home</Link>
            <Link href="/about" className="text-black hover:text-gray-600">About</Link>
            <Link href="/jobs" className="text-black hover:text-gray-600">Jobs</Link>
            <Link href="/contact" className="text-black hover:text-gray-600">Contact</Link>
            <Link
              href="/employer-login"
              onClick={() => { setLoginType('Employer'); setShowModal(true); }}
              className="text-black cursor-pointer font-semibold border-2 border-green-500 px-3 py-1 rounded"
            >
              Employer Login
            </Link>
            <button
              onClick={() => { setLoginType('Candidate'); setShowModal(true); }}
              className="text-white cursor-pointer font-semibold  bg-green-500  px-3 py-1 rounded "
            >
              Candidate Login
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black focus:outline-none"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-4">
            <Link href="/" className="text-black hover:text-gray-600">Home</Link>
            <Link href="/about" className="text-black hover:text-gray-600">About</Link>
            <Link href="/jobs" className="text-black hover:text-gray-600">Jobs</Link>
            <Link href="/contact" className="text-black hover:text-gray-600">Contact</Link>
            <button
              onClick={() => { setLoginType('Employer'); setShowModal(true); }}
              className="text-white  border-green-500 px-3 py-1 rounded"
            >
              Employer Login
            </button>
            <button
              onClick={() => { setLoginType('Candidate'); setShowModal(true); }}
              className="text-white bg-green-500  px-3 py-1 rounded"
            >
              Candidate Login
            </button>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#00000054] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <h2 className="text-xl mb-4 font-bold">{loginType} Enter your Email 
            </h2>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              className="w-full border p-2 rounded"
              onChange={(e)=>setemail(e.target.value)}
              disabled={otpsended}
            /> 


{ otpsended &&
  <div>
  <label htmlFor='otp'>Otp</label>
  <input
              type="number"
              value={otp}
              placeholder="Enter your Otp"
              className="w-full border p-2 rounded"
              onChange={(e)=>setotp(e.target.value)}
              maxLength={6}
              
            /> 
  
  </div>
}





            <p className='text-slate-400 my-4'>
            By continuing, you agree  service and Privacy Policy
            </p>
            {otpsended &&
            <button
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            onClick={handelSendopt}
            disabled={loading}
          >
           {loading?"Loading...":"verifyotp"}  
          </button>

            }
   
   { !otpsended &&<>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={handelotp}
                disabled={loading}
              >
                
                {loading?"Loading...":"Submit"} 
              </button>
             
            </div>
            </>
   }
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
