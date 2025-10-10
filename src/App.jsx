import { useState } from 'react';
import Pokedex from './components/Pokedex/Pokedex.jsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx';
import './App.css';

function App() {

  return (
    <ErrorBoundary>
      <Pokedex />
    </ErrorBoundary>
  )
};

export default App;
