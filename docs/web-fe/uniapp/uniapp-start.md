# uni-app 起步

## 创建项目

安装 HBuilderX 代码编辑器

文件 -> 新建 -> 项目（快捷键Ctrl+N）

选择 uni-ui 项目模板，日常开发推荐使用该模板，已内置大量常用组件。

将 HBuilderX 和 微信开发者工具 更新到最新版本

微信开发者工具，微信扫码登录，并填入测试号appid

登录 HBuilderX，以更新依赖（在 项目的 uni_modules 目录 右键， `从插件市场更新所有插件`）

### 目录结构

```sh
├── api/               # 接口模块
├── components/        # 公共组件
├── pages/             # 页面文件
├── stores/            # Pinia 状态管理
├── utils/             # 工具函数和公共逻辑
├── App.vue            # 应用入口
├── main.js            # 入口js
```

#### uni_modules

在 `uni_modules` 目录 右键，`从插件市场更新所有插件`

`uni_modules` 是需要一并提交到 Git 仓库，因为 `uni_modules` **没有**依赖包管理机制。

而 `node_modules` 有 `package.json` 这样的依赖信息文件，可以从包管理器拉取（npm install）

## 全局文件

### App.vue

应用生命周期仅可在App.vue中监听

- onLaunch: 初始化完成时触发（全局只触发一次）
- onShow: 启动或从后台进入前台显示时
- onHide: 从前台进入后台时

## 页面文件

### 页面生命周期

- onLoad:
  监听页面加载，该钩子被调用时，响应式数据、计算属性、方法、侦听器、props、slots 已设置完成，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参）

推荐在页面级组件里使用 uni-app 的 页面生命周期，而在 子组件 里使用 Vue 组件生命周期。

## 数据状态管理与数据持久化

在小型项目中，可以通过以下方式替代传统的状态管理库及其模块化方案：

1. `@/utils/globalState.js`

   - 替代了 `Pinia/Vuex` 的核心状态管理功能。
   - 直接通过 `reactive` 管理全局共享的状态，并封装对本地存储（`uniStorage`）的操作逻辑，实现状态的持久化和同步。
   - 简单轻量，适合不需要复杂依赖的大型状态管理架构的项目。

2. `composables/useUser.js` 等自定义hooks

   - 替代了 `stores/user.js`（Pinia 模块）的细化分层。
   - 作为逻辑复用的入口，封装了特定状态（如用户状态）的读写逻辑，简化组件内的操作。
   - 通过调用 `globalState.js` 的功能完成状态管理，但提供了面向业务的具体接口，使代码更加语义化和清晰。

### 核心优势

- 减少依赖：无需安装第三方库，直接基于 Vue3 的 Composition API 和工具函数实现。
- 灵活轻便：只需维护少量代码，同时能满足状态共享和持久化的需求。
- 适配跨端：依赖 uniStorage 实现的状态存储，天然支持 UniApp 的多端运行场景。

## 参考

- [uni-app 官方文档](https://uniapp.dcloud.net.cn/)