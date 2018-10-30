import github from './github';
import algorithmia, { findURLsCategory } from './algorithmia';
import { isEmptyObj, CATEGORIES } from '../../../shared';

async function getURLs(url) {
  let results, shouldMerge;
  try {
    results = await github(url);
    const keys = Object.keys(results);
    if (keys.length < CATEGORIES.length) {
      const missingKey = CATEGORIES.find(key => !keys.includes(key));
      shouldMerge = true;
      const resultsTwo = await findURLsCategory(url, missingKey);
      if (!isEmptyObj(resultsTwo)) {
        results = Object.assign(results, resultsTwo);
      }
    }
  } catch (e) {
    if (shouldMerge) return results;
    results = await algorithmia(url);
  }
  return results;
}

export default getURLs;
