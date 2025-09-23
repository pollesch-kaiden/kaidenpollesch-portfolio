# Personal Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite. Features a clean design with dark/light theme support and smooth animations.

## 🚀 Live Demo



## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Maintenance Guide](#maintenance-guide)
  - [Updating Projects](#updating-projects)
  - [Updating Experience](#updating-experience)
  - [Creating New Project Pages](#creating-new-project-pages)
  - [Updating Personal Information](#updating-personal-information)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Automatic theme switching based on user preference
- **Smooth Animations**: Framer Motion animations and transitions
- **Project Showcase**: Detailed project cards with filtering capabilities
- **Experience Timeline**: Professional experience with company grouping
- **Contact Form**: Integrated contact section
- **Resume Integration**: Downloadable resume functionality
- **SEO Optimized**: Meta tags and semantic HTML structure

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (shadcn/ui)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Routing**: React Router DOM


## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📝 Maintenance Guide

### Updating Projects

To add, edit, or remove projects from your portfolio:

1. **Location**: Open `src/components/sections/Projects.tsx`
2. **Find the data**: Look for the `mockProjects` array (around line 18)
3. **Project structure**:
```typescript
{
  id: "unique-id",
  title: "Project Name",
  description: "Brief description for the card",
  image: "/uploads/projectPics/PROJECT/PIC.png",
  images: [
   "/uploads/projectPics/PROJECT/PIC1.png",
   "/uploads/projectPics/PROJECT/PIC2.png",
   "/uploads/projectPics/PROJECT/PIC2.png",
  ],//Optional if a slideshow/carousel of images is wanted
  skills: ["React", "Node.js", "MongoDB"],
  type: "personal" | "school",
  githubUrl: "https://github.com/username/repo", // Optional
  liveUrl: "https://your-project.com", // Optional
  fullDescription: "Detailed description for project detail page",
  features: ["Feature 1", "Feature 2", "Feature 3"],
  featured: true, // Optional - marks project as featured
  createdAt: "2024-01-15" // Optional - used for sorting (YYYY-MM-DD format)
}
```

4. **Adding a new project**:
   - Copy an existing project object
   - Update all fields with your project information
   - Ensure the `id` is unique
   - Add it to the `mockProjects` array
   - Set `createdAt` to the project creation date for proper sorting

5. **Managing Featured Projects**:
   - **Making a project featured**: Add `featured: true` to the project object
   - **Removing featured status**: Remove the `featured` property or set it to `false`
   - **Featured project display**: Featured projects automatically appear at the top with a gradient "Featured" tag
   - **Current featured projects**: Fitness Tracking App, University Course Scheduler, and Weather Dashboard
   - **Featured project styling**: Uses a purple-blue gradient outline that's defined in `tailwind.config.js`

6. **Project Ordering**:
   - Projects are automatically sorted with featured projects first
   - Within each group (featured/non-featured), projects are sorted by creation date (newest first)
   - Use the `createdAt` field in YYYY-MM-DD format for proper chronological sorting

7. **Image recommendations**:
   - Use Unsplash for high-quality images: `https://images.unsplash.com/photo-[ID]?w=800&q=80`
   - Maintain consistent aspect ratios
   - Optimize for web (800px width, 80% quality)

### Updating Experience

To modify your work experience:

1. **Location**: Open `src/components/sections/Experience.tsx`
2. **Find the data**: Look for the `mockExperiences` array (around line 25)
3. **Experience structure**:
```typescript
{
  id: "unique-id",
  company: "Company Name",
  position: "Job Title",
  location: "City, State/Country",
  startDate: "M(Abbreviation) YYYY",
  endDate: "Present" OR "M(Abbreviation) YYYY",
  description: "Detailed description of your role and achievements",
  skills: ["Skill 1", "Skill 2", "Skill 3"],
  logo: "/uploads/employeerLogos/LOGO.jpg",
  companyUrl: "https://company-website.com" // Optional
}
```

4. **Tips for experience entries**:
   - Use action verbs in descriptions
   - Include quantifiable achievements when possible
   - Keep skills relevant to the position
   - Use "Present" for current positions

### Creating New Project Pages

The portfolio automatically generates detailed project pages. To customize them:

1. **Automatic generation**: Project detail pages are created automatically from the project data
2. **Customization**: Edit `src/components/ProjectDetail.tsx` to modify the layout
3. **Required fields for detail pages**:
   - `fullDescription`: Detailed project description
   - `features`: Array of key features
   - `skills`: Technologies used
   - `githubUrl` and/or `liveUrl`: Links to code and live demo

### Updating Personal Information

#### Contact Information
1. **Location**: `src/components/sections/Contact.tsx`
2. **Update**: Email, phone, social media links

#### Introduction Section
1. **Location**: `src/components/sections/Introduction.tsx`
2. **Update**: Name, title, bio, profile image

#### About Section
1. **Location**: `src/components/sections/About.tsx`
2. **Update**: Personal story, skills, interests

#### Resume
1. **Location**: `src/components/Resume.tsx`
2. **Update**: Resume content and download link

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/          # Main portfolio sections
│   │   ├── Introduction.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx   # 📝 Update projects here
│   │   ├── Experience.tsx # 📝 Update experience here
│   │   └── Contact.tsx
│   ├── ui/               # Reusable UI components
│   ├── ProjectCard.tsx   # Individual project cards
│   ├── ProjectDetail.tsx # Project detail pages
│   ├── Sidebar.tsx       # Desktop navigation
│   └── ...
├── contexts/
│   └── ThemeContext.tsx  # Theme management
├── lib/
│   └── utils.ts          # Utility functions
└── styles/
    └── globals.css       # Global styles
```

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color',
        // ... other shades
      }
    }
  }
}
```

### Fonts
Update fonts in `src/index.css` or add new Google Fonts in `index.html`.

### Layout
Modify component layouts in their respective files under `src/components/`.

## 🚀 Deployment

### Building for Production
```bash
npm run build
```

### Deployment Options

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automatic deployment

## 🔧 Troubleshooting

### Common Issues

1. **Images not loading**:
   - Check image URLs are accessible
   - Ensure proper HTTPS URLs for external images
   - Verify image dimensions and file sizes

2. **Projects not showing**:
   - Check the `mockProjects` array syntax
   - Ensure all required fields are present
   - Verify unique IDs for each project

3. **Theme not switching**:
   - Check `ThemeContext.tsx` implementation
   - Verify Tailwind CSS classes are properly configured

4. **Mobile responsiveness issues**:
   - Test on different screen sizes
   - Check Tailwind responsive classes (`md:`, `lg:`, etc.)
   - Verify mobile navigation functionality

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📞 Support

If you encounter any issues or need help with customization:

1. Check the troubleshooting section above
2. Review the component files for examples

4. Check React and Tailwind CSS documentation for advanced customization

## 📄 License

This project is open source and available under the [MIT License](LICENSE) © 2025 Kaiden Pollesch

---
