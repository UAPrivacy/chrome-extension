import fetchFromStore from './src';

async function fetchData(name) {
    let terms = [];
    let privacies = [];
    fetchFromStore(name).then((data) => {
        if (data) {
            const value = JSON.parse(data.value);
            privacies = value.privacies.summariesFromText;
            terms = value.terms.summariesFromText;
        }
    }).catch((err) => {
        console.error(err);
    });
    return {
        terms,
        privacies
    }
}

export default router;