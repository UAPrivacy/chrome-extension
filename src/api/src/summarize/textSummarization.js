import { TEXTSUMMARIZATION } from 'secrets';
import axios from 'axios';

async function summarize({ text = '', url = '', sentnum = 10 }) {
  const { status, data } = await axios.post(
    'https://textanalysis-text-summarization.p.mashape.com/text-summarizer',
    {
      url,
      text,
      sentnum
    },
    {
      headers: {
        'X-Mashape-Key': TEXTSUMMARIZATION,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  );
  if (status >= 400) {
    throw Error(`status: ${status}`);
  }
  return data;
}

const selector = data => data.sentences;

export default {
  summarize,
  selector
};
