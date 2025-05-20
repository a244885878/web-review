import{_ as a,c as i,o as n,ae as l}from"./chunks/framework.Cthp9TdA.js";const c=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"04_vue/Vue 生命周期的理解.md","filePath":"04_vue/Vue 生命周期的理解.md"}'),p={name:"04_vue/Vue 生命周期的理解.md"};function e(t,s,E,h,k,d){return n(),i("div",null,s[0]||(s[0]=[l(`<h3 id="什么是-vue-生命周期" tabindex="-1">什么是 Vue 生命周期？ <a class="header-anchor" href="#什么是-vue-生命周期" aria-label="Permalink to &quot;什么是 Vue 生命周期？&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Vue生命周期总共可以分为8个阶段：创建前后, 载入前后,更新前后,销毁前销毁后，以及一些特殊场景的生命周期</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  生命周期	描述</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    beforeCreate	组件实例被创建之初</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    created	组件实例已经完全创建</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    beforeMount	组件挂载之前</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    mounted	组件挂载到实例上去之后</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    beforeUpdate	组件数据发生变化，更新之前</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    updated	组件数据更新之后</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    beforeDestroy	组件实例销毁之前</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    destroyed	组件实例销毁之后</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    activated	keep</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">alive 缓存的组件激活时</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    deactivated	keep</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">alive 缓存的组件停用时调用</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    errorCaptured	捕获一个来自子孙组件的错误时被调用</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  具体分析</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    beforeCreate </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> created</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    初始化vue实例，进行数据观测</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    created</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    完成数据观测，属性与方法的运算，watch、event事件回调的配置</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    可调用methods中的方法，访问和修改data数据触发响应式渲染dom，可通过computed和watch完成数据计算</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    此时vm.$el 并没有被创建</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    created </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> beforeMount</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    判断是否存在el选项，若不存在则停止编译，直到调用vm.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$mount</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(el)才会继续编译</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    优先级：render </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> template </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> outerHTML</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    vm.el获取到的是挂载DOM的</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    beforeMount</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    在此阶段可获取到vm.el</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    此阶段vm.el虽已完成DOM初始化，但并未挂载在el选项上</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    beforeMount </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mounted</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    此阶段vm.el完成挂载，vm.$el生成的DOM替换了el选项所对应的DOM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    mounted</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    vm.el已完成DOM的挂载与渲染，此刻打印vm.$el，发现之前的挂载点及内容已被替换成新的DOM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    beforeUpdate</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    更新的数据必须是被渲染在模板上的（el、template、render之一）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    此时view层还未更新</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    若在beforeUpdate中再次修改数据，不会再次触发更新方法</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    updated</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    完成view层的更新</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    若在updated中再次修改数据，会再次触发更新方法（beforeUpdate、updated）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    beforeDestroy</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    实例被销毁前调用，此时实例属性与方法仍可访问</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    destroyed</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    完全销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    并不能清除DOM，仅仅销毁实例</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  created和mounted时期请求API的区别</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  created时期：这个时期可以操作vue实例中的数据和各种方法，但是还不能对 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">DOM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 节点进行操作</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  mounted时期：挂载完毕，这时 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">DOM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 节点被渲染到文档内，一些需要 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">DOM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 的操作在此时才能正常进行</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  在created时期请求接口拿到页面数据，</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">DOM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 还没有渲染，最后数据和DOM会同步渲染在页面中。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  在mounted时期请求接口拿到页面数据，</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">DOM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 已经渲染到页面中，拿到数据后在渲染数据。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  以性能方面考虑还是在 created时期 获得数据会比较好一点</span></span></code></pre></div>`,2)]))}const g=a(p,[["render",e]]);export{c as __pageData,g as default};
