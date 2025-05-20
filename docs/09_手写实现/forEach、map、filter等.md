```js
const arr = ["哈哈", "嘻嘻", "嘿嘿"];

Array.prototype.myForEach = function () {
  const callBack = Array.from(arguments)[0];
  for (let i = 0; i < this.length; i++) {
    callBack(this[i], i, this);
  }
};

Array.prototype.myMap = function () {
  const callBack = Array.from(arguments)[0];
  const resultArr = [];
  for (let i = 0; i < this.length; i++) {
    const result = callBack(this[i], i, this);
    resultArr.push(result);
  }
  return resultArr;
};

Array.prototype.myFilter = function () {
  const callBack = Array.from(arguments)[0];
  const resultArr = [];
  for (let i = 0; i < this.length; i++) {
    const result = callBack(this[i], i, this);
    if (result) {
      resultArr.push(this[i]);
    }
  }
  return resultArr;
};
```
