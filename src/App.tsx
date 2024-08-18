import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import MyPokemon from './components/MyPokemon';
import { Pokemon } from './types/pokemon';
import { useLocalStorage } from './hooks/useLocalStorage';

const theme = createTheme();

const App: React.FC = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [caughtPokemon, setCaughtPokemon] = useLocalStorage<Pokemon[]>('caughtPokemon', []);
  const [tabValue, setTabValue] = useState(0);

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCatchPokemon = (pokemon: Pokemon) => {
    if (!caughtPokemon.some(p => p.id === pokemon.id)) {
      setCaughtPokemon([...caughtPokemon, pokemon]);
    }
  };

  const handleReleasePokemon = (pokemon: Pokemon) => {
    setCaughtPokemon(caughtPokemon.filter(p => p.id !== pokemon.id));
  };

  const isPokemonCaught = (pokemon: Pokemon) => {
    return caughtPokemon.some(p => p.id === pokemon.id);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ paddingBottom: '56px' }}>
        {tabValue === 0 ? (
          selectedPokemon ? (
            <PokemonDetails 
              pokemon={selectedPokemon} 
              onCatch={handleCatchPokemon}
              isCaught={isPokemonCaught(selectedPokemon)}
            />
          ) : (
            <PokemonList onSelectPokemon={handleSelectPokemon} />
          )
        ) : (
          <MyPokemon
            caughtPokemon={caughtPokemon}
            onSelectPokemon={handleSelectPokemon}
            onReleasePokemon={handleReleasePokemon}
          />
        )}
      </div>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={tabValue}
          onChange={(event, newValue) => {
            setTabValue(newValue);
            setSelectedPokemon(null);
          }}
        >
          <BottomNavigationAction label="List" icon={<ListIcon />} />
          <BottomNavigationAction label="My Pokémon" icon={<CatchingPokemonIcon />} />
        </BottomNavigation>
      </Paper>
    </ThemeProvider>
  );
};

export default App;