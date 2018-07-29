import fetchFromStore from '../api';

function getCountString(data) {
  let count;
  try {
    count = data.terms.length + data.privacies.length;
  } catch (error) {
    count = 0;
  }
  return count.toString();
}

function loadState(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], (data) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else if (data && data[key]) {
        resolve(JSON.parse(data[key]));
      } else {
        reject(Error('could not fetch from storage'));
      }
    });
  });
}

function storeState({ key, value }) {
  return new Promise((resolve, reject) => {
    const stringValue = JSON.stringify(value);
    chrome.storage.sync.set({
      [key]: stringValue,
    },
    () => {
      if (chrome.runtime.lastError) {
        reject(Error(chrome.runtime.lastError));
      } else {
        resolve(`succesfuly saved ${getCountString(value)} items`);
      }
    });
  });
}

function updateBadge(text) {
  chrome.browserAction.setBadgeText({
    text,
  });
}

function storeAndUpdate(url, data) {
  storeState({
    key: url,
    value: data,
  }).then((msg) => {
    console.log(msg);
    updateBadge(getCountString(data));
  }).catch(err => console.error(err));
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.load) {
      loadState(request.load).then((data) => {
        sendResponse({
          data,
        });
        updateBadge(getCountString(data));
      }).catch(err => console.error(err));
    } else if (request.store) {
      storeAndUpdate(request.store, request.value);
    } else if (request.prefetch) {
      console.log('prefetch requested...');
      getURL().then(url => fetchFromStore(url)).then(data => storeAndUpdate(request.prefetch, data));
    }
    return true;
  },
);

function getURL() {
  return new Promise((resolve) => {
    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true,
      },
      (tabs) => {
        const [{ url }] = tabs;
        resolve(url);
      },
    );
  });
}

