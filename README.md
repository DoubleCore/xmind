# XMind Viewer

一个基于 React 的在线 XMind 思维导图查看器。

## 功能特性

- 在线查看 XMind 思维导图文件
- 支持 XMind 文件解析和渲染
- 响应式布局,支持不同设备访问
- 文件上传功能
  - 仅支持 .xmind 格式文件
  - 上传后自动跳转至演示界面
- 交互功能
  - 支持鼠标滚轮缩放
  - 支持移动端触摸缩放
  - 支持点击分支块展开/收起
- 导出功能
  - 支持导出为 XMind 格式
  - 支持导出为图片格式 (PNG/JPG)
  - 中央弹窗式导出界面

## 技术栈

- React 18
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Zustand (状态管理)
- JSZip (用于解析 XMind 文件)

## 项目结构 