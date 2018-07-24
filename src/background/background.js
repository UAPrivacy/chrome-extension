import {
  loadState,
  storeState,
} from './storage';

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

// TODO validate
const QUOTA_BYTES_PER_ITEM = 8192;
chrome.storage.onChanged.addListener((store, area) => {
  if (area === 'sync') {
    chrome.storage.sync.getBytesInUse(key, (bytes) => {
      if (bytes > QUOTA_BYTES_PER_ITEM - QUOTA_BYTES_PER_ITEM / 64) {
        chrome.storage.sync.remove(key, () => {
          console.log('storage cleared');
        });
      }
      console.log(`bytes so far ${bytes}`);
    });
  }
});
