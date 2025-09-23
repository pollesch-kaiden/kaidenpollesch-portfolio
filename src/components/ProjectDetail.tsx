import React from "react";
import { 
  ArrowLeft, 
  ExternalLink, 
  Github,
  ChevronLeft, 
  ChevronRight, 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "./sections/Projects";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  // Use images array if available, otherwise fallback to single image
  const projectImages =
    project.images && project.images.length > 0
      ? project.images
      : [project.image];


  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Adjust title font size to ensure single line
  React.useEffect(() => {
    const adjustTitleSize = () => {
      if (titleRef.current) {
        const element = titleRef.current;
        const container = element.parentElement;
        if (!container) return;

        const containerWidth = container.clientWidth - 16; // Account for padding

        // Start with largest font size and work down
        const fontSizes = [
          "text-6xl", // 60px
          "text-5xl", // 48px
          "text-4xl", // 36px
          "text-3xl", // 30px
          "text-2xl", // 24px
          "text-xl", // 20px
          "text-lg", // 18px
          "text-base", // 16px
        ];

        for (const fontSize of fontSizes) {
          element.className = `font-bold static-light leading-none whitespace-nowrap ${fontSize}`;

          if (element.scrollWidth <= containerWidth) {
            break;
          }
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(adjustTitleSize, 10);
    window.addEventListener("resize", adjustTitleSize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", adjustTitleSize);
    };
  }, [project.title]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + projectImages.length) % projectImages.length,
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 static-light hover:bg-white hover:text-black"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>

        <div className="space-y-8">
          <div>
            <div className="flex mb-4 min-h-[80px] items-start justify-between">
              <div className="flex-1 pr-4 h-[90px] flex justify-left">
                <h1
                  ref={titleRef}
                  className="font-bold static-light leading-none whitespace-nowrap text-6xl"
                >
                  {project.title}
                </h1>
              </div>
              <div className="flex space-x-2 flex-shrink-0 h-[80px] items-center">
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    asChild
                    className="text-foreground hover:text-foreground border-primary h-[45px]"
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button asChild className="h-[45px]">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {/* Project badges */}
          <div className="flex gap-2 mb-4">
            <Badge
              variant={project.type === "school" ? "secondary" : "default"}
            >
              {project.type === "school"
                ? "School Project"
                : "Personal Project"}
            </Badge>
            <Badge
              variant={project.status === "completed" ? "default" : "outline"}
              className={
                project.status === "completed"
                  ? "bg-green-600 hover:bg-green-700"
                  : "border-yellow-500 text-yellow-600"
              }
            >
              {project.status === "completed" ? "Completed" : "In Progress"}
            </Badge>
          </div>


          <div className="overflow-hidden rounded-xl mb-8">
            {/* Image Carousel */}
            <div className="relative">
              <div className="overflow-hidden rounded-xl bg-muted">
                <img
                  src={projectImages[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-auto object-contain max-h-[600px]"
                  style={{ aspectRatio: "auto" }}
                />
              </div>

              {/* Carousel Controls */}
              {projectImages.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {projectImages.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex
                            ? "bg-primary"
                            : "bg-background/50"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle>Project Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.fullDescription || project.description}
                  </p>
                </CardContent>
              </Card>

              {project.features && (
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            <div>
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle>Technologies Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-foreground border-primary"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
      </div>
    </div>
    </div>
  );
}
