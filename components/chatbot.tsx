"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import type { CVData } from "@/app/builder/page"

const MessageCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
)

const SendIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
)

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

interface Message {
  id: number
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

interface ChatbotProps {
  cvData?: CVData
  setCvData?: (data: CVData) => void
  selectedSection?: string
}

export default function Chatbot({ cvData, setCvData, selectedSection }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI CV assistant. I can help you enhance any section of your CV. Just ask me to improve your Experience, Skills, Education, or any other section!",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("experience") || lowerMessage.includes("work")) {
      return "I can help enhance your work experience! Try adding quantifiable achievements like 'Led team of 5 developers' or 'Increased efficiency by 40%'. Would you like me to suggest improvements for your current experience entries?"
    }

    if (lowerMessage.includes("skill")) {
      return "For skills, I recommend listing both technical and soft skills. Technical: React, Python, AWS. Soft: Leadership, Communication, Problem-solving. Want me to suggest skills relevant to your field?"
    }

    if (lowerMessage.includes("education")) {
      return "Education should include your degree, institution, graduation year, and relevant coursework or achievements. Include GPA if it's 3.5 or above. Need help formatting your education section?"
    }

    if (lowerMessage.includes("summary") || lowerMessage.includes("objective")) {
      return "A strong summary highlights your years of experience, key skills, and career goals in 2-3 sentences. For example: 'Results-driven software engineer with 5+ years building scalable web applications. Expert in React and Node.js. Seeking to leverage expertise in full-stack development at a forward-thinking company.'"
    }

    if (lowerMessage.includes("enhance") || lowerMessage.includes("improve")) {
      return `I can enhance your ${selectedSection || "CV"}! Share what you'd like to improve, and I'll suggest professional, ATS-friendly content that makes you stand out.`
    }

    return "I'm here to help you create an outstanding CV! Ask me to enhance any section like Experience, Education, Skills, or Projects. I can also help with writing tips and formatting suggestions."
  }

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    setIsTyping(true)

    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        text: generateAIResponse(inputValue),
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickActions = [
    { label: "Enhance Experience", action: "enhance experience" },
    { label: "Improve Skills", action: "improve skills" },
    { label: "Polish Summary", action: "enhance summary" },
  ]

  const handleQuickAction = (action: string) => {
    setInputValue(action)
    handleSend()
  }

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-16 sm:bottom-20 md:bottom-24 right-2 sm:right-4 md:right-6 w-[calc(100vw-1rem)] sm:w-96 h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white">CV Assistant</h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/90">Online</span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 w-8 h-8 sm:w-10 sm:h-10"
            >
              <XIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium transition-colors"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 sm:py-2 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-xs sm:text-sm leading-relaxed">{message.text}</p>
                  <span className="text-[10px] sm:text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-3 py-2 sm:px-4 sm:py-3">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 sm:p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 rounded-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
              />
              <Button
                onClick={handleSend}
                className="rounded-full w-9 h-9 sm:w-10 sm:h-10 p-0 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                <SendIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 sm:bottom-6 right-2 sm:right-4 md:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50 group print:hidden"
      >
        <MessageCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
      </button>
    </>
  )
}
