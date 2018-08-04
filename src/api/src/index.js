import getPages from './urls';
import fetchPageData from './fetch';
import summarize from './summarize';

async function updateStore(name) {
  const results = {};
  try {
    const pagesToFetch = await getPages(name);
    console.log(pagesToFetch);
    for (const [key, url] of Object.entries(pagesToFetch)) {
      const summaries = await fetchPageData(url).then(textData => summarize({
        text: textData,
      }));
      results[key] = summaries;
    }
    console.log(results);
    return results;
  } catch (e) {
    return e;
  }
}

export default updateStore;
