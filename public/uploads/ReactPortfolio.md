# Complete Updated Portfolio Project with Sidebar Layout and Enhanced Hex Animation

I'll provide a comprehensive update to your entire project with the new sidebar layout and enhanced cursor-reactive hex background animation with cybersecurity elements. Here's the complete implementation:

## Project Structure

```
portfolio-website/
├── public/
│   └── assets/
│       └── images/
│           ├── logo-dark.png
│           ├── logo.png
│           ├── profile.jpg
│           └── project-images/
│               ├── project1.jpg
│               └── ...
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Intro.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Experience.jsx
│   │   │   └── Contact.jsx
│   │   └── common/
│   │       ├── ProjectCard.jsx
│   │       ├── SkillTag.jsx
│   │       └── ContactForm.jsx
│   ├── data/
│   │   ├── projects.js
│   │   └── skills.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── ProjectDetail.jsx
│   ├── styles/
│   │   ├── App.css
│   │   ├── Header.css
│   │   ├── Footer.css
│   │   ├── Home.css
│   │   └── ... (other component styles)
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── vite.config.js
```

## Core Files

### vite.config.js
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/',
  server: {
    port: 3000,
    open: true,
  },
});
```

### index.html
```html
<!DOCTYPE html>
<html lang="en" class="light">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/assets/images/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Kaiden Pollesch - Software Engineer & Cybersecurity Specialist" />
    <title>Kaiden Pollesch | Portfolio</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### src/main.jsx
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### src/App.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import MobileMenu from './components/MobileMenu';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import BackgroundAnimation from './components/BackgroundAnimation';
import { ThemeProvider } from './context/ThemeContext';
import './styles/App.css';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState('intro');
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      let currentSection = 'intro';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
          currentSection = section.id;
        }
      });
      
      setActiveSectionId(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <BackgroundAnimation />
          
          {isMobile ? (
            <>
              <MobileHeader toggleMobileMenu={toggleMobileMenu} />
              <MobileMenu 
                isOpen={mobileMenuOpen} 
                closeMenu={() => setMobileMenuOpen(false)}
                activeSectionId={activeSectionId}
              />
            </>
          ) : (
            <Sidebar activeSectionId={activeSectionId} />
          )}
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
            </Routes>
            
            <div className="tech-stack">
              <p>Built with React, Vite, and VS Code</p>
            </div>
          </main>
          
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
```

## Context

### src/context/ThemeContext.jsx
```jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Check for user's preferred color scheme
  const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('color-theme');
      if (typeof storedPrefs === 'string') {
        return storedPrefs;
      }

      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (userMedia.matches) {
        return 'dark';
      }
    }
    return 'light'; // Default theme
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Update theme in localStorage and body class
  const rawSetTheme = (rawTheme) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(rawTheme);

    localStorage.setItem('color-theme', rawTheme);
  };

  // Set theme when component mounts and when theme changes
  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

## Components

### src/components/Sidebar.jsx
```jsx
import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiHandshake } from 'react-icons/si';
import '../styles/Sidebar.css';

const Sidebar = ({ activeSectionId }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h1 className="name">Kaiden Pollesch</h1>
          <p className="title">Software Engineer & Cybersecurity Specialist</p>
        </div>

        <nav className="sidebar-nav">
          {isHomePage ? (
            <ul>
              <li className={activeSectionId === 'intro' ? 'active' : ''}>
                <ScrollLink to="intro" smooth={true} duration={500}>
                  <span className="nav-number">01.</span> Introduction
                </ScrollLink>
              </li>
              <li className={activeSectionId === 'about' ? 'active' : ''}>
                <ScrollLink to="about" smooth={true} duration={500}>
                  <span className="nav-number">02.</span> About Me
                </ScrollLink>
              </li>
              <li className={activeSectionId === 'projects' ? 'active' : ''}>
                <ScrollLink to="projects" smooth={true} duration={500}>
                  <span className="nav-number">03.</span> Projects
                </ScrollLink>
              </li>
              <li className={activeSectionId === 'experience' ? 'active' : ''}>
                <ScrollLink to="experience" smooth={true} duration={500}>
                  <span className="nav-number">04.</span> Experience
                </ScrollLink>
              </li>
              <li className={activeSectionId === 'contact' ? 'active' : ''}>
                <ScrollLink to="contact" smooth={true} duration={500}>
                  <span className="nav-number">05.</span> Contact
                </ScrollLink>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/">
                  <span className="nav-number">01.</span> Home
                </Link>
              </li>
              <li>
                <Link to="/#about">
                  <span className="nav-number">02.</span> About
                </Link>
              </li>
              <li>
                <Link to="/#projects">
                  <span className="nav-number">03.</span> Projects
                </Link>
              </li>
              <li>
                <Link to="/#experience">
                  <span className="nav-number">04.</span> Experience
                </Link>
              </li>
              <li>
                <Link to="/#contact">
                  <span className="nav-number">05.</span> Contact
                </Link>
              </li>
            </ul>
          )}
        </nav>

        <div className="sidebar-social">
          <a href="https://github.com/YourUsername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/YourUsername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://handshake.com/YourUsername" target="_blank" rel="noopener noreferrer" aria-label="Handshake">
            <SiHandshake />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
```

### src/components/MobileHeader.jsx
```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import '../styles/MobileHeader.css';

const MobileHeader = ({ toggleMobileMenu }) => {
  return (
    <header className="mobile-header">
      <button className="hamburger-button" onClick={toggleMobileMenu} aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <Link to="/" className="mobile-logo">
        <span>KP</span>
      </Link>
      
      <div className="mobile-theme-toggle">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default MobileHeader;
```

