import summarizeBot from './summarizeBot';
import textSummarization from './textSummarization';
import websiteSummary from './websiteSummary';

const summarizer = summarizeBot;

function wrapper() {
  return function main(params) {
    const { summarize, selector } = summarizer;
    return new Promise((resolve, reject) => {
      summarize(params)
        .then(data => resolve(selector(data)))
        .catch(err => reject(err));
    });
  };
}

export default wrapper();
