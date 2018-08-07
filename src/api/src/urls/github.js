import axios from 'axios';
import { isEmptyObj } from '../../../shared';

function selector(cacheObj) {
  const categories = ['privacies', 'terms'];
  const results = {};
  categories.forEach(category => {
    const urlsObj = cacheObj[category];
    if (urlsObj) {
      if (typeof urlsObj === 'string') {
        results[category] = urlsObj;
      }

      if (Array.isArray(urlsObj)) {
        results[category] = [urlsObj];
      }
    }
  });

  if (isEmptyObj(results)) throw Error`manual results not found`;
  return results;
}

const findKey = (possiblekeys, name) =>
  possiblekeys.find(k => name.includes(k) || k.includes(name));

function findURLs(url, cache) {
  const { auto, manual } = cache;
  let key;
  key = findKey(Object.keys(manual), url);

  if (key) {
    return manual[key];
  }

  key = findKey(Object.keys(auto), url);

  if (key) {
    return auto[key];
  }
  throw Error(`${url} entry not found`);
}

const getURL = url => axios.get(url);

function checkErrorStatus(status) {
  if (status >= 400) {
    throw Error(`status: ${status}`);
  }
  return true;
}

async function getCache() {
  const autoURL =
    'https://raw.githubusercontent.com/UAPrivacy/generators/master/src/data/cache-urls-auto.json';

  const manualURL =
    'https://raw.githubusercontent.com/UAPrivacy/generators/master/src/data/cache-urls-manual.json';

  const [manual, auto] = await Promise.all([
    getURL(autoURL),
    getURL(manualURL)
  ]);

  const cache = {};

  if (checkErrorStatus(manual.status)) {
    cache.manual = manual.data;
  }

  if (checkErrorStatus(auto.status)) {
    cache.auto = auto.data;
  }

  return cache;
}

export default async url => selector(findURLs(url, await getCache()));
