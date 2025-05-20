```js
async function test1() {
  console.log("test1 begin"); //2,进入test1函数，打印test1 begin
  const result = await test2(); //执行test2函数
  //在这个时候就需要注意了，在await后面的代码都是一个异步的代码，相当于放入了一个定时器，需要event loop监测到才会触发
  console.log("result", result); //5,然后再执行这个打印，因为test2返回的值是undefined，所以result也是undefined
  console.log("test1 end"); //6.最后打印这个结果
}

async function test2() {
  console.log("test2"); //3,进入test2函数，打印test2
}

console.log("script begin"); //1,同步代码，首先执行，毋庸置疑
test1(); //然后执行test1函数
console.log("script end"); //4,先执行同步代码
```
