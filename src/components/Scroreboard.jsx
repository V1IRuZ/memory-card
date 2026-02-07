function Score({ name, score }) {
  return (
    <li>
      <h1>{name}</h1>
      <span>{score}</span>
    </li>
  );
}

function ScoreList({ highScores }) {
  return (
    <ul>
      {highScores.map((highScore) => (
        <Score
          name={highScore.name}
          score={highScore.score}
          key={highScore.id}
        />
      ))}
    </ul>
  );
}

export default function Scroreboard({ highScores, onClose }) {
  return (
    <dialog className="scoreboard" open>
      <ScoreList highScores={highScores} />

      <div className="close">
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </dialog>
  );
}
