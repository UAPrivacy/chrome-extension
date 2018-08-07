import { ALGORITHMIA } from 'secrets';

const terms = /terms|agreement/gi;
const tos = /\/tos/gi;
const privacies = /privacy/gi;

function checkURLs(url) {
  if (terms.test(url) || tos.test(url)) {
    return 'terms';
  }
  if (privacies.test(url)) {
    return 'privacies';
  }
}

async function getLinks(url) {
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
      }
    }
  );
  if (status >= 400) {
    throw Error(`status: ${status}`);
  }
  if (data.error) {
    throw Error(data.error.message);
  }
  return data;
}

const isEmptyObj = obj =>
  Object.keys(obj).length === 0 && obj.constructor === Object;
async function findURLs(url) {
  const urls = await getLinks(url);
  if (urls && urls.length > 0) {
    const results = {};
    for (const u of urls) {
      if (results['terms'] && results['privacies']) {
        return results;
      }
      const category = checkURLs(u);
      if (category === 'terms') {
        results['terms'] = u;
      }
      if (category === 'privacies') {
        results['privacies'] = u;
      }
    }

    if (isEmptyObj(results)) {
      throw Error`${url} could not find categories`;
    }
  } else {
    throw Error`${url} could not find links`;
  }
}
export default findURLs;
