// src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [gameId, setGameId] = useState('');
  const navigate = useNavigate();

  // Fonction pour créer une nouvelle partie
  const createGame = async () => {
    try {
      console.log('Création d\'une nouvelle partie...');
      const response = await axios.post('http://localhost:5000/api/new-game');
      console.log('Partie créée avec succès:', response.data);
      // Redirige vers la page du jeu avec l'ID de la partie
      navigate(`/game/${response.data.gameId}`);
    } catch (error) {
      console.error('Erreur lors de la création de la partie:', error);
    }
  };

  // Fonction pour rejoindre une partie existante
  const joinGame = () => {
    if (gameId.trim()) {
      console.log('Rejoindre la partie avec ID:', gameId);
      navigate(`/game/${gameId}`);
    } else {
      console.error('L\'ID de la partie est vide.');
    }
  };

  return (
    <div>
      <h1>Numerous Game</h1>
      <button onClick={createGame}>Créer une nouvelle partie</button>
      <div>
        <input
          type="text"
          placeholder="ID de la partie"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
        />
        <button onClick={joinGame}>Rejoindre une partie</button>
      </div>
    </div>
  );
}

export default Home;
