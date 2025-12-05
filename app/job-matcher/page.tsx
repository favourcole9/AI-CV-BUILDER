"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Chatbot from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

// Simple SVG icons
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

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const TrophyIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
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

interface Applicant {
  id: string
  name: string
  fileName: string
  content: string
  matchScore: number
  matchedKeywords: string[]
}

export default function JobMatcherPage() {
  const [cvFiles, setCvFiles] = useState<File[]>([])
  const [jobDescription, setJobDescription] = useState("")
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [isMatching, setIsMatching] = useState(false)
  const [hasMatched, setHasMatched] = useState(false)

  // Extract text from file (simplified - works for text files)
  const extractTextFromFile = async (file: File): Promise<string> => {
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      return await file.text()
    }
    // For PDF files, we'll simulate extraction with placeholder text
    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      // In a real app, you'd use a library like pdf.js or pdf-parse
      return `[PDF Content from ${file.name}]\nSoftware Engineer with 5+ years experience in React, Node.js, TypeScript, JavaScript, Python, AWS, Docker, Kubernetes, API development, database design, and agile methodologies. Strong communication and problem-solving skills.`
    }
    return ""
  }

  // Calculate match score based on keyword matching
  const calculateMatchScore = (cvText: string, jobText: string): { score: number; matched: string[] } => {
    const cvLower = cvText.toLowerCase()
    const jobLower = jobText.toLowerCase()

    // Extract keywords from job description (words longer than 3 characters)
    const jobKeywords =
      jobLower.match(/\b\w{4,}\b/g)?.filter((word) => {
        // Filter out common words
        const commonWords = ["that", "this", "with", "from", "have", "will", "been", "were", "their", "your"]
        return !commonWords.includes(word)
      }) || []

    // Remove duplicates
    const uniqueKeywords = [...new Set(jobKeywords)]

    // Count matches
    const matched = uniqueKeywords.filter((keyword) => cvLower.includes(keyword))

    // Calculate score (percentage of keywords matched)
    const score = uniqueKeywords.length > 0 ? Math.round((matched.length / uniqueKeywords.length) * 100) : 0

    return { score, matched }
  }

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setCvFiles((prev) => [...prev, ...files])
  }

  // Remove uploaded file
  const removeFile = (index: number) => {
    setCvFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // Match applicants with job
  const handleMatchApplicants = async () => {
    if (cvFiles.length === 0 || !jobDescription.trim()) {
      alert("Please upload CV files and enter job requirements")
      return
    }

    setIsMatching(true)
    setHasMatched(false)

    // Process each CV file
    const results: Applicant[] = []

    for (let i = 0; i < cvFiles.length; i++) {
      const file = cvFiles[i]
      const content = await extractTextFromFile(file)
      const { score, matched } = calculateMatchScore(content, jobDescription)

      // Extract name from filename (remove extension)
      const name = file.name.replace(/\.(pdf|txt)$/i, "")

      results.push({
        id: `applicant-${i}`,
        name,
        fileName: file.name,
        content,
        matchScore: score,
        matchedKeywords: matched.slice(0, 10), // Show top 10 keywords
      })
    }

    // Sort by match score (highest first)
    results.sort((a, b) => b.matchScore - a.matchScore)

    setTimeout(() => {
      setApplicants(results)
      setIsMatching(false)
      setHasMatched(true)
    }, 1500) // Simulate processing time
  }

  // Get badge color based on score
  const getScoreBadge = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-700 border-green-300"
    if (score >= 60) return "bg-blue-100 text-blue-700 border-blue-300"
    if (score >= 40) return "bg-yellow-100 text-yellow-700 border-yellow-300"
    return "bg-red-100 text-red-700 border-red-300"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-3">
            Job Matcher
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Upload multiple CVs and match them against job requirements to find the best candidates
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Left Column - Upload CVs */}
          <Card className="p-6 bg-white border-blue-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <UploadIcon className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Upload CVs</h2>
            </div>

            {/* Upload Area */}
            <label className="block mb-4">
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer">
                <UploadIcon className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <p className="text-gray-700 font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PDF or TXT files (max 10MB each)</p>
                <input type="file" multiple accept=".pdf,.txt" onChange={handleFileUpload} className="hidden" />
              </div>
            </label>

            {/* Uploaded Files List */}
            {cvFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Files ({cvFiles.length})</p>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {cvFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <FileIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700 truncate">{file.name}</span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="ml-2 p-1 hover:bg-red-100 rounded transition-colors"
                      >
                        <TrashIcon className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Right Column - Job Requirements */}
          <Card className="p-6 bg-white border-blue-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <CheckIcon className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Job Requirements</h2>
            </div>

            <Textarea
              placeholder="Enter job description, requirements, and skills needed...&#10;&#10;Example:&#10;- 5+ years of experience in software development&#10;- Proficiency in React, Node.js, and TypeScript&#10;- Experience with AWS and Docker&#10;- Strong problem-solving skills&#10;- Excellent communication abilities"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[300px] text-sm border-blue-200 focus:border-blue-400 focus:ring-blue-400"
            />

            <Button
              onClick={handleMatchApplicants}
              disabled={isMatching || cvFiles.length === 0 || !jobDescription.trim()}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-12 text-base font-semibold"
            >
              {isMatching ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Matching Applicants...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5" />
                  Match Applicants
                </span>
              )}
            </Button>
          </Card>
        </div>

        {/* Results Section */}
        {hasMatched && applicants.length > 0 && (
          <div className="mt-8 max-w-7xl mx-auto">
            <Card className="p-6 bg-white border-blue-200 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                  <TrophyIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Ranked Candidates ({applicants.length})</h2>
              </div>

              <div className="space-y-3">
                {applicants.map((applicant, index) => (
                  <div
                    key={applicant.id}
                    className="border-2 border-blue-100 rounded-lg p-4 hover:border-blue-300 transition-all bg-gradient-to-r from-white to-blue-50/30"
                  >
                    <div className="flex items-start gap-4">
                      {/* Rank Badge */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                            index === 0
                              ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white"
                              : index === 1
                                ? "bg-gradient-to-br from-gray-300 to-gray-500 text-white"
                                : index === 2
                                  ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white"
                                  : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          #{index + 1}
                        </div>
                      </div>

                      {/* Applicant Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-800 text-lg">{applicant.name}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-bold border ${getScoreBadge(applicant.matchScore)}`}
                          >
                            {applicant.matchScore}% Match
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">
                          <FileIcon className="w-4 h-4 inline mr-1" />
                          {applicant.fileName}
                        </p>

                        {/* Matched Keywords */}
                        {applicant.matchedKeywords.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-2">Matched Keywords:</p>
                            <div className="flex flex-wrap gap-1.5">
                              {applicant.matchedKeywords.map((keyword, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full border border-blue-200"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {hasMatched && applicants.length === 0 && (
          <div className="mt-8 max-w-7xl mx-auto text-center">
            <Card className="p-12 bg-white border-blue-200">
              <p className="text-gray-500">No matching results found</p>
            </Card>
          </div>
        )}
      </main>

      <Chatbot />
    </div>
  )
}
