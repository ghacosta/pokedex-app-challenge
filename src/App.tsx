import React, { useState } from 'react';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import CaughtPokemon from './components/CaughtPokemon';
import { Pokemon } from './types/pokemon';
import { useLocalStorage } from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [caughtPokemon, setCaughtPokemon] = useLocalStorage<Pokemon[]>('caughtPokemon', []);

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCatchPokemon = () => {
    if (selectedPokemon && !caughtPokemon.some(p => p.id === selectedPokemon.id)) {
      setCaughtPokemon([...caughtPokemon, selectedPokemon]);
    }
  };

  return (
    <div>
      <h1>Pokedex App</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <PokemonList onSelectPokemon={handleSelectPokemon} />
        </div>
        <div style={{ flex: 1 }}>
          {selectedPokemon && (
            <PokemonDetails pokemon={selectedPokemon} onCatch={handleCatchPokemon} />
          )}
        </div>
        <div style={{ flex: 1 }}>
          <CaughtPokemon caughtPokemon={caughtPokemon} onSelectPokemon={handleSelectPokemon} />
        </div>
      </div>
    </div>
  );
};

export default App;