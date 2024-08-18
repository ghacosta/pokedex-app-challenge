import React from 'react';
import { Pokemon } from '../types/pokemon';
import PokemonCard from './PokemonCard';

interface CaughtPokemonProps {
  caughtPokemon: Pokemon[];
  onSelectPokemon: (pokemon: Pokemon) => void;
}

const CaughtPokemon: React.FC<CaughtPokemonProps> = ({ caughtPokemon, onSelectPokemon }) => {
  return (
    <div>
      <h2>Caught Pokémon</h2>
      {caughtPokemon.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onClick={() => onSelectPokemon(pokemon)}
        />
      ))}
    </div>
  );
};

export default CaughtPokemon;