import axios from "axios";
import getURLs from "./src/urls";
import getSummaries from "./src/summarize";
import { isObjectEmpty } from "../shared";

const bytes = s => {
  return ~-encodeURI(s).split(/%..|./).length;
};

const jsonSize = s => {
  return bytes(JSON.stringify(s));
};

function startLogging() {
  axios.interceptors.request.use(request => {
    console.log("Starting Request", jsonSize(request), request);
    return request;
  });
  axios.interceptors.response.use(response => {
    console.log("Response:", jsonSize(response), response.data);
    return response;
  });
}

async function main(URL) {
  startLogging();
  const urls = await getURLs(URL);
  let summaries = [];
  if (!isObjectEmpty(urls))
    summaries = await Promise.all(urls.map(url => getSummaries(url)));
  return [urls, summaries];
}

export default main;
