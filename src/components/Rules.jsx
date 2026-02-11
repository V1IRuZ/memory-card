import closeIcon from "../assets/icons/close_32dp_F0C808_FILL0_wght400_GRAD0_opsz40.svg";

export default function Rules({ ref, onClose }) {
  return (
    <dialog className="rules" ref={ref}>
      <div className="modal-header">
        <h1>Game Rules</h1>
        <button className="x-btn" onClick={onClose}>
          <img src={closeIcon} alt="" />
        </button>
      </div>
      <ul className="rules-list">
        <li>Select a card that you haven't selected yet</li>
        <li>After each selection, the cards are shuffled</li>
        <li>When all cards have been guessed, new ones are dealt</li>
        <li>
          The game ends when a player selects a card that has already been
          selected
        </li>
        <li>
          A point comes from a correct guess and a 5 point bonus for all cards
          in the round
        </li>
      </ul>
      <div className="close">
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </dialog>
  );
}
