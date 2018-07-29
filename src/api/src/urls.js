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

function fetchPages(url, pagesData) {
  const key = Object.keys(pagesData).find(k => url.includes(k));
  let data = {};
  if (key) {
    data = pagesData[key];
  }
  return data;
}

async function getPages(name) {
  try {
    const url = 'https://raw.githubusercontent.com/UAPrivacy/server/master/src/routes/data/index.json';
    const pagesData = await axios.get(url).then(res => res.data);
    return getSelectPages(fetchPages(name, pagesData));
  } catch (error) {
    return error;
  }
}
export default getPages;
