# API 文档

## 模块结构

### 核心模块

核心模块位于 `js/modules/` 目录下，提供了应用程序的主要功能。

#### PopupInitializer

弹窗初始化器，负责初始化弹窗的所有功能。

##### 方法

- `initializePopup()`
  - 初始化弹窗
  - 示例:
    ```javascript
    import { PopupInitializer } from './js/modules/popupInitializer.js';
    document.addEventListener('DOMContentLoaded', function() {
      PopupInitializer.initializePopup();
    });
    ```

#### CookieOperations

Cookie 操作模块，负责处理所有 Cookie 相关的操作。

##### 方法

- `updateCookieCount(cookieCountElement)`
  - 更新 Cookie 计数显示
  - 参数:
    - `cookieCountElement` (HTMLElement): 显示 Cookie 计数的元素

- `updateFilteredCookieCount(cookieCountElement, cookieTypeSelect)`
  - 根据过滤条件更新 Cookie 计数显示
  - 参数:
    - `cookieCountElement` (HTMLElement): 显示 Cookie 计数的元素
    - `cookieTypeSelect` (HTMLElement): Cookie 类型选择元素

#### FileOperations

文件操作模块，负责处理所有文件相关的操作。

##### 方法

- `handleFileSelection(e, fileInput, browseFilesBtn, dropArea, importProgress, cookieCount)`
  - 处理文件选择事件
  - 参数:
    - `e` (Event): 选择事件
    - `fileInput` (HTMLInputElement): 文件输入元素
    - `browseFilesBtn` (HTMLElement): 浏览文件按钮
    - `dropArea` (HTMLElement): 拖放区域
    - `importProgress` (HTMLElement): 导入进度条元素
    - `cookieCount` (HTMLElement): Cookie 计数显示元素

- `handleFileDrop(e, fileInput, dropArea, importProgress, cookieCount, browseFilesBtn)`
  - 处理文件拖放事件
  - 参数:
    - `e` (Event): 拖放事件
    - `fileInput` (HTMLInputElement): 文件输入元素
    - `dropArea` (HTMLElement): 拖放区域
    - `importProgress` (HTMLElement): 导入进度条元素
    - `cookieCount` (HTMLElement): Cookie 计数显示元素
    - `browseFilesBtn` (HTMLElement): 浏览文件按钮

- `importSelectedFile(fileInput, browseFilesBtn, importProgress, cookieCount)`
  - 导入选中的文件
  - 参数:
    - `fileInput` (HTMLInputElement): 文件输入元素
    - `browseFilesBtn` (HTMLElement): 浏览文件按钮
    - `importProgress` (HTMLElement): 导入进度条元素
    - `cookieCount` (HTMLElement): Cookie 计数显示元素

#### ExportOperations

导出操作模块，负责处理所有导出相关的操作。

##### 方法

- `exportCurrentCookies(button, formatSelect, cookieTypeSelect, exportProgress, cookieCount)`
  - 导出当前网站的 Cookies
  - 参数:
    - `button` (HTMLElement): 触发导出的按钮元素
    - `formatSelect` (HTMLElement): 格式选择元素
    - `cookieTypeSelect` (HTMLElement): Cookie 类型选择元素
    - `exportProgress` (HTMLElement): 导出进度条元素
    - `cookieCount` (HTMLElement): Cookie 计数显示元素

- `exportAllCookies(button, formatSelect, cookieTypeSelect, exportProgress, cookieCount)`
  - 导出所有 Cookies
  - 参数:
    - `button` (HTMLElement): 触发导出的按钮元素
    - `formatSelect` (HTMLElement): 格式选择元素
    - `cookieTypeSelect` (HTMLElement): Cookie 类型选择元素
    - `exportProgress` (HTMLElement): 导出进度条元素
    - `cookieCount` (HTMLElement): Cookie 计数显示元素

- `copyCurrentCookies(button, formatSelect, cookieTypeSelect, exportProgress, cookieCount)`
  - 复制当前网站的 Cookies 到剪贴板
  - 参数:
    - `button` (HTMLElement): 触发复制的按钮元素
    - `formatSelect` (HTMLElement): 格式选择元素
    - `cookieTypeSelect` (HTMLElement): Cookie 类型选择元素
    - `exportProgress` (HTMLElement): 导出进度条元素
    - `cookieCount` (HTMLElement): Cookie 计数显示元素

