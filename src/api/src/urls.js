import axios from 'axios';

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

async function getPages(name) {
  try {
    const url = 'https://raw.githubusercontent.com/UAPrivacy/server/master/src/routes/data/index.new.json';
    const pagesData = await axios.get(url).then(res => res.data);
    return getSelectPages(fetchPages(name, pagesData));
  } catch (error) {
    return error;
  }
}
export default getPages;
