export function getCurrentURL() {
  return new Promise((resolve) => {
    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true,
      },
      (tabs) => {
        const [{ url }] = tabs;
        resolve(getHostname(url));
      },
    );
  });
}

function getHostname(url) {
  return new URL(url).hostname;
}
