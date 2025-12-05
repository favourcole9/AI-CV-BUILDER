"use client"

interface TemplateSelectorProps {
  activeTemplate: string
  onTemplateChange: (template: string) => void
}

const templates = [
  { id: "modern", name: "Modern", description: "Clean two-column header with structured sections" },
  { id: "professional", name: "Professional", description: "Classic layout with sidebar and main content" },
  { id: "minimal", name: "Minimal", description: "Simple and elegant with maximum whitespace" },
  { id: "traditional", name: "Traditional", description: "Classic centered format for conservative industries" },
  { id: "chronological", name: "Chronological", description: "Timeline-based emphasizing work history" },
  { id: "functional", name: "Functional", description: "Skills-focused with compact experience" },
  { id: "combination", name: "Combination", description: "Hybrid of chronological and functional styles" },
]

export function TemplateSelector({ activeTemplate, onTemplateChange }: TemplateSelectorProps) {
  return (
    <div className="mb-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Select Template:</span>
        <span className="text-xs text-gray-500">({templates.length} available)</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            className={`p-3 rounded-lg border-2 cursor-pointer text-left transition-all hover:shadow-md ${
              activeTemplate === template.id
                ? "border-indigo-500 bg-indigo-50 shadow-md"
                : "border-gray-200 bg-white hover:border-indigo-300"
            }`}
          >
            <div
              className="font-semibold text-sm mb-1"
              style={{ color: activeTemplate === template.id ? "#4f46e5" : "#374151" }}
            >
              {template.name}
            </div>
            <div className="text-xs text-gray-600 line-clamp-2">{template.description}</div>
            {activeTemplate === template.id && <div className="mt-2 text-xs font-medium text-indigo-600">✓ Active</div>}
          </button>
        ))}
      </div>
    </div>
  )
}
