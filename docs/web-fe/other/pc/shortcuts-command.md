# PC Shortcuts & Command

## Mac Shortcuts

- `Option(⌥) + Command(⌘) + V` 复制后的剪切
- `Control(⌃) + Command(⌘) + Q`  快速锁屏
- `Shfit(⇧) + Command(⌘) + 3`  截屏
- `Shfit(⇧) + Command(⌘) + 4`  区域截图
- `Command(⌘) + Back(⌫)` 丢入垃圾篓（删除文件）
- `Control(⌃) + Command(⌘) + Space(␣)` 表情与特殊符号
- `Control(⌃) + Left(←)/Right(→)` 快速平移切换所有窗口
- `Option(⌥) + Command(⌘) + Left(←)/Right(→)` 切换应用内部的Tab页签
- `Shfit(⇧) + Control(⌃) + Left(←)/Right(→)` 选择文字范围/撤销选择文字范围
- `Control(⌃) + Up(⌃)` 窗口调度
- `Command(⌘) + Up(⌃)/Down(⌄)` 跳至文档头部/底部
- `Control(⌃) + Mouse Scroll` 放大/缩小 PC Viewport
- `Shfit(⇧) + Command(⌘) + G`  访达中查找文件
- `killall Finder` 重启访达
- `Control(⌃) + Command(⌘) + 1` 整理访达文件 -按名称排列
- `Control(⌃) + Command(⌘) + 2` 整理访达文件 -按种类排列

## Mac VSCode

- `Shfit(⇧) + Option(⌥) + Down(⌄)`  Copy To Next Line
- `Option(⌥) + Down(⌄)`  Move To Next Line
- `Shfit(⇧) + Command(⌘) + P`  Query Command
- `Shfit(⇧) + Command(⌘) + N`  Open New Window
- `Command(⌘) + P`  Quickly Open File
- `Command(⌘) + K + S` Open Shortcuts

### Linux Common Command
- ls　显示文件或目录
  ```
  -l  列出文件详细信息 l(list)
  -a  列出当前目录下所有文件及目录，包括隐藏的 a(all)
  ```
- mkdir 创建目录
- touch 创建文件 
- cat 打开文件

## HomeBrew

- `brew search <packageName>` // 查询
- `brew install <packageName>` // 安装软件包
- `brew install --cask <packageName>` // 安装应用（桌面程序）
- `brew upgrade <packageName>` // 升级软件
- `brew uninstall <packageName>` // 卸载
- `brew list` // 查看已安装包列表
- `brew outdated` // 列出可以更新的软件包
- `brew info <packageName>` // 查看任意包信息
- `brew -v` 查看Homebrew版本
- `brew update` // 更新 Homebrew
- `brew config` // 查看 Homebrew 配置信息
- `brew -h` // Homebrew 帮助信息
- 
### HomeBrew 镜像源
- 查看 brew.git 当前源
```sh
cd "$(brew --repo)" && git remote -v
```
```sh
// 目前已经是 中科大
origin	https://mirrors.ustc.edu.cn/brew.git (fetch)
origin	https://mirrors.ustc.edu.cn/brew.git (push)
```
- 查看 homebrew-core.git 当前源

```sh
cd "$(brew --repo homebrew/core)" && git remote -v
```

```sh
// 之前是 清华源
origin	https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git (fetch)
origin	https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git (push)
// 目前已经是 中科大
origin	https://mirrors.ustc.edu.cn/homebrew-core.git (fetch)
origin	https://mirrors.ustc.edu.cn/homebrew-core.git (push)
```

- 查看 homebrew-cask.git 当前源
```sh
git -C "$(brew --repo homebrew/cask)" remote -v
```

```sh
// 目前已经是 中科大
origin	https://mirrors.ustc.edu.cn/homebrew-cask.git (fetch)
origin	https://mirrors.ustc.edu.cn/homebrew-cask.git (push)
```

- 改变 git源
```sh
1.替换 `brew.git`:
cd "$(brew --repo)" && git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
2.替换 `homebrew-core.git`:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
&& git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
3.替换 `homebrew-cask.git`:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-cask" 
&& git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git
```


---
## nvm

### 使用nvm管理node版本

- 查看已安装的node版本

  ```
  nvm list
  ```

- 安装某个版本

  ```
  nvm install 16.14.0
  ```
- 使用某个版本

  ```
  nvm use 16.14.0
  ```
- 将某个版本设为默认

  ```
  nvm alias default 16.14.0
  ```