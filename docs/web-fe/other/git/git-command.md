## github

### 关联远程仓库
> [远程仓库 - 廖雪峰的官方网站 (liaoxuefeng.com)](https://www.liaoxuefeng.com/wiki/896043488029600/896954117292416)

### 配置gitignore文件
- 进入项目根目录
```sh
touch .gitignore
```
- 添加忽略文件规则
  [gitignore官方配置文件](https://github.com/github/gitignore/)
- [忽略特殊文件 - 廖雪峰的官方网站 (liaoxuefeng.com)](https://www.liaoxuefeng.com/wiki/896043488029600/900004590234208)

### 配置 token 
- GitHub 生成 token
- 复制 token , 并执行 
```sh
git remote set-url origin https://<your_token>@github.com/<USERNAME>/<REPO>.git
// <your_token> : token
// <USERNAME> : 用户名
// <REPO> ： 项目名
```
- git push 鉴权失败 ，GitHub 重新生成 token , 以token代替提交代码时要输入的密码

### git clone 报错（shadowsocks 科学上网 的代理问题）

- 01
```sh
// fatal: 无法访问 'https://github.com/Johnwjl/vue3.git/'：Received invalid version in initial SOCKS5 response.
```

```sh
// 解决 - 先清除相关代理设置
git config --global --unset http.proxy
git config --global --unset https.proxy
git config --global --unset http.https://github.com.proxy

// 查看git config
```sh
git config -l // git config --list
```

// 通过 shadowsocks 右键菜单 `复制终端代理命令`
export http_proxy=http://127.0.0.1:1087
export https_proxy=http://127.0.0.1:1087

// 查看代理
env|grep -I proxy
`http_proxy=http://127.0.0.1:1087`
`https_proxy=http://127.0.0.1:1087`

```

### git 回退/撤销 第一次commit

```sh
git update-ref -d HEAD
```

## gitlab 

### Git 全局设置

```sh
git config --global user.name "Johnwjl"
git config --global user.email "johnwangjl@gmail.com"
```

### 创建一个新仓库

```sh
git clone git@gitlab.com:Johnwjl/vitepress-starter.git
cd vitepress-starter
git switch -c main
touch README.md
git add README.md
git commit -m "add README"
git push -u origin main
```

### 推送现有文件夹

```sh
cd existing_folder
git init --initial-branch=main
git remote add origin git@gitlab.com:Johnwjl/Vue2_admin_vite.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 推送现有的 Git 仓库

```sh
cd existing_repo
git remote rename origin old-origin
git remote add origin git@gitlab.com:Johnwjl/vitepress-starter.git
git push -u origin --all
git push -u origin --tags
```

### git pull

- `git pull` = `git fetch` + `git merge`

### 命令行内vim编辑操作
- 在当前这个页面键入i(进入编辑模式)，此时会出现光标
- 按esc，然后输入:(键盘上shift+：)，输入wq，即保存退出

### 镜像（同步）到 Github

#### Github 操作
- 新建一个仓库
- 新建一个Token密钥 `setting` -> `Developer setting` -> `personal access tokens`
<!-- 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 -->
#### Gitlab 操作
- `设置` -> `仓库` -> `镜像仓库`
- 填写Github URL 需要加上 `username` : https://Johnwjl@github.com/Johnwjl/Vue2_admin_vite.git
- 填写 Token密钥
- 点击更新（refresh）

[参考](read://https_www.jianshu.com/?url=https%3A%2F%2Fwww.jianshu.com%2Fp%2Fcf61a7408175)