import { ALGORITHMIA } from 'secrets';
import axios from 'axios';
import { isEmptyObj } from '../../../shared';

function getCategory(url) {
  const isTerms = /terms|\/tos/gi;
  const isNotTerms = /&search|\/search/gi;
  const isUserAgreement = /agreement/gi;
  const isPrivacies = /privacy/gi;
  if ((isTerms.test(url) || isUserAgreement.test(url)) && !isNotTerms(url)) {
    return 'terms';
  }
  if (isPrivacies.test(url)) {
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
  const results = {};
  for (const url of urls) {
    const category = getCategory(url);
    if (category) results[category] = url;
  }
  if (isEmptyObj(results)) throw Error(`${URL} categories not found`);
  return results;
}
async function findURLsCategory(url, category) {
  const results = await findURLs(url);
  return results && results[category]
    ? {
        [category]: results[category]
      }
    : null;
}
export { findURLsCategory, findURLs as default };
