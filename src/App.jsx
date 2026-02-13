import { useState, useRef } from "react";
import { initialScores } from "./data/data";
import GameBoard from "./components/GameBoard";
import Scoreboard from "./components/Scoreboard";
import Rules from "./components/Rules";
import trophyIcon from "./assets/icons/trophy-svgrepo-com.svg";
import hintIcon from "./assets/icons/hint-svgrepo-com.svg";
import "./App.css";

export default function App() {
  const [highScore, setHighScore] = useState(initialScores);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState(null);
  const [aciveScoreId, setActiveScoreId] = useState(null);
  const leaderboardRef = useRef(null);
  const rulesRef = useRef(null);

  const handleClose = () => {
    leaderboardRef.current?.close();
    setActiveScoreId(null);

    if (message) {
      setScore(0);
    }
  };

  const handleCloseRules = () => {
    rulesRef.current?.close();
  };

  const validateHighScore = () => {
    const minScore = Math.min(...highScore.map((item) => item.score));
    if (score <= minScore) {
      setMessage("game over");
      leaderboardRef.current?.showModal();
      return;
    }

    const newId = crypto.randomUUID();
    setHighScore((prev) => {
      const newHighScore = [
        ...prev,
        { name: "Player", score: score, id: newId },
      ].toSorted((a, b) => b.score - a.score);

      newHighScore.pop();
      return newHighScore;
    });

    setActiveScoreId(newId);
    setMessage("new record");
    leaderboardRef.current?.showModal();
  };

  return (
    <div className="page">
      <header>
        <h1>Memory Card</h1>
        <div className="score">
          <span>Points:</span>
          <span>{score}</span>
        </div>
        <div className="option-btns">
          <button
            aria-label="Leaderboards"
            className="leaderboards"
            onClick={() => {
              setMessage(null);
              leaderboardRef.current?.showModal();
            }}
          >
            <img src={trophyIcon} alt="" />
          </button>
          <button
            className="hint-btn"
            aria-label="hint"
            onClick={() => rulesRef.current?.showModal()}
          >
            <img src={hintIcon} alt="" />
          </button>
        </div>
        <Scoreboard
          ref={leaderboardRef}
          score={score}
          activeScoreId={aciveScoreId}
          highScores={highScore}
          setHighScore={setHighScore}
          setActiveScoreId={setActiveScoreId}
          message={message}
          onClose={handleClose}
        />
        <Rules ref={rulesRef} onClose={handleCloseRules} />
      </header>
      <GameBoard setScore={setScore} validateHighScore={validateHighScore} />
    </div>
  );
}
