import { SUMMARIZEBOT } from 'secrets';
import axios from 'axios';

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
          // data: {
          //   text,
          // },
          params: {
            ...config.params,
            fileName: blobURL,
          },
          headers: {
            'Content-Type': 'application/octet-stream',
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
        'Content-Type': 'application/json',
      },
    }));
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

const selectorSummarizeBot = data => data[0].summary;

export default {
  summarize: selectorSummarizeBot,
  selector: summarizeBot,
};
