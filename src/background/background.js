import fetchSummaries from "../api";
import { getCurrentURL as getURL } from "../shared";

// TODO refactor to more pure ?
const getLength = ({ terms, privacies } = {}) => {
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
      if (data && data[key]) {
        resolve(JSON.parse(data[key]));
      } else {
        reject(Error("unable to fetch from storage"));
      }
    });
  });
}

function storeState({ key, value }) {
  return new Promise((resolve, reject) => {
    if (getLength(value) > 0) {
      chrome.storage.sync.set(
        {
          [key]: JSON.stringify(value)
        },
        () => {
          if (chrome.runtime.lastError) {
            reject(Error(chrome.runtime.lastError));
          } else {
            resolve(`${getLengthString(value)} items saved`);
          }
        }
      );
    } else {
      reject(Error("nothing to save"));
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

async function handleLoadRequest(request, sendResponse) {
  let data;
  try {
    data = await loadState(request.load);
    await sendResponse({
      data
    });
    await updateBadge(getLengthString(data));
  } catch (e) {
    console.error(`error loading: ${e}`);
  }
}

async function handleStoreRequest(request) {
  const { store: key, value } = request;
  try {
    await storeState({
      key,
      value
    });
    await updateBadge(getLengthString(value));
  } catch (e) {
    console.error(`error storing: ${e}`);
  }
}

async function handlePrefetchRequest() {
  let key, value;
  try {
    key = await getURL();
    value = await loadState(key);
    console.log("prefetch has been cancelled");
  } catch (error) {
    console.error(`error prefetching: ${error}`);
    if (key) {
      try {
        value = await fetchSummaries(key);
        // await storeState({
        //   key,
        //   value
        // });
      } catch (error) {
        console.error(`error prefetching: ${error}`);
      }
    } else {
      console.error("could not even get the url key");
    }
  } finally {
    await updateBadge(getLengthString(value));
  }
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.load) {
    await handleLoadRequest(request, sendResponse);
  } else if (request.store) {
    await handleStoreRequest(request);
  } else if (request.prefetch) {
    await handlePrefetchRequest();
  }
  return true;
});
