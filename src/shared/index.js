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
          reject(Error(`unable to get current url`));
        }
      }
    );
  });
}

export const createQueryString = params =>
  Object.keys(params)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
    .join("&");

export const isObjectEmpty = obj =>
  !obj && Object.keys(obj).length === 0 && obj.constructor === Object;

export const CATEGORIES = ["terms", "privacies"];
