import React from "react";
import {
  MapPin,
  Clock,
  DollarSign,
  Building,
  Calendar,
  AlertCircle,
  Star,
  Users,
  Briefcase,
  Award,
  Heart,
  Share2,
  Bookmark,
} from "lucide-react";

export const JobDetails = ({ job }) => {
  const job = {
    title: "Senior Frontend Engineer",
    company: "TechNova Inc.",
    companyLogo: "https://via.placeholder.com/80x80.png?text=Logo",
    location: "San Francisco, CA",
    type: "Full-Time",
    salary: "$120,000 - $150,000",
    posted: "3 days ago",
    urgent: true,
    featured: true,
    experienceLevel: "Senior",
    department: "Engineering",
    tags: ["React", "JavaScript", "TailwindCSS", "Next.js", "TypeScript"],
    description: `
    We're looking for a passionate and experienced Senior Frontend Engineer to join our growing team. 
    You'll work on high-impact products that reach millions of users and help shape the future of our frontend stack.
  `,
    requirements: [
      "5+ years of experience in frontend development.",
      "Strong expertise in React and JavaScript/TypeScript.",
      "Familiarity with TailwindCSS and modern CSS practices.",
      "Experience with performance optimization and accessibility.",
      "Good understanding of RESTful APIs and state management.",
    ],
    responsibilities: [
      "Develop and maintain scalable web applications.",
      "Collaborate with designers, backend developers, and product managers.",
      "Write clean, maintainable, and well-documented code.",
      "Participate in code reviews and mentoring.",
      "Drive improvements to our frontend architecture and processes.",
    ],
    benefits: [
      "Health, dental, and vision insurance.",
      "Flexible work hours and remote-friendly policy.",
      "Professional development stipend.",
      "Generous PTO and parental leave.",
      "Team retreats and wellness programs.",
    ],
  };

  const getExperienceLevelColor = (level: string) => {
    switch (level) {
      case "Entry":
        return "bg-green-100 text-green-800";
      case "Mid":
        return "bg-blue-100 text-blue-800";
      case "Senior":
        return "bg-purple-100 text-purple-800";
      case "Lead":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <div className="flex items-start gap-6">
          <div className="relative">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-20 h-20 rounded-xl object-cover border-4 border-white/20 shadow-lg"
            />
            {job.featured && (
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full p-1">
                <Star className="w-4 h-4 fill-current" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl font-bold">{job.title}</h1>
              {job.urgent && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white animate-pulse">
                  <AlertCircle className="w-4 h-4" />
                  Urgent
                </span>
              )}
              {job.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-yellow-400 text-yellow-900">
                  <Star className="w-4 h-4" />
                  Featured
                </span>
              )}
            </div>

            <h2 className="text-xl text-blue-100 mb-4 flex items-center gap-2">
              <Building className="w-5 h-5" />
              {job.company}
            </h2>

            {/* Job meta info grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2 text-blue-100">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Clock className="w-5 h-5" />
                <span className="text-sm">{job.type}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <DollarSign className="w-5 h-5" />
                <span className="text-sm font-semibold">{job.salary}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Calendar className="w-5 h-5" />
                <span className="text-sm">Posted {job.posted}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Apply Now
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-white/20 flex items-center gap-2">
                <Bookmark className="w-5 h-5" />
                Save
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-white/20 flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Job details content */}
      <div className="p-8 space-y-8">
        {/* Quick info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">
                  Experience Level
                </p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getExperienceLevelColor(
                    job.experienceLevel
                  )}`}
                >
                  {job.experienceLevel}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Department</p>
                <p className="font-semibold text-green-800">{job.department}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Benefits</p>
                <p className="font-semibold text-purple-800">
                  {job.benefits.length} perks
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Job description */}
        <section className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            Job Description
          </h3>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </section>

        {/* Requirements */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            Requirements
          </h3>
          <div className="grid gap-3">
            {job.requirements.map((requirement, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 bg-blue-50 rounded-lg border border-blue-100 hover:border-blue-200 transition-colors duration-200"
              >
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">
                    {index + 1}
                  </span>
                </div>
                <span className="text-gray-700 leading-relaxed">
                  {requirement}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Responsibilities */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-green-600 rounded-full"></div>
            Responsibilities
          </h3>
          <div className="grid gap-3">
            {job.responsibilities.map((responsibility, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 bg-green-50 rounded-lg border border-green-100 hover:border-green-200 transition-colors duration-200"
              >
                <div className="w-2 h-2 bg-green-600 rounded-full mt-3 flex-shrink-0"></div>
                <span className="text-gray-700 leading-relaxed">
                  {responsibility}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
            Benefits & Perks
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {job.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-100 hover:border-purple-200 transition-colors duration-200"
              >
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 flex-shrink-0"></div>
                <span className="text-gray-700 leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Apply section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">
            Ready to Join {job.company}?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Take the next step in your career and become part of an innovative
            team that values growth, collaboration, and making a real impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2">
              <Briefcase className="w-5 h-5" />
              Apply for this Position
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:bg-white/20 flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Learn About Company
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
