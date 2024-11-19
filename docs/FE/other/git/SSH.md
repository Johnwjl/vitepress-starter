# GitHub SSH 密钥 与 GitHub 个人访问令牌

GitHub 在 2021 年 8 月 13 日后移除了通过密码进行 Git 操作的支持，现在你需要使用更安全的认证方式（例如：SSH 密钥或 GitHub 个人访问令牌）来进行 git push 等操作。

## 1. **使用 GitHub 个人访问令牌（PAT）进行 HTTPS 认证**

如果你希望继续使用 HTTPS 方式访问 GitHub，你需要创建一个 GitHub 个人访问令牌，并将它用于代替密码。

### 步骤

1. **生成个人访问令牌**：
   - 登录 GitHub 后，点击右上角头像，选择 **Settings**（设置）。
   - 在左侧菜单中，找到 **Developer settings** > **Personal access tokens** > **Tokens (classic)**。
   - 点击 **Generate new token**，选择你需要的权限，至少选择 `repo` 权限以允许你推送和拉取代码。
   - 生成后复制该令牌。

2. **在 Git 操作中使用令牌**：
   - 当你执行 `git push` 或其他需要认证的操作时，在提示输入用户名时，输入你的 GitHub 用户名。
   - 在提示输入密码时，使用**生成的个人访问令牌**代替密码。

### 示例

```bash
git push origin fix-dependency-issue
# Username: <Your-GitHub-Username>
# Password: <Your-GitHub-Personal-Access-Token>
```

## 2. **使用 SSH 认证**

SSH 是另一种推荐的 GitHub 认证方式，配置一次后无需每次输入令牌或密码。

### 配置 SSH 密钥 步骤

#### 检查是否已有 SSH 密钥

检查本地是否已有 SSH 密钥：

```sh
ls -al ~/.ssh
```

如果看到类似 id_rsa 和 id_rsa.pub 文件，说明已有 SSH 密钥。如果没有，执行下一步生成新密钥。

#### 生成 SSH 密钥

如果你还没有 SSH 密钥，使用以下命令生成一个新的 SSH 密钥：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

这会在默认路径 ~/.ssh/ 下生成 id_ed25519 和 id_ed25519.pub 两个文件。
密钥保存在默认位置（`~/.ssh`）。

#### 将 SSH 密钥添加到 SSH 代理

- 首先验证是否已经将 SSH 密钥添加到 `ssh-agent`，你可以按照以下步骤进行检查：

1. **检查 `ssh-agent` 是否正在运行**：
   首先，确认 `ssh-agent` 是否在运行，可以使用以下命令：

   ```bash
   ps aux | grep ssh-agent
   ```

   如果你看到 `ssh-agent` 的进程，说明它正在运行。

2. **查看已添加的 SSH 密钥**：
   使用以下命令查看当前已添加到 `ssh-agent` 的密钥列表：

   ```bash
   ssh-add -l
   ```

   - 如果你已经添加了密钥，它会列出所有已加载的密钥，包括其指纹和密钥类型（如 RSA 或 Ed25519）。
   - 如果没有添加任何密钥，会显示类似“`The agent has no identities.`”的消息。

3. **测试 SSH 连接**：
   你也可以通过尝试连接到某个使用 SSH 的服务（例如 GitHub、GitLab 或你自己的服务器）来进一步验证密钥是否有效。例如，连接到 GitHub 的命令如下：

   ```bash
   ssh -T git@github.com
   ```

   - 如果密钥已经正确添加并且具有访问权限，系统会显示类似于“`Hi username! You've successfully authenticated, but GitHub does not provide shell access.`”的消息。
   - 如果未成功，会返回错误信息，说明密钥未被识别或无法连接。

通过以上步骤，你可以确认是否已成功将 SSH 密钥添加到 `ssh-agent`。
如果没有，执行下一步添加到 SSH 代理。

- 如果生成了新的 SSH 密钥，需将其添加到 SSH 代理：

