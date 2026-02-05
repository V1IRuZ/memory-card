import { useState } from "react";
import GameBoard from "./components/GameBoard";
import "./App.css";

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="page">
      <header>
        <h1>Memory Card</h1>
        <div className="score">
          <span>Points:</span>
          <span>{score}</span>
        </div>
      </header>
      <GameBoard setScore={setScore} />
    </div>
  );
}
