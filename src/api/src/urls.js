import axios from 'axios';

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

const getKey = (url, pagesData) => Object.keys(pagesData).find(key => url.includes(key));

function fetchPages(url, pagesData) {
  const key = getKey(url, pagesData);
  let data = {};
  if (key) {
    data = pagesData[key];
  }
  return data;
}

async function getPages(name) {
  const url = 'https://raw.githubusercontent.com/UAPrivacy/server/master/src/routes/data/index.json';
  const pagesData = await axios.get(url).then(res => res.data).catch((err) => {
    console.error(err);
    return {};
  });
  return getSelectPages(fetchPages(name, pagesData));
}
export default getPages;
