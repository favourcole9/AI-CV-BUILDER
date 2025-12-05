"use client"

import type React from "react"
import { useState } from "react"
import Navbar from "@/components/navbar"
import Chatbot from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// SVG Icons
const UploadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
)

const FileIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
)

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
)

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
)

interface ApplicantFile {
  id: string
  file: File
  name: string
}

interface ShortlistedApplicant {
  id: string
  name: string
  fileName: string
  predictedRole: string
  skillsScore: number
  experienceScore: number
  totalScore: number
  recommendation: string
  badge: "Highly Recommended" | "Potential Fit" | "Not Recommended"
}

const JOB_ROLES = [
  "HR Officer",
  "Accountant",
  "Front Desk Officer",
  "Software Engineer",
  "Marketing Manager",
  "Sales Executive",
  "Project Manager",
  "Data Analyst",
  "Customer Service Representative",
  "Operations Manager",
]

export default function ShortlistPage() {
  const [uploadedFiles, setUploadedFiles] = useState<ApplicantFile[]>([])
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [isShortlisting, setIsShortlisting] = useState(false)
  const [shortlistedApplicants, setShortlistedApplicants] = useState<ShortlistedApplicant[]>([])
  const [hasShortlisted, setHasShortlisted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Extract text from file
  const extractTextFromFile = async (file: File): Promise<string> => {
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      return await file.text()
    }
    // Simulate PDF/DOCX extraction with mock data
    return `[CV Content from ${file.name}]\nExperienced professional with strong background in ${selectedRole || "various fields"}. Skills include communication, problem-solving, team collaboration, project management, data analysis, and technical expertise. Previous roles in customer service, operations, and administration.`
  }

  // Handle file upload
  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    const newFiles: ApplicantFile[] = Array.from(files).map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      file,
      name: file.name.replace(/\.(pdf|docx|txt)$/i, ""),
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])
  }

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileUpload(e.dataTransfer.files)
  }

  // Remove file
  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id))
  }

  // Mock AI Shortlisting Algorithm
  const runAIShortlisting = async () => {
    if (uploadedFiles.length === 0 || !selectedRole) {
      alert("Please upload CV files and select a job role")
      return
    }

    setIsShortlisting(true)
    setHasShortlisted(false)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const results: ShortlistedApplicant[] = []

    for (const fileData of uploadedFiles) {
      const content = await extractTextFromFile(fileData.file)

      // Mock AI scoring algorithm
      const skillsScore = Math.floor(Math.random() * 40) + 60 // 60-100
      const experienceScore = Math.floor(Math.random() * 40) + 60 // 60-100
      const totalScore = Math.round((skillsScore + experienceScore) / 2)

      let badge: "Highly Recommended" | "Potential Fit" | "Not Recommended"
      let recommendation: string

      if (totalScore >= 85) {
        badge = "Highly Recommended"
        recommendation = `Excellent match for ${selectedRole}. Strong technical and soft skills with relevant experience that aligns perfectly with role requirements.`
      } else if (totalScore >= 70) {
        badge = "Potential Fit"
        recommendation = `Good candidate for ${selectedRole}. Demonstrates competency in key areas but may need additional training in specific skills.`
      } else {
        badge = "Not Recommended"
        recommendation = `Limited alignment with ${selectedRole} requirements. Consider for alternative positions or revisit after skill development.`
      }

      results.push({
        id: fileData.id,
        name: fileData.name,
        fileName: fileData.file.name,
        predictedRole: selectedRole,
        skillsScore,
        experienceScore,
        totalScore,
        recommendation,
        badge,
      })
    }

    // Sort by total score (highest first)
    results.sort((a, b) => b.totalScore - a.totalScore)

    setShortlistedApplicants(results)
    setIsShortlisting(false)
    setHasShortlisted(true)
  }

  // Export to PDF (print)
  const handleExportPDF = () => {
    window.print()
  }

  // Get badge styling
  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case "Highly Recommended":
        return "bg-green-100 text-green-700 border-green-300"
      case "Potential Fit":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "Not Recommended":
        return "bg-red-100 text-red-700 border-red-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-3">
            Job Applicant Shortlisting
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Upload CVs and let AI analyze and rank candidates based on skills, experience, and role fit
          </p>
        </div>

        {/* Role Selection */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card className="p-6 bg-white border-purple-200 shadow-lg">
            <label className="block mb-2 text-sm font-semibold text-gray-700">Select Job Role</label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400">
                <SelectValue placeholder="Choose the role you're hiring for..." />
              </SelectTrigger>
              <SelectContent>
                {JOB_ROLES.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>
        </div>

        {/* Upload Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="p-6 bg-white border-purple-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <UploadIcon className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Upload Candidate CVs</h2>
            </div>

            {/* Drag and Drop Area */}
            <label onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className="block mb-4">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                  isDragging
                    ? "border-purple-500 bg-purple-50"
                    : "border-purple-300 hover:border-purple-500 hover:bg-purple-50/50"
                }`}
              >
                <UploadIcon className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <p className="text-gray-700 font-medium mb-1">Drag and drop CV files here</p>
                <p className="text-sm text-gray-500 mb-3">or click to browse</p>
                <p className="text-xs text-gray-400">Supports PDF, DOCX, and TXT files</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />
              </div>
            </label>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Files ({uploadedFiles.length})</p>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {uploadedFiles.map((fileData) => (
                    <div
                      key={fileData.id}
                      className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <FileIcon className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700 truncate">{fileData.file.name}</span>
                      </div>
                      <button
                        onClick={() => removeFile(fileData.id)}
                        className="ml-2 p-1 hover:bg-red-100 rounded transition-colors"
                      >
                        <TrashIcon className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Shortlisting Button */}
            <Button
              onClick={runAIShortlisting}
              disabled={isShortlisting || uploadedFiles.length === 0 || !selectedRole}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white h-14 text-base font-semibold"
            >
              {isShortlisting ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  AI is analyzing candidates...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <SparklesIcon className="w-5 h-5" />
                  Run AI Shortlisting
                </span>
              )}
            </Button>
          </Card>
        </div>

        {/* Results Section */}
        {hasShortlisted && shortlistedApplicants.length > 0 && (
          <div className="max-w-6xl mx-auto" id="shortlist-results">
            <Card className="p-6 bg-white border-purple-200 shadow-lg">
              <div className="flex items-center justify-between mb-6 print:mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                    <SparklesIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">AI Shortlisting Results</h2>
                    <p className="text-sm text-gray-500">
                      {shortlistedApplicants.length} candidates analyzed for {selectedRole}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleExportPDF}
                  variant="outline"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50 print:hidden bg-transparent"
                >
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  Export Shortlist (PDF)
                </Button>
              </div>

              <div className="space-y-4">
                {shortlistedApplicants.map((applicant, index) => (
                  <div
                    key={applicant.id}
                    className="border-2 border-purple-100 rounded-lg p-5 hover:border-purple-300 transition-all bg-gradient-to-r from-white to-purple-50/30"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Rank Badge */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center font-bold text-lg text-white">
                          #{index + 1}
                        </div>
                      </div>

                      {/* Applicant Details */}
                      <div className="flex-1 space-y-3">
                        {/* Name and Badge */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">{applicant.name}</h3>
                            <p className="text-sm text-gray-600">
                              <FileIcon className="w-4 h-4 inline mr-1" />
                              {applicant.fileName}
                            </p>
                          </div>
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-bold border w-fit ${getBadgeStyle(applicant.badge)}`}
                          >
                            {applicant.badge}
                          </span>
                        </div>

                        {/* Role Match */}
                        <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                          <p className="text-sm font-semibold text-purple-700">
                            Predicted Role Match: {applicant.predictedRole}
                          </p>
                        </div>

                        {/* Scores Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="bg-white border border-purple-200 rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-500 mb-1">Skills Score</p>
                            <p className="text-2xl font-bold text-purple-600">{applicant.skillsScore}</p>
                          </div>
                          <div className="bg-white border border-purple-200 rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-500 mb-1">Experience Score</p>
                            <p className="text-2xl font-bold text-purple-600">{applicant.experienceScore}</p>
                          </div>
                          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-3 text-center">
                            <p className="text-xs text-purple-100 mb-1">Total Score</p>
                            <p className="text-2xl font-bold text-white">{applicant.totalScore}</p>
                          </div>
                        </div>

                        {/* Recommendation */}
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <p className="text-xs font-semibold text-gray-600 mb-1">AI Recommendation</p>
                          <p className="text-sm text-gray-700">{applicant.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </main>

      <Chatbot />

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #shortlist-results,
          #shortlist-results * {
            visibility: visible;
          }
          #shortlist-results {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
