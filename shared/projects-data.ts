import type { Project } from "./schema";

/**
 * PROJECTS DATA
 * 
 * Add your projects here! Each project should follow this structure:
 * 
 * {
 *   id: "unique-id-string",           // Any unique string (can be simple like "project-1")
 *   title: "Project Name",            // Your project title
 *   description: "Brief summary...",  // 1-2 sentence description
 *   imageUrl: "https://...",          // Link to project screenshot/cover image
 *   liveUrl: "https://...",           // Link to live website
 *   technologies: ["React", "..."],   // Array of technologies used
 *   featured: true                    // true = shows on homepage, false = hidden
 * }
 * 
 * To add more projects:
 * 1. Copy one of the existing project objects below
 * 2. Paste it after the last project (don't forget the comma!)
 * 3. Update all the fields with your project info
 * 4. Save the file - changes will appear automatically!
 */

export const projectsData: Project[] = [
  {
    id: "the-grand-gaia",
    title: "The Grand Gaia",
    description: "A comprehensive web platform showcasing luxury hospitality and premium services with elegant design and seamless user experience.",
    imageUrl: "/src/assets/BatanaOil.png",
    liveUrl: "https://www.thegrandgaia.com/",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    featured: true
  },
  {
    id: "the-unnamed-farm", 
    title: "The Unnamed Farm",
    description: "An agricultural and farming services website featuring modern design and comprehensive information about farm operations and services.",
    imageUrl: "/src/assets/UnnamedFarm.png",
    liveUrl: "https://www.theunnamedfarm.com/",
    technologies: ["Next.js", "Node.js", "PostgreSQL"],
    featured: true
  },
  {
    id: "ai-quality-control",
    title: "(AI powered) Quality Control Quality Assurance",
    description: "An intelligent quality assurance platform leveraging artificial intelligence to automate testing, monitor production quality, and provide real-time insights for enhanced operational efficiency.",
    imageUrl: "/src/assets/AIQualityControl.png",
    liveUrl: "https://dellsystemmanager.vercel.app/", // Ready for your URL
    technologies: ["Python", "TensorFlow", "React", "Node.js", "MongoDB", "Docker"],
    featured: true
  }
];