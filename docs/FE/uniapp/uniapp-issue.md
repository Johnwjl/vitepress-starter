# uniapp 使用问题

## 编译器提示类

### easycom 组件冲突

删除同名组件即可

## 微信小程序问题

### 不支持本地CSS背景图

微信小程序限制：WXSS 中的 background-image 不支持引用本地资源路径
（如 ../../../static/...）
H5无此问题，那么在uniapp跨端项目中就推荐用图片的方式。
`<image>` 标签支持图片的懒加载 (lazy-load) 和模式 (mode)。

mode：

- `aspectFill`: 保持比例填充容器，可能裁剪图片。
- `widthFix`: 宽度固定，高度自适应，常用于横幅类图片。
- `center`: 不拉伸图片，只显示中心区域。

::: details image 实现背景图

```html
<header class="banner">
    <image class="bannerBG" src="../../../static/imgs/home/bannerBG.png" lazy-load="true" mode="aspectFill">
    </image>
    <view class="content">
        <view class="banner-title">智慧食堂</view>
        <view class="banner-title-1">自助取菜用餐新体验</view>
    </view>
</header>
```

```scss
.banner {
    position: relative;
    .bannerBG {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .content {
        position: relative;
        /* 默认层级高于背景 */
        z-index: 1;
    }
}

```

:::

### 页面区域兼容H5的底部导航栏

H5的底部导航栏是div模拟的，小程序/App的底部导航栏是原生的。

整个页面区域，小程序/App 是不包含底部导航栏的。
而H5是包含的。

为了优雅处理这个跨端页面区域高度问题，uniapp 提供了两个变量：

> APP 和小程序的导航栏和 tabbar 均是原生控件，元素区域坐标是不包含原生导航栏和 tabbar 的；而 H5 里导航栏和 tabbar 是 div 模拟实现的，所以元素坐标会包含导航栏和tabbar的高度。为了优雅的解决多端高度定位问题，uni-app 新增了2个css变量：`--window-top` 和 `--window-bottom`，这代表了页面的内容区域距离顶部和底部的距离。举个实例，如果你想在原生tabbar 上方悬浮一个菜单，之前写 bottom:0。这样的写法编译到 h5 后，这个菜单会和 tabbar 重叠，位于屏幕底部。而改为使用 bottom:var(--window-bottom)，则不管在 app 下还是在h5下，这个菜单都是悬浮在 tabbar 上浮的。这就避免了写条件编译代码。当然仍然也可以使用 H5 的条件编译处理界面的不同。

::: details 示例代码

```css
--container-height: calc(100vh - var(--window-bottom));
```

这样一来就省去了条件编译的代码。
:::

### 按需使用 rpx 单位

- padding 等使用 rpx 单位