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
        <div className="jumbotron">
            <h2 className="jumbotron-title">✨ Luke 9:23 Ministries Presents ✨</h2>
            <p className="jumbotron-text">💖 Couple Compatibility Quiz 💖</p>
        </div>
          {/* <h2 className="home-subheading">Luke 9:23 Ministries</h2>
          <h2 className="home-subheading">presents</h2>
          <h1 className="home-title"> 💖 Couple Compatibility Quiz 💖</h1> */}
          <p className="home-subtext">Let the quiz reveal your magical bond ✨</p>
          <button onClick={() => navigate("/add-teams")}>Let's Play</button>
        </main>
  
        <footer className="home-footer">
          ❤️ Crafted with love — Because love deserves a little fun! ❤️
        </footer>
      </div>
    );
  };

export default Home;
