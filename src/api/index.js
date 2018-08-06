import fetchSummaries from './src';

// TODO delete file?
async function fetch(name) {
  const { terms, privacies } = await fetchSummaries(name);
  return {
    privacies,
    terms
  };
}

export default fetch;
