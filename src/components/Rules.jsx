import Modal from "./ui/Modal.jsx";
import "../styles/Rules.css";

export default function Rules({ ref, onClose }) {
  return (
    <Modal
      className="rules"
      ref={ref}
      onClose={onClose}
      headerText="Game Rules"
    >
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
    </Modal>
  );
}
