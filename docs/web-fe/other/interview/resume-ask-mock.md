# 简历提问模拟
## 面试官问

### 🌟 那我们开始，你先做个自我介绍吧。

::: details 自我介绍
- 我上一家公司主要是做交通道路智能化监控`可视化大屏`系统平台，我们开发部门主要承接上海各区级政府对于辖区内路道病害智能化监控维护的相关需求，我们开发部做的智慧大屏系统就是基于我们数据算法部门采集的路道病害等相关数据对路面的综合路况做实时展示及相应的图形化渲染。主要技术栈是用 Vue2 + Element-UI、Echarts、高德地图 API
- 再上一份工作，是做华为的项目外包，承接华为旗下广告消费者云的相关业务，我们的项目主要就是围绕消费者云第三方入驻的广告供应商，为他们接入华为消费者云提供的一系列的供应商服务平台，包括业务门户和运营管理中后台。主要技术栈是用的 `Vue2` + `Element-UI`。
:::

::: details 你有八个月的履历空档期，这大半年都没工作吗
- 疫情期间，家人生病住院，我从上海回去 一直在老家照顾，最近才回来上海。
:::

::: details 具体讲一下你最近做的一个（你最有印象的）（你主要独立开发的）项目吧
- 可视化大屏，主要有几个菜单：首页、路面病害、综合路况、道路巡查、车辆巡检。大屏可视区域有以下几个模块：主区域是智慧大屏的地图撒点，顶部是title栏和菜单栏，左右两侧是可隐藏的一系列Echarts图表和table列表。
:::

### 🌟 初级（必备）（高频）（15K）
<br>

#### 你在实际开发中遇到过哪些问题，你是怎么解决的

::: details 项目中碰到过的实际问题及解决方案？
- 在vue项目的开发中，遇到过的典型问题之一就是 `vuex状态存储数据在刷新后丢失`，围绕如何将`vuex持久化存储`去解决这个问题。
  - 解决问题的前提是定位问题。因为Vuex里的数据是保存在运行内存中的，当页面刷新时，页面会重新加载Vue实例，Vuex里面的数据就会被重新赋值。
  - 第一种解决方案 是 同时将数据存在 sessionstorge，页面刷新初始化阶段vuex通过接收sessionStorage的数据来进行数据响应式。
  - 第二种解决方案，使用 vue-persistedstate (一款 vuex 持久化插件)，安装后通过配置plugins来接入vuex持久化存储的能力。
- 另一个经典的问题是在 Vue使用Echart时init初始化失败，debug提示获取不到DOM元素
  - 定位问题的时候，首先想到可能是由于`页面元素渲染顺序`的问题。一般是由于`v-if`条件渲染或是`v-show`切换tab页，又或者是存在`animation`动画或`transition`过渡效果，导致目标元素要延迟几毫秒才出现，而该Dom元素的相关事件操作则先行了一步。
  - 解决方案，一般是在Echart初始化方法添加`this.$nextTick`,等当前元素或动画帧渲染完毕才执行后续事件操作。
- 数据更新,视图却没更新 
  - 原因：在vue组件中,data初始化的数据是具有响应性的，而在vue2当中有一些数组和对象的操作变动是无法被监测的。
  - 比如：使用数组索引直接赋值，或通过length直接修改数组长度。
  - 解决：`vue.$set(object, key, value)` 添加具有响应性的属性
- 获取不到DOM
  - 原因：vue执行异步DOM更新，当数据变化，视图变更会进入队列。出于 接口缓慢或者 动画过渡等效果 影响，视图变更受到延迟
  - 解决：Vue.nextTick(callback) ，在 DOM 更新完成后再调用。
- API 接口调用时间长，前端界面如何处理的
  - 在用户体验层面，前端需要在接口数据未抵达渲染前添加loading元素。
  - 最根本的办法，还是需要去和后端一起来协作，配合后端去将接口进行改造和切分，前端分次调用，提高接口响应性能。
- 大数据量展示优化性能
  - 懒加载和分页
  - 虚拟滚动技术
