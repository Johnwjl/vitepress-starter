# npm

## Install

  ```sh
  npm i module_name  -S  = >  npm install module_name --save    // 写入到 dependencies 对象 (需要发布到生产环境)

  npm i module_name  -D  => npm install module_name --save-dev   // 写入到 devDependencies 对象 (只用于开发环境)

  npm i module_name  -g  // 全局安装
  ```

如果在安装过程中遇到依赖冲突问题，--legacy-peer-deps 参数可以帮助绕过一些兼容性问题。

  ```sh
  npm install --legacy-peer-deps
  ```

## Init

如果项目包含了子模块（Git submodules），你可以运行以下命令来同步并安装依赖：

```sh
npm run init
```

这条命令会执行 package.json 中定义的 init 脚本

## Lint

运行 ESLint 来检查代码质量：

```sh
npm run lint
```

## 升级依赖

```sh
npm outdated
npm update
```

## 查看安全隐患

```sh
npm audit fix
```
