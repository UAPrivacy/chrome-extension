import { ALGORITHMIA } from 'secrets';
import axios from 'axios';

async function summarize(url) {
  const { data, status } = await axios.post(
    'https://api.algorithmia.com/v1/algo/hotels/WebsiteSummary/0.1.4',
    {
      url
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${ALGORITHMIA}`,
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

const selector = data => data;

export default {
  summarize,
  selector
};