- `copyAllCookies(button, formatSelect, cookieTypeSelect, exportProgress, cookieCount)`
  - 复制所有 Cookies 到剪贴板
  - 参数:
    - `button` (HTMLElement): 触发复制的按钮元素
    - `formatSelect` (HTMLElement): 格式选择元素
    - `cookieTypeSelect` (HTMLElement): Cookie 类型选择元素
    - `exportProgress` (HTMLElement): 导出进度条元素
    - `cookieCount` (HTMLElement): Cookie 计数显示元素

#### ImportManager

导入管理模块，负责处理所有导入相关的操作。

##### 方法

- `importCookies(file, triggerButton, importProgress, updateProgress, updateCookieCount, showResult, showError, uiManager, fileInput)`
  - 导入 Cookies
  - 参数:
    - `file` (File): 要导入的文件
    - `triggerButton` (HTMLElement): 触发导入的按钮元素
    - `importProgress` (HTMLElement): 导入进度条元素
    - `updateProgress` (Function): 更新进度条的函数
    - `updateCookieCount` (Function): 更新 Cookie 计数的函数
    - `showResult` (Function): 显示结果信息的函数
    - `showError` (Function): 显示错误信息的函数
    - `uiManager` (Object): UI 管理器
    - `fileInput` (HTMLInputElement): 文件输入元素

### 国际化模块

国际化模块位于 `js/modules/i18n/` 目录下，处理所有本地化和国际化相关的功能。

#### I18nManager

国际化管理器，处理所有国际化相关功能。

##### 方法

- `getSupportedLanguages()`
  - 获取支持的语言列表
  - 返回值:
    - (Array): 支持的语言代码数组

- `getCurrentLanguage()`
  - 获取当前语言
  - 返回值:
    - (string): 当前语言代码

- `setCurrentLanguage(language)`
  - 设置当前语言
  - 参数:
    - `language` (string): 语言代码

- `getMessage(key, language)`
  - 获取指定键的翻译消息
  - 参数:
    - `key` (string): 翻译键
    - `language` (string): 语言代码（可选，默认为当前语言）
  - 返回值:
    - (string): 翻译后的消息

- `formatMessage(key, params, language)`
  - 格式化消息，支持参数替换
  - 参数:
    - `key` (string): 翻译键
    - `params` (Object): 参数对象
    - `language` (string): 语言代码（可选，默认为当前语言）
  - 返回值:
    - (string): 格式化后的消息

- `applyLocalization(languageSelector, updateCookieCountFunction)`
  - 应用本地化到界面元素
  - 参数:
    - `languageSelector` (HTMLElement): 语言选择器元素
    - `updateCookieCountFunction` (Function): 更新 Cookie 计数的函数

### 错误处理模块

错误处理模块位于 `js/modules/errors/` 目录下，提供了统一的错误处理机制。

#### ErrorHandler

核心错误处理功能。

##### 方法

- `handleError(error, context, metadata)`
  - 处理并记录错误
  - 参数:
    - `error` (Error): 错误对象
    - `context` (string): 错误上下文信息
    - `metadata` (Object): 元数据

- `handleAsyncError(promise, context, metadata)`
  - 处理异步操作中的错误
  - 参数:
    - `promise` (Promise): 异步操作
    - `context` (string): 错误上下文信息
    - `metadata` (Object): 元数据
  - 返回值:
    - (Promise): 包装后的 Promise

- `withErrorHandling(fn, context)`
  - 为函数添加错误处理装饰器
  - 参数:
    - `fn` (Function): 要包装的函数
    - `context` (string): 错误上下文信息
  - 返回值:
    - (Function): 包装后的函数

#### ErrorLogger

错误日志记录功能。

##### 方法

- `logError(type, operation, message, details)`
  - 记录错误日志
  - 参数:
    - `type` (string): 错误类型
    - `operation` (string): 操作名称
    - `message` (string): 错误消息
    - `details` (Object): 错误详情

