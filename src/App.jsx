import { useState, useRef } from "react";
import { initialScores } from "./data/data.js";
import { loadData, saveData } from "./utils/helpers.js";
import Button from "./components/ui/Button.jsx";
import ButtonContainer from "./components/ui/ButtonContainer.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Scoreboard from "./components/Scoreboard.jsx";
import Rules from "./components/Rules.jsx";
import trophyIcon from "./assets/icons/trophy-svgrepo-com.svg";
import hintIcon from "./assets/icons/hint-svgrepo-com.svg";
import "./App.css";

export default function App() {
  const [highScore, setHighScore] = useState(() => {
    const savedRecords = loadData();
    return savedRecords || initialScores;
  });
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState(null);
  const [aciveScoreId, setActiveScoreId] = useState(null);
  const leaderboardRef = useRef(null);
  const rulesRef = useRef(null);

  const handleCloseScoreboard = () => {
    leaderboardRef.current?.close();
    setActiveScoreId(null);

    if (message === "new record") {
      saveData(highScore);
      setScore(0);
      return;
    }

    if (message === "game over") {
      setScore(0);
    }
  };

  const handleCloseRules = () => {
    rulesRef.current?.close();
  };

  const validateCurrentScore = () => {
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
        <div className="container">
          <h1>Memory Card</h1>
          <div className="points">
            <span>Points:</span>
            <span>{score}</span>
          </div>
          <ButtonContainer className="option-btns">
            <Button
              className="leaderboards"
              arialLabel="Leaderboards"
              iconSrc={trophyIcon}
              onClick={() => {
                setMessage(null);
                leaderboardRef.current?.showModal();
              }}
            />
            <Button
              className="hint-btn"
              arialLabel="hint"
              iconSrc={hintIcon}
              onClick={() => rulesRef.current?.showModal()}
            />
          </ButtonContainer>
          <Scoreboard
            ref={leaderboardRef}
            score={score}
            activeScoreId={aciveScoreId}
            highScores={highScore}
            setHighScore={setHighScore}
            setActiveScoreId={setActiveScoreId}
            message={message}
            onClose={handleCloseScoreboard}
          />
          <Rules ref={rulesRef} onClose={handleCloseRules} />
        </div>
      </header>
      <GameBoard
        setScore={setScore}
        validateCurrentScore={validateCurrentScore}
      />
    </div>
  );
}
