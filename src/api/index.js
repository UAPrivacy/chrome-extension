import fetchFromStore from './src';

async function fetchData(name) {
  try {
    const { terms, privacies } = await fetchFromStore(name);
    return {
      privacies,
      terms,
    };
  } catch (error) {
    throw error;
  }
}

export default fetchData;
