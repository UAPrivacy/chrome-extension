export function getHostname(url) {
  return new URL(url).hostname;
}
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

const isEmptyObj = obj =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object;

const emptyFunc = () => {};

export { isEmptyObj, emptyFunc };
