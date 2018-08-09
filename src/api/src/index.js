import getURLs from './urls';
import extract from './extract';
import summarize from './summarize';
import { isEmptyObj } from '../../shared';

async function fetch(url) {
  const text = await extract(url);
  if (!text) throw Error(`${url} text not found`);
  const summaries = await summarize({ text });
  if (!summaries === 0) throw Error(`${url} no summaries found`);
  return summaries;
}

async function main(url) {
  const results = {};
  const urlsObj = await getURLs(url);

  if (!isEmptyObj(urlsObj)) {
    for (const [key, urlValue] of Object.entries(urlsObj)) {
      if (key && urlValue) {
        results[key] = await fetch(urlValue);
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
