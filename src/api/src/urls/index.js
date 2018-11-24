import github from "./github";
import algorithmia, { findURLsCategory } from "./getLinks";
import { isObjectEmpty, CATEGORIES } from "../../../shared";

async function getURLs(url) {
  let results, shouldMerge;
  try {
    results = await github(url);

    const keys = Object.keys(results);
    if (keys.length < CATEGORIES.length) {
      const missingKey = CATEGORIES.find(key => !keys.includes(key));
      shouldMerge = true;
      const resultsTwo = await findURLsCategory(url, missingKey);

      if (!isObjectEmpty(resultsTwo)) {
        results = Object.assign(results, resultsTwo);
      }
    }
  } catch (e) {
    if (shouldMerge) return results;
    results = await algorithmia(url);
  }
  results = selector(results);
  return results;
}

function selector(data) {
  for (const category of CATEGORIES) {
    data[category] = data[category][0];
  }
  return data;
}

export default getURLs;
