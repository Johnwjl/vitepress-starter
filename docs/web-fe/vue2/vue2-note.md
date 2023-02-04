📒《vue.js 实战》读书笔记 & vue2 官方文档

# 五: 内置指令
…书接上篇

## 数组更新
### 修改数组
- 无法以 ```.属性```的方式直接修改数组或数组长度
- 使用 ```Vue.set()```  或是 ```this.$set()```, 或是用数组的```splice``` 来做替换

## 原生事件访问参数
### $event
- Vue 在事件函数中为我们提供了可以访问原生dom事件的参数 ```$event```
- 写法：```@click=“handleCllick(‘1’,$event)”
- 同时它也是一个vue提供的特殊变量，在组件通信中中，它被用作接收事件触发的传值。

## 修饰符
### 前置复习01 — 事件冒泡和事件捕获
- 事件流的完整触发顺序：“先捕获后冒泡”
- 事件冒泡（event bubbling）：触发顺序 — 自目标元素向外层父节点冒泡
- 事件捕获（event capturing）：触发顺序 — 自根节点往里层目标节点去捕获
### 前置复习02 — 原生event API
- event.stopPropagation();  — 阻止事件冒泡和事件捕获
- event.stopImmediatePropagation(); — 阻止同一节点的同一事件的其它事件处理程序，例如：阻止某个节点定义的其余多个点击事件。
- event.preventDefault(); — 阻止默认行为
### 前置复习03 — 事件委托（也叫 事件代理）
- 概念：把原需绑定在子元素的事件（click、keydown…）委托给父元素，让父元素担当事件监听的职务。其原理是事件冒泡。
- 比如：在ul上代理所有li的click事件。
- 优点：
	- 减少事件注册，大量节省内存占用。
	- 实现了动态绑定事件，即新增子节点时无需再次对其作事件绑定。
### 写法
- ```@click.stop=“handle”```
- 可以串联： ```@click.stop.prevent=“handle” ```
### 归纳
- .stop ：阻止事件冒泡
- .capture：设置事件捕获（一般在父级去添加）
- .prevent：阻止默认行为
- .self：只在事件目标元素本身执行，即event.target 是当前元素自身（冒泡和捕获均不会执行）
- .once：只触发一次
- .passive：立即触发默认行为
- .keyup: 键盘按键事件 （比如 .keyup.enter 、.keyup.13），修饰键（即组合键，比如：.keyup.shift.83）
- .exact: 精确控制的按键组合（比如：.ctrl.exact ，有且只有ctrl被按下的时候触发）
- 鼠标按钮修饰符：.left .right .middle（仅响应指定的鼠标行为）

## 实战：购物车
### 需求分析
#### 基础需求
- 展示一个已加入购物车的商品列表
- 每行列表包含商品的 名称、单价、数量、操作
- 实时显示商品总价
- 数量列  可以 +和-
- 操作列  删除按钮
- data层面：数据从接口动态获取、每个数据对象包含唯一ID
#### 迭代需求
- 增加选中和全选
- 商品总价是选中商品的总价
- data 变为二维数组

# 六：表单与 v-model
## v-model
### 作用：
	- 该指令用于在表单类元素上实现双向绑定
	- 用于自定义组件的值的双向绑定
### 原理：v-bind(绑定属性) 与 v-on(触发事件) 的语法糖
### 修饰符：
	- .lazy：在“change” 而非“input” 时候触发
	- . number：将输入值转为数值类型
	- . trim：去掉输入值收尾的空格

### .sync 修饰符
- 在Vue2中，由于一个组件只支持一个v-model，当我们还有另外的值也想要实现双向绑定更新时，往往用.sync修饰符来实现，而在Vue3中该修饰符已被废弃，因为v-model可以支持多个，所以.sync也就没有存在的必要了。

# 七：组件
## 组件注册
  - 全局注册：通过```Vue.component()```
  - 局部注册：通过实例的component选项
## 组件传值
### 父传子 （props）
### 子传父
    - 触发事件：子组件使用$emit来触发事件，父组件则通过v-on来监听接收这个事件
    - 抛出参数：
      - 子组件`$emit('enlarge-text', 0.1)）` 
    - 接收参数：
      - 父组件通过$event取到这个参数值 `v-on:enlarge-text="postFontSize += $event"`
      - 更多时候，父组件监听的是一个方法，那么在方法体的第一个参数就是接受的该参数值
## 单文件组件 （.vue 文件）
### 极简写法： html: pug(jade) + css: unocss/stylus
## is 与 动态组件
## 插槽slot
##


# vue2 技术栈面试题
## vue 2.0 核心
- 响应式原理
    <details>
    <summary>答案</summary>

    - 通过 Object.defineProperty 对每个属性进行监听，当对属性进行读取的时候，就会触发 getter，对属性进行设置的时候，就会触发 setter。
    - 为了可以监测对象 ，Vue2 创建了一个 Observer 类
    - Vue2 对数组的监测，是通过重写数组原型上的 7 个方法来实现
    - 实际上 Object.defineProperty 可以做到通过下标的形式可以监听数组，但却无法监听到所有数组的操作。
    - vue3 使用 proxy API 对数据实现 getter/setter 代理 ，原生支持对于数组和对象的监听。
    </details>
- vue 生命周期
    <details>
    <summary>答案</summary>
    
    8个阶段：创建前/后，载入前/后，更新前/后，销毁前/后。
    1. beforeCreate：vue实例的挂载el未定义，data未定义
    2. created：data已经定义，但未初始化。通常在这个阶段进行一些数据、资源的请求。
    3. beforeMounted:
    4. mounted: 实例挂载完毕。可以进行一些DOM操作。
    5. beforeUpdate: 在数据发生改变后，DOM 被更新之前被调用。
    6. updated: DOM重新渲染完毕之后被调用
    7. beforeDestroy：组件实例销毁之前调用。
    8. destroyed：实例销毁后调用。可以执行一些性能优化操作，清空计时器，解除绑定事件

    activated：被 keep-alive 缓存的组件激活时调用。
    deactivated： 被 keep-alive 缓存的组件失活时调用。

    </details>
- data为什么只能是函数
    <details>
    <summary>答案</summary>

    如果是对象，由于是引用类型，每个组件的data都指向内存的同一个地址，一个数据改变 其他的也都被影响
    </details>
- 组件通信
    <details>
    <summary>答案</summary>
    
    1. 父传子：props 接受传值
    2. 子传父：$emit 事件发送
    3. 兄弟组件： 中央总线 event bus，$emit 发送，$on接受
    </details>
- $nextTick 的作用
    <details>
    <summary>答案</summary>
    
    保证整个视图都被渲染之后才会运行其中的代码
    </details>
- 刷新页面后vuex值丢失
    <details>
    <summary>答案</summary>
    <pre>
    原因：因为store里的数据是保存在运行内存中的，当页面刷新会重载vue实例，store里面的数据就会被初始化
    解决：将state的数据保存在localstorage、sessionstorage或cookie中
    </pre>
    </details>

## vue router
- 权限控制
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

- 怎么重定向页面
    <details>
    <summary>答案</summary>

    在路由配置里添加redirect跳转url
    ```
    const router = new VueRouter({
        routes: [
            { path: '/a', redirect: '/b' }
        ]
    })
    ```
    </details>

## 实战技巧

### 局部刷新
- 用key属性来刷新组件，将key存储到vuex，每次刷新页面，只需要更新key进行+1