- 如何提升页面渲染性能（优化首屏加载）（前端性能优化）
  - 减少HTTP请求
  - 资源懒加载
  - CDN 加速
  - 浏览器缓存
  - 异步加载
- 大屏适配方案
  - rem vw vh
  - flex 
  - echarts resize
- 移动端H5适配方案
::: 

::: details 大屏实时数据展示解决方案
- 方式
  - 定时轮询
  - 通过 websocket 即时通信技术
- 参考
  - [websocket实时获取数据（数据可视化大屏）](https://blog.csdn.net/weixin_52703987/article/details/122956621)
:::

::: details 登录鉴权 判断当前用户已登陆
- JWT 前端将token存到本地，在请求的headers里提供token
- [判断用户是否的登录的方式：JWT 与 session 、cookies](https://blog.csdn.net/weixin_43822185/article/details/104074147)
:::

::: details 地图大数据量的撒点很卡顿,如何解决
- 监听地图缩放，把「海量标注」放在用户放大区域时再加载
- 检测「海量标注」中的数据项，判断其坐标是否在浏览器视口区域，从而进行分片渲染

- 参考
  - [高德地图「海量点标记 + 海量标注」卡顿问题 解决方案](https://blog.csdn.net/Marker__/article/details/124321573)
:::
#### Vue

::: details 响应式原理（数据双向绑定原理）
- `Vue2`是通过`Object.defineProperty`去监听属性的`getter`和`setter`,
- `Vue3`是通过`Proxy API`实现对属性的`getter`和`setter` 的代理，并原生支持对数组和对象的监听。
:::

::: details `v-model`
- 作用：在表单类元素上实现双向绑定
- 原理：`v-bind`(绑定属性)与`v-on`(触发事件)的语法糖
:::

::: details `虚拟Dom`及`diff算法`
- 虚拟Dom：一个用来表示真实DOM的对象
- 虚拟DOM`diff`算法操作真实DOM，性能高于直接操作真实DOM
- `diff`算法比对新旧VDom中有哪些VNodes更改了，从而实现精准地更新真实DOM，进而提高效率。
:::

::: details Vue生命周期
- 8个阶段：`创建`前/后，`挂载`前/后，`更新`前/后，`销毁`前/后。
- `生命周期钩子`具体描述：
  1. beforeCreate：vue实例的挂载el未定义，data未定义
  2. **created**：`data`已经定义，但未初始化。通常在这个阶段进行一些`数据资源的请求`。
  3. beforeMounted: `template`模板已导入渲染函数编译。此时虚拟Dom已经创建完成，即将开始渲染。
  4. **mounted**: 实例el挂载完毕。可以进行一些`DOM操作`。
  5. beforeUpdate: 在数据发生改变后，DOM 被更新之前被调用。
  6. updated: DOM重新渲染完毕之后被调用
  7. beforeDestroy：组件实例销毁之前调用。可以执行一些性能优化操作，清空计时器，解除绑定事件
  8. destroyed：实例已销毁。
- 还有别的`生命周期钩子`吗
  - 用于 `keep-alive` 组件缓存的 两个钩子：`activated` `deactivated`
    - `activated`：被 keep-alive 缓存的组件激活时调用。
    - `deactivated`：被 keep-alive 缓存的组件失活时调用。
:::

::: details 父子组件的生命周期顺序
- 加载渲染：父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
- 更新：父beforeUpdate->子beforeUpdate->子updated->父updated
- 销毁：父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
:::

::: details Vue常用的指令有哪些？
- v-if , v-show , v-for , v-model，v-bind , v-on
:::

::: details v-if 和 v-show 区别？
- `v-if`是真正的条件渲染，`v-show`只是css层面的显示隐藏。
- `v-show`更适合元素切换频繁的场景，`v-if`则相反。
:::

::: details `v-for`的`key`属性的作用? 
- 在虚拟DOM`diff`过程中，新旧`Nodes`对比时,通过`key`来辨识`VNodes`；
- 不使用key的情况下，Vue默认遵循`就地更新/复用`策略，最大限度减少动态元素;
- 使用key之后，Vue会基于key的变化重新排列元素顺序，以及移除/销毁key不存在的元素。
:::

::: details `v-for`为何不建议使用`index`来作为key? 
- 在虚拟DOM`diff`过程中，每一项的`index`都会随着数据变更而发生变化，进而更新每一项的DOM节点，这就造成了不必要的性能开销。
:::

::: details `v-for`与`v-if`为什么不能一起用？ 
- `v-for`的优先级比`v-if`高，`v-for`的每次循环都会执行一次`v-if`，这就造成了不必要的性能开销。
:::

::: details Vue组件通信（组件间传值）方式有哪些？
- 父子组件间的传值：本质就是`prop`向下传递，事件向上传递。父组件通过v-bind(:)绑定的属性prop会给子组件下发数据(子组件props接收)，子组件通过事件($emit)给父组件发送信息（父组件 v-on (@) 来捕获事件）。
- 兄弟组件：中央总线(Event-Bus)，`$emit`发送，`$on`接受
:::

::: details computed watch 用法、特性及使用场景区别
- computed（计算属性）：
  - 用法：
    ```js
    computed:{
      mergeText1(){
        return this.firstText + ' ' + this.lastText;
      },
      mergeText2:{  /* 通过mergeText2反向赋值给 firstText和lastText */
        // getter
        get() {  // 回调函数 当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
          return `${this.firstText} ${this.lastText}`;
        },
        // setter
        set(val) {  //监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据,val就是fullName的最新属性值
          const names = val.split(' ');
          console.log(names);
          this.firstText = names[0];
          this.lastText = names[names.length - 1];
        }
      }
    },
    ```
  - 特性：
    - 支持基于响应式依赖进行缓存
    - 只有依赖数据发生改变时才会重新计算
  - 场景：某个属性是依赖于其他的属性计算得来的，或者说 拿到某个数据后需要进行处理和转换
- watch（侦听属性）：
  - 用法：
    ```js
    watch:{
      // 监听当firstText的值变化，触发此事件，改变mergeText的值
      firstText(newText,oldText){
        console.log(newText, oldText);
        this.mergeText = newText + ' ' + this.lastText;
      },
      // 监听对象obj的变化
      obj:{
        handler (newVal,oldval) {
          console.log(newVal,oldval)
        },
        deep: true, // 深度监听
        immediate: true
      },
      // 监听对象单个属性text
      'obj.text':{
        handler (newVal,oldval) {
          console.log(newVal,oldval)
        },
        immediate: true, // 该属性会先执行一次handler
      }
    },
    ```
  - 特性：
    - 监听数据变化
    - 支持异步操作
  - 场景：当需要在数据变化时执行异步或开销较大的操作时，即 当一个属性发生变化时，需要执行对应的操作
:::

::: details Vue常用的修饰符
- 表单修饰符
  - .lazy（在光标离开input框才会更新数据）
  - .trim（过滤首尾的空格）
  - .number（先输入数字就会限制输入只能是数字）
- 事件修饰符
  - .stop （阻止事件冒泡 //`event.stopPropagation()`）
  - .prevent (阻止默认行为 // `event.preventDefault()`)
  - .self (只有元素本身触发时才触发方法)
  - .once (事件只执行一次，无论点击几次)
  - .sync （对prop进行双向绑定）
  - .keyCode （监听按键的指令）
  - .capture （添加事件侦听器时使用事件捕获模式）
:::

::: details `hash` 和 `history` 两种路由的区别 🌟
- `hash`模式下，URL中会带有`#`，通过监听URL中hash部分的变化，从而做出对应的渲染逻辑
- `history` 则是通过HTML5的`history API`来实现路由的跳转
:::

::: details HTML `history` 常用 API
- `history.pushState` 浏览器历史纪录添加记录
- `history.replaceState` 修改浏览器历史纪录中当前纪录
- `history.popState` 当 history 发生变化时触发
:::

::: details 路由History模式, 页面刷新为什么会404 🌟
- 因为需要服务端的配置,如果`URL`不匹配任何静态资源，重定向到`index.html`
  - nginx
  ```json
  location / {
    try_files $uri $uri/ /index.html;
  }
  ```
  - Vercel 在项目根目录创建一个vercel.json文件，内容如下：
  ```json
  {
    "rewrites": [{ "source": "/:path*", "destination": "/index.html" }]
  }
  ```
- 而在hash模式中，连同`#`及后面路由参数的hash部分，虽然出现在`URL`中，但不会被包括在`HTTP`请求中，对服务端完全没有影响，因此改变`hash`不会重新加载页面
:::

::: details Vue路由守卫
- 全局守卫 `router.beforeEach`
  ```js
  router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    else next()
  })
  ```
- 路由独享守卫 `beforeEnter`
  ```js
  const routes = [
    {
      path: '/users/:id',
      component: UserDetails,
      beforeEnter: (to, from) => {
        // reject the navigation
        return false
      },
    },
  ]
  ```
- 组件内的守卫 `beforeRouteEnter`
  ```js
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
    })
  }
  ```
::: 

::: details Vue路由权限是怎么实现的？
- 登录以后，后端接口会返回当前用户可访问的路由菜单
- 拿这张动态路由表与我们前端自己的静态路由表做比对和筛选，从而展示出当前用户权限下的菜单
::: 

::: details vuex mutation?
- 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
- commit 推送一个mutation
::: 

::: details vuex action？
- Action 提交 mutation，而非直接变更状态。
- Action 可以包含任意异步操作。
::: 

::: details vuex commit dispatch 区别？
- dispatch 推送一个action (因此 dispatch 包含了异步操作)，this.$store.dispatch('mutations方法名',值)
- commit：同步操作，写法：this.$store.commit('mutations方法名',值)
::: 

::: details 页面输入URL回车后刷新的空白时间做了什么？
- DNS域名解析
- 建立TCP连接、三次握手
- 发送HTTP请求、服务端处理请求、返回响应结果
- 关闭TCP连接、四次挥手
- 浏览器渲染
  - 构建DOM树
  - 样式计算
  - 创建布局树
  - 转为分层树
  - 为每个图层生成绘制列表
  - 通过合成线程渲染到页面
:::

::: details Vue自定义指令
- 注册
  ```js
    // 注册一个全局自定义指令 `v-focus`
    Vue.directive('focus', {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: function (el) {
        // 聚焦元素
        el.focus()
      }
    })
  ```
  ```js
  // 注册局部指令
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  }
  ```
- 使用
  ```html
  <input v-focus>
  ```
- 钩子
  - `bind`: 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  - `inserted`: 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  - `update`: VNode 更新时调用
  - `componentUpdated`: 组件的 VNode 及其子 VNode 全部更新后调用。
  - `unbind`: 只调用一次，指令与元素解绑时调用。
- 钩子参数
  - `el`: 指令绑定元素
  - `binding` : 
    - `name`: 指令名
    - `value`: 指令的绑定值
    - `oldValue`: 指令绑定的前一个值.(仅在 update 和 componentUpdated 钩子中可用)
    - `expression`: 字符串形式的指令表达式。
    - `arg`: 传给指令的参数. 如: `v-my-directive:foo` 中，参数为 `"foo"`
    - `modifiers`: 一个包含修饰符的对象. 如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
:::

::: details Vue 按钮级权限怎么实现的？
- 思路：接收自定义指令`binding`中传递的参数，通过`check`函数进行校验，校验未通过时，获取当前指令所在节点的父节点，来删除掉当前节点，实现权限控制。
- 实现：
  ```js
  //./directives/auth.js
  import { check } from '../utils/auth.js';

  function install(Vue, options = {}) {
      Vue.directive(options.name || 'auth', {
          inserted(el, binding) {
              if (!check(binding.value)) {
                  el.parentNode && el.parentNode.removeChild(el);
              }
          }
      })
  }

  export default { install }
  ```
::: 

#### JavaScript

::: details 数据类型
- 基本类型：String、Number、Boolean、Undefined、Null、Bigint、Symbol。
- BigInt是一种表示`大整数`新的数据类型，用于当整数值大于Number数据类型支持的范围时。
- Symbol 是`唯一并且不可变`的原始值，并且可以用来作为`对象属性的键`。
- 引用类型：`Object`、`Array`、`Function`、`Data`、`Math`、`RegExp`。
```js
// 工具方法 判断数据类型
function checkType(val){
  let type  = typeof val;
  if (type !== "object") {    // 先进行typeof判断，如果是基础数据类型，直接返回
    return type;
  }
  // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
  return Object.prototype.toString.call(val).replace(/^\[object (\S+)\]$/, '$1');
}
```
:::

::: details JS有哪些作用域
- 全局作用域
- 函数作用域
- 块级作用域
:::

::: details 说说你对this的理解
- `this`实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里`被调用`。
:::

::: details 常用到的ES6知识点
- let const
- 解构赋值
- 模版字符串
- 展开运算符
- 数组方法：`find` `findIndex` `entries` `keys` `values` `flat` `sort`
- 对象方法：`assign()`(用于对象的合并 浅拷贝) `entries()` `keys()` `values()`
- 箭头函数
- promise
- async await
:::

::: details `let` `const` `var` 区别
- var： 存在变量提升；一个变量可多次声明
- let ，const： 块级作用域；不存在变量提升；声明前变量不可用（暂时性死区）；不允许在相同作用域中重复声明
- const：只读的变量，声明后值类型数据不能改变，引用类型地址指向不能改变 内部属性可以改变；const必须初始化
:::

::: details `const`定义的对象可以更改里面的属性吗
- 可以。因为const声明的对象，只是保存对象的引用地址，只要地址不变，就不会出错。
- 如何使之不变：使用`Object.freeze(obj)`冻结对象，就能使其内部的属性不可变，但有局限，就是obj对象中要是有属性是对象，该对象内属性还能改变，要全不可变的话，就需要使用`递归`等方式一层一层全部冻结。
:::

::: details 数组 map() 的返回值
- 123
:::

::: details 数组去重有哪些方法
  1.  ES6 的 new Set
  ```js
  const arr = [1,1,2,2,3,3,4,4,5,5];
  const setData = Array.from(new Set(arr));
  console.log(setData);
  ```
  ```js
  //去重合并
  function combine(){
      let arr = [].concat.apply([], arguments);  //没有去重复的新数组
      return Array.from(new Set(arr));
  }

  var m = [1, 2, 2], n = [2,3,3];
  console.log(combine(m,n));                     // [1, 2, 3]

  ```
  - 缺陷：无法去重引用类型的数据。比如对象数组
  2. fllter + indexOf
  ```js
  const handleRemoveRepeat = (arr) => arr.filter((item,index) => arr.indexOf(item,0) === index);
  ```
  3.  Map + set 
  ```js
  function arrayToHeavy(arr) {
  	const result = [];
  	const mapList = new Map();
  	arr.forEach((item) => {
  		if(!mapList.has(item.id)) {
  			result.push(item);
  			mapList.set(item.id,true);
  		}
  	})
  	return result;
  }
  ```
:::

::: details 数组排序的方法有哪些
- sort()、reverse()
  ```js
  // 字符串 排序
  var fruits = ["Banana", "Orange", "Apple", "Mango"];
  fruits.sort();            // 对 fruits 中的元素进行排序
  fruits.reverse();         // 反转元素顺序
  ```
  ```js
  // 数字排序 比值函数
  var points = [40, 100, 1, 5, 25, 10];
  points.sort(function(a, b){return a - b}); // 升序
  points.sort(function(a, b){return b - a}); // 降序
  ```
:::

::: details 判断数组的方法有哪些
  ```js
  console.log(Array.isArray(arr));   //true

  console.log(arr instanceof Array);   //true

  console.log(arr.constructor === Array);   //true

  console.log(Object.prototype.toString.call(arr) === '[object Array]');   //true

  console.log(Array.prototype.isPrototypeOf(arr));   //true

  console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
  ```
:::

::: details 数组合并的方法有哪些
```js
var array3 = array1.concat(array2);

var array3 = [...array1, ...array2];
```
:::

::: details localstorage、sessionstorage，cookie 三者区别
- localStorage: localStorage的生命周期是永久的，关闭页面或浏览器之后localStorage中的数据也不会消失。localStorage除非主动删除数据，否则数据永远不会消失。
- sessionStorage:sessionStorage的生命周期是在仅在当前会话下有效。sessionStorage引入了一个“浏览器窗口”的概念，sessionStorage是在同源的窗口中始终存在的数据。只要这个浏览器窗口没有关闭，即使刷新页面或者进入同源另一个页面，数据依然存在。但是sessionStorage在关闭了浏览器窗口后就会被销毁。同时独立的打开同一个窗口同一个页面，sessionStorage也是不一样的。
- cookie:cookie在过期时间之前一直有效，即使窗口或浏览器关闭。 存放数据大小为`4KB`左右,有个数限制（各浏览器不同），一般不能超过`20`个。缺点是不能储存大数据且不易读取。
- 数据存放大小：cookie：`4KB`左右，localStorage和sessionStorage：可以保存`5MB`的信息。
:::

::: details `sessionStorage`在同域下的`多窗口`之间能共享状态吗？
- 多窗口之间`sessionStorage`不可以共享状态！但是在某些`特定场景`下新开的页面会`复制`之前页面的`sessionStorage`
:::

::: details 对象深拷贝
- `JSON.parse(JSON.stringify(obj))`
:::

::: details 原型链与继承
- 原型链：每个对象拥有一个原型对象，对象从原型继承方法和属性，原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推，直到一个对象的原型对象为`null`。这种关系常被称为原型链 (prototype chain)
- 这些属性和方法定义在 Object 的 `构造器函数` (constructor functions) 之上的 `prototype` 属性上，而非对象实例本身。
- 从构造函数的·prototype·属性派生出`__proto__`属性，它是`对象实例`和它的`构造器`之间建立的链接,作用是将原型中的所有属性和方法都被复制到实例中
-  实例的 `__proto__` == constructor 的 `prototype` 属性
-  当访问实例(对象)的一个属性时，会先查找实例本身是否有这个属性，如果没有，就从实例的 `__proto__`中查找这个属性 (也就是 constructor 的 prototype)
-  继承的属性和方法是定义在`prototype`属性之上的。
-  构造器是函数也是对象类型
-  每个实例对象（object）都有一个私有属性（称之为 `__proto__`）指向它的构造函数的原型对象（prototype）。
-  参考
   - [对象原型](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes)
   - [继承与原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
   - [Vue3 面向对象编程](https://juejin.cn/post/7039252967374979103)
   - [从函数式编程和面向对象的思考到Vue3的函数式编程](https://blog.csdn.net/qq_21561833/article/details/118969397)
:::

::: details 实现继承的方式有哪些
- 原型链继承
- 构造函数继承
- 组合式继承
- 寄生组合式继承
- Object.create()
- ES6 Class extends
- 参考
  - [javascript实现继承的七种方式](https://juejin.cn/post/6844904161071333384)
  - [彻底弄清js继承的几种实现方式](https://segmentfault.com/a/1190000022677985)
:::

::: details 闭包
- 函数的嵌套函数及其作用域上下文，
- 外部作用域能够访问内部作用域的变量
- 实际用的不多，因为闭包会引起内存泄漏等性能问题。
- 在一些第三方工具库里，比如 防抖的 工具函数中 会使用到 闭包。
:::

::: details 闭包为什么会引起内存泄漏
- 根据`垃圾回收机制`，被另一个作用域引用的变量不会被回收。
:::

::: details 如何避免内存泄漏
- 减少闭包，以及释放闭包内存占用
  - create = null // 释放对匿名函数的引用 
  - 匿名函数立即执行
- 减少全局变量声明，使用l块级作用域
:::

::: details 事件捕获和事件冒泡 ，如何设置捕获和冒泡
- 事件冒泡：事件流的触发顺序从里一直向外传递
- 事件捕获：事件流的触发顺序从外一直向里传递
- `addEventListener`函数的`第三个参数`是个`布尔值`。
  - 当布尔值是`false`时（默认值），表示向上冒泡触发事件；
  - 当布尔值是`true`时，表示向下捕获触发事件；
:::

::: details 事件委托（代理)
- 描述：把事件监听器设置在目标元素的父节点上，然后利用冒泡原理设置每个子节点。
- 好处：只操作了一次 DOM ，提高了程序的性能。
- 例如：给`ul`注册点击事件，然后利用事件对象的`target`来找到当前点击的`li`，然后事件冒泡到`ul`上，`ul`有注册事件，就会触发事件监听器。
:::

::: details promise 有几种状态
- `pending` `fullfill` `reject`
:::

::: details `promise.all()`的参数
- 一组`promise实例`的数组
:::

::: details Promise内的setTimeout执行顺序是怎么样的
- 面试题
  ```js
    setTimeout(function () {
      console.log(1);
    }, 0);

    new Promise(function (resolve) {
      console.log(2)
      for (let i = 0; i < 10000; i++) {
        i == 9999 && resolve();
      }
      console.log(3)
    }).then(function () {
      console.log(4)
    });
    console.log(5);
    // 2 3 5 4 1
  ```
- 解析
  - 首先，Promise定以后会立即执行，所以会先打印2；
  - 然后，resolve和reject调用不会终止Promise内的参数函数继续执行，所以会打印3；
  - 之后，Promise的then方法和setTimeout都是异步任务，会先执行完本轮“事件循环”，所以会打印5；
  - 最后，由于then方法是异步里面的微任务，而setTimeout是异步的宏任务，会先打印4.
:::

#### CSS

::: details 元素水平垂直居中
- 水平居中
  - `flex: display:flex`; `justice-content:center`
  - `text-aglin: center`
  - `margin : 0 auto`
- 垂直居中
  - flex: `aglin-items:center`
  - line-height
  - vertle-again: middle
:::

::: details css如何优化 重排（回流）和重绘
- Reflow（重排）: 元素改变影响了文档流布局
- Repaint（重绘）: 元素改变但未影响文档流布局
- 重绘不一定导致重排，但重排一定会导致重绘。
- 重排的开销代价很大，建议：不要使用Table 布局，缩小重排元素的DOM层级
:::

### 中级（20K）

#### Vue

::: details 可以使用箭头函数来定义生命周期方法吗？
- 不可以，因为箭头函数绑定了父级作用域上下文，因此`this`与预期的`Vue`实例不同
:::

::: details `$nextTick()`是如何实现的
- 123
:::

#### JavaScript

::: details `EventLoop` 事件循环机制
- 123
:::

::: details 单线程的JavaScript是如何实现异步的
- 总结
  - JavaScript通常的宿主环境是浏览器，浏览器是多线程的。
  - 浏览器主线程负责自上而下`顺序执行`，当遇到`setTimeout()`后，便将其交给`定时器线程`去执行，自己继续执行下面的代码, 从而达到异步的目的。
  - 任务队列: 当定时器线程计时执行完之后，会将回调函数放入任务队列中。当这些任务加入到任务队列后并不会立即执行，而是处于等候状态。等主线程处理完了自己的事情后，才来执行任务队列中任务。
- 参考
  - [单线程的JavaScript是如何实现异步的](https://juejin.cn/post/6844904159385223175)
:::

::: details `EventLoop` 微任务 宏任务
- 宏任务：`setTimeout` `setInterval` `I/O` `requestAnimationFrame`
- 微任务：`Promise.then` `MutationObserver`
- 当前的微任务没有执行完成时，不会执行下一个宏任务
:::

::: details New关键字的底层原理
- 总结
  - 123
- 参考
  - [new关键字的底层实现原理](https://segmentfault.com/q/1010000004557184)
:::

::: details 强制缓存和协商缓存
- 123
- 参考
  - [http面试必会的：强制缓存和协商缓存](https://juejin.cn/post/6844903838768431118)
:::

#### Webpack

::: details Webpack的工作流程是怎么样的
- Webpack 的运行流程
  - 初始化参数
  - 开始编译
  - 确定入口
  - 编译模块
  - 完成模块编译
  - 输出资源
  - 输出完成
- 参考
  - [深入浅出webpack 5-1 工作原理概括](https://webpack.wuhaolin.cn/5%E5%8E%9F%E7%90%86/5-1%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E6%A6%82%E6%8B%AC.html)
:::

#### 实际项目中遇到问题及解决
::: details 基于ElementUI的组件二次封装（封装过哪些公共组件）（自己的组件库）
- 思路
  - 父子组件的通信传值
  - 通过在el原生组件上 使用 `v-bind="$attrs"` 和 `v-on="$listeners"` 尽量保持 element-ui 组件原有的特性与方法
- 参考
  - [二次封装这几个 element-ui 组件后，让代码更加优雅了](https://juejin.cn/post/7090453016960040967)
:::
::: details 表格前端导出
- 123
:::

常用的数组操作

- 

### 履历层面

::: details 什么时候离职的？
- 上周
::: 

::: details 这次离职原因是？
- 职业发展
:::

::: details 上次离职原因是？
- 个人因素
:::

::: details 离职证明有吗？
- 有的
- ~~离职证明 还在走流程，最迟下周能够提供~~
:::


### Vue3 

::: details Vue3 怎么定义响应式数据
- 123
:::

### TypeScript

::: details 说说泛型及其使用场景
- 描述：不预先指定具体的类型，相当于给类型先设一个占位符
- 例子：
  ```ts
  // 在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用了。
  function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
  }
  // 在调用的时候，可以指定它具体的类型;
  createArray<string>(3, 'x'); // ['x', 'x', 'x']
  // 也可以不手动指定，而让类型推论自动推算出来
  createArray(3, 'x'); // ['x', 'x', 'x']
  ```
  ```ts
  // 多个类型参数
  function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
  }

  swap([7, 'seven']); // ['seven', 7]
  ```
  ```ts
  // 使用 extends 作 泛型约束， T 必须符合接口 Lengthwise 的形状，即 必须包含 length 属性。
  interface Lengthwise {
    length: number;
  }

  function loggingIdentity<T extends Lengthwise>(arg: T): T {
      console.log(arg.length);
      return arg;
  }
  ```
  ```ts
  // 多个类型参数之间也可互相约束
  // 例子里的约束为：T 继承 U
  function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
  }

  let x = { a: 1, b: 2, c: 3, d: 4 };

  copyFields(x, { b: 10, d: 20 });
  ```
:::

## 求职者问

### 工作层面

::: details 开发团队组织架构
- 目前团队人员配置：项目经理/主管、前端 X 个、后端 X 个、UI X个、测试 X 个
- 组织层次结构： ...
:::

::: details 业务、项目、技术栈
- 我们公司的业务主要是做...
- 目前在做的项目...要做的...
- 前端技术栈（Vue 2/3 + Typescript）
:::

::: details 团队工作流、成员间协作
- 需求文档、前后端定义接口文档...
:::

::: details 平时一天工作的流程安排是怎样的？
- 早会、各自工作、下班前日报，周报，月报，季度OKR
:::

### 薪酬层面 （面试通过拿到Offer以后再问）

::: details 上下班时间、午休时间
- 09:00 - 18:00
- 12:00 - 13:00
:::

::: details 薪资构成
- 基本工资（80%）、绩效工资（20%）
:::

::: details 社保和个税按照什么标准缴纳
- 111
:::

::: details 年薪多少薪、年终奖制度
- 基本工资、绩效工资
:::

::: details 试用期薪资打折吗
- 试用期3个月，薪资八折
:::

::: details 工作日晚上、周末、假期 加班费标准 
- 工作日加班有补贴、周末加班两倍薪资，法定假期加班三倍
:::

::: details 有微波炉吗
- 有
:::

::: details 有配备电脑显示屏吗
- 有
:::

::: details 开会或者团建 会占用休息日时间吗
- 有
:::


