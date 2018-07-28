import getPages from './urls';
import fetchPageData from './fetch';
import summarize from './summarize';

async function updateStore(name) {
  const results = {};
  try {
    const pagesToFetch = getPages(name);
    for (const [key, url] of Object.entries(pagesToFetch)) {
      const summaries = await fetchPageData(url).then(textData => summarize({
        text: textData,
      }));
      results[key] = summaries;
    }
    return results;
  } catch (e) {
    return e;
  }
}

function updateStoreConcurrent(name) {
  return new Promise((resolve, reject) => {
    const results = {};
    try {
      const pagesToFetch = getPages(name);
      const [keys, values] = Object.entries(pagesToFetch);
      const promises = [];
      let summariesPromise;
      values.forEach((url) => {
        summariesPromise = fetchPageData(url).then(textData => summarize({
          text: textData,
        }));
        promises.push(summariesPromise);
      });
      Promise.all(promises).then((summariesCategories) => {
        summariesCategories.forEach((summaries, idx) => {
          results[keys[idx]] = summaries;
        });
        resolve(results);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export default updateStore;
