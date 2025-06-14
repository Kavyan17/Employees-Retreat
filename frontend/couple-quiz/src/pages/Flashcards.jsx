import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { parseCSVFile } from '../utils/parseCSV';
import axios from 'axios';
import '../styles/Flashcards.css';

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
    return <div className="game-over">
      <p>All questions completed! 🎉</p>
      <button onClick={enterPhaseTwo}>🔁 Enter Phase 2</button>
    </div>;
  }

  if (currentIndex >= questions.length && phaseTwo) {
    return (
      <div className="game-over">
        <h2>🏆 Final Leaderboard</h2>
        <ul>
          {teams.map(team => (
            <li key={team.id}>{team.name}: {scores[team.id]}</li>
          ))}
        </ul>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="flashcard-container">
      <div className="flashcard">
        <h2>{phaseTwo ? '🗣️ Phase 2 - Verbal Round' : '💖 Question'} {currentIndex + 1}</h2>
        <p>{currentQuestion.question_text}</p>
      </div>

      <div className="team-inputs">
        {teams.map((team) => (
          <div key={team.id} className="team-answer">
            <label>{team.name}:</label>
            {!phaseTwo ? (
              <input
                type="text"
                value={answers[team.id] || ''}
                onChange={(e) => handleChange(team.id, e.target.value)}
                disabled={locked}
              />
            ) : (
              !revealedAnswers[team.id] ? (
                <button onClick={() => revealAnswer(team.id)}>👁 Reveal Answer</button>
              ) : (
                <>
                  <p>Original Answer: {revealedAnswers[team.id]}</p>
                  <button onClick={() => markMatch(team.id, true)}>✅ Match</button>
                  <button onClick={() => markMatch(team.id, false)}>❌ No Match</button>
                </>
              )
            )}
          </div>
        ))}
      </div>

      {!phaseTwo ? (
        !locked ? (
          <button onClick={lockAnswers} className="lock-btn">💾 Lock Answers</button>
        ) : (
          <button onClick={nextQuestion} className="next-btn">➡️ Next</button>
        )
      ) : (
        <button onClick={nextQuestion} className="next-btn">➡️ Next Question</button>
      )}
    </div>
  );
};

export default Flashcards;
