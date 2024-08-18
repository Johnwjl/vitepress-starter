# 性能优化

## 安装打包性能分析插件

## 安装资源文件压缩插件

```bash
pnpm add vite-plugin-compression2 -D
```

### 使用

```js{4,10-15}
// vite.config.js

import { defineConfig} from "vite"
import { compression } from 'vite-plugin-compression2'

export default defineConfig({

    plugins:[
        // 就是使用这个插件实现的文件压缩
        compression({
            threshold:2000, // 设置只有超过 2k 的文件才执行压缩
            deleteOriginalAssets:false, // 设置是否删除原文件
            skipIfLargerOrEqual:true, // 如果压缩后的文件大小与原文件大小一致或者更大时，不进行压缩
            // 其他的属性暂不需要配置，使用默认即可
        })
    ]
    
})
```