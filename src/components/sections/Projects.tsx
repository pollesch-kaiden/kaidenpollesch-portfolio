import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ProjectCard from "../ProjectCard";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  images?: string[]; // Multiple images for carousel
  skills: string[];
  type: "school" | "personal";
  status?: "completed" | "in-progress"; // Project status
  githubUrl?: string;
  liveUrl?: string;
  fullDescription?: string;
  features?: string[];
  featured?: boolean;
  createdAt?: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Disc Golf Rack",
    description: "Solution designed to store and organize disc golf discs",
    image:
      "uploads/projectPics/DiscGolfRack/Step7.JPG",
    images: [
      "uploads/projectPics/DiscGolfRack/Step1.JPG",
      "uploads/projectPics/DiscGolfRack/Step2.JPG",
      "uploads/projectPics/DiscGolfRack/Step3.JPG",
      "uploads/projectPics/DiscGolfRack/Step4.JPG",
      "uploads/projectPics/DiscGolfRack/Step5.JPG",
      "uploads/projectPics/DiscGolfRack/Step6.JPG",
      "uploads/projectPics/DiscGolfRack/Step7.JPG"
    ],
    skills: ["Carbide Create", "CNC Machining", "Woodworking"],
    type: "personal",
    status: "completed",
    fullDescription:
      "The problem of having more discs than can fit in my bag became apparent as I started to get more serious about disc golf. I needed a way to store and organize my growing collection of discs at home. After researching various storage solutions, I decided to design and build a custom disc golf rack using CNC machining techniques.",
    features: [
      "Product Design",
      "Prototyping",
      "Assembly and Testing",
      "Modular Design",
    ],
    createdAt: "2023-06-18",
  },
  {
    id: "2",
    title: "GUI Project: Image Translator",
    description: "Create a JavaFX application that translates images.",
    image:
      "uploads/projectPics/DS/Lab1,2,3,5/thumbnail.png",
      images: [
        "uploads/projectPics/DS/Lab1,2,3,5/sceneBuilder_LAB5.png",
      "uploads/projectPics/DS/Lab1,2,3,5/Adding Images.png",
      "uploads/projectPics/DS/Lab1,2,3,5/Mean.png",
      "uploads/projectPics/DS/Lab1,2,3,5/Median.png",
      "uploads/projectPics/DS/Lab1,2,3,5/Min.png",
      "uploads/projectPics/DS/Lab1,2,3,5/Max.png",
      "uploads/projectPics/DS/Lab1,2,3,5/Random.png",
    ],
    skills: ["Java", "JavaFX", "Swing", "Scene Builder"],
    type: "school",
    status: "completed",
    githubUrl: "https://github.com/pollesch-kaiden/csc1120/tree/master/Week5/lab5-polleschk",
    fullDescription: "Data Structures Lab 1, 2, 3 & 5: Create a JavaFX application that takes in any number of the same resolution images, compiles them into an 2D array, and allows the user to choose what the final output of each pixel will be by using differnt buttons. The different buttons (Mean, Median, Max, Min and Random) are as seen in the first image above.",
    features: [
      "Calculate the `Mean` of each pixel for the output image",
      "Calculate the `Median` of each pixel for the output image",
      "Calculate the `Max` of each pixel for the output image",
      "Calculate the `Min` of each pixel for the output image",
      "Calculate a `Random` of each pixel based on input images for the output image",
    ],
    createdAt: "2024-02-21",
  },
  {
    id: "3",
    title: "Data Structure Graphing",
    description:
      "A JavaFX application that benchmarks custom data structures and visualizes their performance through charts.",
    image:
      "uploads/projectPics/DS/Lab6,7/datastructures.ArrayList_addToFront.png",
    images: [
      "uploads/projectPics/DS/Lab6,7/datastructures.ArrayList_addToFront.png",
      "uploads/projectPics/DS/Lab6,7/datastructures.ArrayList_indexedContains.png",
      "uploads/projectPics/DS/Lab6,7/datastructures.LinkedList_addToFront.png",
      "uploads/projectPics/DS/Lab6,7/datastructures.LinkedList_indexedContains.png",
      "uploads/projectPics/DS/Lab6,7/datastructures.LinkedListTurbo_indexedContains.png",
    ],
    skills: ["Java", "JavaFX", "XYChart"],
    type: "school",
    status: "completed",
    githubUrl: "https://github.com/pollesch-kaiden/csc1120/tree/master/Week7/lab7-polleschk",
    fullDescription:
      "Data Structures Lab 6 & 7: Implement custom ArrayList, LinkedList, and LinkedListTurbo classes, then develop a comprehensive benchmarking system to measure and compare their performance against Java's built-in collections. The project includes a command-line tool that tests both indexedContains and contains operations, followed by a JavaFX application that visualizes the benchmark results through interactive charts. The lab concludes with automatic PNG export of performance graphs and generation of a formal report that combines Big-O theoretical analysis with empirical performance data",
    features: [
      "Data Visualization",
      "PNG Export Functionality",
      "Visual Comparison of Data Structures",
      "Comporehensive Performance Analysis",
    ],
    createdAt: "2024-03-23",
  },
  {
    id: "4",
    title: "Data Structure Benchmarking",
    description:
      "TODO",
    image:
      "uploads/projectPics/DS/Lab11, 13/thumbnail.png",
      images: [
      "uploads/projectPics/DS/Lab11, 13/partialTiming.png",
      "uploads/projectPics/DS/Lab11, 13/searchDataInWordsLab11.png",
      "uploads/projectPics/DS/Lab11, 13/searchDataInWordsLab13.png",
    ],
    skills: ["Java", "JavaFX",],
    type: "school",
    status: "completed",
    githubUrl: "https://github.com/pollesch-kaiden/csc1120/tree/master/Week13/lab-13-polleschk",
    fullDescription:
      "Data Structures Lab 11 & 13: TODO",
    features: [
      "Text File Processing",
      "TODO",
      "TODO",
      "TODO",
    ],
    createdAt: "2024-04-30",
  },
  {
    id: "5",
    title: "Data Structure Graphing Revisited",
    description: "TODO",
    image:
      "uploads/projectPics/DS/Lab14/exactMatchOL.png",
    images: [
      "uploads/projectPics/DS/Lab14/addHT.png",
      "uploads/projectPics/DS/Lab14/addOL.png",
      "uploads/projectPics/DS/Lab14/addT.png",
      "uploads/projectPics/DS/Lab14/allMatchesHT.png",
      "uploads/projectPics/DS/Lab14/allMatchesOL.png",
      "uploads/projectPics/DS/Lab14/allMatchesT.png",
      "uploads/projectPics/DS/Lab14/exactMatchesHT.png",
      "uploads/projectPics/DS/Lab14/exactMatchesOL.png",
      "uploads/projectPics/DS/Lab14/exactMatchesT.png",
      "uploads/projectPics/DS/Lab14/exactMatchOL.png",
    ],
    skills: ["Java", "JavaFX", "XYChart",],
    type: "school",
    status: "completed",
    githubUrl: "https://github.com",
    fullDescription:
      "Data Structures Lab 14:",
    features: [
      "TODO",
      "TODO",
      "TODO",
      "TODO",
    ],
    createdAt: "2024-05-05",
  },
  {
    id: "6",
    title: "Culvers Menu",
    description: "Mimic the Culvers menu app to practice React and filtering.",
    image:
      "uploads/projectPics/WebApps/culversMenu/unfilteredScreen.png",
    images: [
      "uploads/projectPics/WebApps/culversMenu/unfilteredScreen.png",
      "uploads/projectPics/WebApps/culversMenu/filteredScreen.png",
    ],
    skills: ["React", "Vite", "JavaScript", "HTML", "CSS","Bootstrap"],
    type: "school",
    status: "completed",
    githubUrl: "https://github.com/pollesch-kaiden/swe2511/tree/master/react-menu-filter-polleschk",
    liveUrl: "TODO",
    fullDescription:
      "This is a front-end React application designed to mimic restaurant menu, so customers can filter menu items based on dietary restrictions and preferences, with a particular focus on food allergens. The project addresses the serious concern of food allergies by providing an intuitive interface to filter out menu items containing specific allergens.",
    features: [
      "Real-tiome Name Search Filtering",
      "Food Type Dropdown Filtering",
      "Food Allergen Filtering",
      "Responsive Grid Layout",
    ],
    createdAt: "2024-12-11",
  },
  {
    id: "7",
    title: "Bird Visualizer",
    description: "Pull bird sighting data from the eBird API and visualize it on a map.",
    image:
      "uploads/projectPics/WebApps/eBirdVisualizer/eBirdVisualizerMKE.png",
    images: [
      "uploads/projectPics/WebApps/eBirdVisualizer/eBirdVisualizerMKE.png",
      "uploads/projectPics/WebApps/eBirdVisualizer/eBirdVisualizerFond_du_lac.png",
      "uploads/projectPics/WebApps/eBirdVisualizer/popup.png",
    ],
    skills: ["Leaflet", "eBird API", "CSS", "HTML", "JavaScript"],
    type: "school",
    status: "completed",
    githubUrl: "https://github.com/pollesch-kaiden/swe2511/tree/master/bird-visualizer-polleschk",
    fullDescription:
      "This is a dynamic web application that combines real-time bird sighting data from the Cornell Lab of Ornithology's eBird API with interactive mapping capabilities using the Leaflet JavaScript library. The project demonstrates asynchronous JavaScript programming and third-party API integration to create a practical tool for bird enthusiasts and researchers.",
    features: [
      "Real-time data fetching from the eBird API",
      "Automatic data updates on user pan and zoom",
      "Custom Popup showing detailed bird information",
      "Dynamic marker management",
    ],
    createdAt: "2024-11-01",
  },
  {
    id: "8",
    title: "Blogger",
    description:
      "Blog that allows users to creat, views, filter and delte blog posts with hashtags.",
    image:
      "uploads/projectPics/WebApps/blogger/withposts.png",
    images: [
      "uploads/projectPics/WebApps/blogger/withposts.png",
      "uploads/projectPics/WebApps/blogger/noposts.png",
      "uploads/projectPics/WebApps/blogger/filteredposts.png",
      "uploads/projectPics/WebApps/blogger/badhashtag.png",
    ],
    skills: ["Express API", "Mongoose API", "MongoDB", "HTML", "CSS", "JavaScript", "Bootstrap"],
    type: "school",
    status: "completed",
    githubUrl: "https://github.com/pollesch-kaiden/swe2511/tree/master/blogger-polleschk",
    liveUrl: "TODO",
    fullDescription:
      "This is a comprehensive full-stack web application that demonstrates modern web development practices by combining client-side JavaScript with a Node.js/Express backend and MongoDB database integration. The project creates a complete blogging platform with hashtag functionality and real-time filtering capabilities.",
    features: [
      "Create posts with hashtags",
      "View posts sorted by creation date",
      "Delete individual posts with confirmation",
      "Persistent storage using MongoDB",
    ],
    createdAt: "2024-11-19",
  },
  {
    id: "9",
    title: "Drawing App",
    description:
      "Drawing application that allows users to draw on a canvas and save their artwork.",
    image:
      "uploads/projectPics/WebApps/drawingApp/drawingAppCropped.png",
    images: [
      "uploads/projectPics/WebApps/drawingApp/drawingApp.png",
    ],
    skills: ["HTML", "CSS", "JavaScript", "Bootsrap", "Canvas API"],
    type: "school",
    status: "completed",
    githubUrl: "https://github.com/pollesch-kaiden/swe2511/tree/master/drawing-app-the-code-compilers",
    liveUrl: "TODO",
    fullDescription:
      "This is a collaborative group project that creates a comprehensive web-based drawing application using HTML5 Canvas API, demonstrating advanced client-side graphics programming and user interface design. The project combines foundational canvas learning with creative feature development to build a functional digital art tool.",
    features: [
      "Canvas drawing",
      "Drawing tool color selection",
      "Background color selection",
      "Drawing size selection",
      "Clear canvas functionality",
    ],
    createdAt: "2024-10-29",
  },
  {
    id: "10",
    title: "Wordle Clone",
    description:
      "Recreate wordle with as many features as possible in one semester.",
    image:
      "uploads/projectPics/Tools/WelcomePage.png",
    images: [
      "uploads/projectPics/Tools/WelcomePage.png",
      "uploads/projectPics/Tools/Sign-Up_Page.png",
      "uploads/projectPics/Tools/Sign-In_Page.png",
      "uploads/projectPics/Tools/WordleGame.png",
      "uploads/projectPics/Tools/WordleGameComplete.png",
    ],
    skills: ["Java", "JavaFX", "Scrum", "Agile", "GitLab","Enterprise Architect"],
    type: "school",
    status: "completed",
    githubUrl: "https://github.com/pollesch-kaiden/swe2710",
    fullDescription:
      "Worked in a team of 4 to recreate the popular game Wordle using Java and JavaFX. The project was managed using Scrum methodologies, with regular sprints and stand-up meetings to ensure progress and address any challenges. Utilized GitLab for version control and collaboration, ensuring smooth integration of code from all team members. Employed Enterprise Architect for designing the system architecture and creating UML diagrams to visualize the application's structure and flow.",
    features: [
      "Guest play",
      "Sign-up system",
      "Sign-in system with user authentication",
      "Interactive on-screen keyboard",
      "Dictionary loading from text file",
    ],
    featured: true,
    createdAt: "2024-12-09",
  },
  {
    id: "11",
    title: "Bee Garden",
    description:
      "Three-phase project creating a bee garden simulator using JavaFX and design patterns.",
    image:
      "uploads/projectPics/Cloud/GardenLab/Lab5Game.png",
      images: [
        "uploads/projectPics/Cloud/GardenLab/Lab3Game.png",
        "uploads/projectPics/Cloud/GardenLab/WelcomePageLab4.png",
        "uploads/projectPics/Cloud/GardenLab/Lab4Game.png",
        "uploads/projectPics/Cloud/GardenLab/WelcomePageLab5.png",
        "uploads/projectPics/Cloud/GardenLab/Lab5Game.png",
    ],
    skills: ["Java,", "JavaFX", "GitHub", "Design Patterns"],
    type: "school",
    status: "completed",
    githubUrl: "https://github.com/pollesch-kaiden/swe2410/tree/master/lab3-bee-lab",
    fullDescription:
      "This is a comprehensive three-phase, two person project that teaches advanced object-oriented design, JavaFX application development, and design pattern implementation through the creation of a sophisticated garden ecosystem simulation. The project progresses from initial system design through full implementation to advanced pattern integration. The Garden Ecosystem Simulator is a JavaFX-based application that models a dynamic ecosystem where different types of bees interact with various flowers in a top-down garden view. The system demonstrates complex object-oriented relationships, real-time simulation mechanics, and extensible architecture design principles. Built for botanist research applications, the simulator emphasizes biological accuracy while maintaining educational value for software engineering concepts.",
    features: [
      "Right arrow tick progression",
      "Different bee types with unique movements",
      "Different flower types with unique behaviors",
      "Design Patterns: Adapter, Strategy, Observer, Decorator",
    ],
    createdAt: "2025-02-25",
  },
 {
    id: "12",
    title: "MSOE Room Access System",
    description:
      "Create a role-based access control system for MSOE rooms on campus.",
    image:
      "uploads/projectPics/Cloud/ACS/RoleChangeToStudent.png",
      images: [
      "uploads/projectPics/Cloud/ACS/RoleChangeToStudent.png",
      "uploads/projectPics/Cloud/ACS/StudentOpenClassroom.png",
      "uploads/projectPics/Cloud/ACS/StudentOpenTeacherOffice.png",
      "uploads/projectPics/Cloud/ACS/RoleChangeToTeacher.png",
      "uploads/projectPics/Cloud/ACS/TeacherOpenTeacherOffice.png",
    ],
    skills: ["Java", "JavaFX", "GitHub", "Design Patterns", "Enterprise Architect"],
    type: "school",
    status: "completed",
    githubUrl: "https://github.com/pollesch-kaiden/swe2410/tree/master/presentation-lab-eckdale-dudly_hurndon_pollesch_palacios",
    fullDescription:
      "In a team of 5, we created a role-based access control system for MSOE rooms on campus using Java and JavaFX. The project involved designing the UML and Sequence Diagrams with Enterprise Architect, implementing user roles (Student, Teacher, Custodial, Admin) with specific permissions, and developing a user-friendly interface for managing access. The system allows users to request access to rooms based on their roles, with Teachers and Admins having elevated privileges. The project was managed using GitHub for version control and collaboration.",
    features: [
      "Role based access control",
      "Role switching to test different permissions",
      "Multiple building and room access",
      "Visual feedback on access attempts",
      "Design Pattern: Chain of Responsibility",
    ],
    createdAt: "2025-05-01",
  },
  {
    id: "13",
    title: "Retro Galaga Spinoff - Crabs and Coconuts",
    description:
      "JavaFX spinoff of classic Galaga game with observer design pattern using crabs and coconuts.",
    image:
      "uploads/projectPics/Cloud/GalagaSpinOff/Starting.png",
    images: [
      "uploads/projectPics/Cloud/GalagaSpinOff/Starting.png",
      "uploads/projectPics/Cloud/GalagaSpinOff/Playing-Shooting.png",
      "uploads/projectPics/Cloud/GalagaSpinOff/CrabDead.png",
    ],
    skills: ["Java", "JavaFX", "GitHub", "Design Patterns", "Enterprise Architect"],
    type: "school",
    status: "completed",
    githubUrl: "https://github.com/pollesch-kaiden/swe2410/tree/master/observer-lab-gillj-polleschk",
    fullDescription:
      "In a team of 2, we created a spinoff of the classic Galaga arcade game using Java and JavaFX, featuring crabs as enemies and coconuts as projectiles. The game incorporates the Observer design pattern to manage interactions between game entities, such as player bullets and the coconuts actions. Players control the crab left and right with the arrows and shoots bullets at falling coconuts, with the objective of scoring points by hitting the coconuts while avoiding collisions. The project involved designing UML diagrams with Enterprise Architect, implementing game mechanics, and creating an engaging user interface.",
    features: [
      "Interactive arcade-style gameplay",
      "Real-time score tracking",
      "Collision detection between game entities",
      "Game state management (start, pause, resume, end)",
      "Design Pattern: Observer",
    ],
    featured: true,
    createdAt: "2025-03-11",
  },
  {
    id: "14",
    title: "Checkers",
    description:
      "JavaFX implementation of the classic game of Checkers using the strategy design pattern.",
    image:
      "uploads/projectPics/Cloud/Checkers/Start.png",
      images: [
      "uploads/projectPics/Cloud/Checkers/Start.png",
      "uploads/projectPics/Cloud/Checkers/KingPiece.png",
      "uploads/projectPics/Cloud/Checkers/KingOut.png",
    ],
    skills: ["Java", "JavaFX", "Design Patterns", "GitHub", "Enterprise Architect"],
    type: "school",
    status: "completed",
    githubUrl: "https://github.com/pollesch-kaiden/swe2410/tree/master/lab-1-checkers-polleschk",
    fullDescription:
      "This individual project starts with a functional 6x6 checkers game that supports basic piece movement and capturing but lacks king pieces and proper move validation. Phase 1 focuses on implementing king functionality - pieces that reach the opposite end become kings (visually represented by two stacked ellipses) and can move both forward and backward. Students must identify specific code locations for piece creation, movement validation, capture logic, and visual rendering without changing files other than Piece.java. Phase 2 refactors the solution using the Strategy Pattern to eliminate if statements based on piece types (regular vs. king), creating MoveBehavior classes that encapsulate different movement rules and improve code cohesion.",
    features: [
      "King piece functionality (Double ellipse representation)",
      "Proper capture validation preventing illegal moves and preventing same-color jumps",
      "Separation of movement logic using Strategy Design Pattern",
      "Design Pattern: Strategy",
    ],
    createdAt: "2025-01-30",
  },
  {
    id: "15",
    title: "Mutation Testing",
    description:
      "Exploring mutation testing techniques in Java using the TestNG framework and the PIT testing tool.",
    image:
      "uploads/projectPics/SoftVerif/mutation-testingDataProviders.png",
      images: [
      "uploads/projectPics/SoftVerif/mutation-testingDataProviders.png",
      "uploads/projectPics/SoftVerif/mutation-testingTests.png",
    ],
    skills: ["Java", "JavaFX", "Gradle", "TestNG", "PIT Testing", "JaCoCo"],
    type: "school",
    status: "completed",
    githubUrl: "https://github.com/pollesch-kaiden/swe2721/tree/master/2025-lab13-mutation-testing-121_betz_pollesch_lab13_2025",
    fullDescription:
      "This lab introduces students to mutation testing as a quality assessment technique for unit test suites. Students work with a provided transcriptAnalyzer project containing classes like CompletedCourse, Term, and Transcript, along with an existing test suite. Using the PIT mutation testing tool, students analyze how well their tests detect artificially introduced code changes (mutations). The lab involves measuring initial code coverage with JaCoCo, running PIT mutation tests to generate mutants, analyzing which mutants survive (indicating weak tests), and systematically improving the test suite to achieve higher mutation scores. Students must distinguish between equivalent mutants (functionally identical to original code) and stubborn mutants (could be killed but difficult to test), culminating in a comprehensive analysis report.",
    features: [
      "Experience with PIT mutation testing framework",
      "Analyssis of equivalent vs. stubbor mutants",
      "Integration of multiple testing tools, Java Code Coverage (JaCoCo), PIT, TestNG",
      "Systematic evaluation of test suite effectiveness",
    ],
    createdAt: "2025-05-06",
  },
  {
    id: "16",
    title: "Dig Dug Terminal Spinoff",
    description:
      "Console based C++ implementation of the classic Dig Dug arcade gam freatureing grid-based movement",
    image:
      "uploads/projectPics/CPP/digdugStart.png",
      images: [
        "uploads/projectPics/CPP/digdugStart.png",
        "uploads/projectPics/CPP/pickedUpAmmo.png",
    ],
    skills: ["Object-Oriented C++", "CMake"],
    type: "school",
    status: "completed",
    githubUrl: "https://github.com/pollesch-kaiden/csc2210/tree/master/polleschk_SPA4_wumpus_variant",
    fullDescription:
      "This project recreates the essential gameplay elements of Dig Dug in a text-based format using C++. Players navigate a 10x6 grid world, collecting ammo (represented by ^ symbols) and attempting to defeat a moving enemy marked as E. The game features keyboard-controlled movement using WASD keys, a two-phase firing system where players press F then specify direction, and an enemy AI that moves either vertically or horizontally based on initial game configuration. The implementation demonstrates object-oriented programming principles through the use of structs for game entities (player, enemy, bullets) and provides a complete game loop with win/lose conditions, help system, and quit functionality.",
    features: [
      "Grid-based movement and navigation with WASD controls",
      "Two-phase firing system (press F then direction)",
      "Random placement of player, enemy, and ammo on grid",
      "Enemy with horizontal or vertical movement patterns",
    ],
    createdAt: "2025-03-31",
  },
  {
    id: "17",
    title: "Portfolio Website",
    description:
      "Cerate a personal portfolio website to showcase projects and skills.",
    image:
      "uploads/projectPics/portfolio/intro_dark.png",
      images: [
      "uploads/projectPics/portfolio/intro_dark.png",
      "uploads/projectPics/portfolio/intro_light.png",
      "uploads/projectPics/portfolio/project_light.png",
      "uploads/projectPics/portfolio/project_dark.png",
      "uploads/projectPics/portfolio/experience_dark.png",
      "uploads/projectPics/portfolio/experience_light.png",
    ],
    skills: ["React", "Node.js", "TypeScript", "Tailwind CSS", "Vite", "Lucide-React", "Simple-Icons", "Vercel"],
    type: "personal",
    status: "completed",
    githubUrl: "https://github.com/pollesch-kaiden/TODO",
    fullDescription:
      "Created a personal portfolio website using React and Tailwind CSS to showcase a more indepth look at my resume including my projects, skills, and experience. The website has a modern design, responsive layout, and interactive elements. Implemented background in hex that follows the cursor, project filtering, and contact form functionality to provide a comprehensive overview of my work.",
    features: [
      "More in-depth resume",
      "Project pages to showcase projects",
      "Contact form to get in touch",
      "Light and dark mode",
      "Links to LinkedIn, Handshake, and GitHub",
    ],
    createdAt: "2025-09-30",
  },
  // {
  //   id: "18",
  //   title: "Bible Study Tool",
  //   description:
  //     "Short description",
  //   image:
  //     "uploads/projectPics/THUMBNAILPATH.png",
  //   images: [
  //     "uploads/projectPics/MAINPATH/IMAGE1.png",
  //     "uploads/projectPics/MAINPATH/IMAGE2.png",
  //     "uploads/projectPics/MAINPATH/IMAGE3.png",
  //   ],
  //   skills: ["SKILL1", "SKILL2", "SKILL3"],
  //   type: "personal",
  //   status: "in-progress",
  //   // githubUrl: "https://github.com/pollesch-kaiden/PATH",
  //   fullDescription:
  //     "Detailed description",
  //   features: [
  //     "Feature 1",
  //     "Feature 2",
  //     "Feature 3",
  //     "Feature 4",
  //   ],
  //   featured: true,
  //   createdAt: "YYYY-MM-DD",
  // },
  {
    id: "19",
    title: "Reverse Engineering App",
    description:
      "Year long project reverse application that will take source code and output UML or sequence diagrams.",
    image:
      "uploads/MSOE_Logo.svg",
    images: [
      "uploads/MSOE_Logo.svg",
    ],
    skills: ["Java", "Python", "PlantUML", "Graphviz", "JDeploy", "Electron"],
    type: "school",
    status: "in-progress",
    // githubUrl: "https://github.com/pollesch-kaiden/PATH",
    fullDescription:
      "In progress of developing a reverse engineering application that will take source code and output UML or sequence diagrams. The application will support multiple programming languages, starting with java, and will be able to generate different types of diagrams based on the input source code. The application will utilize either PlantUML or Graphviz for diagram generation. Our goal is to make it both a desktop application as well as a plugin to IntelliJ adn CLion so the code can be imported right from the IDE.",
    features: [
      "UML diagram generation from source code",
      "Sequence diagram generation from source code",
      "IDE plugin support for IntelliJ and CLion",
      "Output diagrams to multiple formats (PNG, SVG, etc.)",
    ],
    createdAt: "2026-05-16",
  },
  // {
  //   id: "##",
  //   title: "Name",
  //   description:
  //     "Short description",
  //   image:
  //     "uploads/projectPics/THUMBNAILPATH.png",
  //   images: [
  //     "uploads/projectPics/MAINPATH/IMAGE1.png",
  //     "uploads/projectPics/MAINPATH/IMAGE2.png",
  //     "uploads/projectPics/MAINPATH/IMAGE3.png",
  //   ],
  //   skills: ["SKILL1", "SKILL2", "SKILL3"],
  //   type: "school",
  //   status: "completed",
  //   githubUrl: "https://github.com/pollesch-kaiden/PATH",
  //   fullDescription:
  //     "Detailed description",
  //   features: [
  //     "Feature 1",
  //     "Feature 2",
  //     "Feature 3",
  //     "Feature 4",
  //   ],
  //   featured: true,
  //   createdAt: "YYYY-MM-DD",
  // },
  // TEMPLATE
];

