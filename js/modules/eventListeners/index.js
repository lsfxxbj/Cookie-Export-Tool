/**
 * 事件监听器模块入口
 * 统一导出所有事件监听器相关功能
 */

import { EventListenerManager } from './eventListenerManager.js';

// 导出所有函数
export const EventListeners = {
  initializePopupEventListeners: EventListenerManager.initializePopupEventListeners,
  bindTabSwitchEvents: EventListenerManager.bindTabSwitchEvents,
  bindLanguageChangeEvent: EventListenerManager.bindLanguageChangeEvent,
  bindCookieTypeChangeEvent: EventListenerManager.bindCookieTypeChangeEvent,
  bindDragAndDropEvents: EventListenerManager.bindDragAndDropEvents,
  bindExportEvents: EventListenerManager.bindExportEvents,
  bindImportEvents: EventListenerManager.bindImportEvents,
  cleanupAllEventListeners: EventListenerManager.cleanupAllEventListeners
};