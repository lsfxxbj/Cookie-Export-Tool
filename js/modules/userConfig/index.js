/**
 * 用户配置模块入口
 * 统一导出所有用户配置相关功能
 */

import { UserConfigManager } from './userConfigManager.js';

// 导出所有函数
export const UserConfig = {
  getLanguage: UserConfigManager.getLanguage,
  setLanguage: UserConfigManager.setLanguage,
  getErrorLogs: UserConfigManager.getErrorLogs,
  clearErrorLogs: UserConfigManager.clearErrorLogs,
  addErrorLog: UserConfigManager.addErrorLog
};