# 文档篇
## 组合式API（Composition API）的特点？
- 更好的逻辑复用 （通过组合函数来实现更加简洁高效）
- 更灵活的代码组织 （使逻辑关注点聚焦）
- 更好的类型推导 （TypeScript友好）
- 更小的生产包体积（代码压缩更友好）

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