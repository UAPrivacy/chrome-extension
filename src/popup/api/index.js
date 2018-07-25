import fetchFromStore from './src';

async function fetchData(name) {
  try {
    const results = await fetchFromStore(name);
    const privacies = results.privacies.summariesFromText;
    const terms = results.terms.summariesFromText;
    return {
      privacies,
      terms,
    };
  } catch (error) {
    return error;
  }
}

export default fetchData;
