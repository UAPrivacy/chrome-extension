import { MASHAPE } from 'secrets';
import axios from 'axios';

const NO_OF_SENTENCES = 8;

async function summarize(url) {
  const { status, data } = await axios.post(
    'https://textanalysis-text-summarization.p.mashape.com/text-summarizer-url',
    {
      url,
      sentnum: NO_OF_SENTENCES
    },
    {
      headers: {
        'X-Mashape-Key': MASHAPE,
        Accept: 'application/json'
      }
    }
  );
  if (status >= 400) {
    throw Error(`status: ${status}`);
  }
  // TODO test
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
