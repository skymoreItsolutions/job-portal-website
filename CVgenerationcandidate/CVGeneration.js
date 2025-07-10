import React, { useState, useEffect } from 'react';
import { CVData, CVTemplate } from './types/cv';
import TemplateSelector from './components/TemplateSelector';
import CVBuilder from './components/CVBuilder';
import { FileText, Sparkles, Zap, Users, Award, Globe } from 'lucide-react';

const initialCVData: CVData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
    profileImage: '',
    title: ''
  },
  experience: [],
  education: [],
  skills: [],
  certifications: [],
  languages: [],
  projects: [],
  awards: [],
  volunteerWork: [],
  publications: [],
  customSections: []
};

function CVGeneration() {
  const [currentStep, setCurrentStep] = useState<'templates' | 'builder'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate | null>(null);
  const [cvData, setCVData] = useState<CVData>(initialCVData);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate app initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleTemplateSelect = (template: CVTemplate) => {
    setSelectedTemplate(template);
  };

  const handleStartBuilding = () => {
    setCurrentStep('builder');
  };

  const handleBackToTemplates = () => {
    setCurrentStep('templates');
    setSelectedTemplate(null);
  };

  const handleDataChange = (data: CVData) => {
    setCVData(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bolt CV Builder</h1>
          <p className="text-gray-600">Loading your professional CV builder...</p>
          <div className="mt-4 w-48 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'templates') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Enhanced Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Bolt CV Builder</h1>
                  <p className="text-gray-600 text-lg">Create professional resumes in minutes with AI-powered assistance</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-blue-600">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium">AI-Powered</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Zap className="w-5 h-5" />
                  <span className="font-medium">Fast & Easy</span>
                </div>
                <div className="flex items-center gap-2 text-purple-600">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">Professional</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-1">20+ Templates</h3>
                <p className="text-blue-100 text-sm">Professional designs for every industry</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-3">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-1">Real-time Preview</h3>
                <p className="text-blue-100 text-sm">See changes instantly as you type</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-1">ATS-Friendly</h3>
                <p className="text-blue-100 text-sm">Optimized for applicant tracking systems</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-3">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-1">Multiple Formats</h3>
                <p className="text-blue-100 text-sm">Export to PDF, Word, and more</p>
              </div>
            </div>
          </div>
        </div>

        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onTemplateSelect={handleTemplateSelect}
          onNext={handleStartBuilding}
        />
      </div>
    );
  }

  return (
    <CVBuilder
      template={selectedTemplate!}
      onBack={handleBackToTemplates}
      cvData={cvData}
      onDataChange={handleDataChange}
    />
  );
}

export default CVGeneration;