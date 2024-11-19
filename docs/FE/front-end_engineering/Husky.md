# Husky 为每一次代码提交保驾护航

## Husky 是什么？

Husky 是一个用于在 `Git hooks` 中执行脚本的工具，通常用来在特定的 Git 操作（如 commit、push、merge 等）之前或之后运行脚本。它通过定义和执行这些操作，帮助开发团队保持代码质量并统一工作流。

Husky 是基于 Git hooks 的本地开发工具，运行在开发者的环境中，重点在于防止低质量代码进入代码库。属于代码提交过程的“前置保护措施”。

Husky 是一个轻量级的工具，作用于本地开发环境，帮助开发者在提交代码时自动运行脚本检查代码质量。

## 核心功能

Husky 的主要目的是增强团队开发流程的一致性，通过自动化执行以下任务：

1. 代码格式化：
  在提交代码之前，自动运行工具（如 Prettier）来格式化代码。
1. 代码质量检查：
  结合 ESLint，在代码提交之前检查代码风格和潜在问题。
1. 单元测试：
  在代码推送到远程仓库之前运行单元测试，确保提交的代码不会破坏现有功能。
1. 防止提交错误代码：
  使用 lint-staged 配合 Husky，只检查和修复本次提交涉及的文件，避免整个代码库的检查。

## Husky 的 Git Hooks 工作流程

Husky 基于 Git hooks 工作，以下是几个常用的 hooks：

- pre-commit：在执行 git commit 命令前运行。
- commit-msg：在提交消息被保存后触发，用于验证提交信息格式。
- pre-push：在执行 git push 之前运行脚本。
- post-merge：在代码合并完成后运行脚本。

## Husky 的使用方式

安装 Husky

```sh
npm install husky --save-dev
```

启用 Git hooks

```sh
npx husky install
```

添加自定义 hooks
创建一个 hook，比如 pre-commit：

```sh
npx husky add .husky/pre-commit "npm test"
git add .husky/pre-commit
```

结合 lint-staged 使用
配合 lint-staged，只检查和修复本次提交的文件：

```sh
npm install lint-staged --save-dev
```

在 package.json 添加配置：

```json
{
  "lint-staged": {
    "*.js": ["eslint --fix", "git add"]
  }
}
```
