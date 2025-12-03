"use client"

import { Button } from "@/components/ui/button"
import { FileText, Save, Download, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

type Section = "personal" | "summary" | "experience" | "education" | "skills" | "projects" | "certifications" | "links"
type Template = "modern" | "professional" | "minimal"

export default function BuildCV() {
  const [activeSection, setActiveSection] = useState<Section>("personal")
  const [selectedTemplate, setSelectedTemplate] = useState<Template>("modern")

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI CV Builder
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-2 border-indigo-200 hover:bg-indigo-50 bg-transparent">
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto max-w-[1400px]">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Build Your CV
            </h1>
            <p className="text-gray-600 mt-1">Create a professional CV that stands out</p>
          </div>

          {/* Split Layout */}
          <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-200px)]">
            {/* Left Sidebar - 40% */}
            <div className="w-full lg:w-[40%]">
              <div className="sticky top-24">
                <div className="backdrop-blur-xl bg-white/40 rounded-2xl border border-white/40 shadow-xl p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">CV Sections</h2>
                  <div className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id as Section)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                          activeSection === section.id
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                            : "bg-white/60 hover:bg-white/80 text-gray-700 hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{section.icon}</span>
                          <span className="font-medium">{section.label}</span>
                        </div>
                        <ChevronRight
                          className={`w-5 h-5 transition-transform ${
                            activeSection === section.id ? "text-white" : "text-gray-400"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Placeholder Info */}
                  <div className="mt-6 p-4 bg-indigo-50/60 rounded-xl border border-indigo-100">
                    <p className="text-sm text-indigo-800 font-medium mb-1">
                      Selected: {sections.find((s) => s.id === activeSection)?.label}
                    </p>
                    <p className="text-xs text-indigo-600">Form fields will appear here in the next phase</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Preview - 60% */}
            <div className="w-full lg:w-[60%]">
              <div className="backdrop-blur-xl bg-white/40 rounded-2xl border border-white/40 shadow-xl p-6">
                {/* Template Switcher */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Template:</span>
                    <select
                      value={selectedTemplate}
                      onChange={(e) => setSelectedTemplate(e.target.value as Template)}
                      className="px-4 py-2 rounded-lg bg-white/80 border border-white/60 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="modern">Modern</option>
                      <option value="professional">Professional</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>
                </div>

                {/* A4 Preview Card */}
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-2xl opacity-10"></div>

                  {/* A4 Card */}
                  <div className="relative bg-white rounded-2xl shadow-2xl p-12 min-h-[800px] aspect-[210/297]">
                    {/* Modern Template Preview */}
                    {selectedTemplate === "modern" && (
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="border-b-2 border-indigo-500 pb-6">
                          <h1 className="text-4xl font-bold text-gray-900 mb-2">John Doe</h1>
                          <p className="text-lg text-indigo-600 font-medium">Senior Software Engineer</p>
                          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                            <span>📧 john.doe@email.com</span>
                            <span>📱 +1 (555) 123-4567</span>
                            <span>📍 San Francisco, CA</span>
                          </div>
                        </div>

                        {/* Summary */}
                        <div>
                          <h2 className="text-xl font-bold text-indigo-600 mb-3 uppercase tracking-wide">
                            Professional Summary
                          </h2>
                          <p className="text-gray-700 leading-relaxed">
                            Results-driven software engineer with 5+ years of experience building scalable web
                            applications. Expertise in React, Node.js, and cloud technologies. Passionate about creating
                            exceptional user experiences and mentoring junior developers.
                          </p>
                        </div>

                        {/* Experience */}
                        <div>
                          <h2 className="text-xl font-bold text-indigo-600 mb-3 uppercase tracking-wide">
                            Work Experience
                          </h2>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-bold text-gray-900">Senior Software Engineer</h3>
                                  <p className="text-indigo-600">Tech Company Inc.</p>
                                </div>
                                <span className="text-sm text-gray-600">2021 - Present</span>
                              </div>
                              <ul className="space-y-1 text-gray-700 text-sm">
                                <li className="flex items-start gap-2">
                                  <span className="text-indigo-500 mt-1">▸</span>
                                  <span>Led development of microservices architecture serving 1M+ users</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-indigo-500 mt-1">▸</span>
                                  <span>Improved system performance by 40% through optimization</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-indigo-500 mt-1">▸</span>
                                  <span>Mentored team of 5 junior engineers</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Skills */}
                        <div>
                          <h2 className="text-xl font-bold text-indigo-600 mb-3 uppercase tracking-wide">Skills</h2>
                          <div className="flex flex-wrap gap-2">
                            {["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"].map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Professional Template Preview */}
                    {selectedTemplate === "professional" && (
                      <div className="space-y-6">
                        <div className="text-center border-b-2 border-gray-300 pb-6">
                          <h1 className="text-4xl font-bold text-gray-900 mb-2">John Doe</h1>
                          <p className="text-lg text-gray-700">Senior Software Engineer</p>
                          <p className="text-sm text-gray-600 mt-2">
                            john.doe@email.com | +1 (555) 123-4567 | San Francisco, CA
                          </p>
                        </div>
                        <div className="text-center text-gray-500 py-8">
                          <p className="font-medium">Professional Template</p>
                          <p className="text-sm mt-2">Classic and formal design</p>
                        </div>
                      </div>
                    )}

                    {/* Minimal Template Preview */}
                    {selectedTemplate === "minimal" && (
                      <div className="space-y-8">
                        <div>
                          <h1 className="text-5xl font-light text-gray-900 mb-1">John Doe</h1>
                          <p className="text-gray-600">Senior Software Engineer</p>
                        </div>
                        <div className="text-center text-gray-500 py-8">
                          <p className="font-medium">Minimal Template</p>
                          <p className="text-sm mt-2">Clean and simple design</p>
                        </div>
                      </div>
                    )}

                    {/* Placeholder Badge */}
                    <div className="absolute bottom-6 right-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium border border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Live Preview
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
