import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import { Pokemon } from '../types/pokemon';

interface PokemonListProps {
  onSelectPokemon: (pokemon: Pokemon) => void;
  onCatchPokemon: (pokemon: Pokemon) => void;
  caughtPokemon: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ onSelectPokemon, onCatchPokemon, caughtPokemon }) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    const filtered = pokemon.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPokemon(filtered);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Grid container spacing={2}>
        {filteredPokemon.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <PokemonCard
              pokemon={p}
              onClick={() => onSelectPokemon(p)}
              onCatch={() => onCatchPokemon(p)}
              isCaught={caughtPokemon.some(caught => caught.id === p.id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PokemonList;