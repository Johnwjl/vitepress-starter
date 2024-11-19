# three3d 项目拆解学习

项目源码地址：https://github.com/lhpCode/three3d
我的fork仓库：https://github.com/Johnwjl/three3d

## 目录结构

```js
.env.development
.env.production
.eslintrc.cjs
.prettierrc
.gitignore
auto-imports.d.ts
components.d.ts
env.d.ts
index.html
package-lock.json
package.json
public/
  fbx/
  gltf/
  image/
  texture/
src/
  App.vue
  components/
    card/
  hooks/
    useEcharts.ts
    useEchartsData.ts
    useThree.ts
    useVModel.ts
  main.ts
  style.css
  utils/
    createDom/
      device.ts
    threeUtils/
  tsconfig.json
  tsconfig.node.json
vite.config.ts
```

以下是对目录结构的详细解释：

- `.env.development` 和 `.env.production`：这两个文件用于配置**开发和生产环境的环境变量**。
- `.eslintrc.cjs` 和 `.prettierrc`：这两个文件分别用于配置 `ESLint` 和 `Prettier`，它们是**代码检查和格式化的工具**，可以帮助团队保持一致的代码风格。
- `.gitignore`：这个文件用于指定哪些文件或目录**不会被 Git 跟踪**。
- `auto-imports.d.ts` 和 `components.d.ts`：这两个文件可能用于 `TypeScript` 的**自动导入**和**组件类型**定义。
- `env.d.ts`：这个文件用于 `TypeScript` 的**环境声明**。
- `index.html`：这是项目的**入口 HTML 文件**。
- `package-lock.json` 和 `package.json`：这两个文件用于**管理项目的依赖和版本**。
- `public/`：这个目录包含了所有的**公共文件**，如 `fbx/`、`gltf/`、`image/` 和 `texture/` 等子目录，这些子目录可能包含了项目所需的各种资源文件。
- `src/`：这个目录是项目的**源代码**目录，包含了所有的 `Vue 组件`、`JavaScript 文件`、`TypeScript 配置文件` 等。
- `App.vue`：这是 **Vue 应用的根组件**。
- `components/`：这个目录包含了所有的 **Vue 组件**，如 `card/` 子目录下的组件。
- `hooks/`：这个目录包含了所有的**自定义 Vue 钩子**，如 `useEcharts.ts`、`useEchartsData.ts`、`useThree.ts` 和 `useVModel.ts` 等。
- `main.ts`：这是 **Vue 应用的入口文件**，负责初始化 Vue 实例和挂载应用。
- `style.css`：这是项目的**全局样式文件**。
- `utils/`：这个目录包含了所有的**工具函数和模块**，如 `createDom/` 子目录下的 `device.ts` 文件，以及 `threeUtils/` 子目录下的文件。
- `tsconfig.json` 和 `tsconfig.node.json`：这两个文件用于**配置 TypeScript**编译器的行为。
- `vite.config.ts`：这是 **Vite 配置文件**，用于配置 Vite 开发服务器和构建工具。

## 非 `src/` 文件详解

### `tsconfig.json`

`tsconfig.json` 文件，它是 TypeScript 编译器的配置文件，用于指定 TypeScript 项目的编译选项。

以下是对代码的详细解释：

```json

{
  "compilerOptions": { // 这是一个对象，包含了 TypeScript 编译器的所有选项。
    "target": "ESNext", // 指定编译的目标 ECMAScript 版本，这里是 "ESNext"，表示最新的 ECMAScript 版本。
    "module": "ESNext", // 指定模块系统，这里是 "ESNext"，表示使用最新的 ECMAScript 模块系统。
    "moduleResolution": "Node", // 指定模块解析策略，这里是 "Node"，表示使用 Node.js 的模块解析策略。
    "isolatedModules": true, // 确保每个文件都是一个独立的模块。
    "strict": true, // 启用所有严格类型检查选项。
    "resolveJsonModule": true, // 启用对 .json 文件的模块解析。
    "esModuleInterop": true, // 启用该编译选项，以便更好地与 CommonJS 模块交互。
    "useDefineForClassFields": true, // 启用 class 字段的 define 语法。
    "jsx": "preserve", // 指定 JSX 代码的处理方式，这里是 "preserve"，表示保留 JSX 代码。
    "suppressImplicitAnyIndexErrors": true, // 抑制隐式 any 类型索引错误。
    "lib": ["ESNext", "DOM"], // 指定编译时需要包含的库文件，这里是 "ESNext" 和 "DOM"，表示包含 最新的ECMAScript库 和 DOM 库。
    "baseUrl": ".", // 指定解析非相对模块名称的基路径，这里是 "."，表示当前目录。
    "paths": {
      "@/*": ["src/*"] // 指定模块名到基于 baseUrl 的路径映射，这里是 "@/*" 映射到 "src/*"，用于配置 @ 别名。
    },
    "skipLibCheck": true, // 跳过对库文件的类型检查。
    "noEmit": true, // 不生成输出文件。
    // "ignoreDeprecations": "5.0", // 忽略指定版本的弃用警告，这里是 "5.0"。
    
  },
  "include": ["src/**/*.ts", "**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"], // 指定需要被编译的文件或目录，这里包括了 src 目录下的所有 .ts、.d.ts、.tsx 和 .vue 文件。
  "references": [
    {
      "path": "./tsconfig.node.json" // 指定项目的引用配置，这里引用了 ./tsconfig.node.json 文件。
    }
  ]
}

```

