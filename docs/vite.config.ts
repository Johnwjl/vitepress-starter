import { defineConfig, type PluginOption } from 'vite';
// import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig({
    plugins: [
        // visualizer({
        //   emitFile: false,
        //   filename: 'stats.html',
        //   title: 'Build Stats',
        //   open:true
        // }) as PluginOption,
    ],
    build: {
      rollupOptions: {
        output: {
            manualChunks(id: string | string[]) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
                // if (id.includes('twikoo')) {
                //     return 'twikoo'; // 将 twikoo 拆分成独立的 chunk
                // }
            }
        }
      }
    }
  });