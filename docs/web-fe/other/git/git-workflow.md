# Git Workflow

## 分支概述

- `dev` 分支 （在dev分支编译构建,使用脚本推送到`master`分支，抽包上线(打包部署)）
- `release` 分支 （ 版本分支 ，`code review`通过后，合并到`dev` 分支）
- `feat` 分支（ 功能分支 ，待所有需求开发完成后合并到`release` 分支）
- `developer-name` 分支（基于`feat`切出自己的本地分支，在自己的本地分支进行提交推送到自己的远程分支，再合并到`feat`分支）

## git提交规范

- 格式: `type (scope): subject`
- 例子：
  ```js
  // 新功能 feature
  feat(table组件): 增加了table组件相关功能
  // 修复 bug
  fix
  // 代码格式(不影响代码运行的变动)
  style
  // 文档注释
  docs
  // 重构、优化(既不增加新功能，也不是修复bug)
  refactor
  ```

## 参考

- [JDC 前端代码规范 - git分支规范](https://jdf2e.github.io/jdc_fe_guide/docs/git/branch/)
- [Git工作流面面观——Gitflow工作流](https://morningspace.github.io/tech/git-workflow-4/)
- [Git 工作流程 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2015/12/git-workflow.html)