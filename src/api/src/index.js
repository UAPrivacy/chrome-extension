import getPages from './urls';
import fetchPageData from './fetch';
import summarize from './summarize';

async function updateStore(name) {
  const results = {};
  try {
    const pagesToFetch = await getPages(name);
    if (!isEmptyObj) {
      // TODO try url params?
      for (const [key, url] of Object.entries(pagesToFetch)) {
        const summaries = await fetchPageData(url).then(textData => summarize({
          text: textData,
        })).catch((err) => {
          if (!(err instanceof Error)) {
            throw Error(err);
          }
          return err;
        });
        results[key] = summaries;
      }
      return results;
    }
    throw Error(`${name} page info not found`);
  } catch (e) {
    return e;
  }
}

const isEmptyObj = obj => Object.keys(obj).length === 0 && obj.constructor === Object;

export default updateStore;
