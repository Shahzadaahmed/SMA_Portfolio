# Deployment Guide

This guide covers different deployment options for your portfolio website.


## Option 1: Vercel (Recommended - Easiest)

Vercel is the company behind Next.js and offers the best integration.

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Configure Environment Variables** (if using EmailJS)
   - Go to Project Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
     - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
     - `NEXT_PUBLIC_EMAILJS_USER_ID`

4. **Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Automatic Deployments

Every push to your main branch automatically deploys to production!

---

## Option 2: GitHub Pages

Free hosting directly from your GitHub repository.

### Steps:

1. **Update next.config.js**
   ```javascript
   const nextConfig = {
     output: 'export',
     basePath: '/portfolio',
     images: {
       unoptimized: true,
     },
   }
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy to gh-pages**
   ```bash
   # Install gh-pages
   npm install -g gh-pages
   
   # Deploy
   gh-pages -d out
   ```

4. **Configure GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages / root
   - Save

5. **Access your site**
   - URL: `https://YOUR_USERNAME.github.io/portfolio/`

### Automated Deployment with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

---

## Option 3: Netlify

Another excellent option with great performance.

### Steps:

1. **Push to GitHub** (if not already done)

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click "Deploy"

4. **Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add EmailJS credentials

5. **Custom Domain**
   - Site Settings → Domain Management
   - Add custom domain

---

## Option 4: AWS Amplify

For AWS ecosystem integration.

### Steps:

1. **Push to GitHub**

2. **AWS Amplify Console**
   - Go to AWS Amplify Console
   - Click "New App" → "Host web app"
   - Connect to GitHub
   - Select repository and branch

3. **Build Settings** (Auto-detected for Next.js)
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

4. **Deploy**

---

## Option 5: Docker + Cloud Run / ECS

For containerized deployments.

### Create Dockerfile:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Deploy to Google Cloud Run:

```bash
# Build and push
gcloud builds submit --tag gcr.io/PROJECT_ID/portfolio

# Deploy
gcloud run deploy portfolio \
  --image gcr.io/PROJECT_ID/portfolio \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## Post-Deployment Checklist

After deploying to any platform:

- [ ] Test all navigation links
- [ ] Verify contact form works
- [ ] Check responsive design on mobile
- [ ] Test PDF resume download
- [ ] Verify all social links work
- [ ] Check SEO meta tags (view page source)
- [ ] Test page load speed (Google PageSpeed Insights)
- [ ] Set up custom domain (optional)
- [ ] Configure SSL certificate (usually automatic)
- [ ] Submit sitemap to Google Search Console

---

## Performance Optimization

### Enable CDN (Automatic on Vercel/Netlify)

### Image Optimization
- Use Next.js Image component
- Serve WebP format
- Lazy load images

### Code Splitting
- Already optimized by Next.js
- Dynamic imports for heavy components

### Caching
- Configure headers in `next.config.js`

```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ]
}
```

---

## Monitoring

### Analytics Options:

1. **Vercel Analytics** (Built-in on Vercel)
2. **Google Analytics**
   - Add tracking code to `app/layout.tsx`
3. **Plausible** (Privacy-friendly)
4. **Fathom Analytics**

### Error Tracking:

1. **Sentry**
2. **LogRocket**
3. **Bugsnag**

---

## Troubleshooting

### Build Failures

**Issue:** Module not found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue:** Environment variables not working
- Ensure variables start with `NEXT_PUBLIC_` for client-side
- Rebuild after adding variables

### Deployment Issues

**GitHub Pages:** Images not loading
- Check `basePath` in `next.config.js`
- Ensure `images.unoptimized: true`

**Vercel:** Function timeout
- Optimize heavy computations
- Use incremental static regeneration

---

## Support

For deployment issues:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Netlify: [answers.netlify.com](https://answers.netlify.com)
- GitHub Pages: [GitHub Docs](https://docs.github.com/pages)

---

**Choose the deployment option that best fits your needs. Vercel is recommended for the best Next.js experience!**
