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

::: details Vue 生命周期钩子 有哪些？
- 8个阶段：创建前/后，载入前/后，更新前/后，销毁前/后。
:::

::: details Vue 常用的指令 有哪些？
- v-if , v-show , v-for , v-bind , v-model
:::

::: details Vue 自定义指令 你用过吗？
- v-if , v-show , v-for , v-bind , v-model
:::

::: details Vue 你常用的修饰符 有哪些？
- stop , prevent , trim , number
:::

::: details Vue 组件间传值方式有哪些？
- v-if , v-show , v-for , v-bind , v-model
:::

::: details `hash` 和 `history` 两种路由的区别
- `hash`模式下，URL中会带有`#`，通过监听URL中hash部分的变化，从而做出对应的渲染逻辑
- `history` 则是 通过 HTML5 的 history API 来实现 路由的跳转
:::

::: details Vue 路由导航 & 权限控制 ，你是怎么实现的？
- 登录以后，后端接口会返回当前用户可访问的完整路由菜单
- 拿这张动态路由表与我们前端自己的静态路由表做比对和筛选，从而展示出当前用户权限下的菜单
::: 

::: details 项目中碰到过的实际问题及解决方案？
- 在vue项目的开发中，遇到过的典型问题之一就是 `vuex状态存储数据在刷新后丢失`，围绕如何将`vuex持久化存储`去解决这个问题。
  - 解决问题的前提是定位问题。因为Vuex里的数据是保存在运行内存中的，当页面刷新时，页面会重新加载Vue实例，Vuex里面的数据就会被重新赋值。
  - 第一种解决方案 是 同时将数据存在 sessionstorge，页面刷新初始化阶段vuex通过接收sessionStorage的数据来进行数据响应式。
  - 第二种解决方案，使用 vue-persistedstate (一款 vuex 持久化插件)，安装后通过配置plugins来接入vuex持久化存储的能力。
- 另一个经典的问题是在 Vue使用Echart时init初始化失败，debug提示获取不到DOM元素
  - 定位问题的时候，首先想到可能是由于`页面元素渲染顺序`的问题。一般是由于`v-if`条件渲染或是`v-show`切换tab页，又或者是存在`animation`动画或`transition`过渡效果，导致目标元素要延迟几毫秒才出现，而该Dom元素的相关事件操作则先行了一步。
  - 解决方案，一般是在Echart初始化方法添加`this.$nextTick`,等当前元素或动画帧渲染完毕才执行后续事件操作。
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

::: details ES6中你常用的知识
- Vue2是通过 Object.defineProperty 去监听属性的 getter 和 setter,
- Vue3 是通过 Proxy API 实现对属性的 getter 和 setter  的代理，并原生支持对数组和对象的监听。
:::

::: details let const var 区别
- Vue2是通过 Object.defineProperty 去监听属性的 getter 和 setter,
- Vue3 是通过 Proxy API 实现对属性的 getter 和 setter  的代理，并原生支持对数组和对象的监听。
:::

::: details promise 有几种状态
- pending fullfill reject
- Vue3 是通过 Proxy API 实现对属性的 getter 和 setter  的代理，并原生支持对数组和对象的监听。
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


