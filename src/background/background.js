function loadState(key) {
  return new Promise((resolve) => {
    chrome.storage.sync.get([key], (data) => {
      if (data && data[key]) {
        const result = data[key];
        resolve(JSON.parse(result));
      }
    });
  });
}

function updateBadge(text) {
  chrome.browserAction.setBadgeText({
    text,
  });
}

function getCountString(data) {
  let count;
  try {
    count = data.terms.length + data.privacies.length;
  } catch (error) {
    count = 0;
  }
  return count.toString();
}

function storeState({ key, value }) {
  return new Promise((resolve, reject) => {
    try {
      const stringValue = JSON.stringify(value);
      chrome.storage.sync.set({
        [key]: stringValue,
      },
      () => {
        resolve(`succesfuly saved ${getCountString(value)} items`);
      });
    } catch (error) {
      reject(error);
    }
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
      });
    } else if (request.store) {
      const data = request.value;
      storeState({ key: request.store, value: data }).then((msg) => {
        console.log(msg);
        updateBadge(getCountString(data));
      }).catch(err => console.error(err));
    }
    return true;
  },
);

