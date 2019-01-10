import axios from "axios";
import { BING } from "secrets";

const convert = url => {
  const pieces = url.split(".");
  const name = pieces[pieces.length - 2];
  return name;
};

async function fetch(url, terms = true) {
  const endpoint = "https://api.cognitive.microsoft.com/bing/v7.0/search";
  const name = convert(url);
  const { data } = await axios.get(endpoint, {
    params: {
      q: `${name} ${terms ? "terms of service" : "privacy policy"}`
    },
    headers: {
      "Ocp-Apim-Subscription-Key": BING,
      mkt: "en-US",
      safeSearch: "strict"
    }
  });
  return data.webPages.value[0].url;
}

async function main(url) {
  const [terms, privacies] = await Promise.all([
    fetch(url, true),
    fetch(url, false)
  ]);
  return {
    terms,
    privacies
  };
}

export default main;
