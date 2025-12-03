import { TemplateModern } from "./template-modern"

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
  sectionsData: SectionData[]
  activeTemplate: string
}

export function TemplateWrapper({ sectionsData, activeTemplate }: TemplateWrapperProps) {
  const renderTemplate = () => {
    switch (activeTemplate) {
      case "modern":
        return <TemplateModern sectionsData={sectionsData} />
      default:
        return <TemplateModern sectionsData={sectionsData} />
    }
  }

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white shadow-lg p-10 rounded-lg mx-auto my-8">{renderTemplate()}</div>
  )
}
