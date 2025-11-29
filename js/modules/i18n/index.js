/**
 * 国际化(i18n)管理模块
 * 统一处理所有国际化相关操作
 */

import { I18nManager } from './i18nManager.js';

// 导出所有函数
export const I18n = {
  getMessage: I18nManager.getMessage,
  formatMessage: I18nManager.formatMessage,
  getCurrentLanguage: I18nManager.getCurrentLanguage,
  setCurrentLanguage: I18nManager.setCurrentLanguage,
  applyLocalization: I18nManager.applyLocalization,
  getSupportedLanguages: I18nManager.getSupportedLanguages
};