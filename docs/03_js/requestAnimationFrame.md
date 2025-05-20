> `requestAnimationFrame` 是一个浏览器 API，用于在浏览器下次重绘之前请求调用一个函数来更新动画。它提供了一种高效的方式来执行动画，避免了使用 `setInterval` 或 `setTimeout` 可能导致的性能问题。

#### 基本概念

- 动画帧： 浏览器屏幕会以一定的频率刷新，每次刷新称为一帧。通常情况下，浏览器的刷新率是 60Hz，即每秒刷新 60 次。
- 重绘： 当页面元素的外观发生改变时，浏览器需要重新渲染页面，这个过程称为重绘。
- 回调函数： `requestAnimationFrame` 接受一个回调函数作为参数，这个函数会在浏览器下次重绘之前被调用。

#### 工作原理

`requestAnimationFrame` 的工作原理是告诉浏览器：“我希望执行一个动画，请在下次重绘之前调用我的回调函数。” 浏览器会在合适的时机调用回调函数，通常与显示器的刷新率保持一致。这样可以确保动画的流畅性，并避免不必要的重绘。

##### 语法

```js
window.requestAnimationFrame(callback);
```

- `callback`：一个回调函数，会在浏览器下次重绘之前被调用。该回调函数接收一个 `DOMHighResTimeStamp` 参数，表示 `requestAnimationFrame` 开始执行的时间。

##### 返回值

`requestAnimationFrame` 返回一个请求 ID，可以用于取消动画：

```js
let animationId = window.requestAnimationFrame(callback);
window.cancelAnimationFrame(animationId);
```

##### 示例

```js
let element = document.getElementById("myElement");
let start = null;

function animate(timestamp) {
  if (!start) {
    start = timestamp;
  }
  let progress = timestamp - start;
  element.style.transform = `translateX(${progress / 10}px)`;
  if (progress < 2000) {
    window.requestAnimationFrame(animate);
  }
}

window.requestAnimationFrame(animate);
```

这个例子中，`animate` 函数会不断地更新元素的 `translateX` 属性，从而实现一个平移动画。`requestAnimationFrame` 确保动画在每次重绘之前更新，从而实现流畅的动画效果。

##### 优点

- 高效： `requestAnimationFrame` 由浏览器优化，可以更好地利用硬件资源，避免不必要的重绘。
- 流畅： `requestAnimationFrame` 的回调函数通常与显示器的刷新率保持一致，从而实现流畅的动画效果。
- 节能： 当页面不可见时，`requestAnimationFrame` 会自动停止，从而节省电能。

##### 与 `setInterval` 和 `setTimeout` 的比较

- `setInterval` 和 `setTimeout` 是基于时间的，它们的回调函数会在固定的时间间隔后执行。但是，由于浏览器的重绘时间是不确定的，因此使用 `setInterval` 或 `setTimeout` 可能导致动画卡顿或丢帧。

* `requestAnimationFrame` 是基于帧的，它的回调函数会在每次重绘之前执行。这样可以确保动画的流畅性，并避免不必要的重绘。

#### 总结

`requestAnimationFrame` 是一个强大的 API，用于创建高性能的 Web 动画。它提供了一种高效、流畅、节能的方式来执行动画，是 Web 动画开发的首选。
