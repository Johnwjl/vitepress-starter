# 前端部署那些事 前置篇

## 跨域

### 什么是跨域？

跨域是指浏览器在执行 JavaScript 脚本时，由于**同源策略（Same-Origin Policy）**的限制，无法访问来自不同源的资源或接口。

同源策略定义的`同源`条件：

- `协议`相同
- `域名`相同
- `端口`相同

只要这三个条件中**任意一个不满足**，就会产生跨域问题。例如：

允许访问：`http://example.com:80`→ `http://example.com:80`

跨域访问被限制：

- 不同协议：`http://example.com` → `https://example.com`
- 不同域名：`http://example.com` → `http://api.example.com`
- 不同端口：`http://example.com:80` → `http://example.com:8080`

跨域的本质是浏览器的安全限制，同源策略旨在防止以下问题：

- 用户隐私泄露：防止恶意网站读取其他网站的敏感数据。
- CSRF（跨站请求伪造）攻击：限制跨站的非法请求。

### Vue 项目中的跨域问题

在前后端分离架构中，Vue 项目通常运行在一个前端服务器上，而后端接口在另一个服务器上，这种情况很容易触发跨域问题。例如：

- Vue 项目运行在 `http://localhost:8080`
- 后端 API 运行在 `http://localhost:3000`

直接从 Vue 发起请求会被浏览器拦截，因为两个 URL 的端口不同，不满足同源策略。

#### Vue 项目如何处理跨域

- 使用反向代理解决跨域问题（推荐）

通过配置开发服务器（如 Webpack 的 devServer 或 Nginx），将跨域请求转发给后端服务器。
客户端对代理服务器的请求是同源的，而代理服务器与后端通信没有同源限制。

Webpack devServer 配置：

```js
// vue.config.js
module.exports = {
    devServer: {
        proxy: {
        '/api': {                         // 匹配 /api 的请求
            target: 'http://localhost:3000', // 目标后端服务地址
            changeOrigin: true,             // 是否修改请求头中的 Host
            pathRewrite: { '^/api': '' },   // 重写路径，把 /api 去掉
        },
        },
    },
};
```

Nginx 配置：

