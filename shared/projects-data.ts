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
    id: "project-1",
    title: "Your Project Title Here",
    description: "Replace this with a brief description of your project. Keep it to 1-2 sentences that highlight the main features and purpose.",
    imageUrl: "https://via.placeholder.com/600x400/6366f1/ffffff?text=Project+Screenshot",
    liveUrl: "https://yourprojecturl.com",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    featured: true
  },
  {
    id: "project-2", 
    title: "Another Project Title",
    description: "Another brief description here. Explain what makes this project special and what problems it solves for users.",
    imageUrl: "https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Project+Screenshot",
    liveUrl: "https://anotherproject.com",
    technologies: ["Next.js", "Node.js", "PostgreSQL"],
    featured: true
  }
  
  // To add more projects, copy the structure above and add it here:
  // {
  //   id: "project-3",
  //   title: "Third Project",
  //   description: "Description of third project...",
  //   imageUrl: "https://yourimage.com",
  //   liveUrl: "https://yoursite.com", 
  //   technologies: ["Vue.js", "Express"],
  //   featured: true
  // }
];