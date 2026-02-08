import goldMedal from "../assets/icons/medal-gold-winner-2-svgrepo-com.svg";
import silverMedal from "../assets/icons/medal-silver-badge-svgrepo-com.svg";
import bronzeMedal from "../assets/icons/medal-bronze-prize-svgrepo-com.svg";
import certificate from "../assets/icons/quality-premium-certificate-svgrepo-com.svg";

function Score({ highScore, index, isActive, setActiveScoreId, setHighScore }) {
  const trophys = [
    goldMedal,
    silverMedal,
    bronzeMedal,
    certificate,
    certificate,
  ];

  return (
    <li className="record-item">
      {isActive ? (
        <div className="record">
          <label htmlFor="">
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
          <button onClick={() => setActiveScoreId(null)}>OK</button>
        </div>
      ) : (
        <div className="placement">
          <img src={trophys[index]} alt="" />
          <h1>{highScore.name}</h1>
        </div>
      )}
      {!isActive && <span>{highScore.score}</span>}
    </li>
  );
}

function ScoreList({
  activeScoreId,
  setActiveScoreId,
  highScores,
  setHighScore,
}) {
  return (
    <ul>
      {highScores.map((highScore, index) => (
        <Score
          highScore={highScore}
          index={index}
          isActive={activeScoreId === highScore.id}
          setActiveScoreId={setActiveScoreId}
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
  setActiveScoreId,
  content,
  onClose,
}) {
  return (
    <dialog className="scoreboard" open>
      <ScoreList
        activeScoreId={activeScoreId}
        setActiveScoreId={setActiveScoreId}
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
