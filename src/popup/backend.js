chrome.tabs.query({
    'active': true,
    'lastFocusedWindow': true
}, function (tabs) {
    const url = tabs[0].url;
});