### `vite.config.ts`

`vite.config.ts` 是 Vite 的配置文件，定义了 Vite 的构建打包和开发环境服务器的相关配置，包括：模块打包、开发服务器、热更新等任务。

在这个文件中，你可以配置 Vite 的各种选项，如插件、路径别名、开发服务器端口、构建输出目录等。

```ts
// vite.config.ts
import { defineConfig, loadEnv } from "vite"; // 导入 Vite 提供的 defineConfig 和 loadEnv 函数。
import vue from "@vitejs/plugin-vue"; // 导入 Vue.js 插件，用于支持 Vue 单文件组件。
import svgLoader from "vite-svg-loader"; // 导入 vite-svg-loader 插件，用于在 Vue 项目中加载 SVG 文件。
import AutoImport from "unplugin-auto-import/vite"; // 导入 unplugin-auto-import 插件，用于自动导入 Vue 组件和 API。
import Components from "unplugin-vue-components/vite"; // 导入 unplugin-vue-components 插件，用于自动导入 Vue 组件。
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"; // 导入 ElementPlusResolver，用于自动导入 Element Plus 组件。
import eslint from "vite-plugin-eslint"; // 导入 vite-plugin-eslint 插件，用于在开发过程中检查 TypeScript 代码的错误。
import { resolve } from "path"; // 导入 Node.js 的 path 模块，用于处理文件路径。

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const { VITE_BASE_API } = loadEnv(configEnv.mode, process.cwd());
  return {
    plugins: [
      vue(),
      // eslint(),
      svgLoader(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      extensions: [
        ".mjs",
        ".js",
        ".ts",
        ".jsx",
        ".tsx",
        ".json",
        ".scss",
        ".css",
      ],
      alias: {
        "@": resolve(__dirname, "./src"),
        "@public": resolve(__dirname, "./public"),
      },
    },
    base: "./",
    server: {
      host: true,
      port: 8888,
      open: true,
      cors: true,
      proxy: {
        "/api": {
          target: VITE_BASE_API, // 测试地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
      warmup: {
        clientFiles: ["./src/layouts/**/*.vue"],
      },
    },
  };
});

```

#### 详解

**模块导入：**

`import { defineConfig, loadEnv } from "vite";`

- defineConfig: Vite 提供的一个帮助函数，用于定义配置文件，提供类型推断和自动补全功能，便于编写 Vite 的配置。
- loadEnv: 用于加载环境变量（如 .env 文件）。这个函数可以让你根据当前的模式（开发、生产等）加载特定的环境变量配置。

`import vue from "@vitejs/plugin-vue";`

- Vite 内置支持 Vue，但为了使用 Vue 单文件组件（SFC），需要引入这个官方插件。@vitejs/plugin-vue 是 Vite 对 Vue 3 的支持插件，能够处理 .vue 文件。

`import svgLoader from "vite-svg-loader";`

- vite-svg-loader: 一个用于直接加载和处理 SVG 文件的 Vite 插件，允许你在 Vue 组件中将 SVG 文件当作组件使用。这使得你可以通过 `<svg>` 标签来引入图标或插图。

`import AutoImport from "unplugin-auto-import/vite";`

