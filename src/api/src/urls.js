import { ALGORITHMIA } from "secrets";
import axios from "axios";

function findCategory(url) {
  const isTerms = /terms|\/tos/gi;
  const isNotTerms = /&search|\/search/gi;
  const isUserAgreement = /agreement/gi;
  const isPrivacies = /privacy/gi;
  if ((isTerms.test(url) || isUserAgreement.test(url)) && !isNotTerms.test(url))
    return "terms";
  if (isPrivacies.test(url)) return "privacies";
  return null;
}

async function fetchURLs(url) {
  const endpoint = "https://api.algorithmia.com/v1/algo/web/GetLinks/0.1.5";
  const {
    data: { result }
  } = await axios.post(endpoint, url, {
    headers: {
      "Content-Type": "text/plain",
      Authorization: `Simple ${ALGORITHMIA}`
    }
  });
  return result;
}

async function searchURLs(url) {
  const results = {};
  const urls = await fetchURLs(url);
  if (urls)
    urls.forEach(u => {
      const category = findCategory(u);
      if (category)
        if (!results.hasOwnProperty(category)) results[category] = u;
    });
  return results;
}

export default searchURLs;