### src/components/MobileMenu.jsx
```jsx
import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiHandshake } from 'react-icons/si';
import '../styles/MobileMenu.css';

const MobileMenu = ({ isOpen, closeMenu, activeSectionId }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
      <div className="mobile-menu-content">
        <div className="mobile-menu-header">
          <h2>Kaiden Pollesch</h2>
          <p>Software Engineer & Cybersecurity Specialist</p>
        </div>

        <nav className="mobile-nav">
          {isHomePage ? (
            <ul>
              <li className={activeSectionId === 'intro' ? 'active' : ''}>
                <ScrollLink to="intro" smooth={true} duration={500} onClick={closeMenu}>
                  <span className="nav-number">01.</span> Introduction
                </ScrollLink>
              </li>
              <li className={activeSectionId === 'about' ? 'active' : ''}>
                <ScrollLink to="about" smooth={true} duration={500} onClick={closeMenu}>
                  <span className="nav-number">02.</span> About Me
                </ScrollLink>
              </li>
              <li className={activeSectionId === 'projects' ? 'active' : ''}>
                <ScrollLink to="projects" smooth={true} duration={500} onClick={closeMenu}>
                  <span className="nav-number">03.</span> Projects
                </ScrollLink>
              </li>
              <li className={activeSectionId === 'experience' ? 'active' : ''}>
                <ScrollLink to="experience" smooth={true} duration={500} onClick={closeMenu}>
                  <span className="nav-number">04.</span> Experience
                </ScrollLink>
              </li>
              <li className={activeSectionId === 'contact' ? 'active' : ''}>
                <ScrollLink to="contact" smooth={true} duration={500} onClick={closeMenu}>
                  <span className="nav-number">05.</span> Contact
                </ScrollLink>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/" onClick={closeMenu}>
                  <span className="nav-number">01.</span> Home
                </Link>
              </li>
              <li>
                <Link to="/#about" onClick={closeMenu}>
                  <span className="nav-number">02.</span> About
                </Link>
              </li>
              <li>
                <Link to="/#projects" onClick={closeMenu}>
                  <span className="nav-number">03.</span> Projects
                </Link>
              </li>
              <li>
                <Link to="/#experience" onClick={closeMenu}>
                  <span className="nav-number">04.</span> Experience
                </Link>
              </li>
              <li>
                <Link to="/#contact" onClick={closeMenu}>
                  <span className="nav-number">05.</span> Contact
                </Link>
              </li>
            </ul>
          )}
        </nav>

        <div className="mobile-social">
          <a href="https://github.com/YourUsername" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/YourUsername" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://handshake.com/YourUsername" target="_blank" rel="noopener noreferrer">
            <SiHandshake />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
```

### src/components/ThemeToggle.jsx
```jsx
import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import '../styles/ThemeToggle.css';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default ThemeToggle;
```

### src/components/Footer.jsx
```jsx
import React from 'react';
import '../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="copyright">
          &copy; {currentYear} Kaiden Pollesch &bull; All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
```

### src/components/BackgroundAnimation.jsx (Enhanced Version)
```jsx
import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameId = useRef(null);
  const { theme } = useTheme();
  const [density, setDensity] = useState(50); // Default spacing between hex points
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Adjust density based on device
  useEffect(() => {
    const adjustDensity = () => {
      if (window.innerWidth < 768) {
        setDensity(80); // Larger spacing (fewer points) on mobile
      } else {
        setDensity(50); // Normal spacing on desktop
      }
    };
    
    adjustDensity();
    window.addEventListener('resize', adjustDensity);
    return () => window.removeEventListener('resize', adjustDensity);
  }, []);
  
  // Canvas setup and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Set canvas to full window size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Hex grid settings
    const spacing = density; // Space between hex values
    const maxRadius = 300; // Maximum radius of influence from cursor
    
    // Create grid of hex positions
    const hexGrid = [];
    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        // Occasionally add special cybersecurity hex values
        const isSpecial = Math.random() < 0.01; // 1% chance
        
        hexGrid.push({
          x,
          y,
          baseSize: 10 + Math.random() * 4, // Base font size variation
          value: '00', // Default value
          isSpecial,
          specialValue: isSpecial ? getSpecialHexValue() : null,
          lastChange: 0, // Track when the value last changed
        });
      }
    }
    
    // Get special cybersecurity hex codes
    function getSpecialHexValue() {
      const specialHexes = [
        "0xFF", "0x00", "0xAF", "0xFE", "0x1337", 
        "0xDEAD", "0xBEEF", "0xC0DE", "0xSEC", "0x41"
      ];
      return specialHexes[Math.floor(Math.random() * specialHexes.length)];
    }
    
    // Animation loop
    const render = () => {
      if (!canvas || !context) return;
      
      // Skip frames occasionally for performance
      if (Math.random() > 0.85) {
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Choose base colors based on theme
      const hexColor = theme === 'dark' 
        ? 'rgba(100, 100, 100, 0.2)' // Dark grey for dark theme
        : 'rgba(150, 150, 150, 0.2)'; // Light grey for light theme
      
      const now = Date.now();
      
      // Draw hex values
      hexGrid.forEach(hex => {
        // Calculate distance from cursor
        const dx = mousePosition.x - hex.x;
        const dy = mousePosition.y - hex.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate intensity based on distance (0-255)
        let intensity = 0;
        
        if (distance < maxRadius) {
          // Map distance to hex value (FF close to cursor, 00 far from cursor)
          intensity = Math.floor(255 * (1 - distance / maxRadius));
          
          // Update value if cursor is nearby (more frequent updates closer to cursor)
          if (now - hex.lastChange > 1000 * (distance / maxRadius)) {
            hex.value = intensity.toString(16).padStart(2, '0').toUpperCase();
            hex.lastChange = now;
          }
        }
        
        // Draw special cybersecurity values
        if (hex.isSpecial) {
          context.font = `${hex.baseSize + 2}px "Fira Code", monospace`;
          
          const specialColor = theme === 'dark' 
            ? 'rgba(100, 255, 100, 0.3)' // Green for dark theme
            : 'rgba(0, 150, 50, 0.3)';   // Darker green for light theme
            
          context.fillStyle = specialColor;
          context.fillText(hex.specialValue, hex.x, hex.y);
        } 
        // Draw regular hex values
        else {
          context.font = `${hex.baseSize}px monospace`;
          
          // Make closer ones slightly more visible
          if (distance < maxRadius) {
            const opacity = 0.2 + (0.4 * (1 - distance / maxRadius));
            context.fillStyle = theme === 'dark' 
              ? `rgba(150, 150, 150, ${opacity})` 
              : `rgba(100, 100, 100, ${opacity})`;
          } else {
            context.fillStyle = hexColor;
          }
          
          context.fillText(hex.value, hex.x, hex.y);
        }
      });
      
      animationFrameId.current = requestAnimationFrame(render);
    };
    
    render();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [mousePosition, theme, density]);
  
  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 1,
        pointerEvents: 'none' // Allows clicking through the canvas
      }}
    />
  );
};

export default BackgroundAnimation;
```