- `logWarning(type, operation, message, details)`
  - 记录警告信息
  - 参数:
    - `type` (string): 警告类型
    - `operation` (string): 操作名称
    - `message` (string): 警告消息
    - `details` (Object): 警告详情

- `getErrorLogs()`
  - 获取所有错误日志
  - 返回值:
    - (Array): 错误日志数组

- `clearErrorLogs()`
  - 清除所有错误日志

- `exportErrorLogs()`
  - 导出错误日志为文本格式
  - 返回值:
    - (string): 格式化的错误日志文本

#### ErrorDisplay

错误信息显示功能。

##### 方法

- `displayError(error, resultDiv, options)`
  - 显示一般错误信息
  - 参数:
    - `error` (string|Error): 错误消息或错误对象
    - `resultDiv` (HTMLElement): 结果显示元素
    - `options` (Object): 显示选项

- `displayNetworkError(operation, details, resultDiv)`
  - 显示网络错误
  - 参数:
    - `operation` (string): 操作名称
    - `details` (string): 错误详情
    - `resultDiv` (HTMLElement): 结果显示元素

- `displayFileError(operation, details, resultDiv)`
  - 显示文件错误
  - 参数:
    - `operation` (string): 操作名称
    - `details` (string): 错误详情
    - `resultDiv` (HTMLElement): 结果显示元素

- `displayFormatError(format, details, resultDiv)`
  - 显示格式错误
  - 参数:
    - `format` (string): 格式类型
    - `details` (string): 错误详情
    - `resultDiv` (HTMLElement): 结果显示元素

### 导出模块

导出模块位于 `js/modules/export/` 目录下，处理所有导出相关的功能。

#### ExportHandler

通用导出处理功能。

##### 方法

- `handleExport(sendMessageParams, button, defaultText, filename, shouldDownload, getExportFormat, showLoading, updateProgress, showError, showResult, downloadFile, updateCookieCount, getResultDiv, uiManager)`
  - 通用的导出处理函数
  - 参数:
    - `sendMessageParams` (Object): 发送到后台的消息参数
    - `button` (HTMLElement): 触发导出的按钮元素
    - `defaultText` (string): 按钮默认文本
    - `filename` (string): 下载文件名
    - `shouldDownload` (boolean): 是否下载文件
    - `getExportFormat` (Function): 获取导出格式的函数
    - `showLoading` (Function): 显示加载状态的函数
    - `updateProgress` (Function): 更新进度条的函数
    - `showError` (Function): 显示错误信息的函数
    - `showResult` (Function): 显示结果信息的函数
    - `downloadFile` (Function): 下载文件的函数
    - `updateCookieCount` (Function): 更新 Cookie 计数的函数
    - `getResultDiv` (Function): 获取结果区域的函数
    - `uiManager` (Object): UI 管理器

#### CurrentExporter

当前网站 Cookie 导出功能。

##### 方法

- `exportCurrentCookies(handleExport, button, getFilters, getExportFormat, showLoading, updateProgress, showError, showResult, downloadFile, updateCookieCount, getResultDiv, uiManager)`
  - 导出当前网站的 Cookies
  - 参数:
    - `handleExport` (Function): 处理导出的函数
    - `button` (HTMLElement): 导出按钮
    - `getFilters` (Function): 获取过滤条件的函数
    - `getExportFormat` (Function): 获取导出格式的函数
    - `showLoading` (Function): 显示加载状态的函数
    - `updateProgress` (Function): 更新进度条的函数
    - `showError` (Function): 显示错误信息的函数
    - `showResult` (Function): 显示结果信息的函数
    - `downloadFile` (Function): 下载文件的函数
    - `updateCookieCount` (Function): 更新 Cookie 计数的函数
    - `getResultDiv` (Function): 获取结果区域的函数
    - `uiManager` (Object): UI 管理器

- `copyCurrentCookies(handleExport, button, getFilters, getExportFormat, showLoading, updateProgress, showError, showResult, downloadFile, updateCookieCount, getResultDiv, uiManager)`
  - 复制当前网站的 Cookies 到剪贴板
  - 参数同上

#### AllExporter

所有 Cookie 导出功能。

##### 方法

