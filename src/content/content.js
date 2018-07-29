function main() {
  chrome.runtime.sendMessage({ prefetch: true });
}

window.addEventListener('load', main, false);
