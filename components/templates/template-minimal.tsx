import type { CVData, CVColors } from "@/app/builder/page"

interface TemplateMinimalProps {
  cvData: CVData
  colors: CVColors
}

export function TemplateMinimal({ cvData, colors }: TemplateMinimalProps) {
  const formatDate = (date: string) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="space-y-8 font-light">
      {/* Minimalist Header */}
      <div className="space-y-3">
        <h1 className="text-5xl font-extralight tracking-tight" style={{ color: colors.primary }}>
          {cvData.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex gap-3 text-xs" style={{ color: colors.primary, opacity: 0.7 }}>
          {cvData.personalInfo.email && <span>{cvData.personalInfo.email}</span>}
          {cvData.personalInfo.phone && <span>{cvData.personalInfo.phone}</span>}
          {cvData.personalInfo.address && <span>{cvData.personalInfo.address}</span>}
        </div>
        {(cvData.links.portfolio || cvData.links.github || cvData.links.linkedin) && (
          <div className="flex gap-3 text-xs" style={{ color: colors.accent }}>
            {cvData.links.portfolio && <span>{cvData.links.portfolio}</span>}
            {cvData.links.github && <span>{cvData.links.github}</span>}
            {cvData.links.linkedin && <span>{cvData.links.linkedin}</span>}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {cvData.personalInfo.summary && (
        <div className="space-y-3">
          <h2 className="text-xs font-medium uppercase tracking-widest" style={{ color: colors.accent }}>
            About
          </h2>
          <p className="text-sm leading-loose whitespace-pre-wrap" style={{ color: colors.primary }}>
            {cvData.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {cvData.experience.some((exp) => exp.jobTitle || exp.company) && (
        <div className="space-y-3">
          <h2 className="text-xs font-medium uppercase tracking-widest" style={{ color: colors.accent }}>
            Experience
          </h2>
          <div className="space-y-5">
            {cvData.experience.map((exp, index) => {
              const hasContent = exp.jobTitle || exp.company || exp.description
              if (!hasContent) return null

              return (
                <div key={index} className="space-y-2">
                  <div>
                    <h3 className="text-base font-normal" style={{ color: colors.primary }}>
                      {exp.jobTitle || "Position"}
                    </h3>
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm" style={{ color: colors.primary, opacity: 0.7 }}>
                        {exp.company || "Company"}
                      </p>
                      {(exp.startDate || exp.endDate) && (
                        <p className="text-xs" style={{ color: colors.primary, opacity: 0.5 }}>
                          {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                        </p>
                      )}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-sm leading-loose whitespace-pre-wrap" style={{ color: colors.primary }}>
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
        <div className="space-y-3">
          <h2 className="text-xs font-medium uppercase tracking-widest" style={{ color: colors.accent }}>
            Education
          </h2>
          <div className="space-y-4">
            {cvData.education.map((edu, index) => {
              const hasContent = edu.school || edu.degree || edu.field
              if (!hasContent) return null

              return (
                <div key={index}>
                  <h3 className="text-base font-normal" style={{ color: colors.primary }}>
                    {edu.degree || "Degree"}
                  </h3>
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm" style={{ color: colors.primary, opacity: 0.7 }}>
                      {edu.school || "School"}
                      {edu.field && ` · ${edu.field}`}
                    </p>
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-xs" style={{ color: colors.primary, opacity: 0.5 }}>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Skills */}
      {cvData.skills.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-medium uppercase tracking-widest" style={{ color: colors.accent }}>
            Skills
          </h2>
          <p className="text-sm leading-loose" style={{ color: colors.primary }}>
            {cvData.skills.join(" · ")}
          </p>
        </div>
      )}

      {/* Projects */}
      {cvData.projects.some((proj) => proj.name || proj.description) && (
        <div className="space-y-3">
          <h2 className="text-xs font-medium uppercase tracking-widest" style={{ color: colors.accent }}>
            Projects
          </h2>
          <div className="space-y-4">
            {cvData.projects.map((project, index) => {
              const hasContent = project.name || project.description || project.technologies.length > 0
              if (!hasContent) return null

              return (
                <div key={index} className="space-y-1">
                  <h3 className="text-base font-normal" style={{ color: colors.primary }}>
                    {project.name || "Project"}
                  </h3>
                  {project.description && (
                    <p className="text-sm leading-loose whitespace-pre-wrap" style={{ color: colors.primary }}>
                      {project.description}
                    </p>
                  )}
                  {project.technologies.length > 0 && (
                    <p className="text-xs" style={{ color: colors.primary, opacity: 0.6 }}>
                      {project.technologies.join(" · ")}
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
        <div className="space-y-3">
          <h2 className="text-xs font-medium uppercase tracking-widest" style={{ color: colors.accent }}>
            Certifications
          </h2>
          <div className="space-y-3">
            {cvData.certifications.map((cert, index) => {
              const hasContent = cert.name || cert.issuer
              if (!hasContent) return null

              return (
                <div key={index}>
                  <h3 className="text-base font-normal" style={{ color: colors.primary }}>
                    {cert.name || "Certification"}
                  </h3>
                  <div className="flex justify-between items-baseline">
                    {cert.issuer && (
                      <p className="text-sm" style={{ color: colors.primary, opacity: 0.7 }}>
                        {cert.issuer}
                      </p>
                    )}
                    {cert.date && (
                      <p className="text-xs" style={{ color: colors.primary, opacity: 0.5 }}>
                        {formatDate(cert.date)}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
