import React from 'react'
import data from '@/app/jobdata';
import JobDetails from '../../components/JobDetails';
export const metadata = {
    title: "Job Details – Explore Your Next Career Opportunity",
    description:
      "Get in-depth details about your next career move. Learn about job roles, responsibilities, company insights, and application processes. Secure your dream job today!",
  };

  export async function generateStaticParams() {
    return data.map((job) => ({
      slug: job.title.split(" ").join("-").toLowerCase(), // ✅ Correct syntax
    }));
  }
 
// export async function generateMetadata({params:{slug}}) {
//   const slugProdcut=data.find((elm)=>elm.title.split(" ").join("-").toLowerCase()==slug)

//   return {
//     title:slugProdcut.title,
//     description: job.description[0], 
//   };
// }


export default function page({params:{slug}}) {
  const slugProdcut=data.find((elm)=>elm.title.split(" ").join("-").toLowerCase()==slug)

  return (
    <div>
      <JobDetails slug={slug} slugProdcut={slugProdcut}/>
    </div>
  )
}
