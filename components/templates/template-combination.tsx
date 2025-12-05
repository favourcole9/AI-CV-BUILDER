import type { CVData, CVColors } from "@/app/builder/page"

interface TemplateCombinationProps {
  cvData: CVData
  colors: CVColors
}

export function TemplateCombination({ cvData, colors }: TemplateCombinationProps) {
  const formatDate = (date: string) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="space-y-6">
      {/* Dual-color header */}
      <div className="grid grid-cols-[1fr_2fr] gap-4">
        <div className="p-4 rounded-lg" style={{ backgroundColor: colors.accent }}>
          <div
            className="w-20 h-20 rounded-full bg-white mx-auto mb-3 flex items-center justify-center text-3xl font-bold"
            style={{ color: colors.accent }}
          >
            {(cvData.personalInfo.fullName || "YN")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
            {cvData.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="grid grid-cols-2 gap-1 text-xs">
            {cvData.personalInfo.email && <div>📧 {cvData.personalInfo.email}</div>}
            {cvData.personalInfo.phone && <div>📞 {cvData.personalInfo.phone}</div>}
            {cvData.personalInfo.address && <div className="col-span-2">📍 {cvData.personalInfo.address}</div>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {cvData.personalInfo.summary && (
        <div className="p-4 rounded-lg" style={{ backgroundColor: colors.secondary }}>
          <h2 className="text-base font-bold mb-2" style={{ color: colors.accent }}>
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{cvData.personalInfo.summary}</p>
        </div>
      )}

      {/* Skills Grid */}
      {cvData.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: colors.accent }}>
            <div className="w-1 h-6 rounded" style={{ backgroundColor: colors.accent }} />
            Key Skills
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {cvData.skills.map((skill, index) => (
              <div
                key={index}
                className="p-2 text-center text-sm rounded border"
                style={{ borderColor: colors.accent, color: colors.primary }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {cvData.experience.some((exp) => exp.jobTitle || exp.company) && (
        <div>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: colors.accent }}>
            <div className="w-1 h-6 rounded" style={{ backgroundColor: colors.accent }} />
            Professional Experience
          </h2>
          <div className="space-y-4">
            {cvData.experience.map((exp, index) => {
              if (!exp.jobTitle && !exp.company) return null
              return (
                <div key={index} className="grid grid-cols-[1fr_3fr] gap-4">
                  <div className="text-right pr-4 border-r-2" style={{ borderColor: colors.accent }}>
                    <div className="font-bold text-sm">{formatDate(exp.startDate)}</div>
                    <div className="text-xs">to</div>
                    <div className="font-bold text-sm">{exp.endDate ? formatDate(exp.endDate) : "Present"}</div>
                  </div>
                  <div>
                    <h3 className="font-bold">{exp.jobTitle || "Position"}</h3>
                    <p className="text-sm italic mb-1">{exp.company || "Company"}</p>
                    {exp.description && (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Education & Certifications */}
      <div className="grid grid-cols-2 gap-6">
        {cvData.education.some((edu) => edu.school || edu.degree) && (
          <div>
            <h2 className="text-base font-bold mb-2" style={{ color: colors.accent }}>
              Education
            </h2>
            <div className="space-y-2">
              {cvData.education.map((edu, index) => {
                if (!edu.school && !edu.degree) return null
                return (
                  <div key={index} className="text-sm">
                    <div className="font-bold">{edu.degree || "Degree"}</div>
                    <div>{edu.school || "School"}</div>
                    {(edu.startDate || edu.endDate) && (
                      <div className="text-xs text-gray-600">{formatDate(edu.endDate)}</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {cvData.certifications.some((cert) => cert.name) && (
          <div>
            <h2 className="text-base font-bold mb-2" style={{ color: colors.accent }}>
              Certifications
            </h2>
            <div className="space-y-2">
              {cvData.certifications.map((cert, index) => {
                if (!cert.name) return null
                return (
                  <div key={index} className="text-sm">
                    <div className="font-bold">{cert.name}</div>
                    <div className="text-xs">{cert.issuer}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
