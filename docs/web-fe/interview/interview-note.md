# 面试知识点梳理

## Vue

#### 概念原理

::: details MVVM & 数据驱动
- MVVM：Model-View-ViewModel (模型-视图-视图模型)
- `ViewModel`是`MVVM`软件架构的核心，视图的状态（展示）和行为（交互）都封装在`ViewModel`。
- `ViewModel` 包含`Data Bindings`和`DOM Listeners`。`Data Bindings`用于将数据绑定到`View`上显示，`DOM Listeners`用于监听操作。
- 由于实现了双向绑定，`ViewModel`和`View`的任何变化都会使彼此同步更新，不需要再手动操作DOM。 
- 在MVVM框架中，你只需要处理和维护`ViewModel`，更新数据视图就会自动更新，这就是数据驱动。
:::

::: details 单向数据流
单向数据流（unidirectional data flow），简单的讲：用户访问View，View发出用户交互的Action，在Action里对state进行相应更新。 state更新后会触发View更新页面的过程。 这样数据总是清晰的单向进行流动，便于维护并且可以预测。
:::
::: details 响应式原理 （双向绑定原理）
1. 通过 Object.defineProperty 对每个属性进行监听，当对属性进行读取的时候，就会触发 getter，对属性进行设置的时候，就会触发 setter。
2. 为了可以监测对象 ，Vue2 创建了一个 Observer 类
3. Vue2 对数组的监测，是通过重写数组原型上的 7 个方法来实现
4. 实际上 Object.defineProperty 可以做到通过下标的形式可以监听数组，但却无法监听到所有数组的操作。
5. vue3 使用 proxy API 对数据实现 getter/setter 代理 ，原生支持对于数组和对象的监听。
:::
::: details 单向数据流
单向数据流（unidirectional data flow），简单的说是指：用户访问View，View发出用户交互的Action，在Action里对state进行相应更新。 state更新后会触发View更新页面的过程。 这样数据总是清晰的单向进行流动，便于维护并且可以预测。
:::

- 响应式原理 （双向绑定原理）
  1. 通过 Object.defineProperty 对每个属性进行监听，当对属性进行读取的时候，就会触发 getter，对属性进行设置的时候，就会触发 setter。
  2. 为了可以监测对象 ，Vue2 创建了一个 Observer 类
  3. Vue2 对数组的监测，是通过重写数组原型上的 7 个方法来实现
  4. 实际上 Object.defineProperty 可以做到通过下标的形式可以监听数组，但却无法监听到所有数组的操作。
  5. vue3 使用 proxy API 对数据实现 getter/setter 代理 ，原生支持对于数组和对象的监听。
- 如何阐述 虚拟dom 和 diff算法
  - template模版会被vue处理成虚拟dom结构（本质上是js对象），当虚拟dom变更、会利用diff算法去找不同，只更新变化的部分(重绘/回流)到页面（也叫打补丁）
  - 优势：
    - 提高了更新DOM的性能，不会将页面全部删除再渲染一遍
    - 虚拟dom只包含必要的属性，处理虚拟dom体积更小、不会像真实dom有上百个属性
    - 虚拟DOM保存在内存中, 只记录真实dom的关键信息, 配合diff算法提高DOM更新的性能，在内存中比较差异, 然后给真实DOM打补丁达到更新。
- tree-shaking

#### 生命周期
- 8个阶段：创建前/后，载入前/后，更新前/后，销毁前/后。
1. beforeCreate：data和el均未初始化，值为undefined
2. created：data和 props 均可访问。但el尚未挂载。通常在这个阶段进行一些数据初始化、资源的请求。
3. beforeMounted: $el 未被挂载
4. mounted: el挂载完毕。可以进行一些业务逻辑、DOM操作。$ref在此时也是可以访问的。
5. beforeUpdate: 在数据发生改变后，DOM 被更新之前被调用。在此时访问现有的Dom，手动移除一些添加的监听事件。
6. updated: DOM重新渲染完毕之后被调用
7. beforeDestroy：组件实例销毁之前调用。销毁定时器，解绑全局事件(比如 addEventListener 监听的事件)，销毁插件对象
8. destroyed：实例销毁后调用。可以执行一些性能优化操作，清空计时器，解除绑定事件。
- 父子组件的生命周期顺序
加载渲染：父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
更新：父beforeUpdate->子beforeUpdate->子updated->父updated
销毁：父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
- 生命周期内的this指向vue实例

#### keep alive 

Vue提供了内置组件 keep-alive 来缓存组件内部状态，避免重新渲染。

