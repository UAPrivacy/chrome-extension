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

function fetchPages(name) {
  let data;
  try {
    data = pagesData[name];
  } catch (e) {
    data = {};
  }
  return data;
}

const getPages = name => getSelectPages(fetchPages(name), attributes);
export default getPages;
