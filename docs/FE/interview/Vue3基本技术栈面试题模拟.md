# Vue3基本技术栈面试题模拟

## Vue 3 Composition API

### 为什么 Vue 3 引入 Composition API？它和 Options API 有什么区别？

Vue 3 引入 Composition API 主要是为了解决以下几个问题：

- 逻辑复用：在 Options API 中，不同的功能模块分散在生命周期钩子、methods、computed 等选项中，代码逻辑不易复用。Composition API 允许将逻辑提取到单一的函数中，从而更好地实现复用。
- 更清晰的代码组织：在大型项目中，Composition API 提供了更灵活的代码组织方式，使代码结构更加清晰。
- 更好的 TypeScript 支持：Composition API 中的逻辑以函数形式组织，更易于添加类型定义，且可在 TypeScript 下获得更好的类型推断。

Options API 使用固定的选项如 data、methods、computed 等来声明组件的逻辑，
而 Composition API 则通过 setup 函数在组件创建时声明和组织逻辑，能够集中管理逻辑且支持灵活的函数组合和复用。

### setup 函数的作用是什么？它在哪些生命周期之前或之后调用？

setup 函数是 Vue 3 中 Composition API 的入口，在组件初始化时被调用。它允许开发者在生命周期之前声明和定义组件逻辑，提供了更大的灵活性。

调用时机：setup 在 beforeCreate 和 created 生命周期之前调用。
作用：用于定义响应式状态、计算属性、方法、生命周期钩子等。

setup 函数在组件创建时执行一次，可返回组件实例公开的对象。它不会访问 this，因为此时组件实例尚未完全创建。

### 如何使用 ref 和 reactive？它们的区别是什么？

- ref：用于声明基础数据类型（如字符串、数字）或单个引用的响应式变量。ref 的值可以通过 .value 访问。
- reactive：用于声明复杂的对象（如对象、数组等）的响应式数据，使整个对象成为响应式。

区别：

- ref 用于单个值或变量，尤其是基本数据类型。更改 ref 的值需要通过 .value。
- reactive 通常用于对象，会递归地使对象中的属性响应式。更改对象的属性值时不需要 .value，直接操作属性即可。

#### 分别如何更新 ref 和 reactive 这样的响应式变量？

- ref 更新方式：使用 .value 更新基本数据类型，或直接更新其内部属性（如对象类型）。
- reactive 更新方式：直接修改对象的属性即可，Vue 会自动追踪。

### 如何在 Composition API 中使用 computed？有哪些典型的应用场景？

computed 是用于定义基于其他响应式状态的计算属性。
节省重复计算的成本，仅在依赖数据发生变化时更新计算。

### watch 和 watchEffect 有什么区别？在什么情况下使用 watch 更合适？

- watch：用于监听特定的响应式数据，适合用于处理依赖明确的副作用，如深层数据变更时的响应。
- watchEffect：自动跟踪所有响应式依赖并触发副作用。适合不需要明确指定依赖的情况，常用于快速测试或监视。

### Composition API 中如何复用逻辑？与 Vue 2 中的混入（mixins）相比有什么优点？

在 Composition API 中，可以通过 自定义钩子函数（通常以 useXxx 命名）来实现逻辑复用。这些钩子函数类似函数组件，能够封装特定的逻辑并复用。

相比 Vue 2 中的 mixins，Composition API 的逻辑复用优势在于：

- 清晰性和可读性：自定义钩子函数明确表明功能，避免了 mixins 中属性命名冲突的问题。
- 更好的逻辑抽离：每个钩子函数负责独立的功能模块，增强了代码的可维护性。

```js
// useCounter.js
import { ref } from 'vue';

export function useCounter() {
  const count = ref(0);
  const increment = () => count.value++;
  return { count, increment };
}

// 组件中使用 useCounter
import { useCounter } from './useCounter';

export default {
  setup() {
    const { count, increment } = useCounter();
    return { count, increment };
  }
}
```