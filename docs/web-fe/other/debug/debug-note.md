## Debug 原则

- 如果你已经尝试了所有，仍然未能与GitHub项目（一些 你模仿的项目、组件库）的效果一致，就尝试 `更新依赖`，因为这有可能不是你的问题😓。
  ```sh
  // 该命令会连同 package.json 一起更新
  yarn upgrade-interactive --latest
  ```