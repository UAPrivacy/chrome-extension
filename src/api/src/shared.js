const isEmptyObj = obj =>
  Object.keys(obj).length === 0 && obj.constructor === Object;
const emptyFunc = () => {};
export { isEmptyObj, emptyFunc };
