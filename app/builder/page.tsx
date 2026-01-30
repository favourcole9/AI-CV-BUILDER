"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import Navbar from "@/components/navbar"
import { SectionEditor } from "@/components/section-editor"
import { TemplateWrapper } from "@/components/templates/template-wrapper"
import { TemplateSelector } from "@/components/template-selector"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useOnboarding } from "@/hooks/useOnboarding"
import Chatbot from "@/components/chatbot"
import OnboardingOverlay from "@/components/onboarding-overlay"

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
      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4m0 0h-4m4 0l-5 5M4 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
    />
  </svg>
)

const Palette = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v9a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
    />
  </svg>
)

const RotateCcw = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6m4 4V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5m5 5v-4m0 4h-4"
    />
  </svg>
)

const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5m5 5v-4m0 4h-4"
    />
  </svg>
)

const Download = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5m5 5v-4m0 4h-4"
    />
  </svg>
)

const Maximize = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5m5 5v-4m0 4h-4"
    />
  </svg>
)

export default function BuilderPage() {
  const searchParams = useSearchParams()
  const { isAuthenticated, saveCV, loadCV } = useAuth()

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
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const [cvColors, setCvColors] = useState<CVColors>({
    primary: "#1f2937",
    secondary: "#f9fafb",
    accent: "#4f46e5",
  })

  const [showDesignPanel, setShowDesignPanel] = useState(false)
  const [designSaved, setDesignSaved] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [cvName, setCvName] = useState("")

  const { isOnboardingOpen, closeOnboarding } = useOnboarding()

  const previewRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    const savedCVData = localStorage.getItem("cvBuilderData")
    const savedColors = localStorage.getItem("cvBuilderColors")
    const savedTemplate = localStorage.getItem("cvBuilderTemplate")

    if (savedCVData) {
      try {
        setCvData(JSON.parse(savedCVData))
      } catch (e) {
        console.error("Failed to load saved CV data")
      }
    }

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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("cvBuilderData", JSON.stringify(cvData))
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [cvData])

  useEffect(() => {
    const loadId = searchParams?.get("load")
    if (loadId && isAuthenticated) {
      const savedCV = loadCV(loadId)
      if (savedCV) {
        setCvData(savedCV.cvData)
        setCvColors(savedCV.colors)
        setActiveTemplate(savedCV.template)
      }
    }
  }, [searchParams, isAuthenticated, loadCV])

  const sections = [
    { id: "personalInfo", title: "Personal Info" },
    { id: "experience", title: "Experience" },
    { id: "education", title: "Education" },
    { id: "skills", title: "Skills" },
    { id: "certifications", title: "Certifications" },
    { id: "projects", title: "Projects" },
    { id: "links", title: "Links" },
  ]

  const saveProgress = () => {
    if (isAuthenticated) {
      setShowSaveDialog(true)
    } else {
      localStorage.setItem("cvBuilderData", JSON.stringify(cvData))
      localStorage.setItem("cvBuilderColors", JSON.stringify(cvColors))
      localStorage.setItem("cvBuilderTemplate", activeTemplate)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    }
  }

  const handleSaveCV = () => {
    if (cvName.trim() && isAuthenticated) {
      saveCV(cvName, cvData, cvColors, activeTemplate)
      setShowSaveDialog(false)
      setCvName("")
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    }
  }

  const downloadPDF = async () => {
    if (!previewRef.current) return

    setIsDownloading(true)

    try {
      // Dynamically import html2pdf.js
      const html2pdf = (await import("html2pdf.js")).default

      // Clone the element to avoid modifying the original
      const element = previewRef.current.cloneNode(true) as HTMLElement

      // Convert all oklch colors to hex format for PDF compatibility
      const convertOklchToHex = (element: HTMLElement) => {
        const allElements = element.querySelectorAll("*")

        allElements.forEach((el) => {
          const htmlEl = el as HTMLElement
          const computedStyle = window.getComputedStyle(htmlEl)

          // Convert background color
          const bgColor = computedStyle.backgroundColor
          if (bgColor && bgColor !== "rgba(0, 0, 0, 0)") {
            htmlEl.style.backgroundColor = bgColor
          }

          // Convert text color
          const textColor = computedStyle.color
          if (textColor) {
            htmlEl.style.color = textColor
          }

          // Convert border colors
          const borderColor = computedStyle.borderColor
          if (borderColor && borderColor !== "rgba(0, 0, 0, 0)") {
            htmlEl.style.borderColor = borderColor
          }
        })

        // Set inline styles for the container
        element.style.backgroundColor = "#ffffff"
        element.style.width = "210mm"
        element.style.minHeight = "297mm"
        element.style.padding = "40px"
      }

      convertOklchToHex(element)

      const opt = {
        margin: 0,
        filename: "my_cv.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
          scrollX: 0,
          backgroundColor: "#ffffff",
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      }

      await html2pdf().set(opt).from(element).save()
    } catch (error) {
      console.error("PDF download failed:", error)
      alert("Failed to download PDF. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <OnboardingOverlay isOpen={isOnboardingOpen} onClose={closeOnboarding} />

      <Navbar />

      <div className="fixed top-16 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm print:hidden">
        <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 flex items-center justify-between">
          <h1 className="text-base sm:text-lg font-semibold text-gray-900">CV Builder</h1>
          <div id="topbar-actions" className="flex items-center gap-2 sm:gap-3">
            <Button
              onClick={saveProgress}
              variant="outline"
              className={`gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-10 transition-all ${
                isSaved ? "bg-green-50 border-green-500 text-green-700" : "bg-transparent"
              }`}
            >
              <Save className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{isSaved ? "Saved!" : "Save Progress"}</span>
              <span className="sm:hidden">{isSaved ? "Saved!" : "Save"}</span>
            </Button>
            <Button
              onClick={downloadPDF}
              className="gap-1 sm:gap-2 bg-indigo-600 hover:bg-indigo-700 text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-10"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Export PDF</span>
              <span className="sm:hidden">PDF</span>
            </Button>
            <Button
              onClick={() => setIsFullscreen(!isFullscreen)}
              variant="outline"
              className="hidden lg:flex gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-10"
            >
              <Maximize className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 print:hidden">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
              <h3 className="text-lg font-semibold">CV Preview</h3>
              <Button onClick={() => setIsFullscreen(false)} variant="outline" size="sm">
                Close
              </Button>
            </div>
            <div className="p-6">
              <TemplateWrapper cvData={cvData} activeTemplate={activeTemplate} colors={cvColors} />
            </div>
          </div>
        </div>
      )}

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save CV</DialogTitle>
            <DialogDescription>Give your CV a name to save it to your account</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-2 block">CV Name</label>
              <Input
                type="text"
                placeholder="e.g., Software Engineer Resume 2024"
                value={cvName}
                onChange={(e) => setCvName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveCV()}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSaveCV}
                disabled={!cvName.trim()}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
              >
                Save
              </Button>
              <Button onClick={() => setShowSaveDialog(false)} variant="outline" className="flex-1 bg-transparent">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col lg:grid lg:grid-cols-[400px_1fr] xl:grid-cols-[450px_1fr] min-h-[calc(100vh-121px)] mt-[121px]">
        <div
          id="sidebar"
          className="bg-white/60 backdrop-blur-sm border-r border-gray-200 overflow-y-auto max-h-[50vh] lg:max-h-none"
        >
          <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
            <div className="space-y-1.5 sm:space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all ${
                    selectedSection === section.id
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white/50 text-gray-700 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>

            <div id="editor" className="pt-3 sm:pt-4 border-t border-gray-200">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                {sections.find((s) => s.id === selectedSection)?.title}
              </h2>
              <SectionEditor cvData={cvData} setCvData={setCvData} selectedSection={selectedSection} />
            </div>
          </div>
        </div>

        <div id="preview" className="hidden lg:block overflow-y-auto bg-gray-100">
          <div className="p-4 md:p-6">
            <div className="mb-6">
              <button
                onClick={downloadPDF}
                disabled={isDownloading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                  text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl 
                  transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                  backdrop-blur-sm border border-white/20
                  flex items-center justify-center gap-3 text-lg
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isDownloading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <DownloadIcon className="w-6 h-6" />
                    <span>Download CV</span>
                  </>
                )}
              </button>
            </div>

            <div className="mb-3 sm:mb-4 bg-white/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-sm">
              <button
                onClick={() => setShowDesignPanel(!showDesignPanel)}
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 mb-2 sm:mb-3"
              >
                <Palette className="w-3 h-3 sm:w-4 sm:h-4" />
                Design Settings
                <ChevronUp
                  className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${showDesignPanel ? "" : "rotate-180"}`}
                />
              </button>

              {showDesignPanel && (
                <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
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
                      className={`flex-1 gap-1 sm:gap-2 text-xs transition-all ${
                        designSaved ? "bg-green-600 hover:bg-green-700" : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                      size="sm"
                    >
                      {designSaved ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span className="hidden sm:inline">Saved!</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-3 h-3" />
                          <span className="hidden sm:inline">Save Design</span>
                          <span className="sm:hidden">Save</span>
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={resetDesign}
                      variant="outline"
                      className="flex-1 gap-1 sm:gap-2 text-xs bg-transparent hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                      size="sm"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span className="hidden sm:inline">Reset Design</span>
                      <span className="sm:hidden">Reset</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div id="template-selector">
              <TemplateSelector activeTemplate={activeTemplate} onTemplateChange={setActiveTemplate} />
            </div>
            <div ref={previewRef}>
              <TemplateWrapper cvData={cvData} activeTemplate={activeTemplate} colors={cvColors} />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <Button
          onClick={() => setIsPreviewOpen(!isPreviewOpen)}
          className="fixed bottom-20 sm:bottom-4 right-4 rounded-full shadow-lg w-14 h-14 sm:w-16 sm:h-16 bg-indigo-600 hover:bg-indigo-700 z-50"
          size="icon"
        >
          <ChevronUp className={`w-6 h-6 transition-transform ${isPreviewOpen ? "rotate-180" : ""}`} />
        </Button>

        {isPreviewOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsPreviewOpen(false)}>
            <div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 rounded-t-3xl z-10">
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-2" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 text-center">CV Preview</h3>
              </div>
              <div className="p-3 sm:p-4">
                <TemplateSelector activeTemplate={activeTemplate} onTemplateChange={setActiveTemplate} />
                <TemplateWrapper cvData={cvData} activeTemplate={activeTemplate} colors={cvColors} />
              </div>
            </div>
          </div>
        )}
      </div>

      <Chatbot cvData={cvData} setCvData={setCvData} selectedSection={selectedSection} />
    </div>
  )
}
