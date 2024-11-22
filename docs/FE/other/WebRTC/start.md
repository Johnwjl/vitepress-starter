# WebRTC

## 什么是 WebRTC？

WebRTC（Web Real-Time Communication） 是一个支持 `点对点实时通信` 的开放标准，
允许浏览器和移动应用在无需中间服务器的情况下直接传输音频、视频和数据。

WebRTC 被广泛用于视频会议、实时聊天、文件共享等场景，提供了高效的实时通信能力。

## WebRTC 的核心功能

1. 实时音视频通信：
    - 通过点对点连接直接传输音频和视频流。
    - 支持回声消除、降噪等功能，提升音视频质量。
2. 数据通道传输：
    - 提供 RTCDataChannel，用于点对点传输任意数据（如文本、文件）。
    - 适合需要低延迟数据传输的场景，如多人在线游戏或实时文件同步。
3. 跨平台支持：
    - 支持主流浏览器（Chrome、Firefox、Edge、Safari）和移动设备。

## WebRTC 的核心组件

WebRTC 的架构由以下核心组件组成：

### MediaStream API

- 负责捕获媒体流（音频、视频）。
- 可以通过摄像头、麦克风、屏幕共享等设备获取流。
- 常见方法：
  - navigator.mediaDevices.getUserMedia()：访问摄像头和麦克风。
  - navigator.mediaDevices.getDisplayMedia()：屏幕共享。

### RTCPeerConnection

- 负责点对点连接的建立、管理和媒体流的传输。
- 包括 ICE（Interactive Connectivity Establishment）候选协商、NAT 穿越和传输控制。

### RTCDataChannel

- 用于点对点传输任意数据，类似于 WebSocket，但无需服务器中转。
- 支持低延迟、高吞吐量传输。

### ICE（Interactive Connectivity Establishment）

WebRTC 的核心机制，用于解决 NAT 和防火墙问题。
包括 STUN（Session Traversal Utilities for NAT）和
 TURN（Traversal Using Relays aroun- AT）：

- STUN：获取公网地址。
- TURN：当点对点连接失败时，通过中继服务器中转数据。

## WebRTC 的通信流程

WebRTC 的通信建立过程包括以下几步：

1. 媒体捕获：
    - 使用 getUserMedia() 获取音频/视频流。
2. 信令交换（需通过外部信令服务器实现）：
    - 信令是指交换连接信息的过程，如 SDP（Session Description Protocol）和 ICE 候选。
    - 常用的信令协议包括 WebSocket、HTTP 等。
3. ICE 候选协商：
    - 使用 STUN/TURN 协议解决 NAT 穿越问题，确保点对点连接。
4. 点对点连接建立：
    - 通过 RTCPeerConnection，直接传输音视频流和数据。
5. 实时传输：
    - 媒体流通过 RTP（Real-Time Transport Protocol）传输。
    - 数据通过 RTCDataChannel 传输。

## WebRTC 的关键特点

1. 点对点通信：
    - 消除了服务器作为中转的需求，降低延迟和成本。
2. 高性能：
    - 支持高质量的音视频流传输，优化了实时性。
3. 安全性：
    - WebRTC 默认使用 SRTP（Secure Real-Time Transport Protocol）和
    DTLS（Datagram Trasport Lay r Security）加密传输数据，确保通信安全。
4. 灵活性：
    - 支持多种媒体格式和网络条件，适应性强。

## WebRTC 的适用场景

1. 视频会议：
    - Google Meet、Zoom、微软 Teams 等平台广泛使用 WebRTC 提供实时音视频通信。
2. 实时聊天：
    - 如 Omegle 和实时聊天应用。
3. 多人在线游戏：
    - 使用 RTCDataChannel 提供低延迟的实时数据通信。
4. 实时文件共享：
    - 利用 RTCDataChannel 传输大文件，支持断点续传。
5. 远程协作：
    - 屏幕共享、远程教学等场景。

## WebRTC 与 WebSocket 的对比

| 特性     | WebRTC                           | WebSocket                           |
| -------- | -------------------------------- | ----------------------------------- |
| 通信模式 | 点对点通信，支持音视频和数据传输 | 客户端-服务器通信，主要用于数据传输 |
| 延迟     | 较低，适合实时性要求高的场景     | 稍高，需依赖服务器转发              |
| 数据加密 | 默认加密（SRTP/DTLS）            | 可配置加密（如 WSS）                |
| 适用场景 | 音视频会议、实时聊天、文件传输   | 聊天应用、消息推送、游戏状态同步    |

