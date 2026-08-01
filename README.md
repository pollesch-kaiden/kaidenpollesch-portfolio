# Personal Portfolio Website

A personal portfolio website built with React, TypeScript, and Vite. Features a responsive design, dark/light theme support, and smooth animations.

Live at: https://v1.kaidenpollesch.com

## Tech Stack

- React 18, TypeScript
- Vite
- Tailwind CSS
- Radix UI (shadcn/ui)
- Framer Motion
- React Router DOM

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
git clone https://github.com/pollesch-kaiden/portfolio-v1
cd portfolio-v1
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Development Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run linting
```

## Project Structure

```
src/
├── components/
│   ├── sections/          # Main portfolio sections (Introduction, About, Projects, Experience, Contact)
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   ├── ProjectCard.tsx
│   ├── ProjectDetail.tsx
│   └── Sidebar.tsx
├── contexts/
│   └── ThemeContext.tsx
├── lib/
│   └── utils.ts
```

## Updating Content

- **Projects**: `src/components/sections/Projects.tsx` — edit the `mockProjects` array
- **Experience**: `src/components/sections/Experience.tsx` — edit the `mockExperiences` array
- **About/Intro/Contact**: edit the corresponding files in `src/components/sections/`
- **Resume**: `src/components/Resume.tsx`

## Deployment

This site is deployed to GitHub Pages via GitHub Actions on every push to `main`. The build output (`./dist`) is published to the `gh-pages` branch, which serves the custom domain `v1.kaidenpollesch.com` via a `CNAME` file in `/public`.

## License

MIT License © 2025 Kaiden Pollesch