const getAPIData = async () => {
  try {
    const request = await fetch('https://swapi.dev/api/planets');
    const { results } = await request.json();
    await results.forEach((planet) => delete planet.residents);
    return results;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getAPIData;
