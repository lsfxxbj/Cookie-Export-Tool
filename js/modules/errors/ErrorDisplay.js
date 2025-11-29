/**
 * 错误显示模块
 * 提供统一的错误显示功能
 */

import { ErrorHandler } from './ErrorHandler.js';

/**
 * 显示错误信息
 * @param {string|Error} error - 错误消息或错误对象
 * @param {HTMLElement} resultDiv - 结果显示元素
 * @param {Object} options - 显示选项
 */
function displayError(error, resultDiv, options = {}) {
  const defaultMessage = '发生未知错误';
  let errorMessage = defaultMessage;
  
  // 处理不同类型的错误输入
  if (typeof error === 'string') {
    errorMessage = error;
  } else if (error instanceof Error) {
    errorMessage = error.message || defaultMessage;
  } else if (error && typeof error === 'object') {
    // 避免显示 '[object Object]'
    try {
      errorMessage = JSON.stringify(error, null, 2);
    } catch (stringifyError) {
      errorMessage = String(error);
    }
  } else {
    errorMessage = String(error);
  }
  
  // 构造显示内容
  let displayContent = errorMessage;
  
  // 添加自定义前缀
  if (options.prefix) {
    displayContent = `${options.prefix}: ${displayContent}`;
  }
  
  // 清除任何现有的动画效果
  resultDiv.style.animation = 'none';
  resultDiv.offsetHeight; // 触发重排
  
  // 替换换行符
  resultDiv.innerHTML = displayContent.replace(/\n/g, '<br>');
  resultDiv.className = 'result error visible';
  
  // 添加错误动画
  resultDiv.style.animation = 'shake 0.5s';
  
  // 使用 ErrorHandler 统一记录错误
  ErrorHandler.handleError(new Error(displayContent), 'ErrorDisplay.displayError', {
    originalError: error
  });
}

/**
 * 显示网络错误
 * @param {string} operation - 操作名称
 * @param {string} details - 错误详情
 * @param {HTMLElement} resultDiv - 结果显示元素
 */
function displayNetworkError(operation, details, resultDiv) {
  const errorMessage = `网络错误：无法${operation}`;
  const errorDetails = [
    "请检查网络连接是否正常",
    "确认目标网站可以正常访问",
    "如果问题持续存在，请稍后再试"
  ];
  
  if (details) {
    errorDetails.push(`详细信息: ${details}`);
  }
  
  const fullMessage = errorMessage + '\n' + errorDetails.join('\n');
  
  // 清除任何现有的动画效果
  resultDiv.style.animation = 'none';
  resultDiv.offsetHeight; // 触发重排
  
  resultDiv.innerHTML = fullMessage.replace(/\n/g, '<br>');
  resultDiv.className = 'result error visible';
  
  // 添加错误动画
  resultDiv.style.animation = 'shake 0.5s';
}

/**
 * 显示文件错误
 * @param {string} operation - 操作名称
 * @param {string} details - 错误详情
 * @param {HTMLElement} resultDiv - 结果显示元素
 */
function displayFileError(operation, details, resultDiv) {
  const errorMessage = `文件错误：无法${operation}`;
  const errorDetails = [
    "请检查文件是否损坏",
    "确认文件格式是否正确",
    "尝试重新选择文件"
  ];
  
  if (details) {
    errorDetails.push(`详细信息: ${details}`);
  }
  
  const fullMessage = errorMessage + '\n' + errorDetails.join('\n');
  
  // 清除任何现有的动画效果
  resultDiv.style.animation = 'none';
  resultDiv.offsetHeight; // 触发重排
  
  resultDiv.innerHTML = fullMessage.replace(/\n/g, '<br>');
  resultDiv.className = 'result error visible';
  
  // 添加错误动画
  resultDiv.style.animation = 'shake 0.5s';
}

/**
 * 显示格式错误
 * @param {string} format - 格式类型
 * @param {string} details - 错误详情
 * @param {HTMLElement} resultDiv - 结果显示元素
 */
function displayFormatError(format, details, resultDiv) {
  const errorMessage = `格式错误：${format}格式不正确`;
  const errorDetails = [
    "请检查文件内容是否符合格式要求",
    "确认文件没有被损坏",
    "参考示例文件格式进行调整"
  ];
  
  if (details) {
    errorDetails.push(`详细信息: ${details}`);
  }
  
  const fullMessage = errorMessage + '\n' + errorDetails.join('\n');
  
  // 清除任何现有的动画效果
  resultDiv.style.animation = 'none';
  resultDiv.offsetHeight; // 触发重排
  
  resultDiv.innerHTML = fullMessage.replace(/\n/g, '<br>');
  resultDiv.className = 'result error visible';
  
  // 添加错误动画
  resultDiv.style.animation = 'shake 0.5s';
}

export const ErrorDisplay = {
  displayError,
  displayNetworkError,
  displayFileError,
  displayFormatError
};