- 属性：
1. include字符串或正则表达式。只有名称匹配的组件会被缓存。
2. exclude字符串或正则表达式。任何名称匹配的组件都不会被缓存。
3. exclude的优先级大于include
4. max数字。最多可以缓存多少组件实例
- 两个钩子函数：
1. activated：第一次进入缓存路由/组件，在mounted后面，beforeRouteEnter守卫传给 next的回调函数之前调用
2. deactivated：使用了keep-alive就不会调用beforeDestroy(组件销毁前钩子)和destroyed(组件销毁)，因为组件没被销毁，被缓存起来了。
- 如何在keep-alive 中 触发局部重渲染


#### 组件通信

- 几种组件间传值
 1. 父传子：props 接受传值
 2. 子传父：$emit 事件发送
 3. 兄弟组件： 中央总线 event bus，$emit 发送，$on接受
- 父组件获取子组件
	- this.$refs.组件名 （this.$refs 也可用来获取Dom）

#### computed watch
- computed
  - computed（计算属性）的结果会被缓存，除非依赖变化才会重新计算
  - 如果想要直接赋值, 需要使用完整写法 （set get）
- watch
  - 两个参数 ：newVal, oldVal 
  - immediate: true, // 立即执行
  - deep: true, // 深度侦听复杂类型内变化
- 两者对比：
  - 当模板中的某个值需要通过依赖一个或多个数据计算得到时，就可以使用计算属性，计算属性的函数不接受参数；
  - 监听属性主要是监听某个值发生变化后，对新值去进行逻辑处理。当需要在数据变化时执行异步操作或开销较大的操作时，使用watch
- 因为箭头函数是绑定的父级上下文作用域，无法将this指向vue实例，因此 computed、watch的写法都不能是箭头函数，只能是普通函数。

#### 指令和修饰符
- vue 常用指令 及作用
	- v-model
	- v-if 和 v-show
    	- v-if 是真正的条件渲染，v-show 只是css层面的显示隐藏。
    	- v-show 更适合元素频繁切换的场景，v-if则相反。
	- v-for
    	- key的作用： key能跟踪每个节点的身份，以便重用和重新排序现有元素。v-for遵循就地更新的策略，当数据变更时，新旧虚拟DOM对比, key存在就复用, 如果不存在就直接建一个新的，从而提高遍历时的性能。
    	- 当v-for的数据发生了变更：
          1. 改变原数组的方法, 会导致v-for更新, 页面更新渲染
          2. 返回新数组的方法, 不会导致v-for更新, 可采用 ```覆盖数组``` 或 ```this.$set()``` 来解决
        - vue 重写了以下变更数组的方法：push()、pop()、shift()、unshift()、splice()、sort()、reverse()
	- v-bind
    	- 通常用简写引号来表示
        - 绑定动态属性,简写为 ```：```, 如：用v-bind给标签class设置动态的值 ```:class```
    	- ```:class``` 可以是 ```data``` 和 ```computed```, 可以是数组也可以是对象，支持三元表达式。
  	- v-on : 绑定事件，简写为 @，如 ```@click```
    - v-once
	- v-html
- vue 常用修饰符及作用
	- prevent
	- stop
	- sync
	- number
	- trim

#### 过滤器
- 作用：过滤器就是一个函数, 传入值返回处理后的值。用于转换格式。（过滤器应当用作简单的文本格式转换，更复杂的数据变换应用计算属性）
- 用法：Vue.filter 或者 filters 选项 
- 在main.js中全局注册, 一处注册到处使用
- 可同时使用多个过滤器, 或者给过滤器传参
- Vue3用函数替代了过滤器.

#### $nextTick 的作用
- 保证整个视图都被渲染之后才会运行其中的代码

#### 如何进行局部刷新渲染
- 用key属性来刷新组件，将key存储到vuex，每次刷新页面，只需要更新key进行+1

#### 插槽
- 作用：
- 使用：


## 路由

#### 路由基础
- 路由跳转的几种写法实
  1. router-link
	```js
	<router-link :to="{name:'home'}"> 
	<router-link :to="{path:'/home'}"> //name,path都行, 建议用name  
	// 注意：router-link中链接如果是'/'开始就是从根路由开始，如果开始不带'/'，则从当前路由开始。
	// 传参
	<router-link :to="{name:'home', params: {id:1}}"> 
	<router-link :to="{name:'home', query: {id:1}}"> 
	```
  2. this.$router.push()
```js
this.$router.push({name:'home',query: {id:'1'}})
this.$router.push({path:'/home',query: {id:'1'}})
 this.$router.push({name:'home',params: {id:'1'}})  // 只能用 name
```
  3. this.$router.replace() 和 this.$router.push() 作用和用法相同，那么两者有什么区别？
- this.$router.push 跳转到指定url路径，并想history栈中添加一个记录，点击后退会返回到上一个页面
- this.$router.replace 跳转到指定url路径，但是history栈中不会有记录，点击返回会跳转到上上个页面 (就是直接替换了当前页面)

	- 页面刷新 传参丢失吗

	- 实现动态路由
	- 路由懒加载
	- params 和query 参数的区别

