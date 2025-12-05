"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

interface OnboardingStep {
  id: string
  targetId: string
  title: string
  description: string
}

const steps: OnboardingStep[] = [
  {
    id: "step-1",
    targetId: "sidebar",
    title: "Section Navigation",
    description: "This sidebar is where you switch between CV sections such as Experience, Education, Skills...",
  },
  {
    id: "step-2",
    targetId: "editor",
    title: "Content Editor",
    description: "Enter your personal info and section content here.",
  },
  {
    id: "step-3",
    targetId: "ai-actions",
    title: "AI Assistance",
    description: "Use these buttons to generate, rewrite or polish a section (mock AI).",
  },
  {
    id: "step-4",
    targetId: "preview",
    title: "Live Preview",
    description: "This is the live CV preview. Changes appear here in real-time.",
  },
  {
    id: "step-5",
    targetId: "template-selector",
    title: "Template Selection",
    description: "Switch templates to change CV layout instantly.",
  },
  {
    id: "step-6",
    targetId: "topbar-actions",
    title: "Save & Export",
    description: "Download your CV as PDF, or save your draft.",
  },
]

interface OnboardingOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function OnboardingOverlay({ isOpen, onClose }: OnboardingOverlayProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const [cardPosition, setCardPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 })

  const currentStep = steps[currentStepIndex]

  useEffect(() => {
    if (!isOpen) return

    const updateHighlight = () => {
      const targetElement = document.getElementById(currentStep.targetId)
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect()
        setTargetRect(rect)

        // Calculate card position
        const cardWidth = 360
        const cardHeight = 200
        const padding = 24
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        let top = rect.bottom + padding
        let left = rect.left + rect.width / 2 - cardWidth / 2

        // Adjust if card would go off-screen
        if (top + cardHeight > viewportHeight) {
          top = rect.top - cardHeight - padding
        }
        if (left < padding) {
          left = padding
        }
        if (left + cardWidth > viewportWidth - padding) {
          left = viewportWidth - cardWidth - padding
        }

        setCardPosition({ top, left })
      }
    }

    updateHighlight()
    window.addEventListener("resize", updateHighlight)
    window.addEventListener("scroll", updateHighlight)

    return () => {
      window.removeEventListener("resize", updateHighlight)
      window.removeEventListener("scroll", updateHighlight)
    }
  }, [isOpen, currentStepIndex, currentStep.targetId])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext()
      } else if (e.key === "ArrowLeft") {
        handleBack()
      } else if (e.key === "Escape") {
        handleSkip()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentStepIndex])

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    } else {
      handleFinish()
    }
  }

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  const handleSkip = () => {
    localStorage.setItem("ai_cv_builder_tour_shown", "1")
    onClose()
  }

  const handleFinish = () => {
    localStorage.setItem("ai_cv_builder_tour_shown", "1")
    onClose()
  }

  if (!isOpen || !targetRect) return null

  return (
    <>
      {/* Dark overlay */}
      <div
        className="fixed inset-0 bg-[rgba(2,6,23,0.6)] transition-opacity duration-350 z-[9998]"
        style={{ backdropFilter: "blur(2px)" }}
      />

      {/* Spotlight highlight */}
      <div
        className="fixed z-[9999] pointer-events-none transition-all duration-350 ease-in-out"
        style={{
          top: targetRect.top - 8,
          left: targetRect.left - 8,
          width: targetRect.width + 16,
          height: targetRect.height + 16,
          boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.5), 0 0 40px 8px rgba(99, 102, 241, 0.3)",
          borderRadius: "12px",
          outline: "2px solid rgba(99, 102, 241, 0.8)",
        }}
      />

      {/* Floating card */}
      <div
        className="fixed z-[10000] w-[360px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-6 transition-all duration-350 ease-in-out animate-in fade-in slide-in-from-bottom-4"
        style={{
          top: `${cardPosition.top}px`,
          left: `${cardPosition.left}px`,
        }}
        role="dialog"
        aria-labelledby="onboarding-title"
        aria-describedby="onboarding-description"
      >
        {/* Close button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close tour"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress indicator */}
        <div className="mb-4">
          <div className="text-xs font-medium text-indigo-600 mb-2">
            Step {currentStepIndex + 1} / {steps.length}
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-350 ease-out"
              style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <h3 id="onboarding-title" className="text-lg font-semibold text-gray-900 mb-2">
          {currentStep.title}
        </h3>
        <p id="onboarding-description" className="text-sm text-gray-600 mb-6">
          {currentStep.description}
        </p>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            aria-label="Skip tour"
          >
            Skip
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className="disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
              aria-label="Previous step"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white min-w-[80px]"
              aria-label={currentStepIndex === steps.length - 1 ? "Finish tour" : "Next step"}
            >
              {currentStepIndex === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
