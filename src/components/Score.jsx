import Button from "./ui/Button";
import goldMedal from "../assets/icons/medal-gold-winner-2-svgrepo-com.svg";
import silverMedal from "../assets/icons/medal-silver-badge-svgrepo-com.svg";
import bronzeMedal from "../assets/icons/medal-bronze-prize-svgrepo-com.svg";
import certificate from "../assets/icons/quality-premium-certificate-svgrepo-com.svg";
import confirmIcon from "../assets/icons/ok-svgrepo-com.svg";

export default function Score({ highScore, index, isActive, setActiveScoreId, setHighScore }) {
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
          <Button
            className="confirm-btn"
            arialLabel="confirm"
            iconSrc={confirmIcon}
            onClick={() => setActiveScoreId(null)}
          />
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