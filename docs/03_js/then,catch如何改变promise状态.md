```js
/*
 *   then正常返回的时候，Promise的状态是 fulfilled，报错的时候，Promise的状态是 rejected
 *   catch正常返回的时候，Promise的状态是 fulfilled，报错的时候，Promise的状态是 rejected
 *
 *   fulfilled 状态的 Promise会执行then里的回调函数
 *   rejected 状态的 Promise会执行catch里的回调函数
 *
 * */

// 总结：无论是在Promise.then还是.catch，它们都返回值都是一个Promise对象，
// 只要回调函数中不出现报错，都是fulfilled状态，如果回调函数中出现报错，状态就会改为rejected

const p1 = Promise.resolve("p1 resolve");
const p1Then = p1.then((res) => {
  console.log(res);
  throw new Error("p1Then error");
});

console.log(p1Then); //[[PromiseState]]: "rejected"
```
