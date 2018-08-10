import { MASHAPE } from 'secrets';
import axios from 'axios';

const NO_OF_SENTENCES = 8;

async function summarize(url) {
  const { status, data } = await axios.post(
    'https://meaningcloud-summarization-v1.p.mashape.com/summarization-1.0',
    {
      url,
      sentnum: NO_OF_SENTENCES
    },
    {
      headers: {
        'X-Mashape-Key': MASHAPE,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  );
  if (status >= 400) {
    throw Error(`status: ${status}`);
  }
  if (data.error) {
    throw Error(data.error.message);
  }
  return data;
}

const selector = data => data.sentences;

export default {
  summarize,
  selector
};
