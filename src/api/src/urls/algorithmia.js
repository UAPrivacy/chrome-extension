const terms = /terms|agreement/gi;
const tos = /\/tos/gi;
const privacies = /privacy/gi;

const getHostName = url => new URL(url).hostname;

const updateResults = (data, url, key) => {
  const k = getHostName(url);
  if (data[k]) {
    if (data[k][key] && data[k][key].indexOf(url) === -1) {
      data[k][key].push(url);
    } else {
      Object.assign(data[k], {
        [key]: [url],
      });
    }
  } else {
    const entry = {
      [k]: {
        [key]: [url],
      },
    };
    Object.assign(data, entry);
  }
};

function checkLinks(data, url) {
  let updateOccurred = false;
  if (terms.test(url) || tos.test(url)) {
    updateResults(data, url, 'terms');
    updateOccurred = true;
  } if (privacies.test(url)) {
    updateOccurred = true;
    updateResults(data, url, 'privacies');
  }
  return updateOccurred;
}

function getLinks(url) {
  return new Promise((resolve) => {
    try {
      _client(ALGORITHMIA)
        .algo('web/GetLinks/0.1.5')
        .pipe(url)
        .then((response) => {
          resolve(response.result);
        });
    } catch (error) {
      console.error(`${url}: could not get links \n ${error}`);
      resolve([]);
    }
  });
}

async function update() {
  const checkLinksResults = {};
  const results = {};
  for (const { URL } of sites) {
    const links = await getLinks(URL);
    if (links && links.length > 0) {
      console.log(`${links.length} links were fetched from ${URL}`);
      links.forEach((link) => {
        checkLinksResults[link] = checkLinks(results, link);
      });
    }
  }
export default update;
