"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import LoginModal from "@/components/login-modal"
import { useAuth } from "@/lib/auth-context"

const FileTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
)

export default function Navbar() {
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleAuthClick = () => {
    if (isAuthenticated) {
      // Navigate to dashboard
      window.location.href = "/dashboard"
    } else {
      setShowLoginModal(true)
    }
  }

  const isActive = (path: string) => pathname === path

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 font-bold text-base sm:text-lg md:text-xl hover:opacity-80 transition-opacity"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FileTextIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline">
              AI CV Builder
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            <Link
              href="/"
              className={`font-medium text-sm lg:text-base transition-all ${
                isActive("/") ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              Home
            </Link>
            <Link
              href="/builder"
              className={`font-medium text-sm lg:text-base transition-all ${
                isActive("/builder") || isActive("/build")
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              Build CV
            </Link>
            <Link
              href="/templates"
              className={`font-medium text-sm lg:text-base transition-all ${
                isActive("/templates")
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              Templates
            </Link>
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className={`font-medium text-sm lg:text-base transition-all ${
                  isActive("/dashboard")
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                Dashboard
              </Link>
            )}
            <Link
              href="/contact"
              className={`font-medium text-sm lg:text-base transition-all ${
                isActive("/contact")
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleAuthClick}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs sm:text-sm px-3 sm:px-4 h-8 sm:h-10"
            >
              {isAuthenticated ? (
                <>
                  <UserIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">{user?.name}</span>
                  <span className="sm:hidden">Profile</span>
                </>
              ) : (
                "Login"
              )}
            </Button>
            {isAuthenticated && (
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="hidden sm:flex bg-transparent text-xs px-3 h-8"
              >
                Logout
              </Button>
            )}
          </div>
        </div>

        <div className="md:hidden border-t border-gray-200/50 bg-white/90 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-2 flex items-center justify-around">
            <Link
              href="/"
              className={`text-xs font-medium px-3 py-2 rounded-md transition-all ${
                isActive("/") ? "text-indigo-600 bg-indigo-50" : "text-gray-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/builder"
              className={`text-xs font-medium px-3 py-2 rounded-md transition-all ${
                isActive("/builder") || isActive("/build") ? "text-indigo-600 bg-indigo-50" : "text-gray-700"
              }`}
            >
              Build
            </Link>
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className={`text-xs font-medium px-3 py-2 rounded-md transition-all ${
                  isActive("/dashboard") ? "text-indigo-600 bg-indigo-50" : "text-gray-700"
                }`}
              >
                My CVs
              </Link>
            )}
            <Link
              href="/templates"
              className={`text-xs font-medium px-3 py-2 rounded-md transition-all ${
                isActive("/templates") ? "text-indigo-600 bg-indigo-50" : "text-gray-700"
              }`}
            >
              Templates
            </Link>
            <Link
              href="/contact"
              className={`text-xs font-medium px-3 py-2 rounded-md transition-all ${
                isActive("/contact") ? "text-indigo-600 bg-indigo-50" : "text-gray-700"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  )
}
