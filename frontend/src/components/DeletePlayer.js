import React, { useState } from 'react';
import './DeletePlayer.css';

function DeletePlayer({ onDeletePlayer, players }) {
  const [selectedPlayer, setSelectedPlayer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPlayer) {
      if (window.confirm(`Are you sure you want to delete ${selectedPlayer}?`)) {
        onDeletePlayer(selectedPlayer);
        setSelectedPlayer('');
      }
    }
  };

  return (
    <div className="form-container">
      <h3>Delete Player</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="playerToDelete">Select Player:</label>
          <select
            id="playerToDelete"
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            required
          >
            <option value="">-- Select Player --</option>
            {players.map((player, index) => (
              <option key={index} value={player.name}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="delete-button">Delete Player</button>
      </form>
    </div>
  );
}

export default DeletePlayer;