#### 权限控制
1. 接口权限
    采用 JWT（Json Web Token）做接口权限校验。没有通过就返回401，路由挑转至登陆页做登陆鉴权，
    登录完拿到token存起来。通过axios请求拦截器进行拦截，每次请求时候头部携带token。

        ```js
        axios.interceptors.request.use(config => {
            config.headers['token'] = cookie.get('token')
            return config
        })
        axios.interceptors.response.use(res=>{},{response}=>{
            if (response.data.code === 40099 || response.data.code === 40098) { //token过期或者错误
                router.push('/login')
            }
        })
        ```
2. 按钮权限
- 通过自定义指令的方式 通过路由权限去动态渲染按钮
3. 路由菜单权限
- 前端定义路由、做路由守卫，与后端返回的菜单信息做比对
- 两种方式：
    1. 动态生成路由表（addRoutes）
    2. 路由元信息（meta）里添加roles

#### 怎么重定向页面
- 在路由配置里添加redirect跳转url
    ```
    const router = new VueRouter({
        routes: [
            { path: '/a', redirect: '/b' }
        ]
    })
    ```
#### 登陆鉴权
- token JWT

## 请求

#### axios 使用 及二次封装

#### http 常见状态码

#### get post delete put


## 组件封装


## vuex

#### 基本使用
- action 定义哪几个参数，怎么传参
- mutations actions dispatch commit

#### 刷新页面后vuex值丢失
- 原因：因为store里的数据是保存在运行内存中的，当页面刷新会重载vue实例，store里面的数据就会被初始化
- 解决：将state的数据保存在localstorage、sessionstorage或cookie中

## 构建

### webpack

### loader & 插件

### 打包优化

#### 数组扁平化
- 
#### 箭头函数 
- 箭头函数没有自己的this，而是绑定了父级作用域的上下文。因此箭头函数的this永远指向其父级作用域。
- 和普通函数的区别：
  1. 在写法上箭头函数使用箭头定义。
  2. 箭头函数全部是匿名函数，而普通函数可以是匿名也可以是具名。
  3. 在普通函数中，this 总是指向调用它的对象，如果用作构造函数，它指向创建的对象实例。
  4. 箭头函数不能用于构造函数；不能用于vue 的侦听器watch
  5. 箭头函数不具有 arguments 对象; 普通函数内部都有自己的 arguments，用来记录实参。
- promise 的参数 ，几种状态
- 解构赋值

#### 数组常用方法大全

