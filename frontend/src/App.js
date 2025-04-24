import React, { useState, useEffect } from 'react';
import './App.css';
import LeaderboardTable from './components/LeaderboardTable';
import PlayerForm from './components/PlayerForm';
import ScoreForm from './components/ScoreForm';
import DeletePlayer from './components/DeletePlayer';
import PlayerSearch from './components/PlayerSearch';

function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch leaderboard data
  // Update the fetch URLs to include the full path
  // Use the direct URL to the backend
  const API_URL = 'http://127.0.0.1:5000';
  
  // Then update your fetch calls like this:
  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/leaderboard`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      const data = await response.json();
      setLeaderboard(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new player
  const addPlayer = async (name) => {
    try {
      const response = await fetch(`${API_URL}/api/players`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add player');
      }
      
      setSuccessMessage(data.message);
      setTimeout(() => setSuccessMessage(null), 3000);
      fetchLeaderboard();
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  // Delete a player
  const deletePlayer = async (name) => {
    try {
      const response = await fetch(`${API_URL}/api/players/${name}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete player');
      }
      
      setSuccessMessage(data.message);
      setTimeout(() => setSuccessMessage(null), 3000);
      fetchLeaderboard();
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  // Update player score
  const updateScore = async (name, score) => {
    try {
      const response = await fetch(`${API_URL}/api/players/${name}/score`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update score');
      }
      
      setSuccessMessage(data.message);
      setTimeout(() => setSuccessMessage(null), 3000);
      fetchLeaderboard();
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  // Load leaderboard on component mount
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Leaderboard Management System</h1>
      </header>
      
      <main className="App-main">
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        
        <div className="forms-container">
          <PlayerForm onAddPlayer={addPlayer} />
          <ScoreForm onUpdateScore={updateScore} players={leaderboard} />
          <PlayerSearch players={leaderboard} />
          <DeletePlayer onDeletePlayer={deletePlayer} players={leaderboard} />
        </div>
        
        <div className="leaderboard-container">
          <h2>Leaderboard</h2>
          {loading ? (
            <p>Loading leaderboard...</p>
          ) : (
            <LeaderboardTable leaderboard={leaderboard} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
