# 【零基础小白向】从零开始手动搭建基于 Vue CLI + Vue2 的admin后台管理系统开发框架
> 第一部分
## 一. Vue CLI
> Vue CLI 是一个基于 Vue2 进行快速开发的完整系统， 是 Vue2 的官方脚手架。可以理解为 Vue2 项目代码的基座。
1. 安装
```sh
npm install -g @vue/cli
```
2. 创建一个项目
```sh
vue create my-vue2admin
```
3. 查看 版本
```sh
vue --version   // @vue/cli 4.5.12
```
[Vue CLI 官网](https://cli.vuejs.org/zh/)

---
> Vue CLI 现已处于维护模式!
现在官方推荐使用 `create-vue` 来创建基于 Vite 的新项目。
```sh
`npm create vue@3` or `npm init vue@3` // Vue3
`npm create vue@2` or `npm init vue@2` // Vue2
``` 
> 如需可参：【零基础小白向】从零开始手动搭建基于 Vite + Vue2 的admin后台管理系统开发框架
---

## 二. 常用依赖
> 接入围绕 Vue2 项目生态的、日常开发所需的各种全家桶工具库。

### 1. Vue Router 
> Vue Router 是 Vue.js 官方的路由管理器。
1. 以安装`Vue CLI 插件`的形式安装 vue-router
```sh
vue add router
```
命令行出现选项：
```sh
? Use history mode for router? // 你是否采用history模式来创建路由 // Y
```
此时会生成一个路由文件（自动生成的文件路径：src/router/index.js）及两个示例路由（自动生成的文件路径：src/views/xxx.vue）
```js
// src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, // 应用的基路径 的环境变量，后续如有需要可以在 vue.config.js （自行添加在根目录下） 的 publicPath 选项进行配置
  routes
})

export default router

```

[Vue Router 官网（v3 ：基于Vue2的版本）](https://v3.router.vuejs.org/zh/)

---

> 在安装`Element-UI`之前先提交一下代码

#### 关联本地项目代码并提交至个人Github账号
> 先在你的Github中新建一个远程仓库
1. 将本地项目配置关联到Git远程仓库 ：`git remote add <名称> <地址>`
```sh
git remote add origin https://github.com/yourGitName/Vue2_admin.git
```
1. 将默认分支（主分支）重命名为 main
```sh
git branch -M main
```
1. 推送到该仓库：`git push <名称>`
```sh
git push -u origin main
```
> 如需用户名、密码，则密码是需要新建一个身份令牌(token)

Github远程仓库当前的目录结构如下：
```
├── public                     // 第三方不打包资源
├── src                        // 源代码
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── router                 // 路由
│   ├── views                   // view
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
|
├── .gitignore                 // git忽略项
├── .babel.config.js           // babel配置
└── package.json               // npm配置
└── README.md                  // 项目说明
└── yarn.lock                  // 锁文件
```
> yarn.lock : yarn自动生成的锁文件，其作用是锁定安装时的包的版本号，并且该文件需要上传到git，以保证其他人在yarn install时大家的依赖能保证一致。
> 
> public： public 和 assets 都是存放静态文件的，不同在于 在项目打包时 public 不会被 webpack 所处理。
---

### 2. Element-UI
1. 以安装`Vue CLI 插件`的形式安装 Element-UI
```sh
vue add element
```
命令行依次出现三个选择项（根据个人需要选择即可）
```sh
? How do you want to import Element?  // Fully import
? Do you wish to overwrite Element's SCSS variables?  // No
? Choose the locale you want to load  // zh-CN
```
安装完成后，src目录下多了一个路径文件（src/plugins/element.js）
```js
// src/plugins/element.js
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)

```
[Element-UI 官网（v2 ：基于Vue2的版本）](https://element.eleme.cn/#/zh-CN)

> 此时开始 基于 `Vue Router` 和 `Element-UI` 搭建简单的登陆页面和路由菜单
> 参见下文： `三、框架功能及业务实现`  中的该功能章节

### less

#### 安装

- 指定`less-loader`版本为`5`,当前（2023-02）最高版本`11`，版本过高会因不兼容而报错。

```sh
yarn add less less-loader@5 -D
```

```json
// package.json
"less": "^4.1.3",
"less-loader": "5",
```
### scss/sass

#### 安装

- 指定`sass-loader`版本为`5`,当前（2023-02）最高版本`11`，版本过高会因不兼容而报错。

```sh
yarn add sass sass-loader -D
```

```json
// package.json
"less": "^4.1.3",
"less-loader": "5",
```

### windi CSS

#### Install

```sh
vue add windicss
```

#### 配置

```js
// vue.config.js

module.exports = {
  pluginOptions: {
    windicss: {
      // 具体配置请查看 https://github.com/windicss/vite-plugin-windicss/blob/main/packages/plugin-utils/src/options.ts
    },
  },
}
```
#### 引入

```js
// main.js

import 'windi.css' // 已自动添加
```

### Axios 

> Axios 是一个基于 promise 的网络请求库
#### Install

`npm i axios -S` or `yarn add axios`

### vuex


## 三、框架功能及业务实现

### 1. 基于 `Vue Router` 和 `Element-UI` 实现 `登陆页`、`导航菜单`、`菜单权限`

> vue官方组件命名规范：多个单词、大驼峰命名。