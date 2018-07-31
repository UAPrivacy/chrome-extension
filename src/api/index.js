import fetchFromStore from './src';

async function fetchData(name) {
  try {
    console.log(`requesting ${url}`);
    const { terms, privacies } = await fetchFromStore(name);
    return {
      privacies,
      terms,
    };
  } catch (error) {
    return error;
  }
}

export default fetchData;
