# 为我的个人博客网站增加评论功能

## 选择三方评论系统

- [Twikoo](https://twikoo.js.org/)，一款静态网站评论系统 （我的选择 2024.08.17）
- [Waline](https://waline.js.org/)，一款从 `Valine` 衍生的带后端评论系统
- [giscus](https://giscus.app)，一款基于`GitHub Discussions`的评论系统
- [Artalk](https://artalk.js.org/)，一款自托管的评论系统
- ...当然还有其他，不再一一枚举

查阅了不少文章，得出粗浅的结论：
从`数据控制权`对比，`Artalk`是掌控权最高的，因为是完全自托管，完全后端部署和运维。
然后就是`Waline`,支持部署到serverless云服务（vercel等），且带了后端能力。
再就是`Twikoo`,也支持部署到serverless云服务（vercel等）。
最后是`giscus`，全托管，数据都放到`GitHub Discussions`，优点是方便。

选择`Twikoo`是取舍考量一番后的折中决定。先试试这款的效果。

## Twikoo 步骤

### 第一步 数据库

1. 申请 [MongoDB AtLas](https://www.mongodb.com/cloud/atlas/register) 账号
2. 创建数据库

### 第二步 部署到serverless云服务（vercel）

因为我的博客网站是部署在vercel的，所以就沿用vercel来进行部署了。

#### 将子域名（例如 comments.example.com）绑定到 Vercel 上

1. 在 Vercel 中添加域名

   - 找到 “Settings”（设置）选项卡，然后点击 “Domains”（域名）部分。
   - 在域名管理页面中，输入 `comments.example.com`，然后点击 “Add” 添加这个子域名。

2. 在腾讯云的 DNS 管理中添加记录

    你需要在腾讯云的 DNS 管理中添加一个 DNS 记录，使 comments.example.com 解析到 Vercel 提供的服务器地址。

   - 找到 “DNS 解析” 页面，点击 “添加记录” 按钮。
   - 修改 “A 记录” ：`76.223.126.88` (为了国内访问效果更好)
   - 添加 “CNAME 记录”: name(主机记录)填 `comments`, target(记录值)填`cname-china.vercel-dns.com`。(cname.vercel-dns.com 国内效果可能不佳)

### vitepress 配置

#### 安装依赖

```bash
pnpm add twikoo
```

#### 文件配置

```js
// docs/.vitepress/theme/Twikoo.vue

<script setup>
import { onMounted, nextTick } from 'vue'

const envId = '{你的部署URL}'

onMounted(async () => {

  await nextTick()

  if (typeof window !== 'undefined') {
    
    const twikoo = await import('twikoo'); // 必须异步引入，不然会报错

    twikoo.init({
      envId,
      el: '#comment-container',
    });
  }

})
</script>

<template>
    <div id="comment-container"></div>
</template>

```

```js
// docs/.vitepress/theme/Layout.vue

<script setup>
import DefaultTheme from 'vitepress/theme'
import Twikoo from './Twikoo.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-after>
      <Twikoo></Twikoo>
    </template>
  </Layout>
</template>

<style>

.twikoo .el-loading-spinner .circular {
  margin-left: auto;
  margin-right: auto;
}
</style>
```

```js{3,6}
// docs/.vitepress/theme/index.ts

import Layout from './Layout.vue'

export default {
  ...Theme,
  Layout,
}
```

## 参考

1. [Twikoo 文档](https://twikoo.js.org/)
2. [国内无法访问绑定Vercel的域名？试试这个！](https://laogou-4094.xlog.app/Vercel)