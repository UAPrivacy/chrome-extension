chrome.runtime.onMessage.addListener(request => {
  if (request.badge)
    chrome.browserAction.setBadgeText({
      text: request.badge.toString()
    });
});
