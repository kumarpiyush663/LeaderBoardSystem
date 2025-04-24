import React from 'react';
import './LeaderboardTable.css';

function LeaderboardTable({ leaderboard }) {
  return (
    <table className="leaderboard-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.length === 0 ? (
          <tr>
            <td colSpan="3" className="no-data">No players yet</td>
          </tr>
        ) : (
          leaderboard.map((player, index) => (
            <tr key={index} className={`player-row ${index < 3 ? 'top-' + (index + 1) : ''}`}>
              <td className="rank-cell">
                {index < 3 ? (
                  <span className={`trophy trophy-${index + 1}`}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </span>
                ) : (
                  player.rank
                )}
              </td>
              <td className="name-cell">{player.name}</td>
              <td className="score-cell">
                {player.score}
                {player.score === 0 && (
                  <span className="duck-container">
                    <span className="duck-animation">🦆</span>
                    <span className="duck-waves">~~~~~</span>
                  </span>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default LeaderboardTable;