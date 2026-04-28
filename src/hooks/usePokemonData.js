import { useState, useEffect, useMemo } from 'react';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

export const usePokemonData = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const initializeData = async () => {
      await Promise.all([fetchPokemonData(), fetchTypesData()]);
    };
    initializeData();
  }, []);

  const fetchPokemonData = async () => {
    try {
      setLoading(true);
      const apiUrl = `${POKEAPI_BASE}/pokemon/?limit=150&offset=0`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      
      const pokemonWithDetails = await Promise.all(
        result.results.map(async (pokemon) => {
          try {
            const detailResponse = await fetch(pokemon.url);
            const detailData = await detailResponse.json();
            
            return {
              id: detailData.id,
              name: pokemon.name,
              url: pokemon.url,
              types: detailData.types.map(t => t.type.name),
              height: (detailData.height / 10).toFixed(1),
              weight: (detailData.weight / 10).toFixed(1),
              baseExperience: detailData.base_experience,
              abilities: detailData.abilities.map(a => a.ability.name),
              sprites: detailData.sprites.other['official-artwork']?.front_default || detailData.sprites.front_default,
              description: ''
            };
          } catch (err) {
            return {
              id: parseInt(pokemon.url.split('/')[6]),
              name: pokemon.name,
              url: pokemon.url,
              types: [],
              height: 'N/A',
              weight: 'N/A',
              baseExperience: 0,
              abilities: [],
              sprites: null,
              description: ''
            };
          }
        })
      );

      setAllPokemon(pokemonWithDetails);
      console.log('Pokemon data fetched successfully', pokemonWithDetails);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTypesData = async () => {
    try {
      const typesUrl = `${POKEAPI_BASE}/type/?limit=20`;
      const response = await fetch(typesUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      const typeNames = result.results.map(t => t.name);
      setTypes(typeNames);
    } catch (err) {
      console.error('Error fetching types:', err);
      setTypes(['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy']);
    }
  };

  const fetchPokemonSpecies = async (pokemonId) => {
    try {
      const speciesUrl = `${POKEAPI_BASE}/pokemon-species/${pokemonId}`;
      const response = await fetch(speciesUrl);
      if (response.ok) {
        const speciesData = await response.json();
        return speciesData.flavor_text_entries
          ?.find(entry => entry.language.name === 'en')
          ?.flavor_text || 'No description available';
      }
    } catch (err) {
      console.error('Error fetching species data:', err);
      return 'No description available';
    }
  };

  return { allPokemon, loading, error, types, fetchPokemonSpecies };
};
