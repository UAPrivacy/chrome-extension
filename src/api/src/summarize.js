import { TEXTSUMMARIZATION, SUMMARIZEBOT } from 'secrets';
import axios from 'axios';

async function textSummarization({
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
          'X-Mashape-Key': TEXTSUMMARIZATION,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    return error;
  }
}

async function summarizeBot({
  url,
  text,
}) {
  const endpoint = ' https://www.summarizebot.com/api/summarize';
  let reqInstance;

  const config = {
    url: endpoint,
    params: {
      apiKey: SUMMARIZEBOT,
      size: 10,
      keywords: 10,
      fragments: 10,
      language: 'English',
    },
  };

  if (text) {
    reqInstance = axios.create(
      Object.assign(
        config, {
          method: 'post',
          data: {
            text,
          },
          params: {
            ...config.params,
          },
        },
      ),
    );
  } else {
    reqInstance = axios.create(Object.assign(config, {
      method: 'get',
      params: {
        ...config.params,
        url,
      },
    }));
  }
  reqInstance.request().then((res) => {
    console.log(res);
  });
}

const selectorTextSummarization = data => data.sentences;

const getSummaryActive = textSummarization;
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
