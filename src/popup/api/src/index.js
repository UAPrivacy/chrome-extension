import getPages from './urls';
import fetchPageData from './fetch';
import summarize from './summarize';
import {
    writeToJSON,
    fetchAllNames
} from './utils';

async function updateStore(name) {
    const results = {};
    let summariesFromText;
    let summariesFromURLS;
    try {
        const pagesToFetch = getPages(name);
        for (const [key, url] of Object.entries(pagesToFetch)) {
            summariesFromText = await fetchPageData(url).then(textData => summarize({
                text: textData,
            }));
            summariesFromURLS = await summarize({
                url
            });
            results[key] = {
                summariesFromText,
                summariesFromURLS,
            };
        }
        return results;
    } catch (e) {
        return console.error(e);
    }
}

export default fetchFromStore;


function job() {
    for (const name of fetchAllNames()) {
        updateStore(name).then(data => writeToJSON(`${name}-job.json`, data)).catch(err => console.error(err));
    }
}

// job();