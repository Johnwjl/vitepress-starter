# Webpack 

## Webpack在vue项目中做了哪些事

- 用于将单文件组件(sfc)编译并打包成JS文件。
- 用于优化项目性能，比如通过压缩图片资源和字体资源。
- 一些用于编译和优化项目资源的loader和plugins。

## vue.config.js 中的 Webpack 配置

### publicPath (部署应用包的基本Url)

- 可以设置为相对路径./,这样打出来的包，可以部署到任意路径上
```js
let developmentPath='./';//开发环境-npm run serve时引用文件路径
let productionPath='./';//生产环境-npm run build打包后引用文件路径
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? productionPath: developmentPath, // 基本路径-引用文件的路
}
```

### outputDir (输出文件目录)

```js
module.exports = {
  outputDir: __dirname + '/server/dist', //build之后静态文件输出路径
  //outputDir: 'dist',
}
```

### assetsDir (输出静态资源目录)

- 打包后生成的静态资源目录。就是我们打包后的css，js等存放的位置
```js
module.exports = {
 assetsDir: 'static',
}
```

### productionSourceMap (生产环境的 source map)

- 生产环境的 source map，可以将其设置为 false 以加速生产环境构建，默认值是true

```js
module.exports = {
    productionSourceMap: false,
}
```

### devServer (反向代理)

- 安装
```js
yarn add webpack-dev-server -D
```

- 修改 package.json 运行脚本：
```js
"scripts": {
	"dev": "webpack serve --progress --config ./webpack.config.js"
}
```

- 可通过 devServer.proxy解决前后端跨域问题（反向代理）

```js
devServer: {
    index: '/login.html',   //默认打开文件
    open: true,             //自动打开浏览器
    host: 'localhost',      //默认打开域名
    port: 8080,             //默认打开端口号
    https: false,           //开启关闭https请求
    hotOnly: false,         //热更新

    proxy: {
      // 配置跨域
      '/manage': {
        target: 'http://xxx.xxx.xxx:122887/', //代理地址，这里设置的地址会代替axios中设置的baseURL
        ws: true,   //// proxy websockets
        changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
        pathRewrite: {                //pathRewrite方法重写url
          '^/manage': '/',
        },
      },
      '/api': {
        target: 'http://xxx.xxx.xxx:12291/', //代理地址，这里设置的地址会代替axios中设置的baseURL
        ws: true,   //// proxy websockets
        changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
        pathRewrite: {                //pathRewrite方法重写url
          '^/api': '/',
        },
      },
    },
  },
```

### chainWebpack 

```js
module.exports = {
  chainWebpack: (config) => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()

    const imagesRule = config.module.rule('images')
    imagesRule.uses.clear() //清除原本的images loader配置
    imagesRule
      .test(/\.(jpg|gif|png|svg)$/)
      .exclude.add(path.join(__dirname, '../node_modules')) //不对node_modules里的图片转base64
      .end()
      .use('url-loader')
      .loader('url-loader')
      .options({ name: 'img/[name].[hash:8].[ext]', limit: 6000000 })

    config.optimization.splitChunks({
      cacheGroups: {

        vendors: {
          name: 'chunk-vendors',
          minChunks: pageNum,
          test: /node_modules/,
          priority: -10,
          chunks: 'initial',
        },

        elementUI: {
          name: 'chunk-elementUI', // split elementUI into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
        },

        commons: {
          name: 'chunk-commons',
          test: resolve('src/components'), // can customize your rules
          minChunks: 3, //  minimum common number
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    })
  },
}
```

### configureWebpack 

- 调整 webpack 配置最简单的方式就是在 `vue.config.js` 中的 `configureWebpack `选项提供一个对象
- 该对象将会被 `webpack-merge` 合并入最终的 webpack 配置。

```js
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      new MyAwesomeWebpackPlugin()
    ]
  }
}
```

### loaders

#### babel-loader

- 作用：使用Babel编译代码，以使用可能不是所有浏览器都支持的最新JavaScript特性。
- 首先需要安装下面几个插件：
  - @babel/core： babel 的核心库。
  - @babel/preset-env：它取代了 es2015 es2016 es2017 ，通过配置浏览器版本的形式，将编译的主动权，交给了插件。
  - babel-loader： webpack 的 loader 插件，用于编译代码，转化成浏览器读得懂的代码。
```js
module: {
	rules: [
  	{
      test: /\.js$/,
      exclude: /node_modules/, // 不编译node_modules下的文件
      loader: 'babel-loader'
    },
  ]
}
```
注意：若不想将配置写在配置文件中，可在项目根目录创建 babel.config.js 或 babelrc.js 文件。
- 在根目录下添加 babel.config.js 文件
```js
module.exports = {
  presets: [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["last 2 versions"] // 最近 2 个版本的浏览器
      }
    }]
  ]
}
```
这里 browsers 的配置，就是让 env 去识别要打包代码到什么程度，版本选的越新，打包出来的代码就越小。因为通常版本越低的浏览器，代码转译的量会更大。

#### style-loader & css-loader

- 作用：将CSS文件导入JavaScript代码，并将样式应用到HTML元素中。`css-loader`解析CSS文件并解析任何`@import`和`url()`语句，而`style-loader`将CSS注入HTML文档。

```js
module: {
	rules: [
  	...
    {
      test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
    }
    ...
  ]
}
```

