# 实际项目中的CSS技巧积累

跨平台、跨端、跨设备、跨浏览器、PC端、移动端，响应式UI适配，自适应一致性布局

## 尽量少用px固定像素单位

- CSS Flex 布局 （必备）
- CSS Grid 布局 （必备）
- vw/vh 视口单位 （必备）
- 百分比 布局 （必备）
- calc 计算单位 （必备）
- rem/rpx 等相对单位 （按需使用）

## 尽量少在html标签上使用样式

- 如果要用，就用原子类名 （必备）

## flex 元素的 img 子元素

- width 100%
- 不要设置 height，让它自己撑起来。

## 无语义的静态的图像都用背景图代替img元素

- 相反，有内容有语义的，均用 img 元素。

## 实现元素阴影圆角覆盖相邻元素背景上

- 负的 margin 实现

```css
margin-top: -15px; // 负的 margin 在层级上自动会覆盖在相临元素上
border-radius: 25px 25px 0 0;
box-shadow: 0 -12px 10px rgba(0, 0, 0, 0.2);
background-color: #f5f5f5;
```

## 为什么 flex 第二个子属性设为0 能跳出 flex 元素的自动拉伸实现超出元素滚动列表

```css
flex: 1 0 auto;
```

通过设置 flex-shrink: 0，可以确保元素不会因为容器空间不足被压缩，
从而在内容超出容器时触发滚动效果。这种方式特别适用于构建水平滚动的列表或导航栏。

::: details 详细解释

flex 三个子属性：

- flex-grow
- flex-shrink
- flex-basis

只要 flex-shrink 具有正值，项目就会缩小，以防止溢出容器。

理解 flex 的三个子属性：

1. flex-grow: 决定元素在容器中可以扩展的比例。如果容器有剩余空间，flex-grow 值大的元素会获得更多的空间。
2. flex-shrink: 决定元素在容器空间不足时被压缩的比例。如果设置为 0，表示该元素不会因为容器空间不足而被缩小。
3. flex-basis: 决定元素的初始大小。可以是固定值（如 100px），或者 auto，表示根据内容或其他样式规则来确定。

关键点：为什么 flex-shrink: 0 可以实现防止被压缩？

- 当 flex-shrink 设置为 1（默认值），表示元素在容器空间不足时会按照比例缩小。
- 当 flex-shrink 设置为 0，则元素在容器变小时不会被缩小，而是保持其自身的大小。
- 结合滚动列表的场景，当 flex-basis 为 auto 且 flex-shrink 为 0，元素可以超出容器的宽度或高度，并触发滚动条，而不会因为容器不足而强制被缩小。

示例代码：

```html
<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>
```

```css
.container {
  display: flex;
  overflow-x: auto; /* 允许超出内容水平滚动 */
  width: 300px; /* 固定宽度 */
  border: 1px solid #ccc;
}

.item {
  flex: 1 0 auto; /* 防止元素被压缩，同时允许其基于内容宽度 */
  min-width: 150px; /* 设置最小宽度，超过容器时触发滚动 */
  border: 1px solid blue;
}
```

1. 每个 item 的 flex-shrink: 0 防止了它被压缩。
2. flex-basis: auto 让每个 item 的宽度根据内容决定。
3. 当所有 item 的宽度总和超出 container 宽度时，overflow-x: auto 触发滚动。

:::

## img 标签的 loading （HTML属性） 和 object-fit (CSS属性)

1. loading: lazy （HTML属性）

   - 推荐场景：加在非首屏图片或非关键内容图片上（比如懒加载长列表图片）。
   - 不推荐场景：首屏关键图片或需要立即加载的图片。

2. object-fit: contain (CSS属性)

   - 推荐：用于需要完整显示内容且防止变形的图片。
   - 不推荐：用于需要裁剪或背景效果的图片。
