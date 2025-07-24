import React from 'react'
import Jobs from '../components/Jobs'

export const metadata = {
  title: "Find Your Dream Job – Explore Exciting Opportunities",
  description:
    "Discover top job opportunities with our advanced job portal. Connect with leading employers, apply with ease, and take the next step in your career. Start your job search today!",
};

export  default  async function page({searchParams}) {

  return (
    <div>
      <Jobs searchParams={searchParams}/>
    </div>
  )
}
