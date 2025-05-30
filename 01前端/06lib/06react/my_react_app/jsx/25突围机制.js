/*
有些组件可能需要控制和同步 React 之外的系统。
例如，你可能需要使用浏览器 API 聚焦输入框，或者在没有 React 的情况下实现视频播放器，或者连接并监听远程服务器的消息。在本章中，你将学习到一些脱围机制，让你可以“走出” React 并连接到外部系统。
大多数应用逻辑和数据流不应该依赖这些功能。
*/