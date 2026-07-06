# 🚀 Quick Start Guide

Get your portfolio up and running in 5 minutes!

## Prerequisites

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **Git** installed ([Download](https://git-scm.com/))
- Code editor (VS Code recommended)

## Step-by-Step Setup

### 1️⃣ Download or Clone

```bash
# Clone the repository
git clone https://github.com/MHaris404/portfolio.git
cd portfolio

# Or download ZIP and extract
```

### 2️⃣ Install Dependencies

```bash
npm install
```

This will install all required packages (~2-3 minutes).

### 3️⃣ Update Your Information

**Edit `data/portfolio-data.ts`:**

```typescript
// Change these to your details
export const personalInfo = {
  name: "Your Name",
  title: "Your Job Title",
  email: "your.email@example.com",
  // ... update other fields
};
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

### 5️⃣ Customize (Optional)

- **Colors:** Edit `tailwind.config.js`
- **Content:** Update `data/portfolio-data.ts`
- **Styling:** Modify `app/globals.css`

## What's Next?

### Setup Contact Form

See [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) for detailed instructions.

**Quick version:**
1. Create account at [emailjs.com](https://www.emailjs.com/)
2. Get Service ID, Template ID, and User ID
3. Update in `components/Contact.tsx`

### Deploy Your Site

**Easiest - Vercel (2 clicks):**

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

Done! Your site is live at `your-project.vercel.app`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for other options.

### Add Your Projects

Edit `data/portfolio-data.ts`:

```typescript
export const projects = [
  {
    title: "My Awesome Project",
    description: "What it does...",
    tags: ["React", "Node.js"],
    liveUrl: "https://project-url.com",
  },
];
```

### Add Your Photo

1. Add photo to `/public/images/profile.jpg`
2. Update `components/Hero.tsx`:

```typescript
<Image
  src="/images/profile.jpg"
  alt="Your Name"
  fill
  className="object-cover rounded-full"
/>
```

## Common Issues

### Port Already in Use

```bash
# Use different port
npm run dev -- -p 3001
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Check for TypeScript errors
npm run lint
```

## File Structure Overview

```
portfolio-website/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with SEO
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx     # Top navigation
│   ├── Hero.tsx          # Landing section
│   ├── About.tsx         # About section
│   ├── Skills.tsx        # Skills section
│   ├── Experience.tsx    # Work experience
│   ├── Education.tsx     # Education section
│   ├── Projects.tsx      # Projects showcase
│   ├── Contact.tsx       # Contact form
│   └── Footer.tsx        # Footer
├── data/                  # Data files
│   └── portfolio-data.ts  # YOUR CONTENT HERE
├── public/               # Static assets
│   ├── images/          # Your images
│   ├── skills/          # Skill icons
│   └── projects/        # Project images
├── utils/               # Utility functions
│   └── generatePDF.ts   # PDF generator
└── package.json         # Dependencies
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Need Help?

- 📖 Read [README.md](./README.md) for full documentation
- 📧 Check [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) for contact form
- 🚀 See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment
- 🎨 Read [CUSTOMIZATION.md](./CUSTOMIZATION.md) for styling

## Checklist

- [ ] Install Node.js 18+
- [ ] Clone/download project
- [ ] Run `npm install`
- [ ] Update personal info in `data/portfolio-data.ts`
- [ ] Add your projects
- [ ] Run `npm run dev` and check localhost:3000
- [ ] Setup EmailJS for contact form
- [ ] Add your images to `/public`
- [ ] Deploy to Vercel
- [ ] Share your new portfolio! 🎉

---

**You're all set! Start customizing and make it your own! 🚀**

*Any questions? Check the documentation files or create an issue on GitHub.*
