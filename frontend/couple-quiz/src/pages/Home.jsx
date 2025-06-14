import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
    const navigate = useNavigate();
    return (
      <div className="home-container">
        <header className="home-header">
            Employees Retreat - Love Edition 💌 
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
                  top: `-40px`, // Always start above the screen
                  animationDelay: `${Math.random() * 20}s`,
                  animationDuration: `${6 + Math.random() * 6}s`,
                  opacity: 0, // start invisible
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
            <h2 className="jumbotron-title">✨ Luke 9:23 Ministries Presents ✨</h2>
            <p className="jumbotron-text">💖 Couple Compatibility Quiz 💖</p>
        </div>
          {/* <h2 className="home-subheading">Luke 9:23 Ministries</h2>
          <h2 className="home-subheading">presents</h2>
          <h1 className="home-title"> 💖 Couple Compatibility Quiz 💖</h1> */}
          <p className="home-subtext">Let the quiz reveal your magical bond ✨</p>
          <button onClick={() => navigate("/add-teams")}>Let's Play</button>
          </div>
        </main>
  
        <footer className="home-footer">
          ❤️ Crafted with love — Because love deserves a little fun! ❤️
        </footer>
      </div>
    );
  };

export default Home;
