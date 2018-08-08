import getURLs from './urls';
import extract from './extract';
import summarize from './summarize';
import { isEmptyObj } from '../../shared';

async function fetchSummaries(name) {
  const results = {};
  const urlsObj = await getURLs(name);
  if (urlsObj && !isEmptyObj(urlsObj)) {
    for (const [key, url] of Object.entries(urlsObj)) {
      const text = await extract(url);
      if (!text) throw Error(`${name} text not found`);
      const summaries = await summarize({
        text: text
      });
      if (!summaries || summaries.length === 0)
        throw Error(`${name} no summaries found`);
      results[key] = summaries;
    }
    if (isEmptyObj(results)) {
      throw Error(`no summaries were found`);
    }
    return results;
  }
  throw Error(`${name}: could not fetch its URLs`);
}

export default fetchSummaries;