## Section Components

### src/components/sections/Intro.jsx
```jsx
import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import '../../styles/Intro.css';

function Intro() {
  return (
    <div className="intro-container">
      <motion.div 
        className="intro-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="intro-greeting">Hi, my name is</p>
        <h1 className="intro-name">Kaiden Pollesch.</h1>
        <h2 className="intro-tagline">I build secure, efficient solutions.</h2>
        <p className="intro-description">
          I'm a software engineer specializing in cybersecurity, focused on creating 
          secure and efficient applications. With a strong foundation in both development 
          and security principles, I build solutions that are not only functional but 
          also resilient against potential threats.
        </p>
        
        <div className="intro-buttons">
          <Link to="projects" smooth={true} duration={800} className="btn btn-primary">
            Check out my work
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Intro;
```

### src/components/sections/About.jsx
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import SkillTag from '../common/SkillTag';
import { skills } from '../../data/skills';
import '../../styles/About.css';

function About() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="about-container">
      <motion.h2 
        className="section-title"
        data-number="02."
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h2>
      
      <div className="about-content">
        <motion.div 
          className="about-text"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p>
            I'm a software engineering student with a minor in cybersecurity, passionate about creating 
            secure and efficient applications. My academic journey has equipped me with strong problem-solving 
            abilities and a deep understanding of software development principles.
          </p>
          <p>
            My focus on cybersecurity allows me to approach software development with a security-first mindset, 
            ensuring that applications are not only functional but also resilient against potential threats.
          </p>
        </motion.div>
        
        <motion.div 
          className="about-image"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="image-wrapper">
            <img src="/assets/images/profile.jpg" alt="Kaiden Pollesch" />
          </div>
        </motion.div>
      </div>
      
      <div className="subsections">
        <motion.div 
          className="subsection"
          {...fadeIn}
        >
          <h3>Education</h3>
          <div className="education-item">
            <h4>Bachelor of Science in Software Engineering</h4>
            <p className="school">Your University Name</p>
            <p className="years">Expected Graduation: 2024</p>
            <p>Minor: Cybersecurity</p>
            <p>GPA: 3.8/4.0</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="subsection"
          {...fadeIn}
          transition={{ delay: 0.1 }}
        >
          <h3>Skills</h3>
          <div className="skills-container">
            <div className="skills-category">
              <h4>Technical Skills</h4>
              <div className="skills-list">
                {skills.technical.map((skill, index) => (
                  <SkillTag key={index} name={skill} type="technical" />
                ))}
              </div>
            </div>
            
            <div className="skills-category">
              <h4>Soft Skills</h4>
              <div className="skills-list">
                {skills.soft.map((skill, index) => (
                  <SkillTag key={index} name={skill} type="soft" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="subsection"
          {...fadeIn}
          transition={{ delay: 0.2 }}
        >
          <h3>Hobbies & Interests</h3>
          <ul className="hobbies-list">
            <li>CTF Competitions</li>
            <li>Open Source Contributions</li>
            <li>Game Development</li>
            <li>Hiking & Photography</li>
            <li>Reading Tech Books</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
```

### src/components/sections/Projects.jsx
```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../common/ProjectCard';
import { projects } from '../../data/projects';
import '../../styles/Projects.css';

function Projects() {
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  // Show only first 6 projects initially
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);
  
  return (
    <div className="projects-container">
      <motion.h2 
        className="section-title"
        data-number="03."
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h2>
      
      <div className="project-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Projects
        </button>
        <button 
          className={`filter-btn ${filter === 'school' ? 'active' : ''}`}
          onClick={() => setFilter('school')}
        >
          School Projects
        </button>
        <button 
          className={`filter-btn ${filter === 'personal' ? 'active' : ''}`}
          onClick={() => setFilter('personal')}
        >
          Personal Projects
        </button>
      </div>
      
      <div className="projects-grid">
        {displayedProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
      
      {filteredProjects.length > 6 && (
        <div className="show-more-container">
          <button 
            className="btn btn-primary show-more-btn" 
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'Show More Projects'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Projects;
```

### src/components/sections/Experience.jsx
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/Experience.css';

function Experience() {
  const experiences = [
    {
      title: "Software Engineering Intern",
      company: "Tech Company Name",
      date: "Summer 2023",
      description: "Developed and maintained web applications using React and Node.js. Collaborated with senior developers to implement new features and fix bugs. Participated in code reviews and agile development processes.",
      skills: ["React", "Node.js", "Git", "Agile"]
    },
    {
      title: "Cybersecurity Research Assistant",
      company: "University Research Lab",
      date: "Jan 2023 - May 2023",
      description: "Assisted in vulnerability analysis and penetration testing research. Documented security findings and contributed to research papers. Implemented security tools using Python.",
      skills: ["Penetration Testing", "Python", "Security Analysis"]
    }
  ];
  
  return (
    <div className="experience-container">
      <motion.h2 
        className="section-title"
        data-number="04."
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Experience
      </motion.h2>
      
      <div className="timeline">
        {experiences.map((exp, index) => (
          <motion.div 
            className="experience-card"
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="experience-date">{exp.date}</div>
            <div className="experience-content">
              <h3 className="experience-title">
                {exp.title} <span className="experience-company">@ {exp.company}</span>
              </h3>
              <p className="experience-description">{exp.description}</p>
              <div className="experience-skills">
                {exp.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
```

### src/components/sections/Contact.jsx
```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../common/ContactForm';
import { FaFileAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import '../../styles/Contact.css';

function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleFormSubmit = () => {
    setFormSubmitted(true);
    // Reset after 5 seconds
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="contact-container">
      <motion.h2 
        className="section-title"
        data-number="05."
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Contact Me
      </motion.h2>
      
      <div className="contact-content">
        <motion.div 
          className="contact-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3>Get In Touch</h3>
          <p>
            I'm currently looking for new opportunities and my inbox is always open. 
            Whether you have a question or just want to say hi, I'll do my best to get back to you!
          </p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <FaEnvelope className="icon" />
              <a href="mailto:your.email@example.com">your.email@example.com</a>
            </div>
            <div className="contact-method">
              <FaPhone className="icon" />
              <span>(555) 123-4567</span>
            </div>
          </div>
          
          <div className="resume-section">
            <a href="/assets/resume.pdf" download className="btn btn-primary">
              <FaFileAlt /> Download Resume
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="contact-form-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {formSubmitted ? (
            <div className="success-message">
              <h3>Thank you for your message!</h3>
              <p>I'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <ContactForm onSubmitSuccess={handleFormSubmit} />
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
```

## Common Components

### src/components/common/ProjectCard.jsx
```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaFolder } from 'react-icons/fa';
import '../../styles/ProjectCard.css';

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-card-header">
        <div className="project-icon">
          <FaFolder />
        </div>
        <div className="project-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="GitHub Repository">
              <FaGithub />
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="Live Demo">
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>
      
      <div className="project-card-content">
        <Link to={`/project/${project.id}`} className="project-title-link">
          <h3 className="project-title">{project.title}</h3>
        </Link>
        <p className="project-description">{project.summary}</p>
      </div>
      
      <div className="project-tech">
        {project.technologies.slice(0, 4).map((tech, index) => (
          <span key={index} className="tech-tag">{tech}</span>
        ))}
        {project.technologies.length > 4 && (
          <span className="tech-tag">+{project.technologies.length - 4}</span>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
```

### src/components/common/SkillTag.jsx
```jsx
import React from 'react';
import '../../styles/SkillTag.css';

function SkillTag({ name, type }) {
  return (
    <span className={`skill-tag ${type}`}>
      {name}
    </span>
  );
}

export default SkillTag;
```

### src/components/common/ContactForm.jsx
```jsx
import React, { useState } from 'react';
import '../../styles/ContactForm.css';

function ContactForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would send this data to your backend
      console.log('Form submitted:', formData);
      
      // Clear the form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Trigger success callback
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    }
  };
  
  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="subject">Subject (Optional)</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          className={errors.message ? 'error' : ''}
        ></textarea>
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>
      
      <button type="submit" className="btn btn-primary">Send Message</button>
    </form>
  );
}

export default ContactForm;
```

## Pages

### src/pages/Home.jsx
```jsx
import React from 'react';
import Intro from '../components/sections/Intro';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Contact from '../components/sections/Contact';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <section id="intro" className="section">
        <Intro />
      </section>
      <section id="about" className="section">
        <About />
      </section>
      <section id="projects" className="section">
        <Projects />
      </section>
      <section id="experience" className="section">
        <Experience />
      </section>
      <section id="contact" className="section">
        <Contact />
      </section>
    </div>
  );
}

export default Home;
```

### src/pages/ProjectDetail.jsx
```jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import '../styles/ProjectDetail.css';

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Find the project by id
    const foundProject = projects.find(p => p.id === id);
    
    if (foundProject) {
      setProject(foundProject);
    }
    
    setLoading(false);
    
    // Scroll to top when project changes
    window.scrollTo(0, 0);
  }, [id]);
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (!project) {
    return (
      <div className="project-not-found">
        <h2>Project Not Found</h2>
        <p>The project you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>
    );
  }
  
  return (
    <div className="project-detail-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="project-detail-content"
      >
        <Link to="/#projects" className="back-link">
          <FaArrowLeft /> Back to Projects
        </Link>
        
        <h1 className="project-title">{project.title}</h1>
        
        <div className="project-detail-header">
          <div className="project-category">
            <span className={`category-tag ${project.category}`}>
              {project.category === 'personal' ? 'Personal Project' : 'School Project'}
            </span>
          </div>
          
          <div className="project-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-sm">
                <FaGithub /> GitHub
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-sm">
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}
          </div>
        </div>
        
        <div className="project-detail-image">
          <img src={project.image} alt={project.title} />
        </div>
        
        <div className="project-tech-stack">
          <h3>Technologies Used</h3>
          <div className="tech-tags">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
        
        <div className="project-description">
          <h3>Project Overview</h3>
          <p>{project.description}</p>
        </div>
        
        {project.problem && (
          <div className="project-section">
            <h3>Problem Statement</h3>
            <p>{project.problem}</p>
          </div>
        )}
        
        {project.solution && (
          <div className="project-section">
            <h3>Solution</h3>
            <p>{project.solution}</p>
          </div>
        )}
        
        {project.features && (
          <div className="project-section">
            <h3>Key Features</h3>
            <ul className="features-list">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        {project.learnings && (
          <div className="project-section">
            <h3>What I Learned</h3>
            <p>{project.learnings}</p>
          </div>
        )}
        
        {project.screenshots && (
          <div className="project-section">
            <h3>Screenshots</h3>
            <div className="screenshots-grid">
              {project.screenshots.map((screenshot, index) => (
                <div key={index} className="screenshot">
                  <img src={screenshot.img} alt={screenshot.caption} />
                  {screenshot.caption && <p className="caption">{screenshot.caption}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default ProjectDetail;
```

## CSS Styles

### src/styles/index.css
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code, .monospace {
  font-family: 'Fira Code', source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

### src/styles/App.css
```css
:root {
  /* Light theme variables */
  --primary-color: #64ffda;
  --secondary-color: #8892b0;
  --text-color: #333;
  --text-light: #6e7c87;
  --text-highlight: #0a192f;
  --background-color: #f9f9f9;
  --content-bg: #ffffff;
  --card-bg: #ffffff;
  --border-color: #e1e4e8;
  --sidebar-bg: #0a192f;
  --sidebar-text: #ccd6f6;
  --sidebar-width: 300px;
  --success-color: #28a745;
  --error-color: #dc3545;
  --header-height: 70px;
  --mobile-header-height: 60px;
  --section-padding: 80px 0;
  --container-padding: 0 20px;
  --border-radius: 4px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

.dark {
  /* Dark theme variables */
  --primary-color: #64ffda;
  --secondary-color: #8892b0;
  --text-color: #ccd6f6;
  --text-light: #a8b2d1;
  --text-highlight: #64ffda;
  --background-color: #0a192f;
  --content-bg: #0a192f;
  --card-bg: #112240;
  --border-color: #233554;
  --sidebar-bg: #020c1b;
  --sidebar-text: #ccd6f6;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', 'Segoe UI', 'Roboto', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
  overflow-x: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.App {
  display: flex;
  min-height: 100vh;
  position: relative;
}

.main-content {
  flex: 1;
  margin-left: var(--sidebar-width);
  padding: 0 100px 0 50px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.section {
  padding: 100px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section-title {
  font-size: 2rem;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  color: var(--text-color);
  white-space: nowrap;
}

.section-title::before {
  content: attr(data-number);
  font-family: "Fira Code", monospace;
  color: var(--primary-color);
  margin-right: 10px;
  font-size: 1.5rem;
}

.section-title::after {
  content: "";
  display: block;
  height: 1px;
  width: 300px;
  background-color: var(--border-color);
  margin-left: 20px;
}

.tech-stack {
  padding: 20px 0;
  font-size: 0.9rem;
  color: var(--text-light);
  text-align: center;
  font-family: "Fira Code", monospace;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  text-align: center;
  text-decoration: none;
  border: 1px solid var(--primary-color);
  font-family: "Fira Code", monospace;
  font-size: 0.9rem;
}

.btn-primary {
  background-color: transparent;
  color: var(--primary-color);
}

.btn-primary:hover {
  background-color: rgba(100, 255, 218, 0.1);
  transform: translateY(-3px);
}

.btn-secondary {
  background-color: var(--primary-color);
  color: var(--sidebar-bg);
}

.btn-secondary:hover {
  background-color: rgba(100, 255, 218, 0.8);
  transform: translateY(-3px);
}

.btn-sm {
  padding: 8px 16px;
  font-size: 0.8rem;
}

@media (max-width: 1024px) {
  .main-content {
    margin-left: 0;
    padding: 0 20px;
    margin-top: var(--mobile-header-height);
  }
  
  .section {
    padding: 80px 0;
    min-height: auto;
  }
  
  .section-title::after {
    width: 100px;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.5rem;
  }
  
  .section-title::before {
    font-size: 1.2rem;
  }
  
  .section-title::after {
    width: 50px;
  }
  
  .btn {
    padding: 10px 20px;
  }
}
```

### src/styles/Sidebar.css
```css
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  background-color: var(--sidebar-bg);
  color: var(--sidebar-text);
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 40px 30px;
}

.sidebar-header {
  margin-bottom: 60px;
}

.sidebar-header .name {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--sidebar-text);
}

.sidebar-header .title {
  font-size: 0.9rem;
  color: var(--primary-color);
  font-family: "Fira Code", monospace;
}

.sidebar-nav {
  flex: 1;
}

.sidebar-nav ul {
  list-style: none;
}

.sidebar-nav li {
  margin-bottom: 25px;
  transition: var(--transition);
}

.sidebar-nav a {
  color: var(--sidebar-text);
  text-decoration: none;
  font-size: 1rem;
  display: block;
  transition: var(--transition);
  position: relative;
  padding-left: 30px;
}

.sidebar-nav .nav-number {
  color: var(--primary-color);
  font-family: "Fira Code", monospace;
  font-size: 0.9rem;
  position: absolute;
  left: 0;
}

.sidebar-nav li:hover a, 
.sidebar-nav li.active a {
  color: var(--primary-color);
  transform: translateX(5px);
}

.sidebar-nav li.active {
  font-weight: 600;
}

.sidebar-social {
  display: flex;
  gap: 20px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-social a {
  color: var(--sidebar-text);
  font-size: 1.2rem;
  transition: var(--transition);
}

.sidebar-social a:hover {
  color: var(--primary-color);
  transform: translateY(-3px);
}
```

### src/styles/MobileHeader.css
```css
.mobile-header {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--mobile-header-height);
  background-color: var(--sidebar-bg);
  padding: 0 20px;
  z-index: 100;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.hamburger-button {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 110;
}

.hamburger-button span {
  width: 30px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 5px;
  transition: all 0.3s ease;
}

.mobile-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--sidebar-text);
  text-decoration: none;
  font-family: "Fira Code", monospace;
}

.mobile-theme-toggle {
  display: flex;
  align-items: center;
}

@media (max-width: 1024px) {
  .mobile-header {
    display: flex;
  }
}
```

### src/styles/MobileMenu.css
```css
.mobile-menu {
  position: fixed;
  top: 0;
  left: -100%;
  width: 75%;
  height: 100vh;
  background-color: var(--sidebar-bg);
  z-index: 99;
  transition: left 0.3s ease;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
}

.mobile-menu.open {
  left: 0;
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 80px 30px 40px;
}

.mobile-menu-header {
  margin-bottom: 30px;
}

.mobile-menu-header h2 {
  font-size: 1.5rem;
  color: var(--sidebar-text);
  margin-bottom: 5px;
}

.mobile-menu-header p {
  font-size: 0.9rem;
  color: var(--primary-color);
  font-family: "Fira Code", monospace;
}

.mobile-nav {
  flex: 1;
}

.mobile-nav ul {
  list-style: none;
}

.mobile-nav li {
  margin-bottom: 25px;
}

.mobile-nav li.active a {
  color: var(--primary-color);
}

.mobile-nav a {
  color: var(--sidebar-text);
  text-decoration: none;
  font-size: 1.2rem;
  display: block;
  transition: var(--transition);
  position: relative;
  padding-left: 30px;
}

.mobile-nav .nav-number {
  color: var(--primary-color);
  font-family: "Fira Code", monospace;
  font-size: 1rem;
  position: absolute;
  left: 0;
}

.mobile-social {
  display: flex;
  gap: 20px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-social a {
  color: var(--sidebar-text);
  font-size: 1.5rem;
  transition: var(--transition);
}

.mobile-social a:hover {
  color: var(--primary-color);
}
```

### src/styles/ThemeToggle.css
```css
.theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background-color: rgba(100, 255, 218, 0.1);
}

@media (max-width: 768px) {
  .theme-toggle {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
}
```

### src/styles/Footer.css
```css
.footer {
  width: 100%;
  padding: 20px 0;
  text-align: center;
  margin-left: calc(-1 * var(--sidebar-width));
  width: calc(100% + var(--sidebar-width));
  background-color: var(--sidebar-bg);
}

.footer-container {
  padding: 0 20px;
}

.copyright {
  color: var(--sidebar-text);
  font-size: 0.9rem;
  font-family: "Fira Code", monospace;
}

@media (max-width: 1024px) {
  .footer {
    margin-left: 0;
    width: 100%;
  }
}
```

### src/styles/Intro.css
```css
.intro-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 100px 0;
}

.intro-content {
  max-width: 800px;
}

.intro-greeting {
  color: var(--primary-color);
  font-family: "Fira Code", monospace;
  font-size: 1rem;
  margin-bottom: 20px;
}

.intro-name {
  font-size: 4rem;
  font-weight: 700;
  margin: 0 0 10px 0;
  color: var(--text-highlight);
}

.intro-tagline {
  font-size: 3rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: var(--secondary-color);
}

.intro-description {
  color: var(--text-light);
  font-size: 1.1rem;
  max-width: 600px;
  margin-bottom: 40px;
}

.intro-buttons {
  display: flex;
  gap: 20px;
}

@media (max-width: 768px) {
  .intro-content {
    padding: 20px 0;
  }
  
  .intro-name {
    font-size: 2.5rem;
  }
  
  .intro-tagline {
    font-size: 1.8rem;
  }
  
  .intro-description {
    font-size: 1rem;
  }
}
```

### src/styles/About.css
```css
.about-container {
  padding: 100px 0;
}

.about-content {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 50px;
  margin-bottom: 60px;
  align-items: center;
}

.about-text p {
  margin-bottom: 20px;
  color: var(--text-light);
}

.about-image {
  position: relative;
}

.image-wrapper {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.image-wrapper::after {
  content: '';
  position: absolute;
  top: 15px;
  left: 15px;
  right: -15px;
  bottom: -15px;
  border: 2px solid var(--primary-color);
  border-radius: 4px;
  z-index: -1;
  transition: var(--transition);
}

.image-wrapper:hover::after {
  top: 10px;
  left: 10px;
}

.about-image img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  filter: grayscale(100%);
  transition: var(--transition);
  display: block;
}

.about-image:hover img {
  filter: grayscale(0%);
}

.subsections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.subsection {
  margin-bottom: 30px;
}

.subsection h3 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: var(--text-color);
  display: flex;
  align-items: center;
}

.subsection h3::before {
  content: "▹";
  color: var(--primary-color);
  margin-right: 10px;
}

.education-item {
  margin-bottom: 20px;
}

.education-item h4 {
  font-size: 1.1rem;
  margin-bottom: 5px;
}

.school, .years {
  color: var(--text-light);
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.skills-container {
  margin-top: 15px;
}

.skills-category {
  margin-bottom: 20px;
}

.skills-category h4 {
  font-size: 1rem;
  margin-bottom: 10px;
  color: var(--text-light);
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hobbies-list {
  list-style: none;
  margin-left: 5px;
}

.hobbies-list li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 10px;
  color: var(--text-light);
}

.hobbies-list li::before {
  content: "▹";
  position: absolute;
  left: 0;
  color: var(--primary-color);
}

@media (max-width: 900px) {
  .about-content {
    grid-template-columns: 1fr;
  }
  
  .about-image {
    margin: 0 auto;
    max-width: 300px;
  }
  
  .subsections {
    grid-template-columns: 1fr;
  }
}
```

### src/styles/Projects.css
```css
.projects-container {
  padding: 100px 0;
}

.project-filters {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.filter-btn {
  background: transparent;
  color: var(--text-color);
  padding: 8px 16px;
  margin: 0 8px 10px;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-family: "Fira Code", monospace;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
}

.filter-btn.active, .filter-btn:hover {
  background-color: rgba(100, 255, 218, 0.1);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-bottom: 40px;
}

.show-more-container {
  text-align: center;
  margin: 30px 0 50px;
}

.show-more-btn {
  padding: 10px 25px;
  font-size: 0.9rem;
}

@media (max-width: 1200px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-btn {
    margin-bottom: 10px;
    font-size: 0.8rem;
  }
}
```

### src/styles/ProjectCard.css
```css
.project-card {
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 25px;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.project-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.project-icon {
  color: var(--primary-color);
  font-size: 2.5rem;
}

.project-links {
  display: flex;
  gap: 15px;
}

.icon-link {
  color: var(--text-light);
  font-size: 1.2rem;
  transition: var(--transition);
}

.icon-link:hover {
  color: var(--primary-color);
  transform: translateY(-3px);
}

.project-card-content {
  flex: 1;
}

.project-title {
  font-size: 1.3rem;
  margin-bottom: 15px;
  font-weight: 600;
  color: var(--text-color);
}

.project-title-link {
  text-decoration: none;
  color: inherit;
  transition: var(--transition);
}

.project-title-link:hover .project-title {
  color: var(--primary-color);
}

.project-description {
  color: var(--text-light);
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: auto;
  font-family: "Fira Code", monospace;
  font-size: 0.8rem;
}

.tech-tag {
  color: var(--text-light);
}
```

### src/styles/Experience.css
```css
.experience-container {
  padding: 100px 0;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.experience-card {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 20px;
  padding: 25px;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  transition: transform 0.3s ease;
}

.experience-card:hover {
  transform: translateX(10px);
}

.experience-date {
  font-family: "Fira Code", monospace;
  font-size: 0.9rem;
  color: var(--primary-color);
}

.experience-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--text-color);
}

.experience-company {
  color: var(--primary-color);
  font-weight: normal;
}

.experience-description {
  color: var(--text-light);
  margin-bottom: 15px;
  font-size: 0.95rem;
}

.experience-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.experience-skills .skill-tag {
  background-color: rgba(100, 255, 218, 0.1);
  color: var(--primary-color);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-family: "Fira Code", monospace;
}

@media (max-width: 768px) {
  .experience-card {
    grid-template-columns: 1fr;
  }
  
  .experience-date {
    margin-bottom: 10px;
  }
}
```

### src/styles/Contact.css
```css
.contact-container {
  padding: 100px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
}

.contact-text h3 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--text-color);
}

.contact-text p {
  color: var(--text-light);
  margin-bottom: 30px;
  font-size: 1.1rem;
  max-width: 500px;
}

.contact-methods {
  margin-bottom: 30px;
}

.contact-method {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.contact-method .icon {
  color: var(--primary-color);
  margin-right: 15px;
  font-size: 1.2rem;
}

.contact-method a {
  color: var(--text-color);
  text-decoration: none;
  transition: var(--transition);
}

.contact-method a:hover {
  color: var(--primary-color);
}

.resume-section {
  margin-top: 30px;
}

.success-message {
  background-color: rgba(100, 255, 218, 0.1);
  border-radius: var(--border-radius);
  padding: 30px;
  text-align: center;
}

.success-message h3 {
  color: var(--primary-color);
  margin-bottom: 10px;
}

@media (max-width: 900px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
  
  .contact-text {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .contact-text p {
    margin: 0 auto 30px;
  }
  
  .contact-method {
    justify-content: center;
  }
  
  .resume-section {
    text-align: center;
  }
}
```

### src/styles/ContactForm.css
```css
.contact-form {
  background-color: var(--card-bg);
  padding: 30px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-color);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: transparent;
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-group input.error,
.form-group textarea.error {
  border-color: var(--error-color);
}

.error-message {
  color: var(--error-color);
  font-size: 0.85rem;
  margin-top: 5px;
}

.contact-form button {
  width: 100%;
  margin-top: 10px;
}
```

### src/styles/SkillTag.css
```css
.skill-tag {
  display: inline-block;
  padding: 5px 10px;
  background-color: rgba(100, 255, 218, 0.1);
  color: var(--primary-color);
  border-radius: 4px;
  font-size: 0.9rem;
  font-family: "Fira Code", monospace;
}

.skill-tag.technical {
  background-color: rgba(100, 255, 218, 0.1);
}

.skill-tag.soft {
  background-color: rgba(100, 200, 255, 0.1);
  color: #64c8ff;
}
```

### src/styles/ProjectDetail.css
```css
.project-detail-container {
  padding: 150px 0 60px;
}

.project-detail-content {
  max-width: 900px;
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  margin-bottom: 30px;
  color: var(--primary-color);
  font-family: "Fira Code", monospace;
  text-decoration: none;
}

.back-link svg {
  margin-right: 8px;
}

.project-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: var(--text-highlight);
}

.project-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
}

.category-tag {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: "Fira Code", monospace;
}

.category-tag.school {
  background-color: rgba(100, 255, 218, 0.1);
  color: var(--primary-color);
}

.category-tag.personal {
  background-color: rgba(100, 200, 255, 0.1);
  color: #64c8ff;
}

.project-detail-image {
  margin-bottom: 30px;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
}

.project-detail-image img {
  width: 100%;
  height: auto;
  display: block;
}

.project-tech-stack, 
.project-description,
.project-section {
  margin-bottom: 30px;
}

.project-section h3, 
.project-tech-stack h3, 
.project-description h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-highlight);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tech-tag {
  background-color: rgba(100, 255, 218, 0.1);
  color: var(--primary-color);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-family: "Fira Code", monospace;
}

.features-list {
  padding-left: 20px;
}

.features-list li {
  margin-bottom: 8px;
  position: relative;
  padding-left: 20px;
}

.features-list li::before {
  content: "▹";
  position: absolute;
  left: 0;
  color: var(--primary-color);
}

.screenshots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.screenshot {
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
}

.screenshot img {
  width: 100%;
  height: auto;
  display: block;
}

.caption {
  padding: 10px;
  text-align: center;
  background-color: var(--card-bg);
  color: var(--text-light);
  font-size: 0.9rem;
}

.loading, .project-not-found {
  text-align: center;
  padding: 100px 20px;
}

@media (max-width: 768px) {
  .project-detail-container {
    padding: 100px 20px 40px;
  }
  
  .project-title {
    font-size: 2rem;
  }
  
  .screenshots-grid {
    grid-template-columns: 1fr;
  }
}
```

### src/styles/Home.css
```css
.home-container {
  position: relative;
}
```

## Data Files

### src/data/skills.js
```js
export const skills = {
  technical: [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "SQL",
    "MongoDB",
    "Git",
    "Docker",
    "Penetration Testing",
    "Network Security",
    "Cryptography",
    "AWS",
    "RESTful APIs"
  ],
  soft: [
    "Problem Solving",
    "Communication",
    "Teamwork",
    "Leadership",
    "Time Management",
    "Critical Thinking",
    "Adaptability"
  ]
};
```

### src/data/projects.js
```js
export const projects = [
  {
    id: "secure-chat",
    title: "End-to-End Encrypted Chat",
    category: "school",
    summary: "A secure messaging platform with end-to-end encryption and zero-knowledge architecture.",
    description: "This project implements a secure chat application that prioritizes user privacy through end-to-end encryption. Messages are encrypted on the client-side before transmission, ensuring that only the intended recipient can decrypt and read them.",
    problem: "Many popular messaging platforms have access to user messages, creating privacy concerns and potential security vulnerabilities.",
    solution: "By implementing client-side encryption with the Signal Protocol, this application ensures that messages can only be read by the intended recipients, not even by the server administrators.",
    technologies: ["React", "Node.js", "Signal Protocol", "WebSocket", "MongoDB"],
    features: [
      "End-to-end encryption",
      "Zero-knowledge architecture",
      "Message authentication",
      "Forward secrecy",
      "Cross-platform compatibility"
    ],
    learnings: "This project deepened my understanding of cryptographic principles and secure application design. I learned about the challenges of implementing encryption in web applications and the importance of careful key management.",
    image: "/assets/images/project-images/project1.jpg",
    github: "https://github.com/yourusername/secure-chat",
    demo: "https://secure-chat-demo.netlify.app",
    screenshots: [
      {
        img: "/assets/images/project-images/secure-chat-1.jpg",
        caption: "Login screen with key generation"
      },
      {
        img: "/assets/images/project-images/secure-chat-2.jpg",
        caption: "Encrypted chat interface"
      }
    ]
  },
  {
    id: "vulnerability-scanner",
    title: "Network Vulnerability Scanner",
    category: "personal",
    summary: "An automated tool for detecting security vulnerabilities in network infrastructures.",
    description: "This project is a network vulnerability scanner that helps identify security weaknesses in systems and networks. It automates the process of discovering open ports, outdated software, and common misconfigurations.",
    technologies: ["Python", "Nmap", "Flask", "SQLite", "Docker"],
    features: [
      "Port scanning",
      "Service version detection",
      "Vulnerability database integration",
      "Scheduled scans",
      "Detailed reporting"
    ],
    image: "/assets/images/project-images/project2.jpg",
    github: "https://github.com/yourusername/vulnerability-scanner",
    demo: null
  },
  {
    id: "secure-file-sharing",
    title: "Secure File Sharing Platform",
    category: "school",
    summary: "An encrypted file sharing system with granular access controls and audit logging.",
    description: "A secure file-sharing system that uses strong encryption to protect sensitive files and allows users to securely share documents with customizable permissions.",
    technologies: ["JavaScript", "React", "Node.js", "AWS S3", "PostgreSQL"],
    features: [
      "End-to-end file encryption",
      "Granular permission controls",
      "Audit logging",
      "Expiring share links",
      "Two-factor authentication"
    ],
    image: "/assets/images/project-images/project3.jpg",
    github: "https://github.com/yourusername/secure-file-sharing",
    demo: "https://secure-files-demo.netlify.app"
  },
  {
    id: "intrusion-detection",
    title: "Machine Learning IDS",
    category: "personal",
    summary: "An intrusion detection system powered by machine learning algorithms.",
    description: "A network intrusion detection system that uses machine learning to identify suspicious traffic patterns and potential security threats in real-time.",
    technologies: ["Python", "TensorFlow", "Scikit-learn", "Pandas", "Wireshark"],
    features: [
      "Real-time traffic analysis",
      "Anomaly detection",
      "Custom rule creation",
      "Email alerting",
      "Traffic visualization"
    ],
    image: "/assets/images/project-images/project4.jpg",
    github: "https://github.com/yourusername/ml-ids",
    demo: null
  },
  {
    id: "password-manager",
    title: "Open Source Password Manager",
    category: "personal",
    summary: "A secure, local-first password management solution with browser integration.",
    description: "An open-source password manager that securely stores passwords locally with strong encryption and provides browser extensions for easy access.",
    technologies: ["Electron", "React", "TypeScript", "SQLite", "Argon2"],
    features: [
      "Zero-knowledge encryption",
      "Browser extensions",
      "Password generator",
      "Secure notes storage",
      "Auto-fill functionality"
    ],
    image: "/assets/images/project-images/project5.jpg",
    github: "https://github.com/yourusername/password-manager",
    demo: "https://password-manager-demo.netlify.app"
  },
  {
    id: "threat-intelligence",
    title: "Threat Intelligence Dashboard",
    category: "school",
    summary: "A dashboard for visualizing and analyzing cybersecurity threat data.",
    description: "A comprehensive dashboard for security analysts to monitor and respond to emerging threats by aggregating data from multiple threat intelligence sources.",
    technologies: ["React", "D3.js", "Node.js", "MongoDB", "Redis"],
    features: [
      "Threat feed integration",
      "Interactive visualizations",
      "Alert system",
      "Threat correlation",
      "Reporting capabilities"
    ],
    image: "/assets/images/project-images/project6.jpg",
    github: "https://github.com/yourusername/threat-dashboard",
    demo: "https://threat-intel-demo.netlify.app"
  },
  {
    id: "secure-coding-guide",
    title: "Secure Coding Guidelines",
    category: "school",
    summary: "Interactive guide for secure coding practices with examples and exercises.",
    description: "An interactive web application that teaches developers secure coding practices through examples, tutorials, and interactive exercises.",
    technologies: ["React", "Express", "MongoDB", "Docker", "Jest"],
    features: [
      "Language-specific guidelines",
      "Interactive code exercises",
      "Vulnerability demonstrations",
      "Progress tracking",
      "Certificate generation"
    ],
    image: "/assets/images/project-images/project7.jpg",
    github: "https://github.com/yourusername/secure-coding-guide",
    demo: "https://secure-coding.netlify.app"
  },
  {
    id: "ctf-platform",
    title: "CTF Competition Platform",
    category: "personal",
    summary: "A platform for hosting and participating in Capture The Flag cybersecurity competitions.",
    description: "A self-hosted platform for organizing and participating in Capture The Flag (CTF) competitions, featuring various challenge types and a real-time scoreboard.",
    technologies: ["Django", "React", "PostgreSQL", "Docker", "WebSockets"],
    features: [
      "Multiple challenge categories",
      "Real-time scoreboard",
      "Team management",
      "Hint system",
      "Admin dashboard"
    ],
    image: "/assets/images/project-images/project8.jpg",
    github: "https://github.com/yourusername/ctf-platform",
    demo: "https://ctf-platform-demo.netlify.app"
  }
];
```

## Deployment Instructions

The deployment process remains the same as previously discussed:

1. Build your Vite application:
   ```bash
   npm run build
   ```

2. Deploy to your preferred hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - Or any other hosting service that supports static websites

3. Set up your custom domain by following your hosting provider's instructions.

## Conclusion

This complete update transforms your portfolio into a sleek, modern design inspired by Brittany Chiang's layout while maintaining your unique content and features. Key highlights include:

1. Fixed sidebar navigation with numbered sections
2. Enhanced cursor-reactive hex background with special cybersecurity values
3. Clean project cards in a 3-column grid with "Show More" functionality
4. Dark/light theme toggle
5. Responsive design with mobile navigation
6. Footer with copyright information
7. Consistent design language with monospace accents

The code is organized for easy maintenance and future updates. You can customize colors, content, and projects as needed while maintaining the overall design structure.