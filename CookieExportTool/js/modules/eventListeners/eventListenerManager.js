/**
 * 事件监听器管理器
 * 统一管理和绑定所有事件监听器
 */

import { DOMManager } from '../domManager.js';
import { UIManager } from '../../ui/uiManager.js';
import { CookieCounter } from '../cookieCounter.js';

// 存储活动的事件监听器，以便在需要时正确清理
const activeEventListeners = new Map();

/**
 * 初始化弹窗事件监听器
 * @param {Object} callbacks - 回调函数对象
 */
function initializePopupEventListeners(callbacks) {
  // 获取所有需要操作的 DOM 元素（使用缓存机制）
  const domElements = DOMManager.getDOMElements();
  const {
    // 导出相关按钮
    exportCurrentBtn,
    exportAllBtn,
    copyCurrentBtn,
    copyAllBtn,
    
    // 导入相关元素
    browseFilesBtn,
    fileInput,
    dropArea,
    
    // 界面显示元素
    languageSelector,
    
    // 过滤和格式选择元素
    cookieTypeSelect,
    
    // 标签页相关元素
    tabButtons,
    tabContents,
    
    // 进度条元素
    exportProgress,
    importProgress
  } = domElements;
  
  // 绑定导出相关事件
  bindExportEvents(
    exportCurrentBtn, 
    exportAllBtn, 
    copyCurrentBtn, 
    copyAllBtn, 
    callbacks
  );
  
  // 绑定导入相关事件
  bindImportEvents(browseFilesBtn, fileInput, dropArea, callbacks);
  
  // 绑定标签页切换事件
  bindTabSwitchEvents(tabButtons, tabContents);
  
  // 绑定语言切换事件
  bindLanguageChangeEvent(languageSelector, callbacks.changeLanguage);
  
  // 绑定 Cookie 类型切换事件
  bindCookieTypeChangeEvent(cookieTypeSelect, () => callbacks.updateFilteredCookieCount());
  
  // 绑定拖放事件
  bindDragAndDropEvents(dropArea, callbacks.handleFileDrop);
}

/**
 * 绑定导出相关事件
 * @param {HTMLElement} exportCurrentBtn - 导出当前按钮
 * @param {HTMLElement} exportAllBtn - 导出所有按钮
 * @param {HTMLElement} copyCurrentBtn - 复制当前按钮
 * @param {HTMLElement} copyAllBtn - 复制所有按钮
 * @param {Object} callbacks - 回调函数对象
 */
function bindExportEvents(exportCurrentBtn, exportAllBtn, copyCurrentBtn, copyAllBtn, callbacks) {
  const exportCurrentHandler = callbacks.exportCurrentCookies;
  const exportAllHandler = callbacks.exportAllCookies;
  const copyCurrentHandler = callbacks.copyCurrentCookies;
  const copyAllHandler = callbacks.copyAllCookies;
  
  exportCurrentBtn.addEventListener('click', exportCurrentHandler);
  exportAllBtn.addEventListener('click', exportAllHandler);
  copyCurrentBtn.addEventListener('click', copyCurrentHandler);
  copyAllBtn.addEventListener('click', copyAllHandler);
  
  // 存储事件监听器引用以便后续清理
  activeEventListeners.set(exportCurrentBtn, { 'click': exportCurrentHandler });
  activeEventListeners.set(exportAllBtn, { 'click': exportAllHandler });
  activeEventListeners.set(copyCurrentBtn, { 'click': copyCurrentHandler });
  activeEventListeners.set(copyAllBtn, { 'click': copyAllHandler });
}

/**
 * 绑定导入相关事件
 * @param {HTMLElement} browseFilesBtn - 浏览文件按钮
 * @param {HTMLInputElement} fileInput - 文件输入元素
 * @param {HTMLElement} dropArea - 拖放区域元素
 * @param {Object} callbacks - 回调函数对象
 */
