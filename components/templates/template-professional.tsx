import type { CVData, CVColors } from "@/app/builder/page"

interface TemplateProfessionalProps {
  cvData: CVData
  colors: CVColors
}

export function TemplateProfessional({ cvData, colors }: TemplateProfessionalProps) {
  const formatDate = (date: string) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="space-y-5">
      {/* Header with centered name */}
      <div className="text-center pb-4 border-b" style={{ borderColor: colors.accent }}>
        <h1 className="text-4xl font-bold mb-3" style={{ color: colors.primary }}>
          {cvData.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex justify-center gap-4 text-sm flex-wrap" style={{ color: colors.primary }}>
          {cvData.personalInfo.email && <span>{cvData.personalInfo.email}</span>}
          {cvData.personalInfo.phone && <span>•</span>}
          {cvData.personalInfo.phone && <span>{cvData.personalInfo.phone}</span>}
          {cvData.personalInfo.address && <span>•</span>}
          {cvData.personalInfo.address && <span>{cvData.personalInfo.address}</span>}
        </div>
        {(cvData.links.portfolio || cvData.links.github || cvData.links.linkedin) && (
          <div className="flex justify-center gap-3 mt-2 text-xs" style={{ color: colors.accent }}>
            {cvData.links.portfolio && <span>{cvData.links.portfolio}</span>}
            {cvData.links.github && <span>•</span>}
            {cvData.links.github && <span>{cvData.links.github}</span>}
            {cvData.links.linkedin && <span>•</span>}
            {cvData.links.linkedin && <span>{cvData.links.linkedin}</span>}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {cvData.personalInfo.summary && (
        <div className="space-y-2">
          <h2
            className="text-sm font-bold uppercase tracking-wider pb-1 border-b"
            style={{ color: colors.accent, borderColor: colors.accent }}
          >
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: colors.primary }}>
            {cvData.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {cvData.experience.some((exp) => exp.jobTitle || exp.company) && (
        <div className="space-y-2">
          <h2
            className="text-sm font-bold uppercase tracking-wider pb-1 border-b"
            style={{ color: colors.accent, borderColor: colors.accent }}
          >
            Professional Experience
          </h2>
          <div className="space-y-4">
            {cvData.experience.map((exp, index) => {
              const hasContent = exp.jobTitle || exp.company || exp.description
              if (!hasContent) return null

              return (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-base" style={{ color: colors.primary }}>
                        {exp.jobTitle || "Position"}
                      </h3>
                      <p className="text-sm italic" style={{ color: colors.primary }}>
                        {exp.company || "Company"}
                      </p>
                    </div>
                    {(exp.startDate || exp.endDate) && (
                      <p className="text-sm font-medium" style={{ color: colors.accent }}>
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                      </p>
                    )}
                  </div>
                  {exp.description && (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: colors.primary }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Education */}
      {cvData.education.some((edu) => edu.school || edu.degree) && (
        <div className="space-y-2">
          <h2
            className="text-sm font-bold uppercase tracking-wider pb-1 border-b"
            style={{ color: colors.accent, borderColor: colors.accent }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {cvData.education.map((edu, index) => {
              const hasContent = edu.school || edu.degree || edu.field
              if (!hasContent) return null

              return (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold" style={{ color: colors.primary }}>
                      {edu.degree || "Degree"}
                    </h3>
                    <p className="text-sm" style={{ color: colors.primary }}>
                      {edu.school || "School"}
                      {edu.field && ` - ${edu.field}`}
                    </p>
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <p className="text-sm font-medium" style={{ color: colors.accent }}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Skills */}
      {cvData.skills.length > 0 && (
        <div className="space-y-2">
          <h2
            className="text-sm font-bold uppercase tracking-wider pb-1 border-b"
            style={{ color: colors.accent, borderColor: colors.accent }}
          >
            Core Competencies
          </h2>
          <div className="grid grid-cols-3 gap-x-4 gap-y-2">
            {cvData.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.accent }} />
                <span className="text-sm" style={{ color: colors.primary }}>
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {cvData.projects.some((proj) => proj.name || proj.description) && (
        <div className="space-y-2">
          <h2
            className="text-sm font-bold uppercase tracking-wider pb-1 border-b"
            style={{ color: colors.accent, borderColor: colors.accent }}
          >
            Key Projects
          </h2>
          <div className="space-y-3">
            {cvData.projects.map((project, index) => {
              const hasContent = project.name || project.description || project.technologies.length > 0
              if (!hasContent) return null

              return (
                <div key={index} className="space-y-1">
                  <h3 className="font-bold" style={{ color: colors.primary }}>
                    {project.name || "Project"}
                  </h3>
                  {project.description && (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: colors.primary }}>
                      {project.description}
                    </p>
                  )}
                  {project.technologies.length > 0 && (
                    <p className="text-sm italic" style={{ color: colors.accent }}>
                      Technologies: {project.technologies.join(", ")}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Certifications */}
      {cvData.certifications.some((cert) => cert.name || cert.issuer) && (
        <div className="space-y-2">
          <h2
            className="text-sm font-bold uppercase tracking-wider pb-1 border-b"
            style={{ color: colors.accent, borderColor: colors.accent }}
          >
            Certifications
          </h2>
          <div className="space-y-2">
            {cvData.certifications.map((cert, index) => {
              const hasContent = cert.name || cert.issuer
              if (!hasContent) return null

              return (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold" style={{ color: colors.primary }}>
                      {cert.name || "Certification"}
                    </h3>
                    {cert.issuer && (
                      <p className="text-sm" style={{ color: colors.primary }}>
                        {cert.issuer}
                      </p>
                    )}
                  </div>
                  {cert.date && (
                    <p className="text-sm font-medium" style={{ color: colors.accent }}>
                      {formatDate(cert.date)}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
