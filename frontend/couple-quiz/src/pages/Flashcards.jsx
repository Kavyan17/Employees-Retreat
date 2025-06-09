import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { parseCSVFile } from '../utils/parseCSV';
import axios from 'axios';
import '../styles/Flashcards.css';

const Flashcards = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false);
  const location = useLocation();
  const teams = location.state?.teams || [];


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
    setCurrentIndex((prev) => prev + 1);
  };

  if (!questions.length) return <div className="loading">Loading questions...</div>;
  if (currentIndex >= questions.length) return <div className="game-over">Game Over! 🎉</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="flashcard-container">
      <div className="flashcard">
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
        <button onClick={lockAnswers} className="lock-btn">💾 Lock Answers</button>
      ) : (
        <button onClick={nextQuestion} className="next-btn">➡️ Next</button>
      )}
    </div>
  );
};

export default Flashcards;