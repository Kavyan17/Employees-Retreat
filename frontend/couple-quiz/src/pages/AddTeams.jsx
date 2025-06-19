import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../styles/AddTeams.css";

const AddTeams = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState("");
  const [welcomeMsg, setWelcomeMsg] = useState("");

  const fetchTeams = async () => {
    const res = await axios.get("http://127.0.0.1:5000/teams");
    setTeams(res.data);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // const addTeam = async () => {
  //   if (newTeam.trim()) {
  //     await axios.post("http://127.0.0.1:5000/teams/", { name: newTeam });
  //     setNewTeam("");
  //     fetchTeams();
  //   }
  // };
  
  const addTeam = async () => {
    if (newTeam.trim()) {
      await axios.post("http://127.0.0.1:5000/teams/", { name: newTeam });
      setWelcomeMsg(`Welcome ${newTeam} 💗`);
      setNewTeam("");
      fetchTeams();
      setTimeout(() => setWelcomeMsg(""), 3000); // Hide after 3 seconds
    }
  };  
  
  const deleteTeam = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/teams/${id}`);
    fetchTeams();
  };

  const updateTeam = async (id) => {
    const newName = prompt("Enter new team name:");
    if (newName) {
      await axios.put(`http://127.0.0.1:5000/teams/${id}`, { name: newName });
      fetchTeams();
    }
  };

  return (
    <div className="addteams-container">
      {welcomeMsg && (
        <div className="welcome-popup">
          {welcomeMsg}
        </div>
      )}
      
      <header className="addteams-header">
          Marriage Retreat - Love Edition 💌
      </header>

      <main className="addteams-main">
        <div className="team-form-section">
          <h2>Add Teams</h2>
          <div className="form">
            <input
              type="text"
              placeholder="Team Name"
              value={newTeam}
              onChange={(e) => setNewTeam(e.target.value)}
            />
            <button onClick={addTeam}>Add Team</button>
          </div>

          <ul className="team-list">
            {teams.map((team) => (
              <li key={team.id}>
                <span>{team.name}</span>
                <div className="team-buttons">
                  <button onClick={() => updateTeam(team.id)}>✏️</button>
                  <button onClick={() => deleteTeam(team.id)}>❌</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="start-button-wrapper">
            <button className="start-button" onClick={() => navigate("/flashcards", { state: { teams } })}>
              Begin Game
            </button>
          </div>
        </div>

        <div className="leaderboard-section">
          <h2>Leaderboard</h2>
          <div className="leaderboard-header">
            <span className="team-col">Team Name</span>
            <span className="score-col">Score</span>
          </div>
          <div className="leaderboard-list-wrapper">
            <ul>
              {teams.map((team) => (
                <li key={team.id}>
                  <strong>{team.name}</strong> <strong>0</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <footer className="addteams-footer">
        ❤️ Crafted with love — Because love deserves a little fun! ❤️
      </footer>
    </div>
  );
};

export default AddTeams;
