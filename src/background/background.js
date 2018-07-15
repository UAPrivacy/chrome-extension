import {
    loadState,
    storeState
} from './storage'

const key = "data"
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.load) {
            loadState(key).then((data) => {
                sendResponse({
                    data
                })
                updateBadge(data.terms.length + data.privacies.length)
                console.log("fetched from storage and updated badge")
            }).catch(err => console.error(err))
        } else if (request.store) {
            storeState(key, request.data).then(msg => {
                sendResponse({
                    msg
                })
                const data = request.data;
                updateBadge(data.terms.length + data.privacies.length)
            }).catch(err => sendResponse({
                msg: err
            }))
        }
        return true;
    })


function updateBadge(count) {
    chrome.browserAction.setBadgeText({
        text: count.toString()
    });
}

// const QUOTA_BYTES_PER_ITEM = 8192;
// chrome.storage.onChanged.addListener(function (store, area) {
//     if (area === "sync") {
//         chrome.storage.sync.getBytesInUse(key, function (bytes) {
//             if (bytes > QUOTA_BYTES_PER_ITEM - QUOTA_BYTES_PER_ITEM / 64) {
//                 chrome.storage.sync.remove(key, function () {
//                     console.log(`storage cleared`);
//                 });
//             }
//             console.log(`bytes so far ${bytes}`);
//         });
//     }
// });