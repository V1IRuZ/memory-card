export default function Message({ message, score }) {
  if (message === "game over") {
    return (
      <div className="message">
        <p>Game Over! Final score {score}.</p>
      </div>
    );
  }

  if (message === "new record") {
    return (
      <div className="message">
        <p>Congratulations! You made it to the leaderboards!</p>
      </div>
    );
  }
  return null;
}