import Score from "./Score";

export default function ScoreList({
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