function bindImportEvents(browseFilesBtn, fileInput, dropArea, callbacks) {
  const browseClickHandler = () => fileInput.click();
  const fileChangeHandler = callbacks.handleFileSelection;
  const dragOverHandler = (e) => UIManager.handleDragOver(e, dropArea);
  const dragLeaveHandler = (e) => UIManager.handleDragLeave(e, dropArea);
  const dropHandler = callbacks.handleFileDrop;
  
  browseFilesBtn.addEventListener('click', browseClickHandler);
  fileInput.addEventListener('change', fileChangeHandler);
  dropArea.addEventListener('dragover', dragOverHandler);
  dropArea.addEventListener('dragleave', dragLeaveHandler);
  dropArea.addEventListener('drop', dropHandler);
  
  // 存储事件监听器引用以便后续清理
  activeEventListeners.set(browseFilesBtn, { 'click': browseClickHandler });
  activeEventListeners.set(fileInput, { 'change': fileChangeHandler });
  activeEventListeners.set(dropArea, { 
    'dragover': dragOverHandler,
    'dragleave': dragLeaveHandler,
    'drop': dropHandler
  });
}

/**
 * 绑定标签页切换事件
 * @param {NodeList} tabButtons - 标签按钮元素列表
 * @param {NodeList} tabContents - 标签内容元素列表
 */
function bindTabSwitchEvents(tabButtons, tabContents) {
  tabButtons.forEach(button => {
    const clickHandler = () => {
      const tabId = button.getAttribute('data-tab');
      
      // 更新活动标签按钮状态
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // 显示对应的标签内容
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
          content.classList.add('active');
        }
      });
    };
    
    button.addEventListener('click', clickHandler);
    
    // 存储事件监听器引用以便后续清理
    if (!activeEventListeners.has(button)) {
      activeEventListeners.set(button, {});
    }
    activeEventListeners.get(button)['click'] = clickHandler;
  });
}

/**
 * 绑定语言切换事件
 * @param {HTMLElement} languageSelector - 语言选择器元素
 * @param {Function} changeLanguageFunction - 切换语言的函数
 */
function bindLanguageChangeEvent(languageSelector, changeLanguageFunction) {
  languageSelector.addEventListener('change', changeLanguageFunction);
  
  // 存储事件监听器引用以便后续清理
  activeEventListeners.set(languageSelector, { 'change': changeLanguageFunction });
}

/**
 * 绑定 Cookie 类型切换事件
 * @param {HTMLElement} cookieTypeSelect - Cookie 类型选择器元素
 * @param {Function} updateFilteredCookieCountFunction - 更新 Cookie 计数的函数
 */
function bindCookieTypeChangeEvent(cookieTypeSelect, updateFilteredCookieCountFunction) {
  cookieTypeSelect.addEventListener('change', updateFilteredCookieCountFunction);
  
  // 存储事件监听器引用以便后续清理
  activeEventListeners.set(cookieTypeSelect, { 'change': updateFilteredCookieCountFunction });
}

/**
 * 绑定拖放事件
 * @param {HTMLElement} dropArea - 拖放区域元素
 * @param {Function} handleFileDropFunction - 处理文件拖放的函数
 */
function bindDragAndDropEvents(dropArea, handleFileDropFunction) {
  const dragOverHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.style.backgroundColor = '#e6f3ff';
    dropArea.style.borderColor = '#007bff';
  };
  
  const dragLeaveHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.style.backgroundColor = '#f9f9f9';
    dropArea.style.borderColor = '#ccc';
  };
  
  dropArea.addEventListener('dragover', dragOverHandler);
  dropArea.addEventListener('dragleave', dragLeaveHandler);
  dropArea.addEventListener('drop', handleFileDropFunction);
  
  // 存储事件监听器引用以便后续清理
  activeEventListeners.set(dropArea, { 
    'dragover': dragOverHandler,
    'dragleave': dragLeaveHandler,
    'drop': handleFileDropFunction
  });
}

/**
 * 清理所有活动的事件监听器
 * 在适当的时候调用此函数以释放所有资源
 */
function cleanupAllEventListeners() {
  activeEventListeners.forEach((handlers, element) => {
    Object.entries(handlers).forEach(([eventType, handler]) => {
      if (element && element.removeEventListener) {
        element.removeEventListener(eventType, handler);
      }
    });
  });
  activeEventListeners.clear();
}

export const EventListenerManager = {
  initializePopupEventListeners,
  bindTabSwitchEvents,
  bindLanguageChangeEvent,
  bindCookieTypeChangeEvent,
  bindDragAndDropEvents,
  bindExportEvents,
  bindImportEvents,
  cleanupAllEventListeners
};