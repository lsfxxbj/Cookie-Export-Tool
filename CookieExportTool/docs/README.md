# Cookie Exporter Documentation

Cookie Exporter 是一个 Chrome 扩展程序，允许用户导出、导入和管理浏览器 Cookie。

## 目录结构

```
.
├── _locales/                 # 国际化资源文件
├── js/
│   ├── modules/             # 核心功能模块
│   │   ├── errors/          # 错误处理模块
│   │   ├── export/          # 导出相关模块
│   │   └── ...              # 其他功能模块
│   ├── ui/                  # UI 管理模块
│   └── utils/               # 工具函数模块
├── background.js            # 后台服务工作者
├── popup.js                 # 弹窗主脚本
├── popup.html               # 弹窗界面
├── popup.css                # 弹窗样式
├── manifest.json            # 扩展清单文件
└── docs/                   # 文档目录
    └── README.md           # 本文档
```

## 功能特性

1. **导出 Cookie**
   - 导出当前网站的 Cookie
   - 导出所有网站的 Cookie
   - 支持多种格式：JSON、CSV、XML、Netscape

2. **导入 Cookie**
   - 从文件导入 Cookie
   - 支持多种格式：JSON、CSV、XML、Netscape

3. **复制到剪贴板**
   - 复制当前网站 Cookie 到剪贴板
   - 复制所有网站 Cookie 到剪贴板

4. **过滤和筛选**
   - 按域名过滤 Cookie
   - 按 Cookie 类型筛选（HTTPS/HTTP）

5. **国际化支持**
   - 支持中文、英文、法文

## 开发指南

### 项目结构

项目采用模块化设计，主要分为以下几个部分：

1. **Popup UI** (`popup.js`, `popup.html`, `popup.css`) - 弹窗界面及交互逻辑
2. **Background Script** (`background.js`) - 后台服务工作者，处理 Cookie 操作
3. **Modules** (`js/modules/`) - 核心功能模块
4. **Error Handling** (`js/modules/errors/`) - 统一错误处理机制

### 错误处理

项目实现了统一的错误处理机制，位于 `js/modules/errors/` 目录下：

- `ErrorHandler.js` - 核心错误处理逻辑
- `ErrorLogger.js` - 错误日志记录
- `ErrorDisplay.js` - 错误信息显示

所有错误都应该通过这些模块进行处理，而不是直接使用 console 或 alert。

### 国际化

项目支持多语言，通过 `_locales/` 目录下的语言包实现。使用 `chrome.i18n.getMessage()` 方法获取本地化字符串。

### API 文档

详细 API 文档请参阅 [API 文档](./API.md)。