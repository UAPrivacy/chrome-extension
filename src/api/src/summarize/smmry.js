import axios from "axios";
import { SMMRY } from "secrets";
import { createQueryString } from "../../../shared";

const ENDPOINT_URL = "http://api.smmry.com";

async function summarize(url) {
  const options = {
    SM_API_KEY: SMMRY,
    SM_URL: url
  };
  const { data, status } = await axios.post(
    `${ENDPOINT_URL}?${createQueryString(options)}`
  );
  if (status >= 400) throw Error(`error fetching summaries: ${status}`);
  return data;
}

function selector(data) {
  let result;
  try {
    result = data.sm_api_content.split(". ");
  } catch (error) {
    result = [];
  }
  return result;
}

export default {
  summarize,
  selector
};
