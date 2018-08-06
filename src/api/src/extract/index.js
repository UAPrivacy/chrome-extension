import diffbot from './diffbot';

const extractor = diffbot;

function wrapper() {
  return function main(url) {
    const { extract, selector } = extractor;
    return new Promise((resolve, reject) => {
      extract(url)
        .then(data => selector(data))
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  };
}

export default wrapper();
