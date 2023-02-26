# 02. Login & Router & Permissions

## 一. 搭建登录模块

- 创建登录的代码文件模块 (`src/views/account/AccountLogin.vue`)

- 配置路由 `router/index.js`
```ts
    // Home
    {
      path: '/',
      name: 'home',
      redirect: 'Login'
    },
    // Login
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/account/AccountLogin.vue')
    }
```

- 写静态页面

::: details Fixed Bug
1. `[ts] must use 'import type' `
     - Error Info : 
     ```sh
     This import is never used as a value and must use 'import type' because 'importsNotUsedAsValues' is set to 'error'.
     ```
     - Bug Fixed : **将 `import` 改为 `import type`**
     ```js
     // AccountLogin.vue

     import type { ElForm } from 'element-ui/types/form'
     ```
2. `[ts] Property '$refs' does not exist `
    - Error Info : 
    ```sh
    Property '$refs' does not exist on type '{ login(): void; }'.
    ```
    - Bug Fixed : 
    在`Vue2.x`中使用`TypeScript`，需要引用 `vue-property-decorator`。
    [vue-property-decorator 使用](../vue2-note-details//vue-property-decorator.md)
    ```ts
    // AccountLogin.vue
    <script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'

    @Component
    export default class extends Vue { 
    }
    </script>
    ```
:::