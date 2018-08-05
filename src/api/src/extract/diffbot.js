import axios from 'axios';
import { DIFFBOT } from 'secrets';

async function extract(url) {
  const endpoint = 'https://api.diffbot.com/v3/article';
  const { data, status } = await axios.get(endpoint, {
    params: {
      token: DIFFBOT,
      url,
    },
  });
  if (status >= 400) {
    throw Error(`status: ${status}`);
  }
  if (data.errorCode) {
    throw Error(data.error);
  }
  return data.objects;
}

const selector = data => data[0].text;

export default {
  selector,
  extract,
};
