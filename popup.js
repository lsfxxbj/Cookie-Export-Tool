/**
 * Cookie 导出工具 - Popup 脚本
 * 提供用户界面交互和消息传递功能
 */

import { PopupInitializer } from './js/modules/popupInitializer.js';

// 页面加载完成后初始化弹窗
document.addEventListener('DOMContentLoaded', function() {
  PopupInitializer.initializePopup();
});