- unplugin-auto-import: 用于自动导入 Vue 组件和 API。你无需手动逐一导入如 ref, reactive, computed 等常用的 Vue API，插件会在编译时自动完成这些导入操作，简化代码。

`import Components from "unplugin-vue-components/vite";`

- unplugin-vue-components: 自动导入 Vue 组件的插件。当你使用某个组件时，不再需要在顶部手动导入该组件，这个插件会自动帮助你完成导入。非常适合大型项目。

`import { ElementPlusResolver } from "unplugin-vue-components/resolvers";`

- ElementPlusResolver: 用于解决 Element Plus 组件的自动导入问题。与上面的 unplugin-vue-components 插件结合使用时，可以自动按需加载 Element Plus 的组件，避免手动导入和全局导入带来的性能问题。

`import eslint from "vite-plugin-eslint";`

- vite-plugin-eslint: 一个用于 Vite 的 ESLint 插件，在项目构建和开发过程中，自动检查 TypeScript 和 JavaScript 代码中的语法错误和风格问题。这有助于保持代码的一致性和高质量。

`import { resolve } from "path";`

- resolve: 来自 Node.js 的内置 path 模块，用于处理文件和目录路径。resolve 方法可以根据相对路径生成绝对路径，在配置 Vite 的别名或者其他路径相关设置时非常有用。

**配置导出：**

`export default defineConfig((configEnv) => { ... })`

- 使用 defineConfig 函数将配置定义为 Vite 配置对象，configEnv 参数包含 Vite 运行时的环境变量信息，如 mode（模式：开发、生产等）。
- 这是一个函数式配置，可以根据传入的环境配置动态生成配置项。

`const { VITE_BASE_API } = loadEnv(configEnv.mode, process.cwd());`

- 通过 loadEnv 函数加载环境变量。configEnv.mode 用于指定当前运行的模式（如开发模式 development 或生产模式 production），process.cwd() 获取当前工作目录。
- `VITE_BASE_API` 是从环境变量文件（如 .env 文件）中读取的一个 API 地址，后续用于代理配置中。

`plugins: [ ... ]`

- `vue()`: 启用 Vue 插件，支持 Vue 3 单文件组件（.vue 文件）的解析和编译。
- `svgLoader()`: 使用 vite-svg-loader 插件，支持在 Vue 中像组件一样导入和使用 SVG 文件。
- `AutoImport({ resolvers: [ElementPlusResolver()] })`: unplugin-auto-import 插件，用于自动导入 Vue API 和 Element Plus 组件库的 API，无需手动导入。
- `Components({ resolvers: [ElementPlusResolver()] })`: unplugin-vue-components 插件，自动按需引入 Vue 组件，使用 ElementPlusResolver 实现对 Element Plus 组件的自动导入。

`resolve: { ... }`

- `extensions: [ ... ]`: 定义支持解析的文件扩展名顺序，如 .js, .ts, .vue, .json 等，这可以让你在导入这些文件时不必显式地写扩展名
- `alias: { ... }`: 配置路径别名：
  - "@": 代表 ./src 目录，简化对 src 下文件的导入路径。
  - "@public": 代表 ./public 目录，方便访问公共资源（如图片、字体等）。

`base: "./"`

- 指定构建时的基础路径。默认为 '/'，但设置为 './' 可以确保相对路径正确，尤其在部署到非根目录时。

`server: { ... }`

- `host: true`: 允许外部设备通过 IP 地址访问开发服务器，而不仅仅是通过 localhost。
- `port: 8888`: 指定开发服务器运行的端口号为 8888。
- `open: true`: 启动开发服务器时自动打开浏览器。
- `cors: true`: 启用跨域资源共享（CORS）支持，允许跨域请求。
- `proxy: { "/api": { ... } }`: 配置代理：
  - 任何以 /api 开头的请求都会被代理到 VITE_BASE_API（从环境变量中加载的 API 地址）。
  - `changeOrigin: true`: 修改请求的 Origin 头，使其看起来像是从目标服务器发出的。
  - `rewrite: (path) => path.replace(/^\/api/, "")`: 在请求转发时，去掉请求路径中的 /api 部分。

`warmup: { clientFiles: ["./src/layouts/**/*.vue"] }`

- warmup 是一个性能优化选项。这个配置将预加载 ./src/layouts 目录下的所有 .vue 文件，减少首次加载时的延迟。这对于常用的布局组件非常有用，可以提高页面渲染的速度。

### `tsconfig.node.json`

