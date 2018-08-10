import { SMMRY } from 'secrets';
import axios from 'axios';

const SENTNUM = 10;

async function summarize(url) {
  const endpoint = ' https://api.smmry.com';
  const { data, status } = await axios.get(endpoint, {
    params: {
      SM_API_KEY: SMMRY,
      SM_URL: url,
      SM_LENGTH: SENTNUM,
      SM_KEYWORD_COUNT: 10,
      SM_WITH_BREAK: true,
      SM_WITH_ENCODE: true,
      SM_IGNORE_LENGTH: true,
      SM_QUOTE_AVOID: true,
      SM_QUESTION_AVOID: true,
      SM_EXCLAMATION_AVOID: true
    }
  });
  console.log(data, status);
}

const selector = data => {};
export { summarize, selector };
