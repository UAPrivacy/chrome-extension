import { ALGORITHMIA } from 'secrets';
import axios from 'axios';
import { isEmptyObj } from '../../../shared';

function checkURLs(url) {
  const terms = /terms|agreement/gi;
  const tos = /\/tos/gi;
  const privacies = /privacy/gi;

  if (terms.test(url) || tos.test(url)) {
    return 'terms';
  }
  if (privacies.test(url)) {
    return 'privacies';
  }
}

async function getURLs(url) {
  const endpoint = 'https://api.algorithmia.com/v1/algo/web/GetLinks/0.1.5';

  const { data, status } = await axios.post(
    endpoint,
    {
      url
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${ALGORITHMIA}`,
        Accept: 'application/json'
      },
      auth: {
        username: 'samiezkay',
        password: ALGORITHMIA
      }
    }
  );
  console.log(status, data);
  if (status >= 400) {
    throw Error(`status: ${status}`);
  }
  return data;
}

async function findURLs(url) {
  const urls = await getURLs(url);
  if (urls && urls.length > 0) {
    const categories = ['privacies', 'terms'];
    const results = {};
    for (const u of urls) {
      if (Object.keys(results).every(key => categories.includes(key))) {
        return results;
      }
      const category = checkURLs(u);
      if (category) {
        results[category] = u;
      }
    }

    if (isEmptyObj(results)) {
      throw Error`${url} could not find categories`;
    }
  } else {
    throw Error`${url} could not find urls`;
  }
}
export default findURLs;
