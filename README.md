# AI CV Builder & Job Matcher 🚀

> Transform your career journey with AI-powered CV creation and intelligent job matching.

![AI CV Builder](https://img.shields.io/badge/Status-Hackathon%20Ready-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎯 The Problem

Job seekers face three major challenges:

1. **Time-Consuming CV Creation** - Crafting professional CVs from scratch takes hours
2. **ATS Compatibility Issues** - 75% of CVs are rejected by Applicant Tracking Systems
3. **Generic Content** - Most CVs lack compelling, achievement-focused language

## 💡 Our Solution

AI CV Builder revolutionizes CV creation with:

- **AI-Powered Writing Assistant** - Generate professional content with one click
- **ATS-Optimized Templates** - Pre-designed formats that pass screening systems
- **Real-Time Preview** - See your CV update instantly as you type
- **Smart Customization** - Color themes and template options for personal branding
- **One-Click Export** - Download print-ready PDFs immediately

## ✨ Key Features

### 🤖 Intelligent AI Assistant
- Context-aware suggestions for each CV section
- Professional phrasing and achievement-focused language
- Quick action buttons for common enhancements
- Continuous conversation support

### 📝 Comprehensive CV Builder
- **7 Essential Sections**: Personal Info, Experience, Education, Skills, Certifications, Projects, Links
- **Dynamic Form Fields**: Add multiple entries for experience, education, and projects
- **Real-Time Preview**: See changes instantly in the live preview panel
- **Auto-Save**: Never lose your progress with automatic localStorage backup

### 🎨 Professional Templates
- **7 Beautiful Designs**: Modern, Professional, Minimal, Traditional, Chronological, Functional, Combination
- **Customizable Colors**: Primary, secondary, and accent color pickers
- **ATS-Friendly Formatting**: Optimized for Applicant Tracking Systems
- **Responsive Design**: Perfect on desktop, tablet, and mobile

### 💾 Export & Save
- **PDF Export**: Print-ready PDFs with one click (Ctrl+P or Export button)
- **Progress Saving**: Manual and automatic save to localStorage
- **Design Persistence**: Saved colors and template preferences

### 📱 Mobile-First Design
- Fully responsive layout for all screen sizes
- Touch-friendly buttons and inputs
- Mobile preview panel with smooth animations
- Collapsible sections for better mobile UX

### 🔐 Secure User Authentication
- **Google Sign-In**: Use your Google account to save and access CVs
- **Protected Routes**: Only authenticated users can access CV builder and dashboard
- **Session Management**: Secure session handling with JWT tokens

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Google Cloud Platform account (for authentication)

### Installation

1. **Clone or Download the Project**
   ```bash
   # If you have the ZIP file
   unzip ai-cv-builder.zip
   cd ai-cv-builder
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set Up Google Authentication**
   
   Follow the detailed guide in [AUTH_SETUP.md](./AUTH_SETUP.md) or quick setup:
   
   a. Create a Google Cloud project at [console.cloud.google.com](https://console.cloud.google.com/)
   
   b. Enable Google OAuth and create credentials
   
   c. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   d. Add your credentials to `.env.local`:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-generated-secret
   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```
   
   e. Generate NEXTAUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### 1. **Sign In with Google**
   - Click "Login" in the navigation bar
   - Sign in with your Google account
   - You'll be redirected to the CV Builder

### 2. **Navigate to Builder**
   - Click "Start Building" on the homepage or "Build CV" in the navigation

### 3. **Fill Your Information**
   - Select a section from the left sidebar (Personal Info, Experience, etc.)
   - Fill in the form fields - all inputs update the preview in real-time
   - Use "Add Another" buttons to add multiple entries for Experience, Education, etc.

### 4. **Enhance with AI**
   - Click the chatbot button (bottom-right corner)
   - Ask the AI to enhance any section: "Enhance my experience" or "Improve my skills"
   - Use quick action buttons for common enhancements

### 5. **Save Your CV**
   - Click "Save Progress" to save to your account (requires sign-in)
   - Your CVs are stored in your account and accessible from any device
   - Access all saved CVs from the Dashboard

### 6. **Export Your CV**
   - Click "Download CV" above the preview to generate a PDF
   - Click "Export PDF" in the top toolbar for quick access
   - PDFs preserve all formatting and colors

### 7. **Customize Design**
   - Open "Design Settings" in the preview panel
   - Choose from 7 professional templates (Modern, Professional, Minimal, Traditional, Chronological, Functional, Combination)
   - Customize colors with the color pickers
   - Click "Save Design" to persist your preferences

### 8. **Fullscreen Preview**
   - Use the fullscreen button (desktop) for a larger preview
   - Adjust preview size to your preference

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: shadcn/ui
- **Authentication**: NextAuth.js v5 with Google OAuth
- **Storage**: LocalStorage (client-side) + Account-based persistence
- **PDF Export**: html2pdf.js
- **AI**: Mock AI responses (no API keys needed for demo)

## 📂 Project Structure

```
ai-cv-builder/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── builder/page.tsx         # CV builder page
│   ├── dashboard/page.tsx       # User dashboard
│   ├── templates/page.tsx       # Templates showcase
│   ├── contact/page.tsx         # Contact page
│   ├── api/auth/[...nextauth]/  # NextAuth API routes
│   └── layout.tsx               # Root layout with SessionProvider
├── components/
│   ├── navbar.tsx               # Navigation bar with auth
│   ├── login-modal.tsx          # Google Sign-In modal
│   ├── chatbot.tsx              # AI assistant
│   ├── section-editor.tsx       # Form editor
│   ├── template-selector.tsx    # Template chooser
│   ├── onboarding-overlay.tsx   # User onboarding
│   ├── templates/               # CV templates
│   │   ├── template-modern.tsx
│   │   ├── template-professional.tsx
│   │   ├── template-minimal.tsx
│   │   ├── template-traditional.tsx
│   │   ├── template-chronological.tsx
│   │   ├── template-functional.tsx
│   │   └── template-combination.tsx
│   └── ui/                      # shadcn components
├── hooks/
│   └── useOnboarding.ts         # Onboarding logic
├── lib/
│   ├── AISimulator.js           # Mock AI functions
│   └── auth-context.tsx         # Auth state management
├── auth.ts                      # NextAuth configuration
└── types/
    └── next-auth.d.ts           # NextAuth type definitions
```

## 🎨 Features Breakdown

### ✅ Fully Implemented
- 🔐 **Real Google Authentication** via NextAuth.js
- 💾 **Account-Based Storage** - Save CVs to your account
- 📊 **User Dashboard** - Access all saved CVs
- ✨ AI chatbot with context-aware responses
- 📝 All 7 CV sections with full CRUD operations
- 🎨 7 professional templates with customization
- 💾 Auto-save and manual save functionality
- 📄 **Real PDF export** with html2pdf.js (no print dialog)
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎯 Real-time preview updates
- 🎨 Color customization with persistence
- 🚀 Onboarding walkthrough for new users
- 🔒 Protected routes for authenticated users

### 🎯 Demo Features (For Hackathon)
- AI responses use mock data (no API required)
- CV data stored with user accounts via localStorage

## 🌟 Future Enhancements

- [ ] Cloud database integration (Supabase/Firebase)
- [ ] Real AI integration (OpenAI GPT, Anthropic Claude)
- [ ] Job matching algorithm
- [ ] Multiple CV versions management
- [ ] LinkedIn profile import
- [ ] Cover letter generator
- [ ] ATS score checker
- [ ] Export to Word format
- [ ] Share CV via unique link
- [ ] Analytics dashboard
- [ ] Team collaboration features
- [ ] CV templates marketplace

## 🔐 Authentication & Security

This app uses **NextAuth.js v5** with Google OAuth for secure authentication:

- ✅ Industry-standard OAuth 2.0 flow
- ✅ Secure session management with JWT
- ✅ Protected API routes
- ✅ CSRF protection built-in
- ✅ Secure cookie handling

**Important Security Notes:**
- Never commit `.env.local` to version control
- Rotate NEXTAUTH_SECRET regularly in production
- Use HTTPS in production (automatic with Vercel)
- Keep Google OAuth credentials confidential

See [AUTH_SETUP.md](./AUTH_SETUP.md) for complete setup instructions.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository

3. **Configure Environment Variables**
   
   In Vercel project settings → Environment Variables, add:
   - `NEXTAUTH_URL`: Your Vercel URL (e.g., `https://your-app.vercel.app`)
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `GOOGLE_CLIENT_ID`: From Google Cloud Console
   - `GOOGLE_CLIENT_SECRET`: From Google Cloud Console

4. **Update Google OAuth Settings**
   
   In Google Cloud Console, add your Vercel URL:
   - Authorized JavaScript origins: `https://your-app.vercel.app`
   - Authorized redirect URIs: `https://your-app.vercel.app/api/auth/callback/google`

5. **Deploy**
   - Vercel will automatically deploy your app
   - Your app will be live at `https://your-app.vercel.app`

## 🐛 Troubleshooting

### Authentication Issues

**"Missing GOOGLE_CLIENT_ID" error:**
- Ensure `.env.local` exists in project root
- Verify environment variable names match exactly
- Restart dev server after adding variables

**"Redirect URI mismatch" error:**
- Check authorized redirect URIs in Google Cloud Console
- Format must be exact: `http://localhost:3000/api/auth/callback/google`
- No trailing slashes

**Session not persisting:**
- Verify NEXTAUTH_SECRET is set
- Clear browser cookies and try again
- Check NEXTAUTH_URL matches current URL

### PDF Export Issues

**"PDF download failed" error:**
- This usually indicates unsupported CSS properties
- The app automatically converts colors to compatible formats
- Try a different browser if issues persist

**PDF formatting looks different:**
- PDF export uses html2pdf.js which may render slightly differently
- For best results, use Chrome or Edge browsers

See [AUTH_SETUP.md](./AUTH_SETUP.md) for more troubleshooting tips.

## 👥 Team

Built with ❤️ for the hackathon by passionate developers who believe in making job hunting easier for everyone.

## 📄 License

MIT License - feel free to use this project for your own purposes!

## 🙏 Acknowledgments

- Icons from Heroicons
- UI components from shadcn/ui
- Inspiration from modern CV builders and design systems

---

**Live Demo**: [Your Deployment URL Here]

**Hackathon**: [Hackathon Name & Date]

**Made with Next.js and lots of coffee ☕**
