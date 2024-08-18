import React from 'react';
import { Box, Typography, Chip, LinearProgress, Container, Button } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Pokemon } from '../types/pokemon';
import { typeColors } from '../utils/colors';

interface PokemonDetailsProps {
  pokemon: Pokemon;
  onCatch: (pokemon: Pokemon) => void;
  isCaught: boolean;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon, onCatch, isCaught }) => {
  const mainType = pokemon.types[0];
  const backgroundColor = typeColors[mainType as keyof typeof typeColors] || '#A8A77A';

  return (
    <Container sx={{ backgroundColor, minHeight: '100vh', color: 'white', py: 2 }}>
      <Typography variant="h4">{pokemon.name}</Typography>
      <Typography variant="subtitle1">#{pokemon.id.toString().padStart(3, '0')}</Typography>
      
      <Box mt={2}>
        {pokemon.types.map((type) => (
          <Chip 
            key={type} 
            label={type} 
            sx={{ mr: 1, backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }} 
          />
        ))}
      </Box>
      
      <Box mt={4} display="flex" justifyContent="center">
        <img src={pokemon.sprite} alt={pokemon.name} style={{ width: '200px', height: '200px' }} />
      </Box>
      
      <Box mt={4}>
        <Typography variant="h6">Base Stats</Typography>
        {['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'].map((stat) => (
          <Box key={stat} mt={1}>
            <Typography variant="body2">{stat}</Typography>
            <LinearProgress variant="determinate" value={Math.random() * 100} />
          </Box>
        ))}
      </Box>

      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          startIcon={<CatchingPokemonIcon />}
          onClick={() => onCatch(pokemon)}
          disabled={isCaught}
          sx={{
            backgroundColor: 'white',
            color: backgroundColor,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.8)',
            },
            '&:disabled': {
              backgroundColor: 'rgba(255,255,255,0.5)',
              color: 'rgba(0,0,0,0.26)',
            },
          }}
        >
          {isCaught ? 'Already Caught' : 'Catch Pokémon'}
        </Button>
      </Box>
    </Container>
  );
};

export default PokemonDetails;