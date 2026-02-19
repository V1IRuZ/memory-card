import { useEffect, useState } from "react";
import { initialData } from "../data/data.js";
import {
  generateRandomIds,
  fetchPokemon,
  getShuffledData,
} from "../utils/helpers.js";
import Spinner from "./ui/Spinner.jsx";
import Error from "./ui/Error.jsx";
import Card from "./Card.jsx";
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

      // Validate the end of the game
      if (pokemon.selected) {
        setData(resetData);
        validateCurrentScore();
        return;
      }

      const shuffledData = getShuffledData(data, pokemon);
      const allSelected = shuffledData.every((item) => item.selected);

      // Check if all cards are selected, give Bonus and render new cards
      if (allSelected) {
        setScore((score) => score + BONUS);
        setData(resetData);
        setRound((rounds) => rounds + 1);
        return;
      }

      // Otherwise, add score and shuffle the cards.
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
    </div>
  );
}
