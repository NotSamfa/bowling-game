import { useState } from "react";
import "./styles/GameMenu.css";
import bolosImage from "../assets/bolos.png";

function GameMenu({ gameState, setGameState, username ,setUsername, score, setScore}) {

  const handleStart = () => {
    setGameState("username");
  };

  const handleScoreboard = () => {
    setGameState("scoreboard");
  };

  const handleBackToMenu = () => {
    setGameState("start");
    setScore(0);
    setUsername('');
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setGameState("game");
    }
  };

  return (
    <div
      className="game-menu overlay"
      style={{
        background: `url(${bolosImage}) center center / cover no-repeat`,
      }}
    >
      <div className="overlay" />
      {gameState === "start" && (
        <div className="menu-container">
          <h1 className="title">BOWLING GAME</h1>
          <button onClick={handleStart} className="button">
            START GAME
          </button>
          <button onClick={handleScoreboard} className="button">
            SCOREBOARD
          </button>
        </div>
      )}

      {gameState === "username" && (
        <div className="form-container">
          <form onSubmit={handleUsernameSubmit} className="form">
            <h2 className="subtitle">Enter your name</h2>
            <input
              type="text"
              placeholder="Player name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
            <button type="submit"  className="button">
              PLAY
            </button>
          </form>
        </div>
      )}

   
      {gameState === "scoreboard" && (
        <div className="scoreboard-container">
          <h2 className="subtitle">TOP 5 SCORES</h2>
          <ul>
            {JSON.parse(localStorage.getItem("scores"))?.length > 0 ? (
              JSON.parse(localStorage.getItem("scores"))
                .sort((a, b) => b.score - a.score)
                .slice(0, 5)
                .map((entry, index) => (
                  <li key={index}>
                    {index + 1}. {entry.name} - {entry.score}
                  </li>
                ))
            ) : (
              <p>No one have played this game :(</p>
            )}
          </ul>
          <button onClick={handleBackToMenu} className="button">
            BACK TO MENU
          </button>
        </div>
      )}

      
      {gameState === "score" && (
        <div className="score-container">
          <h2 className="subtitle">{username}, you got {score}!</h2>
          <button onClick={handleBackToMenu} className="button">
            BACK TO MENU
          </button>
        </div>
      )}
    </div>
  );
}

export default GameMenu;
