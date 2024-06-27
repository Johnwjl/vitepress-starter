# 跟着官方文档一步步重学 Vue3 - 01

## 创建项目

```sh
nvm current  // 查看最新的node版本
nvm use 22.2.0 // 切换当前最新版本
``` 

```sh
bun create vue@latest // 创建官方脚手架项目
```

此时会出现一些可配置项：
```sh
Project name: … learn-create-vue3
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit Testing? … No / Yes
✔ Add an End-to-End Testing Solution? › No
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
✔ Add Vue DevTools 7 extension for debugging? (experimental) … No / Yes
```
目前我仅勾选了：`ESLint`、`Prettier`、`Vue DevTools`，
未来再根据项目需求逐步添加的：`Vue Router`、`Pinia`、`TypeScript`、`Vitest`、`JSX Support`、`End-to-End Testing`

按提示步骤运行启动项目：
```sh
cd learn-create-vue3
bun install
bun format
bun dev
```

启动页上有一些Vue3技术栈生态的官网：

- [Vue](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [VSCode](https://code.visualstudio.com/)
- [Volar(Vue - Official)](https://github.com/vuejs/language-tools)
- [Vue Devtools](https://github.com/vuejs/devtools)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Cypress](https://www.cypress.io/)
- [Cypress 组件测试](https://docs.cypress.io/guides/component-testing/overview)
- [Vitest](https://vitest.dev/)
- [awesome-vue](https://github.com/vuejs/awesome-vue?tab=readme-ov-file#resources)
- [Vue Land - Discord](https://discord.com/invite/vue)
- [Vue.js - StackOverflow](https://stackoverflow.com/questions/tagged/vue.js)
- [Vue.js News](https://news.vuejs.org/)
- [@vuejs - Twitter](https://twitter.com/vuejs)

其他官网:

- [bun](https://bun.sh/)

## 初探 Vue3 的响应式系统是如何工作的 

在[响应式基础](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html)这一篇中，初步讨论了 Vue3 的响应式系统是如何工作的。

通过 getter 和 setter 方法来拦截`ref`对象的`.value `属性的 get 和 set 操作，以此实现依赖追踪和自动检测监听`ref`这样的响应式变量。

Ref 会使它的值具有深层响应性。这意味着即使改变嵌套对象或数组时，变化也会被检测到

而对于 `reactive()`(响应式对象)，它是基于Js的proxy对象的代理特性，Vue因此能够拦截对响应式对象所有属性的访问和修改，以便进行依赖追踪和触发更新。

## DOM更新后执行代码

等待 DOM 更新完成后再执行代码，使用 `nextTick()` 全局API

```js
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // 现在 DOM 已经更新了
  // ...
}
```

## 计算属性

使用[计算属性](https://cn.vuejs.org/guide/essentials/computed.html)来描述**依赖响应式状态**的复杂逻辑。

计算属性值会基于其响应式依赖被缓存。一个计算属性仅会在其响应式依赖更新时才重新计算。
