const { projectsData } = require('../shared/projects-data.ts');

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
