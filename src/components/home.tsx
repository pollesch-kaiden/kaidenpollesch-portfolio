import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import BackgroundAnimation from "./BackgroundAnimation";
import Introduction from "./sections/Introduction";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import ProjectDetail from "./ProjectDetail";
import Resume from "./Resume";
import type { Project } from "./sections/Projects";

type ViewType = "portfolio" | "project-detail" | "resume";

function Home() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>("portfolio");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentView("project-detail");
  };

  const handleResumeClick = () => {
    setCurrentView("resume");
  };

  const handleBackToPortfolio = () => {
    setCurrentView("portfolio");
    setSelectedProject(null);
    // Scroll to top first, then to projects section
    window.scrollTo({ top: 0, behavior: "instant" });
    setTimeout(() => {
      const projectsElement = document.getElementById("projects");
      if (projectsElement) {
        projectsElement.scrollIntoView({ behavior: "smooth" });
        setActiveSection("projects");
      }
    }, 100);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Only update active section if we're on the portfolio view
      if (currentView !== "portfolio") return;

      const sections = [
        "introduction",
        "about",
        "projects",
        "experience",
        "contact",
      ];

      // Find the section that's currently most visible
      let currentSection = "introduction";
      let maxVisibility = 0;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // Calculate how much of the section is visible
          const visibleTop = Math.max(0, -rect.top);
          const visibleBottom = Math.min(
            rect.height,
            viewportHeight - rect.top,
          );
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibilityRatio =
            visibleHeight / Math.min(rect.height, viewportHeight);

          if (visibilityRatio > maxVisibility) {
            maxVisibility = visibilityRatio;
            currentSection = section;
          }
        }
      }

      setActiveSection(currentSection);
    };

    // Initial call to set correct section on load
    if (currentView === "portfolio") {
      handleScroll();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentView]);

  if (currentView === "project-detail" && selectedProject) {
    return (
      <div className="min-h-screen bg-background relative">
        <BackgroundAnimation />
        <div className="hidden md:block">
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
        </div>
        <MobileHeader
          onMenuToggle={() => setIsMobileMenuOpen(true)}
          showBackButton={true}
          onBackClick={handleBackToPortfolio}
        />
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeSection={activeSection}
          onSectionChange={scrollToSection}
        />
        <ProjectDetail
          project={selectedProject}
          onBack={handleBackToPortfolio}
        />
      </div>
    );
  }

  if (currentView === "resume") {
    return (
      <div className="min-h-screen bg-background relative">
        <BackgroundAnimation />
        <div className="hidden md:block">
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
        </div>
        <MobileHeader onMenuToggle={() => setIsMobileMenuOpen(true)} />
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeSection={activeSection}
          onSectionChange={scrollToSection}
        />
        <Resume onBack={handleBackToPortfolio} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundAnimation />
      {/* Desktop Layout */}
      <div className="hidden md:flex">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={scrollToSection}
        />
        <div className="ml-64 flex-1 relative z-10">
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          <div className="max-w-4xl mx-auto px-8">
            <div id="introduction" className="section w-[845px]">
              <Introduction />
            </div>
            <div id="about" className="section">
              <About />
            </div>
            <div id="projects" className="section">
              <Projects onProjectClick={handleProjectClick} />
            </div>
            <div id="experience" className="section">
              <Experience />
            </div>
            <div id="contact" className="section">
              <Contact onResumeClick={handleResumeClick} />
            </div>

            {/* Footer */}
            <footer className="py-8 mt-20 border-t border-border/20">
              <div className="text-center">
                <p className="light-text text-sm">
                  Portfolio © 2025 Kaiden Pollesch. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
      {/* Mobile Layout */}
      <div className="md:hidden relative z-10">
        <MobileHeader onMenuToggle={() => setIsMobileMenuOpen(true)} />
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeSection={activeSection}
          onSectionChange={scrollToSection}
        />
        <div className="pt-16 px-4">
          <div id="introduction" className="section">
            <Introduction />
          </div>
          <div id="about" className="section">
            <About />
          </div>
          <div id="projects" className="section">
            <Projects onProjectClick={handleProjectClick} />
          </div>
          <div id="experience" className="section">
            <Experience />
          </div>
          <div id="contact" className="section">
            <Contact onResumeClick={handleResumeClick} />
          </div>

          {/* Footer */}
          <footer className="py-8 mt-20 border-t border-border/20">
            <div className="text-center px-4">
              <p className="light-text text-sm">
                Portfolio © 2025 Kaiden Pollesch. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Home;
