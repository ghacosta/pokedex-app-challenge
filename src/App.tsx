import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import PokemonList from './components/PokemonList';
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ paddingBottom: '56px' }}>
        {tabValue === 0 ? (
          <PokemonList
            onSelectPokemon={handleSelectPokemon}
            onCatchPokemon={handleCatchPokemon}
            caughtPokemon={caughtPokemon}
          />
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
          }}
        >
          <BottomNavigationAction label="List" icon={<ListIcon />} />
          <BottomNavigationAction label="My Pokémons" icon={<CatchingPokemonIcon />} />
        </BottomNavigation>
      </Paper>
    </ThemeProvider>
  );
};

export default App;