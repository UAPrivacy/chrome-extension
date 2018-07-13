function performUpdateBadge(count) {
    chrome.browserAction.setBadgeText({
        text: count.toString()
    });
}

const QUOTA_BYTES_PER_ITEM = 8192;
const storeName = "uaprivacy"

chrome.storage.onChanged.addListener(function (store, area) {
    if (area === "sync") {
        chrome.storage.sync.getBytesInUse(storeName, function (bytes) {
            if (bytes > QUOTA_BYTES_PER_ITEM - QUOTA_BYTES_PER_ITEM / 64) {
                chrome.storage.sync.remove(storeName, function () {
                    console.log(`storage cleared`);
                });
            }
            console.log(`bytes so far ${bytes}`);
        });
    }
});