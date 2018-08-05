import axios from 'axios';

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

async function getURLs() {
  const url = 'https://raw.githubusercontent.com/UAPrivacy/server/master/src/routes/data/index.new.json';
  const { data, status } = await axios.get(url);
  if (status >= 400) {
    throw Error(`status: ${status}`);
  }
  return data;
}

export default name => selector(findURLs(name, getURLs()));
