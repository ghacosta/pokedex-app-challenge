import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { Pokemon } from '../types/pokemon';
import { typeColors } from '../utils/colors';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const mainType = pokemon.types[0];
  const backgroundColor = typeColors[mainType as keyof typeof typeColors] || '#A8A77A';

  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        m: 1, 
        backgroundColor, 
        cursor: 'pointer',
        '&:hover': { opacity: 0.9 },
      }} 
      onClick={onClick}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div" color="white">
            {pokemon.name}
          </Typography>
          <Typography variant="body2" color="white">
            #{pokemon.id.toString().padStart(3, '0')}
          </Typography>
        </Box>
        <Box mt={1}>
          {pokemon.types.map((type) => (
            <Chip 
              key={type} 
              label={type} 
              size="small" 
              sx={{ 
                mr: 0.5, 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: 'white' 
              }} 
            />
          ))}
        </Box>
      </CardContent>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 100, 
          backgroundColor: 'rgba(255,255,255,0.6)',
        }}
      >
        <img src={pokemon.sprite} alt={pokemon.name} style={{ height: '80%' }} />
      </Box>
    </Card>
  );
};

export default PokemonCard;