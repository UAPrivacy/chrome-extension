import axios from 'axios';
import { DIFFBOT_TOKEN } from 'secrets';

async function fetchPageDataDiffbot(url) {
  const endpoint = 'https://api.diffbot.com/v3/article';
  const { data, status } = await axios.get(endpoint, {
    params: {
      token: DIFFBOT_TOKEN,
      url,
    },
  });
  if (status >= 400) {
    throw Error(`status: ${status}`);
  }
  if (data.errorCode) {
    throw Error(data.error);
  }
  return data.objects;
}

const selectorDiffbot = data => data[0].text;

const fetchPageDataActive = fetchPageDataDiffbot;
const selector = selectorDiffbot;

function wrapper() {
  return function fetch(url) {
    return new Promise((resolve, reject) => {
      fetchPageDataActive(url).then(data => selector(data)).then(data => resolve(data)).catch(err => reject(err));
    });
  };
}

const fetchPageData = wrapper();
export default fetchPageData;
