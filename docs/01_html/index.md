#### <!DOCTYPE>声明和严格模式

> `<!DOCTYPE>`声明必须是 HTML 文档的第一行，位于`<html>`标签之前。它不是 HTML 标签；他的作用是告诉浏览器的解析器用什么文档类型规范来解析这个文档。

> 严格模式是浏览器根据 web 标准去解析页面，是一种要求严格的 DTD，不允许使用任何表现层的语法；在混杂模式中，页面以宽松的向后兼容的方式展示。模拟老式浏览器的行为以防止站点无法工作。

#### src 和 href 的区别

1. **href：**
   > Hypertext Reference 的缩写，中文是超文本引用。指向一些网络资源，用来建立和当前文档或 者元素的链接关系。在加载该资源时，不会阻塞当前文档的处理。在 a,link 标签常用。当浏览器加载到 link 标签时，会识别这是 CSS 文档，并行下载该 CSS 文档，但并不会停止对当前页面后续内容的加载。这也是不建议使用@import 加载 CSS 的原因。
2. **src：**
   > source 的缩写。表示对资源的引用，指向的内容会用来嵌入到其所在的标签，也就是替换元素。由于 src 的内容是页面必不可少的一部分，因此浏览器在解析 src 时会停下来对后续文档的处理，直到 src 的内容加载完毕。常用在 script、img、iframe 标签中，我们建议 js 文件放在 HTML 文档的最后面。如果 js 文件放在了 head 标签中，可以使用 window.onload 实现 js 的最后加载。

总结：href 用于建立当前页面与引用资源之间的关系（链接），而 src 则会替换当前标签。遇到 href，页面会并行加载后续内容；而 src 则不同，浏览器需要加载完毕 src 的内容才会继续往下走。

#### script 标签的 defer 和 async 的区别

```js
<script src="../js/let var const的区别.js"></script>               <!-- 会阻断html加载，所以一般要放在最底部，否则资源过大的话会造成页面白屏 -->
<script src="../js/let var const的区别.js" async></script>         <!-- 异步的加载html，可能会阻断html加载，取决于加载资源的速度 -->
<script src="../js/let var const的区别.js" defer></script>         <!-- 完全不会阻断加载html，html加载完成后才会加载script -->
```

> defer 和 async 的共同点是都是可以并行加载 JS 文件，不会阻塞页面的加载，不同点是 defer 的加载完成之后，JS 会等待整个页面全部加载完成了再执行，而 async 是加载完成之后，会马上执行 JS，所以假如对 JS 的执行有严格顺序的话，那么建议用 defer 加载。

#### iframe 的优缺点

**iframe 的优点：**

1. iframe 能够原封不动的把嵌入的网页展现出来。
2. 如果有多个网页引用 iframe，那么你只需要修改 iframe 的内容，就可以实现调用的每一个页面内容的更改，方便快捷。
3. 网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用 iframe 来嵌套，可以增加代码的可重用。
4. 如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由 iframe 来解决。

**iframe 的缺点：**

1. 会产生很多页面，不容易管理。
2. iframe 框架结构有时会让人感到迷惑，如果框架个数多的话，可能会出现上下、左右滚动条，会分散访问者的注意力，用户体验度差。
3. 代码复杂，无法被一些搜索引擎索引到，这一点很关键，现在的搜索引擎爬虫还不能很好的处理 iframe 中的内容，所以使用 iframe 会不利于搜索引擎优化。
4. 很多的移动设备（PDA 手机）无法完全显示框架，设备兼容性差。
5. iframe 框架页面会增加服务器的 http 请求，对于大型网站是不可取的。

#### 如何理解 html 语义化标签

> 让人更容易读懂，让搜索引擎更容易读懂，有助于爬虫更好的抓取关键信息，爬虫依赖于标签来确定上下文和各个关键字的权重(SEO)，在没有 CSS 的情况下，页面也能更好的内容结构，代码结构

#### HTML 中 meta 标签的理解

中文名叫元数据，是用于描述数据的数据。它不会显示在页面上，但是机器却可以识别。这么一来 meta 标签的作用方式就很好理解了。

meta 常用于定义页面的说明，关键字，最后修改日期，和其它的元数据。这些元数据将服务于浏览器（如何布局或重载页面），搜索引擎和其它网络服务。