#### less-loader & sass-loader

```js
module: {
	rules: [
  	...
    {
        test: /\.less$/,
        use: [
            'style-loader',
            'css-loader',
            'less-loader'
        ]
    }
    ...
  ]
}
```


#### file-loader & url-loader

- 作用：将文件导入到JavaScript代码中，并将它们用作url或数据uri。file-loader将文件复制到输出目录并返回URL，而URL -loader可以在文件小于一定大小的情况下返回数据URI。
- 除 js 文件的其他文件打包 webpack 都需特定的处理器进行处理。
```sh
npm install url-loader file-loader -D
```

```js

module.exports = {
    // ...
    module: {
        rules: [
            // ...
            {
                test: /\.(jpg|png|jpeg|gif|bmp)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]'
                            }
                        }
                    }
                }
            },
            {
                test: /\.(mp4|ogg|mp3|wav)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]'
                            }
                        }
                    }
                }
            }
        ]
    }
}
```

#### eslint-loader

- 作用：在构建过程中对JavaScript代码运行ESLint，以捕捉任何语法或样式错误。

#### vue-loader

- 作用：在JavaScript代码中使用Vue单文件组件(SFC)，方法是将其编译成JavaScript模块。具体说，就是 解析和转换 `.vue` 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，再分别把它们交给对应的 loader 去处理如 `style-loader` 、 `less-loader` 等等，核心的作用，就是 `提取` 。

```sh
npm install vue@next -S
npm install vue-loader@next @vue/compiler-sfc
```
注意：Vue2.x 时安装的是 vue-template-complier

```js
const { VueLoaderPlugin } = require('vue-loader/dist/index');

module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}
```


### plugins

#### html-webpack-plugin

`html-webpack-plugin` 是一个webpack插件，它的作用是生成一个HTML文件，并将webpack打包生成的所有bundle文件自动添加到HTML文件中。这个插件可以帮助我们自动生成HTML文件，而不需要手动创建一个HTML文件并手动添加所有的bundle文件。使用`html-webpack-plugin` 可以大大提高我们的开发效率。

```js
npm install --save-dev html-webpack-plugin

or

yarn add html-webpack-plugin -D

```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      template: 'path/to/template.html',
    }),
  ],
};

```

#### clean-webpack-plugin
- 作用：每次打包的时候，都会把 dist 目录清空，防止文件变动后，还有残留一些老的文件，以及避免一些缓存问题。



```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// ...
  plugins: [
    new CleanWebpackPlugin(),
  ],
```


### 设置环境变量

设置环境变量有以下几种常见方式：
- 命令式
- 配置式
- 创建 .env 文件
- cross-env

以 cross-env 的方式来设置环境变量, 因为他可以跨终端进行设置:

```sh
npm install cross-env -D
```

```json
// package.json
{
    // ...
    "scripts": {
        "webpack": "cross-env NODE_ENV=development webpack"
    }
    // ...
}
```

### 分环境打包

平时项目开发中，一般都会有：开发环境、测试环境、生产环境。配置多环境打包。

用webpack-merge做公共合并, 使用dotenv读取.env文件等

#### 打包压缩

打包体积越小，项目性能越佳，用户体验越好。

- 压缩 html 文件

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // ...
    plugins: [
        new HtmlWebpackPlugin({
            // ...
+            minify: {
+                collapseWhitespace: true, // 去掉空格
+                removeComments: true // 去掉注释
+            }
        }),
        // ...
    ]
}
```

- 压缩 css 文件

```sh
npm install mini-css-extract-plugin optimize-css-assets-webpack-plugin -D
```

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    // ...
    module: {
        rules: [
            // ...
            {
                test: /\.css$/,
                use: [
+                   MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
+ 					MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            // ...
        ]
    },
    plugins: [
        // ...
        new OptimizeCssAssetsWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ]
}
```

注意：另有 purgecss-webpack-plugin 是用于清除无用的 CSS

- 压缩 js 文件

```sh
npm install terser-webpack-plugin -D
```

```js
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    // ...
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin()
        ]
    },
    // ...
}
```

- 压缩图片

```sh
npm install image-webpack-loader -D
```

```js
module.exports = {
    // ...
    module: {
        rules: [
            // ...
            {
                test: /\.(jpg|png|jpeg|gif|bmp)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: '[name].[ext]'
                                }
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            // ...
        ]
    },
    // ...
}
```

### 集成 TypeScript

```sh
npm install typescript ts-loader -D
```

```js
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader'
                ]
            },
            // ...
        ]
    },
    // ...
}
```

- 初始化 tsconfig.json 文件

```sh
tsc --init
```

### 其他

webpack5的新特性。比如： 使用cache.type='filesystem'来替代cache-loader；使用内置的静态资源构建能力来替代file-loader、url-loader；使用css-minimizer-webpack-plugin来压缩css；

## 参考

- [Vue CLI 中 Webpack 配置](https://github.com/darrell0904/webpack-doc/blob/master/docs/chapter5/vueCli3.md)
- [Vue 3 和 Webpack 5 来了，手动搭建的知识该更新了](https://juejin.cn/post/6921161482663100423)
- [从零使用 Webpack5 搭建一个完整的 Vue3 的开发环境](https://juejin.cn/post/6924180659829211143)
- [当面试官问Webpack的时候他想知道什么](https://juejin.cn/post/6943468761575849992)