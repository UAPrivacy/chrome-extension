import axios from "axios";
import { MASHAPE } from "secrets";
import { createQueryString } from "../../../shared";

const NUM_SENTENCES = 5;

async function summarize(url) {
  const options = {
    sentences: NUM_SENTENCES,
    url
  };
  const { data, status } = await axios.get(
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
  if (status >= 400) throw Error(`status: ${status}`);
  return data;
}

const selector = data => data.summary.split(". ");

export default {
  summarize,
  selector
};
