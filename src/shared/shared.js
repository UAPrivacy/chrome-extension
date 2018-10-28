export const getHostname = url => new URL(url).hostname;

export function getCurrentURL() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true
      },
      tabs => {
        const [{ url }] = tabs;
        if (url) {
          resolve(getHostname(url));
        } else {
          reject(Error(`could not fetch current URL`));
        }
      }
    );
  });
}

export const isEmptyObj = obj =>
  !obj && Object.keys(obj).length === 0 && obj.constructor === Object;
