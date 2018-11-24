import smmry from "./smmry";
import summarization from "./summarization";

const APIs = [smmry, summarization];
const summarizer = APIs[Math.floor(Math.random() * APIs.length)];

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
