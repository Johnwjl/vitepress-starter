# uni-app 起步

## 创建项目

安装 HBuilderX 代码编辑器

文件 -> 新建 -> 项目（快捷键Ctrl+N）

选择 uni-ui 项目模板，日常开发推荐使用该模板，已内置大量常用组件。

将 HBuilderX 和 微信开发者工具 更新到最新版本

微信开发者工具，微信扫码登录，并填入测试号appid

登录 HBuilderX，以更新依赖（在 项目的 uni_modules 目录 右键， `从插件市场更新所有插件`）

## 全局文件

### App.vue

应用生命周期仅可在App.vue中监听

- onLaunch: 初始化完成时触发（全局只触发一次）
- onShow: 启动或从后台进入前台显示时
- onHide: 从前台进入后台时

## 页面文件

### 页面生命周期

- onLoad: 监听页面加载，该钩子被调用时，响应式数据、计算属性、方法、侦听器、props、slots 已设置完成，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参）

推荐在页面级组件里使用 uni-app 的 页面生命周期，而在 子组件 里使用 Vue 组件生命周期。

## 参考

- [uni-app 官方文档](https://uniapp.dcloud.net.cn/)