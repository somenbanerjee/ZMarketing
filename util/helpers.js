exports.singleObject = function (arr) {
  let finalObj = {};
  for (let i = 0; i < arr.length; i++) {
    Object.assign(finalObj, arr[i]);
  }
  return finalObj;
};
