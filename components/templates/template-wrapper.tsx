import { TemplateModern } from "./template-modern"
import { TemplateProfessional } from "./template-professional"
import { TemplateMinimal } from "./template-minimal"
import type { CVData, CVColors } from "@/app/builder/page"

interface Field {
  id: string
  label: string
  type: "text" | "textarea" | "date" | "tags"
  value: string | string[]
}

interface SectionData {
  id: string
  title: string
  fields: Field[]
}

interface TemplateWrapperProps {
  cvData: CVData
  activeTemplate: string
  colors: CVColors // Added colors prop
}

export function TemplateWrapper({ cvData, activeTemplate, colors }: TemplateWrapperProps) {
  const renderTemplate = () => {
    switch (activeTemplate) {
      case "modern":
        return <TemplateModern cvData={cvData} colors={colors} />
      case "professional":
        return <TemplateProfessional cvData={cvData} colors={colors} />
      case "minimal":
        return <TemplateMinimal cvData={cvData} colors={colors} />
      default:
        return <TemplateModern cvData={cvData} colors={colors} />
    }
  }

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white shadow-lg p-10 rounded-lg mx-auto my-8">{renderTemplate()}</div>
  )
}
