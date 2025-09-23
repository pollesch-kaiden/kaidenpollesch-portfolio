import { Github, Linkedin, Menu, X } from "lucide-react";
import {siHandshake } from "simple-icons";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function MobileMenu({
  isOpen,
  onClose,
  activeSection,
  onSectionChange,
}: MobileMenuProps) {
  if (!isOpen) return null;

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    onClose();
  };

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-background">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Menu</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4">
        <nav className="space-y-4 mb-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeSection === section.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-medium mb-4">Connect</h3>
          <div className="flex space-x-3">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/kaidenpollesch/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/pollesch-kaiden"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:text-foreground"
            >
              <a
                href="https://msoe.joinhandshake.com/profiles/kaidenpollesch"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d={siHandshake.path} />
                </svg>
              </a>
            </Button>
          </div>
        </div>

        <div className="border-t border-border pt-6 mt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
