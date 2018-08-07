export function getCurrentURL() {
  return new Promise(resolve => {
    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true
      },
      tabs => {
        const [{ url }] = tabs;
        resolve(getHostname(url));
      }
    );
  });
}

export function getHostname(url) {
  return new URL(url).hostname;
}
