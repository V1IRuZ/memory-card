import Modal from "./ui/Modal";
import Message from "./Message";
import goldMedal from "../assets/icons/medal-gold-winner-2-svgrepo-com.svg";
import silverMedal from "../assets/icons/medal-silver-badge-svgrepo-com.svg";
import bronzeMedal from "../assets/icons/medal-bronze-prize-svgrepo-com.svg";
import certificate from "../assets/icons/quality-premium-certificate-svgrepo-com.svg";
import confirmIcon from "../assets/icons/ok-svgrepo-com.svg";
import closeIcon from "../assets/icons/close_32dp_F0C808_FILL0_wght400_GRAD0_opsz40.svg";

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
          <button
            className="confirm-btn"
            aria-label="confirm"
            onClick={() => setActiveScoreId(null)}
          >
            <img src={confirmIcon} alt="" />
          </button>
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

export default function Scoreboard({
  ref,
  score,
  activeScoreId,
  highScores,
  setHighScore,
  setActiveScoreId,
  message,
  onClose,
}) {
  return (
    <dialog
      ref={ref}
      className="scoreboard"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="modal-header">
        <h1>TOP 5</h1>
        <button className="x-btn" onClick={onClose}>
          <img src={closeIcon} alt="" />
        </button>
      </div>
      <ScoreList
        activeScoreId={activeScoreId}
        setActiveScoreId={setActiveScoreId}
        highScores={highScores}
        setHighScore={setHighScore}
      />
      <Message message={message} score={score} />
      <div className="close">
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </dialog>
  );
}
