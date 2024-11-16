# Vue3 环境变量 env

## Vue3 项目是如何配置、使用、处理 env 环境变量的？

在 Vue 3 项目中，环境变量通过 .env 文件进行配置和管理，并且 Vite 作为 Vue 3 默认的构建工具，它对环境变量的处理方式与传统的 Vue CLI 有所不同。以下是 Vue 3 项目如何配置、使用和处理环境变量的详细介绍：

### 环境变量文件命名规范

Vite 支持的环境变量文件通常命名为 .env 文件，使用不同的后缀来标识不同的环境。常见的文件有：

- .env：默认的环境变量文件，所有环境都共享。
- .env.local：本地环境变量文件，不应提交到版本控制。
- .env.development：用于开发环境的变量。
- .env.production：用于生产环境的变量。
- .env.test：用于测试环境的变量。

每个文件中的变量会根据运行的环境进行加载和合并。例如，生产环境下 .env 和 .env.production 的变量都会加载。

### 环境变量前缀

在 Vite 中，所有需要被应用代码访问的环境变量必须以 VITE_ 前缀开头。其他变量则不会被暴露给客户端，只能在 Vite 的配置文件中使用。

例如：

```env
# .env 文件
VITE_APP_TITLE="My Vue 3 App"
VITE_API_URL="https://api.example.com"
```

### 在代码中使用环境变量

在 Vue 3 项目中，环境变量可以通过 import.meta.env 来访问，这是 Vite 提供的全局对象。

例如，访问上面定义的变量：

```js
// 在 Vue 组件或 JavaScript 文件中
console.log(import.meta.env.VITE_APP_TITLE); // 输出：My Vue 3 App
console.log(import.meta.env.VITE_API_URL);   // 输出：https://api.example.com
```

Vite 会在构建时自动替换 import.meta.env 中的环境变量，因此你可以在代码中安全使用这些变量，而不用担心它们会在最终产出的代码中以字符串形式暴露。

1. 定义类型声明

为了让 TypeScript 正确识别 import.meta.env 中的变量，你可以在项目的类型声明文件（比如 env.d.ts）中添加环境变量的类型声明。通常的做法是扩展 ImportMetaEnv 接口。

```ts
// env.d.ts 文件
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_URL: string;
  // 其他环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

这样当你访问 import.meta.env 中的变量时，TypeScript 会进行类型检查和自动补全。

### 环境变量的加载顺序

Vite 会按照以下顺序加载环境变量，后者会覆盖前者：

- .env 文件
- .env.local 文件
- .env.[mode] 文件（比如 .env.development、.env.production）
- .env.[mode].local 文件

因此，如果你想让某个变量只在本地生效而不被其他人看到，可以将它放在 .env.local 或 .env.[mode].local 中，这样就不会提交到版本控制中。

1. 在 Vue 项目中动态使用环境变量

你可以根据环境变量动态改变应用的行为。例如，使用不同的 API 地址来区分开发和生产环境。

```js

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
fetch(apiUrl + '/some-endpoint')
  .then(response => response.json())
  .then(data => console.log(data));

```

### 在 Vue 3 模板中使用环境变量

你也可以在 Vue 3 的模板文件（.vue 文件）中使用环境变量：

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup>
const title = import.meta.env.VITE_APP_TITLE;
</script>
```

### 使用 .env 文件与 Vite 配置结合

环境变量也可以用于 Vite 的配置文件 vite.config.js 中。例如，你可以根据 NODE_ENV 或自定义的 VITE_ 前缀变量来设置不同的打包配置。

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  base: import.meta.env.VITE_BASE_URL || '/',
  build: {
    sourcemap: import.meta.env.NODE_ENV === 'development',
  },
});
```

### 示例 .env 文件

以下是一个简单的 .env 文件示例，展示了如何配置一些常见的环境变量：

```env

# .env 文件

# 应用名称
VITE_APP_TITLE="My Vue 3 App"

# API 基础地址
VITE_API_URL="https://api.example.com"

# 调试模式
VITE_DEBUG=true

