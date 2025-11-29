/**
 * 本地化处理器模块
 * 处理界面本地化相关功能
 */

import { translations } from './translations.js';

/**
 * 获取指定语言的翻译消息
 * @param {string} key - 翻译键
 * @param {string} language - 语言代码
 * @returns {string} 翻译后的消息
 */
function getLocalizedMessage(key, language) {
  if (translations[language] && translations[language][key]) {
    return translations[language][key];
  }
  // 如果找不到指定语言的翻译，回退到中文
  return translations["zh-CN"][key] || key;
}

/**
 * 应用本地化
 * @param {HTMLElement} languageSelector - 语言选择器元素
 * @param {Function} updateCookieCountFunction - 更新 Cookie 计数的函数
 */
function applyLocalization(languageSelector, updateCookieCountFunction) {
  console.log('Applying localization');
  // 获取当前选择的语言
  const currentLanguage = languageSelector.value;
  console.log('Current selected language:', currentLanguage);
  
  // 本地化所有带有 data-i18n 属性的元素
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const message = getLocalizedMessage(key, currentLanguage);
    console.log('Localizing element:', element, 'Key:', key, 'Message:', message);
    if (message) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = message;
      } else if (element.tagName === 'TITLE') {
        // 特殊处理标题元素
        document.title = message;
      } else if (element.tagName === 'OPTION') {
        // 特殊处理选项元素
        element.textContent = message;
      } else {
        // 对于普通元素，直接更新 textContent
        element.textContent = message;
        console.log('Updated element content to', message);
      }
    }
  });
  
  // 本地化select元素内部的选项
  document.querySelectorAll('select[data-i18n-aria-label]').forEach(select => {
    select.querySelectorAll('option[data-i18n]').forEach(option => {
      const key = option.getAttribute('data-i18n');
      const message = getLocalizedMessage(key, currentLanguage);
      if (message) {
        option.textContent = message;
      }
    });
  });
  
  // 本地化 placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const message = getLocalizedMessage(key, currentLanguage);
    if (message) {
      element.placeholder = message;
    }
  });
  
  // 本地化 aria-label 属性
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const key = element.getAttribute('data-i18n-aria');
    const message = getLocalizedMessage(key, currentLanguage);
    if (message) {
      element.setAttribute('aria-label', message);
    }
  });
  
  // 本地化 aria-label 属性（使用 data-i18n-aria-label）
  document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
    const key = element.getAttribute('data-i18n-aria-label');
    const message = getLocalizedMessage(key, currentLanguage);
    if (message) {
      element.setAttribute('aria-label', message);
    }
  });
  
  // 更新HTML的lang属性
  document.documentElement.lang = currentLanguage;
  
  // 更新 Cookie 计数
  if (updateCookieCountFunction) {
    updateCookieCountFunction();
  }
}

export const LocalizationHandler = {
  getLocalizedMessage,
  applyLocalization
};