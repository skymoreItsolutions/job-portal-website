'use client'

import MultiStepJobPostingForm from '@/app/components/MultiStepJobPostingForm'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { baseurl } from '@/app/components/common'


 const page = (props) => {
 const [LoggedIn,setIsLoggedIn] = useState()


  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('employerToken');
      if (!token) return;

      try {
        const res = await axios.get(`${baseurl}/employer/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

       
          setIsLoggedIn(res.data.data);
   
      } catch (err) {
 
        setIsLoggedIn();
      }
    };

    checkLogin();
  }, []);

  return(
     <>
     <MultiStepJobPostingForm userdata={LoggedIn} />
     </>
   )

 }

 export default page