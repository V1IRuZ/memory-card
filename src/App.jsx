import { useState } from "react";
import GameBoard from "./components/GameBoard";
import "./App.css";

export default function App() {
  const [highScore, setHighScore] = useState(5);
  const [score, setScore] = useState(0);

  return (
    <div className="page">
      <header>
        <h1>Memory Card</h1>
        <div className="high-score">
          <span>Highscore: </span>
          <span>{highScore}</span>
        </div>
        <div className="score">
          <span>Points:</span>
          <span>{score}</span>
        </div>
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
