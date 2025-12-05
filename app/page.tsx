import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Chatbot from "@/components/chatbot"

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
)

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

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
)

const ZapIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-indigo-100/80 backdrop-blur-sm border border-indigo-200/50 text-indigo-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6 animate-fade-in">
              <SparklesIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Powered by Advanced AI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                Your Dream Job is One Click Away
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto text-balance px-4">
              Create a professional, ATS-friendly CV with AI. Stand out from the crowd and land your dream job faster.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Link href="/builder" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all"
                >
                  Start Building
                  <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Illustration - Glass Card with Shimmer */}
          <div className="relative max-w-3xl mx-auto mt-10 sm:mt-12 md:mt-16">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl opacity-20 animate-pulse-slow"></div>
            <div className="relative backdrop-blur-xl bg-white/40 rounded-2xl sm:rounded-3xl border border-white/40 shadow-2xl p-4 sm:p-6 md:p-8 overflow-hidden">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>

              {/* Mock CV Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-gradient-to-r from-gray-300/50 to-gray-200/50 rounded-lg w-2/3 animate-typing"></div>
                    <div
                      className="h-4 bg-gradient-to-r from-gray-200/50 to-gray-100/50 rounded-lg w-1/2 animate-typing"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <div
                    className="h-4 bg-gradient-to-r from-gray-300/50 to-gray-200/50 rounded-lg w-full animate-typing"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                  <div
                    className="h-4 bg-gradient-to-r from-gray-200/50 to-gray-100/50 rounded-lg w-5/6 animate-typing"
                    style={{ animationDelay: "0.6s" }}
                  ></div>
                  <div
                    className="h-4 bg-gradient-to-r from-gray-300/50 to-gray-200/50 rounded-lg w-4/5 animate-typing"
                    style={{ animationDelay: "0.8s" }}
                  ></div>
                </div>

                <div className="flex items-center justify-center pt-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/80 text-green-700 text-sm font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    AI Writing in Progress
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-center text-sm sm:text-base text-gray-600 mb-10 sm:mb-12 md:mb-16 max-w-2xl mx-auto px-4">
            Everything you need to create the perfect CV that gets you noticed by recruiters and ATS systems.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative backdrop-blur-xl bg-white/40 rounded-xl sm:rounded-2xl border border-white/40 p-6 sm:p-8 hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-indigo-500/30">
                  <SparklesIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">AI Writing Assistance</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Let AI craft compelling bullet points and descriptions that showcase your experience and skills
                  perfectly.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative backdrop-blur-xl bg-white/40 rounded-xl sm:rounded-2xl border border-white/40 p-6 sm:p-8 hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-indigo-500/30">
                  <FileTextIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">ATS-Friendly Formatting</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Our templates are optimized to pass through Applicant Tracking Systems with ease, ensuring your CV
                  gets seen.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative backdrop-blur-xl bg-white/40 rounded-xl sm:rounded-2xl border border-white/40 p-6 sm:p-8 hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-indigo-500/30">
                  <DownloadIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">One-Click PDF Export</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Download your professionally formatted CV as a PDF instantly. No hassle, no waiting, just perfect
                  results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Animation Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl opacity-20"></div>
            <div className="relative backdrop-blur-xl bg-white/40 rounded-2xl sm:rounded-3xl border border-white/40 shadow-2xl p-6 sm:p-8 md:p-12 overflow-hidden">
              <div className="flex items-center gap-2 mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="ml-4 text-sm text-gray-500 font-mono">ai-cv-builder.app</span>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-wide">
                    Professional Summary
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-800 font-medium animate-typing-text">
                      Results-driven software engineer with 5+ years of experience...
                    </p>
                    <div className="h-1 w-1 bg-indigo-600 animate-blink inline-block"></div>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-semibold text-indigo-600 mb-3 uppercase tracking-wide">
                    Work Experience
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2"></div>
                      <p className="text-gray-700 animate-typing-text" style={{ animationDelay: "2s" }}>
                        Led development of microservices architecture serving 1M+ users
                      </p>
                    </div>
                    <div className="flex items-start gap-3 opacity-70">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2"></div>
                      <p className="text-gray-700 animate-typing-text" style={{ animationDelay: "3s" }}>
                        Improved system performance by 40% through optimization
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center pt-6">
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium shadow-lg shadow-indigo-500/30">
                    <SparklesIcon className="w-4 h-4 animate-pulse" />
                    AI is writing your professional story
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 border-t border-gray-200/50 backdrop-blur-xl bg-white/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 font-bold text-lg sm:text-xl mb-3 sm:mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileTextIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AI CV Builder
                </span>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Build professional CVs with the power of AI
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/" className="hover:text-indigo-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/builder" className="hover:text-indigo-600 transition-colors">
                    Build CV
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-indigo-600 transition-colors">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-indigo-600 transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="#" className="hover:text-indigo-600 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-indigo-600 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-indigo-600 transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-indigo-600 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
              <p className="text-gray-600 mb-4">
                <a href="mailto:hello@aicvbuilder.com" className="hover:text-indigo-600 transition-colors">
                  hello@aicvbuilder.com
                </a>
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-indigo-100 hover:bg-indigo-200 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-indigo-100 hover:bg-indigo-200 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-indigo-100 hover:bg-indigo-200 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className="pt-6 sm:pt-8 border-t border-gray-200/50 text-center text-gray-600 text-xs sm:text-sm">
            <p>&copy; 2025 AI CV Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  )
}
