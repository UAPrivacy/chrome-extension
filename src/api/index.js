import getURLs from './src/urls';
import summarize from './src/summarize';
import { isEmptyObj } from '../shared';

async function fetch(url) {
  const summaries = await summarize(url);
  if (!summaries || summaries.length === 0)
    throw Error(`${url} no summaries found`);
  return summaries;
}

async function main(url) {
  const results = {};
  const urlsObj = await getURLs(url);
  if (!isEmptyObj(urlsObj)) {
    for (const [key, urlToFetch] of Object.entries(urlsObj)) {
      if (key && urlToFetch) {
        results[key] = await fetch(urlToFetch);
      }
    }
    if (isEmptyObj(results)) {
      throw Error(`${url} no summaries were found after loop`);
    }
    return results;
  }
  throw Error(`${url}: could not fetch its URLs`);
}

export default main;
