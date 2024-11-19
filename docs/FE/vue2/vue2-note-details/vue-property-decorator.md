# vue-property-decorator 使用

<br>

> 在`Vue2.x`中使用`TypeScript`，需要引入 `vue-property-decorator`。

> `vue-property-decorator` 完全依赖于 `vue-class-component`，因此在使用 `vue-property-decorator` 之前可以先了解下 `vue-class-component`。

> `vue-property-decorator` 把 `Vue2.x` 声明式写法(即`选项式API`)通过`ES6装饰器`的方式，改造成构造函数式的写法，主要目的是让Vue的开发模式更工程化。

## install

- `npm i -S vue vue-class-component`
- `npm i -S vue-property-decorator`

## usage

### 包含：

<br>

#### 一些装饰器：

- @Ref
- @Prop
- @PropSync
- @Emit
- @Model
- @ModelSync
- @VModel
- @Watch
- @Provide
- @Inject
- @ProvideReactive
- @InjectReactive
- @Component (由 vue-class-component 提供)

#### 一个函数：

- Mixins (mixins 函数 由 vue-class-component 提供)

### 无子组件
```ts
// @Component 即使没有组件 也不能省略@Component，否则会报错。
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class extends Vue { 
}
</script>
```
### 有子组件

<br>

#### 组件引用
```ts
import { Component, Vue } from "vue-property-decorator";
import DemoComponent"./DemoComponent.vue";
@Component({
  components: {
    DemoComponent
  }
})
export default class YourComponent extends Vue { 
}
```
#### 父子组件间传值
```ts
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
 
@Component
export default class YourComponent extends Vue {
  @Prop(Number) readonly propA: number | undefined 
}
</script>
```
- 相当于
```js
export default {
  props: {
    propA: {
      type: Number,
    } 
  },
}
```

## Bug Fixed

::: details [ts] 使用 `@Component` vscode 提示ts错误  
- Error Info: 
  ```sh
  对修饰器的实验支持功能在将来的版本中可能更改。在 "tsconfig" 或 "jsconfig" 中设置 "experimentalDecorators" 选项以删除此警告。
  ```
- Bug Fixed:
  - 项目目录中有三个 tsconfig 配置文件，分别是 `tsconfig.json` `tsconfig.app.json` `tsconfig.config.json` ,  `tsconfig.json`中引入了其余两个配置文件。经试验，只在 `tsconfig.app.json`中加入该条配置生效（vscode需重新打开项目窗口）
    ```json
    // tsconfig.json

    "references": [
        {
        "path": "./tsconfig.config.json"
        },
        {
        "path": "./tsconfig.app.json"
        },
        {
        "path": "./tsconfig.vitest.json"
        }
    ],
    ```
    ```json{6}
    // tsconfig.app.json

    {
    "compilerOptions": {
        ...
        "experimentalDecorators": true,
    },
    ...
    }
    ```
:::

## 参考

- [vue-property-decorator用法介绍](https://juejin.cn/post/6991816711473201183)