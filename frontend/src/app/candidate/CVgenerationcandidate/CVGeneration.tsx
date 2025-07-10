import React from 'react';
import TemplateSelector from './components/TemplateSelector.tsx';
import CVBuilder from './components/CVBuilder.tsx';
import { FileText, Sparkles, Zap, Users, Award, Globe } from 'lucide-react';

const initialCVData = {
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

class CVGeneration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 'templates',
      selectedTemplate: null,
      cvData: initialCVData,
      isLoading: true
    };

    // Bind methods to ensure correct 'this' context
    this.handleTemplateSelect = this.handleTemplateSelect.bind(this);
    this.handleStartBuilding = this.handleStartBuilding.bind(this);
    this.handleBackToTemplates = this.handleBackToTemplates.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
  }

  componentDidMount() {
    // Simulate app initialization
    this.timer = setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  }

  componentWillUnmount() {
    // Clear timer to prevent memory leaks
    clearTimeout(this.timer);
  }

  handleTemplateSelect(template) {
    this.setState({ selectedTemplate: template });
  }

  handleStartBuilding() {
    this.setState({ currentStep: 'builder' });
  }

  handleBackToTemplates() {
    this.setState({ currentStep: 'templates', selectedTemplate: null });
  }

  handleDataChange(data) {
    this.setState({ cvData: data });
  }

  render() {
    if (this.state.isLoading) {
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

    if (this.state.currentStep === 'templates') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          
          {/* <div className="bg-white shadow-sm border-b">
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
          </div> */}

          
          {/* <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
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
          </div> */}

          <TemplateSelector
            selectedTemplate={this.state.selectedTemplate}
            onTemplateSelect={this.handleTemplateSelect}
            onNext={this.handleStartBuilding}
          />
        </div>
      );
    }

    return (
      <CVBuilder
        template={this.state.selectedTemplate}
        onBack={this.handleBackToTemplates}
        cvData={this.state.cvData}
        onDataChange={this.handleDataChange}
      />
    );
  }
}

export default CVGeneration;