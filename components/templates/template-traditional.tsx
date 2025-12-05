import type { CVData, CVColors } from "@/app/builder/page"

interface TemplateTraditionalProps {
  cvData: CVData
  colors: CVColors
}

export function TemplateTraditional({ cvData, colors }: TemplateTraditionalProps) {
  const formatDate = (date: string) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="space-y-5 text-sm">
      {/* Header */}
      <div className="text-center space-y-2 pb-4 border-b-2 border-black">
        <h1 className="text-4xl font-bold uppercase tracking-wide" style={{ color: colors.primary }}>
          {cvData.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex justify-center items-center gap-3 text-xs flex-wrap">
          {cvData.personalInfo.email && <span>{cvData.personalInfo.email}</span>}
          {cvData.personalInfo.phone && <span>•</span>}
          {cvData.personalInfo.phone && <span>{cvData.personalInfo.phone}</span>}
          {cvData.personalInfo.address && <span>•</span>}
          {cvData.personalInfo.address && <span>{cvData.personalInfo.address}</span>}
        </div>
      </div>

      {/* Summary */}
      {cvData.personalInfo.summary && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2 border-b border-gray-400">Objective</h2>
          <p className="text-xs leading-relaxed whitespace-pre-wrap">{cvData.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {cvData.experience.some((exp) => exp.jobTitle || exp.company) && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2 border-b border-gray-400">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {cvData.experience.map((exp, index) => {
              if (!exp.jobTitle && !exp.company) return null
              return (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold">{exp.jobTitle || "Position"}</span>
                    {(exp.startDate || exp.endDate) && (
                      <span className="text-xs">
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                      </span>
                    )}
                  </div>
                  <div className="italic mb-1">{exp.company || "Company"}</div>
                  {exp.description && <p className="text-xs leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Education */}
      {cvData.education.some((edu) => edu.school || edu.degree) && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2 border-b border-gray-400">Education</h2>
          <div className="space-y-2">
            {cvData.education.map((edu, index) => {
              if (!edu.school && !edu.degree) return null
              return (
                <div key={index} className="flex justify-between items-baseline">
                  <div>
                    <div className="font-bold">{edu.degree || "Degree"}</div>
                    <div className="italic">
                      {edu.school || "School"}
                      {edu.field && ` - ${edu.field}`}
                    </div>
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <span className="text-xs">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Skills */}
      {cvData.skills.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2 border-b border-gray-400">Skills</h2>
          <p className="text-xs">{cvData.skills.join(" • ")}</p>
        </div>
      )}

      {/* Certifications */}
      {cvData.certifications.some((cert) => cert.name) && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2 border-b border-gray-400">Certifications</h2>
          <div className="space-y-1">
            {cvData.certifications.map((cert, index) => {
              if (!cert.name) return null
              return (
                <div key={index} className="flex justify-between items-baseline">
                  <span className="font-bold">{cert.name}</span>
                  <span className="text-xs">
                    {cert.issuer} {cert.date && `• ${formatDate(cert.date)}`}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
