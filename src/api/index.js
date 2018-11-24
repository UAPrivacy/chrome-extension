import getURLs from "./src/urls";
import summarize from "./src/summarize";
import { isObjectEmpty } from "../shared";

async function fetch(url) {
  const summaries = await summarize(url);
  if (!summaries || summaries.length === 0)
    throw Error(`unable to fetch summaries: ${url}`);
  return summaries;
}

async function fetchSummaries(URL) {
  const results = {};
  const urls = await getURLs(URL);
  if (!isObjectEmpty(urls)) {
    for (const [category, url] of Object.entries(urls))
      if (category && url) results[category] = await fetch(url);
    if (isObjectEmpty(results))
      throw Error(`no results after fetching: ${URL}`);
    return results;
  }
  throw Error(`urls not found`);
}

export default fetchSummaries;
