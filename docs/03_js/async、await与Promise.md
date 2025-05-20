```js
//1.执行async函数，返回的都是Promise对象

let a = async () => {
  return 1; //无论return什么，都是一个Promise对象，但是return的结果会影响[[PromiseResult]]
};
console.log(a()); //Promise {<fulfilled>: undefined}

//2.Promise.then的结果对应await
async function b() {
  const result = await a(); //会得到这个异步函数的返回值
  const result2 = await 3; //如果await一个基本数据，会内部执行 await Promise.resolve(3)
  console.log(result); //1
  console.log(result2); //3
}

b();

//3.Promise.catch异常情况 对于try...catch,也就是说 await 如果后面跟的是reject状态的Promise对象，则需要try..catch捕获异常

const p1 = Promise.reject("error");

async function c() {
  try {
    const result = await p1;
    console.log(result); //不会打印
  } catch (e) {
    console.log(e); //error
  }
}

c();
```
