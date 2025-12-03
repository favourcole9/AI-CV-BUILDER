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

interface TemplateModernProps {
  sectionsData: SectionData[]
}

export function TemplateModern({ sectionsData }: TemplateModernProps) {
  console.log("[v0] TemplateModern rendering with data:", sectionsData)

  const getFieldValue = (field: Field): string => {
    if (Array.isArray(field.value)) {
      return field.value.length > 0 ? field.value.join(", ") : "Not specified"
    }
    return field.value || "Not specified"
  }

  const contactSection = sectionsData.find((s) => s.id === "contact")
  const otherSections = sectionsData.filter((s) => s.id !== "contact")

  return (
    <div className="space-y-6">
      {/* Header - Two Column Layout */}
      {contactSection && (
        <div className="border-b-2 border-gray-800 pb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {contactSection.fields.find((f) => f.id === "name")?.value || "Your Name"}
              </h1>
            </div>
            <div className="text-right space-y-1 text-sm text-gray-700">
              {contactSection.fields
                .filter((f) => f.id !== "name")
                .map((field) => (
                  <div key={field.id}>
                    <span className="font-medium">{field.label}:</span> {field.value || "Not specified"}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Other Sections */}
      {otherSections.map((section) => (
        <div key={section.id} className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">{section.title}</h2>

          {section.fields.length === 0 ? (
            <p className="text-sm text-gray-400 italic">No content added yet</p>
          ) : (
            <div className="space-y-3">
              {section.fields.map((field) => (
                <div key={field.id} className="space-y-1">
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-gray-700 min-w-[120px]">{field.label}:</span>
                    <div className="flex-1">
                      {field.type === "tags" && Array.isArray(field.value) ? (
                        <div className="flex flex-wrap gap-1">
                          {field.value.length > 0 ? (
                            field.value.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-block px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded"
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500 italic">Not specified</span>
                          )}
                        </div>
                      ) : field.type === "textarea" ? (
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{field.value || "Not specified"}</p>
                      ) : (
                        <span className="text-sm text-gray-700">{field.value || "Not specified"}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
