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
        const result = data[key];
        resolve(JSON.parse(result));
      } else {
        reject(Error('could not fetch from storage'));
      }
    });
  });
}

function storeState({ key, value }) {
  return new Promise((resolve, reject) => {
    try {
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
    } catch (error) {
      reject(error);
    }
  });
}

function updateBadge(text) {
  chrome.browserAction.setBadgeText({
    text,
  });
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
      const data = request.value;
      storeState({ key: request.store, value: data }).then((msg) => {
        console.log(msg);
        updateBadge(getCountString(data));
      }).catch(err => console.error(err));
    } else if (request.prefetch) {
      fetchData(request.prefetch);
    }
    return true;
  },
);

function fetchData(url) {
  fetchFromStore(url).then((data) => {
    storeState({
      key: url,
      value: data,
    });
  });
}

