# SPECTRA Portal

Official website for SPECTRA — Modular AI-powered data pipelines for Microsoft Fabric.

## Features

### 🎨 User Experience
- **Responsive Design**: Mobile-first responsive layout
- **Clean UI**: Modern, branded interface
- **Static Performance**: Fast loading static site
- **GitHub Pages Compatible**: Optimized for static hosting

### 🌐 Content Pages
- **Home**: Introduction to SPECTRA and its capabilities
- **About**: Company information and mission
- **Vision**: Strategic direction and goals
- **Strategic Plan**: Detailed roadmap and objectives
- **Contact**: Contact information and form
- **Dashboard**: Preview of upcoming user portal features
- **Login**: Information about future authentication features

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Visit the application**:
   - Home page: `http://localhost:4321`
   - All pages are publicly accessible
   - No authentication required

## Project Structure

```
src/
├── pages/
│   ├── index.astro         # Home page
│   ├── login.astro         # Login info page
│   ├── dashboard.astro     # Dashboard preview page
│   ├── about.astro         # About page
│   ├── contact.astro       # Contact page
│   ├── vision.astro        # Vision page
│   └── strategic-plan.astro # Strategic plan page
├── components/
│   ├── heroSection.astro   # Hero section component
│   └── featureList.astro   # Feature list component
└── styles/
    └── spectra.colors.js   # Color scheme configuration

astro.config.mjs            # Astro configuration
```

## Development Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Technology Stack

- **Framework**: Astro 5.x with static site generation
- **Styling**: Tailwind CSS
- **Hosting**: GitHub Pages
- **Deployment**: Automated via GitHub Actions

## Deployment

This site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch. The static build is optimized for the custom domain `spectradatasolutions.com`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the build locally
5. Submit a pull request