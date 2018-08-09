import getURLs from './urls';
import extract from './extract';
import summarize from './summarize';
import { isEmptyObj } from '../../shared';

async function fetchSummaries(url) {
  const results = {};
  const urlsObj = await getURLs(url);

  if (!isEmptyObj(urlsObj)) {
    for (const [key, urlValue] of Object.entries(urlsObj)) {
      if (key && urlValue) {
        const text = await extract(urlValue);

        if (!text) throw Error(`${url} text not found`);
        const summaries = await summarize({
          text: text
        });

        if (!summaries === 0) throw Error(`${url} no summaries found`);
        results[key] = summaries;
      }
    }
    if (isEmptyObj(results)) {
      throw Error(`${url} no summaries were found after loop`);
    }
    return results;
  }
  throw Error(`${url}: could not fetch its URLs`);
}
const fetchWrapper = url => setTimeout(() => fetchSummaries(url), 12000);

export default fetchWrapper;
