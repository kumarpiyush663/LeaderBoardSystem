import React, { useState } from 'react';
import './PlayerForm.css';

function PlayerForm({ onAddPlayer }) {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      onAddPlayer(playerName);
      setPlayerName('');
    }
  };

  return (
    <div className="form-container">
      <h3>Add New Player</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="playerName">Player Name:</label>
          <input
            type="text"
            id="playerName"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Player</button>
      </form>
    </div>
  );
}

export default PlayerForm;