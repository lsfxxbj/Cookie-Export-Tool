/**
 * 本地化管理模块
 * 处理界面本地化相关功能
 */

import { LocalizationHandler } from './localization/localizationHandler.js';

// 重新导出所有函数，保持向后兼容性
export const LocalizationManager = {
  applyLocalization: LocalizationHandler.applyLocalization,
  getLocalizedMessage: LocalizationHandler.getLocalizedMessage
};