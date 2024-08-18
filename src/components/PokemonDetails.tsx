import React from 'react';
import { Pokemon } from '../types/pokemon';

interface PokemonDetailsProps {
  pokemon: Pokemon;
  onCatch: () => void;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon, onCatch }) => {
  return (
    <div>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p>Types: {pokemon.types.join(', ')}</p>
      <button onClick={onCatch}>Catch</button>
    </div>
  );
};

export default PokemonDetails;