import Modal from "./ui/Modal.jsx";
import ScoreList from "./ScoreList.jsx";
import Message from "./Message.jsx";
import "../styles/Scoreboard.css";

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
    <Modal
      ref={ref}
      className="scoreboard"
      headerText="TOP 5"
      onClose={onClose}
    >
      <ScoreList
        activeScoreId={activeScoreId}
        setActiveScoreId={setActiveScoreId}
        highScores={highScores}
        setHighScore={setHighScore}
      />
      <Message message={message} score={score} />
    </Modal>
  );
}
