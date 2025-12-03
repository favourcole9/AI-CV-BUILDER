interface Field {
  id: string
  label: string
  value: string | string[]
  type: "text" | "textarea" | "date" | "tags"
}

interface Section {
  id: string
  title: string
  fields: Field[]
}

interface CVPreviewProps {
  sections: Section[]
}

export default function CVPreview({ sections }: CVPreviewProps) {
  const renderFieldValue = (field: Field) => {
    const isEmpty = Array.isArray(field.value) ? field.value.length === 0 : !field.value

    if (isEmpty) {
      return <p className="text-gray-300 italic text-sm">Add your {field.label.toLowerCase()}...</p>
    }

    if (field.type === "tags") {
      const tags = Array.isArray(field.value) ? field.value : []
      return (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
              {tag}
            </span>
          ))}
        </div>
      )
    }

    // For textarea, preserve line breaks
    if (field.type === "textarea") {
      return <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{field.value as string}</p>
    }

    // For text and date
    return <p className="text-gray-700">{field.value as string}</p>
  }

  return (
    <div className="flex justify-center py-8 px-4">
      <div
        className="w-[210mm] min-h-[297mm] bg-white border border-gray-300 shadow-sm"
        style={{ padding: "32px", fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        {sections.map((section) => (
          <div key={section.id} className="mb-6 last:mb-0">
            <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">{section.title}</h2>

            <div className="space-y-3">
              {section.fields.map((field) => (
                <div key={field.id}>
                  <p className="text-sm font-semibold text-gray-600 mb-1">{field.label}</p>
                  {renderFieldValue(field)}
                </div>
              ))}

              {section.fields.length === 0 && <p className="text-gray-300 italic text-sm">No fields added yet</p>}
            </div>
          </div>
        ))}

        {sections.length === 0 && (
          <div className="text-center text-gray-300 italic py-12">No sections added yet. Start building your CV!</div>
        )}
      </div>
    </div>
  )
}