`tsconfig.node.json` 是 TypeScript 的 一个配置文件，用来告诉 TypeScript 如何编译 `vite.config.ts` 文件。

#### 为什么需要 tsconfig.node.json

在开发过程中，Vite 充当一个**开发服务器**，可以提供前端项目的热更新、模块解析和打包功能，而这些功能需要依赖 **Node.js** 的运行环境。因此，Vite 运行时本质上是一个 Node.js 程序。

- Vite 开发服务器：当你使用 Vite 时，它实际上启动了一个基于 Node.js 的开发服务器，这个服务器会监听文件的变化、处理依赖关系，并提供前端的开发服务。
- 构建工具链：Vite 使用 Rollup（同样基于 Node.js）来处理项目的构建任务，因此在生产环境打包时，Vite 也依赖 Node.js 的生态来完成构建任务。

由于 Vite 本身是基于 Node.js 运行的，它会在 Node.js 环境中解析并执行 `vite.config.ts`。

- TypeScript 支持：
虽然 `vite.config.ts` 使用 TypeScript 编写，但它需要通过 Node.js 来执行，因此需要一个 TypeScript 编译过程，将 TypeScript 转译为 JavaScript。这就是为什么有 `tsconfig.node.json` 的存在，目的是为 TypeScript 提供编译配置，以便 Node.js 能够解析并运行 `vite.config.ts`。

如果没有 `tsconfig.node.json`，`vite.config.ts` 中的 TypeScript 代码不会自动获得类型检查和编译支持。
因此，`tsconfig.node.json` 的存在是为了确保像 `vite.config.ts` 这样的 TypeScript 文件可以正确编译并运行，而不影响整个项目的主编译配置（通常在 `tsconfig.json` 中配置）。

### `package.json`

`package.json` 是一个 JSON 格式的文件，用于描述一个 Node.js 项目的元数据，包括项目名称、版本、依赖项、脚本等。

#### 项目元数据

"name": "three3d"：项目的名称。
"private": true：表示这是一个私有的项目，不会被发布到 npm 注册表。
"version": "0.0.0"：项目的版本号。
"type": "module"：表示该项目使用 ES 模块系统。

#### 脚本

"scripts"：定义了一系列的脚本命令，用于项目的开发、构建、测试等。例如：
"dev"：启动开发服务器，使用 Vite 进行热更新。
"serve"：与 "dev" 相同，启动开发服务器。
"dev:prettier"：运行 Prettier 格式化代码，并运行 ESLint 检查代码质量，然后启动开发服务器。
"serve:pro"：使用 Vite 在生产模式下启动服务器。
"build"：使用 Vite 进行构建，输出到 dist 目录。
"build:pro"：与 "build" 相同，使用 Vite 在生产模式下进行构建。
"preview"：预览构建后的项目。
"lint"：运行 ESLint 检查代码质量。
"prettier"：运行 Prettier 格式化代码。

#### 依赖项

"dependencies"：列出了项目运行时所需的依赖项。例如：
"@element-plus/icons-vue"：Element Plus 的图标库。
"@theatre/core" 和 "@theatre/studio"：Theatre.js 库，用于创建交互式动画和可视化。
"@tweenjs/tween.js"：Tween.js 库，用于创建平滑的动画效果。
"@types/three"：Three.js 的 TypeScript 类型定义。
"echarts"：ECharts 库，用于数据可视化。
"element-plus"：Element Plus 组件库。
"path"：Node.js 的路径处理模块。
"three"：Three.js 库，用于 3D 图形渲染。
"vue"：Vue.js 框架。

#### 开发依赖项

"devDependencies"：列出了项目开发时所需的依赖项。例如：
"@vitejs/plugin-vue"：Vite 的 Vue.js 插件。
"@vue/eslint-config-typescript"：Vue.js 的 TypeScript ESLint 配置。
"eslint-config-prettier"：ESLint 的 Prettier 配置。
"eslint-config-standard-with-typescript"：带有 TypeScript 支持的 ESLint 标准配置。
"eslint-plugin-import"：ESLint 的导入插件。
"eslint-plugin-n"：ESLint 的命名约定插件。
"eslint-plugin-prettier"：ESLint 的 Prettier 插件。
"eslint-plugin-promise"：ESLint 的 Promise 插件。
"eslint-plugin-vue"：ESLint 的 Vue.js 插件。
"sass" 和 "sass-loader"：用于处理 Sass 文件。
"typescript"：TypeScript 编译器。
"unplugin-auto-import" 和 "unplugin-vue-components"：用于自动导入 Vue.js 组件和 API 的插件。
"vite"：Vite 构建工具。
"vite-plugin-eslint"：Vite 的 ESLint 插件。
"vite-plugin-svg-icons"：用于在 Vite 项目中使用 SVG 图标。
"vite-svg-loader"：用于在 Vite 项目中加载 SVG 文件。
"vue-eslint-parser"：用于 Vue.js 项目的 ESLint 解析器。
"vue-tsc"：用于 TypeScript 项目的 Vue.js 类型检查工具。