## WebRTC 和 WebSocket 各有优劣

它们之间并非完全互为替代品，而是为不同场景设计的工具。
虽然 WebRTC 可以在某些场景中代替 WebSocket，但两者在通信模式、协议层和适用场景上有显著差异。

WebSocket 和 WebRTC 的主要区别

| 特性         | WebSocket                        | WebRTC                                |
| ------------ | -------------------------------- | ------------------------------------- |
| 通信模式     | 客户端-服务器，单连接            | 点对点（Peer-to-Peer），多点连接      |
| 传输内容     | 仅支持数据传输                   | 支持音频、视频和任意数据传输          |
| 数据传输效率 | 高效，但需要经过服务器转发       | 更高效，直接点对点传输，减少延迟      |
| 加密         | 可选加密（如 WSS）               | 默认加密（SRTP、DTLS）                |
| 连接需求     | 依赖中心化的服务器               | 需要复杂的 NAT 穿越（STUN/TURN 服务） |
| 适用场景     | 消息推送、游戏状态同步、实时通知 | 视频会议、音频通话、实时文件共享      |

### WebRTC 能做 WebSocket 的事吗？

从功能上看，WebRTC 提供的 RTCDataChannel 确实能完成 WebSocket 的大部分任务：

- WebRTC 支持点对点传输任意数据，包括文件、文本、JSON 等。
- 数据传输效率较高，适合需要低延迟、高吞吐的场景，如多人在线游戏。

但 WebRTC 替代 WebSocket 时，可能遇到以下限制：

1. 复杂性：
    - WebRTC 的连接建立过程比 WebSocket 更复杂，需要信令服务器（交换 SDP 和 ICE 候选）以及 STU/TURN 服务解决 NAT 穿越问题。
    - 如果只是简单的聊天、通知类任务，使用 WebRTC 会显得复杂且过于冗余。
2. 可靠性：
    - WebSocket 通过服务器中转，能够确保数据传输的稳定性和可靠性。
    - WebRTC 的点对点模式在网络复杂（如防火墙或严格的 NAT 环境）时可能失败，需要依赖 TURN 服务器进行转，而 TURN 可能增加成本和延迟。
3. 扩展性：
    - WebSocket 适合构建中心化系统，服务器可以轻松管理所有连接。
    - WebRTC 的点对点通信在大规模用户下管理困难，需要更多的资源和逻辑来协调多点通信。

### WebSocket 能做 WebRTC 的事吗？

WebSocket 无法实现 WebRTC 的所有功能，尤其是在以下方面：

1. 实时音视频传输：
   - WebSocket 不支持音视频流传输的优化（如编解码、带宽适配等）。
   - WebRTC 是为实时音视频设计的，支持低延迟、高质量的媒体传输。
2. 低延迟传输：
    - WebSocket 的数据需要经过服务器转发，增加延迟。
    - WebRTC 的点对点模式在网络条件良好时延迟更低，特别适合实时通信场景。
3. 多媒体功能：
    - WebRTC 提供对摄像头、麦克风等硬件设备的直接访问，而 WebSocket 仅能传输数据，无法捕获和处理媒体流。

### 选择 WebRTC 或 WebSocket？

选择 WebRTC 的场景：

- 实时音视频通信（如视频会议、音频通话）。
- 低延迟点对点数据传输（如实时在线游戏、文件共享）。
- 实现类似于 Zoom、Google Meet 的多媒体应用。

选择 WebSocket 的场景：

- 聊天系统（如在线客服、IM）。
- 实时通知（如股票价格推送）。
- 游戏状态同步（非高实时性要求）。
- 简单的中心化系统，通信可靠性比低延迟更重要。

### 总结

虽然 WebRTC 能够在某些场景下完成 WebSocket 的功能，但二者设计目的不同，适用场景也不完全重叠。

- 如果你的需求涉及 点对点通信、实时性、高带宽需求，那么 WebRTC 是更好的选择。
- 如果你需要一个 简单、可靠的通信方式，尤其是服务器中转或需要管理大量连接，WebSocket 更适合。
