# Composition API 综述

Vue 3 的 Composition API 是一种全新的组件逻辑组织方式，它将逻辑拆分成模块化的函数，使得代码更加灵活和易于维护，特别是在大型项目或复杂组件中。
它在 setup 函数中提供了多种工具，用于高效地定义组件逻辑。

## 核心概念

1. 组件逻辑的模块化：可以将状态、逻辑和副作用按功能分离成独立的模块。
2. 更好的代码复用性：通过自定义的函数或组合式函数封装逻辑。
3. 生命周期钩子的灵活性：可以在 setup 中使用 Vue 的生命周期钩子，无需依赖选项式 API。

## 核心工具

### setup 函数

- 定义：组件逻辑的入口函数，在组件实例创建前调用。
- 作用：
  - 初始化组件状态（如响应式数据、计算属性等）。
  - 定义方法和副作用逻辑。
  - 返回数据和方法以供模板或组件使用。

```js
import { ref } from 'vue';

export default {
  setup() {
    const message = ref('Hello, Vue 3!');
    const updateMessage = () => {
      message.value = 'Hello, Composition API!';
    };
    return { message, updateMessage };
  }
};
```

### 生命周期钩子

 • Composition API 提供的生命周期钩子：
 • onMounted：组件挂载后执行。
 • onUpdated：组件更新后执行。
 • onUnmounted：组件卸载时执行。
 • 其他：onBeforeMount、onBeforeUpdate、onBeforeUnmount 等。

示例：

```js

import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const count = ref(0);

    const increment = () => {
      count.value++;
    };

    onMounted(() => {
      console.log('Component Mounted');
    });

    onUnmounted(() => {
      console.log('Component Unmounted');
    });

    return { count, increment };
  }
};
```

### 响应式 API

响应式 API 是 Composition API 中用于创建和管理响应式数据的核心工具集。

#### ref

 • 定义：用于定义一个响应式的单值。
 • 特点：
 • 适用于基本数据类型（如 number、string 等）。
 • 通过 .value 访问和修改值。

示例：

```js

import { ref } from 'vue';

const count = ref(0);
console.log(count.value); // 0
count.value++;
console.log(count.value); // 1
```

#### reactive

 • 定义：用于定义一个响应式的对象或数组。
 • 特点：
 • 自动深度响应式。
 • 更适合定义复杂数据结构。

示例：

```js

import { reactive } from 'vue';

const state = reactive({
  name: 'Vue 3',
  version: '3.x'
});

state.version = '3.1'; // 响应式更新
console.log(state.version); // 3.1
```

#### computed

 • 定义：用于创建基于响应式数据的计算属性。
 • 特点：
 • 默认只读，可以通过传入 set 方法定义可写计算属性。

示例：

```js

import { ref, computed } from 'vue';

const count = ref(0);
const doubleCount = computed(() => count.value * 2);

count.value++;
console.log(doubleCount.value); // 2
```

#### watch

 • 定义：用于监听响应式数据或计算属性的变化。
 • 特点：
 • 提供精确的依赖跟踪。
 • 可用于触发异步操作或副作用。

示例：

```js

import { ref, watch } from 'vue';

const count = ref(0);

watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`);
});

count.value++;
```

#### watchEffect

 • 定义：立即执行一个响应式副作用，并在依赖变化时重新执行。
 • 特点：
 • 自动追踪所有使用的响应式数据。
 • 不需要显式声明依赖。

示例：

```js

import { ref, watchEffect } from 'vue';

const count = ref(0);

watchEffect(() => {
  console.log(`Count is: ${count.value}`);
});

count.value++; // 会触发 watchEffect
```

### 组合式函数

 • 定义：通过封装逻辑在函数中，提升代码复用性和模块化。
 • 作用：
 • 独立逻辑模块，适用于多个组件。
 • 提高代码的可读性和测试性。

示例：

```js

import { ref } from 'vue';

export function useCounter() {
  const count = ref(0);
  const increment = () => {
    count.value++;
  };
  return { count, increment };
}
```

在组件中使用：

```js

import { useCounter } from './useCounter';

export default {
  setup() {
    const { count, increment } = useCounter();
    return { count, increment };
  }
};
```

## 特点对比（与选项式 API）

| 特性     | Composition API (Vue3)     | 选项式 API (Vue2)                      |
| -------- | -------------------------- | -------------------------------------- |
| 逻辑复用 | 更容易复用逻辑，函数模块化 | 通过 mixins，灵活性较低                |
| 代码组织 | 逻辑集中在功能块中         | 逻辑分散到多个选项（data、methods 等） |
| 类型支持 | 更好地支持 TypeScript      | 类型支持较弱                           |
| 学习曲线 | 稍陡峭，需理解响应式 API   | 较平缓，易上手                         |

## 总结

Composition API 是 Vue 3 的一大亮点，通过响应式 API 和模块化的逻辑组织方式，极大提升了开发的灵活性和效率。
它适合复杂项目的开发和维护，而响应式 API 则是其核心基础，可以独立使用或作为组件逻辑的重要工具。