### `index.html`

`index.html`是 Web 应用的 HTML 入口文件。

`<!doctype html>`：这是HTML5的文档类型声明，用于告诉浏览器当前文档的类型。

`<html lang="en">`：这是HTML文档的根元素，lang="en"表示页面内容使用的语言是英语。

`<head>`：这是HTML文档的头部，包含了文档的元数据和引用的外部资源。

`<meta charset="UTF-8">`：这是一个元数据标签，用于指定文档的字符编码为UTF-8，这是一种Unicode编码，可以表示世界上几乎所有的字符。

`<link rel="icon" type="image/svg+xml" href="/vite.svg">`：这是一个链接标签，用于指定页面的图标。rel="icon"表示这是一个图标链接，type="image/svg+xml"表示图标的类型是SVG，href="/vite.svg"表示图标的路径。

`<meta name="viewport" content="width=device-width, initial-scale=1.0">`：这是一个视口元数据标签，用于告诉浏览器如何控制页面的尺寸和缩放。width=device-width表示页面的宽度应该与设备的宽度相同，initial-scale=1.0表示初始缩放比例为1.0。

`<title>three3D数字孪生</title>`：这是一个标题标签，用于指定页面的标题，这个标题会显示在浏览器的标题栏或标签页上。

`<body>`：这是HTML文档的主体，包含了页面的所有可见内容。

`<div id="app"></div>`：这是一个div元素，它的id是"app"，这个元素将作为Vue.js应用程序的挂载点。

`<script type="module" src="/src/main"></script>`：这是一个脚本标签，用于加载JavaScript模块。type="module"表示这是一个ES模块，src="/src/main"表示模块的路径。这个模块通常是Vue.js应用程序的入口文件，它会初始化并挂载Vue应用程序到id为"app"的div元素上。

### `env.d.ts`

`env.d.ts` 是一个 TypeScript 类型声明文件，通常用于定义全局的类型、接口或环境变量的类型，以便在项目中进行类型检查和自动补全。这类文件的后缀 `.d.ts` 代表“declaration files”（声明文件），是专门用来声明类型的，文件本身不会生成任何 JavaScript 代码。

`/// <reference types="vite/client" />`

- 这是一条三斜线指令，用来引入 `vite/client` 的类型声明。它告诉 TypeScript 编译器使用 Vite 客户端的全局类型定义。Vite 为开发者提供一些全局的类型定义，比如 `import.meta` 等。通过引用 `vite/client`，可以在 TypeScript 项目中使用这些 Vite 特有的全局对象和类型。

`interface key`

这个定义声明了一个名为 key 的接口。它用于表示一个键值对的结构，键名是字符串类型，值可以是任意类型 (any)。这是一个常见的动态对象声明，适用于键名不确定，值类型多变的场景。

```ts
interface key {
  [key: string]: any;
}
```

`declare interface RouterRes`

这是一个全局声明的 RouterRes 接口，表示路由的响应结构体。

```ts
declare interface RouterRes {
  path: string;
  name: string;
  meta: key;
  component: string;
  children?: Router | undefined;
}
```

- path: string: 路由的路径，类型为字符串。
- name: string: 路由的名称，类型为字符串。
- meta: key: 路由的元信息，使用了前面定义的 key 接口，表示可以有任意键值对。
- component: string: 组件的名称或路径，类型为字符串。
- children?: Router | undefined: 可选属性，表示嵌套路由。类型为 Router 或 undefined，其中 Router 可能是另外定义的类型。

`declare module`

这些 declare module 语句用于告诉 TypeScript 识别一些外部模块的类型定义。这些模块都是来自 three.js 的各种扩展功能，或者与 3D 渲染相关的库。由于有些外部模块可能没有官方的 TypeScript 类型声明包，或者在项目中无法正确识别类型，所以使用 declare module 来手动声明这些模块，使 TypeScript 不会在导入它们时报错。

