# 简历提问模拟
## 面试官问
### 初级（15K）
<br>

#### Vue

::: details 响应式原理（数据双向绑定原理）
- Vue2是通过 Object.defineProperty 去监听属性的 getter 和 setter,
- Vue3 是通过 Proxy API 实现对属性的 getter 和 setter  的代理，并原生支持对数组和对象的监听。
:::

::: details v-model 原理
- 用于在表单类元素上实现双向绑定
- v-bind(绑定属性) 与 v-on(触发事件) 的语法糖
:::

::: details Vue 生命周期钩子 有哪些？🌟
- 8个阶段：`创建`前/后，`挂载`前/后，`更新`前/后，`销毁`前/后。
- `生命周期钩子`具体描述：
  1. beforeCreate：vue实例的挂载el未定义，data未定义
  2. **created**：`data`已经定义，但未初始化。通常在这个阶段进行一些`数据资源的请求`。
  3. beforeMounted:
  4. **mounted**: 实例el挂载完毕。可以进行一些`DOM操作`。
  5. beforeUpdate: 在数据发生改变后，DOM 被更新之前被调用。
  6. updated: DOM重新渲染完毕之后被调用
  7. beforeDestroy：组件实例销毁之前调用。
  8. destroyed：实例销毁后调用。可以执行一些性能优化操作，清空计时器，解除绑定事件
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

::: details Vue 常用的指令 有哪些？🌟
- v-if , v-show , v-for , v-bind , v-model
:::

::: details v-if 和 v-show 区别？🌟
- v-if 是真正的条件渲染，v-show 只是css层面的显示隐藏。
- v-show 更适合元素频繁切换的场景，v-if则相反。
:::

::: details v-for key的作用? 🌟
- 在 虚拟DOM diff 过程中，新旧nodes对比时 通过 key 来辨识VNodes；
- 不使用key的情况下，vue默认遵循 就地更新/复用 策略，最大限度减少动态元素
- 使用key之后，vue会基于key的变化重新排列元素顺序，以及 移除/销毁 key不存在的元素
:::

::: details v-for为何不推荐使用index来作为key? 🌟
- 在`differ`算法比较虚拟DOM时，每项的`index`都会随着数据变更发生变化，进而更新每项的真实Dom，违背了Key就地复用的原则，造成了不必要的性能开销。
:::

::: details v-for v-if 为什么不能一起用？ 🌟
- `v-for`的优先级比`v-if`高，每次`v-for`都会执行一次`v-if`，造成重复计算的问题，会影响性能。
:::

::: details Vue 自定义指令 你用过吗？
- 123
:::

::: details Vue 你常用的修饰符 有哪些？
- stop , prevent , trim , number
:::

::: details Vue 组件间传值方式有哪些？🌟
- 父传子：props 接受传值
- 子传父：$emit 事件发送
- 兄弟组件：中央总线(Event-Bus)，`$emit`发送，`$on`接受
:::

::: details `hash` 和 `history` 两种路由的区别 🌟
- `hash`模式下，URL中会带有`#`，通过监听URL中hash部分的变化，从而做出对应的渲染逻辑
- `history` 则是 通过 HTML5 的 history API 来实现 路由的跳转
:::

::: details Vue 路由权限是怎么实现的？
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

::: details 原型链继承
- Vue2是通过 Object.defineProperty 去监听属性的 getter 和 setter,
- Vue3 是通过 Proxy API 实现对属性的 getter 和 setter  的代理，并原生支持对数组和对象的监听。
:::

::: details 闭包
- 函数的嵌套函数及其作用域上下文，
- 外部作用域能够访问内部作用域的变量
- 实际用的不多，因为闭包会引起内存泄漏等性能问题。
- 在一些第三方工具库里，比如 防抖的 工具函数中 会使用到 闭包。
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

::: details let const var 区别
- Vue2是通过 Object.defineProperty 去监听属性的 getter 和 setter,
- Vue3 是通过 Proxy API 实现对属性的 getter 和 setter  的代理，并原生支持对数组和对象的监听。
:::

::: details promise 有几种状态
- pending fullfill reject
- Vue3 是通过 Proxy API 实现对属性的 getter 和 setter  的代理，并原生支持对数组和对象的监听。
:::

::: details `promise.all()`的参数
- 一组`promise实例`的数组
:::

::: details promise setTimeout 触发顺序
- pending fullfill reject
- Vue3 是通过 Proxy API 实现对属性的 getter 和 setter  的代理，并原生支持对数组和对象的监听。
:::

::: details 数组 map() 的返回值
- pending fullfill reject
- Vue3 是通过 Proxy API 实现对属性的 getter 和 setter  的代理，并原生支持对数组和对象的监听。
:::

#### CSS

::: details css如何优化 重排和重绘
- Reflow（重排）: 元素改变影响了文档流布局
- Repaint（重绘）: 元素改变但未影响文档流布局
- 重绘不一定导致重排，但重排一定会导致重绘。
- 重排的开销代价很大，建议：不要使用Table 布局，缩小重排元素的DOM层级
:::

### 中级（20K）

#### js

::: details `sessionStorage`在同域下的多窗口之间能共享状态吗？
- 多窗口之间`sessionStorage`不可以共享状态！但是在某些`特定场景`下新开的页面会`复制`之前页面的`sessionStorage`
:::

::: details `EventLoop` 事件循环
- 123
:::

### 履历层面

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


