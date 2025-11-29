/**
 * 错误处理使用示例
 * 展示如何在项目中使用新的错误处理系统
 */

import { ErrorHandler } from './ErrorHandler.js';
import { ErrorLogger } from './ErrorLogger.js';
import { ErrorDisplay } from './ErrorDisplay.js';

// 示例1: 同步错误处理
function exampleSyncFunction() {
  try {
    // 可能出错的代码
    throw new Error('这是一个同步错误示例');
  } catch (error) {
    // 使用错误处理器记录错误
    ErrorHandler.handleError(error, 'exampleSyncFunction', { 
      userId: '12345',
      action: '数据处理' 
    });
    
    // 记录到日志系统
    ErrorLogger.logError('sync', 'exampleSyncFunction', error.message, {
      userId: '12345',
      stack: error.stack
    });
    
    // 抛出错误供上层处理
    throw error;
  }
}

// 示例2: 异步错误处理
async function exampleAsyncFunction() {
  try {
    // 模拟异步操作
    await new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('这是一个异步错误示例')), 1000);
    });
  } catch (error) {
    // 使用异步错误处理器
    await ErrorHandler.handleAsyncError(
      Promise.reject(error), 
      'exampleAsyncFunction', 
      { operation: '异步数据获取' }
    );
    
    // 记录到日志系统
    ErrorLogger.logError('async', 'exampleAsyncFunction', error.message, {
      operation: '异步数据获取',
      stack: error.stack
    });
    
    throw error;
  }
}

// 示例3: 使用错误处理装饰器
const processData = ErrorHandler.withErrorHandling((data) => {
  if (!data) {
    throw new Error('数据不能为空');
  }
  
  // 处理数据的逻辑
  return data.toUpperCase();
}, 'processData');

// 示例4: 显示错误到UI
function displayErrorToUser(error, resultDiv) {
  ErrorDisplay.displayError(error, resultDiv, {
    prefix: '操作失败'
  });
}

// 示例5: 记录警告信息
function exampleWarning() {
  ErrorLogger.logWarning('validation', 'dataValidation', '数据格式不规范', {
    field: 'email',
    value: 'invalid-email'
  });
}

export const ErrorHandlingExample = {
  exampleSyncFunction,
  exampleAsyncFunction,
  processData,
  displayErrorToUser,
  exampleWarning
};