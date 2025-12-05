# AI Powered CV Builder & Job Matcher 

> Transform your career journey with AI-powered CV creation and intelligent job matching.

![AI CV Builder](https://img.shields.io/badge/Status-Hackathon%20Ready-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## The Problem

Job seekers face three major challenges:

1. **Time-Consuming CV Creation** - Crafting professional CVs from scratch takes hours
2. **ATS Compatibility Issues** - 75% of CVs are rejected by Applicant Tracking Systems
3. **Generic Content** - Most CVs lack compelling, achievement-focused language

##  Our Solution

AI CV Builder revolutionizes CV creation with:

- **AI-Powered Writing Assistant** - Generate professional content with one click
- **ATS-Optimized Templates** - Pre-designed formats that pass screening systems
- **Real-Time Preview** - See your CV update instantly as you type
- **Smart Customization** - Color themes and template options for personal branding
- **One-Click Export** - Download print-ready PDFs immediately

##  Key Features

###  Intelligent AI Assistant
- Context-aware suggestions for each CV section
- Professional phrasing and achievement-focused language
- Quick action buttons for common enhancements
- Continuous conversation support

###  Comprehensive CV Builder
- **7 Essential Sections**: Personal Info, Experience, Education, Skills, Certifications, Projects, Links
- **Dynamic Form Fields**: Add multiple entries for experience, education, and projects
- **Real-Time Preview**: See changes instantly in the live preview panel
- **Auto-Save**: Never lose your progress with automatic localStorage backup

###  Professional Templates
- **3 Beautiful Designs**: Modern, Professional, and Minimal
- **Customizable Colors**: Primary, secondary, and accent color pickers
- **ATS-Friendly Formatting**: Optimized for Applicant Tracking Systems
- **Responsive Design**: Perfect on desktop, tablet, and mobile

###  Export & Save
- **PDF Export**: Print-ready PDFs with one click (Ctrl+P or Export button)
- **Progress Saving**: Manual and automatic save to localStorage
- **Design Persistence**: Saved colors and template preferences

###  Mobile-First Design
- Fully responsive layout for all screen sizes
- Touch-friendly buttons and inputs
- Mobile preview panel with smooth animations
- Collapsible sections for better mobile UX

##  Getting Started

### Prerequisites
- Node.js 18+ installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone or Download the Project**
   \`\`\`bash
   # If you have the ZIP file
   unzip ai-cv-builder.zip
   cd ai-cv-builder
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run Development Server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

##  How to Use

### 1. **Navigate to Builder**
   - Click "Start Building" on the homepage or "Build CV" in the navigation

### 2. **Fill Your Information**
   - Select a section from the left sidebar (Personal Info, Experience, etc.)
   - Fill in the form fields - all inputs update the preview in real-time
   - Use "Add Another" buttons to add multiple entries for Experience, Education, etc.

### 3. **Enhance with AI**
   - Click the chatbot button (bottom-right corner)
   - Ask the AI to enhance any section: "Enhance my experience" or "Improve my skills"
   - Use quick action buttons for common enhancements

### 4. **Customize Design**
   - Open "Design Settings" in the preview panel
   - Choose from 3 professional templates (Modern, Professional, Minimal)
   - Customize colors with the color pickers
   - Click "Save Design" to persist your preferences

### 5. **Export Your CV**
   - Click "Save Progress" to save your data locally
   - Click "Export PDF" to download your CV
   - Use the fullscreen button (desktop) for a larger preview

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: shadcn/ui
- **Storage**: LocalStorage (client-side)
- **AI**: Mock AI responses (no API keys needed for demo)

##  Project Structure

\`\`\`
ai-cv-builder/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── builder/page.tsx         # CV builder page
│   ├── templates/page.tsx       # Templates showcase
│   ├── contact/page.tsx         # Contact page
│   └── layout.tsx               # Root layout
├── components/
│   ├── navbar.tsx               # Navigation bar
│   ├── chatbot.tsx              # AI assistant
│   ├── section-editor.tsx       # Form editor
│   ├── template-selector.tsx    # Template chooser
│   ├── onboarding-overlay.tsx   # User onboarding
│   ├── templates/               # CV templates
│   │   ├── template-modern.tsx
│   │   ├── template-professional.tsx
│   │   └── template-minimal.tsx
│   └── ui/                      # shadcn components
├── hooks/
│   └── useOnboarding.ts         # Onboarding logic
└── lib/
    └── AISimulator.js           # Mock AI functions
\`\`\`

##  Features Breakdown

###  Fully Implemented
-  AI chatbot with context-aware responses
-  All 7 CV sections with full CRUD operations
-  3 professional templates with customization
-  Auto-save and manual save functionality
-  PDF export via browser print
-  Fully responsive design (mobile, tablet, desktop)
-  Real-time preview updates
-  Color customization with persistence
-  Onboarding walkthrough for new users
-  Login modal (UI demo)

###  Demo Features (For Hackathon)
- AI responses use mock data (no API required)
- Login authentication is UI-only (no backend)
- All data stored in browser localStorage

##  Screenshots

### Landing Page
![image alt](https://github.com/favourcole9/AI-CV-BUILDER/blob/18296a857eb53037e4646b7fee1d07b395c986e2/landing.png.jpeg)
*Beautiful glassmorphism design with gradient accents*

### CV Builder
![image alt](https://github.com/favourcole9/AI-CV-BUILDER/blob/fd70dcc7122aba931ae476e0fd9338adba269c87/builder.png.jpeg)
*Real-time editing with live preview panel*

### Template Selection
![image alt](https://github.com/favourcole9/AI-CV-BUILDER/blob/deac41b7ea2ed94a1ca6be920e7208608ef664e8/templates.png.jpeg)
*3 professional, ATS-friendly templates*

### AI Assistant
![image alt](https://github.com/favourcole9/AI-CV-BUILDER/blob/6013c01b0041cd224f812089addb9ee50438d028/chatbot.png.jpeg)
*Intelligent suggestions for every section*

##  Hackathon Highlights

### Innovation
- **AI-First Approach**: Every section enhanced by intelligent suggestions
- **Real-Time Collaboration**: Instant preview updates as you type
- **Zero Configuration**: No API keys, no backend setup needed for demo

### User Experience
- **Intuitive Interface**: Clean, modern design with guided onboarding
- **Mobile-Optimized**: Works perfectly on any device
- **Accessibility**: Keyboard navigation, screen reader support

### Technical Excellence
- **Modern Stack**: Next.js 16, TypeScript, Tailwind CSS 4
- **Performance**: Optimized rendering, lazy loading, efficient state management
- **Code Quality**: Clean architecture, reusable components, TypeScript types

##  Future Enhancements

- [ ] Real AI integration (OpenAI GPT, Anthropic Claude)
- [ ] User authentication and cloud storage
- [ ] AI Job matching
- [ ] Multiple CV versions management
- [ ] LinkedIn profile import
- [ ] Cover letter generator
- [ ] ATS score checker
- [ ] Export to Word format and PDF export
- [ ] Share CV via unique link
- [ ] Analytics dashboard

##  Team

Built with love for the hackathon by passionate developers who believe in making job hunting easier for everyone.

##  License

MIT License - feel free to use this project for your own purposes!

##  Acknowledgments

- Icons from Heroicons
- UI components from shadcn/ui
- Inspiration from modern CV builders and design systems

---

**Live Demo**: [https://v0-cv-builder-amber.vercel.app/]

**Hackathon**: [Big 5 AI and Blockchain Hackathon]

**Made with Next.js**
\`\`\`

```css file="" isHidden