```sh
server {
    listen 80;
    server_name frontend.example.com;

    location /api/ {
        proxy_pass http://backend.example.com;  # 转发到后端服务器
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

原理：
前端只请求同源的代理服务器，代理服务器转发请求到后端，绕过了浏览器的同源策略限制。

- 使用后端设置 CORS

**CORS（跨域资源共享）**是浏览器的一种机制，允许服务器通过特定的 HTTP 响应头，声明哪些来源可以访问资源。

Node.js（Express）中配置 CORS：

```js
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:8080', // 允许的前端源
    methods: 'GET,POST,PUT,DELETE', // 允许的 HTTP 方法
    credentials: true,              // 允许携带 Cookie
}));
```

CORS 响应头：

- Access-Control-Allow-Origin: 指定允许访问的源
- Access-Control-Allow-Methods: 指定允许的方法
- Access-Control-Allow-Headers: 指定允许的请求头

原理：
后端通过在响应中设置 CORS 相关的头，告诉浏览器此请求合法，允许访问。

- JSONP（仅限 GET 请求）

JSONP 是一种利用 `<script>` 标签没有跨域限制的特性，通过动态注入 `<script>` 的方式实现跨域。

后端返回 JSONP 数据：

```js
// 假设接口 URL: http://backend.example.com/api?callback=handleData
const handleData = (data) => { console.log(data); };
<script src="http://backend.example.com/api?callback=handleData"></script>
```

原理：
客户端通过 `<script>` 标签向后端发送请求，后端返回一个包含回调函数的 JavaScript 脚本。

限制：
JSONP 只支持 GET 请求，不支持其他 HTTP 方法。

- WebSocket

如果使用 WebSocket 技术建立持久连接，浏览器不会对 WebSocket 请求进行同源策略限制。

原理：
WebSocket 协议（ws:// 或 wss://）不受同源策略的限制，适用于实时交互的场景。

#### devServer 和 Nginx 处理跨域的使用场景区别

- 开发环境：使用 devServer 解决跨域

在本地开发时，Vue 项目通常通过 Webpack 的 devServer 提供开发服务器，这时可以在 vue.config.js 中配置代理 (proxy) 来解决跨域问题。

适用场景

- 本地开发调试，方便前端直接调用后端接口。
- 没有后端跨域支持或后端配置不方便时。

优点

- 配置简单，只需修改前端项目的配置文件。
- 不需要后端配合，快速解决开发环境的跨域问题。

局限

- 仅限于本地开发环境，不能直接用于生产部署。

```js
// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000', // 后端接口地址
                changeOrigin: true,             // 修改请求头中的 Host，伪装为后端同源
                pathRewrite: { '^/api': '' },   // 重写路径，去掉 /api 前缀
            },
        },
    },
};
```

- 生产环境：使用 Nginx 解决跨域

在生产环境中，跨域问题通常通过 Nginx 的反向代理来解决。
Nginx 既可以用作静态资源服务器（服务 Vue 构建后的 dist 文件），也可以用作反向代理，将 API 请求转发到后端。

适用场景

- 生产部署，需要支持跨域的请求转发。
- 后端和前端分离部署的架构。

优点

- 不依赖开发工具，适合生产环境的稳定解决方案。
- 提供更强的功能（如负载均衡、SSL/TLS 协议支持）。

```sh
server {
    listen 80;
    server_name example.com;

    # 静态资源（Vue 构建后的文件）
    location / {
        root /var/www/vue-project/dist;
        index index.html;
    }

    # API 请求反向代理到后端
    location /api/ {
        proxy_pass http://backend-server:3000; # 转发到后端服务
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

在实际项目中，可能需要一些 Nginx 特定的功能：

- 路由配置：为单页面应用设置 index.html 回退（避免刷新 404）。
- 跨域配置：通过 Nginx 添加 CORS 头解决跨域问题。
- 性能优化：启用 gzip 压缩、缓存静态资源等。

1. 静态资源托管
    - 了解如何配置 location / 指向 Vue 项目 dist 文件夹。
2. 单页面应用支持
    - 配置 try_files $uri /index.html，确保前端路由刷新正常工作。
3. 反向代理
    - 设置 API 的代理转发规则，例如 /api 请求转发到后端服务。
4. 跨域支持
    - 添加 add_header Access-Control-Allow-Origin *; 配置。
5. 性能优化
    - 开启 gzip 压缩，提高静态资源加载速度。

## 反向代理

### 反向代理的概念

**反向代理（Reverse Proxy）**是一种服务器，它位于客户端和实际服务器之间，代替实际服务器处理客户端的请求。反向代理会接收客户端的请求，然后将请求转发给后端服务器，并将后端服务器的响应返回给客户端。

简单来说：

- 客户端 只知道反向代理的地址，而不知道后端服务器的具体地址。
- 反向代理充当了一个“中间人”的角色。

### 反向代理的作用

1. 隐藏后端服务器
    - 客户端无法直接访问后端服务器，只能通过反向代理。
    - 增强了后端服务器的安全性。
2. 负载均衡
    - 反向代理可以将请求分发到多个后端服务器（负载均衡），提高服务的可用性和性能。
    - 常用的负载均衡策略包括轮询（Round Robin）、最少连接数（Least Connections）等。
3. 缓存静态内容
    - 反向代理可以缓存后端的静态资源（如图片、CSS、JS 文件），减轻后端服务器的压力并加速响应速度。
4. 跨域处理
    - 在前后端分离的架构中，反向代理可以帮助解决跨域问题，因为请求看起来是直接发给代理服务器的。
5. SSL 卸载
    - 反向代理可以处理 HTTPS 请求（SSL/TLS 加密），减轻后端服务器的负担。
6. 统一入口
    - 通过反向代理，多个后端服务（如前端资源服务、API 服务）可以对外暴露为一个统一的入口（如同一个域名）。

### 反向代理的实际场景

场景 1：Vue 前端项目与 Node.js 后端的交互

假设 Vue 项目部署在 `http://frontend.example.com`，Node.js 后端运行在 `http://localhost:3000`。
直接从 Vue 项目请求后端接口可能会遇到跨域问题，使用 Nginx 反向代理可以解决这个问题：

```sh
server {
    listen 80;
    server_name frontend.example.com;

    # 静态资源服务
    root /path/to/vue/dist;
    index index.html;

    # 转发 API 请求到后端
    location /api/ {
        proxy_pass http://localhost:3000;  # 将 /api 的请求转发到后端服务器
        proxy_set_header Host $host;      # 设置请求头
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

场景 2：负载均衡

当有多个后端服务器时，反向代理可以实现负载均衡：

```sh
upstream backend_servers {
    server 192.168.1.101;
    server 192.168.1.102;
}

server {
    listen 80;

    location / {
        proxy_pass http://backend_servers;  # 将请求负载均衡到多台服务器
    }
}
```

## Nginx

Nginx 和 Apache，这两个都属于Web服务器（具体是指安装在服务器上的软件），主要负责处理 HTTP 请求，服务静态文件或作为反向代理服务器。

Nginx 是一个开源的、高性能的Web服务器，同时它也可以作为反向代理服务器、负载均衡器和HTTP缓存使用。
由于其轻量、灵活、稳定和高并发处理能力，Nginx 广泛应用于现代 Web 开发和部署中。

- 高并发性能优异，适合处理大量静态资源请求。
- 常用作反向代理、负载均衡和缓存服务器。
- Apache
  - 更适合动态内容生成（如 PHP 模块），功能丰富但性能在高并发下略逊于 Nginx。
  - 配置灵活，历史悠久，有广泛的社区支持。

### Nginx 的主要功能

- Web 服务器

Nginx 可以直接托管静态文件（如 HTML、CSS、JavaScript、图片等）。
它的架构设计使其在处理高并发连接时性能优异。

- 反向代理

Nginx 作为一个中间层，接收用户的请求，并将其转发到后端应用服务器（如 Node.js、Django、Flask 等）。

好处：
隐藏后端服务的真实地址，增加安全性。
可以通过 Nginx 处理 HTTPS 请求，从而减轻后端服务的负担。

- 负载均衡
Nginx 可以将请求分发到多个后端服务器，从而实现流量分摊，提高系统的可用性和处理能力。

常用算法：
轮询（Round Robin）
最少连接（Least Connections）
IP 哈希（IP Hash）

- HTTPS 支持
通过配置 SSL/TLS 证书，Nginx 能够处理加密请求（HTTPS），为网站提供安全保障。

- 缓存
Nginx 可以缓存后端服务器的响应，从而减少服务器压力，提高用户请求的响应速度。

- 代理 WebSocket
支持长连接和 WebSocket，适合实时通信应用（如聊天、在线游戏）。

### Nginx 的典型应用场景

1. 静态网站托管：

   - 直接将生成的静态文件（如 React、Vue 项目打包后的文件）托管在 Nginx 上。

2. 动态服务的反向代理：

   - 将用户的 HTTP 请求转发到后端服务（如 Node.js、Spring Boot 等）。

3. 负载均衡：
   - 在多个后端服务器间分发请求，实现高可用架构。

4. HTTPS 加密：
   - 配置 SSL 证书，为网站启用 HTTPS。

5. 多站点服务：
   - 通过虚拟主机支持同一服务器托管多个站点。

6. API 网关：
   - 将不同的 API 路径映射到对应的后端服务。

静态资源托管

```js
server {
    listen 80;
    server_name example.com;
    root /var/www/html;

    location / {
        index index.html;
    }
}
```

反向代理

```js
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000; # 转发到后端服务
        proxy_set_header Host $host;     # 设置请求头
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

HTTPS 配置

```js
server {
    listen 443 ssl;
    server_name secure.example.com;

    ssl_certificate /etc/nginx/ssl/example.com.crt;
    ssl_certificate_key /etc/nginx/ssl/example.com.key;

    location / {
        root /var/www/html;
        index index.html;
    }
}
```

Nginx 是现代 Web 开发中的关键工具，特别适合需要高性能、高并发处理能力的场景。
小型项目中，它可以用来托管静态资源或反向代理后端服务；
大型项目中，它可以作为负载均衡器和网关，结合云原生技术（如 Kubernetes）实现高可用性部署。

### Nginx 配置 在 传统服务器、云服务器（阿里云）、云托管平台（Vercel） 的区别是什么

- 传统服务器

传统服务器指自购物理服务器或使用托管机房服务的场景。

Nginx 配置方式：

1. 安装 Nginx：
    - 手动通过操作系统包管理器（如 apt 或 yum）安装 Nginx。
2. 配置虚拟主机：
    - 编辑 Nginx 配置文件 /etc/nginx/nginx.conf 或独立的站点配置文件。
3. 托管应用：
    - 将静态文件（HTML/CSS/JS）放在服务器的文件系统中。
    - 配置反向代理，将流量转发到后端应用（如 Node.js 或 PHP 服务）。
4. 手动维护：
    - 手动处理 SSL 证书更新（可使用 Let’s Encrypt 自动化工具）。
    - 手动优化服务器性能（如设置缓存、Gzip 压缩等）。

优缺点：

- 优点： 高度定制化，完全控制环境。
- 缺点： 需要较多的运维经验，操作复杂，难以实现自动化。

#### 云服务器

云服务器（如阿里云 ECS、腾讯云 CVM、AWS EC2）是按需提供的虚拟服务器，基础设施由云服务商管理。

特点：

- 提供灵活的资源配置，可弹性扩展。
- 开发者仍需要管理操作系统和应用环境，但运维工作量较传统服务器减少。

Nginx 配置方式：

1. 安装与配置：
    - 同传统服务器，通过包管理器安装 Nginx 并配置站点。
2. 安全组配置：
    - 云服务器自带防火墙（安全组），需要开放对应端口（如 80 和 443）以供外部访问。
3. 负载均衡（可选）：
    - 可结合云服务商的负载均衡服务（如 ALB 或 CLB），Nginx 只需作为反向代理或应用服务器。
4. 自动化运维：
    - 可结合云服务的自动化运维工具（如 Terraform、Ansible）进行配置管理和快速部署。
5. SSL 管理：
    - 使用云服务提供的证书管理服务，简化 HTTPS 部署和续期。

优缺点：

- 优点： 易于扩展，结合云服务工具实现半自动化运维。
- 缺点： 部分管理任务仍需人工完成（如环境配置）。

#### 云托管平台

云托管平台（如 Vercel、Netlify、Heroku、AWS Elastic Beanstalk）是平台即服务（PaaS），无需开发者管理底层服务器。

特点：

- 开发者专注于代码和配置，平台自动处理服务器部署和运维。
- 提供高度集成化的自动化工具，如 CI/CD、日志监控等。

Nginx 配置方式：

1. 内置或无需直接配置：
    - 云托管平台通常隐藏底层实现，可能直接使用 Nginx 或其他类似工具（如 Envoy 或 HAProxy）。
    - 开发者通过平台的配置文件（如 netlify.toml 或 vercel.json）定义路由规则和代理行为。
2. 配置简化：
    - 通过平台的 Web 控制台或 YAML 配置文件（如 AWS Beanstalk 的 Dockerrun.aws.json）定义部署行为。
    - 平台会自动处理静态资源托管、反向代理、HTTPS 等。
3. 集成 CI/CD：
    - 云托管平台通常提供完整的 CI/CD 流程，如代码提交后自动构建和发布。
4. 无服务器功能：
    - 部分平台支持无服务器架构（如 AWS Lambda 或 Vercel Serverless Functions），无需单独配置 Nginx。

优缺点：

- 优点： 部署便捷，自动化程度高，免维护底层架构。
- 缺点： 灵活性和定制化受限，可能有较高的使用成本。

**Nginx（Web 服务器）**就像是一家餐厅的厨师，负责处理和完成客户的点单。

- 传统服务器和云服务器是餐厅里的厨房和设备，提供基础设施和工具。
- 云发布平台则是外包的配送服务，你只需要提供菜单（代码），他们帮你搞定厨房、厨师和食材的调配（自动部署）。

### 前端相关的Nginx配置

#### 静态资源部署

将打包后的 Vue 项目文件（dist 文件夹）放置在服务器的目录中，并使用以下 Nginx 配置：

```sh

    server {
        listen 80;
        server_name your-domain.com;
        return 301 https://$host$request_uri;  # 自动重定向到 HTTPS
    }

    server {
        listen 443 ssl;
        server_name your-domain.com;

        ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
        
        # 指定 Vue 项目的静态资源目录
        root /path/to/frontend/dist;
        index index.html;

        # 确保单页应用可以正确处理路由
        location / {
            try_files $uri /index.html;
        }

        # 转发 /api 请求到后端服务
        location /api/ {
            proxy_pass http://127.0.0.1:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
            add_header Access-Control-Allow-Headers Content-Type,Authorization;
        }

        # 添加 Gzip 压缩以优化性能
        gzip on;
        gzip_types text/plain application/javascript text/css;

        # 缓存静态资源
        location ~* \.(?:ico|css|js|gif|jpg|jpeg|png|svg|woff|woff2|ttf|otf|eot|ttf|webp|avif)$ {
            expires 6M;
            access_log off;
            add_header Cache-Control "public";
        }
    }

```

#### 前后端联调（代理）

如何通过 Nginx 配置反向代理，把前端请求转发到后端服务：

```js

    location /api/ {
        proxy_pass http://127.0.0.1:3000;
    }

```

#### 跨域问题（CORS）

跨域问题的 Nginx 解决方案：

```js
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        add_header Access-Control-Allow-Origin *;
    }
```

#### 性能优化

配置 gzip 压缩，提升静态资源加载速度：

```js
gzip on;
gzip_types text/plain application/javascript text/css;
```

#### 常见问题与排查

1. 前端路由刷新 404
   - 需要确保 try_files $uri /index.html; 正确配置，避免直接访问前端路由路径时报错。
2. 跨域问题
   - 检查是否在 Nginx 或后端添加了 CORS 支持。
3. 无法加载静态资源
   - 检查 root 路径是否正确，静态资源文件是否存在于指定目录。
4. HTTPS 配置错误
   - 检查 SSL 证书路径是否正确，或尝试重新生成证书。

#### 掌握的核心内容

- Nginx 的基础配置语法。
- 静态资源服务配置。
- Vue SPA 的路由处理。
- 反向代理的基本设置。
- 简单的性能优化（如 Gzip 和缓存）。
- HTTPS 的基础配置（可选）。

#### 进阶知识

作为一名前端开发者，随着你的能力提升，你可能会接触到更广泛的职责，包括部署流程、性能优化和安全性等工作。此时，掌握 Nginx 的以下高级功能会非常有帮助：

- SSL/HTTPS 配置。
- 缓存策略（如设置 Cache-Control 或 ETag）。
- 动态负载均衡（与多后端服务协作）。

## Docker

Docker 是一个容器化工具，用于打包、分发和运行应用程序。

- 主要功能
  将应用程序及其依赖封装到一个独立的容器中，确保跨平台运行一致性。
  提高资源利用率，与虚拟机相比更轻量化。
  便于开发环境和生产环境的一致性。
- 使用场景
  搭建开发环境，例如运行前端的 Node.js 服务或后端的 API。
  部署生产应用，配合 Kubernetes 实现集群化管理。

Docker 将应用及其依赖封装为镜像，独立于底层操作系统。

Docker 的容器化特性与云服务器的弹性资源管理完美契合：

- 弹性伸缩： 在云服务器上可以通过容器编排工具（如 Docker Compose 或 Kubernetes）快速扩展或缩减容器数量。
- 自动化部署： 结合云服务器的 CI/CD 管道（如 Jenkins、GitLab CI）实现镜像构建和自动化部署。
- 资源高效利用： 容器的轻量化特性让云服务器可以在一个实例上运行多个容器，提高资源利用率。

例子：

- 在阿里云 ECS 上部署 Docker 容器化的 Nginx 服务，配合云服务商提供的负载均衡器，实现高可用。

Docker 可以作为云发布平台的基础构建单元：

- 标准化部署： 开发者直接上传 Docker 镜像，云发布平台运行容器实例，开发者无需关心底层操作系统。
- 无服务器架构： 某些平台（如 AWS Lambda、Vercel）支持基于 Docker 的 Serverless 应用，将容器作为函数运行环境。
- 例子：
- 在 AWS Elastic Beanstalk 上上传包含 Nginx 和后端服务的 Docker 镜像，通过配置文件定义运行时需求和资源。

Docker 提供了一种更灵活的 Nginx 部署方式：

- 快速部署： 官方提供的 Nginx 镜像可以直接运行，无需安装和配置。
- 动态扩展： 使用 Docker Compose 或 Kubernetes 动态管理多个 Nginx 容器实例。
- 一致性： 确保开发、测试、生产环境中的 Nginx 配置一致。
- 例子：
- 通过 Docker Compose 运行一个包含 Nginx（前端代理）和 Node.js（后端服务）的多容器应用。

Docker 的优势在于：

1. 跨环境一致性： 无论在传统服务器还是云环境，Docker 容器内的应用都能以相同方式运行。
2. 高效部署： 减少环境配置的复杂性，特别是与 Nginx 等常用服务结合。
3. 自动化与可扩展性： 结合 Kubernetes 等编排工具，可以实现从小型应用到大型分布式系统的无缝过渡。

## Jenkins

Jenkins 是一个持续集成/持续交付（CI/CD）工具。

`Jenkins`、`GitHub Actions`、`GitLab CI/CD` 都是 持续集成/持续部署（CI/CD）工具，用于自动化执行构建、测试、发布等工作流。

通过 Jenkins 自动化构建 Docker 镜像，并部署到服务器。

- 主要功能
自动化执行代码检查、测试、构建和部署任务。
集成 Git、Docker 等工具，在代码变更后自动触发构建和发布。
- 使用场景
自动化流水线：从拉取代码到生成部署包，再到部署上线全流程。
集成单元测试、性能测试，确保上线版本质量。

现代化部署的特点

 1. 自动化： 每个环节都通过自动化工具执行，无需人工干预。
 2. 云原生： 强调容器化、服务网格和动态扩展能力。
 3. 快速迭代： CI/CD 流程确保功能从开发到上线周期缩短。
 4. 高可用性： 结合分布式系统、容器编排和实时监控，确保系统稳定可靠。

这种部署流程已经成为许多互联网公司和 SaaS 服务的主流实践。

## 部署工作流

### 代码检查和测试

- CI/CD 工具（如 GitHub Actions、Jenkins 或 GitLab CI）集成代码规范检查（ESLint、Prettier）和单元测试（Jest）。
- 增加端到端测试（如 Cypress）确保关键路径功能正常。

持续集成（CI）

- Jenkins、GitHub Actions、GitLab CI/CD 或 CircleCI：

配置流水线，在代码提交时自动触发以下任务：

- 拉取代码并检查依赖。
- 执行单元测试（如 Jest、Mocha）。
- 执行代码扫描和静态分析（如 Snyk、Dependabot 检查安全漏洞）。
- 构建 Docker 镜像。

### 构建和发布

- 自动触发构建，将打包产物（HTML、JS、CSS 等）输出到一个独立目录（如 dist 或 build）。
- 使用版本号或哈希管理文件，避免浏览器缓存问题。

### 部署工具

- 利用 Docker 容器化应用，减少环境依赖问题。
- 使用自动化工具如 Ansible 或 Terraform 管理部署配置。

构建与制品管理

构建过程：

- 容器化：
构建 Docker 镜像，将代码和依赖打包到容器中。
- 基础镜像采用轻量化镜像（如 alpine）以减小镜像体积。
- 使用多阶段构建分离开发与生产依赖，进一步优化镜像大小。

制品存储：

- 镜像仓库：
将 Docker 镜像推送到私有或公共镜像仓库，如 Docker Hub、Amazon ECR、Harbor。
- 其他制品：
使用 Artifactory 或 Nexus Repository 存储非容器化制品（如压缩包、二进制文件）。

### 发布策略

- 配置 Nginx 或 Apache 反向代理，设置缓存策略和压缩传输（gzip）。
- 如果是微前端架构，通过动态加载模块实现独立部署。

### 灰度发布和回滚

- 部署到云服务平台（如 AWS、阿里云、Vercel），结合蓝绿部署、灰度发布策略上线。
- 使用日志和监控工具（如 ELK、Prometheus）监控发布状态，如有问题快速回滚。

持续部署（CD）

- 部署自动化工具：
使用 ArgoCD、FluxCD 或 Spinnaker 管理 Kubernetes 集群中的自动化部署。
- 蓝绿部署/金丝雀发布：
通过 Istio 或 Linkerd 实现流量切分，逐步将流量引导到新版本服务。
- 无停机更新：
使用 Kubernetes 的滚动更新特性，确保更新期间的服务高可用。

容器编排：
Kubernetes（K8s）作为核心调度和管理平台，配合 Helm 管理复杂应用的部署模板。

#### 案例：某大型企业级管理后台的上线流程

- 项目复杂度：前端涉及 100+ 页面，包含动态模块加载和多语言支持。
- 使用 Vite 配合 TailwindCSS 进行开发，优化热更新速度。
- 构建阶段分环境生成不同配置文件，利用 Webpack 的模块联邦打包不同子模块。
- 使用 Docker 镜像封装前后端服务，部署到 Kubernetes 集群中。
- 上线时，通过 Jenkins 配置 CI/CD 流程，先运行单元测试和端到端测试，然后执行灰度发布，监控异常后实现无缝回滚。

展示你的细节掌控力和问题解决能力，例如：

- 解决过某次构建后文件超大导致加载缓慢的问题。
- 部署后发现线上环境中某些特性未生效，最终通过快速定位环境变量配置问题解决。

## 小团队简化工作流

### 开发阶段

#### 版本控制

使用 Git 搭配 GitHub/GitLab 免费版本，管理代码和协作。

#### 代码质量控制

集成简单的工具，如 ESLint、Prettier 及 简单的 CI 配置检查。

#### 本地开发环境

使用 Docker 创建一致的本地开发环境，减少环境差异。
如果项目较简单，可以直接在本地安装 Node.js 或 Python 环境，无需容器化。

### 持续集成（CI）

GitHub Actions 或 GitLab CI/CD（推荐）：内置于代码托管平台，免费、轻量，适合小团队。

配置简单的流水线，完成以下任务：

- 安装依赖和运行测试。
- 构建前端代码（如打包 Vue 项目）。
- 构建 Docker 镜像（如需要容器化部署）。

### 构建与制品管理

构建过程：
容器化：如果团队熟悉 Docker，可打包应用到容器镜像中。
否则，直接打包为 ZIP 文件（前端静态文件）或 JAR 文件（后端服务）。

制品存储：
如果使用 Docker，可将镜像推送到 Docker Hub 免费版本或 GitHub Container Registry。
对于非容器化项目，直接将构建好的文件上传到云存储（如 AWS S3 或七牛云）。

### 持续部署（CD）

简单的自动化部署：

PM2（Node.js 项目）： 用于进程管理和应用部署。
Shell 脚本： 编写简单脚本完成拉取代码、构建和重启服务的操作。
GitHub Actions 自动化部署： 配置 SSH 登录到服务器，拉取最新代码并重启服务。

部署方式：

云服务器部署：
使用 VPS（如腾讯云、阿里云、AWS Lightsail）托管服务。
配置 Nginx 作为反向代理，将流量转发到后端服务或前端静态资源目录。

平台服务：
使用 Vercel 或 Netlify 部署前端应用。
使用 Railway 或 Heroku 托管简单的后端服务。

#### 简单案例：Vue.js 前端 + Node.js 后端

1. 前端：
   - 使用 Vite 构建静态文件，上传到服务器（或直接部署到 Vercel）。
   - 配置 Nginx 托管 dist 文件夹，启用 HTTPS。

2. 后端：
   - 使用 Node.js 和 Express 提供 API 服务。
   - 部署到云服务器，使用 PM2 启动并管理。
   - 配置 Nginx 将 /api 路由转发到 Node.js 服务。

适合小团队的特点

1. 轻量化： 减少复杂工具，优先选择易用、集成度高的解决方案（如 Vercel、GitHub Actions）。
2. 自动化： 实现必要的自动化，减少重复性工作。
3. 可扩展性： 随着团队和业务增长，可以逐步增加 Kubernetes、Terraform 等更高级工具。

## 小团队简化部署

什么时候选 CloudBase？

- 如果你的项目是小程序、需要后端支持，或者深度依赖微信生态，CloudBase 是更优的选择。

什么时候选 Vercel？

- 如果你专注于现代前端框架开发，或者需要部署静态网站（如个人博客、企业官网），Vercel 提供最佳体验。

### uni-app 一套代码，H5 + 小程序 部署整合

（1）部署思路

- H5：部署到静态网站托管服务，如 CloudBase / Vercel、或自建 Nginx。
- 小程序：使用微信开发者工具，将代码上传到微信后台。
- 后端服务：统一使用腾讯云 CloudBase 提供的 云函数 和 云数据库，避免为两端开发和维护独立的后端。

（2）实际操作步骤

- 准备代码：

H5 和 小程序 需要分别打包：

```sh
    npm run build:h5
    npm run build:mp-weixin   
```

- H5 部署：
  - 选择 CloudBase / Vercel 静态托管服务，将 dist/build/h5 部署。
  - 如果使用自建服务器，配置 Nginx 托管静态资源。

- 小程序部署：
  - 将 dist/build/mp-weixin 导入微信开发者工具，配置并上传至微信后台。

- 后端服务部署：
  - 将后端逻辑封装成云函数，部署到 CloudBase，统一为 H5 和 小程序 提供 API 支持。

- 跨域和权限处理：
  - 在 H5 开发中，配置 devServer.proxy 或 Nginx 反向代理解决跨域问题。
  - 小程序中无需配置跨域，因为其通信由微信官方 SDK 处理。

#### UniApp 项目使用无服务器架构的好处

1. 前后端分离：
    - H5 和 小程序 使用同一个`云端后端`，减少重复开发。
2. 省时高效：
    - 使用 CloudBase / Vercel 等全托管平台，减少服务器配置和运维时间。
3. 弹性扩展：
    - 云函数和数据库按需扩容，适应不同流量需求。
4. 集中管理：
    - 代码、资源、后端服务都可在云端统一管理。

#### 基于 unicloud 的全栈技术方案

**前端技术栈：**

- **uni-app**：使用 Vue.js 开发所有前端应用的框架，支持跨平台部署。
- **uView** 或 **uni-ui**：免费且功能丰富的 UI 框架，用于快速搭建界面。
- **HBuilderX**：免费的开发工具，提供代码编写、调试、预览等功能。

**后端技术栈：**

- **unicloud**：提供云函数、云数据库和云存储等服务。
  - **unicloud-db**：用于操作云数据库。
  - **unicloud-storage**：用于操作云存储。

**数据库技术栈：**

- **unicloud 云数据库**：基于 MongoDB 的文档型数据库，无需额外费用。

**部署和工具：**

- **unicloud**：提供免费的服务器资源，用于部署后端服务。
- **DCloud**：用于发布和管理 uni-app 项目。
- **Git**：版本控制系统，用于代码管理和协作。

**学习资源：**

- **uni-app 官方文档**：提供详细的开发指南和API参考。
- **DCloud 论坛**：交流社区，可以找到教程、问答和最佳实践。

**全栈开发流程：**

1. **项目初始化**：使用 HBuilderX 初始化 uni-app 项目。
2. **前端开发**：使用 uni-app 和 UI 框架编写前端代码。
3. **后端开发**：在 unicloud 控制台上创建云函数，这些函数可以直接处理来自前端的请求。
4. **数据库设计**：在 unicloud 控制台设计数据库结构，可以使用unicloud-db客户端 SDK 在前端或云函数中操作数据库。
5. **测试和调试**：在 HBuilderX 中进行应用的测试和调试。
6. **部署**：将前端代码打包发布到各个平台，将后端服务部署到 unicloud。

这个技术栈的优势在于：

- **低成本**：所有工具和平台都是免费的，适合预算有限的项目。
- **易上手**：选择的技术栈对初学者友好，学习曲线平缓。
- **跨平台**：uni-app 支持多平台发布，提高开发效率。
- **社区支持**：uni-app 和相关技术有活跃的社区，便于解决问题和学习交流。

通过这个技术栈，你可以以最低的成本快速搭建和部署一个全栈项目。随着项目的成长和预算的增加，你可以逐步引入更多的付费服务和高级功能。

## Vue3 + Node 全栈项目部署

前端（Vue3 部分）

- Vue3 项目构建为静态文件（HTML、CSS、JS），然后部署到：
- 静态文件服务器（如 Nginx）。
- CDN（如阿里云 OSS+CDN 或 AWS S3+CloudFront）。
- 云平台（如 Vercel、Netlify）。

后端（Node.js 部分）

- Node.js 服务器运行你的 API 服务，部署到：
- 云服务器（如阿里云、腾讯云、AWS EC2）。
- 容器服务（如 Docker 或 Kubernetes）。
- 云函数（如 AWS Lambda、阿里云函数计算，适合无状态服务）。

### 部署流程

#### 前端

- 打包构建

```sh
npm run build
```

生成的静态资源文件（如 dist 文件夹）将用于部署。

- 部署静态资源

方式 1：Nginx

将 dist 文件夹上传到服务器, 并配置 Nginx：

```js
    server {
        listen 80;
        server_name your-domain.com;

        root /path/to/dist;
        index index.html;

        location / {
            try_files $uri /index.html;
        }
    }
```

重启 Nginx：

```sh
sudo systemctl restart nginx
```

方式 2：云托管平台

1. 使用 Vercel / Netlify，将项目推送到 Git 仓库，自动部署静态文件。
2. 配置自定义域名。

方式 3：CDN

1. 将静态资源上传到 CDN 服务（如阿里云 OSS、腾讯云 COS）。
2. 配置 CDN 域名和缓存规则。
3. 前端访问使用 CDN 的域名地址。

#### 后端

- 准备服务器环境

安装 Node.js

```sh
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

安装 PM2（用于管理 Node.js 进程）

```sh
npm install -g pm2
```

- 上传后端代码

将 Node.js 项目代码上传到服务器（例如使用 SCP 或 Git）。

安装依赖

```sh
npm install
```

运行 Node.js 服务

本地测试运行：
    ```sh
    node app.js
    ```

使用 PM2 部署

```sh
pm2 start app.js --name "node-backend"
pm2 save
pm2 startup
```

配置反向代理（Nginx）

使用 Nginx 将流量转发到 Node.js 服务：

```sh
server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

测试接口
确保你的 API 可以正常访问，例如：`http://api.your-domain.com`

#### 配置前后端联调

在前端代码中，将后端 API 地址设置为生产环境地址：
使用环境变量管理：

```js
const API_BASE_URL = process.env.VUE_APP_API_URL || "http://api.your-domain.com";
```

构建时指定环境变量：

```sh
VUE_APP_API_URL="http://api.your-domain.com" npm run build
```

确保后端允许跨域访问（CORS）：
在后端代码中（如使用 Express）：

```js
const cors = require('cors');
app.use(cors());
```

#### 优化和安全措施

HTTPS 配置

- 使用 Let’s Encrypt 免费证书：

```sh
    sudo certbot --nginx
```

- 性能优化

前端使用 CDN 加速静态资源。

后端启用 gzip 压缩：

```js

const compression = require('compression');
app.use(compression());
```

- 监控和日志

使用 PM2 的监控功能：

```sh
pm2 monit
pm2 logs
```

- 自动化部署

配置 CI/CD 工具（如 GitHub Actions 或 Jenkins）实现自动构建和发布。

#### 总结

部署技术栈：

- 前端：
- Vue3 项目 → 构建静态文件 → 部署到 Nginx、CDN 或云平台。
- 后端：
- Node.js 服务 → 部署到云服务器 → 配置 Nginx 反向代理。

```js
用户请求 → Nginx
- 静态资源请求 → Vue3 静态文件
- API 请求 → Node.js 服务
```

## 小程序云开发的部署流程

1. 开发环境准备：
   - 小程序代码（前端部分）通过小程序开发者工具进行开发和调试。
   - 后端服务代码（如云函数）在云开发环境中完成。
2. 云资源配置：
   - 数据库：在云开发平台中创建数据库，用于存储业务数据。
   - 存储：用于存储图片、视频等静态资源。
   - 云函数：编写后端逻辑（如用户登录、数据处理），无需配置传统服务器。
3. 部署代码：
   - 前端代码：
   - 小程序代码通过小程序开发者工具直接上传到微信官方后台。
   - 后端代码：
   - 云函数代码可以直接在小程序开发者工具中上传并部署到云环境。
   - 部署完成后会自动生成 API 接口供小程序前端调用。
4. 关联云环境：
   - 小程序需要配置云环境 ID，确保前端代码可以正确调用云端的服务。
5. 上线发布：
   - 小程序代码提交审核，通过后用户即可访问。
