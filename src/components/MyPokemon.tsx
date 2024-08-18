import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Pokemon } from '../types/pokemon';
import PokemonCard from './PokemonCard';

interface MyPokemonProps {
  caughtPokemon: Pokemon[];
  onSelectPokemon: (pokemon: Pokemon) => void;
  onReleasePokemon: (pokemon: Pokemon) => void;
}

const MyPokemon: React.FC<MyPokemonProps> = ({ caughtPokemon, onSelectPokemon, onReleasePokemon }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        My Pokémon
      </Typography>
      <Grid container spacing={2}>
        {caughtPokemon.map((pokemon) => (
          <Grid item xs={12} sm={6} md={4} key={pokemon.id}>
            <PokemonCard
              pokemon={pokemon}
              onClick={() => onSelectPokemon(pokemon)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyPokemon;