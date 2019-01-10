import axios from "axios";
import getURLs from "./src/urls";
import getSummaries from "./src/summarize";
import { isObjectEmpty } from "../shared";

function startLogging() {
  axios.interceptors.request.use(request => {
    console.log("Starting Request", request);
    return request;
  });
  axios.interceptors.response.use(response => {
    console.log("Response:", response.data);
    return response;
  });
}

async function main(URL) {
  startLogging();
  const results = {
    terms: [],
    privacies: []
  };
  const urls = await getURLs(URL);
  if (!isObjectEmpty(urls)) {
    const summaries = await Promise.all(
      Object.values(urls).map(url => getSummaries(url))
    );
    Object.keys(urls).forEach(
      (category, idx) => (results[category] = summaries[idx])
    );
  }
  return results;
}

export default main;