```ts
declare module "@types/three";
declare module "three/addons/loaders/GLTFLoader.js";
declare module "three/examples/jsm/controls/OrbitControls.js";
// ...其他模块声明
```

declare module 的作用是告诉 TypeScript 这些模块存在，不需要具体的类型定义。在这种情况下，TypeScript 会假设这些模块的所有导出是 any 类型。这样就可以正常导入和使用这些模块，而不会触发类型检查错误。

- GLTFLoader：用于加载 .gltf 或 .glb 文件格式的 3D 模型。
- OrbitControls：用于处理 3D 场景中的相机控制，使用户可以通过鼠标旋转、缩放和移动相机。
- KTX2Loader：用于加载压缩的纹理文件。
- EffectComposer 和相关的 PostProcessing 类：用于处理 3D 场景中的后期处理效果。
- CSS2DRenderer 和 CSS3DRenderer：允许将 2D 和 3D CSS 元素与 three.js 的 3D 场景进行结合。
- DRACOLoader：用于加载使用 DRACO 压缩格式的 3D 模型。
- 其他常见的模块，如 FBXLoader、GlitchPass、CurveModifier 等，分别处理不同的加载、渲染或特效任务。

### `.env.development`

当前代码是位于项目根目录下的一个环境变量配置文件，名为`.env.development`。这个文件通常用于在开发环境中设置特定的配置项，以便在应用程序运行时使用。

具体来说，这个文件中定义了两个环境变量：

```js

`VITE_APP_BASE_API = '/api'`：这个变量定义了应用程序的基本API路径。在开发环境中，应用程序可能会通过这个路径来访问后端服务。这里设置为/api，表示所有的API请求都将以/api为前缀。

`VITE_BASE_API="https://mock.mengxuegu.com/mock/65fd4c17838cf807b819d872"`：这个变量定义了一个具体的API地址。在开发环境中，应用程序可能会使用这个地址来访问模拟的后端服务。这里设置为一个URL，指向一个名为mengxuegu的模拟服务，该服务提供了一个特定的Mock API。

```

这两个环境变量的设置可以帮助开发者在开发过程中灵活地配置应用程序的行为，例如切换不同的API端点或者使用不同的Mock数据。在实际的开发过程中，开发者可以根据需要修改这些配置项，以满足不同的开发需求。

### `.env.production`

当前代码是位于项目根目录下的一个环境变量配置文件，名为`.env.production`。这个文件通常用于在生产环境中设置特定的配置项，以便在应用程序运行时使用。

具体来说，这个文件中定义了两个环境变量：

```js

VITE_APP_BASE_API = '/api'：这个变量定义了应用程序的基本API路径。在生产环境中，应用程序可能会通过这个路径来访问后端服务。这里设置为/api，表示所有的API请求都将以/api为前缀。

VITE_BASE_API="http://192.168.1.32:3000"：这个变量定义了一个具体的API地址。在生产环境中，应用程序可能会使用这个地址来访问实际的后端服务。这里设置为一个URL，指向一个运行在IP地址192.168.1.32上的服务，端口号为3000。

```

这两个环境变量的设置可以帮助开发者在生产环境中灵活地配置应用程序的行为，例如指定不同的API端点。在实际的生产部署中，开发者可以根据需要修改这些配置项，以满足不同的生产需求。

### `auto-imports.d.ts`

`auto-imports.d.ts`是一个 TypeScript 声明文件，它的作用是在 TypeScript 项目中自动导入 Element Plus 组件库中的 ElMessage 和 ElNotification 组件，并将它们声明为全局变量，以便在项目的任何地方使用，而无需显式地导入它们。

#### 注释部分

- 禁用 ESLint 检查：/* eslint-disable */ 这行代码告诉 ESLint 忽略对当前文件的检查。

- 忽略 Prettier 格式化：/* prettier-ignore */ 这行代码告诉 Prettier 忽略对当前文件的格式化。

- 禁用 TypeScript 类型检查：// @ts-nocheck 这行代码告诉 TypeScript 编译器忽略对当前文件的类型检查。

- 忽略 JavaScript 未使用符号检查：// noinspection JSUnusedGlobalSymbols 这行代码告诉 IDE 忽略对当前文件中未使用的全局符号的检查。

