"use client"

import { useState } from "react"
import { SectionsManager } from "@/components/sections-manager"
import { SectionEditor } from "@/components/section-editor"
import { TemplateWrapper } from "@/components/templates/template-wrapper"
import { TemplateSelector } from "@/components/template-selector"
import { Button } from "@/components/ui/button"
import { ChevronUp, Save } from "lucide-react"
import { OnboardingOverlay } from "@/components/OnboardingOverlay"
import { useOnboarding } from "@/hooks/useOnboarding"
import type { Section as ManagerSection } from "@/components/sections-manager"

type FieldType = "text" | "textarea" | "date" | "tags"

interface Field {
  id: string
  label: string
  type: FieldType
  value: string | string[]
}

interface SectionData {
  id: string
  title: string
  fields: Field[]
}

const getDefaultFields = (sectionId: string): Field[] => {
  switch (sectionId) {
    case "contact":
      return [
        { id: "name", label: "Full Name", type: "text", value: "" },
        { id: "email", label: "Email", type: "text", value: "" },
        { id: "phone", label: "Phone", type: "text", value: "" },
        { id: "location", label: "Location", type: "text", value: "" },
      ]
    case "summary":
      return [{ id: "summary-text", label: "Professional Summary", type: "textarea", value: "" }]
    case "experience":
      return [
        { id: "job-title", label: "Job Title", type: "text", value: "" },
        { id: "company", label: "Company", type: "text", value: "" },
        { id: "start-date", label: "Start Date", type: "date", value: "" },
        { id: "end-date", label: "End Date", type: "date", value: "" },
        { id: "description", label: "Description", type: "textarea", value: "" },
      ]
    case "education":
      return [
        { id: "degree", label: "Degree", type: "text", value: "" },
        { id: "institution", label: "Institution", type: "text", value: "" },
        { id: "grad-date", label: "Graduation Date", type: "date", value: "" },
      ]
    case "skills":
      return [{ id: "skills-list", label: "Skills", type: "tags", value: [] }]
    case "projects":
      return [
        { id: "project-name", label: "Project Name", type: "text", value: "" },
        { id: "project-description", label: "Description", type: "textarea", value: "" },
        { id: "technologies", label: "Technologies Used", type: "tags", value: [] },
      ]
    case "certifications":
      return [
        { id: "cert-name", label: "Certification Name", type: "text", value: "" },
        { id: "cert-issuer", label: "Issuing Organization", type: "text", value: "" },
        { id: "cert-date", label: "Date Obtained", type: "date", value: "" },
      ]
    default:
      return []
  }
}

export default function BuilderPage() {
  const [cvData, setCvData] = useState<SectionData[]>([
    { id: "contact", title: "Contact Info", fields: getDefaultFields("contact") },
    { id: "summary", title: "Summary", fields: getDefaultFields("summary") },
    { id: "experience", title: "Experience", fields: getDefaultFields("experience") },
    { id: "education", title: "Education", fields: getDefaultFields("education") },
    { id: "skills", title: "Skills", fields: getDefaultFields("skills") },
    { id: "projects", title: "Projects", fields: getDefaultFields("projects") },
    { id: "certifications", title: "Certifications", fields: getDefaultFields("certifications") },
  ])

  const [selectedSectionId, setSelectedSectionId] = useState<string>("contact")
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [activeTemplate, setActiveTemplate] = useState<string>("modern")

  const { isOnboardingOpen, closeOnboarding } = useOnboarding()

  const handleSectionsChange = (managerSections: ManagerSection[]) => {
    setCvData((prevData) => {
      // Keep existing data and reorder/add/remove based on managerSections
      const newData: SectionData[] = managerSections.map((managerSection) => {
        const existingSection = prevData.find((s) => s.id === managerSection.id)
        if (existingSection) {
          return { ...existingSection, title: managerSection.title }
        }
        // New section - initialize with empty fields
        return {
          id: managerSection.id,
          title: managerSection.title,
          fields: getDefaultFields(managerSection.id),
        }
      })
      return newData
    })
  }

  const handleSectionUpdate = (updatedSection: SectionData) => {
    console.log("[v0] Section updated:", updatedSection.id, updatedSection)
    setCvData((prev) => {
      const newData = prev.map((section) => (section.id === updatedSection.id ? updatedSection : section))
      console.log("[v0] New cvData state:", newData)
      return newData
    })
  }

  const selectedSection = cvData.find((s) => s.id === selectedSectionId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <OnboardingOverlay isOpen={isOnboardingOpen} onClose={closeOnboarding} />

      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">CV Builder</h1>
          <div id="topbar-actions" className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Save className="w-4 h-4" />
              Save Draft
            </Button>
            <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">Download PDF</Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[400px_1fr] xl:grid-cols-[450px_1fr] h-[calc(100vh-65px)]">
        <div id="sidebar" className="bg-white/60 backdrop-blur-sm border-r border-gray-200 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              {cvData.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSectionId(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                    selectedSectionId === section.id
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white/50 text-gray-700 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>

            {selectedSection && (
              <div id="editor" className="pt-4 border-t border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{selectedSection.title}</h2>
                <SectionEditor section={selectedSection} onSectionChange={handleSectionUpdate} />
              </div>
            )}

            <div className="pt-6 border-t border-gray-200">
              <SectionsManager
                initialSections={cvData.map((s) => ({
                  id: s.id,
                  title: s.title,
                  isCustom: s.id.startsWith("custom-"),
                }))}
                onSectionsChange={handleSectionsChange}
              />
            </div>
          </div>
        </div>

        <div id="preview" className="hidden lg:block overflow-y-auto bg-gray-100">
          <div className="p-6">
            <div id="template-selector">
              <TemplateSelector activeTemplate={activeTemplate} onTemplateChange={setActiveTemplate} />
            </div>
            <TemplateWrapper sectionsData={cvData} activeTemplate={activeTemplate} />
          </div>
        </div>
      </div>

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
                <TemplateWrapper sectionsData={cvData} activeTemplate={activeTemplate} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
