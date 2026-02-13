import { useEffect, useState } from "react";
import { initialData } from "../data/data";
import { generateRandomIds } from "../data/utils";
import Card from "./Card";
import "../styles/GameBoard.css";

export default function GameBoard({
  setScore,
  validateHighScore,
}) {
  const [data, setData] = useState(initialData);
  const [round, setRound] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPokemon = async (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
    const response = await fetch(url, { mode: "cors" });
    const json = await response.json();
    const rawName = json.name;
    const name = rawName[0].toUpperCase() + rawName.slice(1);
    const image = json.sprites.other["official-artwork"].front_default;

    return {
      name,
      image,
    };
  };

  useEffect(() => {
    let ignore = false;
    const randomIds = generateRandomIds(data);

    const fetchAllPokemons = async () => {
      setIsLoading(true);

      try {
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
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchAllPokemons();

    return () => {
      ignore = true;
    };
  }, [round]);

  const handleShuffle = (pokemon) => {
    const getShuffledData = (array) => {
      let shuffledArray = array.map((item) =>
        item.id === pokemon.id ? { ...item, selected: true } : { ...item },
      );
      let currentIndex = shuffledArray.length;

      while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
          shuffledArray[randomIndex],
          shuffledArray[currentIndex],
        ];
      }

      return shuffledArray;
    };

    const validateSelectedCard = () => {      
      const BONUS = 5;
      const resetData = data.map((item) => ({ ...item, selected: false }));

      if (pokemon.selected) {
        setData(resetData);
        validateHighScore();
        return;
      }

      const shuffledData = getShuffledData(data);
      const allSelected = shuffledData.every((item) => item.selected);

      if (allSelected) {
        setScore((score) => score + BONUS);
        setData(resetData);
        setRound((rounds) => rounds + 1);
        return;
      }

      setData(shuffledData);
      setScore((score) => score + 1);
    };

    validateSelectedCard();
  };

  return (
    <div className="game-board">
      {!isLoading ? (
        data.map((pokemon) => (
          <Card
            data={pokemon}
            setData={setData}
            onShuffle={() => handleShuffle(pokemon)}
            key={pokemon.id}
          />
        ))
      ) : (
        <div className="loading">
          <span className="spinner"></span>
          <h1>Loading</h1>
        </div>
      )}
    </div>
  );
}
