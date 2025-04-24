import React, { useState } from 'react';
import './ScoreForm.css';

function ScoreForm({ onUpdateScore, players }) {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [scoreToAdd, setScoreToAdd] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPlayer && scoreToAdd) {
      onUpdateScore(selectedPlayer, parseInt(scoreToAdd, 10));
      setSelectedPlayer('');
      setScoreToAdd('');
    }
  };

  return (
    <div className="form-container">
      <h3>Update Player Score</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="playerSelect">Select Player:</label>
          <select
            id="playerSelect"
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
        <div className="form-group">
          <label htmlFor="scoreToAdd">Score to Add:</label>
          <input
            type="number"
            id="scoreToAdd"
            value={scoreToAdd}
            onChange={(e) => setScoreToAdd(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Score</button>
      </form>
    </div>
  );
}

export default ScoreForm;