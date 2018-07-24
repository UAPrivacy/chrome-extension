import fetchFromStore from './src';

async function fetchData(name) {
  let terms = [];
  let privacies = [];
  try {
    const results = await fetchFromStore(name);
    privacies = results.privacies.summariesFromText;
    terms = results.terms.summariesFromText;
  } catch (error) {
    console.error(error);
  }
  return {
    terms,
    privacies,
  };
}

export default fetchData;
