"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  picture: string
}

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
  user: User | null
  isAuthenticated: boolean
  login: (email: string, name: string) => void
  logout: () => void
  savedCVs: SavedCV[]
  saveCV: (name: string, cvData: any, colors: any, template: string) => void
  loadCV: (id: string) => SavedCV | null
  deleteCV: (id: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [savedCVs, setSavedCVs] = useState<SavedCV[]>([])

  useEffect(() => {
    const storedUser = localStorage.getItem("cvBuilder_user")
    const storedCVs = localStorage.getItem("cvBuilder_savedCVs")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    if (storedCVs) {
      setSavedCVs(JSON.parse(storedCVs))
    }
  }, [])

  const login = (email: string, name: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`,
    }
    setUser(newUser)
    localStorage.setItem("cvBuilder_user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("cvBuilder_user")
  }

  const saveCV = (name: string, cvData: any, colors: any, template: string) => {
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
    localStorage.setItem("cvBuilder_savedCVs", JSON.stringify(updatedCVs))
  }

  const loadCV = (id: string) => {
    return savedCVs.find((cv) => cv.id === id) || null
  }

  const deleteCV = (id: string) => {
    const updatedCVs = savedCVs.filter((cv) => cv.id !== id)
    setSavedCVs(updatedCVs)
    localStorage.setItem("cvBuilder_savedCVs", JSON.stringify(updatedCVs))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        savedCVs,
        saveCV,
        loadCV,
        deleteCV,
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
