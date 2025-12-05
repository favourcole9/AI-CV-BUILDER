"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import { SectionEditor } from "@/components/section-editor"
import { TemplateWrapper } from "@/components/templates/template-wrapper"
import { TemplateSelector } from "@/components/template-selector"
import { Button } from "@/components/ui/button"
import { OnboardingOverlay } from "@/components/OnboardingOverlay"
import { useOnboarding } from "@/hooks/useOnboarding"
import Chatbot from "@/components/chatbot"

export interface CVData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    address: string
    summary: string
  }
  experience: Array<{
    jobTitle: string
    company: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    school: string
    degree: string
    field: string
    startDate: string
    endDate: string
  }>
  skills: string[]
  certifications: Array<{
    name: string
    issuer: string
    date: string
  }>
  projects: Array<{
    name: string
    description: string
    technologies: string[]
  }>
  links: {
    portfolio: string
    github: string
    linkedin: string
  }
}

export interface CVColors {
  primary: string
  secondary: string
  accent: string
}

const ChevronUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
)

const Save = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
    />
  </svg>
)

const Palette = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
    />
  </svg>
)

const RotateCcw = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
  </svg>
)

const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

export default function BuilderPage() {
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
    },
    experience: [
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        school: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [],
    certifications: [
      {
        name: "",
        issuer: "",
        date: "",
      },
    ],
    projects: [
      {
        name: "",
        description: "",
        technologies: [],
      },
    ],
    links: {
      portfolio: "",
      github: "",
      linkedin: "",
    },
  })

  const [selectedSection, setSelectedSection] = useState<string>("personalInfo")
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [activeTemplate, setActiveTemplate] = useState<string>("modern")

  const [cvColors, setCvColors] = useState<CVColors>({
    primary: "#1f2937", // gray-800
    secondary: "#f9fafb", // gray-50
    accent: "#4f46e5", // indigo-600
  })

  const [showDesignPanel, setShowDesignPanel] = useState(false)
  const [designSaved, setDesignSaved] = useState(false)

  const { isOnboardingOpen, closeOnboarding } = useOnboarding()

  useEffect(() => {
    const savedColors = localStorage.getItem("cvBuilderColors")
    const savedTemplate = localStorage.getItem("cvBuilderTemplate")

    if (savedColors) {
      try {
        setCvColors(JSON.parse(savedColors))
      } catch (e) {
        console.error("Failed to load saved colors")
      }
    }

    if (savedTemplate) {
      setActiveTemplate(savedTemplate)
    }
  }, [])

  const sections = [
    { id: "personalInfo", title: "Personal Info" },
    { id: "experience", title: "Experience" },
    { id: "education", title: "Education" },
    { id: "skills", title: "Skills" },
    { id: "certifications", title: "Certifications" },
    { id: "projects", title: "Projects" },
    { id: "links", title: "Links" },
  ]

  const saveDesign = () => {
    localStorage.setItem("cvBuilderColors", JSON.stringify(cvColors))
    localStorage.setItem("cvBuilderTemplate", activeTemplate)
    setDesignSaved(true)
    setTimeout(() => setDesignSaved(false), 2000)
  }

  const resetDesign = () => {
    const defaultColors = {
      primary: "#0F172A",
      secondary: "#F8FAFC",
      accent: "#6366F1",
    }
    setCvColors(defaultColors)
    setActiveTemplate("modern")
    localStorage.removeItem("cvBuilderColors")
    localStorage.removeItem("cvBuilderTemplate")
  }

  const resetColors = () => {
    setCvColors({
      primary: "#1f2937",
      secondary: "#f9fafb",
      accent: "#4f46e5",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <OnboardingOverlay isOpen={isOnboardingOpen} onClose={closeOnboarding} />

      <Navbar />

      <div className="fixed top-16 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">CV Builder</h1>
          <div id="topbar-actions" className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Save className="w-4 h-4" />
              Save Draft
            </Button>
            <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">Download PDF</Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[400px_1fr] xl:grid-cols-[450px_1fr] h-[calc(100vh-121px)] mt-[121px]">
        <div id="sidebar" className="bg-white/60 backdrop-blur-sm border-r border-gray-200 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                    selectedSection === section.id
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white/50 text-gray-700 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>

            <div id="editor" className="pt-4 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {sections.find((s) => s.id === selectedSection)?.title}
              </h2>
              <SectionEditor cvData={cvData} setCvData={setCvData} selectedSection={selectedSection} />
            </div>
          </div>
        </div>

        <div id="preview" className="hidden lg:block overflow-y-auto bg-gray-100">
          <div className="p-6">
            <div className="mb-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
              <button
                onClick={() => setShowDesignPanel(!showDesignPanel)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 mb-3"
              >
                <Palette className="w-4 h-4" />
                Design Settings
                <ChevronUp className={`w-4 h-4 transition-transform ${showDesignPanel ? "" : "rotate-180"}`} />
              </button>

              {showDesignPanel && (
                <div className="space-y-3 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Primary Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={cvColors.primary}
                          onChange={(e) => setCvColors({ ...cvColors, primary: e.target.value })}
                          className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={cvColors.primary}
                          onChange={(e) => setCvColors({ ...cvColors, primary: e.target.value })}
                          className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Secondary Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={cvColors.secondary}
                          onChange={(e) => setCvColors({ ...cvColors, secondary: e.target.value })}
                          className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={cvColors.secondary}
                          onChange={(e) => setCvColors({ ...cvColors, secondary: e.target.value })}
                          className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Accent Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={cvColors.accent}
                          onChange={(e) => setCvColors({ ...cvColors, accent: e.target.value })}
                          className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={cvColors.accent}
                          onChange={(e) => setCvColors({ ...cvColors, accent: e.target.value })}
                          className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={saveDesign}
                      className={`flex-1 gap-2 text-xs transition-all ${
                        designSaved ? "bg-green-600 hover:bg-green-700" : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                      size="sm"
                    >
                      {designSaved ? (
                        <>
                          <Check className="w-3 h-3" />
                          Saved!
                        </>
                      ) : (
                        <>
                          <Save className="w-3 h-3" />
                          Save Design
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={resetDesign}
                      variant="outline"
                      className="flex-1 gap-2 text-xs bg-transparent hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                      size="sm"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Design
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div id="template-selector">
              <TemplateSelector activeTemplate={activeTemplate} onTemplateChange={setActiveTemplate} />
            </div>
            <TemplateWrapper cvData={cvData} activeTemplate={activeTemplate} colors={cvColors} />
          </div>
        </div>
      </div>

      {/* Mobile preview panel */}
      <div className="lg:hidden">
        <Button
          onClick={() => setIsPreviewOpen(!isPreviewOpen)}
          className="fixed bottom-4 right-4 rounded-full shadow-lg w-14 h-14 bg-indigo-600 hover:bg-indigo-700 z-50"
          size="icon"
        >
          <ChevronUp className={`w-6 h-6 transition-transform ${isPreviewOpen ? "rotate-180" : ""}`} />
        </Button>

        {isPreviewOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsPreviewOpen(false)}>
            <div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-3xl">
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-gray-900 text-center">CV Preview</h3>
              </div>
              <div className="p-4">
                <TemplateSelector activeTemplate={activeTemplate} onTemplateChange={setActiveTemplate} />
                <TemplateWrapper cvData={cvData} activeTemplate={activeTemplate} colors={cvColors} />
              </div>
            </div>
          </div>
        )}
      </div>

      <Chatbot />
    </div>
  )
}
