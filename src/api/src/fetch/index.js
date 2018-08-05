import diffbot from './diffbot';

const fetcher = diffbot;

function wrapper() {
  return function main(url) {
    const { fetch, selector } = fetcher;
    return new Promise((resolve, reject) => {
      fetch(url).then(data => selector(data)).then(data => resolve(data)).catch(err => reject(err));
    });
  };
}

export default wrapper();
