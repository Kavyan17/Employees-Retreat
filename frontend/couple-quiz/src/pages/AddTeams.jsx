import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const AddTeams = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState("");

  const fetchTeams = async () => {
    const res = await axios.get("http://127.0.0.1:5000/teams");
    setTeams(res.data);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const addTeam = async () => {
    await axios.post("http://127.0.0.1:5000/teams/", { name: newTeam });
    setNewTeam("");
    fetchTeams();
  };

  const deleteTeam = async (id) => {
    await axios.delete(`http://localhost:5000/teams/${id}`);
    fetchTeams();
  };

  const updateTeam = async (id) => {
    const newName = prompt("Enter new team name:");
    if (newName) {
      await axios.put(`http://localhost:5000/teams/${id}`, { name: newName });
      fetchTeams();
    }
  };

  return (
    <div className="container">
      <h2>Leaderboard</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <span>{team.name} - Score: 0</span>
            <button onClick={() => updateTeam(team.id)}>✏️</button>
            <button onClick={() => deleteTeam(team.id)}>❌</button>
          </li>
        ))}
      </ul>

      <div className="form">
        <input
          type="text"
          placeholder="Team Name"
          value={newTeam}
          onChange={(e) => setNewTeam(e.target.value)}
        />
        <button onClick={addTeam}>Add Team</button>
      </div>

      {/* <button className="start-button">Begin Game</button> */}
      <button className="start-button" onClick={() => navigate("/flashcards", { state: { teams } })}> Begin Game </button>
      
    </div>
  );
};

export default AddTeams;