import pagesData from './static.json';

const attributes = [
  'privacies',
  'terms',
];

function getSelectPages(data) {
  console.log(data);
  const pages = {};
  attributes.forEach((attr) => {
    pages[attr] = data[attr];
  });
  return pages;
}

const fetchPages = url => Object.keys(pagesData).find(key => url.includes(key));

const getPages = name => getSelectPages(fetchPages(name));
export default getPages;
