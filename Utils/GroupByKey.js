const GroupByKey = (array, key) => {
  return array.reduce((acc, cur) => {
    let myKey = cur[key];
    if (!acc[myKey]) {
      acc[myKey] = [];
    }
    acc[myKey].push(cur);
    return acc;
  }, {});

  // return array.reduce(function (rv, x) {
  //   (rv[x[key]] = rv[x[key]] || []).push(x);
  //   return rv;
  // }, {});

  // both works
};

export default GroupByKey;
