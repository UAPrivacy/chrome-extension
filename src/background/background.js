import {
    loadState,
    storeState
} from './storage'

const key = "data"

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.load) {
            loadState(key).then((data) => sendResponse({
                data
            })).catch(err => console.error(err))
        } else if (request.store) {
            storeState(key, request.data).then(msg => console.log(msg)).catch(err => console.error(err))
        }
    })