1. **name 属性**

   > name 属性主要用于描述网页，比如网页的关键词，叙述等。与之对应的属性值为 content，content 中的内容是对 name 填入类型的具体描述，便于搜索引擎抓取。
   > meta 标签中 name 属性语法格式是：`<meta name="参数" content="具体的描述">。`其中 name 属性共有以下几种参数。

   1. keywords(关键字)，用于告诉搜索引擎，你网页的关键字。`<meta name="keywords" content="Lxxyx,博客，文科生，前端">`
   2. description(网站内容的描述)，用于告诉搜索引擎，你网站的主要内容。 `<meta name="description" content="文科生，热爱前端与编程。目前大二，这是我的前端博客">`
   3. viewport(移动端的窗口)，这个属性常用于设计移动端网页。在用 bootstrap,AmazeUI 等框架时候都有用过 viewport。`<meta name="viewport" content="width=device-width, initial-scale=1">`
   4. robots(定义搜索引擎爬虫的索引方式)，说明：robots 用来告诉爬虫哪些页面需要索引，哪些页面不需要索引。content 的参数有 all,none,index,noindex,follow,nofollow。默认是 all。`<meta name="robots" content="none">`，具体参数如下：
      1. none : 搜索引擎将忽略此网页，等价于 noindex，nofollow。
      2. noindex : 搜索引擎不索引此网页。
      3. nofollow: 搜索引擎不继续通过此网页的链接索引搜索其它的网页。
      4. all : 搜索引擎将索引此网页与继续通过此网页的链接索引，等价于 index，follow。
      5. index : 搜索引擎索引此网页。
      6. follow : 搜索引擎继续通过此网页的链接索引搜索其它的网页。
   5. author(作者)，用于标注网页作者，`<meta name="author" content="Lxxyx,841380530@qq.com">`
   6. copyright(版权)，用于标注版权信息，`<meta name="copyright" content="Lxxyx">`代表该网站为 Lxxyx 个人版权所有。

2. **http-equiv 属性**

   > http-equiv 顾名思义，相当于 http 的文件头作用。这个我所认为的 http-equiv 意思的简介：相当于 HTTP 的作用，比如说定义些 HTTP 参数啥的。meta 标签中 http-equiv 属性语法格式是：`<meta http-equiv="参数" content="具体的描述"`其中 http-equiv 属性主要有以下几种参数：

   1. content-Type(设定网页字符集)(推荐使用 HTML5 的方式),`<meta charset="utf-8">`，HTML5 设定网页字符集的方式，推荐使用 UTF-8
   2. X-UA-Compatible(浏览器采取何种版本渲染当前页面)， `<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>` ，指定 IE 和 Chrome 使用最新版本渲染当前
   3. cache-control(指定请求和响应遵循的缓存机制)，`<meta http-equiv="cache-control" content="no-cache">`共有以下几种用法：
      1. no-cache: 先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存。
      2. no-store: 不允许缓存，每次都要去服务器上，下载完整的响应。（安全措施）
      3. public : 缓存所有响应，但并非必须。因为 max-age 也可以做到相同效果
      4. private : 只为单个用户缓存，因此不允许任何中继进行缓存。（比如说 CDN 就不允许缓存 private 的响应）
      5. maxage : 表示当前请求开始，该响应在多久内能被缓存和重用，而不去服务器重新请求。例如：max-age=60 表示响应可以再缓存和重用 60 秒。
   4. expires(网页到期时间)，用于设定网页的到期时间，过期后网页必须到服务器上重新传输。`<meta http-equiv="expires" content="Sunday 26 October 2016 01:00 GMT" />`
   5. refresh(自动刷新并指向某页面)，网页将在设定的时间内，自动刷新并调向设定的网址。`<meta http-equiv="refresh" content="2;URL=http://www.lxxyx.win/">`意思是 2 秒后跳转向这个 url 页面
   6. Set-Cookie(cookie 设定)，如果网页过期。那么这个网页存在本地的 cookies 也会被自动删除。`<meta http-equiv="Set-Cookie" content="name, date">`，`<meta http-equiv="Set-Cookie" content="User=Lxxyx; path=/; expires=Sunday, 10-Jan-16 10:00:00 GMT"> `
