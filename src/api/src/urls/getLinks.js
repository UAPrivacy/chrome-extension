import { ALGORITHMIA } from "secrets";
import axios from "axios";
import { isObjectEmpty } from "../../../shared";

function getCategory(url) {
  const isTerms = /terms|\/tos/gi;
  const isNotTerms = /&search|\/search/gi;
  const isUserAgreement = /agreement/gi;
  const isPrivacies = /privacy/gi;
  if (
    (isTerms.test(url) || isUserAgreement.test(url)) &&
    !isNotTerms.test(url)
  ) {
    return "terms";
  }
  if (isPrivacies.test(url)) {
    return "privacies";
  }
  return null;
}

async function fetchURLs(url) {
  const endpoint = "https://api.algorithmia.com/v1/algo/web/GetLinks/0.1.5";
  const { data, status } = await axios.post(endpoint, url, {
    headers: {
      "Content-Type": "text/plain",
      Authorization: `Simple ${ALGORITHMIA}`
    }
  });
  if (status >= 400) {
    throw Error(`error fetching urls: ${status}`);
  }
  return data.result;
}

async function findURLs(URL) {
  const urls = await fetchURLs(URL);
  const results = {};
  urls.forEach(url => {
    const category = getCategory(url);
    if (category) results[category] = url;
  });
  if (isObjectEmpty(results)) throw Error(`no categories found`);
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
