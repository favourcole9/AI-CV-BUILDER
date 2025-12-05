"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AIActions } from "@/components/AIActions"
import type { CVData } from "@/app/builder/page"

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const Trash2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
)

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

interface SectionEditorProps {
  cvData: CVData
  setCvData: React.Dispatch<React.SetStateAction<CVData>>
  selectedSection: string
}

export function SectionEditor({ cvData, setCvData, selectedSection }: SectionEditorProps) {
  const [tagInput, setTagInput] = useState("")
  const [projectTagInputs, setProjectTagInputs] = useState<Record<number, string>>({})

  const addSkill = () => {
    if (tagInput.trim()) {
      setCvData((prev) => ({
        ...prev,
        skills: [...prev.skills, tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  const removeSkill = (index: number) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const addProjectTechnology = (projectIndex: number) => {
    const tech = projectTagInputs[projectIndex]?.trim()
    if (tech) {
      setCvData((prev) => ({
        ...prev,
        projects: prev.projects.map((p, i) =>
          i === projectIndex ? { ...p, technologies: [...p.technologies, tech] } : p,
        ),
      }))
      setProjectTagInputs({ ...projectTagInputs, [projectIndex]: "" })
    }
  }

  const removeProjectTechnology = (projectIndex: number, techIndex: number) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.map((p, i) =>
        i === projectIndex ? { ...p, technologies: p.technologies.filter((_, ti) => ti !== techIndex) } : p,
      ),
    }))
  }

  if (selectedSection === "personalInfo") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            value={cvData.personalInfo.fullName}
            onChange={(e) =>
              setCvData((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, fullName: e.target.value },
              }))
            }
            placeholder="Enter your full name"
            className="bg-white/50 border-white/20"
          />
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={cvData.personalInfo.email}
            onChange={(e) =>
              setCvData((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, email: e.target.value },
              }))
            }
            placeholder="your.email@example.com"
            className="bg-white/50 border-white/20"
          />
        </div>

        <div className="space-y-2">
          <Label>Phone</Label>
          <Input
            type="tel"
            value={cvData.personalInfo.phone}
            onChange={(e) =>
              setCvData((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, phone: e.target.value },
              }))
            }
            placeholder="+1 (555) 123-4567"
            className="bg-white/50 border-white/20"
          />
        </div>

        <div className="space-y-2">
          <Label>Address</Label>
          <Input
            value={cvData.personalInfo.address}
            onChange={(e) =>
              setCvData((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, address: e.target.value },
              }))
            }
            placeholder="City, Country"
            className="bg-white/50 border-white/20"
          />
        </div>

        <div className="space-y-2">
          <Label>Professional Summary</Label>
          <Textarea
            value={cvData.personalInfo.summary}
            onChange={(e) =>
              setCvData((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, summary: e.target.value },
              }))
            }
            placeholder="Brief description of your professional background..."
            className="min-h-[120px] bg-white/50 border-white/20"
          />
          <AIActions
            value={cvData.personalInfo.summary}
            onChange={(newValue) =>
              setCvData((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, summary: newValue },
              }))
            }
            fieldLabel="Professional Summary"
          />
        </div>
      </div>
    )
  }

  if (selectedSection === "experience") {
    return (
      <div className="space-y-6">
        {cvData.experience.map((exp, index) => (
          <div key={index} className="p-4 rounded-lg bg-white/40 border border-white/20 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Experience {index + 1}</h3>
              {cvData.experience.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setCvData((prev) => ({
                      ...prev,
                      experience: prev.experience.filter((_, i) => i !== index),
                    }))
                  }
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input
                value={exp.jobTitle}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    experience: prev.experience.map((item, i) =>
                      i === index ? { ...item, jobTitle: e.target.value } : item,
                    ),
                  }))
                }
                placeholder="Software Engineer"
                className="bg-white/50 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label>Company</Label>
              <Input
                value={exp.company}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    experience: prev.experience.map((item, i) =>
                      i === index ? { ...item, company: e.target.value } : item,
                    ),
                  }))
                }
                placeholder="Tech Corp"
                className="bg-white/50 border-white/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) =>
                    setCvData((prev) => ({
                      ...prev,
                      experience: prev.experience.map((item, i) =>
                        i === index ? { ...item, startDate: e.target.value } : item,
                      ),
                    }))
                  }
                  className="bg-white/50 border-white/20"
                />
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) =>
                    setCvData((prev) => ({
                      ...prev,
                      experience: prev.experience.map((item, i) =>
                        i === index ? { ...item, endDate: e.target.value } : item,
                      ),
                    }))
                  }
                  className="bg-white/50 border-white/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={exp.description}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    experience: prev.experience.map((item, i) =>
                      i === index ? { ...item, description: e.target.value } : item,
                    ),
                  }))
                }
                placeholder="Describe your responsibilities and achievements..."
                className="min-h-[100px] bg-white/50 border-white/20"
              />
              <AIActions
                value={exp.description}
                onChange={(newValue) =>
                  setCvData((prev) => ({
                    ...prev,
                    experience: prev.experience.map((item, i) =>
                      i === index ? { ...item, description: newValue } : item,
                    ),
                  }))
                }
                fieldLabel="Description"
              />
            </div>
          </div>
        ))}

        <Button
          onClick={() =>
            setCvData((prev) => ({
              ...prev,
              experience: [
                ...prev.experience,
                {
                  jobTitle: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                },
              ],
            }))
          }
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Experience
        </Button>
      </div>
    )
  }

  if (selectedSection === "education") {
    return (
      <div className="space-y-6">
        {cvData.education.map((edu, index) => (
          <div key={index} className="p-4 rounded-lg bg-white/40 border border-white/20 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Education {index + 1}</h3>
              {cvData.education.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setCvData((prev) => ({
                      ...prev,
                      education: prev.education.filter((_, i) => i !== index),
                    }))
                  }
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label>School/University</Label>
              <Input
                value={edu.school}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    education: prev.education.map((item, i) =>
                      i === index ? { ...item, school: e.target.value } : item,
                    ),
                  }))
                }
                placeholder="University Name"
                className="bg-white/50 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label>Degree</Label>
              <Input
                value={edu.degree}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    education: prev.education.map((item, i) =>
                      i === index ? { ...item, degree: e.target.value } : item,
                    ),
                  }))
                }
                placeholder="Bachelor of Science"
                className="bg-white/50 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label>Field of Study</Label>
              <Input
                value={edu.field}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    education: prev.education.map((item, i) =>
                      i === index ? { ...item, field: e.target.value } : item,
                    ),
                  }))
                }
                placeholder="Computer Science"
                className="bg-white/50 border-white/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={edu.startDate}
                  onChange={(e) =>
                    setCvData((prev) => ({
                      ...prev,
                      education: prev.education.map((item, i) =>
                        i === index ? { ...item, startDate: e.target.value } : item,
                      ),
                    }))
                  }
                  className="bg-white/50 border-white/20"
                />
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={edu.endDate}
                  onChange={(e) =>
                    setCvData((prev) => ({
                      ...prev,
                      education: prev.education.map((item, i) =>
                        i === index ? { ...item, endDate: e.target.value } : item,
                      ),
                    }))
                  }
                  className="bg-white/50 border-white/20"
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          onClick={() =>
            setCvData((prev) => ({
              ...prev,
              education: [
                ...prev.education,
                {
                  school: "",
                  degree: "",
                  field: "",
                  startDate: "",
                  endDate: "",
                },
              ],
            }))
          }
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Education
        </Button>
      </div>
    )
  }

  if (selectedSection === "skills") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Skills</Label>
          <div className="flex flex-wrap gap-2 min-h-[60px] p-3 bg-white/30 rounded-lg border border-white/20">
            {cvData.skills.length === 0 ? (
              <span className="text-sm text-gray-400">No skills added yet</span>
            ) : (
              cvData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-indigo-500/20 text-indigo-700 gap-1 px-3 py-1">
                  {skill}
                  <button onClick={() => removeSkill(index)} className="ml-1 hover:text-indigo-900">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addSkill()
              }
            }}
            placeholder="Type a skill and press Enter"
            className="bg-white/50 border-white/20"
          />
          <Button onClick={addSkill} className="bg-indigo-600 hover:bg-indigo-700 shrink-0">
            Add
          </Button>
        </div>
      </div>
    )
  }

  if (selectedSection === "certifications") {
    return (
      <div className="space-y-6">
        {cvData.certifications.map((cert, index) => (
          <div key={index} className="p-4 rounded-lg bg-white/40 border border-white/20 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Certification {index + 1}</h3>
              {cvData.certifications.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setCvData((prev) => ({
                      ...prev,
                      certifications: prev.certifications.filter((_, i) => i !== index),
                    }))
                  }
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label>Certification Name</Label>
              <Input
                value={cert.name}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    certifications: prev.certifications.map((item, i) =>
                      i === index ? { ...item, name: e.target.value } : item,
                    ),
                  }))
                }
                placeholder="AWS Certified Solutions Architect"
                className="bg-white/50 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label>Issuing Organization</Label>
              <Input
                value={cert.issuer}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    certifications: prev.certifications.map((item, i) =>
                      i === index ? { ...item, issuer: e.target.value } : item,
                    ),
                  }))
                }
                placeholder="Amazon Web Services"
                className="bg-white/50 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label>Date Obtained</Label>
              <Input
                type="date"
                value={cert.date}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    certifications: prev.certifications.map((item, i) =>
                      i === index ? { ...item, date: e.target.value } : item,
                    ),
                  }))
                }
                className="bg-white/50 border-white/20"
              />
            </div>
          </div>
        ))}

        <Button
          onClick={() =>
            setCvData((prev) => ({
              ...prev,
              certifications: [
                ...prev.certifications,
                {
                  name: "",
                  issuer: "",
                  date: "",
                },
              ],
            }))
          }
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Certification
        </Button>
      </div>
    )
  }

  if (selectedSection === "projects") {
    return (
      <div className="space-y-6">
        {cvData.projects.map((project, index) => (
          <div key={index} className="p-4 rounded-lg bg-white/40 border border-white/20 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Project {index + 1}</h3>
              {cvData.projects.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setCvData((prev) => ({
                      ...prev,
                      projects: prev.projects.filter((_, i) => i !== index),
                    }))
                  }
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label>Project Name</Label>
              <Input
                value={project.name}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    projects: prev.projects.map((item, i) => (i === index ? { ...item, name: e.target.value } : item)),
                  }))
                }
                placeholder="E-commerce Platform"
                className="bg-white/50 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={project.description}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    projects: prev.projects.map((item, i) =>
                      i === index ? { ...item, description: e.target.value } : item,
                    ),
                  }))
                }
                placeholder="Describe the project..."
                className="min-h-[100px] bg-white/50 border-white/20"
              />
              <AIActions
                value={project.description}
                onChange={(newValue) =>
                  setCvData((prev) => ({
                    ...prev,
                    projects: prev.projects.map((item, i) => (i === index ? { ...item, description: newValue } : item)),
                  }))
                }
                fieldLabel="Description"
              />
            </div>

            <div className="space-y-2">
              <Label>Technologies Used</Label>
              <div className="flex flex-wrap gap-2 min-h-[60px] p-3 bg-white/30 rounded-lg border border-white/20">
                {project.technologies.length === 0 ? (
                  <span className="text-sm text-gray-400">No technologies added</span>
                ) : (
                  project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="bg-indigo-500/20 text-indigo-700 gap-1 px-3 py-1"
                    >
                      {tech}
                      <button
                        onClick={() => removeProjectTechnology(index, techIndex)}
                        className="ml-1 hover:text-indigo-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  value={projectTagInputs[index] || ""}
                  onChange={(e) => setProjectTagInputs({ ...projectTagInputs, [index]: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addProjectTechnology(index)
                    }
                  }}
                  placeholder="Type and press Enter"
                  className="bg-white/50 border-white/20"
                />
                <Button
                  onClick={() => addProjectTechnology(index)}
                  className="bg-indigo-600 hover:bg-indigo-700 shrink-0"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}

        <Button
          onClick={() =>
            setCvData((prev) => ({
              ...prev,
              projects: [
                ...prev.projects,
                {
                  name: "",
                  description: "",
                  technologies: [],
                },
              ],
            }))
          }
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Project
        </Button>
      </div>
    )
  }

  if (selectedSection === "links") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Portfolio Website</Label>
          <Input
            type="url"
            value={cvData.links.portfolio}
            onChange={(e) =>
              setCvData((prev) => ({
                ...prev,
                links: { ...prev.links, portfolio: e.target.value },
              }))
            }
            placeholder="https://yourportfolio.com"
            className="bg-white/50 border-white/20"
          />
        </div>

        <div className="space-y-2">
          <Label>GitHub</Label>
          <Input
            type="url"
            value={cvData.links.github}
            onChange={(e) =>
              setCvData((prev) => ({
                ...prev,
                links: { ...prev.links, github: e.target.value },
              }))
            }
            placeholder="https://github.com/username"
            className="bg-white/50 border-white/20"
          />
        </div>

        <div className="space-y-2">
          <Label>LinkedIn</Label>
          <Input
            type="url"
            value={cvData.links.linkedin}
            onChange={(e) =>
              setCvData((prev) => ({
                ...prev,
                links: { ...prev.links, linkedin: e.target.value },
              }))
            }
            placeholder="https://linkedin.com/in/username"
            className="bg-white/50 border-white/20"
          />
        </div>
      </div>
    )
  }

  return null
}
