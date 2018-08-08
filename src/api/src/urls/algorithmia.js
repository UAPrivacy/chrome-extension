import { ALGORITHMIA } from 'secrets';
import axios from 'axios';
import { isEmptyObj } from '../../../shared';

function checkURLs(url) {
  const terms = /terms|\/tos/gi;
  const userAgreement = /user.*agreement/gi;
  const privacies = /privacy/gi;
  // const policy = /policy/gi;
  if (terms.test(url) || userAgreement.test(url)) {
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
  if (data.error) {
    throw Error(data.error.message);
  }
  if (status >= 400) {
    throw Error(`status: ${status}`);
  }
  return data.result;
}

async function findURLs(url) {
  const urls = await getURLs(url);
  // console.log(`no. of urls found: ${urls.length}`);
  if (urls && urls.length > 0) {
    const categories = ['privacies', 'terms'];
    const results = {};
    for (const u of urls) {
      if (Object.keys(results).length >= categories.length) {
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
    return results;
  } else {
    throw Error`${url} could not find urls`;
  }
}
export default findURLs;
