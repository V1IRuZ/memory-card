import { useState } from "react";
import { initialScores } from "./data/data";
import GameBoard from "./components/GameBoard";
import Scroreboard from "./components/Scroreboard";
import "./App.css";

export default function App() {
  const [highScore, setHighScore] = useState(initialScores);
  const [score, setScore] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const validateHighScore = () => {
      const minScore = Math.min(...highScore.map((item) => item.score));
      if (score <= minScore) {
        return;
      }

    setHighScore((prev) => {
      const newHighScore = [
        ...prev,
        { name: "Player", score: score, id: crypto.randomUUID() },
      ].toSorted((a, b) => b.score - a.score);

      newHighScore.pop();
      return newHighScore;
    });

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
        <button className="highscore" onClick={() => setIsOpen(true)}>
          High Scores
        </button>
        {isOpen && <Scroreboard highScores={highScore} onClose={handleClose} />}
      </header>
      <GameBoard
        setScore={setScore}
        validateHighScore={validateHighScore}
      />
    </div>
  );
}
