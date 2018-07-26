chrome.tabs.query(
  {
    active: true,
    lastFocusedWindow: true,
  },
  (tabs) => {
    const [{ url }] = tabs;
    console.log(`url: ${url}`);
    chrome.runtime.sendMessage({ load: url }, (response) => {
      console.log(`response ${response}`);
    });
  },
);

