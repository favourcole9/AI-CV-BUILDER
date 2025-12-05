import type { CVData, CVColors } from "@/app/builder/page"

interface TemplateChronologicalProps {
  cvData: CVData
  colors: CVColors
}

export function TemplateChronological({ cvData, colors }: TemplateChronologicalProps) {
  const formatDate = (date: string) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="space-y-6">
      {/* Header with colored background */}
      <div className="p-6 rounded-lg" style={{ backgroundColor: colors.accent }}>
        <h1 className="text-3xl font-bold text-white mb-2">{cvData.personalInfo.fullName || "Your Name"}</h1>
        <div className="grid grid-cols-2 gap-2 text-white text-sm">
          {cvData.personalInfo.email && <div>Email: {cvData.personalInfo.email}</div>}
          {cvData.personalInfo.phone && <div>Phone: {cvData.personalInfo.phone}</div>}
          {cvData.personalInfo.address && <div className="col-span-2">Address: {cvData.personalInfo.address}</div>}
        </div>
      </div>

      {/* Summary */}
      {cvData.personalInfo.summary && (
        <div className="space-y-2">
          <h2 className="text-xl font-bold" style={{ color: colors.accent }}>
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{cvData.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience - Emphasized for chronological */}
      {cvData.experience.some((exp) => exp.jobTitle || exp.company) && (
        <div className="space-y-3">
          <h2
            className="text-xl font-bold border-b-2 pb-1"
            style={{ color: colors.accent, borderColor: colors.accent }}
          >
            Work Experience
          </h2>
          {cvData.experience.map((exp, index) => {
            if (!exp.jobTitle && !exp.company) return null
            return (
              <div key={index} className="relative pl-6 border-l-2" style={{ borderColor: colors.accent }}>
                <div
                  className="absolute w-3 h-3 rounded-full -left-[7px] top-1"
                  style={{ backgroundColor: colors.accent }}
                />
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-base">{exp.jobTitle || "Position"}</h3>
                    <p className="text-sm italic">{exp.company || "Company"}</p>
                  </div>
                  {(exp.startDate || exp.endDate) && (
                    <span
                      className="text-sm font-medium px-2 py-1 rounded"
                      style={{ backgroundColor: colors.secondary }}
                    >
                      {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                    </span>
                  )}
                </div>
                {exp.description && (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap mt-2">{exp.description}</p>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Education */}
      {cvData.education.some((edu) => edu.school || edu.degree) && (
        <div className="space-y-2">
          <h2
            className="text-xl font-bold border-b-2 pb-1"
            style={{ color: colors.accent, borderColor: colors.accent }}
          >
            Education
          </h2>
          {cvData.education.map((edu, index) => {
            if (!edu.school && !edu.degree) return null
            return (
              <div key={index} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold">{edu.degree || "Degree"}</h3>
                  <p className="text-sm">
                    {edu.school || "School"}
                    {edu.field && ` - ${edu.field}`}
                  </p>
                </div>
                {(edu.startDate || edu.endDate) && (
                  <span className="text-sm">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Skills */}
      {cvData.skills.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xl font-bold" style={{ color: colors.accent }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full"
                style={{ backgroundColor: colors.secondary }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
