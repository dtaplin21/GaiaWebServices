// Import projects data directly
const projectsData = [
  {
    id: "the-grand-gaia",
    title: "The Grand Gaia",
    description: "A comprehensive web platform showcasing luxury hospitality and premium services with elegant design and seamless user experience.",
    imageUrl: "/BatanaOil.png",
    liveUrl: "https://www.thegrandgaia.com/",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    featured: true
  },
  {
    id: "the-unnamed-farm", 
    title: "The Unnamed Farm",
    description: "An agricultural and farming services website featuring modern design and comprehensive information about farm operations and services.",
    imageUrl: "/UnnamedFarm.png",
    liveUrl: "https://www.theunnamedfarm.com/",
    technologies: ["Next.js", "Node.js", "PostgreSQL"],
    featured: true
  }
];

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { url } = req;
    
    if (url.includes('/featured')) {
      // Return only featured projects
      const featuredProjects = projectsData.filter(project => project.featured);
      res.setHeader('Cache-Control', 'public, max-age=300');
      res.status(200).json(featuredProjects);
    } else {
      // Return all projects
      res.setHeader('Cache-Control', 'public, max-age=300');
      res.status(200).json(projectsData);
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
}
