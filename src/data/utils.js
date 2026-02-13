const generateRandomIds = (array) => {
  const maxId = 151;
  const usedIds = new Set();

  const randomIds = array.map(() => {
    let id;

    do {
      id = Math.floor(Math.random() * maxId);
    } while (usedIds.has(id));

    usedIds.add(id);
    return id;
  });

  return randomIds;
};

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

export { generateRandomIds, fetchPokemon };
