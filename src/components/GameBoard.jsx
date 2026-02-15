import { useEffect, useState } from "react";
import { initialData } from "../data/data";
import {
  generateRandomIds,
  fetchPokemon,
  getShuffledData,
} from "../data/utils";
import Spinner from "./ui/Spinner";
import Error from "./ui/Error";
import Card from "./Card";
import "../styles/GameBoard.css";

export default function GameBoard({ setScore, validateCurrentScore }) {
  const [data, setData] = useState(initialData);
  const [round, setRound] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
        setIsError(true);
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

  const handleCardClick = (pokemon) => {
    const validateSelectedCard = () => {
      const BONUS = 5;
      const resetData = data.map((item) => ({ ...item, selected: false }));

      if (pokemon.selected) {
        setData(resetData);
        validateCurrentScore();
        return;
      }

      const shuffledData = getShuffledData(data, pokemon);
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

  if (isLoading) {
    return (
      <div className="game-board">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="game-board">
        <Error />
      </div>
    );
  }

  return (
    <div className="game-board">
      {data.map((pokemon) => (
        <Card
          data={pokemon}
          setData={setData}
          onClick={() => handleCardClick(pokemon)}
          key={pokemon.id}
        />
      ))}
      u
    </div>
  );
}
