# Customization Guide

This guide will help you customize the portfolio to make it your own.

## Quick Start Customization

### 1. Update Personal Information

Edit `data/portfolio-data.ts`:

```typescript
export const personalInfo = {
  name: "Your Name",
  title: "Your Professional Title",
  email: "your.email@example.com",
  phone: {
    ksa: "+966 XXX XXX XXX",
    pak: "+92 XXX XXX XXXX"
  },
  location: {
    current: "Your City, Country",
    origin: "Your Hometown"
  },
  bio: [
    "First paragraph about you...",
    "Second paragraph...",
  ],
  social: {
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
  },
};
```

### 2. Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#0ea5e9',  // Your primary color
  },
  accent: {
    DEFAULT: '#f97316',  // Your accent color
  },
}
```

### 3. Add Your Photo

Replace the placeholder in `components/Hero.tsx`:

```typescript
// Replace this div
<div className="w-full h-full flex items-center justify-center text-6xl">
  MH
</div>

// With an image
<Image
  src="/images/your-photo.jpg"
  alt="Your Name"
  fill
  className="object-cover"
/>
```

### 4. Update Projects

Add your projects to `data/portfolio-data.ts`:

```typescript
export const projects = [
  {
    title: "Your Project",
    description: "Description...",
    tags: ["React", "Node.js"],
    liveUrl: "https://your-project.com",
  },
];
```

## Advanced Customization

### Add New Section

1. Create component: `components/YourSection.tsx`
2. Import in `app/page.tsx`
3. Add to navigation in `components/Navigation.tsx`

### Modify Animations

Change animation duration in any component:

```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}  // Change this
>
```

### Change Fonts

Update `app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');
```

Then update `tailwind.config.js`:

```javascript
fontFamily: {
  display: ['Your Font', 'sans-serif'],
}
```

---

For more details, see component-specific comments in the code!
