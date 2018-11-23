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

  if (status >= 400) {
    throw Error(`status: ${status}`);
  }

  return data;
}

const selector = data => data.sm_api_content.split(". ");

export default {
  summarize,
  selector
};
