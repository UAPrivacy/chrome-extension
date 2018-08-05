import getURLs from './github';

const categories = [
  'privacies',
  'terms',
];

function selector(urls) {
  const pages = {};
  categories.forEach((attr) => {
    if (urls[attr]) {
      pages[attr] = urls[attr][0];
    }
  });
  return pages;
}

function findURLs(url, urls) {
  const key = Object.keys(urls).find(k => url.includes(k) || k.includes(url));
  // console.log(`key: ${key} vs url: ${url}`); // missing key detector
  let data = {};
  if (key) {
    data = urls[key];
  }
  return data;
}

const main = name => selector(findURLs(name, getURLs()));
export default main;
