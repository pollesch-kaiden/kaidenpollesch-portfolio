import { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string | string[];
  skills: string[];
  logo: string;
  companyUrl?: string;
}

interface CompanyGroup {
  company: string;
  logo: string;
  companyUrl?: string;
  totalDuration: string;
  positions: ExperienceItem[];
}

const mockExperiences: ExperienceItem[] = [
  {
    id: "94",
    company: "Alliance Laundry Systems",
    position: "IT Development Intern & Electrical Engineering Intern",
    location: "Ripon, Wi",
    startDate: "May 2025",
    endDate: "Present",
    description: [
      "IT Development Intern (Business Applications)",
      " - Main Project: Engineered a C#/.NET Windows Forms configuration tool from concept to deployment, creating an intuitive GUI that replaced a manual, error-prone byte editing process. This app improved task completion time by over 50% (from hours to seconds) and significantly reduced the risk of machine configuration errors.",
      " - Sustainable Development: Authored comprehensive documentation and commented code for the configuration tool to ensure a seamless project handoff and simplify future maintenance.",
      " - Data Automation: Developed a C#/.NET application to automate the parsing and importation of over 5,600 machine records from 15 disparate log files into a central database. This project transformed data retrieval time from hours of manual searching to seconds via simple queries, giving the team instant access to production data.",
      " - Process Improvement: Enhanced an existing engineering application by adding a Hex Byte viewer, providing an in-app solution that eliminated the need for external tools and accelerated the process of verifying machine configurations.",
      " ",
      "Electrical Engineering Intern",
      " - BOM Management: Built a BOM database (Zuken/SiliconExpert) to streamline sourcing, enable cost-effective bulk ordering, and simplify parts analysis.",
      " - Vendor Testing: Analyzed and compared new vendor products to support strategic sourcing decisions.",
      " - Quality Assurance: Ran QA tests on electrical components with oscilloscopes & multimeters to validate motor performance and safety in high/low voltage conditions.",
      " - Data Analysis: Analyzed life-test data to diagnose irregularities, distinguishing hardware vs. external faults to guide troubleshooting.",
      " - Documentation: Authored technical docs for a test fixture to enable independent equipment operation and improve team efficiency.",
      " - Hardware Rework: Soldered, reworked, and validated control boards for new projects, ensuring all connections met technical specs.IT ",
    ],
    skills: [
      "Bambu Lab 3D Printers",
      "Chromebooks",
      "TP-Link",
      "Microsoft 365",
    ],
    logo: "uploads/employeerLogos/als_logo.jpg",
    companyUrl: "https://alliancelaundry.com/",
  },
  {
    id: "95",
    company: "Boys and Girls Club of the Tri-County Area",
    position: "IT Support - Part-time",
    location: "Ripon, Wi & Berlin, Wi",
    startDate: "May 2025",
    endDate: "Present",
    description:
    "Provided technical support for staff and youth programs. Responsibilities included setting up Chromebooks, onboarding users with Microsoft accounts, managing local networking, configuring and troubleshooting 3D printers, and resolving on-site hardware and software issues to ensure smooth daily operations.",
    skills: [
      "Bambu Lab 3D Printers",
      "Chromebooks",
      "TP-Link",
      "Microsoft 365",
    ],
    logo: "uploads/employeerLogos/bgctric_logo.jpg",
    companyUrl: "https://bgctric.org/",
  },
  {
    id: "96",
    company: "Pollesch Construction Inc",
    position: "IT Support - Part-time",
    location: "Ripon, Wi",
    startDate: "Jan 2025",
    endDate: "Present",
    description:
    "Managed IT operations to support office. Set up and maintained a local mesh network using refurbished routers, ensured reliable scanning and printing to networked computers, and maintained camera systems.",
    skills: [
    ],
    logo: "uploads/employeerLogos/pollesch_const_logo.jpg",
    companyUrl: "https://pollesch.com/",
  },
  {
    id: "97",
    company: "Pollesch Construction Inc",
    position: "Construction Employee (Winter Break)",
    location: "Ripon, Wi",
    startDate: "Dec 2024",
    endDate: "Jan 2025",
    description:
    "",
    skills: [
    ],
    logo: "uploads/employeerLogos/pollesch_const_logo.jpg",
    companyUrl: "https://pollesch.com/",
  },
  {
    id: "98",
    company: "Accurate Controls Inc.",
    position: "Software Engineering Intern",
    location: "Ripon, Wi",
    startDate: "May 2024",
    endDate: "Aug 2024",
    description: [
      "SQL Database Bootstrap Frontend",
      " - Designed front-end interface in bootstrap for an internal SQL database to streamline data entry for the manufacturing team.",
      " - Used python flask to connect the front-end to the SQL database and handle form submissions.",
      " - Newly flashed devices are now able to be entered into the database and labels printed for hardware.",
    ],
    skills: ["Bootstrap", "HTML", "CSS", "Python", "Python Flask", "Jira", "Bitbucket", "SQL", "Docker", "Scripting"],
    logo: "uploads/employeerLogos/aci_logo.jpg",
    companyUrl: "https://accuratecontrols.com/",
  },
  {
    id: "99",
    company: "Accurate Controls Inc.",
    position: "CAD Engineering Intern",
    location: "Ripon, Wi",
    startDate: "Aug 2021",
    endDate: "May 2024",
    description: [
      "CAD Drafter for Judicial Security Systems",
      " - Drafed System Designs in AutoCAD based on project specifications and client requirements.",
      " - Made revisions based on engineer feedback and ensured designs met industry standards.",
      " - Maintained organized digital filing system for easy retrieval of project documents.",
      " - Drafted floor plans of device locations, rack layouts with power calcualtions and circuit layout, connections between devices and network layout.",
      " - Mentored new interns on CAD best practices and company standards to ensure consistent quality across projects.",

    ],
    skills: ["Bluebeam Revu", "Autodesk", "AutoCAD", "Revit", "Leadership"],
    logo: "uploads/employeerLogos/aci_logo.jpg",
    companyUrl: "https://accuratecontrols.com/",
  },
  {
    id: "100",
    company: "Accurate Controls Inc.",
    position: "Engineering Intern",
    location: "Ripon, Wi",
    startDate: "May 2021",
    endDate: "Aug 2021",
    description: [
      "Engineering Intern: Set up Video Management Systems in-house",
      " - Made connections between the Video Management Systems, cameras, and network switches.",
      " - Set up workstions with necessary software and user accounts.",
      " - Tested camera connections and system functionality, troubleshot bugs.",
    ],
    skills: ["Networking", "VLAN", "MS Office"],
    logo: "uploads/employeerLogos/aci_logo.jpg",
    companyUrl: "https://accuratecontrols.com/",
  },
  
];

