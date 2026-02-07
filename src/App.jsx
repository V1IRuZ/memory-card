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
        score={score}
        setScore={setScore}
        highScore={highScore}
        setHighScore={setHighScore}
      />
    </div>
  );
}
