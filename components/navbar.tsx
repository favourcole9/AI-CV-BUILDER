"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import LoginModal from "@/components/login-modal"

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
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleLogin = () => {
    setShowLoginModal(true)
  }

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
  }

  const isActive = (path: string) => pathname === path

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FileTextIcon className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI CV Builder
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`font-medium transition-all ${
                isActive("/") ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              Home
            </Link>
            <Link
              href="/templates"
              className={`font-medium transition-all ${
                isActive("/templates")
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              Templates
            </Link>
            <Link
              href="/contact"
              className={`font-medium transition-all ${
                isActive("/contact")
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              Contact
            </Link>
            <Link
              href="/builder"
              className={`font-medium transition-all ${
                isActive("/builder") || isActive("/build")
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              Try Demo
            </Link>
          </div>

          <Button
            onClick={handleLogin}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
          >
            {isLoggedIn ? (
              <>
                <UserIcon className="w-4 h-4 mr-2" />
                Hello, User
              </>
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </nav>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  )
}
