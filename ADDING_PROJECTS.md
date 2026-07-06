# Adding Your GitHub Projects

Your portfolio now supports **dynamic project loading** with enhanced media display including images and videos!

## Two Ways to Add Projects

### Method 1: Direct in Code (Simple)

Edit `data/portfolio-data.ts` and add projects to the array:

```typescript
export const projects = [
  {
    title: "Your Project Name",
    description: "Detailed description of what your project does",
    image: "/projects/project-screenshot.png",
    media: "/projects/project-demo.mp4", // Optional: video demo
    tags: ["React Native", "Firebase", "Redux"],
    liveUrl: "https://your-app-link.com",  // Optional
    githubUrl: "https://github.com/MHaris404/your-repo",
    featured: true,  // Show in featured section
    category: "mobile"  // For filtering: web, mobile, backend, ai, etc.
  },
  // Add more projects...
];
```

### Method 2: GitHub JSON File (Advanced - Auto-loading)

Create a file in your GitHub repo at:  
`https://github.com/MHaris404/portfolio/blob/main/projects/projects.json`

**Format:**
```json
[
  {
    "title": "Amazing Mobile App",
    "description": "A revolutionary mobile app that solves XYZ problem with cutting-edge technology.",
    "image": "https://raw.githubusercontent.com/MHaris404/portfolio/main/images/project1.png",
    "media": "https://raw.githubusercontent.com/MHaris404/portfolio/main/videos/demo.mp4",
    "tags": ["React Native", "Node.js", "MongoDB", "AWS"],
    "liveUrl": "https://apps.apple.com/app/your-app",
    "githubUrl": "https://github.com/MHaris404/amazing-app",
    "featured": true,
    "category": "mobile"
  },
  {
    "title": "Backend API Service",
    "description": "Scalable REST API with microservices architecture.",
    "image": "https://i.imgur.com/yourimage.png",
    "tags": ["Node.js", "Express", "Docker", "PostgreSQL"],
    "githubUrl": "https://github.com/MHaris404/api-service",
    "featured": false,
    "category": "backend"
  }
]
```

**The portfolio will automatically fetch and merge projects from this JSON file!**

## Media Support

### Images
- **Local**: Place in `/public/projects/` and reference as `/projects/image.png`
- **Remote**: Use full URLs like `https://i.imgur.com/abc123.png`
- **Formats**: PNG, JPG, WebP, GIF

### Videos
- **Local**: Place in `/public/projects/` and reference as `/projects/demo.mp4`
- **Remote**: Use full URLs like `https://raw.githubusercontent.com/user/repo/main/demo.mp4`
- **Formats**: MP4 (recommended), WebM
- **Features**: 
  - Hover to play (in grid view)
  - Full controls in modal
  - Autoplay with loop

### GIFs
- Works like images
- Shows animation automatically
- Perfect for short demos

## Project Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | string | ✅ Yes | Project name |
| `description` | string | ✅ Yes | What the project does |
| `tags` | array | ✅ Yes | Technologies used |
| `image` | string | ❌ No | Screenshot/thumbnail |
| `media` | string | ❌ No | Video or GIF demo |
| `liveUrl` | string | ❌ No | Live demo link |
| `githubUrl` | string | ❌ No | GitHub repository |
| `featured` | boolean | ❌ No | Show as featured (default: false) |
| `category` | string | ❌ No | For filtering (web/mobile/backend/ai) |

## Enhanced UI Features

### 1. **Interactive Cards**
- Hover effects with overlay
- Quick action buttons (Live, GitHub, View)
- Tag display with truncation

### 2. **Category Filtering**
- Auto-generates filters from project categories
- One-click filtering
- Smooth transitions

### 3. **Modal View**
- Click any project for detailed view
- Full-size media display
- Video controls
- All tags visible
- Action buttons

### 4. **Video Support**
- Grid: Hover to play preview
- Modal: Full controls with autoplay
- Mobile-optimized

## Quick Examples

### Mobile App Project
```typescript
{
  title: "Fitness Tracker Pro",
  description: "Complete fitness tracking app with workout plans, nutrition tracking, and social features.",
  image: "/projects/fitness-app.png",
  media: "/projects/fitness-demo.mp4",
  tags: ["React Native", "Firebase", "Redux", "HealthKit"],
  liveUrl: "https://apps.apple.com/app/fitness-tracker",
  githubUrl: "https://github.com/MHaris404/fitness-app",
  featured: true,
  category: "mobile"
}
```

### Web Application
```typescript
{
  title: "Dashboard Analytics",
  description: "Real-time analytics dashboard with customizable widgets and data visualization.",
  image: "/projects/dashboard.png",
  tags: ["Next.js", "TypeScript", "Chart.js", "PostgreSQL"],
  liveUrl: "https://dashboard-demo.vercel.app",
  githubUrl: "https://github.com/MHaris404/dashboard",
  featured: true,
  category: "web"
}
```

### Backend Service
```typescript
{
  title: "Payment Gateway API",
  description: "Secure payment processing API with multi-currency support and fraud detection.",
  tags: ["Node.js", "Express", "MongoDB", "Stripe", "Docker"],
  githubUrl: "https://github.com/MHaris404/payment-api",
  category: "backend"
}
```

## Adding Media Files

### Option 1: Local Files
1. Add files to `/public/projects/`
2. Reference as `/projects/filename.ext`

```bash
public/
├── projects/
│   ├── app1-screenshot.png
│   ├── app1-demo.mp4
│   ├── app2-screenshot.png
│   └── website-preview.gif
```

### Option 2: External Hosting

**Imgur** (Images):
1. Upload to [imgur.com](https://imgur.com)
2. Copy direct link
3. Use in `image` or `media` field

**GitHub** (Any file):
1. Upload to your repo
2. Get raw URL: `https://raw.githubusercontent.com/USER/REPO/main/file.ext`
3. Use in project

**YouTube** (Videos):
- Not directly supported in player
- Add link in description or use thumbnail

## Best Practices

1. **Image Size**: 800x600px or 1200x800px
2. **Video Length**: 10-30 seconds for demos
3. **File Size**: Keep under 10MB for web performance
4. **Format**: Use WebP for images, MP4 for videos
5. **Descriptions**: 2-3 sentences, focus on impact
6. **Tags**: 3-6 most relevant technologies
7. **Categories**: Be consistent (web, mobile, backend, ai, devtools)

## Troubleshooting

**Projects not loading from JSON?**
- Check file exists at the correct path
- Verify JSON is valid (use [jsonlint.com](https://jsonlint.com))
- Check browser console for errors

**Images not showing?**
- Verify file path is correct
- Check file exists in `/public/projects/`
- For external URLs, ensure CORS allows access

**Videos not playing?**
- Use MP4 format (best compatibility)
- Check file size (under 50MB recommended)
- Verify video codec (H.264 recommended)

## Next Steps

1. ✅ Add your actual projects
2. ✅ Take screenshots/record demos
3. ✅ Upload media files
4. ✅ Test locally with `npm run dev`
5. ✅ Push changes and deploy

---

**Your projects section now supports:**
- ✨ Dynamic loading from GitHub
- 🎬 Video demos
- 🖼️ Image galleries
- 🎯 Category filtering
- 📱 Modal details view
- 🎨 Smooth animations

Make your portfolio stand out with rich media! 🚀
