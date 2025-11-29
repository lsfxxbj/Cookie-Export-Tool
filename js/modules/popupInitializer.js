/**
 * 弹窗初始化器
 * 负责初始化弹窗的所有功能
 */

import { DOMManager } from './domManager.js';
import { LocalizationManager } from './localizationManager.js';
import { CookieCounter } from './cookieCounter.js';
import { EventListeners } from './eventListeners/index.js';
import { I18n } from './i18n/index.js';
import { UserConfig } from './userConfig/index.js';
import { ImportManager } from './importManager.js';
import { FilterManager } from './filterManager.js';
import { UIManager } from '../ui/uiManager.js';
import { ExportOperations } from './exportOperations.js';
import { FileOperations } from './fileOperations.js';
import { CookieOperations } from './cookieOperations.js';

/**
 * 初始化弹窗
 */
function initializePopup() {
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
    cookieCount,
    languageSelector,
    
    // 过滤和格式选择元素
    formatSelect,
    cookieTypeSelect,
    
    // 标签页相关元素
    tabButtons,
    tabContents,
    
    // 进度条元素
    exportProgress,
    importProgress
  } = domElements;
  
  // 首先尝试从存储中获取语言设置，如果没有则使用浏览器默认语言
  UserConfig.getLanguage(function(savedLanguage) {
    if (!savedLanguage) {
      // 获取浏览器UI语言
      const browserLanguage = chrome.i18n.getUILanguage();
      
      // 根据浏览器语言设置默认语言
      const supportedLanguages = I18n.getSupportedLanguages();
      if (supportedLanguages.includes(browserLanguage)) {
        savedLanguage = browserLanguage;
      } else if (browserLanguage.startsWith('zh')) {
        savedLanguage = 'zh-CN';
      } else {
        // 默认使用英语
        savedLanguage = 'en';
      }
      
      // 保存语言设置
      UserConfig.setLanguage(savedLanguage);
    }
    
    // 设置语言选择器的值
    languageSelector.value = savedLanguage;
    
    // 应用界面本地化设置
    LocalizationManager.applyLocalization(languageSelector, () => CookieCounter.updateCookieCount(cookieCount));
  });
  
  // 定义所有回调函数，使用缓存的DOM元素
  const callbacks = {
    exportCurrentCookies: () => ExportOperations.exportCurrentCookies(exportCurrentBtn, formatSelect, cookieTypeSelect, exportProgress, cookieCount),
    exportAllCookies: () => ExportOperations.exportAllCookies(exportAllBtn, formatSelect, cookieTypeSelect, exportProgress, cookieCount),
    copyCurrentCookies: () => ExportOperations.copyCurrentCookies(copyCurrentBtn, formatSelect, cookieTypeSelect, exportProgress, cookieCount),
    copyAllCookies: () => ExportOperations.copyAllCookies(copyAllBtn, formatSelect, cookieTypeSelect, exportProgress, cookieCount),
    handleFileSelection: (e) => FileOperations.handleFileSelection(e, fileInput, browseFilesBtn, dropArea, importProgress, cookieCount),
    handleFileDrop: (e) => FileOperations.handleFileDrop(e, fileInput, dropArea, importProgress, cookieCount, browseFilesBtn),
    changeLanguage: () => changeLanguage(languageSelector, cookieCount),
    updateFilteredCookieCount: () => CookieOperations.updateFilteredCookieCount(cookieCount, cookieTypeSelect)
  };
  
  // 初始化事件监听器
  EventListeners.initializePopupEventListeners(callbacks);
  
  // 初始化 Cookie 计数显示
  CookieCounter.updateCookieCount(cookieCount);
}

/**
 * 切换语言
 */
function changeLanguage(languageSelector, cookieCount) {
  const selectedLanguage = languageSelector.value;
  console.log('Changing language to:', selectedLanguage);
  
  // 保存语言设置到存储中
  UserConfig.setLanguage(selectedLanguage, function() {
    console.log('Language setting saved: ' + selectedLanguage);
  });
  
  // 重新应用本地化来更新界面文本
  LocalizationManager.applyLocalization(languageSelector, () => CookieCounter.updateCookieCount(cookieCount));
  console.log('Localization applied');
  
  // 显示语言切换成功的消息
  const lang = languageSelector.value;
  const langNames = {
    'zh-CN': I18n.getMessage("chinese"),
    'en': I18n.getMessage("english"),
    'fr': I18n.getMessage("french")
  };
  const resultDiv = DOMManager.getResultDiv();
  if (resultDiv) UIManager.showResult(`${I18n.getMessage("languageChanged")} ${langNames[lang] || lang}`, 'success', resultDiv);
  setTimeout(() => {
    const resultDiv = DOMManager.getResultDiv();
    if (resultDiv) resultDiv.classList.remove('visible');
  }, 1500);
}

export const PopupInitializer = {
  initializePopup
};