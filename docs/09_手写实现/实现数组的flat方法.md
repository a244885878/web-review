下面提供一种基于递归的实现方式，同时详细解释其原理。

```js
if (!Array.prototype.myFlat) {
  Array.prototype.myFlat = function (depth = 1) {
    const result = [];

    // 定义递归函数 flatten
    function flatten(arr, currentDepth) {
      arr.forEach((item) => {
        // 如果当前元素是数组并且还可以继续展开
        if (Array.isArray(item) && currentDepth > 0) {
          flatten(item, currentDepth - 1);
        } else {
          result.push(item);
        }
      });
    }

    // 从调用的数组开始扁平化
    flatten(this, depth);
    return result;
  };
}
```

#### 实现原理解释

##### 1. 递归思想

代码中定义了一个名为 `flatten` 的递归函数，它的作用是遍历数组的每个元素。如果发现某个元素本身是一个数组且当前允许的展开深度（`currentDepth`）大于 0，则继续递归调用自身，并将深度减 1；否则，将该元素直接加入结果数组中。

##### 2. 深度控制

参数 `depth` 用于控制扁平化的层数。当传入的深度为 1 时，仅展开一层子数组；如果传入 Infinity，则表示需要完全展开所有嵌套的数组。每次递归调用时，通过 `currentDepth - 1` 来逐步降低允许的递归层数，确保在达到指定深度后不再继续递归。

##### 3. 数组遍历与结果收集

使用 `Array.prototype.forEach` 遍历当前数组中的所有元素，根据类型判断是否需要递归展开。所有最终的非数组元素都会被依次推入预先定义好的 `result` 数组，最后返回该结果。

##### 4. 对比内置 flat 方法

从 ES2019 开始，JavaScript 内置了 `Array.prototype.flat` 方法，其原理也是通过递归或栈迭代方式遍历数组并合并子数组。本例提供的 `myFlat` 就是一个自定义实现，效果和内置方法类似，可以根据传入的深度参数来控制扁平化的程度。

#### 使用示例

```js
const arr = [1, [2, [3, [4]]]];
console.log(arr.myFlat()); // 默认展开一层 => [1, 2, [3, [4]]]
console.log(arr.myFlat(2)); // 展开两层 => [1, 2, 3, [4]]
console.log(arr.myFlat(Infinity)); // 完全展开 => [1, 2, 3, 4]
```

#### 小结

- 递归遍历： 利用递归函数遍历数组及其嵌套的子数组。
- 深度控制： 通过传入的 `depth` 参数控制递归展开的层数。
- 结果合并： 每次遇到非数组元素时将其添加到结果数组中，最终返回合并后的新数组。
