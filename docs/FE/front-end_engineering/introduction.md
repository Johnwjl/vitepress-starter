# 前端工程化

前端工程化指的是通过一系列工具、流程和规范来提升前端开发的效率、可维护性和稳定性。它不仅限于代码的构建，还包括开发流程、项目管理和工具链等。具体内容包括：

- 模块化：将代码拆分为可复用的模块。
- 自动化工具：使用工具（如 Webpack、Vite）进行自动化构建（如 打包、代码优化等）。
- 版本管理：通过 Git 等版本管理工具进行代码协作和管理。
- 开发规范：代码风格、项目结构、命名规范、lint 检查等。
- 持续集成与持续部署：通过 CI/CD 管道自动化测试、部署。
- 开发环境配置：开发、测试、生产环境的区分和配置管理。
- 性能优化：包括代码压缩、懒加载、按需加载、资源缓存等优化手段。

## 整体开发流程

以 Vue 3 技术栈 为例，涵盖从开发到部署的各个环节，确保项目在可维护性、开发效率、性能和可扩展性方面达到最佳状态。

### 开发阶段

使用 Vue 3 开发组件、页面、功能等。

#### 项目初始化与目录结构

- 项目初始化

使用官方工具 Vite 来初始化 Vue 3 项目。

```sh
npm create vite@latest my-vue3-project --template vue
cd my-vue3-project
npm install
```

- 目录结构

```sh
src/：存放源代码。
src/components/：通用的 Vue 组件。
src/views/：页面级组件。
src/router/：路由配置文件。
src/store/：状态管理（如使用 Vuex 或 Pinia）。
src/assets/：静态资源（图片、字体等）。
src/utils/：工具函数和帮助类。
src/styles/：全局样式文件、CSS 变量等。
src/composables/：Vue 3 中的 Composition API 函数。
```

1. 构建阶段：使用 Vite 进行构建，将开发阶段的代码进行优化和打包。
2. 测试阶段：使用 Jest 等测试工具进行单元测试、集成测试等。
3. 部署阶段：将构建好的代码部署到服务器或云平台上。

#### 开发环境配置

