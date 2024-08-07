# 从零到一 使用 Vue Mini + weUI 发微信小程序

## 前言

[Vue Mini](https://vuemini.org/) 是一个基于 Vue 3.0 的小程序开发框架，它可以让你快速开发微信小程序。[【Github】](https://github.com/vue-mini/vue-mini) 

## 起步

根据[【快速上手】](https://vuemini.org/guide/quick-start.html)创建项目，并导入微信开发者工具，构建、上传、发布，体验版本真机测试。

## weUI

[小程序WeUI组件库](https://github.com/wechat-miniprogram/weui-miniprogram)

### 使用疑难解决

#### 组件库项目本地启动项目报错

- Node版本过高，降低node版本

#### 导入微信开发者工具报错

- 在`project.config.json`配置文件里，添加 `"miniprogramRoot": "miniprogram_dist/"` (将小程序根目录指向构建目录)

在自己的小程序项目中使用扩展方式引入组件库，无法显示组件： 先build构建一下，再在开发工具里刷新编译一下

完成基本表单逻辑

## 功能实现

### 主页

#### 添加微决策

- “决策一下” 按钮
- 弹出表单

#### 决策表单

- 决策事项
- 考虑因素
  - 回车添加一行
  - 可排序
- 下定决策

### 我的

#### 我的微决策清单

#### 我的决策TOP10
