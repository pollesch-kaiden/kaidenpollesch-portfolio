import { ExternalLink, Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
  skills: string[];
  type: "school" | "personal";
  status?: "in-progress" | "completed";
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  createdAt?: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card
      className="bg-card hover:shadow-lg transition-shadow cursor-pointer relative"
      onClick={() => onClick(project)}
    >
      {project.featured && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-featured-gradient text-white px-3 py-1 rounded-full text-xs font-semibold border-2 border-transparent bg-clip-padding">
            <div className="absolute inset-0 bg-featured-gradient rounded-full opacity-20"></div>
            <span className="relative z-10">Featured</span>
          </div>
        </div>
      )}
      <div className="aspect-video overflow-hidden rounded-t-xl">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg card-title">
              {project.title}
            </CardTitle>
            <div className="flex flex-col gap-2 shrink-0">
              <Badge
                variant={project.type === "school" ? "secondary" : "default"}
                className="whitespace-nowrap"
              >
                {project.type === "school" ? "School" : "Personal"}
              </Badge>
              <Badge
                variant={project.status === "completed" ? "default" : "outline"}
                className={`whitespace-nowrap ${project.status === "completed" ? "bg-green-600 hover:bg-green-700" : "border-yellow-500 text-yellow-600"}`}
              >
                {project.status === "completed" ? "Completed" : "In Progress"}
              </Badge>
            </div>
          </div>
          <CardDescription>
            {project.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="text-xs text-foreground border-primary"
              >
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex space-x-2">
            {project.githubUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}