```sh
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

为什么？因为生成新的 SSH 密钥后，将其添加到 SSH 代理是为了让代理管理密钥，以便你可以在终端中通过 SSH 安全连接到远程服务器或 Git 仓库，而无需每次连接时输入密码。

下面详细解释这两条命令的作用：

1. **`eval "$(ssh-agent -s)"`**：
   - 这是启动或检查 `ssh-agent` 的命令。`ssh-agent` 是一个后台进程，用来管理私钥（private key）和处理 SSH 会话时的身份验证。这个命令会启动 `ssh-agent`，并将其进程信息（如 PID）输出到当前的 shell 环境中，使其能与后续的 SSH 操作交互。

2. **`ssh-add ~/.ssh/id_ed25519`**：
   - 这条命令将指定的私钥（在此例中是 `~/.ssh/id_ed25519`）添加到 `ssh-agent` 中。这让 `ssh-agent` 可以缓存该密钥，从而允许后续的 SSH 连接在不需要再次输入密码的情况下直接使用该密钥。

简而言之，这两步操作可以让你在使用 SSH 密钥进行身份验证时更加方便和安全，而不必每次都手动输入密钥密码。

::: tip 我电脑里之前有生成过SSH，名称为 `id_rsa` 和 `id_rsa.pub`，似乎与 `id_ed25519` 这个名称不太一样？

`id_rsa` 和 `id_rsa.pub` 是之前生成的 SSH 密钥，使用的是 RSA 加密算法，
而 `id_ed25519` 和 `id_ed25519.pub` 是使用 Ed25519 加密算法生成的密钥。
这两种密钥类型在加密算法和安全性上有一些区别。

1. **算法**：
   - **RSA**（`id_rsa`）：一种常用的公钥加密算法，密钥长度可以变动，常见的长度为2048位或4096位。一般来说，RSA 密钥较长，生成和验证时会消耗更多计算资源。
   - **Ed25519**（`id_ed25519`）：一种较新的加密算法，提供更高的安全性和性能，密钥长度固定为256位。Ed25519 的计算速度更快，且密钥更小，通常被认为在相同安全等级下比 RSA 更加高效。

2. **用途**：
   - 两种类型的密钥都可以用于 SSH 身份验证和加密，但 Ed25519 被广泛认为是更安全的选择。

- 如果你已经有了 `id_rsa` 和 `id_rsa.pub` 密钥，可以继续使用这些密钥进行 SSH 连接，无需生成新的密钥。
- 如果你选择生成新的 `id_ed25519` 密钥，你可以选择将其与原有的 RSA 密钥并存，或者在需要时替换原有的密钥（需要更新服务器或服务上的公钥）。

使用已有的 RSA 密钥：

如果你想使用已有的 `id_rsa` 密钥，可以直接将其添加到 `ssh-agent`：

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

这样，你就可以通过 RSA 密钥进行 SSH 连接了。如果需要，也可以同时添加多个密钥。
:::

#### 将 SSH 公钥添加到 GitHub

- 复制生成的公钥：

    ```bash
     cat ~/.ssh/id_ed25519.pub
    ```

- 登录 GitHub，进入 **Settings** > **SSH and GPG keys**，点击 **New SSH key**，粘贴你的公钥。

#### **在 Git 中设置 SSH 远程仓库**

- 将项目的远程仓库 URL 从 HTTPS 改为 SSH：

     ```bash
     git remote set-url origin git@github.com:YourUsername/miniprogram-demo.git
     ```

#### **推送代码**

- 使用 SSH 推送代码：

    ```bash
     git push origin fix-dependency-issue
     ```

### 查看 SSH 位置

```sh
❯ ls -al ~/.ssh

total 24
drwx------   6 wjl  staff   192 May 22  2023 .
drwxr-xr-x+ 72 wjl  staff  2304 Oct 14 20:38 ..
-rw-------   1 wjl  staff     0 Feb 24  2022 config
-rw-------   1 wjl  staff  2610 Jan 24  2022 id_rsa
-rw-r--r--@  1 wjl  staff   574 Jan 24  2022 id_rsa.pub
-rw-r--r--   1 wjl  staff   184 Oct 14 12:09 known_hosts
```

以下是这段输出对应的解释：

在 `.ssh` 目录中，你有以下文件：

1. **config**：这个文件是空的（0 字节），通常用于存储 SSH 配置，如主机别名、用户名、端口等。如果你有特定的 SSH 设置，可以在这里进行配置。

2. **id_rsa**：这是你的私有 SSH 密钥（2610 字节）。这个文件非常重要，需要确保其安全，绝不能分享给他人，因为它用于身份验证和远程系统登录。

3. **id_rsa.pub**：这是你的公有 SSH 密钥（574 字节），可以分享给他人或添加到远程服务器上，授权你访问该服务器。`.pub` 后缀表示这是密钥对中的公钥部分。

4. **known_hosts**：这个文件（184 字节）包含你曾连接过的 SSH 服务器的列表，确保你连接的是同一个服务器，而不是可能的冒名服务器。

#### 查看公钥

`id_rsa.pub` 文件位于你的 `~/.ssh` 目录下，它就是你的公钥文件。根据你提供的输出，路径为：

```sh
~/.ssh/id_rsa.pub
```

你可以使用以下命令查看该文件的内容：

```bash
cat ~/.ssh/id_rsa.pub
```

执行此命令后，会显示你的公钥内容。

#### 验证公钥

```sh
❯ ssh -T git@github.com

