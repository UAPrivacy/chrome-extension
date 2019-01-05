import axios from "axios";
import { MASHAPE } from "secrets";
import { createQueryString } from "../../shared";

const NUM_SENTENCES = 5;

async function fetchSummaries(url) {
  const options = {
    sentences: NUM_SENTENCES,
    url
  };
  const { data: summary } = await axios.get(
    `https://meaningcloud-summarization-v1.p.mashape.com/summarization-1.0?${createQueryString(
      options
    )}`,
    {
      headers: {
        "X-Mashape-Key": MASHAPE,
        Accept: "application/json"
      }
    }
  );
  return summary.split(". ");
}

export default fetchSummaries;
