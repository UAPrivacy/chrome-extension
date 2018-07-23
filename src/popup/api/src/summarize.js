import { post } from 'unirest';
import { TEXTSUMMARIZATION_TOKEN } from 'secrets';
import { urls, writeToJSON } from './utils';

function getSummaryTextSummarization({
    text = '',
    url = '',
    sentnum = 20,
}) {
    return new Promise((resolve, reject) => {
        try {
            post('https://textanalysis-text-summarization.p.mashape.com/text-summarizer')
                .header('X-Mashape-Key', TEXTSUMMARIZATION_TOKEN)
                .header('Content-Type', 'application/json')
                .header('Accept', 'application/json')
                .send({
                    url,
                    text,
                    sentnum,
                })
                .end((result) => {
                    resolve(result.body);
                });
        } catch (error) {
            reject(error);
        }
    });
}

const selectorTextSummarization = data => data.sentences;

const getSummaryActive = getSummaryTextSummarization;
const selector = selectorTextSummarization;

function wrapper() {
    return function summarize(params) {
        return new Promise((resolve, reject) => {
            getSummaryActive(params).then(data => selector(data)).then(data => resolve(data)).catch(err => reject(err));
        });
    };
}

const getSummary = wrapper();
export default getSummary;

function test() {
    Object.entries(urls()).forEach(([key, url]) => {
        getSummaryTextSummarization({
            url,
        }).then((result) => {
            writeToJSON(`${key}-summary.json`, result);
        }).catch((err) => {
            console.error(err);
        });
    });
}
