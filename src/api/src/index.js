import getPages from './urls';
import fetchPageData from './fetch';
import summarize from './summarize';

async function updateStore(name) {
  const results = {};
  const pagesToFetch = await getPages(name);
  if (!isEmptyObj(pagesToFetch)) {
    // TODO try url params?
    for (const [key, url] of Object.entries(pagesToFetch)) {
      const pageText = await fetchPageData(url);
      const summaries = await summarize({
        text: pageText,
      });
      // const summaries = await summarize({
      //   url,
      // });
      results[key] = summaries;
    }
    return results;
  }
  throw Error(`${name}: page info not found`);
}

const isEmptyObj = obj => Object.keys(obj).length === 0 && obj.constructor === Object;

export default updateStore;
