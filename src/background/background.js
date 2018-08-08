import fetchSummaries from '../api/src';
import { getCurrentURL as getURL } from '../shared';

const getLength = ({ terms, privacies }) => {
  let length = 0;
  if (terms) {
    length += terms.length;
  }
  if (privacies) {
    length += privacies.length;
  }
  return length;
};

const getCount = data => getLength(data).toString();

function loadState(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], data => {
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
    if (getLength(value) > 0) {
      const stringValue = JSON.stringify(value);
      chrome.storage.sync.set(
        {
          [key]: stringValue
        },
        () => {
          if (chrome.runtime.lastError) {
            reject(Error(chrome.runtime.lastError));
          } else {
            resolve(`${key}: succesfuly saved ${getCount(value)} items`);
          }
        }
      );
    } else {
      reject(Error('nothing to save'));
    }
  });
}

function updateBadge(text) {
  chrome.browserAction.setBadgeText({
    text
  });
}

function storeThenUpdateBadge(url, data) {
  return new Promise((resolve, reject) => {
    storeState({
      key: url,
      value: data
    })
      .then(msg => {
        updateBadge(getCount(data));
        resolve(msg);
      })
      .catch(err => reject(err));
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.load) {
    loadState(request.load)
      .then(data => {
        sendResponse({
          data
        });
        updateBadge(getCount(data));
      })
      .catch(err => console.error(err));
  } else if (request.store) {
    storeThenUpdateBadge(request.store, request.value)
      .then(msg => console.log(msg))
      .catch(err => console.error(err));
  } else if (request.prefetch) {
    getURL()
      .then(url => {
        loadState(url)
          .then(data => {
            console.log('prefetch cancelled');
            updateBadge(getCount(data));
          })
          .catch(() => {
            fetchSummaries(url)
              .then(data => {
                storeThenUpdateBadge(url, data)
                  .then(msg => console.log(msg))
                  .catch(err => console.error(`error prefetching: ${err}`));
              })
              .catch(err => console.error(`error prefetching: ${err}`));
          });
      })
      .catch(err => {
        console.error(`error prefetching: ${err}`);
      });
  }
  return true;
});
