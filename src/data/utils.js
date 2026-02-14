const generateRandomIds = (array) => {
  const maxId = 151;
  const usedIds = new Set();

  const randomIds = array.map(() => {
    let id;

    do {
      id = Math.floor(Math.random() * maxId) + 1;
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

const getShuffledData = (array, current) => {
  let shuffledArray = array.map((item) =>
    item.id === current.id ? { ...item, selected: true } : { ...item },
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

const saveData = (records) => {
  localStorage.setItem("records", JSON.stringify(records));
};

const loadData = () => {
  return JSON.parse(localStorage.getItem("records"));
};

export { generateRandomIds, fetchPokemon, getShuffledData, saveData, loadData };
