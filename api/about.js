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
      bio: "Hi, I'm a passionate web designer and developer with over 5 years of experience creating beautiful, functional websites that help businesses grow. I specialize in modern web technologies including React, Next.js, and Tailwind CSS.\n\nMy approach combines strategic thinking with creative design to deliver websites that not only look amazing but also convert visitors into customers. I work closely with each client to understand their unique needs and goals.\n\nWhen I'm not coding, you'll find me exploring new design trends, contributing to open-source projects, or enjoying a good cup of coffee while brainstorming the next big idea.",
      profileImageUrl: "/Dom.jpeg"
    };
    
    res.status(200).json(aboutInfo);
  } catch (error) {
    console.error('Error fetching about info:', error);
    res.status(500).json({ error: 'Failed to fetch about info' });
  }
}
