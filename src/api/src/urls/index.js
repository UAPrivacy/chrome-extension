import getPages from './github';

const attributes = [
  'privacies',
  'terms',
];

function getSelectPages(data) {
  const pages = {};
  attributes.forEach((attr) => {
    if (data[attr]) {
      pages[attr] = data[attr][0];
    }
  });
  return pages;
}

function fetchPages(url, pagesData) {
  const key = Object.keys(pagesData).find(k => url.includes(k) || k.includes(url));
  // console.log(`key: ${key} vs url: ${url}`); // missing key detector
  let data = {};
  if (key) {
    data = pagesData[key];
  }
  return data;
}

const main = name => getSelectPages(fetchPages(name, getPages()));
export default main;
