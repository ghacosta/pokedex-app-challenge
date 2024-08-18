import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
  onCatch?: () => void;
  onRelease?: () => void;
  isCaught?: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick, onCatch, onRelease, isCaught }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 1 }} onClick={onClick}>
      <CardMedia
        component="img"
        height="140"
        image={pokemon.sprite}
        alt={pokemon.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Types: {pokemon.types.join(', ')}
        </Typography>
        {onCatch && !isCaught && (
          <Button size="small" onClick={(e) => { e.stopPropagation(); onCatch(); }}>
            Catch
          </Button>
        )}
        {onRelease && isCaught && (
          <Button size="small" onClick={(e) => { e.stopPropagation(); onRelease(); }}>
            Release
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PokemonCard;