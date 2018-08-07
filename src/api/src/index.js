import getURLs from './urls';
import extract from './extract';
import summarize from './summarize';
import { isEmptyObj } from './shared';

async function fetchSummaries(name) {
  const results = {};
  const pagesToFetch = await getURLs(name);
  if (!isEmptyObj(pagesToFetch)) {
    // TODO try url params?
    for (const [key, url] of Object.entries(pagesToFetch)) {
      const pageText = await extract(url);
      const summaries = await summarize({
        text: pageText
      });
      results[key] = summaries;
    }
    return results;
  }
  throw Error(`${name}: page info not found`);
}

export default fetchSummaries;
