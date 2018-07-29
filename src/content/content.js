function main() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      const [{ url }] = tabs;
      console.log('here');
      chrome.runtime.sendMessage({ prefetch: url });
    },
  );
}

window.addEventListener('load', main, false);
