import { Github, Linkedin } from "lucide-react";
import {siHandshake, } from "simple-icons";
import { Button } from "@/components/ui/button";

interface SidebarProps {
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

export default function Sidebar({
  activeSection,
  onSectionChange,
}: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-background/80 border-r border-border/50 p-6 flex flex-col justify-between z-20">
      <div>
        <div className="mb-16">
          <h1 className="text-3xl font-bold text-foreground mb-2">Kaiden Pollesch</h1>
          <p className="text-lg text-foreground/80">Software Engineer</p>
          <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
            Cybersecurity
          </p>
        </div>

        <nav className="space-y-1">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className="group flex items-center w-full text-left py-3 transition-all duration-200 hover:text-foreground"
              >
                <div
                  className={`h-px bg-foreground transition-all duration-200 mr-4 ${
                    isActive ? "w-16" : "w-8 group-hover:w-12"
                  }`}
                />
                <span
                  className={`text-xs uppercase tracking-widest font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-foreground text-sm"
                      : "text-foreground/70 group-hover:text-foreground"
                  }`}
                >
                  {section.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
      <div className="space-y-4">
        <div className="flex space-x-3">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hover:text-foreground"
          >
            <a
              href="https://www.linkedin.com/in/kaidenpollesch/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hover:text-foreground"
          >
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
    </div>
  );
}
