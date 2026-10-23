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
    const aboutInfo = {
      id: "",
      bio: "We are an AI strategy and software development team focused on turning business goals into practical systems.",
      profileImageUrl: null
    };
    
    res.status(200).json(aboutInfo);
  } catch (error) {
    console.error('Error fetching about info:', error);
    res.status(500).json({ error: 'Failed to fetch about info' });
  }
}
