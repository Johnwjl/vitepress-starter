# Vue3 
## 组合式API（composition API）& 响应式系统
### 优势
- 更好的逻辑复用 （通过组合函数来实现更加简洁高效）
- 更灵活的代码组织 （使逻辑关注点聚焦）
- 更好的类型推导 （TypeScript友好）
- 更小的生产包体积（代码压缩更友好）
### setup()
#### 概述
- `setup()` 是组合式API的入口
- 在 beforeCreate 之前
- `setup()` 的返回值 可以是一个对象或是渲染函数
#### 参数：
- props: 第一个参数返回具有响应性的props
- context：包含attrs、slots、emit 等 非响应式属性
  
### `<script setup>`
#### 概述
  - 是什么：是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖
  - 使用setup的单文件时，无需defineComponent和return各种返回值，达到代码量更简洁的效果
  - 优势：
  	- 更少的样板内容，更简洁的代码。
  	- 顶层的绑定会被暴露给模板 (包括变量，函数声明，以及 import 导入的内容) 都能在模板中直接使用
  	- 能够使用纯 Typescript 声明 props 和发出事件
  	- 更好的运行时性能 (其模板会被编译成与其同一作用域的渲染函数，没有任何的中间代理)
  	- 更好的 IDE 类型推断性能 (减少语言服务器从代码中抽离类型的工作)


### 响应式工具
#### `ref()` 定义 `值类型` 的响应式变量
- `ref()` 返回一个带有 `.value` 属性的`ref`对象
#### `reactive()` 定义 响应式对象或数组
- `reactive()` 返回一个`proxy`对象 

#### `toRefs()` & `toRef()`
- toRefs()：用来解构props或响应式对象
```js
// 将 `props` 转为一个其中全是 ref 的对象，然后解构
const { title } = toRefs(props)
// 或者，将 `props` 的单个属性转为一个 ref
const title = toRef(props, 'title')
```

### 响应式原理

#### 111
- 在vue3.2.x新增了defineProps， defineEmits和withDefaults 语法糖，它们是服务于 script setup的，并且必须使用 defineProps 和 defineEmits API 来声明 props 和 emits

### 生命周期钩子

## 路由

## Pinia

## Vite

# TS

## TS 优势
- 强大的类型系统，拥有静态类型检查能力


### 实际项目中用到哪些

#### 静态类型约束
- 字符型：
- 数值型：
- 布尔型：


### 范型
- 定义：在定义函数、接口或类的时候，不预先指定具体的类型

## 响应式原理
- 使用`proxy`来创建响应式对象，以此来做数据劫持
- 用组件副作用渲染函数来进行依赖收集

## 全家桶
- vite (脚手架)
- typescript （类型支持）
- vitest (单元测试)
- pinia (状态管理)
- vue-router@4 (路由)

## 解读源码

### 说说vue3源码中的h函数

- Vue3中的h函数是用来创建虚拟DOM节点的函数。虚拟DOM是一种轻量级的JavaScript对象，它描述了真实DOM节点的结构和属性。Vue3中的h函数接收三个参数：标签名、属性对象和子节点数组。以下是一个使用h函数创建虚拟DOM节点的示例代码：
```js
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    title: String,
    content: String
  },
  render() {
    return h('div', {id: 'app'}, [
      h('h1', {}, this.title),
      h('p', {}, this.content)
    ])
  }
})
</script>
```
- 在上面的代码中，我们使用h函数创建了一个`<div>`元素，并添加了两个子节点`<h1>`和`<p>`。h函数的第一个参数是`标签名`，第二个参数是`属性对象`，第三个参数是`子节点数组`。
- 在Vue3中，我们可以使用h函数来创建虚拟DOM节点，然后使用render函数将虚拟DOM节点渲染为真实DOM节点。