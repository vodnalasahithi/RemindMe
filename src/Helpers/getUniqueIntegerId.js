import uniqueRandom from 'unique-random';

const getUniqueIntegerId = () => {
  const random = uniqueRandom(1, 99999);
  return random();
};

export default getUniqueIntegerId;