// Helper function to group and sort experiences by company
const groupExperiencesByCompany = (
  experiences: ExperienceItem[],
): CompanyGroup[] => {
  const companyMap = new Map<string, CompanyGroup>();
  
  experiences.forEach((exp) => {
    if (!companyMap.has(exp.company)) {
      companyMap.set(exp.company, {
        company: exp.company,
        logo: exp.logo,
        companyUrl: exp.companyUrl,
        totalDuration: "",
        positions: [],
      });
    }
    companyMap.get(exp.company)!.positions.push(exp);
  });

  // Sort positions within each company from most recent to oldest
  companyMap.forEach((group) => {
    group.positions.sort((a, b) => {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });

    if (group.positions.length === 1) {
      const pos = group.positions[0];
      group.totalDuration = `${pos.startDate} - ${pos.endDate}`;
    } else {
      const earliest = group.positions[group.positions.length - 1].startDate;
      const latest = group.positions[0].endDate;
      group.totalDuration = `${earliest} - ${latest}`;
    }
  });

  // Sort companies by the most recent end date of their positions (most recent company first)
  const sortedCompanies = Array.from(companyMap.values()).sort((a, b) => {
    const aLatest = a.positions[0].endDate === "Present" ? new Date() : new Date(a.positions[0].endDate);
    const bLatest = b.positions[0].endDate === "Present" ? new Date() : new Date(b.positions[0].endDate);
    return bLatest.getTime() - aLatest.getTime();
  });

  return sortedCompanies;
};

