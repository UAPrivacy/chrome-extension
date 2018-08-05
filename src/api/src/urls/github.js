import axios from 'axios';

async function getPages() {
  const url = 'https://raw.githubusercontent.com/UAPrivacy/server/master/src/routes/data/index.new.json';
  const { data, status } = await axios.get(url);
  if (status >= 400) {
    throw Error(`status: ${status}`);
  }
  return data;
}

export default getPages;
