import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook to fetch Pokemon data
 * @param {string} pokemonName - The name of the Pokemon to fetch
 * @returns {Object} - { pokemon, pokemonDescription, loading, error }
 */
export const usePokemon = (pokemonName) => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonDescription, setPokemonDescription] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonName) {
      setPokemon(null);
      setPokemonDescription(null);
      setEvolutionChain(null);
      setError(null);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Use PokeAPI directly in development, use serverless functions in production
        const isDev = import.meta.env.DEV;
        const baseUrl = isDev ? 'https://pokeapi.co/api/v2' : '/api';
        
        const [pokemonResponse, speciesResponse] = await Promise.all([
          axios.get(isDev ? `${baseUrl}/pokemon/${pokemonName}` : `${baseUrl}/pokemon/${pokemonName}`),
          axios.get(isDev ? `${baseUrl}/pokemon-species/${pokemonName}` : `${baseUrl}/pokemon-species/${pokemonName}`)
        ]);
        
        setPokemon(pokemonResponse.data);
        setPokemonDescription(speciesResponse.data);

        // Fetch evolution chain if available
        if (speciesResponse.data?.evolution_chain?.url) {
          const evolutionUrl = speciesResponse.data.evolution_chain.url;
          const evolutionResponse = await axios.get(evolutionUrl);
          
          // Parse evolution chain
          const chain = [];
          let current = evolutionResponse.data.chain;
          
          while (current) {
            chain.push({
              name: current.species.name,
              url: current.species.url
            });
            current = current.evolves_to[0];
          }
          
          // Fetch sprites for each evolution
          const chainWithSprites = await Promise.all(
            chain.map(async (evo) => {
              try {
                const pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evo.name}`);
                return {
                  ...evo,
                  sprite: pokemonData.data.sprites.front_default,
                  shinySprite: pokemonData.data.sprites.front_shiny
                };
              } catch (err) {
                console.error(`Error fetching sprite for ${evo.name}:`, err);
                return { ...evo, sprite: null, shinySprite: null };
              }
            })
          );
          
          setEvolutionChain(chainWithSprites);
        }
      } catch (err) {
        const errorMessage = err.response?.status === 404 
          ? 'Pokémon not found. Please check the name and try again.'
          : 'Error fetching Pokémon data. Please try again later.';
        
        setError(errorMessage);
        setPokemon(null);
        setPokemonDescription(null);
        setEvolutionChain(null);
        console.error('Error fetching Pokemon:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [pokemonName]);

  return { pokemon, pokemonDescription, evolutionChain, loading, error };
};
