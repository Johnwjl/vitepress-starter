# WebSocket

WebSocket 是一种建立在 HTTP 基础上的 `双向通信协议`，它允许客户端和服务器之间保持长连接，从而实现实时通信。

## WebSocket 的关键点

1. 双向通信：
    - 与 HTTP 的请求-响应模型不同，WebSocket 允许客户端和服务器实时发送消息，避免了频繁的轮询
2. 长连接：
    - 连接建立后，客户端和服务器可以在同一连接上持续通信，直到其中一方主动断开。
3. 建立过程：
    - WebSocket 连接通过 HTTP 升级握手建立。
    - 客户端发送 HTTP 请求，包含 Upgrade: websocket 头部。
    - 服务器响应 101 Switching Protocols，连接升级为 WebSocket。
4. 传输数据格式：
    - WebSocket 使用二进制帧（frame）或文本帧传输数据。
    - 帧头部开销较小，适合实时性较高的应用。
5. 使用场景：
    - 聊天应用。
    - 游戏服务器。
    - 实时通知系统（如股票行情推送）。
    - IoT（物联网）设备通信。
