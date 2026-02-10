import { useState, useRef } from "react";
import { initialScores } from "./data/data";
import GameBoard from "./components/GameBoard";
import Scroreboard from "./components/Scroreboard";
import trophyIcon from "./assets/icons/trophy-svgrepo-com.svg";
import hintIcon from "./assets/icons/hint-svgrepo-com.svg";
import "./App.css";

export default function App() {
  const [highScore, setHighScore] = useState(initialScores);
  const [score, setScore] = useState(0);
  const [content, setContent] = useState(null);
  const [aciveScoreId, setActiveScoreId] = useState(null);
  const leaderboardRef = useRef(null);

  const handleClose = () => {
    leaderboardRef.current.close();
    setActiveScoreId(null);
  };

  const validateHighScore = () => {
    const minScore = Math.min(...highScore.map((item) => item.score));
    if (score <= minScore) {
      setContent("game over");
      leaderboardRef.current.showModal();
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
    setContent("new record");
    leaderboardRef.current.showModal();
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
              setContent(null);
              leaderboardRef.current.showModal();
            }}
          >
            <img src={trophyIcon} alt="" />
          </button>
          <button className="hint-btn" aria-label="hint">
            <img src={hintIcon} alt="" />
          </button>
        </div>
          <Scroreboard
            ref={leaderboardRef}
            activeScoreId={aciveScoreId}
            highScores={highScore}
            setHighScore={setHighScore}
            setActiveScoreId={setActiveScoreId}
            content={content}
            score={score}
            onClose={handleClose}
          />
      </header>
      <GameBoard
        setScore={setScore}
        validateHighScore={validateHighScore}
      />
    </div>
  );
}
