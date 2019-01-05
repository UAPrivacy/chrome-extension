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
    console.log("Response:", response);
    return response;
  });
}

async function main(URL) {
  startLogging();
  const results = {};
  const urls = await getURLs(URL);
  if (!isObjectEmpty(urls))
    for (const [category, url] of Object.entries(urls))
      if (category && url) results[category] = await getSummaries(url);
  return results;
}

export default main;