#### 代码部分

- 导出一个空对象：export {} 这行代码导出一个空对象，这是 TypeScript 声明文件的常见做法，用于确保文件可以被其他文件导入。

- 声明全局变量：declare global {... } 这部分代码声明了两个全局变量 ElMessage 和 ElNotification，它们分别指向 Element Plus 组件库中的 ElMessage 和 ElNotification 组件。这样，在项目的任何地方都可以直接使用 ElMessage 和 ElNotification，而无需导入它们。

总的来说，这段代码的目的是简化 Element Plus 组件库的使用，提高开发效率。

### `components.d.ts`

`components.d.ts`是一个 TypeScript 声明文件（.d.ts），它为 Vue 项目中的全局组件提供了类型声明。
通过声明这些全局组件，你可以在项目中使用这些组件，而无需每次手动导入它们。

#### `components.d.ts`注释部分

- `/* eslint-disable */`：禁用 ESLint 的语法检查。
- `/* prettier-ignore */`：忽略 Prettier 的格式化。
- `// @ts-nocheck`：忽略 TypeScript 类型检查，常用于自动生成的文件。
- `// Generated by unplugin-vue-components`：表示这是由 unplugin-vue-components 插件自动生成的。
- `// Read more: https://github.com/vuejs/core/pull/3399`：这是一个参考链接，提供更多关于 Vue 组件自动导入功能的信息。

#### `components.d.ts`代码部分

**空的 `export {}`：**

这行代码是为了确保文件被视为一个模块，防止 TypeScript 将其视为全局脚本文件。

**声明模块 vue：**

```ts
declare module 'vue' {
  export interface GlobalComponents {
    Card: typeof import('./src/components/card/index.vue')['default']
    ...
  }
}
```

- `declare module 'vue'`：这是对 vue 模块的扩展。通过这种方式，可以为 Vue 的全局组件定义类型信息。
- `export interface GlobalComponents`：这是定义一个全局组件的接口 GlobalComponents，它用来列出全局组件及其类型声明。

**组件的类型声明：**

```ts
Card: typeof import('./src/components/card/index.vue')['default']
```

- Card 是项目中的一个自定义组件，它的类型是 `import('./src/components/card/index.vue')['default']`。这表示它是通过从指定路径的 .vue 文件中导入的 default 导出部分（通常是 Vue 组件本身）。
- 类似地，SvgIcon 和 Table 组件也通过类似方式声明。

**Element Plus 组件的类型声明：**

```ts
ElBreadcrumb: typeof import('element-plus/es')['ElBreadcrumb']
ElButton: typeof import('element-plus/es')['ElButton']
```

这些是 Element Plus UI 库中的组件，例如 ElBreadcrumb、ElButton 等。通过 `typeof import('element-plus/es')['ElButton']` 的形式为它们提供类型声明，从 element-plus/es 模块中导入相应组件。

**Vue Router 组件：**

```ts
RouterLink: typeof import('vue-router')['RouterLink']
RouterView: typeof import('vue-router')['RouterView']
```

这两行定义了 vue-router 中的全局组件 RouterLink 和 RouterView，分别用于路由跳转和嵌套路由视图。

**小结：**

- 这个文件的目的是通过 unplugin-vue-components 插件，将 Vue 组件（包括自定义组件和 Element Plus 组件）声明为全局组件，避免在项目中手动导入这些组件的麻烦。
- 每个组件的类型是通过 typeof import 的方式获取的，确保了在使用这些组件时可以获得正确的类型提示。

### `.eslintrc.cjs`

`.eslintrc.cjs` 用于配置 `ESLint`

