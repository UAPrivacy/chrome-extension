import axios from "axios";
import getURLs from "./src/urls";
import summarize from "./src/summarize";
import { isObjectEmpty } from "../shared";

async function fetch(url) {
  const summaries = await summarize(url);
  if (!summaries || summaries.length === 0)
    throw Error(`unable to fetch summaries: ${url}`);
  return summaries;
}

async function fetchSummaries(URL) {
  const results = {};
  const urls = await getURLs(URL);
  if (!isObjectEmpty(urls)) {
    for (const [category, url] of Object.entries(urls))
      if (category && url) results[category] = await fetch(url);
    if (isObjectEmpty(results))
      throw Error(`no results after fetching: ${URL}`);
    return results;
  }
  throw Error(`urls not found`);
}

// start logging

axios.interceptors.request.use(request => {
  console.log("Starting Request", request);
  return request;
});

axios.interceptors.response.use(response => {
  console.log("Response:", response);
  return response;
});

// end logging

export default fetchSummaries;
