import GameBoard from "./components/GameBoard";
import "./App.css";


export default function App() {

  return (
    <div className="page">
      <header>
        <h1>Memory Card</h1>
      </header>
      <GameBoard />
    </div>
  );
}