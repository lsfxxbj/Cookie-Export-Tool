/**
 * 错误处理器模块
 * 提供统一的错误处理机制
 */

import { UserConfig } from '../userConfig/index.js';

/**
 * 统一错误处理函数
 * @param {Error} error - 错误对象
 * @param {string} context - 错误上下文信息
 * @param {Object} metadata - 元数据
 */
function handleError(error, context = '', metadata = {}) {
  // 构造错误信息对象
  const errorInfo = {
    message: error.message || String(error),
    stack: error.stack || '',
    context,
    metadata,
    timestamp: new Date().toISOString(),
    url: window.location.href
  };

  // 在控制台输出错误
  console.error('[ErrorHandler]', context, error, metadata);

  // 记录错误日志
  UserConfig.addErrorLog(errorInfo);

  return errorInfo;
}

/**
 * 处理异步错误
 * @param {Promise} promise - 异步操作 Promise
 * @param {string} context - 错误上下文信息
 * @param {Object} metadata - 元数据
 * @returns {Promise} 包装后的 Promise
 */
async function handleAsyncError(promise, context = '', metadata = {}) {
  try {
    return await promise;
  } catch (error) {
    handleError(error, context, metadata);
    throw error;
  }
}

/**
 * 创建错误处理装饰器
 * @param {Function} fn - 要包装的函数
 * @param {string} context - 错误上下文信息
 * @returns {Function} 包装后的函数
 */
function withErrorHandling(fn, context = '') {
  return function(...args) {
    try {
      const result = fn.apply(this, args);
      
      // 如果是 Promise，添加错误处理
      if (result && typeof result.catch === 'function') {
        return result.catch(error => {
          handleError(error, context, { args });
          throw error;
        });
      }
      
      return result;
    } catch (error) {
      handleError(error, context, { args });
      throw error;
    }
  };
}

export const ErrorHandler = {
  handleError,
  handleAsyncError,
  withErrorHandling
};