import { useState } from "react";
import { initialScores } from "./data/data";
import GameBoard from "./components/GameBoard";
import Scroreboard from "./components/Scroreboard";
import "./App.css";

export default function App() {
  const [highScore, setHighScore] = useState(initialScores);
  const [score, setScore] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [aciveScoreId, setActiveScoreId] = useState(null);

  const handleClose = () => {
    setIsOpen(false);
    setActiveScoreId(null);
  };

  const validateHighScore = () => {
    const minScore = Math.min(...highScore.map((item) => item.score));
    if (score <= minScore) {
      setContent("game over");
      setIsOpen(true);
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
    setIsOpen(true);
  };

  return (
    <div className="page">
      <header>
        <h1>Memory Card</h1>
        <div className="score">
          <span>Points:</span>
          <span>{score}</span>
        </div>
        <button
          className="highscore"
          onClick={() => {
            setContent(null);
            setIsOpen(true);
          }}
        >
          High Scores
        </button>
        {isOpen && (
          <Scroreboard
            activeScoreId={aciveScoreId}
            highScores={highScore}
            setHighScore={setHighScore}
            content={content}
            score={score}
            onClose={handleClose}
          />
        )}
      </header>
      <GameBoard
        isOpen={isOpen}
        setScore={setScore}
        validateHighScore={validateHighScore}
      />
    </div>
  );
}
