export function loadState(key) {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get([key], function (data) {
            if (data && data[key]) {
                const result = data[key];
                resolve(JSON.parse(result));
            } else {
                reject("could not load data from storage");
            }
        });
    });
}

export function storeState(key, data) {
    return new Promise(function (resolve, reject) {
        try {
            const stringValue = JSON.stringify(data);
            chrome.storage.sync.set({
                    [key]: stringValue
                },
                function () {
                    resolve(`saved items in storage`);
                }
            );
        } catch (error) {
            reject("error storing items in storage");
        }
    });
}