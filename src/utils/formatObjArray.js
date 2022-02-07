export const arrayToObj = (entries) => {
  return entries.reduce((acc, entry) => {
    const { id } = entry;
    acc[id] = entry;
    return acc;
  }, {});
};

export const objToArray = (entries) => {
  return Object.values(entries).reduce((acc, entry) => {
    const { id } = entry;
    acc[id] = entry;
    return acc;
  }, []);
};
