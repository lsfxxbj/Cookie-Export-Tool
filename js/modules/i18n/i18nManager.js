/**
 * 国际化管理器
 * 处理所有国际化相关功能
 */

import { translations } from '../localization/translations.js';

// 默认语言
const DEFAULT_LANGUAGE = 'zh-CN';

// 当前语言
let currentLanguage = DEFAULT_LANGUAGE;

/**
 * 获取支持的语言列表
 * @returns {Array} 支持的语言代码数组
 */
function getSupportedLanguages() {
  return Object.keys(translations);
}

/**
 * 获取当前语言
 * @returns {string} 当前语言代码
 */
function getCurrentLanguage() {
  return currentLanguage;
}

/**
 * 设置当前语言
 * @param {string} language - 语言代码
 */
function setCurrentLanguage(language) {
  if (translations[language]) {
    currentLanguage = language;
  } else {
    console.warn(`Language '${language}' not supported, falling back to default`);
    currentLanguage = DEFAULT_LANGUAGE;
  }
}

/**
 * 获取指定键的翻译消息
 * @param {string} key - 翻译键
 * @param {string} language - 语言代码（可选，默认为当前语言）
 * @returns {string} 翻译后的消息
 */
function getMessage(key, language = currentLanguage) {
  if (translations[language] && translations[language][key]) {
    return translations[language][key];
  }
  // 如果找不到指定语言的翻译，回退到默认语言
  if (translations[DEFAULT_LANGUAGE] && translations[DEFAULT_LANGUAGE][key]) {
    return translations[DEFAULT_LANGUAGE][key];
  }
  // 如果还是找不到，返回键名
  return key;
}

/**
 * 格式化消息，支持参数替换
 * @param {string} key - 翻译键
 * @param {Object} params - 参数对象
 * @param {string} language - 语言代码（可选，默认为当前语言）
 * @returns {string} 格式化后的消息
 */
function formatMessage(key, params = {}, language = currentLanguage) {
  let message = getMessage(key, language);
  
  // 替换参数
  for (const [paramKey, paramValue] of Object.entries(params)) {
    const placeholder = `{{${paramKey}}}`;
    message = message.replace(new RegExp(placeholder, 'g'), paramValue);
  }
  
  return message;
}

/**
 * 应用本地化到界面元素
 * @param {HTMLElement} languageSelector - 语言选择器元素
 * @param {Function} updateCookieCountFunction - 更新 Cookie 计数的函数
 */
function applyLocalization(languageSelector, updateCookieCountFunction) {
  console.log('[I18nManager] Applying localization');
  // 获取当前选择的语言
  const currentLang = languageSelector.value;
  setCurrentLanguage(currentLang);
  console.log('[I18nManager] Current selected language:', currentLang);
  
  // 本地化所有带有 data-i18n 属性的元素
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const message = getMessage(key, currentLang);
    console.log('[I18nManager] Localizing element:', element, 'Key:', key, 'Message:', message);
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
        console.log('[I18nManager] Updated element content to', message);
      }
    }
  });
  
  // 本地化select元素内部的选项
  document.querySelectorAll('select[data-i18n-aria-label]').forEach(select => {
    select.querySelectorAll('option[data-i18n]').forEach(option => {
      const key = option.getAttribute('data-i18n');
      const message = getMessage(key, currentLang);
      if (message) {
        option.textContent = message;
      }
    });
  });
  
  // 本地化 placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const message = getMessage(key, currentLang);
    if (message) {
      element.placeholder = message;
    }
  });
  
  // 本地化 aria-label 属性
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const key = element.getAttribute('data-i18n-aria');
    const message = getMessage(key, currentLang);
    if (message) {
      element.setAttribute('aria-label', message);
    }
  });
  
  // 本地化 aria-label 属性（使用 data-i18n-aria-label）
  document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
    const key = element.getAttribute('data-i18n-aria-label');
    const message = getMessage(key, currentLang);
    if (message) {
      element.setAttribute('aria-label', message);
    }
  });
  
  // 更新HTML的lang属性
  document.documentElement.lang = currentLang;
  
  // 更新 Cookie 计数
  if (updateCookieCountFunction) {
    updateCookieCountFunction();
  }
}

export const I18nManager = {
  getSupportedLanguages,
  getCurrentLanguage,
  setCurrentLanguage,
  getMessage,
  formatMessage,
  applyLocalization
};