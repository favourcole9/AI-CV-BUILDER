"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type Section = "personal" | "summary" | "experience" | "education" | "skills" | "projects" | "certifications" | "links"
type Template = "modern" | "professional" | "minimal"

export default function BuildCV() {
  const [activeSection, setActiveSection] = useState<Section>("personal")
  const [selectedTemplate, setSelectedTemplate] = useState<Template>("modern")
  const router = useRouter()

  useEffect(() => {
    router.replace("/builder")
  }, [router])

  const sections = [
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "summary", label: "Summary", icon: "📝" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "certifications", label: "Certifications", icon: "🏆" },
    { id: "links", label: "Links", icon: "🔗" },
  ] as const

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to CV Builder...</p>
      </div>
    </div>
  )
}
