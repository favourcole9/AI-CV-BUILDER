"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const FileIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
)

export default function DashboardPage() {
  const { user, isAuthenticated, savedCVs, deleteCV } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router, mounted])

  if (!mounted || !isAuthenticated) {
    return null
  }

  const handleLoadCV = (cvId: string) => {
    router.push(`/builder?load=${cvId}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 py-8 mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              {user?.picture && (
                <img
                  src={user.picture || "/placeholder.svg"}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-2 border-indigo-500"
                />
              )}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <div>
                <p className="text-sm text-gray-600">Total CVs</p>
                <p className="text-3xl font-bold text-indigo-600">{savedCVs.length}</p>
              </div>
              <Link href="/builder">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  Create New CV
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Saved CVs</h2>

            {savedCVs.length === 0 ? (
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-12 text-center">
                <FileIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No saved CVs yet</h3>
                <p className="text-gray-600 mb-6">Create your first professional CV and save it here</p>
                <Link href="/builder">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedCVs.map((cv) => (
                  <div
                    key={cv.id}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-indigo-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <FileIcon className="w-8 h-8 text-indigo-600" />
                      <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                        {cv.template}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{cv.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">Updated {formatDate(cv.updatedAt)}</p>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleLoadCV(cv.id)}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                        size="sm"
                      >
                        Open
                      </Button>
                      <Button
                        onClick={() => deleteCV(cv.id)}
                        variant="outline"
                        size="sm"
                        className="bg-transparent hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
