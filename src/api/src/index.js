import getURLs from './urls';
import extract from './extract';
import summarize from './summarize';
import { isEmptyObj } from './shared';

async function fetchSummaries(name) {
  const results = {};
  const pagesToFetch = await getURLs(name);
  if (!isEmptyObj(pagesToFetch)) {
    for (const [key, url] of Object.entries(pagesToFetch)) {
      const pageText = await extract(url);
      const summariesFromText = await summarize({
        text: pageText
      });
      results[key] = summariesFromText;
    }
    if (isEmptyObj(results)) {
      throw Error`No summaries were found`;
    }
    return results;
  }
  throw Error(`${name}: page info not found`);
}

export default fetchSummaries;
