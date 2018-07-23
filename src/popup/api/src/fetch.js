import xray from 'x-ray';
import axios from 'axios';
import { DIFFBOT_TOKEN } from 'secrets';
import { urls, writeToJSON } from './utils';

const newXray = xray();

function fetchPageDataXray(url) {
    return new Promise((resolve, reject) => {
        try {
            newXray(url, 'body', ['p'])((err, data) => {
                if (err) {
                    return resolve(err);
                }
                return resolve(data);
            });
        } catch (e) {
            reject(e);
        }
    });
}

const selectorXray = data => data.join(' ');

async function fetchPageDataDiffbot(url) {
    const endpoint = 'https://api.diffbot.com/v3/article';
    try {
        const results = await axios.get(endpoint, {
            params: {
                token: DIFFBOT_TOKEN,
                url,
            },
        });
        return results.data.objects;
    } catch (err) {
        return err;
    }
}

const selectorDiffbot = data => data[0].text;

const fetchPageDataActive = fetchPageDataDiffbot;
const selector = selectorDiffbot;

function wrapper() {
    return function fetch(url) {
        return new Promise((resolve, reject) => {
            fetchPageDataActive(url).then(data => selector(data)).then(data => resolve(data)).catch(err => reject(err));
        });
    };
}

const fetchPageData = wrapper();
export default fetchPageData;

function test() {
    Object.entries(urls()).forEach(([key, url]) => {
        fetchPageDataXray(url).then(data => writeToJSON(`${key}-xray.json`, data)).catch(err => console.error(err));
        fetchPageDataDiffbot(url).then(data => writeToJSON(`${key}-diffbot.json`, data)).catch(err => console.error(err));
    });
}
