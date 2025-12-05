"use client"

import { useState } from "react"
const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
)

const RefreshCw = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
)

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const Minimize2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6l7 7M4 10h6m0 0V4m0 6L3 3m17 7h-6m0 0V4m0 6l7-7"
    />
  </svg>
)

import { Button } from "@/components/ui/button"
import { aiGenerate, aiRewrite, aiImprove, aiShorten } from "@/lib/AISimulator"

interface AIActionsProps {
  value: string | string[]
  onChange: (newValue: string) => void
  fieldLabel?: string
}

export function AIActions({ value, onChange, fieldLabel = "content" }: AIActionsProps) {
  const [loading, setLoading] = useState(false)
  const [activeAction, setActiveAction] = useState<string | null>(null)

  const textValue = Array.isArray(value) ? value.join(", ") : value

  const handleAIAction = async (action: string, fn: (text: string) => string) => {
    if (!textValue.trim() && action !== "generate") return

    setLoading(true)
    setActiveAction(action)

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const result = action === "generate" ? fn(fieldLabel) : fn(textValue)
    onChange(result)

    setLoading(false)
    setActiveAction(null)
  }

  return (
    <div id="ai-actions" className="mt-2 flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg p-1">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => handleAIAction("generate", aiGenerate)}
          disabled={loading}
          className="h-7 px-2 text-xs hover:bg-indigo-500/20 hover:text-indigo-700 transition-all"
        >
          <Sparkles className="w-3 h-3 mr-1" />
          Generate
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => handleAIAction("rewrite", aiRewrite)}
          disabled={loading || !textValue.trim()}
          className="h-7 px-2 text-xs hover:bg-purple-500/20 hover:text-purple-700 transition-all"
        >
          <RefreshCw className="w-3 h-3 mr-1" />
          Rewrite
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => handleAIAction("improve", aiImprove)}
          disabled={loading || !textValue.trim()}
          className="h-7 px-2 text-xs hover:bg-pink-500/20 hover:text-pink-700 transition-all"
        >
          <TrendingUp className="w-3 h-3 mr-1" />
          Improve
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => handleAIAction("shorten", aiShorten)}
          disabled={loading || !textValue.trim()}
          className="h-7 px-2 text-xs hover:bg-blue-500/20 hover:text-blue-700 transition-all"
        >
          <Minimize2 className="w-3 h-3 mr-1" />
          Shorten
        </Button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-xs text-gray-500 animate-pulse">
          <div className="flex gap-0.5">
            <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce"></span>
          </div>
          <span>AI is thinking...</span>
        </div>
      )}
    </div>
  )
}