type FilterType = "all" | "school" | "personal";

interface ProjectsProps {
  onProjectClick: (project: Project) => void;
}

export default function Projects({ onProjectClick }: ProjectsProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = mockProjects
    .filter((project) => {
      // Filter by type
      const typeMatch = filter === "all" || project.type === filter;

      // Filter by search query
      if (!searchQuery.trim()) return typeMatch;

      const query = searchQuery.toLowerCase();
      const titleMatch = project.title.toLowerCase().includes(query);
      const descriptionMatch = project.description
        .toLowerCase()
        .includes(query);
      const skillsMatch = project.skills.some((skill) =>
        skill.toLowerCase().includes(query),
      );
      const featuresMatch =
        project.features?.some((feature) =>
          feature.toLowerCase().includes(query),
        ) || false;
      const fullDescriptionMatch =
        project.fullDescription?.toLowerCase().includes(query) || false;

      return (
        typeMatch &&
        (titleMatch ||
          descriptionMatch ||
          skillsMatch ||
          featuresMatch ||
          fullDescriptionMatch)
      );
    })
    .sort((a, b) => {
      // First, sort by featured status (featured projects first)
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      // Then sort by creation date (newest first)
      const dateA = new Date(a.createdAt || "1970-01-01");
      const dateB = new Date(b.createdAt || "1970-01-01");
      return dateB.getTime() - dateA.getTime();
    });

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6);

  return (
    <section className="min-h-screen py-20">
      <div className="w-full">
        <h2
          id="projects-heading"
          className="text-4xl md:text-5xl font-bold light-text mb-[3px] lg:text-[5xl] h-[80px]"
          style={{
            paddingTop: "0px",
            paddingBottom: "10px",
            height: "80px",
            lineHeight: "1.2",
          }}
        >
          Projects
        </h2>

        <div className="space-y-4 mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search projects by name, technology, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-foreground/30 text-foreground placeholder:text-muted-foreground h-[40px]"
            />
          </div>

          <div className="flex space-x-4">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? ""
                  : "text-foreground hover:text-foreground border-foreground/30 bg-background h-[40px]"
              }
            >
              All Projects
            </Button>
            <Button
              variant={filter === "school" ? "default" : "outline"}
              onClick={() => setFilter("school")}
              className={
                filter === "school"
                  ? ""
                  : "text-foreground hover:text-foreground border-foreground/30 bg-background h-[40px]"
              }
            >
              School Projects
            </Button>
            <Button
              variant={filter === "personal" ? "default" : "outline"}
              onClick={() => setFilter("personal")}
              className={
                filter === "personal"
                  ? ""
                  : "text-foreground hover:text-foreground border-foreground/30 bg-background h-[40px]"
              }
            >
              Personal Projects
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={onProjectClick}
            />
          ))}
        </div>

        {filteredProjects.length > 6 && (
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

export type { Project };
