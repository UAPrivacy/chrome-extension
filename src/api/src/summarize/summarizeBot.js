import { SUMMARIZEBOT } from 'secrets';
import axios from 'axios';

async function summarize({ url, text }) {
  let reqInstance;
  const config = {
    url: 'https://www.summarizebot.com/api/summarize',
    params: {
      apiKey: SUMMARIZEBOT,
      size: 10,
      keywords: 10,
      fragments: 10,
      language: 'English'
    }
  };
  if (text) {
    const blob = new Blob([text], { type: 'application/octet-stream' });
    reqInstance = axios.create(
      Object.assign(config, {
        method: 'post',
        data: {
          fileName: blob
        },
        params: {
          ...config.params
        },
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      })
    );
  } else {
    reqInstance = axios.create(
      Object.assign(config, {
        method: 'get',
        params: {
          ...config.params,
          url
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
    );
  }
  const { data, status } = await reqInstance.request();

  if (status >= 400) {
    throw Error(`status: ${status}`);
  }
  if (data.error) {
    throw Error(data.error.message);
  }
  return data;
}

const selector = data => data[0].summary;

export default {
  summarize,
  selector
};
