"use client"

interface TemplateSelectorProps {
  activeTemplate: string
  onTemplateChange: (template: string) => void
}

const templates = [
  { id: "modern", name: "Modern" },
  { id: "professional", name: "Professional" },
  { id: "minimal", name: "Minimal" },
]

export function TemplateSelector({ activeTemplate, onTemplateChange }: TemplateSelectorProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-sm font-medium text-gray-700">Template:</span>
      <div className="flex gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            className={`px-4 py-2 rounded-lg border cursor-pointer text-sm font-medium transition-all ${
              activeTemplate === template.id
                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  )
}
