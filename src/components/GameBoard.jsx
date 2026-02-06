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

  const fetchPokemon = async (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
    const response = await fetch(url, { mode: "cors" });
    const json = await response.json();
    const rawName = json.name;
    const name = rawName[0].toUpperCase() + rawName.slice(1);
    const image = json.sprites.front_default;

    return {
      name,
      image,
    };
  };

  useEffect(() => {
    let ignore = false;
    const maxId = 151;

    const usedIds = new Set();

    const randomIds = data.map(() => {
      let id;

      do {
        id = Math.floor(Math.random() * maxId);
      } while (usedIds.has(id))

        usedIds.add(id);
        return id;
    })

    const fetchAllPokemons = async () => {

      const results = await Promise.all(
        data.map(async (item, index) => {
          const pokemonData = await fetchPokemon(randomIds[index]);

          return {
            ...item,
            name: pokemonData.name,
            imgSrc: pokemonData.image,
          };
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
