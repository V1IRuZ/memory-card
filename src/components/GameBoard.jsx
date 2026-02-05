import { useEffect, useState } from "react";
import { initialData } from "../data/data";
import Card from "./Card";
import "../styles/GameBoard.css";

export default function GameBoard({
  score,
  setScore,
  highScore,
  setHighScore,
}) {
  const [data, setData] = useState(initialData);

  const fetchPokemon = async (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;
    const response = await fetch(url, { mode: "cors" });
    const json = await response.json();
    const source = json.sprites.front_default;
    return source;
  };

  useEffect(() => {
    let ignore = false;

    const fetchAllPokemons = async () => {
      const results = await Promise.all(
        data.map(async (item) => {
          const image = await fetchPokemon(item.name);

          return { ...item, imgSrc: image };
        }),
      );

      if (!ignore) {
        setData(results);
      }
    };

    fetchAllPokemons();

    return () => {
      ignore = true;
    };
  }, []);

  const handleShuffle = (pokemon, array, random = Math.random) => {
    const shuffle = () => {
      let shuffledArray = array.map((item) =>
        item.id === pokemon.id ? { ...item, selected: true } : { ...item },
      );
      let currentIndex = shuffledArray.length;

      while (currentIndex != 0) {
        let randomIndex = Math.floor(random() * currentIndex);
        currentIndex--;

        [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
          shuffledArray[randomIndex],
          shuffledArray[currentIndex],
        ];
      }

      setData(shuffledArray);
    };

    const validateHighScore = () => {
      if (score <= highScore) {
        return;
      }
      setHighScore(score);
    };

    const validateSelectedCard = () => {
      if (pokemon.selected) {
        const resetData = data.map((item) => ({ ...item, selected: false }));
        setData(resetData);
        validateHighScore();
        setScore(0);
        return;
      }

      shuffle();
      setScore((score) => score + 1);
    };

    validateSelectedCard();
  };

  return (
    <div className="game-board">
      {data.map((pokemon) => (
        <Card
          data={pokemon}
          setData={setData}
          onShuffle={() => handleShuffle(pokemon, data)}
        />
      ))}
    </div>
  );
}
