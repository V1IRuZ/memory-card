import { useEffect, useState } from "react";
import { initialData } from "../data/data";
import Card from "./Card";
import "../styles/GameBoard.css";

export default function GameBoard() {
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

  return (
    <div className="game-board">
      {data.map((item) => (
        <Card data={item} />
      ))}
    </div>
  );
}