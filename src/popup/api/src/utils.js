import pages from './static.json';

function getCommonURLS() {
  return {
    facebook: pages.facebook.terms,
    google: pages.google.terms,
    twitter: pages.twitter.terms,
  };
}

const fetchAllNames = () => [
  'facebook',
  'twitter',
  'google',
];

export {
  getCommonURLS as urls,
  fetchAllNames,
};