Hi Johnwjl! You've successfully authenticated, but GitHub does not provide shell access.
```

这条信息表明，你的 SSH 公钥已经成功添加到 GitHub，并且你已通过 SSH 方式成功认证。
虽然成功连接，但 GitHub 不提供交互式的 shell 访问，因此你只能进行 Git 操作，而不能像登录远程服务器一样使用 GitHub 的 shell。

如果你打算通过 SSH 方式使用 Git 来与 GitHub 进行交互，比如拉取、推送代码，现在你已经成功配置好了，可以直接使用 SSH 进行 Git 操作了。

你可以试试以下命令，验证 SSH 是否成功：

```bash
git clone git@github.com:your-username/your-repository.git
```

这将会通过 SSH 克隆你的仓库。

你遇到的问题是由于 GitHub 在 2021 年 8 月 13 日后停止了对密码认证的支持，因此你不能再使用用户名和密码进行 `https` 方式的推送操作。

#### 远程仓库改为`ssh`

由于你已经成功配置了 SSH，建议你将远程仓库的 URL 从 `https` 改为 `ssh`，以便通过 SSH 进行推送。具体步骤如下：

1. 检查当前的远程仓库地址：

   ```bash
   git remote -v
   ```

   输出应该类似于：

    ```sh
   origin  https://github.com/Johnwjl/miniprogram-demo.git (fetch)
   origin  https://github.com/Johnwjl/miniprogram-demo.git (push)
   ```

2. 将远程仓库 URL 从 `https` 改为 `ssh`：

   ```bash
   git remote set-url origin git@github.com:Johnwjl/miniprogram-demo.git
   ```

3. 再次验证远程仓库的地址是否更改成功：

   ```bash
   git remote -v
   ```

   输出应该类似于：

   ```sh
   origin  git@github.com:Johnwjl/miniprogram-demo.git (fetch)
   origin  git@github.com:Johnwjl/miniprogram-demo.git (push)
   ```

4. 现在你可以通过 SSH 进行推送了：

   ```bash
   git push origin fix-dependency-issue
   ```

## 为什么 SSH 方式更好？

SSH 方式通常被认为比 HTTPS 方式更好，尤其是在 GitHub 和其他版本控制平台上的认证操作中，主要原因有以下几点：

### 1. **更加安全**

- **SSH 密钥使用非对称加密**：SSH 使用的是公钥-私钥对的非对称加密方式。私钥只存储在你的本地机器上，公钥则添加到 GitHub 账户中。推送或拉取代码时，GitHub 使用公钥加密一个随机的“挑战信息”，然后用你的私钥进行解密，验证身份。这种方式不需要在每次推送时发送任何敏感信息（如用户名或令牌），从而提高了安全性。

- **HTTPS 密码或令牌的安全风险**：如果你使用 HTTPS 模式并在终端或某些工具中保存了密码或个人访问令牌（PAT），它们可能被意外泄露或暴露给其他用户或恶意软件。而 SSH 不需要你每次都输入密码或令牌。

### 2. **无需频繁输入密码或令牌**

- **SSH 一次性设置**：一旦你生成并配置好 SSH 密钥，之后所有 Git 操作（如 `git push`、`git pull` 等）都不需要每次输入用户名或密码。你只需在本地机器上保存密钥，一切自动处理。这对于频繁操作代码仓库的开发者来说，非常方便。

- **HTTPS 每次认证**：使用 HTTPS 时，每次执行敏感操作（如 `git push`）都需要认证（输入密码或个人访问令牌），这会增加操作上的麻烦。虽然你可以使用 Git 的凭据管理工具来缓存这些信息，但这仍然会带来一定的安全隐患。

### 3. **长久有效性**

- **SSH 密钥无过期时间**：SSH 密钥不会像个人访问令牌（PAT）那样过期（除非你手动撤销它们）。个人访问令牌在某些安全策略中可能会设置成需要定期更新，特别是在企业环境中。相比之下，SSH 密钥更长久有效，不需要频繁地生成新的认证方式。

### 4. **更适合自动化和持续集成（CI/CD）**

- **自动化环境中的便捷性**：在设置自动化脚本或 CI/CD 流水线时，使用 SSH 更加便捷。你可以将 SSH 私钥配置到 CI 系统中，从而实现安全的自动化推送或拉取代码，而不必每次处理过期的令牌或其他身份认证问题。

### 5. **对防火墙的更好适应性**

- **防火墙问题**：在某些严格的企业网络中，HTTPS 访问可能会被限制，尤其是特定的 HTTPS 端口可能被防火墙阻挡。而 SSH 使用的默认端口是 `22`，通常被防火墙允许，这使得在某些网络环境中 SSH 更加可靠。

### 6. **更适合分布式开发**

- 在分布式开发中，开发者来自不同的地理位置，可能面临不同的网络条件。SSH 对认证的灵活性和适应性使得它更加适合跨地域的开发团队。

### 结论

**SSH 认证方式**具备更高的安全性、长期使用的便捷性，特别适合经常与 GitHub 进行交互的开发者和自动化任务。它相比 HTTPS 减少了频繁输入密码或令牌的烦恼，并且安全性更高，设置一次后无需担心认证过期或失效问题。因此，在大多数情况下，SSH 是推荐的方式，尤其是在你频繁操作 Git 仓库时。

## 总结

你可以选择继续使用 HTTPS 方式并通过**个人访问令牌**认证，或者使用更安全的**SSH 认证**。两种方式都能有效解决认证失败的问题，推荐使用 SSH 方式，因为它更方便、安全，且不需要每次输入令牌。
