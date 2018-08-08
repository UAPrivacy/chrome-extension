import github from './github';
import algorithmia, { findURLsWithKey } from './algorithmia';

async function urlsGetter(url) {
  let results;
  let mergeAttempt = false;
  try {
    results = await github(url);
    const categories = ['terms', 'privacies'];
    const keys = Object.keys(results);
    if (keys.length < categories.length) {
      const missingKey = categories.find(key => !keys.includes(key));
      mergeAttempt = true;
      Object.assign(results, await findURLsWithKey(url, missingKey));
    }
  } catch (e) {
    if (mergeAttempt) return results;
    results = await algorithmia(url);
  }
  return results;
}

export default urlsGetter;
