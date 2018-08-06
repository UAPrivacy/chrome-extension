import axios from 'axios';

function selector(urlsObj) {
  const categories = ['privacies', 'terms'];
  const pages = {};
  categories.forEach(category => {
    if (urlsObj[category]) {
      pages[category] = [urlsObj[category]];
    }
  });
  return pages;
}

function findURLs(name, urlsObj) {
  const key = Object.keys(urlsObj).find(
    k => name.includes(k) || k.includes(name)
  );
  // console.log(`key: ${key} vs url: ${url}`); // missing key detector
  if (!key) {
    throw Error(`${name} entry not found`);
  }
  return urlsObj[key];
}

async function getURLs() {
  const url =
    'https://raw.githubusercontent.com/UAPrivacy/server/master/src/routes/data/index.new.json';
  const { data, status } = await axios.get(url);
  if (status >= 400) {
    throw Error(`status: ${status}`);
  }
  return data;
}

export default async name => selector(findURLs(name, await getURLs()));
