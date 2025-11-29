/**
 * 错误日志记录器
 * 提供错误日志的记录、查询和管理功能
 */

import { UserConfig } from '../userConfig/index.js';

/**
 * 记录错误日志
 * @param {string} type - 错误类型
 * @param {string} operation - 操作名称
 * @param {string} message - 错误消息
 * @param {Object} details - 详细信息
 */
function logError(type, operation, message, details = {}) {
  const logEntry = {
    type,
    operation,
    message,
    details,
    timestamp: new Date().toISOString()
  };
  
  UserConfig.addErrorLog(logEntry);
}

/**
 * 记录警告信息
 * @param {string} type - 警告类型
 * @param {string} operation - 操作名称
 * @param {string} message - 警告消息
 * @param {Object} details - 详细信息
 */
function logWarning(type, operation, message, details = {}) {
  const logEntry = {
    type: 'warning',
    operation,
    message,
    details,
    timestamp: new Date().toISOString()
  };
  
  UserConfig.addErrorLog(logEntry);
}

/**
 * 获取所有错误日志
 * @returns {Array} 错误日志数组
 */
function getErrorLogs() {
  return UserConfig.getErrorLogs();
}

/**
 * 清除所有错误日志
 */
function clearErrorLogs() {
  UserConfig.clearErrorLogs();
}

/**
 * 导出错误日志为文本格式
 * @returns {string} 格式化的错误日志文本
 */
function exportErrorLogs() {
  const logs = getErrorLogs();
  if (logs.length === 0) {
    return "没有错误日志";
  }
  
  let logText = `错误日志导出时间: ${new Date().toISOString()}\n`;
  logText += `总共 ${logs.length} 条日志\n\n`;
  
  logs.forEach((log, index) => {
    logText += `--- 日志 ${index + 1} ---\n`;
    logText += `时间: ${log.timestamp}\n`;
    logText += `类型: ${log.type}\n`;
    logText += `操作: ${log.operation}\n`;
    logText += `消息: ${log.message}\n`;
    
    if (Object.keys(log.details).length > 0) {
      // 确保对象能正确显示
      let detailsString;
      try {
        detailsString = JSON.stringify(log.details, null, 2);
      } catch (e) {
        detailsString = "[无法序列化详细信息]";
      }
      logText += `详细信息: ${detailsString}\n`;
    }
    
    logText += '\n';
  });
  
  return logText;
}

export const ErrorLogger = {
  logError,
  logWarning,
  getErrorLogs,
  clearErrorLogs,
  exportErrorLogs
};