/**
 * 错误日志记录模块（已废弃）
 * 为了保持向后兼容性而保留，推荐使用新的错误处理系统
 * @deprecated 使用 js/modules/errors/ErrorLogger.js 替代
 */

import { ErrorLogger as NewErrorLogger } from './errors/index.js';

// 保持向后兼容性，重新导出新系统的函数
export const ErrorLogger = {
  logError: NewErrorLogger.logError,
  getErrorLogs: NewErrorLogger.getErrorLogs,
  clearErrorLogs: NewErrorLogger.clearErrorLogs,
  exportErrorLogs: NewErrorLogger.exportErrorLogs
};