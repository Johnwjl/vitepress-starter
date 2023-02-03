# 01. Project Build

## 一. [create-vue](https://github.com/vuejs/create-vue)
`create-vue` : 基于 `Vite` 的 Vue官方脚手架。
::: tip
`Vue CLI`现已处于维护模式!  :point_right:[Admin (CLI)](/web-fe/vue2/admin-cli/01-project-build)
:::
1. 创建项目
```sh{2}
`npm create vue@3` or `npm init vue@3` // Vue3
`npm create vue@2` or `npm init vue@2` // Vue2
``` 
2. 根据选项可一同安装 `Typescript` `Vue Router` `Pinia` `Vitest` `ESlint` `Prettier`
```json
// package.json
"vue": "^2.7.7",
"vite": "^3.0.2",
"typescript": "~4.7.4",
"vue-router": "^3.5.4"
"pinia": "^2.0.16",
```

## 二. Vue2 全家桶

### 1. [Vue Router](https://v3.router.vuejs.org/zh/)

项目创建好后，此时`Vue Router`已具备，已生成好了一个路由文件（src/router/index.ts）及两个示例路由（格式：src/views/xxx.vue）
```js
// src/router/index.ts
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router

```

### 2. [Element-UI](https://element.eleme.cn/#/zh-CN)

::: tip
在安装`Element-UI`之前先提交一下代码
:::
#### 关联本地项目代码并提交至Github
1. 先在你的Github中新建一个远程仓库  
2. `git init` // 在本地项目目录 初始化本地Git仓库  
3. 将本地项目配置关联到Git远程仓库 ：`git remote add <名称> <地址>`
```sh
git remote add origin https://github.com/yourGitName/Vue2_admin.git
```
4. 将默认分支（主分支）重命名为 main
```sh
git branch -M main
```
5. `git add .` 和 `git commit -m 'project init'`
6. 推送到该仓库：`git push <名称>`
```sh
git push -u origin main
```

Github远程仓库当前的目录结构如下：
```
├── public                     // 第三方不打包资源
├── src                        // 源代码
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── router                 // 路由
│   ├── stores                 // 状态管理
│   ├── views                  // view
│   ├── App.vue                // 入口页面
│   ├── main.ts                // 入口 加载组件 初始化等
|
├── .eslintrc.cjs              // ESLint 配置
├── .gitignore                 // git忽略项
├── env.d.ts                   // 环境变量的类型声明文件
├── index.html                 // 入口文件
├── package-lock.json          // 项目包的锁文件
├── package.json               // npm配置
├── README.md                  // 项目说明
├── tsconfig.app.json          // Typescript 配置的拓展
├── tsconfig.config.json       // Typescript 配置的拓展
├── tsconfig.json              // Typescript 配置
├── tsconfig.vitest.json       // 对于 vitest 的 Typescript 配置
└── vite.config.ts             // 项目配置
```
::: tip
`package-lock.json`（`yarn.lock`）: 项目包的锁文件，其作用是锁定安装时的包的版本号，并且该文件需要上传到git，以保证其他人在安装依赖时能保证一致。  
`public`：`public`和`assets`都是存放静态文件的，不同在于在项目打包时`public`不会被`webpack`所处理。
:::


1. 安装
```sh
npm i element-ui -S // "element-ui": "^2.15.12",
```
2. 全局引入
```ts
// src/main.ts
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
```

### 3. Less
1. 安装
```sh
npm install less -D
```
> Vite 项目已不再需要安装预处理器的loader(less-loader)

### 4. PostCSS
>  `PostCSS` b被称作 `后处理器`，其作用是给我们的CSS属性自动加上所需的前缀，以应对浏览器兼容性。 
1. 安装
> PostCSS 需要依赖对应插件，`postcss-preset-env` or `autoprefixer`。
```sh
// `Vite` 已经内置 `PostCSS` ，可以只安装 `postcss-preset-env`
npm install postcss postcss-preset-env -D
// TS项目中还需要安装插件的声明类型文件
npm install -D @types/postcss-preset-env
```
2. 配置
```js
// 在项目根目录下新建 postcss.config.js`
module.exports = {
  plugins: [
    require('postcss-preset-env')
  ]
}
```
::: tip
Now we can code [Login & Router & permissions](./02-login-router-permissions)
:::
