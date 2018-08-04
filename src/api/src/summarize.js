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
    const typedArray = [text.split('')];
    const blob = new Blob([typedArray], { type: 'application/octet-stream' });
    const blobURL = URL.createObjectURL(blob);

    reqInstance = axios.create(
      Object.assign(
        config, {
          method: 'post',
          data: {
            text,
          },
          params: {
            ...config.params,
            fileName: blobURL,
          },
          headers: {
            ' Content-Type': 'application/octet-stream',
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
      headers: {
        ' Content-Type': 'application/json',
      },
    }));
  }
  const { data } = await reqInstance.request();
  return data;
}

const selectorTextSummarization = data => data.sentences;
const selectorSummarizeBot = data => data[0].summary;

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
