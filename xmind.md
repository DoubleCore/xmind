# XMind 文件解析实现

## 文件格式说明

XMind 文件本质是一个 ZIP 压缩包，具有两种格式：

1. 旧版格式（XMind 8 update3 之前）
   - 基于 XML 的 ODF 规范
   - 主要文件为 content.xml
   
2. 新版格式（XMind 8 update3 之后）
   - 使用 JSON 格式
   - 主要文件为 content.json

## 解析步骤

1. 文件解压 