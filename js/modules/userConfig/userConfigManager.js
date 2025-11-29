/**
 * 用户配置管理器
 * 统一管理和操作用户配置信息
 */

/**
 * 获取用户语言设置
 * @param {Function} callback - 回调函数，接收语言设置作为参数
 */
function getLanguage(callback) {
  chrome.storage.local.get(['language'], function(result) {
    callback(result.language);
  });
}

/**
 * 设置用户语言
 * @param {string} language - 语言代码
 * @param {Function} callback - 回调函数
 */
function setLanguage(language, callback) {
  chrome.storage.local.set({language: language}, callback);
}

/**
 * 获取错误日志
 * @returns {Array} 错误日志数组
 */
function getErrorLogs() {
  try {
    const storedLogs = localStorage.getItem('cookieExporterErrorLogs');
    return storedLogs ? JSON.parse(storedLogs) : [];
  } catch (e) {
    console.warn('[UserConfig] Failed to read error logs:', e);
    return [];
  }
}

/**
 * 清除错误日志
 */
function clearErrorLogs() {
  try {
    localStorage.removeItem('cookieExporterErrorLogs');
  } catch (e) {
    console.warn('[UserConfig] Failed to clear error logs:', e);
  }
}

/**
 * 添加错误日志
 * @param {Object} logEntry - 日志条目
 */
function addErrorLog(logEntry) {
  try {
    // 获取现有的错误日志
    let errorLogs = getErrorLogs();
    
    // 添加新日志
    errorLogs.push(logEntry);

    // 只保留最近的100条日志
    if (errorLogs.length > 100) {
      errorLogs = errorLogs.slice(-100);
    }

    // 保存日志
    localStorage.setItem('cookieExporterErrorLogs', JSON.stringify(errorLogs));
  } catch (e) {
    console.warn('[UserConfig] Failed to save error log:', e);
  }
}

export const UserConfigManager = {
  getLanguage,
  setLanguage,
  getErrorLogs,
  clearErrorLogs,
  addErrorLog
};