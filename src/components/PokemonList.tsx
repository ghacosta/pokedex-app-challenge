import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import { Pokemon } from '../types/pokemon';

interface PokemonListProps {
  onSelectPokemon: (pokemon: Pokemon) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ onSelectPokemon }) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      const results = await Promise.all(
        data.results.map(async (result: any) => {
          const pokemonResponse = await fetch(result.url);
          const pokemonData = await pokemonResponse.json();
          return {
            id: pokemonData.id,
            name: pokemonData.name,
            sprite: pokemonData.sprites.front_default,
            types: pokemonData.types.map((type: any) => type.type.name),
          };
        })
      );
      setPokemon(results);
      setFilteredPokemon(results);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  };

  const handleSearch = (query: string) => {
    const filtered = pokemon.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPokemon(filtered);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {filteredPokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} onClick={() => onSelectPokemon(p)} />
      ))}
    </div>
  );
};

export default PokemonList;