function Score({ highScore, isActive, setHighScore }) {
  return (
    <li>
      {isActive ? (
        <div>
          <label htmlFor="">
            Name
            <input
              type="text"
              defaultValue={highScore.name}
              onChange={(e) =>
                setHighScore((prev) =>
                  prev.map((item) =>
                    item.id === highScore.id
                      ? { ...item, name: e.target.value }
                      : item,
                  ),
                )
              }
            />
          </label>
        </div>
      ) : (
        <h1>{highScore.name}</h1>
      )}
      <span>{highScore.score}</span>
    </li>
  );
}

function ScoreList({ activeScoreId, highScores, setHighScore }) {
  return (
    <ul>
      {highScores.map((highScore) => (
        <Score
          highScore={highScore}
          isActive={activeScoreId === highScore.id}
          setHighScore={setHighScore}
          key={highScore.id}
        />
      ))}
    </ul>
  );
}

export default function Scroreboard({
  activeScoreId,
  highScores,
  setHighScore,
  content,
  onClose,
}) {
  return (
    <dialog className="scoreboard" open>
      <ScoreList
        activeScoreId={activeScoreId}
        highScores={highScores}
        setHighScore={setHighScore}
      />
      {content === "game over" ? (
        <div>
          <p>Game Over!</p>
        </div>
      ) : content === "new record" ? (
        <div>
          <p>Congratulations! You made it to the leaderboards!</p>
        </div>
      ) : null}

      <div className="close">
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </dialog>
  );
}
