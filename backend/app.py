from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
# More permissive CORS configuration
CORS(app, resources={r"/*": {"origins": "*"}})

# Path to the JSON file that will store our leaderboard data
DATA_FILE = os.path.join(os.path.dirname(__file__), 'leaderboard.json')

# Initialize the data file if it doesn't exist
def initialize_data_file():
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'w') as f:
            json.dump([], f)

# Load leaderboard data from the JSON file
def load_leaderboard():
    initialize_data_file()
    with open(DATA_FILE, 'r') as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

# Save leaderboard data to the JSON file
def save_leaderboard(leaderboard):
    with open(DATA_FILE, 'w') as f:
        json.dump(leaderboard, f)

# Get sorted leaderboard
def get_sorted_leaderboard():
    leaderboard = load_leaderboard()
    # Sort by score (descending) and then by name (ascending)
    return sorted(leaderboard, key=lambda x: (-x['score'], x['name']))

# API route to get the leaderboard
@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    sorted_leaderboard = get_sorted_leaderboard()
    
    # Add rank to each player
    ranked_leaderboard = []
    current_rank = 1
    previous_score = None
    
    for i, player in enumerate(sorted_leaderboard):
        # If this player has the same score as the previous one, give them the same rank
        if previous_score is not None and player['score'] == previous_score:
            rank = ranked_leaderboard[i-1]['rank']
        else:
            rank = current_rank
        
        ranked_leaderboard.append({
            'rank': rank,
            'name': player['name'],
            'score': player['score']
        })
        
        previous_score = player['score']
        current_rank += 1
    
    return jsonify(ranked_leaderboard)

# API route to add a new player
@app.route('/api/players', methods=['POST'])
def add_player():
    data = request.get_json()
    name = data.get('name')
    
    if not name:
        return jsonify({'error': 'Player name is required'}), 400
    
    leaderboard = load_leaderboard()
    
    # Check if player already exists
    for player in leaderboard:
        if player['name'].lower() == name.lower():
            return jsonify({'error': 'Player already exists'}), 400
    
    # Add new player with initial score of 0
    leaderboard.append({'name': name, 'score': 0})
    save_leaderboard(leaderboard)
    
    return jsonify({'message': 'Player added successfully'}), 201

# API route to delete a player
@app.route('/api/players/<name>', methods=['DELETE'])
def delete_player(name):
    leaderboard = load_leaderboard()
    
    # Find and remove the player
    for i, player in enumerate(leaderboard):
        if player['name'].lower() == name.lower():
            del leaderboard[i]
            save_leaderboard(leaderboard)
            return jsonify({'message': 'Player deleted successfully'}), 200
    
    return jsonify({'error': 'Player not found'}), 404

# API route to update a player's score
@app.route('/api/players/<name>/score', methods=['PUT'])
def update_score(name):
    data = request.get_json()
    score_to_add = data.get('score', 0)
    
    try:
        score_to_add = int(score_to_add)
    except ValueError:
        return jsonify({'error': 'Score must be a number'}), 400
    
    leaderboard = load_leaderboard()
    
    # Find and update the player's score
    for player in leaderboard:
        if player['name'].lower() == name.lower():
            player['score'] += score_to_add
            save_leaderboard(leaderboard)
            return jsonify({'message': 'Score updated successfully'}), 200
    
    return jsonify({'error': 'Player not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)