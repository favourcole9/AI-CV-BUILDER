"use client"

import { useState, useEffect } from "react"

export function useOnboarding() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false)

  useEffect(() => {
    // Check if tour has been shown before
    const tourShown = localStorage.getItem("ai_cv_builder_tour_shown")
    if (!tourShown) {
      // Small delay to let the page render first
      const timer = setTimeout(() => {
        setIsOnboardingOpen(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const startOnboarding = () => {
    setIsOnboardingOpen(true)
  }

  const closeOnboarding = () => {
    setIsOnboardingOpen(false)
  }

  return {
    isOnboardingOpen,
    startOnboarding,
    closeOnboarding,
  }
}
