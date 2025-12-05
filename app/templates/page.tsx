import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Chatbot from "@/components/chatbot"

export default function TemplatesPage() {
  const templates = [
    {
      name: "Modern",
      description: "Clean two-column layout with bold typography and modern spacing",
      preview: "/modern-cv-template.png",
    },
    {
      name: "Professional",
      description: "Traditional single-column format perfect for corporate roles",
      preview: "/professional-cv-template.png",
    },
    {
      name: "Minimal",
      description: "Simple and elegant design focusing on content clarity",
      preview: "/minimal-cv-template.png",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Choose Your Template
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-balance">
              Select from our professionally designed templates, all optimized for ATS systems and modern hiring
              practices.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {templates.map((template) => (
              <div
                key={template.name}
                className="group relative backdrop-blur-xl bg-white/40 rounded-2xl border border-white/40 p-6 hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="aspect-[3/4] bg-white rounded-lg mb-6 overflow-hidden shadow-lg">
                  <img
                    src={template.preview || "/placeholder.svg"}
                    alt={`${template.name} template preview`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{template.name}</h3>
                <p className="text-gray-600 mb-6">{template.description}</p>
                <Link href="/builder">
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                    Use This Template
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-6">All templates are fully customizable with your own colors and content</p>
            <Link href="/builder">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                Start Building Your CV
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Chatbot />
    </div>
  )
}
