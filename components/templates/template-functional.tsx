import type { CVData, CVColors } from "@/app/builder/page"

interface TemplateFunctionalProps {
  cvData: CVData
  colors: CVColors
}

export function TemplateFunctional({ cvData, colors }: TemplateFunctionalProps) {
  const formatDate = (date: string) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-6">
      {/* Left Column */}
      <div className="space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>
            {cvData.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="text-sm space-y-0.5">
            {cvData.personalInfo.email && <div>{cvData.personalInfo.email}</div>}
            {cvData.personalInfo.phone && <div>{cvData.personalInfo.phone}</div>}
            {cvData.personalInfo.address && <div>{cvData.personalInfo.address}</div>}
          </div>
        </div>

        {/* Summary */}
        {cvData.personalInfo.summary && (
          <div>
            <h2
              className="text-lg font-bold mb-2 pb-1 border-b"
              style={{ color: colors.accent, borderColor: colors.accent }}
            >
              Professional Profile
            </h2>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{cvData.personalInfo.summary}</p>
          </div>
        )}

        {/* Skills - Emphasized for functional */}
        {cvData.skills.length > 0 && (
          <div>
            <h2
              className="text-lg font-bold mb-2 pb-1 border-b"
              style={{ color: colors.accent, borderColor: colors.accent }}
            >
              Core Competencies
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {cvData.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.accent }} />
                  <span className="text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {cvData.projects.some((proj) => proj.name) && (
          <div>
            <h2
              className="text-lg font-bold mb-2 pb-1 border-b"
              style={{ color: colors.accent, borderColor: colors.accent }}
            >
              Key Projects
            </h2>
            <div className="space-y-3">
              {cvData.projects.map((project, index) => {
                if (!project.name) return null
                return (
                  <div key={index}>
                    <h3 className="font-bold text-sm">{project.name}</h3>
                    {project.description && (
                      <p className="text-xs leading-relaxed whitespace-pre-wrap mt-1">{project.description}</p>
                    )}
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="text-xs px-2 py-0.5 rounded"
                            style={{ backgroundColor: colors.secondary }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="space-y-5">
        {/* Education */}
        {cvData.education.some((edu) => edu.school || edu.degree) && (
          <div>
            <h2
              className="text-base font-bold mb-2 pb-1 border-b"
              style={{ color: colors.accent, borderColor: colors.accent }}
            >
              Education
            </h2>
            <div className="space-y-2">
              {cvData.education.map((edu, index) => {
                if (!edu.school && !edu.degree) return null
                return (
                  <div key={index} className="text-xs">
                    <div className="font-bold">{edu.degree || "Degree"}</div>
                    <div>{edu.school || "School"}</div>
                    {(edu.startDate || edu.endDate) && (
                      <div className="text-gray-600">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Experience - Brief for functional */}
        {cvData.experience.some((exp) => exp.jobTitle || exp.company) && (
          <div>
            <h2
              className="text-base font-bold mb-2 pb-1 border-b"
              style={{ color: colors.accent, borderColor: colors.accent }}
            >
              Experience
            </h2>
            <div className="space-y-2">
              {cvData.experience.map((exp, index) => {
                if (!exp.jobTitle && !exp.company) return null
                return (
                  <div key={index} className="text-xs">
                    <div className="font-bold">{exp.jobTitle || "Position"}</div>
                    <div>{exp.company || "Company"}</div>
                    {(exp.startDate || exp.endDate) && (
                      <div className="text-gray-600">
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Certifications */}
        {cvData.certifications.some((cert) => cert.name) && (
          <div>
            <h2
              className="text-base font-bold mb-2 pb-1 border-b"
              style={{ color: colors.accent, borderColor: colors.accent }}
            >
              Certifications
            </h2>
            <div className="space-y-1 text-xs">
              {cvData.certifications.map((cert, index) => {
                if (!cert.name) return null
                return (
                  <div key={index}>
                    <div className="font-bold">{cert.name}</div>
                    <div>{cert.issuer}</div>
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
