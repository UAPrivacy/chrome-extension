import { TEXTSUMMARIZATION_TOKEN } from 'secrets';
import axios from 'axios';

async function getSummaryTextSummarization({
  text = '',
  url = '',
  sentnum = 15,
}) {
  try {
    const response = await axios.post('https://textanalysis-text-summarization.p.mashape.com/text-summarizer',
      {
        url,
        text,
        sentnum,
      },
      {
        headers: {
          'X-Mashape-Key': TEXTSUMMARIZATION_TOKEN,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    return error;
  }
}

const selectorTextSummarization = data => data.sentences;

const getSummaryActive = getSummaryTextSummarization;
const selector = selectorTextSummarization;

function wrapper() {
  return function summarize(params) {
    return new Promise((resolve, reject) => {
      getSummaryActive(params).then(data => selector(data)).then(data => resolve(data)).catch(err => reject(err));
    });
  };
}

const getSummary = wrapper();
export default getSummary;
