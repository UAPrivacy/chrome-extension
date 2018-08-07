import fetchFromStore from '../api';
import { getCurrentURL as getURL } from '../shared';

function getCount(data) {
  let count;
  try {
    count = getLength(data);
  } catch (error) {
    count = 0;
  }
  return count.toString();
}

const getLength = ({ terms, privacies }) => terms.length + privacies.length;

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
  storeState({
    key: url,
    value: data
  })
    .then(msg => {
      console.log(msg);
      updateBadge(getCount(data));
    })
    .catch(err => console.error(err));
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
    storeThenUpdateBadge(request.store, request.value);
  } else if (request.prefetch) {
    console.log('prefetch requested...');
    return getURL()
      .then(url => {
        return loadState(url)
          .then(data => {
            console.log('prefetch cancelled');
            return updateBadge(getCount(data));
          })
          .catch(() => {
            fetchFromStore(url)
              .then(data => {
                return storeThenUpdateBadge(url, data);
              })
              .catch(error => console.error(`error prefetching: ${error}`));
          });
      })
      .catch(err => {
        console.error(`could not get URL: ${err}`);
      });
  }
  return true;
});
