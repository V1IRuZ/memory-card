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

  export { generateRandomIds }