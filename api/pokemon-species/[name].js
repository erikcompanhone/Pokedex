// Vercel Serverless Function - Pokemon Species Data
export default async function handler(req, res) {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Pokemon name is required' });
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: 'Pokemon species not found' });
      }
      throw new Error(`PokeAPI responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Set cache headers for better performance
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching Pokemon species data:', error);
    return res.status(500).json({ 
      error: 'Error fetching Pokémon species data',
      message: error.message 
    });
  }
}
