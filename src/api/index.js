import getURLs from './src/urls';
import summarize from './src/summarize';
import { isEmptyObj } from '../shared';

async function fetch(url) {
  const summaries = await summarize(url);
  if (!summaries || summaries.length === 0)
    throw Error(`unable to fetch summaries: ${url}`);
  return summaries;
}

async function main(URL) {
  const results = {};
  const urls = await getURLs(URL);
  if (!isEmptyObj(urls)) {
    for (const [key, url] of Object.entries(urls)) {
      if (key && url) results[key] = await fetch(url);
    }
    if (isEmptyObj(results)) throw Error(`no results after fetching: ${URL}`);
    return results;
  }
  throw Error(`urls not found`);
}

export default main;
