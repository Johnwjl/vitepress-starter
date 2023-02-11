# Feed / RSS

### Install

`yarn add feed`

## Implement

```js
import { Feed } from "feed";

const feed = new Feed({
  title: "Jello's Blog",
  description: "Personal Website",
  id: "https://jellowang.cn/",
  link: "https://jellowang.cn/",
  language: "en-US", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: "../public/logo-1.svg",
  favicon: "../public/favicon.svg",
  copyright: "All rights reserved 2013, Jello",
  updated: new Date(), // optional, default = today
  generator: "", // optional, default = 'Feed for Node.js'
  feedLinks: {
    json: "https://example.com/json",
    atom: "https://example.com/atom"
  },
  author: {
    name: "Jello",
    email: "wangjinlong@jellowang.cn",
    link: "https://jellowang.cn/"
  }
});

feed.addCategory("Blogs");
```

## 参考

- [vue blog](https://github.com/vuejs/blog)
- [Armerr blog](https://github.com/Armerr/blog)