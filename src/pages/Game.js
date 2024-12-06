// src/pages/Game.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

function Game() {
  const { gameId } = useParams(); // Récupère l'ID de la partie à partir de l'URL
  const [guess, setGuess] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = io('http://localhost:5000'); // Connexion au serveur

  useEffect(() => {
    socket.emit('joinGame', gameId); // Rejoindre la partie
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]); // Afficher les messages du jeu
    });

    return () => {
      socket.disconnect();
    };
  }, [gameId]);

  const handleGuess = () => {
    if (guess.length === 6) {
      socket.emit('guess', gameId, guess); // Envoyer la devinette au serveur
      setGuess('');
    } else {
      alert('Veuillez entrer un nombre de 6 chiffres.');
    }
  };

  return (
    <div>
      <h1>Partie {gameId}</h1>
      <div>
        <input
          type="text"
          placeholder="Devine le nombre mystère"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          maxLength={6}
        />
        <button onClick={handleGuess}>Soumettre ma devinette</button>
      </div>

      <div>
        <h2>Messages du jeu :</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Game;
