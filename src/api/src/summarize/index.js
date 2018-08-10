import summarizeBot from './summarizeBot';
import textSummarization from './textSummarization';
import smmry from './smmry';

const summarizer = summarizeBot;

function wrapper() {
  return function main(url) {
    const { summarize, selector } = summarizer;
    return new Promise((resolve, reject) => {
      summarize(url)
        .then(data => resolve(selector(data)))
        .catch(err => reject(err));
    });
  };
}

export default wrapper();
