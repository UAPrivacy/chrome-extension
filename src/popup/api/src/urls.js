import pagesData from './static.json';

const attributes = [
  'privacies',
  'terms',
];

function getSelectPages(data) {
  const pages = {};
  attributes.forEach((attr) => {
    pages[attr] = data[attr];
  });
  return pages;
}

const getKey = url => Object.keys(pagesData).find(key => url.includes(key));

function fetchPages(url) {
  const key = getKey(url);
  let data = {};
  if (key) {
    data = pagesData[key];
  }
  return data;
}

const getPages = name => getSelectPages(fetchPages(name));
export default getPages;
