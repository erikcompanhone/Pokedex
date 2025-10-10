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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonName) {
      setPokemon(null);
      setPokemonDescription(null);
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
      } catch (err) {
        const errorMessage = err.response?.status === 404 
          ? 'Pokémon not found. Please check the name and try again.'
          : 'Error fetching Pokémon data. Please try again later.';
        
        setError(errorMessage);
        setPokemon(null);
        setPokemonDescription(null);
        console.error('Error fetching Pokemon:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [pokemonName]);

  return { pokemon, pokemonDescription, loading, error };
};
