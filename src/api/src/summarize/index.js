import summarizeBot from "./summarizeBot";
import textSummarization from "./textSummarization";

const summarizer = textSummarization;

function main() {
  return function getSummaries(url) {
    const { summarize, selector } = summarizer;
    return new Promise((resolve, reject) => {
      summarize(url)
        .then(data => resolve(selector(data)))
        .catch(err => reject(err));
    });
  };
}

export default main();
