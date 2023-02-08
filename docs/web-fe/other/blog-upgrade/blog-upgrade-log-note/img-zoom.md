# VitePress博客网站支持图片点击放大

## 实现

- install

```sh
yarn add medium-zoom
```

- import & code

```js
// .vitepress/theme/index.ts

import { inBrowser, useRoute } from 'vitepress'
import { onMounted, nextTick, watch } from 'vue';
import mediumZoom from 'medium-zoom'

import './index.css';

export default {
  ...Theme,
  setup() {
    onMounted(() => {
      const route = useRoute()
      watch(
        () => route.path,
        () => nextTick(() => {
          if (inBrowser)
            mediumZoom('.main img', { background: 'var(--vp-c-bg)' });
        }),
        { immediate: true },
      )
    });
  },
}
```

```css
/* index.css */

.medium-zoom-overlay {
    z-index: 20;
  }
  
.medium-zoom-image {
    z-index: 21;
}
```

## 参考

[medium-zoom/issues/184](https://github.com/francoischalifour/medium-zoom/issues/184)

[vitepress/issues/854](https://github.com/vuejs/vitepress/issues/854)
