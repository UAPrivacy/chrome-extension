import axios from 'axios';
import { findBestMatch } from 'string-similarity';
import { isEmptyObj, CATEGORIES } from '../../../shared';

function selector(cache) {
  const results = {};
  CATEGORIES.forEach(category => {
    const urls = cache[category];
    if (urls) results[category] = urls;
  });
  if (isEmptyObj(results)) throw Error(`categories not found`);
  return results;
}

function findKey(keys, name) {
  return findBestMatch(name, keys).bestMatch.target;
}

function findURLs(url, cache) {
  const key = findKey(Object.keys(cache), url);
  if (key) return cache[key];
  else throw Error(`url not found: ${url}`);
}

async function getCache() {
  const url =
    'https://raw.githubusercontent.com/UAPrivacy/generators/master/src/data/cache-urls.json';
  const { data: cache, status } = await axios.get(url);
  if (status >= 400) {
    throw Error(`error status: ${status}`);
  }
  // TODO test
  if (cache.error) {
    throw Error(cache.error.message);
  }
  return cache;
}

const main = async url => selector(findURLs(url, await getCache()));

export default main;
