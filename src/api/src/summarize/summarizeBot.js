import { SUMMARIZEBOT } from 'secrets';
import axios from 'axios';

const PERCENTAGE = 12;
async function summarize(url) {
  const endpoint = 'https://www.summarizebot.com/api/summarize';
  const { data, status } = await axios.get(endpoint, {
    params: {
      apiKey: SUMMARIZEBOT,
      size: PERCENTAGE,
      keywords: 10,
      fragments: 10,
      language: 'English',
      url
    }
  });
  if (status >= 400) {
    throw Error(`status: ${status}`);
  }
  return data;
}

const selector = data => data[0].summary.map(obj => obj.sentence);

export default {
  summarize,
  selector
};
