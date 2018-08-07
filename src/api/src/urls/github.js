import axios from 'axios';

function selector(cacheObj) {
  const categories = ['privacies', 'terms'];
  const pages = {};
  categories.forEach(category => {
    const urlsObj = cacheObj[category];
    if (urlsObj) {
      if (typeof urlsObj === 'string') {
        pages[category] = urlsObj;
      }

      if (Array.isArray(urlsObj)) {
        pages[category] = [urlsObj];
      }
    }
  });
  return pages;
}

const findKey = (possiblekeys, name) =>
  possiblekeys.find(k => name.includes(k) || k.includes(name));

function findURLs(name, cache) {
  const { auto, manual } = cache;
  let key;
  key = findKey(Object.keys(manual), name);

  if (!key) {
    key = findKey(Object.keys(auto), name);
  }
  // console.log(`key: ${key} vs url: ${url}`); // missing key detector
  if (!key) {
    throw Error(`${name} entry not found`);
  }
  return cache[key];
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

export default async name => selector(findURLs(name, await getCache()));
