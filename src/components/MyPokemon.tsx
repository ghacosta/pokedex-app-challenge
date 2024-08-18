import React from 'react';
import { Grid, Typography, Container } from '@mui/material';
import { Pokemon } from '../types/pokemon';
import PokemonCard from './PokemonCard';

interface MyPokemonProps {
  caughtPokemon: Pokemon[];
  onSelectPokemon: (pokemon: Pokemon) => void;
}

const MyPokemon: React.FC<MyPokemonProps> = ({ caughtPokemon, onSelectPokemon }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom fontWeight={"bold"}>
        My Pokémon
      </Typography>
      <Grid container spacing={2}>
        {caughtPokemon.map((pokemon) => (
          <Grid item xs={6} sm={4} md={3} key={pokemon.id}>
            <PokemonCard
              pokemon={pokemon}
              onClick={() => onSelectPokemon(pokemon)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyPokemon;