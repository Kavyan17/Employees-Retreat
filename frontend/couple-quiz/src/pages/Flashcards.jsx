import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { parseCSVFile } from '../utils/parseCSV';
import axios from 'axios';
import '../styles/Flashcards.css';
import '../styles/Home.css';

const Flashcards = () => {
  const location = useLocation();
  const teams = location.state?.teams || [];

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false);
  const [phaseTwo, setPhaseTwo] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [scores, setScores] = useState({});


  useEffect(() => {
    parseCSVFile('/data/questions.csv', (data) => {
      setQuestions(data);
    });
  }, []);

  const handleChange = (teamId, value) => {
    setAnswers({ ...answers, [teamId]: value });
  };

  const lockAnswers = async () => {
    const question = questions[currentIndex];
    for (const team of teams) {
      await axios.post('http://localhost:5000/answers/submit', {
        team_id: team.id,
        question_id: parseInt(question.id),
        answer_text: answers[team.id] || ""
      });
    }
    setLocked(true);
  };

  const nextQuestion = () => {
    setAnswers({});
    setLocked(false);
    setRevealedAnswers({});
    setCurrentIndex((prev) => prev + 1);
  };

  const enterPhaseTwo = () => {
    setCurrentIndex(0);
    setPhaseTwo(true);
    const initialScores = {};
    teams.forEach(team => {
      initialScores[team.id] = 0;
    });
    setScores(initialScores);
  };

  const revealAnswer = async (teamId) => {
    const question = questions[currentIndex];
    const res = await axios.get(`http://localhost:5000/answers/team/${teamId}`);
    const answer = res.data.find(a => parseInt(a.question_id) === parseInt(question.id));
    setRevealedAnswers(prev => ({ ...prev, [teamId]: answer ? answer.answer : "No Answer" }));
  };

  const markMatch = (teamId, match) => {
    if (match) {
      setScores(prev => ({ ...prev, [teamId]: prev[teamId] + 1 }));
    }
  };

  if (!questions.length) return <div className="loading">Loading questions...</div>;

  if (currentIndex >= questions.length && !phaseTwo) {
    return (
      <div className="home-container">
        <header className="home-header">
          Marriage Retreat - Love Edition 💌 
        </header>
  
        <main className="home-main">
          <div className="center-wrapper">
            <div className="floating-hearts">
              {[...Array(50)].map((_, i) => (
                <svg
                  key={i}
                  className="heart"
                  viewBox="0 0 32 29.6"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-40px`,
                    animationDelay: `${Math.random() * 20}s`,
                    animationDuration: `${6 + Math.random() * 6}s`,
                    opacity: 0,
                  }}
                >
                  <path
                    d="M23.6,0c-3.4,0-6.4,2.4-7.6,5.5C14.8,2.4,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.8,16,21.2,16,21.2s16-11.4,16-21.2 C32,3.8,28.2,0,23.6,0z"
                    fill="transparent"
                    stroke="rgba(255, 0, 0, 0.8)"
                    strokeWidth="3"
                  />
                </svg>
              ))}
            </div>
  
            <div className="jumbotron">
              <h2 className="jumbotron-title">✨ Neighbors House Presents ✨</h2>
              <p className="jumbotron-text">💖 Couple Compatibility Quiz 💖</p>
            </div>
  
            <p className="home-subtext">Phase 1 Complete! Are you ready for Phase 2? 💑</p>
            <button onClick={enterPhaseTwo}>🔁 Enter Phase 2</button>
          </div>
        </main>
  
        <footer className="home-footer">
          ❤️ Crafted with love — Because love deserves a little fun! ❤️
        </footer>
      </div>
    );
  }

  if (currentIndex >= questions.length && phaseTwo) {
    return (
      <div className="home-container">
        <header className="home-header">
          Marriage Retreat - Love Edition 💌 
        </header>
  
        <main className="home-main">
          <div className="center-wrapper">
            <div className="confetti-wrapper">
              {[...Array(100)].map((_, i) => (
                <div key={i} className="confetti-piece" />
              ))}
            </div>
            <div className="jumbotron">
              <h2 className="jumbotron-title">🏆 Final Leaderboard 🏆</h2>
              <ul className="leaderboard-list">
                {teams.map(team => (
                  <li key={team.id}>
                    <strong>{team.name}</strong>: {scores[team.id]}
                  </li>
                ))}
              </ul>
              <p className="jumbotron-text">💖 Your love story just leveled up 💖</p>
            </div>
          </div>
        </main>
  
        <footer className="home-footer">
          ❤️ Crafted with love — Because love deserves a little fun! ❤️
        </footer>
      </div>
    );
  }  
    

  const currentQuestion = questions[currentIndex];

  return (
    <div className="flashcard-container">
      <header className="flashcard-header">
        Marriage Retreat - Love Edition 💌
      </header>
  
      <div className="flashcard-main-content">
        <div className="questions-container">
          {!phaseTwo ? (
            <>
              <div className="question-box">
                <h2>💖 Question {currentIndex + 1}</h2>
                <p>{currentQuestion.question_text}</p>
              </div>
              <div className="team-inputs">
                {teams.map((team) => (
                  <div key={team.id} className="team-answer">
                    <label>{team.name}:</label>
                    <input
                      type="text"
                      value={answers[team.id] || ''}
                      onChange={(e) => handleChange(team.id, e.target.value)}
                      disabled={locked}
                    />
                  </div>
                ))}
              </div>
              {!locked ? (
                <button onClick={lockAnswers} className="lock-btn">
                  💾 Lock Answers
                </button>
              ) : (
                <button onClick={nextQuestion} className="next-btn">
                  ➡️ Next
                </button>
              )}
            </>
          ) : (
            <>
              <div className="question-box">
                  <h2>🗣️ Phase 2 - Verbal Round</h2>
                  <p>{currentQuestion.question_text}</p>
              </div>
              <div className="team-inputs">
                {teams.map((team) => (
                  <div key={team.id} className="team-answer">
                    <label>{team.name}:</label>
                    {!revealedAnswers[team.id] ? (
                      <button onClick={() => revealAnswer(team.id)}>👁 Reveal Answer</button>
                    ) : (
                      <>
                        <p>Original Answer: {revealedAnswers[team.id]}</p>
                        <button onClick={() => markMatch(team.id, true)}>✅ Match</button>
                        <button onClick={() => markMatch(team.id, false)}>❌ No Match</button>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={nextQuestion} className="next-btn">
                ➡️ Next Question
              </button>
            </>
          )}
        </div>
  
        {/* Right container: Leaderboard */}
        {/* <div className="addteams-container right-container">
          {(currentIndex >= questions.length || phaseTwo) && (
            <>
              <h2>🏆 Leaderboard</h2>
              <ul>
                {teams.map((team) => (
                  <li key={team.id}>
                    {team.name}: {scores[team.id] || 0}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div> */}
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
      </div>

      <footer className="flashcard-footer">
        ❤️ Crafted with love — Because love deserves a little fun! ❤️
      </footer>
    </div>
  );    
};

export default Flashcards;
