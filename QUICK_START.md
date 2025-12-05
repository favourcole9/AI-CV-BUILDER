# Quick Start Guide - AI CV Builder

## For Judges & Reviewers

### Instant Demo (No Setup)

1. **Open the live demo**: [Your Deployment URL]
2. **Click "Start Building"**
3. **See the magic happen!**

That's it! No API keys, no sign-up, no configuration needed.

---

## For Developers

### 1-Minute Setup

\`\`\`bash
# Clone the repository
git clone [your-repo-url]
cd ai-cv-builder

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
\`\`\`

**That's it!** No environment variables, no database setup, no API configuration.

---

## Feature Walkthrough

### Try These in Order:

1. **Fill Personal Info** (30 seconds)
   - Click "Personal Info" in sidebar
   - Enter your name, email, phone
   - Watch preview update in real-time ✨

2. **Add Work Experience** (1 minute)
   - Click "Experience" section
   - Fill in job details
   - Click AI enhance button below description
   - See professional content generated 🤖

3. **Switch Templates** (15 seconds)
   - Scroll to template selector
   - Click Modern → Professional → Minimal
   - Preview updates instantly 🎨

4. **Customize Colors** (30 seconds)
   - Open "Design Settings"
   - Change primary color to blue
   - Change accent to purple
   - Click "Save Design" 💾

5. **Export PDF** (10 seconds)
   - Click "Export PDF" button
   - Print dialog opens
   - Save as PDF ✅

6. **Chat with AI** (1 minute)
   - Click chatbot button (bottom-right)
   - Type "enhance my experience"
   - Get professional suggestions 💬

---

## Sample Data for Quick Demo

Copy-paste these for a fast demo:

**Personal Info:**
\`\`\`
Name: Alex Johnson
Email: alex.johnson@email.com
Phone: +1 (555) 123-4567
Address: San Francisco, CA
Summary: Results-driven software engineer with 5+ years of experience building scalable web applications. Expert in React, Node.js, and cloud infrastructure. Passionate about creating user-centric solutions.
\`\`\`

**Experience:**
\`\`\`
Job Title: Senior Software Engineer
Company: Tech Solutions Inc.
Start: January 2020
End: Present
Description: Led development of microservices architecture serving 1M+ users. Improved system performance by 40% through optimization. Mentored team of 5 junior developers.
\`\`\`

**Skills:**
\`\`\`
React, TypeScript, Node.js, AWS, Docker, PostgreSQL, GraphQL, CI/CD
\`\`\`

---

## Keyboard Shortcuts

- `Ctrl/Cmd + P` - Export to PDF
- `Ctrl/Cmd + S` - Save progress (auto-saves already)
- `Esc` - Close modals/overlays
- `Tab` - Navigate between form fields

---

## Troubleshooting

### Preview not updating?
- Refresh the page (F5)
- Clear localStorage: `localStorage.clear()` in console

### PDF export not working?
- Use Chrome or Edge (best support)
- Ctrl+P / Cmd+P also works

### Chatbot not responding?
- Check console for errors
- Refresh page

---

## Tech Stack Overview

- **Framework**: Next.js 16 (App Router, React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Library**: shadcn/ui
- **State**: React Hooks (useState)
- **Storage**: localStorage
- **AI**: Mock responses (demo)

---

## Project Structure

\`\`\`
ai-cv-builder/
├── app/                    # Next.js pages
│   ├── page.tsx           # Landing page
│   ├── builder/           # CV builder
│   ├── templates/         # Templates showcase
│   └── contact/           # Contact form
├── components/            # React components
│   ├── navbar.tsx
│   ├── chatbot.tsx
│   ├── section-editor.tsx
│   └── templates/         # CV templates
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities
└── public/               # Static assets
\`\`\`

---

## What Makes This Special?

✨ **Zero Configuration** - Works out of the box
🎨 **Beautiful Design** - Glassmorphism with gradients
🤖 **AI-Enhanced** - Smart content suggestions
📱 **Fully Responsive** - Works on all devices
⚡ **Real-Time Preview** - Instant updates
🎯 **ATS-Friendly** - Templates designed to pass screening
💾 **Auto-Save** - Never lose your work
📄 **One-Click Export** - PDF ready in seconds

---

## Demo Script (30 seconds)

"Hi! This is AI CV Builder. Watch as I create a professional CV in under a minute..."

1. Type name → Preview updates instantly
2. Click AI enhance → Professional content appears
3. Switch template → New design instantly
4. Export PDF → Done!

"That's how easy it is to create an ATS-friendly CV with AI!"

---

## Questions?

**Q: Does this need an internet connection?**
A: No! Works completely offline after initial load.

**Q: Where is my data stored?**
A: Locally in your browser. Nothing sent to servers.

**Q: Is the AI real?**
A: Demo uses mock responses. Production would use OpenAI/Claude API.

**Q: Can I use this for my actual job search?**
A: The CVs are professional and ATS-friendly.

---

## Next Steps

1. ⭐ Star the repository
2. 🚀 Deploy to Vercel (takes 2 minutes)
3. 📱 Share with friends
4. 💼 Use for your job applications!

---

**Built with ❤️ for the hackathon**

**Live Demo**: [Your URL]
**GitHub**: [Your Repo]
**Contact**: [Your Email]