```

在这个文件中，我们定义了 VITE_APP_TITLE（应用标题）、VITE_API_URL（API 基础地址）和 VITE_DEBUG（调试模式）三个环境变量。

## 在 Vue 3 项目中，环境变量的作用和常用的使用场景是哪些

在 Vue 3 项目中，环境变量的作用主要体现在配置和管理项目在不同环境下的行为。
通过使用环境变量，你可以根据开发、测试、生产等不同的环境，动态地调整项目的配置，避免硬编码，并使应用更加灵活和易于维护。

### 环境变量的作用

- 区分不同环境：在开发环境、测试环境、生产环境之间切换时，环境变量允许项目根据当前环境动态应用不同的配置。
- 保护敏感信息：可以将敏感信息（例如 API 密钥、数据库连接字符串等）存储在环境变量中，避免将这些信息硬编码在- 或暴露在客户端。
- 简化配置管理：通过环境变量，你可以集中管理项目的全局配置，减少代码中的重复设置，也让配置变得更加可控。
- 灵活的构建配置：根据环境变量的不同，项目可以生成不同的构建版本（如启用或禁用调试模式、选择不同的 API 地址等），从而为不同的环境生成最优化的产出。

### 常用的使用场景

1. API 基础 URL 配置

根据环境的不同，前端项目可能会与不同的 API 服务器通信。通过环境变量，可以动态配置 API 的基础 URL。

```env

# .env.development
VITE_API_URL=http://localhost:3000

# .env.production
VITE_API_URL=https://api.example.com

```

在代码中使用：

const apiUrl = import.meta.env.VITE_API_URL;
fetch(`${apiUrl}/endpoint`)
  .then(response => response.json())
  .then(data => console.log(data));

### 启用或禁用调试模式

在开发环境中，通常会开启调试功能，而在生产环境中会禁用这些功能。环境变量可以用来控制调试模式的开关。

```env

# .env.development
VITE_DEBUG=true

# .env.production
VITE_DEBUG=false

```

在代码中使用：

```js

if (import.meta.env.VITE_DEBUG === 'true') {
  console.log('Debug mode is enabled');
}

```

### 不同环境下的第三方服务配置

前端项目经常需要与第三方服务集成，如支付网关、地图服务等。通过环境变量，可以配置这些服务的不同环境（如测试、生产）的访问密钥或地址。

```env

# .env.development
VITE_GOOGLE_MAPS_KEY="your-development-google-maps-key"

# .env.production
VITE_GOOGLE_MAPS_KEY="your-production-google-maps-key"

```

在代码中使用：

```js

const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
loadGoogleMapsApi(googleMapsKey);

```

### 项目的基础路径

如果你的项目需要部署在不同的路径下（如生产环境是子路径 /app），你可以使用环境变量来配置项目的基础路径。

```env

# .env.development
VITE_BASE_URL="/"

# .env.production
VITE_BASE_URL="/app/"

```

在 vite.config.js 中使用：

```js

import { defineConfig } from 'vite';

export default defineConfig({
  base: import.meta.env.VITE_BASE_URL,
});

```

### 控制代码中的功能开关

环境变量可以用于控制某些功能是否启用，特别是在不同环境下启用或禁用某些实验性功能。

```env

# .env
VITE_FEATURE_X_ENABLED=true

```

在代码中使用：

```js

if (import.meta.env.VITE_FEATURE_X_ENABLED === 'true') {
  // 启用特定功能
  enableFeatureX();
}

```

### CDN 配置

在生产环境中，你可能需要从 CDN 上加载静态资源。可以通过环境变量来定义 CDN 地址。

```env

# .env.production
VITE_CDN_URL="https://cdn.example.com"

```

在代码中使用：

```js

const cdnUrl = import.meta.env.VITE_CDN_URL;
const imageUrl = `${cdnUrl}/images/logo.png`;

```

### 构建优化和插件配置

根据不同环境，配置 Vite 的构建优化参数或插件选项。例如，在生产环境中开启更多的优化选项，在开发环境中关闭一些资源压缩功能。

```js

import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: import.meta.env.NODE_ENV === 'production',
    sourcemap: import.meta.env.NODE_ENV !== 'production',
  },
});

```

### 动态设置国际化语言

如果你的项目需要根据环境切换不同的语言，可以通过环境变量配置默认语言。

```env

# .env.development
VITE_DEFAULT_LANGUAGE=en

# .env.production
VITE_DEFAULT_LANGUAGE=zh

```

在代码中使用：

```js

const defaultLanguage = import.meta.env.VITE_DEFAULT_LANGUAGE || 'en';
i18n.locale = defaultLanguage;

```

### 小结

环境变量在 Vue 3 项目中的作用主要体现在以下几个方面：

- 配置不同环境的 API 服务器；
- 控制功能的启用或禁用；
- 设置项目的基本路径、CDN 地址等资源相关的配置；
- 管理敏感信息，如 API 密钥或服务配置；
- 根据环境调整构建优化、调试模式等配置。

这些变量使项目更灵活、模块化，有助于减少硬编码，提升代码的可维护性和安全性。
