export function loadState(key) {
  return new Promise(((resolve, reject) => {
    chrome.storage.sync.get([key], (data) => {
      if (data && data[key]) {
        const result = data[key];
        resolve(JSON.parse(result));
      } else {
        reject('could not load data from storage');
      }
    });
  }));
}

export function storeState({ key, value }) {
  return new Promise(((resolve, reject) => {
    try {
      const stringValue = JSON.stringify(value);
      chrome.storage.sync.set({
        [key]: stringValue,
      },
      () => {
        resolve('succesfuly saved items');
      });
    } catch (error) {
      reject(error);
    }
  }));
}
