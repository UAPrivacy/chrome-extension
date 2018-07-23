import pagesData from './staticPages.json';

const attributes = [
    'privacies',
    'terms',
];

function getSelectPages(data) {
    const pages = {};
    attributes.forEach((attr) => {
        try {
            pages[attr] = data[attr];
        } catch (e) {
            console.log(e);
        }
    });
    return pages;
}

function fetchPages(name) {
    let data;
    try {
        data = pagesData[name];
    } catch (e) {
        data = {};
    }
    return data;
}

// TODO
function detect(url) {
    url.test(/privacy|terms/);
}

function content(params) {
    // find the main keywords
}
// TODO
function fetchSiteURLs(url) {
    console.log(url);
}

const getPages = name => getSelectPages(fetchPages(name), attributes);
export default getPages;

function test() {
    ['facebook', 'google', 'twitter'].forEach((url) => {
        console.log(getPages(url));
    });
}
