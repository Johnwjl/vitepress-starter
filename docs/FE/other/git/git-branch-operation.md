# 分支操作

## 概述：

- 一个分支代表一条独立的开发线。
- `git branch` 与 `git checkout` 和 `git merge` 命令 紧密的结合使用。

## 命令

- 查看分支

```sh
git branch
```

- 创建一个新的本地分支

```sh
git branch wangjinlong
```

- 创建一个新的远程分支（将本地分支推送到远程仓库）

```sh
// 查看远程仓库
git remote -V
// 查看远程分支
git branch -r
// 创建分支
git branch wangjinlong 
// 将分支推送到远程仓库
git push origin wangjinlong
// 再次查看远程分支
git branch -r 
```

- 切换分支

```sh
//查看所有本地分支（及当前所在分支）
git branch
// 切换到自己的分支
git checkout wangjinlong
//再次查看本地分支
git branch
```

- 创建一条本地分支且立即切换到该分支

```sh
git checkout -b wangjinlong
```

- 基于`某个指定的分支`来创建分支

```sh
git checkout -b <new-branch> <existing-branch>
```


### 签出(切换)到远程分支

```sh
// 获取到所有远程分支的内容
git fetch --all
// 查看、比较一下 本地分支 和 远程分支的 差异
git branch
git branch -r
// 像签出本地分支一样签出远程分支。
git checkout wangjinlong_remote
```

### 在`主干分支`上将`指定分支`合并过来（将分支合并到主干）（merge代码）

```sh
// 切换到主干分支 （切换到接收分支）
git checkout main
// 拉取最新的远程提交
git fetch
// 确保 main 分支具有最新更新
git pull
// 将指定分支的代码合并过来
git merge wangjinlong
```

### 解决冲突

- 一般 `=======` 标记符`之前`的内容是`接收分支`，之后的部分是`合并分支`。
- 手动处理完文件中的冲突， `git add` 冲突文件 以告诉 Git 它们已解决。然后，运行正常 `git commit` 以生成合并提交。

## Other

### git pull

- `git pull` = `git fetch` + `git merge`

### git pull --rebase

- `git pull` = `git rebase` + `git merge`

所有 `git pull` 命令都将使用 `git rebase` 而不是 `git merge`

```sh
  git config --global branch.autosetuprebase always
```

解释：
如果你设置了 `always` ，每当你运行 `git pull` 时，
Git 会自动使用 `git pull --rebase` ，而不是 git pull 默认的 `git pull --merge`。

这避免了生成一个额外的合并提交，同时使你的提交历史更加清晰。

如果需要对已有分支启用 rebase，可以手动设置：

```sh
  git config branch.<branch-name>.rebase true
```

你可以通过以下命令检查当前配置：

```sh
  git config --global --get branch.autosetuprebase
```

运行以下命令查看 main 分支的 rebase 配置：

```sh
  git config branch.main.rebase
```

## 参考

- [迹忆客 - Git 教程](https://www.jiyik.com/w/git/)