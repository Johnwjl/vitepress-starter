import Theme from 'vitepress/theme'
// import './styles/vars.scss'
// import './styles/style.scss'
import { inBrowser, useRoute } from 'vitepress'
import { onMounted, nextTick, watch } from 'vue';
import mediumZoom from 'medium-zoom'

import './index.css';
// 访问量计数
import busuanzi from 'busuanzi.pure.js'

export default {
  ...Theme,
  setup() {
    onMounted(() => {
      const route = useRoute()
      watch(
        () => route.path,
        () => nextTick(() => {
          if (inBrowser)
            // mediumZoom('[data-zoomable]')
            // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' });
            mediumZoom('.main img', { background: 'var(--vp-c-bg)' });
            busuanzi.fetch()
        }),
        { immediate: true },
      )
    });
  },
}