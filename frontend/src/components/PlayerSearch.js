import React, { useState } from 'react';
import './PlayerSearch.css';

function PlayerSearch({ players }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const foundPlayer = players.find(
        player => player.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (foundPlayer) {
        setSearchResult(foundPlayer);
        setNotFound(false);
      } else {
        setSearchResult(null);
        setNotFound(true);
      }
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResult(null);
    setNotFound(false);
  };

  return (
    <div className="form-container search-container">
      <h3>Search Player</h3>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="searchTerm">Player Name:</label>
          <input
            type="text"
            id="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter player name"
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">Search</button>
          {(searchResult || notFound) && (
            <button type="button" onClick={clearSearch} className="clear-button">Clear</button>
          )}
        </div>
      </form>

      {searchResult && (
        <div className="player-details">
          <h4>Player Details</h4>
          <div className="detail-card">
            <div className="detail-item">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{searchResult.name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Score:</span>
              <span className="detail-value">{searchResult.score}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Rank:</span>
              <span className="detail-value">{searchResult.rank}</span>
            </div>
          </div>
        </div>
      )}

      {notFound && (
        <div className="not-found-message">
          No player found with name "{searchTerm}"
        </div>
      )}
    </div>
  );
}

export default PlayerSearch;