import findURLs from "./getLinks";

async function getURLs(url) {
  const results = await findURLs(url);
  return results;
}

export default getURLs;
