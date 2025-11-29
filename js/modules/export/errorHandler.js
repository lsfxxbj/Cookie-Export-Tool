/**
 * 导出模块错误处理工具
 * 提供导出功能中通用的错误处理逻辑
 */

import { ErrorLogger, ErrorDisplay, ErrorHandler } from '../errors/index.js';
import { I18n } from '../i18n/index.js';

/**
 * 处理标签页查询错误
 * @param {Object} error - Chrome API 返回的错误对象
 * @param {Function} getResultDiv - 获取结果区域的函数
 */
function handleTabQueryError(error, getResultDiv) {
  console.log('[ExportErrorHandler] handleTabQueryError called with:', error);
  const resultDiv = getResultDiv();
  console.log('[ExportErrorHandler] Result div for tab query error:', resultDiv);
  if (resultDiv) {
    console.log('[ExportErrorHandler] Displaying network error for tab query');
    ErrorDisplay.displayNetworkError(I18n.getMessage("获取当前标签页"), error.message, resultDiv);
    console.log('[ExportErrorHandler] Network error displayed for tab query');
  }
}

/**
 * 处理无效标签页错误
 * @param {Function} getResultDiv - 获取结果区域的函数
 */
function handleInvalidTabError(getResultDiv) {
  console.log('[ExportErrorHandler] handleInvalidTabError called');
  const resultDiv = getResultDiv();
  console.log('[ExportErrorHandler] Result div for invalid tab error:', resultDiv);
  if (resultDiv) {
    console.log('[ExportErrorHandler] Displaying network error for invalid tab');
    ErrorDisplay.displayNetworkError(I18n.getMessage("获取当前网站URL"), I18n.getMessage("无法获取当前页面URL"), resultDiv);
    console.log('[ExportErrorHandler] Network error displayed for invalid tab');
  }
}

/**
 * 处理导出过程中的通用错误
 * @param {string} error - 错误信息
 * @param {Function} getResultDiv - 获取结果区域的函数
 * @param {string} action - 操作类型
 * @param {string} url - URL信息（可选）
 */
function handleExportError(error, getResultDiv, action, url) {
  console.log('[ExportErrorHandler] handleExportError called with:', { error, action, url });
  const resultDiv = getResultDiv();
  console.log('[ExportErrorHandler] Result div for export error:', resultDiv);
  if (resultDiv) {
    console.log('[ExportErrorHandler] Displaying network error for export');
    // 显示错误信息
    ErrorDisplay.displayNetworkError(I18n.getMessage("导出Cookie"), error, resultDiv);
    console.log('[ExportErrorHandler] Network error displayed for export');
  }
}

/**
 * 处理复制到剪贴板错误
 * @param {Object} error - 错误对象
 * @param {Function} getResultDiv - 获取结果区域的函数
 */
function handleCopyToClipboardError(error, getResultDiv) {
  console.log('[ExportErrorHandler] handleCopyToClipboardError called with:', error);
  const resultDiv = getResultDiv();
  console.log('[ExportErrorHandler] Result div for clipboard error:', resultDiv);
  if (resultDiv) {
    console.log('[ExportErrorHandler] Displaying network error for clipboard');
    // 显示错误信息
    ErrorDisplay.displayNetworkError(I18n.getMessage("复制到剪贴板"), error.message, resultDiv);
    console.log('[ExportErrorHandler] Network error displayed for clipboard');
  }
}

/**
 * 处理没有找到Cookie的情况
 * @param {Function} getResultDiv - 获取结果区域的函数
 */
function handleNoCookiesFound(getResultDiv) {
  console.log('[ExportErrorHandler] handleNoCookiesFound called');
  const resultDiv = getResultDiv();
  console.log('[ExportErrorHandler] Result div for no cookies found:', resultDiv);
  if (resultDiv) {
    console.log('[ExportErrorHandler] Displaying no cookies found message');
    // 清除任何现有的动画效果
    resultDiv.style.animation = 'none';
    resultDiv.offsetHeight; // 触发重排
    
    // 显示提示信息（不是错误）
    resultDiv.textContent = I18n.getMessage("noCookiesFound");
    resultDiv.className = 'result success visible';
    
    // 添加成功动画
    resultDiv.style.animation = 'fadeInOut 3s forwards';
    console.log('[ExportErrorHandler] No cookies found message displayed');
    
    // 添加自动隐藏功能
    setTimeout(() => {
      if (resultDiv.classList.contains('visible')) {
        resultDiv.classList.remove('visible');
        console.log('[ExportErrorHandler] No cookies found message hidden');
      }
    }, 1000);
  }
}

export const ExportErrorHandler = {
  handleTabQueryError,
  handleInvalidTabError,
  handleExportError,
  handleCopyToClipboardError,
  handleNoCookiesFound
};