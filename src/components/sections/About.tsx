import {
  GraduationCap,
  Heart,
  Coffee,
  Code,
  Wrench,
  Database,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <section className="min-h-screen py-20">
      <div className="w-full">
        <h2
          id="about-heading"
          className="text-3xl md:text-4xl font-bold light-text mb-12"
        >
          About Me
        </h2>

        {/* Education Card - Full Width */}
        <Card className="bg-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start"></div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-lg">
                  Milwaukee School of Engineering
                </h4>
                <p className="text-sm text-muted-foreground">Exp. May, 2027</p>
              </div>
              <p className="text-sm text-muted-foreground">
                B.S. — Software Engineering, <em>Minor: Cybersecurity</em>
              </p>
              <p className="text-sm text-muted-foreground">GPA: 3.3</p>
              <div className="mt-4">
                <h5 className="font-semibold mb-2">Relevant Coursework</h5>
                <p className="text-sm text-muted-foreground">
                  Operating Systems, Databases, Software Requirements & Architecture, Software Verification, Design and Cloud Patterns, Procedural and Object-Oriented C++, Web Apps, Software Tools and Processes, Data Structures, Software Development, Discrete Math, Linear Algebra, Statistics
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Cards - Three Column Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Java</Badge>
                <Badge variant="outline">C#</Badge>
                <Badge variant="outline">C</Badge>
                <Badge variant="outline">C++</Badge>
                <Badge variant="outline">Python</Badge>
                <Badge variant="outline">HTML</Badge>
                <Badge variant="outline">CSS</Badge>
                <Badge variant="outline">JavaScript</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Markdown</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                Frameworks & Libraries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">Vite</Badge>
                {/* <Badge variant="outline">React Native</Badge> */}
                <Badge variant="outline">Next.js</Badge>
                <Badge variant="outline">Node.js</Badge>
                <Badge variant="outline">.NET</Badge>
                <Badge variant="outline">Bootstrap</Badge>
                <Badge variant="outline">Tailwind CSS</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Tools & Databases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Git</Badge>
                <Badge variant="outline">GitLab</Badge>
                <Badge variant="outline">GitHub</Badge>
                <Badge variant="outline">Bitbucket</Badge>
                <Badge variant="outline">AWS</Badge>
                <Badge variant="outline">SQL</Badge>
                <Badge variant="outline">MongoDB</Badge>
                <Badge variant="outline">Jetbrains Toolbox</Badge>
                <Badge variant="outline">Visual Studio</Badge>
                <Badge variant="outline">Postman</Badge>
                <Badge variant="outline">Docker</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interests and Hobbies - Two Column Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Reverse Engineering</Badge>
                {/* <Badge variant="outline">Open Source</Badge> */}
                <Badge variant="outline">Full-Stack Development</Badge>
                <Badge variant="outline">3D Printing</Badge>
                <Badge variant="outline">Mobile Development</Badge>
                <Badge variant="outline">Web Development</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coffee className="h-5 w-5 text-primary" />
                Hobbies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Drone Photography</Badge>
                <Badge variant="outline">Biking</Badge>
                <Badge variant="outline">Disc Golfing</Badge>
                <Badge variant="outline">Barefoot Water Ski</Badge>
                <Badge variant="outline">Light Engineering</Badge>
                <Badge variant="outline">Soccer</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold static-light mb-6">My Journey</h3>
          <p className="static-light leading-relaxed">
            My interest in software engineering was first started while observing a software team during a 
            general engineering internship at Accurate Controls. I was drawn to their ability to build solutions 
            from the ground up, and my own journey began there. I quickly learned that challenges are an inherent 
            part of the process—whether working with a scrum team to recreate Wordle or building a crucial internal 
            tool at Alliance Laundry Systems. That project, which required me to learn C# and .NET from scratch, 
            taught me that persistence and an open mind are just as important as the code itself. I'm driven to 
            apply this passion for problem-solving to help streamline workflows and improve daily operations, 
            proving that the right software can make a significant difference.
          </p>
        </div>
      </div>
    </section>
  );
}