- 开发服务器：Vite 自带的开发服务器，支持热更新（HMR）和快速重载。
- 别名配置：在 vite.config.ts 中设置常用的路径别名，便于导入模块时简化路径。

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 使用 @ 代表 src 目录
    },
  },
});
```

#### 模块化与组件化

- 组件化：将界面细化为独立的 Vue 组件，便于维护和复用。
- 模块化：通过 ES 模块拆分代码，使用 Vue 的 Composition API 把逻辑组织为独立的 composable 模块。

#### 路由管理

Vue Router 4：支持 Vue 3 的官方路由库。

- 安装

```sh
npm install vue-router
```

- 使用

```ts
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: () => import('@/views/About.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

#### 状态管理

Pinia 作为 Vue 3 的官方状态管理工具，比 Vuex 更轻量。

- 安装

```sh
npm install pinia
```

- 使用

```ts
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

#### 样式管理

预处理器：支持 Sass、Less 或 Stylus 等预处理器

```sh
npm install sass
```

在组件中导入样式：

```vue
<style lang="scss">
@import '@/styles/variables.scss';

.container {
  color: $primary-color;
}
</style>
```

- CSS Modules：模块化样式管理，避免全局样式污染。
- CSS 变量：全局使用 CSS 变量（如颜色、间距等），便于维护。

#### API 管理与网络请求

使用 Axios 进行 HTTP 请求，并封装统一的请求管理。

- 安装

```sh
npm install axios
```

- 使用

```ts
// src/utils/request.ts
import axios from 'axios';

const request = axios.create({
  baseURL: process.env.VITE_API_BASE_URL, // 使用环境变量
  timeout: 10000,
});

request.interceptors.request.use(
  config => {
    // 在这里添加请求拦截逻辑（如添加 token）
    return config;
  },
  error => Promise.reject(error)
);

request.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default request;
```

#### 开发规范与代码质量

- ESLint：代码规范检查

```sh
npm install eslint eslint-plugin-vue --save-dev
```

- Prettier：代码格式化工具

```sh
npm install prettier eslint-plugin-prettier eslint-config-prettier --save-dev
```

```json
// .prettierrc 
{
  "singleQuote": true,
  "semi": false
}
```

#### 单元测试与端到端测试

Vitest：基于 Vite 的快速单元测试工具。

```sh
npm install vitest @testing-library/vue @testing-library/jest-dom --save-dev
```

示例测试文件：

```ts
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/vue';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld', () => {
  it('renders properly', () => {
    const { getByText } = render(HelloWorld, { props: { msg: 'Hello Vitest' } });
    expect(getByText('Hello Vitest')).toBeInTheDocument();
  });
});
```

Cypress：端到端测试工具，用于自动化 UI 测试。

```sh
npm install cypress --save-dev
```

#### 环境变量管理

使用 .env 文件管理不同环境下的变量：

- `.env.development`
- `.env.production`

```sh
VITE_API_BASE_URL=https://api.example.com
```

### 预发布阶段

#### 构建（build）

- 使用 Vite / Vue CLI 的 build 命令进行项目构建。
- 生成生产环境的静态资源。

```sh
npm run build
```

构建工具（build tool）以 Vite 为例，Vite 是一个现代的前端构建工具，它提供了快速的开发服务器和高效的构建过程。以下是 Vite 的一些关键概念和功能：

构建指的是将开发中的源码转化为可在生产环境运行的代码。这个过程通常包括：

- 编译

将现代 JavaScript（如 ES6+）、TypeScript、Sass 等转换为浏览器兼容的 JavaScript 和 CSS。

- 性能优化

  - 代码分割（Code Splitting）
  - 懒加载：通过 Vue Router 进行懒加载，按需加载组件。
  - Tree-shaking：Vite 默认支持 Tree-shaking，移除未使用的代码。
  - 图片优化：使用 WebP 格式的图片，提高加载效率。
  - 代码压缩：Vite 默认使用 terser 进行生产环境代码压缩。
  - 资源压缩（如图片、CSS、JavaScript）。

- 资源管理

处理图片、字体、样式等静态资源。

- 打包（bundle）

打包是指合并模块和资源，即将模块化代码和依赖合并为一个或多个可执行文件。
也就是将多个模块的文件（JavaScript、CSS、资源等）合并为一个或多个 bundle 文件。
Vite 使用的打包工具（如 rollup）负责这一过程。打包通常包括模块依赖的解析和合并，确保所有依赖关系被正确管理。

#### 安全检查

- 检查依赖包的安全性。
- 使用安全相关的 npm 脚本。

### 部署阶段

#### 选择部署环境

根据项目需求选择合适的托管平台，如 Vercel、Netlify、AWS、阿里云等。

#### 持续集成/持续部署（CI/CD）

- Git：使用 Git 进行版本控制，遵循 Git 分支管理策略。
- CI/CD：集成 GitHub Actions、GitLab CI 或 Jenkins 自动化构建和部署流程。
- 容器化部署：使用 Docker 来容器化前端应用，确保跨平台部署的一致性。
  - 创建 Dockerfile：

    ```Dockerfile
    FROM node:16-alpine

    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .

    RUN npm run build

    EXPOSE 80
    CMD ["npx", "serve", "dist"]
    ```

#### 生产环境优化

- 缓存优化：通过 HTTP 缓存策略和文件名哈希确保缓存的有效利用。
- CDN 加速：使用 CDN 提供静态资源加速。

#### 域名和 HTTPS

- 绑定域名。
- 配置 SSL 证书实现 HTTPS。

#### 监控与日志

- 配置应用性能监控工具，如 Sentry、New Relic。
- 配置日志收集和分析系统。

#### 回滚计划

- 准备好回滚方案，以防万一部署出现问题。


打包流程的优化实践

	•	多环境支持：
我们会在构建工具中配置多环境变量文件（env 或 .env 文件），以支持开发、测试、预发布和生产环境的构建。
	•	性能优化：
压缩代码（Terser），图片资源优化（ImageMinimizerPlugin），使用 CDN 加载第三方依赖减少主包体积。
