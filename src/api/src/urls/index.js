import github from './github';
import algorithmia from './algorithmia';

async function urlsGetter(url) {
  let results;
  try {
    results = await github(url);
    console.log(`successfully fetched from github`);
  } catch (e) {
    results = await algorithmia(url);
    console.log(`successfully fetched from algorithmia`);
  }
  return results;
}

export default urlsGetter;
