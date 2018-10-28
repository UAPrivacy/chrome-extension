import { ALGORITHMIA } from 'secrets';
import axios from 'axios';
import { isEmptyObj } from '../../../shared';

function checkURLs(url) {
  const terms = /terms|\/tos/gi;
  const notTerms = /&search|\/search/gi;
  const userAgreement = /agreement/gi;
  const privacies = /privacy/gi;
  // const policy = /policy/gi;
  if ((terms.test(url) || userAgreement.test(url)) && !notTerms(url)) {
    return 'terms';
  }
  if (privacies.test(url)) {
    return 'privacies';
  }
}

async function getURLs(url) {
  const endpoint = 'https://api.algorithmia.com/v1/algo/web/GetLinks/0.1.5';
  const { data, status } = await axios.post(endpoint, url, {
    headers: {
      'Content-Type': 'text/plain',
      Authorization: `Simple ${ALGORITHMIA}`
    }
  });
  // TODO test
  if (data.error) {
    throw Error(data.error.message);
  }
  if (status >= 400) {
    throw Error(`status: ${status}`);
  }
  return data.result;
}

async function findURLs(URL) {
  const urls = await getURLs(URL);
  if (urls && urls.length > 0) {
    const categories = ['privacies', 'terms'];
    const results = {};
    for (const url of urls) {
      const keys = Object.keys(results);
      if (keys.length >= categories.length) {
        return results;
      }
      const category = checkURLs(url);
      if (category) {
        results[category] = url;
      }
    }
    if (isEmptyObj(results)) {
      throw Error(`${URL} could not find categories`);
    }
    return results;
  } else {
    throw Error(`${URL} could not find urls`);
  }
}
async function findURLsWithKey(url, key) {
  const results = await findURLs(url);
  if (results[key])
    return {
      [key]: results[key]
    };
}
export { findURLsWithKey, findURLs as default };
