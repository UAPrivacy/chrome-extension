import axios from "axios";
import { findBestMatch as _findBestMatch } from "string-similarity";
import { isObjectEmpty, CATEGORIES } from "../../../shared";

function selector(cache) {
  const results = {};
  CATEGORIES.forEach(category => {
    const urls = cache[category];
    if (urls) results[category] = urls;
  });
  if (isObjectEmpty(results)) throw Error(`categories not found`);
  return results;
}

function findBestMatch(keys, name) {
  return _findBestMatch(name, keys).bestMatch.target;
}

function findURLs(url, cache) {
  const key = findBestMatch(Object.keys(cache), url);
  if (key) return cache[key];
  else throw Error(`url not found: ${url}`);
}

async function getCache() {
  const url =
    "https://raw.githubusercontent.com/UAPrivacy/APIs/master/src/dataURLs/cacheURLs.json";
  const { data: cache, status } = await axios.get(url);
  if (status >= 400) throw Error(`error getting urls cache: ${status}`);
  return cache;
}

const main = async url => selector(findURLs(url, await getCache()));

export default main;
