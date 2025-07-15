import React from "react";
import TemplateSelector from "./components/TemplateSelector";
import CVBuilder from "./components/CVBuilder";
import { FileText, Sparkles } from "lucide-react";

interface CVData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
    summary: string;
    profileImage: string;
    title: string;
  };
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }>;
  skills: string[];
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
  languages: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }>;
  awards: Array<{
    title: string;
    issuer: string;
    date: string;
  }>;
  volunteerWork: Array<{
    organization: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  publications: Array<{
    title: string;
    publisher: string;
    date: string;
    url?: string;
  }>;
  customSections: Array<{
    title: string;
    content: string[];
  }>;
}

interface State {
  currentStep: "templates" | "builder" | "preview";
  selectedTemplate: string | null;
  cvData: CVData;
  isLoading: boolean;
  error: string | null;
}

interface Props {}

class CVGeneration extends React.Component<Props, State> {
  private timer: NodeJS.Timeout | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      currentStep: "templates",
      selectedTemplate: null,
      cvData: this.loadFromLocalStorage() || {
        personalInfo: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          location: "",
          linkedin: "",
          website: "",
          summary: "",
          profileImage: "",
          title: "",
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
        customSections: [],
      },
      isLoading: true,
      error: null,
    };

    this.handleTemplateSelect = this.handleTemplateSelect.bind(this);
    this.handleStartBuilding = this.handleStartBuilding.bind(this);
    this.handleBackToTemplates = this.handleBackToTemplates.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ isLoading: false });
      this.trackEvent("app_initialized");
    }, 1000);
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error: error.message });
    this.trackEvent("error_occurred", { error: error.message });
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  private loadFromLocalStorage(): CVData | null {
    try {
      const savedData = localStorage.getItem("cvData");
      return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return null;
    }
  }

  private saveToLocalStorage(data: CVData) {
    try {
      localStorage.setItem("cvData", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  private trackEvent(eventName: string, data: any = {}) {
    // Placeholder for analytics tracking
    console.log(`Tracking event: ${eventName}`, data);
  }

  handleTemplateSelect(template: string) {
    this.setState({ selectedTemplate: template });
    this.trackEvent("template_selected", { template });
  }

  handleStartBuilding() {
    if (!this.state.selectedTemplate) {
      this.setState({ error: "Please select a template first" });
      return;
    }
    this.setState({ currentStep: "builder", error: null });
    this.trackEvent("start_building");
  }

  handleBackToTemplates() {
    this.setState({ currentStep: "templates", selectedTemplate: null });
    this.trackEvent("back_to_templates");
  }

  handleDataChange(data: CVData) {
    this.setState({ cvData: data });
    this.saveToLocalStorage(data);
    this.trackEvent("data_updated");
  }

  handleReset() {
    const resetData: CVData = {
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: "",
        summary: "",
        profileImage: "",
        title: "",
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
      customSections: [],
    };
    this.setState({ cvData: resetData, currentStep: "templates", selectedTemplate: null });
    this.saveToLocalStorage(resetData);
    this.trackEvent("cv_reset");
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-gray-600 mb-4">{this.state.error}</p>
            <button
              onClick={this.handleReset}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Reset and Try Again
            </button>
          </div>
        </div>
      );
    }

    if (this.state.isLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#02325a] rounded-xl flex items-center justify-center mb-4 mx-auto animate-pulse">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to CV Builder
            </h1>
            <p className="text-gray-600">
              Loading your professional CV builder...
            </p>
            <div className="mt-4 w-48 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#02325a] to-purple-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.currentStep === "templates") {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <TemplateSelector
            selectedTemplate={this.state.selectedTemplate}
            onTemplateSelect={this.handleTemplateSelect}
            onNext={this.handleStartBuilding}
          />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <CVBuilder
          template={this.state.selectedTemplate}
          onBack={this.handleBackToTemplates}
          cvData={this.state.cvData}
          onDataChange={this.handleDataChange}
          onReset={this.handleReset}
        />
      </div>
    );
  }
}

export default CVGeneration;
