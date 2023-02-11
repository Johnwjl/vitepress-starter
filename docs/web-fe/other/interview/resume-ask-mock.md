# 简历提问模拟
## 面试官问
### 初级（15K）
<br>

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

::: details Vue生命周期 🌟
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

::: details 可以使用箭头函数来定义生命周期方法吗？
- 不可以，因为箭头函数绑定了父级作用域上下文，因此`this`与预期的`Vue`实例不同
:::

::: details Vue常用的指令有哪些？🌟
- v-if , v-show , v-for , v-model，v-bind , v-on
:::

::: details v-if 和 v-show 区别？🌟
- `v-if`是真正的条件渲染，`v-show`只是css层面的显示隐藏。
- `v-show`更适合元素切换频繁的场景，`v-if`则相反。
:::

::: details `v-for`的`key`属性的作用? 🌟
- 在虚拟DOM`diff`过程中，新旧`Nodes`对比时,通过`key`来辨识`VNodes`；
- 不使用key的情况下，Vue默认遵循`就地更新/复用`策略，最大限度减少动态元素;
- 使用key之后，Vue会基于key的变化重新排列元素顺序，以及移除/销毁key不存在的元素。
:::

::: details `v-for`为何不建议使用`index`来作为key? 🌟
- 在虚拟DOM`diff`过程中，每一项的`index`都会随着数据变更而发生变化，进而更新每一项的DOM节点，这就造成了不必要的性能开销。
:::

::: details `v-for`与`v-if`为什么不能一起用？ 🌟
- `v-for`的优先级比`v-if`高，`v-for`的每次循环都会执行一次`v-if`，这就造成了不必要的性能开销。
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

::: details Vue组件间传值方式有哪些？🌟
- 父传子：props 接受传值
- 子传父：$emit 事件发送
- 兄弟组件：中央总线(Event-Bus)，`$emit`发送，`$on`接受
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

::: details Vue路由权限是怎么实现的？
- 登录以后，后端接口会返回当前用户可访问的路由菜单
- 拿这张动态路由表与我们前端自己的静态路由表做比对和筛选，从而展示出当前用户权限下的菜单
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

::: details 项目中碰到过的实际问题及解决方案？🌟
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
  - 123
- 大数据量展示：分页处理
  - 123
- 如何提升页面渲染性能
  - 123
::: 

#### JavaScript

::: details 数据类型
- 基本类型：String、Number、Boolean、Undefined、Null、Bigint、Symbol。
- BigInt是一种表示`大整数`新的数据类型，用于当整数值大于Number数据类型支持的范围时。
- Symbol 是`唯一并且不可变`的原始值，并且可以用来作为`对象属性的键`。
- 引用类型：Object、Array、Function、Data、Math、RegExp。
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

::: details 原型链与继承 待补充
- 123
:::

::: details JS有哪些作用域
- 全局作用域
- 函数作用域
- 块级作用域
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

::: details 常用到的ES6知识点 🌟
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

::: details `const`定义的对象可以更改里面的属性吗
- 可以。因为const声明的对象，只是保存对象的引用地址，只要地址不变，就不会出错。
- 如何使之不变：使用`Object.freeze(obj)`冻结对象，就能使其内部的属性不可变，但有局限，就是obj对象中要是有属性是对象，该对象内属性还能改变，要全不可变的话，就需要使用`递归`等方式一层一层全部冻结。
:::

::: details 对象深拷贝
- `JSON.parse(JSON.stringify(obj))`
:::

::: details let const var 区别
- var： 存在变量提升；一个变量可多次声明
- let ，const： 块级作用域；不存在变量提升；声明前变量不可用（暂时性死区）；不允许在相同作用域中重复声明
- const：只读的变量，声明后值类型数据不能改变，引用类型地址指向不能改变 内部属性可以改变；const必须初始化
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

::: details 数组 map() 的返回值
- pending fullfill reject
- Vue3 是通过 Proxy API 实现对属性的 getter 和 setter  的代理，并原生支持对数组和对象的监听。
:::

#### CSS

::: details css如何优化 重排（回流）和重绘
- Reflow（重排）: 元素改变影响了文档流布局
- Repaint（重绘）: 元素改变但未影响文档流布局
- 重绘不一定导致重排，但重排一定会导致重绘。
- 重排的开销代价很大，建议：不要使用Table 布局，缩小重排元素的DOM层级
:::

### 中级（20K）

#### Vue

::: details `$nexttick()`是如何实现的
- 123
:::

#### js

::: details `sessionStorage`在同域下的多窗口之间能共享状态吗？
- 多窗口之间`sessionStorage`不可以共享状态！但是在某些`特定场景`下新开的页面会`复制`之前页面的`sessionStorage`
:::

::: details `EventLoop` 微任务 宏任务
- 123
:::

::: details `EventLoop` 事件循环机制
- 123
:::

::: details `EventLoop` 事件循环机制
- 123
:::

::: details 单线程的JavaScript是如何实现异步的
- 123
- [参考](https://juejin.cn/post/6844904159385223175)
:::

::: details New关键字的底层原理
- 123
:::

::: details get和set分别应用于基本数据类型和引用类型，有何不同
- 123
:::

#### Webpack

::: details Webpack的工作流程是怎么样的
- 123
:::

#### 实际项目中遇到问题及解决
::: details 表格前端导出
- 123
:::

### 履历层面

::: details 最近做的项目讲一下, 具体包含什么功能
- 123
::: 

::: details 什么时候离职的？
- 2月初离职
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

#### 初级

::: details Vue3 怎么定义响应式数据
- 123
:::

### TS

#### 初级

::: details 什么是Ts泛型，什么时候会用泛型
- 123
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


