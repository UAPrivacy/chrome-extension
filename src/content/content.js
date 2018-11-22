window.addEventListener(
  "load",
  () => {
    chrome.runtime.sendMessage({
      prefetch: true
    });
  },
  false
);
