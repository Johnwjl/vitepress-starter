# Pull Request 全流程详细步骤，助你迈出为开源项目做贡献的第一步

想要修改代码并提交 PR（Pull Request）：如果你计划为项目做贡献（比如修复 bug 或 添加功能），你可以先 fork 项目，然后在 fork 后的仓库上进行修改，提交后通过 PR 将你的修改建议提交给原项目。那么具体怎么按步骤操作？

## 步骤

提交 PR（Pull Request）是向开源项目贡献代码的常见方式。以下是详细步骤，帮助你从 fork 项目到提交 PR：

### 1. **Fork 项目**

- 在 GitHub 上打开你想要贡献的项目页面，点击右上角的 **Fork** 按钮。这会将项目复制到你的 GitHub 账户中。

### 2. **Clone 你 fork 的项目到本地**

- 在你自己的 GitHub 账户下，找到你 fork 后的项目。点击绿色的 **Code** 按钮，复制 HTTPS、SSH 或 GitHub CLI 链接。
- **在本地终端运行**：

     ```bash
     git clone https://github.com/your-username/forked-repo.git
     ```

### 3. **创建新的分支**

- 在本地目录中，进入克隆的项目文件夹。

     ```bash
     cd forked-repo
     ```

- 创建并切换到新分支，以便你在独立的分支上进行修改。

什么时候创建分支？

你应该每次为一个特定的功能或 bug 修复创建一个新分支，这有助于隔离你的工作。

创建新分支是良好的开发习惯，尤其在开源贡献中，分支管理能帮助你更清晰地管理不同的任务

假设你在 fork 的仓库里要开发一个新功能 feature-x，你可以在你的 fork 仓库中这样做：

```bash
    git checkout -b your-feature-branch
```

当你完成修改并提交 PR 之后，你可以继续在你的 main 分支上保持与上游仓库同步，而不会影响你的 PR。

### 4. **修改代码**

- 根据你要修复的 bug 或 添加的功能，在本地编辑器中修改代码。修改完成后，保存更改。

### 5. **提交修改**

- 查看修改状态：

    ```bash
     git status
    ```

- 将改动的文件添加到暂存区：

    ```bash
     git add .
    ```

- 提交改动：

    ```bash
     git commit -m "描述你所做的更改"
    ```

### 6. **推送到你的 fork 仓库**

- 将本地的修改推送到你 GitHub 账户中的 fork 仓库。

    ```bash
     git push origin your-feature-branch
    ```

### 7. **在 GitHub 上提交 Pull Request**

- 访问你 fork 的仓库，在 GitHub 界面上会看到一个提交 PR 的提示。点击 **Compare & pull request**。
- 填写 PR 的标题和描述，解释你做了什么修改以及为什么需要这些修改。
- 确保你正在将修改提交到原项目的正确分支（例如 `main` 或 `develop`）。

#### 附加建议

提供详细的描述。在 PR 的描述中，可以包括以下内容：

- 问题：描述你遇到的错误。
- 解决方案：简要说明你的具体修改。
- 测试：解释你是如何测试你的修改，确保它能正常工作。
- 遵循贡献指南：查看项目是否有贡献指南（通常在 CONTRIBUTING.md 文件中），遵循其中的建议和要求。

### 8. **等待维护者审查**

- 提交 PR 后，项目的维护者会审查你的修改，并可能要求你进行进一步修改。如果一切顺利，PR 会被合并到主项目中。

### 9. **保持 Fork 同步**

如果原项目有新更改，在你准备进一步贡献时，需要保持你的 fork 和 本地分支 与原项目（上游仓库）同步：

- 添加原项目为远程仓库：

    ```sh
    git remote add upstream https://github.com/原始项目的用户名/原始项目的仓库名.git
    ```

- 获取上游仓库的更新：

    ```sh
    git fetch upstream
    ```

- 合并更新到本地：

    切换到你 fork 的项目的主分支（通常是 main 或 master）：

    ```sh
    git checkout main # 或者 git checkout master
    ```

    将上游仓库的更改合并到你的主分支：

    ```sh
    git merge upstream/main # 或者 git merge upstream/master
    ```

- 推送到你的远程仓库：

    最后，推送这些更改到你自己的 fork 仓库：

    ```sh
    git push origin main  # 或者 git push origin master
    ```

#### 自动同步

虽然 GitHub 没有内置的自动同步功能，你可以使用以下两种方式自动保持 fork 与上游仓库的同步：

- GitHub Actions：编写一个 GitHub Actions 工作流，定期自动同步你的 fork 与上游仓库。
- 第三方工具：有一些第三方工具（如 pull 或 sync bots），可以自动帮助你同步 fork。

