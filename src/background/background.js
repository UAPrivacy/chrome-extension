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

const getLengthString = data => getLength(data).toString();

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
            resolve(`${key}: succesfuly saved ${getLengthString(value)} items`);
          }
        }
      );
    } else {
      reject(Error('nothing to save'));
    }
  });
}

function updateBadge(text) {
  return new Promise(resolve => {
    chrome.browserAction.setBadgeText(
      {
        text
      },
      () => {
        resolve();
      }
    );
  });
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.load) {
    let data;
    try {
      data = await loadState(request.load);
      await sendResponse({
        data
      });
      await updateBadge(getLengthString(data));
    } catch (e) {
      // console.error(`error loading: ${e}`);
    }
  } else if (request.store) {
    const { store: key, value } = request;
    try {
      await storeState({
        key,
        value
      });
      await updateBadge(getLengthString(value));
    } catch (e) {
      // console.error(`error storing: ${e}`);
    }
  } else if (request.prefetch) {
    let key;
    let value;
    try {
      key = await getURL();
      value = await loadState(key);
      // console.log('prefetch cancelled');
    } catch (error) {
      // console.error(`error prefetching: ${error}`);
      if (key) {
        try {
          value = await fetchSummaries(key);
          await storeState({
            key,
            value
          });
        } catch (error) {
          // console.error(`error prefetching: ${error}`);
        }
      }
    } finally {
      await updateBadge(getLengthString(value));
    }
  }
  return true;
});
