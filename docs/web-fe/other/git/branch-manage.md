# Git 分支

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


## 参考

- [迹忆客 - Git 教程](https://www.jiyik.com/w/git/)