- `exportAllCookies(handleExport, button, getFilters, getExportFormat, showLoading, updateProgress, showError, showResult, downloadFile, updateCookieCount, getResultDiv, uiManager)`
  - 导出所有 Cookies
  - 参数:
    - `handleExport` (Function): 处理导出的函数
    - `button` (HTMLElement): 导出按钮
    - `getFilters` (Function): 获取过滤条件的函数
    - `getExportFormat` (Function): 获取导出格式的函数
    - `showLoading` (Function): 显示加载状态的函数
    - `updateProgress` (Function): 更新进度条的函数
    - `showError` (Function): 显示错误信息的函数
    - `showResult` (Function): 显示结果信息的函数
    - `downloadFile` (Function): 下载文件的函数
    - `updateCookieCount` (Function): 更新 Cookie 计数的函数
    - `getResultDiv` (Function): 获取结果区域的函数
    - `uiManager` (Object): UI 管理器

- `copyAllCookies(handleExport, button, getFilters, getExportFormat, showLoading, updateProgress, showError, showResult, downloadFile, updateCookieCount, getResultDiv, uiManager)`
  - 复制所有 Cookies 到剪贴板
  - 参数同上

#### ExportErrorHandler

导出模块专用错误处理工具。

##### 方法

- `handleTabQueryError(error, getResultDiv)`
  - 处理标签页查询错误
  - 参数:
    - `error` (Object): Chrome API 返回的错误对象
    - `getResultDiv` (Function): 获取结果区域的函数

- `handleInvalidTabError(getResultDiv)`
  - 处理无效标签页错误
  - 参数:
    - `getResultDiv` (Function): 获取结果区域的函数

### 导入模块

导入模块位于 `js/modules/importManager.js` 文件中，处理 Cookie 导入功能。

#### ImportManager

Cookie 导入功能。

##### 方法

- `importCookies(fileInput, triggerButton, importProgress, showLoading, updateProgress, showError, showResult, updateCookieCount, getResultDiv, uiManager)`
  - 导入 Cookies
  - 参数:
    - `fileInput` (HTMLElement): 文件输入元素
    - `triggerButton` (HTMLElement): 触发导入的按钮元素
    - `importProgress` (HTMLElement): 导入进度条元素
    - `showLoading` (Function): 显示加载状态的函数
    - `updateProgress` (Function): 更新进度条的函数
    - `showError` (Function): 显示错误信息的函数
    - `showResult` (Function): 显示结果信息的函数
    - `updateCookieCount` (Function): 更新 Cookie 计数的函数
    - `getResultDiv` (Function): 获取结果区域的函数
    - `uiManager` (Object): UI 管理器

### UI 模块

UI 模块位于 `js/ui/uiManager.js` 文件中，处理用户界面相关的功能。

#### UIManager

UI 管理功能。

##### 方法

- `showLoading(message, resultDiv)`
  - 显示加载状态
  - 参数:
    - `message` (string): 显示的加载消息
    - `resultDiv` (HTMLElement): 结果显示元素

- `showResult(message, type, resultDiv)`
  - 显示结果消息
  - 参数:
    - `message` (string): 要显示的消息
    - `type` (string): 消息类型 (success|error|loading)
    - `resultDiv` (HTMLElement): 结果显示元素

- `showError(message, details, resultDiv)`
  - 显示详细错误信息
  - 参数:
    - `message` (string): 错误消息
    - `details` (Array|string): 详细错误信息
    - `resultDiv` (HTMLElement): 结果显示元素

- `showNetworkError(operation, error, resultDiv)`
  - 显示网络错误
  - 参数:
    - `operation` (string): 操作名称
    - `error` (string): 错误详情
    - `resultDiv` (HTMLElement): 结果显示元素

- `showFileError(operation, error, resultDiv)`
  - 显示文件错误
  - 参数:
    - `operation` (string): 操作名称
    - `error` (string): 错误详情
    - `resultDiv` (HTMLElement): 结果显示元素

- `showFormatError(format, error, resultDiv)`
  - 显示格式错误
  - 参数:
    - `format` (string): 格式类型
    - `error` (string): 错误详情
    - `resultDiv` (HTMLElement): 结果显示元素

