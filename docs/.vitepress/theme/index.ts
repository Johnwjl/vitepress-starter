import Theme from 'vitepress/theme'
import Layout from './Layout.vue'
// import './styles/vars.scss'
// import './styles/style.scss'
import { inBrowser, useRoute } from 'vitepress'
import { onMounted, nextTick, watch } from 'vue';
import mediumZoom from 'medium-zoom'

import './index.css';

export default {
  ...Theme,
  Layout,
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
        }),
        { immediate: true },
      )
    });
  },
}