```js
module.exports = {
  // root: true, 这个选项告诉 ESLint 这个配置文件是项目的根配置文件。
  root: true,
  // 配置环境，指定代码运行的环境
  env: {
    // 支持浏览器环境
    browser: true,
    // 支持 Node.js 环境
    node: true,
    // 支持 ECMAScript 6 语法
    es6: true,
  },
  // 继承的配置，从多个配置文件中继承规则
  extends: [
    // Vue.js 3 必需的插件
    "plugin:vue/vue3-essential",
    // ESLint 推荐的规则
    "eslint:recommended",
    // Vue.js TypeScript 推荐的规则
    "@vue/typescript/recommended",
    // Vue.js ESLint 配置的 TypeScript 版本
    "@vue/eslint-config-typescript",
    // 与 Prettier 集成，用于代码格式化
    "prettier",
    // Vue.js 插件的基本或推荐配置
    "plugin:vue/essential", // 或者 'plugin:vue/recommended' 根据你的需要
    // 添加 Prettier 的配置
    "plugin:prettier/recommended",
  ],
  // 解析器，用于解析 Vue 和 TypeScript 代码
  parser: "vue-eslint-parser",
  // 解析器选项，指定解析器的详细配置
  parserOptions: {
    // 使用 @typescript-eslint/parser 作为 TypeScript 代码的解析器
    parser: "@typescript-eslint/parser",
    // 支持 ECMAScript 2020 版本
    ecmaVersion: 2020,
    // 模块类型为 module
    sourceType: "module",
    // 在 JSX 中使用 React 的 pragma
    jsxPragma: "React",
    // 支持 JSX 和 TSX
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  // 插件，用于扩展 ESLint 的功能
  plugins: ["vue", "prettier"],
  // 规则，自定义的代码检查规则
  rules: {
    // TS
    // 允许使用显式 any 类型
    "@typescript-eslint/no-explicit-any": "off",
    // 允许使用 debugger 语句
    "no-debugger": "off",
    // 允许函数没有显式的返回类型
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // 允许使用类型断言
    "@typescript-eslint/ban-types": "off",
    // 允许使用 // @ts-ignore 注释
    "@typescript-eslint/ban-ts-comment": "off",
    // 允许空函数
    "@typescript-eslint/no-empty-function": "off",
    // 允许非空断言
    "@typescript-eslint/no-non-null-assertion": "off",
    // 允许 Vue 模板有多个根元素
    "vue/no-multiple-template-root": "off",
    // 未使用的变量会报错，但以下划线 _ 开头的变量名不会报错
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    // 未使用的变量会报错，但以下划线 _ 开头的变量名不会报错
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    // Vue
    // 允许使用 v-html 指令
    "vue/no-v-html": "off",
    // 允许组件的 props 没有默认值
    "vue/require-default-prop": "off",
    // 允许组件的 emits 没有显式声明
    "vue/require-explicit-emits": "off",
    // 允许组件名不是多个单词
    "vue/multi-word-component-names": "off",
    // 允许在 Vue 组件中使用 v-model 指令而不传递参数
    "vue/no-v-model-argument": "off",
    // 要求 HTML 标签自闭合
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
    // Prettier
    // 配置 Prettier 规则，与.prettierrc 文件中的配置保持一致
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    // 禁用 alert、confirm 和 prompt
    "no-alert": 0,
    // 警告缺少 default 分支的 switch 语句
    "default-case": "warn",
    // 警告没有使用严格相等运算符（=== 和!==）
    eqeqeq: "warn",
  },
};
```

## `src/` 源代码详解

### `main.ts`

`main.ts` 是使用 Vue.js 框架创建一个单页应用（SPA）的**入口文件**。

该文件主要用来：

- 初始化并配置 Vue 应用
- 导入必要的样式和组件
- 注册全局组件
- 将应用挂载到页面上。

这样，一个 Vue 单页应用就可以运行起来了。
以下是对代码的详细解释：

```ts

import { createApp } from "vue";  // 从 Vue.js 库中导入 createApp 函数，用于创建 Vue 应用实例。

import "./style.css"; // 导入项目中的 全局 CSS 文件，该文件可能包含了应用的通用样式。

import App from "./App.vue"; // 从当前目录下的 App.vue 文件中导入根组件 App。App.vue 通常是 Vue 应用的主组件，它可能包含了其他子组件和模板。

import * as ElementPlusIconsVue from "@element-plus/icons-vue"; // 导入 Element Plus 图标库的所有图标组件。Element Plus 是一个流行的 Vue 组件库，提供了丰富的 UI 组件和图标。

const app = createApp(App); // 使用 createApp 函数创建一个 Vue 应用实例，并将根组件 App 传递给它。

for (const [key, component] of Object.entries(ElementPlusIconsVue)) { app.component(key, component); } // 遍历导入的 Element Plus 图标组件，将每个图标组件注册为全局组件，以便在应用的任何地方使用。

app.mount("#app"); // 将 Vue 应用实例挂载到 DOM 中的指定元素上，通常是 #app 这个 ID 对应的元素。这会将 Vue 应用渲染到页面上。

```
