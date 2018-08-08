import github from './github';
import algorithmia, { findURLsWithKey } from './algorithmia';

async function urlsGetter(url) {
  let results;
  try {
    results = await github(url);
    const keys = Object.keys(results);
    if (keys.length === 1) {
      const missingKey = ['terms', 'privacies'].find(
        key => !keys.includes(key)
      );
      findURLsWithKey(url, missingKey);
    }
  } catch (e) {
    results = await algorithmia(url);
  }
  return results;
}

export default urlsGetter;
