function updateBadge(count) {
  chrome.browserAction.setBadgeText({
    text: count.toString(),
  });
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.load) {
      loadState(request.load).then((data) => {
        sendResponse({
          data,
        });
        updateBadge(data.terms.length + data.privacies.length);
        console.log('fetched from storage and updated badge');
      }).catch(err => console.error(err));
    } else if (request.store) {
      const data = request.value;
      console.log(request);
      storeState({ key: request.store, value: data }).then((msg) => {
        sendResponse({
          msg,
        });
        updateBadge(data.terms.length + data.privacies.length);
      }).catch(err => sendResponse({
        msg: err,
      }));
    }
    return true;
  },
);

function loadState(key) {
  return new Promise(((resolve, reject) => {
    chrome.storage.sync.get([key], (data) => {
      if (data && data[key]) {
        const result = data[key];
        resolve(JSON.parse(result));
      } else {
        reject('could not load data from storage');
      }
    });
  }));
}

function storeState({ key, value }) {
  return new Promise(((resolve, reject) => {
    try {
      const stringValue = JSON.stringify(value);
      chrome.storage.sync.set({
        [key]: stringValue,
      },
      () => {
        resolve('succesfuly saved items');
      });
    } catch (error) {
      reject(error);
    }
  }));
}