export default function Experience() {
  const [showAll, setShowAll] = useState(false);
  const companyGroups = groupExperiencesByCompany(mockExperiences);
  const displayedGroups = showAll ? companyGroups : companyGroups.slice(0, 3);

  const handleCompanyClick = (companyUrl?: string) => {
    if (companyUrl) {
      window.open(companyUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="min-h-screen py-20">
      <div className="w-full">
        <h2
          id="experience-heading"
          className="text-3xl font-bold light-text mb-[3px] md:text-3xl"
        >
          Experience
        </h2>

        <div className="space-y-8">
          {displayedGroups.map((group) => (
            <Card key={group.company} className="bg-card overflow-hidden">
              {/* Company Header */}
              <CardHeader
                className={`pb-4 ${group.companyUrl ? "cursor-pointer hover:bg-muted/50 transition-colors" : ""}`}
                onClick={() => handleCompanyClick(group.companyUrl)}
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={group.logo}
                    alt={`${group.company} logo`}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl font-bold text-foreground">
                      {group.company}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {group.totalDuration}
                    </p>
                  </div>
                  {group.companyUrl && (
                    <div className="text-muted-foreground hover:text-foreground transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </CardHeader>

              {/* Positions */}
              <CardContent className="pt-0">
                <div className="space-y-6">
                  {group.positions.map((position, index) => (
                    <div key={position.id} className="relative">
                      {/* Timeline connector */}
                      {index < group.positions.length - 1 && (
                        <div className="absolute left-2 top-8 w-px h-16 bg-border"></div>
                      )}

                      <div className="flex items-start space-x-4">
                        {/* Timeline dot */}
                        <div className="w-4 h-4 rounded-full bg-primary flex-shrink-0 mt-1"></div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-foreground">
                            {position.position}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {position.startDate} - {position.endDate}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 mt-1 sm:mt-0">
                              <MapPin className="h-4 w-4" />
                              <span>{position.location}</span>
                            </div>
                          </div>

                          {Array.isArray(position.description) ? (
                            <ul className="list-disc pl-5 text-muted-foreground mt-3 leading-relaxed">
                              {position.description.map((item, idx) => {
                                const isIndented = typeof item === 'string' && item.trim().startsWith('-');
                                if (isIndented && typeof item === 'string') {
                                  // Find the first dash and first colon
                                  const dashIdx = item.indexOf('-');
                                  const colonIdx = item.indexOf(':');
                                  if (dashIdx !== -1 && colonIdx !== -1 && colonIdx > dashIdx) {
                                    const before = item.slice(0, dashIdx + 1); // includes dash
                                    const bold = item.slice(dashIdx + 1, colonIdx + 1); // includes colon
                                    const after = item.slice(colonIdx + 1);
                                    return (
                                      <li key={idx} className="pl-4 list-[circle]">
                                        {before}
                                        <span className="font-bold">{bold}</span>
                                        {after}
                                      </li>
                                    );
                                  }
                                }
                                // If not indented, make the whole line bold
                                return (
                                  <li
                                    key={idx}
                                    className={isIndented ? 'pl-4 list-[circle]' : ''}
                                  >
                                    {!isIndented ? <span className="font-bold">{item}</span> : item}
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground mt-3 leading-relaxed">
                              {position.description}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-2 mt-4">
                            {position.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {companyGroups.length > 3 && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="text-foreground hover:text-foreground border-foreground/30 bg-background h-[45px]"
            >
              {showAll ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
