chrome.tabs.query(
  {
    active: true,
    lastFocusedWindow: true,
  },
  (tabs) => {
    const [{ url }] = tabs;
    chrome.runtime.sendMessage({ prefetch: url });
  },
);