- `updateProgress(progressContainer, progress)`
  - 更新进度条
  - 参数:
    - `progressContainer` (HTMLElement): 进度条容器元素
    - `progress` (number): 进度值 (0-100)

- `handleDragOver(e, dropArea)`
  - 处理拖拽悬停事件
  - 参数:
    - `e` (Event): 拖拽事件
    - `dropArea` (HTMLElement): 拖放区域元素

- `handleDragLeave(e, dropArea)`
  - 处理拖拽离开事件
  - 参数:
    - `e` (Event): 拖拽事件
    - `dropArea` (HTMLElement): 拖放区域元素

- `handleDrop(e, dropArea, fileInput)`
  - 处理文件拖放事件
  - 参数:
    - `e` (Event): 拖拽事件
    - `dropArea` (HTMLElement): 拖放区域元素
    - `fileInput` (HTMLElement): 文件输入元素

- `handleFileSelect(e, dropArea)`
  - 处理文件选择事件
  - 参数:
    - `e` (Event): 选择事件
    - `dropArea` (HTMLElement): 拖放区域元素

### 工具模块

工具模块位于 `js/utils/utils.js` 文件中，提供通用工具函数。

#### Utils

工具函数集合。

##### 方法

- `escapeHtml(unsafe)`
  - 转义 HTML 字符
  - 参数:
    - `unsafe` (string): 不安全的 HTML 字符串
  - 返回值:
    - (string): 转义后的 HTML 字符串

- `escapeXml(unsafe)`
  - 转义 XML 字符
  - 参数:
    - `unsafe` (string): 不安全的 XML 字符串
  - 返回值:
    - (string): 转义后的 XML 字符串

- `getDomain(url)`
  - 从 URL 提取域名
  - 参数:
    - `url` (string): 完整 URL
  - 返回值:
    - (string): 域名

- `detectFileFormat(filename)`
  - 根据文件扩展名自动识别文件格式
  - 参数:
    - `filename` (string): 文件名
  - 返回值:
    - (string): 识别出的文件格式

## 使用示例

### 初始化弹窗

```javascript
// 初始化弹窗
import { PopupInitializer } from './js/modules/popupInitializer.js';

document.addEventListener('DOMContentLoaded', function() {
  PopupInitializer.initializePopup();
});
```

### 国际化使用示例

```javascript
// 获取翻译文本
import { I18n } from './js/modules/i18n/index.js';

// 获取简单文本
const exportText = I18n.getMessage('exportTab');

// 获取带参数的文本
const cookieCountText = I18n.formatMessage('cookiesLoaded', { count: 10 });

// 应用本地化
const languageSelector = document.getElementById('language-selector');
I18n.applyLocalization(languageSelector, updateCookieCount);
```

### 导出当前网站 Cookies

```javascript
// 导出当前网站的 Cookies 为 JSON 格式文件
import { ExportOperations } from './js/modules/exportOperations.js';

const {
  exportCurrentBtn,
  formatSelect,
  cookieTypeSelect,
  exportProgress,
  cookieCount
} = DOMManager.getDOMElements();

ExportOperations.exportCurrentCookies(
  exportCurrentBtn,
  formatSelect,
  cookieTypeSelect,
  exportProgress,
  cookieCount
);
```

### 复制所有 Cookies 到剪贴板

```javascript
// 复制所有 Cookies 到剪贴板
import { ExportOperations } from './js/modules/exportOperations.js';

const {
  copyAllBtn,
  formatSelect,
  cookieTypeSelect,
  exportProgress,
  cookieCount
} = DOMManager.getDOMElements();

ExportOperations.copyAllCookies(
  copyAllBtn,
  formatSelect,
  cookieTypeSelect,
  exportProgress,
  cookieCount
);
```

### 导入 Cookies

```javascript
// 从文件导入 Cookies
import { FileOperations } from './js/modules/fileOperations.js';

const {
  fileInput,
  browseFilesBtn,
  dropArea,
  importProgress,
  cookieCount
} = DOMManager.getDOMElements();

FileOperations.importSelectedFile(
  fileInput,
  browseFilesBtn,
  importProgress,
  cookieCount
);
```

## 英文版本

- [API Documentation (English)](API_EN.md)