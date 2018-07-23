import { existsSync, mkdirSync, writeFile } from 'fs';
import { join } from 'path';
import pages from './data/pages.json';

function getCommonURLS() {
    return {
        facebook: pages.facebook.terms,
        google: pages.google.terms,
        twitter: pages.twitter.terms,
    };
}

const fetchAllNames = () => [
    'facebook',
    'twitter',
    'google',
];

function writeToJSON(fileName, data) {
    const dir = join(__dirname, 'tmp');
    if (!existsSync(dir)) {
        mkdirSync(dir);
    }
    const dataToWrite = JSON.stringify(data);
    writeFile(join(dir, fileName), dataToWrite, () => {
        console.log(`wrote ${fileName}`);
    });
}

export {
    getCommonURLS as urls,
    writeToJSON,
    fetchAllNames,
};
