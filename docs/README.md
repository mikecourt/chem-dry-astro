# Brimley's White Glove Chem-Dry Website

> High-converting, SEO-optimized local business website built with Astro

![License](https://img.shields.io/badge/license-Proprietary-red)
![Astro](https://img.shields.io/badge/Astro-4.16-blue)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## 🎯 Project Goals

This website is built following the optimization strategy from [this tutorial](https://www.youtube.com/watch?v=gWNFna6fgS8) to achieve:

1. **High Conversion Rate**: Every element guides visitors toward booking
2. **Top Search Rankings**: Optimized for local SEO and high-intent keywords
3. **Fast Performance**: 90+ PageSpeed score on mobile and desktop
4. **Brand Compliance**: Strict adherence to Chem-Dry brand guidelines

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
chem-dry-site/
├── src/
│   ├── components/       # Reusable Astro components
│   ├── layouts/          # Page layouts
│   ├── pages/            # File-based routing
│   └── styles/           # Global styles & design system
├── public/               # Static assets
├── design-tokens.json    # Design system values
└── IMPLEMENTATION-SUMMARY.md  # Detailed implementation guide
```

## 📚 Documentation

- **[Implementation Summary](./IMPLEMENTATION-SUMMARY.md)**: Quick start & next steps
- **[Design System Guide](./DESIGN-SYSTEM-GUIDE.md)**: Complete design system documentation
- **[City Page Guide](./city-page-customization-guide.md)**: How to create city-specific pages

## 🎨 Design System

The project includes a comprehensive design system with:

- ✅ Chem-Dry brand colors
- ✅ Responsive typography (Poppins + Inter)
- ✅ Pre-built components (buttons, cards, forms)
- ✅ Utility classes
- ✅ Animation system
- ✅ Mobile-first approach

## 🔧 Tech Stack

- **Framework**: [Astro 4.16](https://astro.build)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com) + Custom CSS
- **Fonts**: Google Fonts (Poppins, Inter)
- **Deployment**: Vercel (planned)
- **Version Control**: GitHub

## 📊 SEO Features

- ✅ Semantic HTML structure
- ✅ Schema.org markup (LocalBusiness, Service)
- ✅ Optimized meta tags
- ✅ OpenGraph tags
- ✅ XML sitemap (to be generated)
- ✅ robots.txt
- ✅ Fast page loads
- ✅ Mobile-responsive

## 🚀 Deployment (Vercel)

### Step 1: GitHub Setup
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/chem-dry-site.git
git push -u origin main
```

### Step 2: Vercel Deployment
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Astro
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click "Deploy"

### Step 3: Custom Domain
1. In Vercel dashboard, go to "Settings" → "Domains"
2. Add `whiteglovecarpet.com`
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

## 📈 Performance Targets

- **PageSpeed Mobile**: 90+
- **PageSpeed Desktop**: 95+
- **Accessibility**: 95+
- **SEO Score**: 100
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## 🎯 Keyword Strategy

### Primary Keywords
- "carpet cleaning [city]"
- "[city] carpet cleaning"
- "carpet cleaners [city]"
- "professional carpet cleaning [city]"

### Service Keywords
- "pet urine removal [city]"
- "upholstery cleaning [city]"
- "tile and grout cleaning [city]"
- "area rug cleaning [city]"

### Long-tail Keywords
- "best carpet cleaning company in [city]"
- "emergency carpet cleaning [city]"
- "same day carpet cleaning [city]"
- "green carpet cleaning [city]"

## 📋 To-Do List

### Phase 1: Complete Setup ✅
- [x] Install dependencies
- [x] Create design system
- [x] Build base layout
- [x] Create hero component
- [x] Build homepage

### Phase 2: Content & Assets
- [ ] Add real business information
- [ ] Replace placeholder images
- [ ] Convert images to WebP
- [ ] Add company logo
- [ ] Create favicon
- [ ] Write testimonials

### Phase 3: City Pages
- [ ] Create Mesa page
- [ ] Create Gilbert page
- [ ] Create Chandler page
- [ ] Create Tempe page
- [ ] Create Scottsdale page
- [ ] Create Glendale page
- [ ] Create Peoria page
- [ ] Create Queen Creek page

### Phase 4: Service Pages
- [ ] Carpet cleaning page
- [ ] Upholstery cleaning page
- [ ] Pet urine removal page
- [ ] Tile & grout page
- [ ] Area rug cleaning page

### Phase 5: Technical SEO
- [ ] Generate XML sitemap
- [ ] Set up Google Search Console
- [ ] Create Google Business Profile
- [ ] Implement internal linking
- [ ] Run PageSpeed audit
- [ ] Fix performance issues

### Phase 6: Deploy
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Connect Vercel
- [ ] Configure domain
- [ ] Test production build
- [ ] Enable automatic deployments

### Phase 7: Marketing
- [ ] Set up Google Analytics
- [ ] Create content calendar
- [ ] Start blog
- [ ] Get reviews
- [ ] Monitor rankings
- [ ] A/B test CTAs

## 🤝 Contributing

This is a proprietary project for Brimley's White Glove Chem-Dry. 

## 📄 License

Proprietary - All Rights Reserved

© 2025 Brimley's White Glove Chem-Dry

---

## 🆘 Support

For questions or issues:
1. Check [Implementation Summary](./IMPLEMENTATION-SUMMARY.md)
2. Review [Design System Guide](./DESIGN-SYSTEM-GUIDE.md)
3. Consult [City Page Guide](./city-page-customization-guide.md)
4. Check Astro docs: https://docs.astro.build

## 🎉 Credits

- **Framework**: Astro
- **Design Inspiration**: Cleaner theme, HomeMaster template
- **Optimization Strategy**: Based on [this tutorial](https://www.youtube.com/watch?v=gWNFna6fgS8)
- **Brand Guidelines**: Chem-Dry Corporate

---

**Built with ❤️ for local business success**
