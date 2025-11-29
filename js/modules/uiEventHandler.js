/**
 * UI 事件处理模块
 * 负责处理各种 UI 事件
 */

import { DOMManager } from './domManager.js';
import { CookieCounter } from './cookieCounter.js';

/**
 * 绑定标签页切换事件
 * @param {NodeList} tabButtons - 标签按钮元素列表
 * @param {NodeList} tabContents - 标签内容元素列表
 */
function bindTabSwitchEvents(tabButtons, tabContents) {
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
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
    });
  });
}

/**
 * 绑定语言切换事件
 * @param {HTMLElement} languageSelector - 语言选择器元素
 * @param {Function} changeLanguageFunction - 切换语言的函数
 */
function bindLanguageChangeEvent(languageSelector, changeLanguageFunction) {
  languageSelector.addEventListener('change', changeLanguageFunction);
}

/**
 * 绑定 Cookie 类型切换事件
 * @param {HTMLElement} cookieTypeSelect - Cookie 类型选择器元素
 * @param {Function} updateFilteredCookieCountFunction - 更新 Cookie 计数的函数
 */
function bindCookieTypeChangeEvent(cookieTypeSelect, updateFilteredCookieCountFunction) {
  cookieTypeSelect.addEventListener('change', updateFilteredCookieCountFunction);
}

/**
 * 绑定拖放事件
 * @param {HTMLElement} dropArea - 拖放区域元素
 * @param {Object} uiManager - UI 管理器
 */
function bindDragAndDropEvents(dropArea, uiManager) {
  // 拖放事件监听器
  dropArea.addEventListener('dragover', (e) => uiManager.handleDragOver(e, dropArea));
  dropArea.addEventListener('dragleave', (e) => uiManager.handleDragLeave(e, dropArea));
  dropArea.addEventListener('drop', (e) => uiManager.handleDrop(e, dropArea, document.getElementById('file-input')));
}

// 导出所有函数
export const UIEventHandler = {
  bindTabSwitchEvents,
  bindLanguageChangeEvent,
  bindCookieTypeChangeEvent,
  bindDragAndDropEvents
};