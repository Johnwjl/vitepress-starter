# computed vs watchers

## 何时使用 computed

- 对于包含响应式数据的复杂逻辑，建议使用计算属性。
- 它的唯一责任应该是基于响应式依赖计算并返回某值。
- 应更新它所依赖的源状态(响应式依赖)以触发新的计算。

## 何时使用 watchers

- 若你想要在状态变化时执行**副作用**，那么应该用 `watch` 。
  使用 `watch` 函数在任意响应式状态变化时触发回调。

- 如果您需要在一个嵌套的数据结构中 watch 多个属性，
  `watchEffect()` 可能比 `deep watcher` 更高效，
  因为它只会跟踪在回调中使用的属性，而不是递归跟踪所有属性。

## 推荐的最佳实践

- 能用 `computed` 的场景，都用 `computed` 。
- 能够使用显式控制的场景，都用`方法`函数触发。
- 涉及副作用或复杂监听的场景，才用 `watch` 。
- 尤其当你需要监听多个响应式数据的变化并执行副作用时，`watch` 是最佳选择。

```js
watch(
  () => [state.valueA, state.valueB],
  ([newA, newB], [oldA, oldB]) => {
    console.log(`valueA changed from ${oldA} to ${newA}`);
    console.log(`valueB changed from ${oldB} to ${newB}`);
  }
);
```

## 怎么理解 Vue 响应式 API ?

### computed

computed 用于派生数据，简化逻辑和提升性能。

例如：

- 用户名显示形式（fullName = firstName + ' ' + lastName）。
- 购物车的总价格（totalPrice = items.reduce(...)）。

性能优化：

- computed 会对其依赖的数据进行**缓存**，只有在依赖数据变化时才会重新计算。

示例：

```js

import { reactive, computed } from 'vue';

const state = reactive({
  firstName: 'John',
  lastName: 'Doe',
});

const fullName = computed(() => `${state.firstName} ${state.lastName`); // 派生数据

console.log(fullName.value); // 访问计算属性
state.firstName = 'Jane';
console.log(fullName.value); // 自动更新，值为 "Jane Doe"

```

### 怎么理解 ref()、reactive() 与 computed、watch

- ref() 和 reactive() 是响应式状态本身，
- watch 和 computed 是响应式逻辑的工具。

| 特性     | ref/reactive             | computed                     | watch                                 |
| -------- | ------------------------ | ---------------------------- | ------------------------------------- |
| 作用     | 定义响应式数据           | 创建派生响应式数据           | 监听数据变化，执行副作用              |
| 触发条件 | 数据被读取或修改时       | 依赖的响应式数据发生变化时   | 被监听的响应式数据发生变化时          |
| 结果     | 响应式变量               | 派生的响应式变量（缓存结果） | 执行回调函数，不产生派生数据          |
| 适用场景 | 保存原始状态或响应式对象 | 优化和组织复杂计算逻辑       | 处理副作用（如 API 调用、本地存储等） |

更多示例：

```js
// computed

const state = reactive({ a: 10, b: 20 });
const sum = computed(() => state.a + state.b); // 派生数据

// watch

watch(
  () => state.a,
  (newVal, oldVal) => {
    console.log(`state.a changed from ${oldVal} to ${newVal}`);
  }
);
```

#### ref 和 reactive 的局限性

- 没有派生功能：仅负责保存数据本身，无法直接生成基于数据的动态计算结果，需要借助 computed。
- 无法处理副作用：如果需要在数据变化时做其他操作，需要借助 watch。

1. ref() 和 reactive() 的核心是“响应式状态”，而 watch 和 computed 的核心是“响应式逻辑”。

作用对比总结：

| 工具     | 核心作用                               | 适用场景                               |
| -------- | -------------------------------------- | -------------------------------------- |
| ref      | 定义单一值的响应式数据                 | 简单值的响应式存储，比如 count         |
| reactive | 定义复杂对象的响应式数据               | 复杂状态的管理，比如用户信息、购物车等 |
| computed | 创建派生数据并优化性能                 | 基于状态的动态计算，比如合计、格式化等 |
| watch    | 监听数据变化并处理副作用（非状态逻辑） | 数据变化后调用 API、存储数据到本地等   |

### 总结：为什么需要这些 API？

1. ref() 和 reactive()：
   - 提供响应式状态，是 Vue 响应式的基础。
   - 用来保存和管理应用的原始数据。
2. computed：
   - 用于派生数据，简化计算逻辑和提高性能。
   - 适合模板中的复杂计算和需要缓存的场景。
3. watch：
   - 用于监听状态变化并处理副作用。
   - 适合处理非状态逻辑，比如 API 调用、本地存储同步等。

通过这些工具的合理搭配，可以更高效地管理 Vue 项目中的状态和逻辑，保证代码的简洁性、复用性和性能优化。

## 参考

- [computed - Vue3 Guide](https://vuejs.org/guide/essentials/computed.html)
- [watchers - Vue3 Guide](https://vuejs.org/guide/essentials/watchers.html)
