"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useSession } from "next-auth/react"

interface SavedCV {
  id: string
  name: string
  cvData: any
  colors: any
  template: string
  createdAt: string
  updatedAt: string
}

interface AuthContextType {
  user: any | null
  isAuthenticated: boolean
  isLoading: boolean
  savedCVs: SavedCV[]
  saveCV: (name: string, cvData: any, colors: any, template: string) => void
  loadCV: (id: string) => SavedCV | null
  deleteCV: (id: string) => void
  configError: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [savedCVs, setSavedCVs] = useState<SavedCV[]>([])
  const [configError, setConfigError] = useState<string | null>(null)

  const isAuthenticated = status === "authenticated"
  const isLoading = status === "loading"
  const user = session?.user || null

  useEffect(() => {
    if (status === "unauthenticated") {
      fetch("/api/auth/session")
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setConfigError(data.message || "Authentication is not configured")
          }
        })
        .catch(() => {
          // Session fetch failed, likely not configured
        })
    }
  }, [status])

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      try {
        const storedCVs = localStorage.getItem(`cvBuilder_savedCVs_${user.id}`)
        if (storedCVs) {
          setSavedCVs(JSON.parse(storedCVs))
        }
      } catch (error) {
        console.error("Failed to load saved CVs:", error)
        setSavedCVs([])
      }
    } else {
      setSavedCVs([])
    }
  }, [isAuthenticated, user?.id])

  const saveCV = (name: string, cvData: any, colors: any, template: string) => {
    if (!user?.id) return

    const newCV: SavedCV = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      cvData,
      colors,
      template,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedCVs = [...savedCVs, newCV]
    setSavedCVs(updatedCVs)
    localStorage.setItem(`cvBuilder_savedCVs_${user.id}`, JSON.stringify(updatedCVs))
  }

  const loadCV = (id: string) => {
    return savedCVs.find((cv) => cv.id === id) || null
  }

  const deleteCV = (id: string) => {
    if (!user?.id) return

    const updatedCVs = savedCVs.filter((cv) => cv.id !== id)
    setSavedCVs(updatedCVs)
    localStorage.setItem(`cvBuilder_savedCVs_${user.id}`, JSON.stringify(updatedCVs))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (configError && !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="max-w-md p-8 bg-white rounded-2xl shadow-xl border border-red-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-red-100 rounded-full">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Not Configured</h2>
            <p className="text-gray-600 mb-4">{configError}</p>
            <div className="p-4 bg-gray-50 rounded-lg text-left text-sm">
              <p className="font-semibold text-gray-900 mb-2">Required Environment Variables:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>GOOGLE_CLIENT_ID</li>
                <li>GOOGLE_CLIENT_SECRET</li>
                <li>NEXTAUTH_SECRET</li>
              </ul>
              <p className="mt-3 text-gray-600">
                See <code className="bg-gray-200 px-1 rounded">GOOGLE_OAUTH_SETUP.md</code> for setup instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        savedCVs,
        saveCV,
        loadCV,
        deleteCV,
        configError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