|       |                    方法名                    |                                      作用                                      |                        返回值                         |
| :---: | :------------------------------------------: | :----------------------------------------------------------------------------: | :---------------------------------------------------: |
|       |                      --                      |                                       --                                       |                          --                           |
|       |            以下是改变原数组的方法            |                                                                                |                                                       |
|       |                      --                      |                                       --                                       |                          --                           |
|   1   |                    push()                    |                          在数组末尾添加一个或多个元素                          |                   返回数组新length                    |
|   2   |                    pop()                     |                            从数组中删除最后一个元素                            |                   返回被删元素的值                    |
|   3   |                   shift()                    |                             从数组中删除第一个元素                             |                   返回被删元素的值                    |
|   4   |                  unshift()                   |                          在数组开头添加一个或多个元素                          |                   返回数组新length                    |
|   5   |                   splice()                   |                              对数组进行增删改操作                              |              以数组形式返回被修改的内容               |
|   6   |                  reverse()                   |                                  颠倒数组顺序                                  |                     反转后的数组                      |
|   7   |                    sort()                    |                                   对数组排序                                   |                     排序后的数组                      |
|   8   |                  forEach()                   |                               遍历数组并批量操作                               |                       undefined                       |
|       |                      --                      |                                       --                                       |                          --                           |
|       |            以下是返回新数组的方法            |                                                                                |                                                       |
|       |                      --                      |                                       --                                       |                          --                           |
|   1   |                    map()                     |                              对数组项进行处理映射                              |                 返回处理后映射的数组                  |
|   2   |                   filter()                   |                            对数组项进行条件筛选过滤                            |                  返回过滤后的新数组                   |
|   3   |                   concat()                   |                                对数组项进行合并                                |                  返回合并后的新数组                   |
|   4   |                   slice()                    |               对数组进行截取后的浅拷贝（包含 begin、不包含end）                |               返回截取后的浅拷贝新数组                |
|   5   |                    flat()                    | 数组扁平化 <br>（Infinity 关键字作为参数时，无论多少层嵌套，都会转为一维数组） |                 返回扁平化后的新数组                  |
|   6   |                 Array.from()                 |           对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。           |                 返回一个新的数组实例                  |
|       |                      --                      |                                       --                                       |                          --                           |
|       | 以下是 既不改变原数组、也不返回新数组 的方法 |                                                                                |                                                       |
|       |                      --                      |                                       --                                       |                          --                           |
|   1   |                     at()                     |                     接收一个整数值，并返回该索引对应的元素                     |      返回索引对应的元素，找不到则返回 undefined       |
|   2   |                  indexOf()                   |                       搜索 某元素 并返回第一个匹配的索引                       |         返回第一个匹配的索引，找不到则返回 -1         |
|   3   |                lastIndexOf()                 |                              indexOf()的逆向索引                               | 返回```从末尾开始```第一个匹配的索引，找不到则返回 -1 |
|   4   |                    find()                    |                             找到满足条件的第一个值                             |                       返回该值                        |
|   5   |                  findLast()                  |                            找到满足条件的最后一个值                            |                       返回该值                        |
|   6   |                 findIndex()                  |                           找到满足条件的第一个值索引                           |             返回该索引号，找不到则返回 -1             |
|   7   |               findLastIndex()                |                          找到满足条件的最后一个值索引                          |             返回该索引号，找不到则返回 -1             |
|   8   |                  includes()                  |                        判断一个数组是否包含一个指定的值                        |         如果包含则返回 true，否则返回 false。         |
|   9   |                    join()                    |                                  数组转字符串                                  |                      返回字符串                       |
|  10   |                  toString()                  |                                  数组转字符串                                  |                      返回字符串                       |
|  11   |                   every()                    |                  对数组项进行校验，只要有一项通过了就返回true                  |                        boolean                        |
|  12   |                    some()                    |                   对数组项进行校验，所有项都通过了才返回true                   |                        boolean                        |
|  13   |                   reduce()                   |                                   递归调处理                                   |            返回的最后一次递归回调的返回值             |
|  14   |                reduceRight()                 |                        类似于reduce()，数组从右往左递归                        |            返回的最后一次递归回调的返回值             |
|  15   |               Array.isArray()                |                        用于确定传递的值是否是一个 Array                        |            是则返回 true，否则返回 false。            |
|  16   |                    keys()                    |              返回一个包含数组中每个索引键的 Array Iterator 对象。              |              一个新的 Array 迭代器对象。              |
|  17   |                   values()                   |              返回一个包含数组中每个索引值的 Array Iterator 对象。              |              一个新的 Array 迭代器对象。              |
|  18   |                  entries()                   |                                    [0, 'a']                                    |            返回一个新的 Array 迭代器对象。            |


- map filter forEach 区别
#### 对象常用的方法有哪些
  - keys()、values()、entries()：分别返回 对象的 键、值、键值对 的迭代器（数组）
  - fromEntries()：Object.entries()的逆操作，用于将一个键值对数组转为对象。
#### 字符串常用方法
  - 
- promise 使用场景 代码实践 原理 解决了哪些问题
- async/await 



- 跨域
- 事件冒泡、事件捕获
- event-loop 事件循环机制
- 本地存储 cookie sessionStorage localStorage

# CSS

### CSS 基础

#### 几种方式实现元素的水平和垂直居中

#### 标准盒模型
- （w3c盒模型）（content-box）/ IE盒模型（怪异盒模型）(border-box)
- content 包括 padding 与 border
- boxsizing: border-box 设为 IE盒模型


#### 不同屏幕尺寸的适配兼容 

#### 回流、重绘、重排

#### flex 布局 哪些属性和参数

#### 移动端适配 怎么适配刘海屏


### CSS3

#### CSS3 新特性 有哪些？ 实际用过哪些？

### 预处理器

# 其他

### 项目常问

#### 就两个你主要负责的项目讲一下
上一份工作中主要负责政府交通道路智慧大屏项目，

#### 在这开发中你遇到哪些难点问题，你是怎么解决的


### 工作流

#### 你们团队在开发中是如何进行git分支管理的
- 分支管理：master、dev（自己本人的本地分支）


###  代码细节实践

#### 性能优化手段有哪些
#### 白屏问题如何去排查
#### 在 element ui 自带的API里，想要增加自己自定义的参数？
- 包一层自己的函数？
#### 接受从后台传过来的对象上，想要增加自定义的属性？
#### 点击提交按钮进行路由跳转，url后面只出现问号是怎么回事？
#### 针对行列完全动态渲染的table列表，渲染后发生样式错位了怎么处理？
#### 大数据量下的列表渲染卡顿问题如何解决？
-  滚动分页懒加载 虚拟滚动
#### 金额回显和计算校验，保留两位小数
#### 前端文件导出如何实现

# js 面试题
- 前端性能优化
    <details>
    <summary>答案</summary>
    <pre>
    - 减少 HTTP 请求
    - 使用字体图标代替图片图标
    - 压缩前端资源文件
    - 图片懒加载/延时加载
    - 使用 flexbox 而不是较早的布局模型
    </pre>
    </details>