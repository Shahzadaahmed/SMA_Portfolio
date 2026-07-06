# Muhammad Haris - Professional Portfolio Website

A modern, responsive portfolio website built with Next.js 14, React, TypeScript, TailwindCSS, and Framer Motion. Features stunning 3D animations, smooth transitions, and a complete contact form system.

![Portfolio Preview](./public/og-image.png)

## 🌟 Features

- ✨ **Modern 3D Design** - Eye-catching 3D elements and animations
- 📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile devices
- ⚡ **Blazing Fast** - Optimized with Next.js 14 App Router
- 🎨 **Smooth Animations** - Framer Motion powered transitions
- 📧 **Working Contact Form** - EmailJS integration for direct messaging
- 📄 **PDF Resume Generator** - Download resume with one click
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and structured data
- ♿ **Accessible** - WCAG compliant with semantic HTML
- 🎯 **Performance Focused** - 90+ Lighthouse scores

## 🚀 Live Demo

Visit the live site: [https://mharis404.github.io/portfolio/](https://mharis404.github.io/portfolio/)

## 📋 Sections

- **Hero** - Dynamic typing animation with social links
- **About** - Personal introduction and contact information
- **Skills** - Technical skills with animated cards (45+ technologies)
- **Experience** - Professional timeline with detailed role descriptions
- **Education** - Academic credentials and certifications
- **Projects** - Featured work with live demos
- **Contact** - Multi-channel contact options with working form

## 🛠️ Built With

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **3D Graphics:** Three.js, React Three Fiber
- **Forms:** EmailJS
- **PDF Generation:** jsPDF
- **Icons:** React Icons
- **Deployment:** GitHub Pages / Vercel

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/MHaris404/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure EmailJS** (for contact form)
   
   Create an account at [EmailJS](https://www.emailjs.com/)
   
   Update the credentials in `components/Contact.tsx`:
   ```typescript
   const serviceID = 'YOUR_SERVICE_ID';
   const templateID = 'YOUR_TEMPLATE_ID';
   const userID = 'YOUR_USER_ID';
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Update Personal Information

Edit `data/portfolio-data.ts` to update:
- Personal details (name, email, phone, location)
- Biography
- Social media links
- Work experience
- Education history
- Skills
- Projects

### Modify Styling

- **Colors:** Update `tailwind.config.js` theme colors
- **Fonts:** Change font imports in `app/globals.css`
- **Animations:** Modify Framer Motion variants in components

### Add New Sections

1. Create component in `components/` directory
2. Import and add to `app/page.tsx`
3. Add navigation link in `components/Navigation.tsx`

## 📧 Contact Form Setup

### EmailJS Configuration

1. Create account at [emailjs.com](https://www.emailjs.com/)
2. Create email service (Gmail, Outlook, etc.)
3. Create email template with variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Message content
   - `{{to_email}}` - Your email
4. Get Service ID, Template ID, and User ID
5. Update in `components/Contact.tsx`

### Alternative: Direct Email Links

The contact section also includes direct email and WhatsApp links that work without EmailJS configuration.

## 📄 PDF Resume Generation

The PDF generator creates a formatted resume from your portfolio data:

```typescript
import { generateResumePDF } from '@/utils/generatePDF';

// Call this function to generate and download PDF
generateResumePDF();
```

Add a button component that triggers this function, or link directly to your Google Drive resume.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Configure build settings (auto-detected)
4. Deploy

### Deploy to GitHub Pages

1. Update `next.config.js`:
   ```javascript
   const nextConfig = {
     output: 'export',
     basePath: '/portfolio',
     images: {
       unoptimized: true,
     },
   }
   ```

2. Build and export:
   ```bash
   npm run build
   ```

3. Push to `gh-pages` branch

### Deploy to Netlify

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance

- **Lighthouse Score:** 95+
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Total Bundle Size:** < 200KB (gzipped)

## 🔒 Security

- No sensitive data in client-side code
- EmailJS for secure form submission
- Environment variables for API keys
- HTTPS enforced in production

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Muhammad Haris**
- LinkedIn: [@mharis404](https://linkedin.com/in/mharis404)
- GitHub: [@mharis404](https://github.com/mharis404)
- Email: mharis.ksasen@gmail.com

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- Icons from React Icons
- Animations powered by Framer Motion
- 3D graphics with Three.js

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support or questions:
- Create an issue on GitHub
- Email: mharis.ksasen@gmail.com
- LinkedIn: [Muhammad Haris](https://linkedin.com/in/mharis404)

---

**Made with ❤️ by Muhammad Haris**

*Keep Rising 🚀*
