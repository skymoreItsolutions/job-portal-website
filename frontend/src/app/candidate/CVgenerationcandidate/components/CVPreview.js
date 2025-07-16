import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar, Star, Award, Code, Languages, ExternalLink, Github } from 'lucide-react';

const CVPreview = ({ data, template }) => {
  const renderSkillLevel = (level) => {
    const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    const currentLevel = levels.indexOf(level) + 1;
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4].map(i => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i <= currentLevel ? 'fill-current text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getLanguageLevel = (level) => {
    const levels = { 'Native': 4, 'Fluent': 3, 'Conversational': 2, 'Basic': 1 };
    return levels[level] || 1;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: template.colors.primary }}
          />
          Live Preview
        </h3>
        <p className="text-sm text-gray-600">Your CV updates in real-time</p>
      </div>

      <div className="p-6 max-h-[800px] overflow-y-auto">
        <div 
          className="cv-content space-y-6"
          style={{
            fontFamily: template.fonts.body,
            color: template.colors.text
          }}
        >
          {/* Header */}
          <div className={`pb-6 mb-6 border-b border-gray-200 ${
            template.layout.headerStyle === 'centered' ? 'text-center' :
            template.layout.headerStyle === 'split' ? 'flex justify-between items-start' : 'text-left'
          }`}>
            <div className={template.layout.headerStyle === 'split' ? 'flex-1' : ''}>
              <h1 
                className="text-3xl font-bold mb-2"
                style={{ 
                  fontFamily: template.fonts.heading,
                  color: template.colors.primary 
                }}
              >
                {data.personalInfo.firstName} {data.personalInfo.lastName}
              </h1>
              
              {data.personalInfo.title && (
                <p className="text-lg font-medium text-gray-700 mb-3">{data.personalInfo.title}</p>
              )}
              
              {template.layout.headerStyle !== 'split' && (
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  {data.personalInfo.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {data.personalInfo.email}
                    </div>
                  )}
                  {data.personalInfo.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {data.personalInfo.phone}
                    </div>
                  )}
                  {data.personalInfo.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {data.personalInfo.location}
                    </div>
                  )}
                </div>
              )}

              {template.layout.headerStyle !== 'split' && (
                <div className="flex flex-wrap gap-4 text-sm">
                  {data.personalInfo.website && (
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      <a href={data.personalInfo.website} className="text-[#02325a] hover:underline">
                        Website
                      </a>
                    </div>
                  )}
                  {data.personalInfo.linkedin && (
                    <div className="flex items-center gap-1">
                      <Linkedin className="w-4 h-4" />
                      <a href={data.personalInfo.linkedin} className="text-[#02325a] hover:underline">
                        LinkedIn
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {template.layout.headerStyle === 'split' && (
              <div className="text-right text-sm text-gray-600 space-y-1">
                {data.personalInfo.email && (
                  <div className="flex items-center gap-1 justify-end">
                    <Mail className="w-4 h-4" />
                    {data.personalInfo.email}
                  </div>
                )}
                {data.personalInfo.phone && (
                  <div className="flex items-center gap-1 justify-end">
                    <Phone className="w-4 h-4" />
                    {data.personalInfo.phone}
                  </div>
                )}
                {data.personalInfo.location && (
                  <div className="flex items-center gap-1 justify-end">
                    <MapPin className="w-4 h-4" />
                    {data.personalInfo.location}
                  </div>
                )}
                {data.personalInfo.website && (
                  <div className="flex items-center gap-1 justify-end">
                    <Globe className="w-4 h-4" />
                    <a href={data.personalInfo.website} className="text-[#02325a] hover:underline">
                      Website
                    </a>
                  </div>
                )}
                {data.personalInfo.linkedin && (
                  <div className="flex items-center gap-1 justify-end">
                    <Linkedin className="w-4 h-4" />
                    <a href={data.personalInfo.linkedin} className="text-[#02325a] hover:underline">
                      LinkedIn
                    </a>
                  </div>
                )}
              </div>
            )}

            {data.personalInfo.summary && (
              <div className="mt-4">
                <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className={`grid gap-6 ${
            template.layout.columns === 2 ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'
          }`}>
            {/* Primary Column */}
            <div className={`space-y-6 ${template.layout.columns === 2 ? 'lg:col-span-2' : ''}`}>
              {/* Experience */}
              {data.experience.length > 0 && (
                <div>
                  <h2 
                    className="text-xl font-semibold mb-4 pb-2 border-b"
                    style={{ 
                      fontFamily: template.fonts.heading,
                      color: template.colors.primary,
                      borderColor: template.colors.primary + '20'
                    }}
                  >
                    Experience
                  </h2>
                  <div className="space-y-4">
                    {data.experience.map((exp, index) => (
                      <div key={index} className="relative pl-4 border-l-2" style={{ borderColor: template.colors.accent + '40' }}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                            <p className="text-gray-700 font-medium">{exp.company}</p>
                            {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                          </div>
                          <div className="text-right text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                            </div>
                          </div>
                        </div>
                        {exp.description && (
                          <p className="text-gray-700 text-sm mb-2">{exp.description}</p>
                        )}
                        {exp.achievements.length > 0 && exp.achievements[0] && (
                          <ul className="text-sm text-gray-700 space-y-1">
                            {exp.achievements.filter(a => a.trim()).map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-gray-400 mt-1">•</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        )}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {exp.technologies.map((tech, i) => (
                              <span 
                                key={i} 
                                className="px-2 py-1 text-xs rounded-full"
                                style={{ 
                                  backgroundColor: template.colors.accent + '20',
                                  color: template.colors.accent
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {data.projects.length > 0 && (
                <div>
                  <h2 
                    className="text-xl font-semibold mb-4 pb-2 border-b"
                    style={{ 
                      fontFamily: template.fonts.heading,
                      color: template.colors.primary,
                      borderColor: template.colors.primary + '20'
                    }}
                  >
                    Projects
                  </h2>
                  <div className="space-y-4">
                    {data.projects.map((project, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                              {project.name}
                              {project.url && (
                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-[#02325a]">
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                              {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600">
                                  <Github className="w-4 h-4" />
                                </a>
                              )}
                            </h3>
                            {project.role && <p className="text-gray-600 text-sm">{project.role}</p>}
                          </div>
                          {(project.startDate || project.endDate) && (
                            <div className="text-right text-sm text-gray-600">
                              {formatDate(project.startDate)} - {formatDate(project.endDate)}
                            </div>
                          )}
                        </div>
                        <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                        {project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {project.technologies.map((tech, i) => (
                              <span 
                                key={i} 
                                className="px-2 py-1 text-xs rounded-full flex items-center gap-1"
                                style={{ 
                                  backgroundColor: template.colors.secondary + '20',
                                  color: template.colors.secondary
                                }}
                              >
                                <Code className="w-3 h-3" />
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        {project.achievements && project.achievements.length > 0 && project.achievements[0] && (
                          <ul className="text-sm text-gray-700 space-y-1">
                            {project.achievements.filter(a => a.trim()).map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Star className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Secondary Column */}
            <div className={`space-y-6 ${template.layout.columns === 2 ? 'lg:col-span-1' : ''}`}>
              {/* Education */}
              {data.education.length > 0 && (
                <div>
                  <h2 
                    className="text-xl font-semibold mb-4 pb-2 border-b"
                    style={{ 
                      fontFamily: template.fonts.heading,
                      color: template.colors.primary,
                      borderColor: template.colors.primary + '20'
                    }}
                  >
                    Education
                  </h2>
                  <div className="space-y-4">
                    {data.education.map((edu, index) => (
                      <div key={index} className="relative pl-4 border-l-2" style={{ borderColor: template.colors.accent + '40' }}>
                        <div className="mb-2">
                          <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                          <p className="text-gray-700">{edu.fieldOfStudy}</p>
                          <p className="text-gray-600 text-sm">{edu.institution}</p>
                          <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                          </div>
                          {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                        </div>
                        {edu.achievements.length > 0 && edu.achievements[0] && (
                          <ul className="text-sm text-gray-700 space-y-1">
                            {edu.achievements.filter(a => a.trim()).map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-gray-400 mt-1">•</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {data.skills.length > 0 && (
                <div>
                  <h2 
                    className="text-xl font-semibold mb-4 pb-2 border-b"
                    style={{ 
                      fontFamily: template.fonts.heading,
                      color: template.colors.primary,
                      borderColor: template.colors.primary + '20'
                    }}
                  >
                    Skills
                  </h2>
                  <div className="space-y-4">
                    {Object.entries(data.skills.reduce((acc, skill) => {
                      if (!acc[skill.category]) acc[skill.category] = [];
                      acc[skill.category].push(skill);
                      return acc;
                    }, {})).map(([category, skills]) => (
                      <div key={category}>
                        <h3 className="font-medium text-gray-800 mb-2">{category}</h3>
                        <div className="space-y-2">
                          {skills.map((skill, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-gray-700 text-sm">{skill.name}</span>
                              {renderSkillLevel(skill.level)}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {data.languages.length > 0 && (
                <div>
                  <h2 
                    className="text-xl font-semibold mb-4 pb-2 border-b"
                    style={{ 
                      fontFamily: template.fonts.heading,
                      color: template.colors.primary,
                      borderColor: template.colors.primary + '20'
                    }}
                  >
                    Languages
                  </h2>
                  <div className="space-y-3">
                    {data.languages.map((language, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Languages className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-700">{language.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4].map(i => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i <= getLanguageLevel(language.level) 
                                  ? 'bg-blue-500' 
                                  : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {data.certifications.length > 0 && (
                <div>
                  <h2 
                    className="text-xl font-semibold mb-4 pb-2 border-b"
                    style={{ 
                      fontFamily: template.fonts.heading,
                      color: template.colors.primary,
                      borderColor: template.colors.primary + '20'
                    }}
                  >
                    Certifications
                  </h2>
                  <div className="space-y-3">
                    {data.certifications.map((cert, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Award className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm">{cert.name}</h3>
                          <p className="text-gray-600 text-sm">{cert.issuer}</p>
                          <p className="text-gray-500 text-xs">{formatDate(cert.date)}</p>
                          {cert.credentialId && (
                            <p className="text-gray-500 text-xs">ID: {cert.credentialId}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPreview;