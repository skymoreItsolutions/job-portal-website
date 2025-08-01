import JobDetailClient from "../../components/JobDetailClient";
import { jobsData } from "../../data/jobs";

export async function generateStaticParams() {
  return jobsData.map((job) => ({
    location: job.location.toLowerCase().replace(/\s+/g, "-"),
    jobname: job.title.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export default function JobDetail({ params }) {
  return (
    <>
      <JobDetailClient params={params} />
    </>
  );
}
