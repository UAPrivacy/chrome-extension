import getURLs from './urls';
import extract from './extract';
import summarize from './summarize';

const isEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object;

async function fetchSummaries(name) {
  const results = {};
  const pagesToFetch = await getURLs(name);
  if (!isEmpty(pagesToFetch)) {
    // TODO try url params?
    for (const [key, url] of Object.entries(pagesToFetch)) {
      const pageText = await extract(url);
      const summaries = await summarize({
        text: pageText,
      });
      // const summaries = await summarize({
      //   url,
      // });
      results[key] = summaries;
    }
    return results;
  }
  throw Error(`${name}: page info not found`);
}

export default fetchSummaries;
