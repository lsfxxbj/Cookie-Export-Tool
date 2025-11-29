/**
 * 全部 Cookie 导出器模块
 * 处理所有 Cookie 的导出和复制功能
 */

import { ExportErrorHandler } from './errorHandler.js';

/**
 * 导出所有 Cookies
 * @param {Function} handleExport - 处理导出的函数
 * @param {HTMLElement} button - 导出按钮
 * @param {Function} getFilters - 获取过滤条件的函数
 * @param {Function} getExportFormat - 获取导出格式的函数
 * @param {Function} showLoading - 显示加载状态的函数
 * @param {Function} updateProgress - 更新进度条的函数
 * @param {Function} showError - 显示错误信息的函数
 * @param {Function} showResult - 显示结果信息的函数
 * @param {Function} downloadFile - 下载文件的函数
 * @param {Function} updateCookieCount - 更新 Cookie 计数的函数
 * @param {Function} getResultDiv - 获取结果区域的函数
 * @param {Object} uiManager - UI 管理器
 */
function exportAllCookies(
  handleExport,
  button,
  getFilters,
  getExportFormat,
  showLoading,
  updateProgress,
  showError,
  showResult,
  downloadFile,
  updateCookieCount,
  getResultDiv,
  uiManager
) {
  console.log('[AllExporter] exportAllCookies called with button:', button);
  const filename = 'cookies-all-sites';
  console.log('[AllExporter] Filename set to:', filename);
  
  const filters = getFilters();
  console.log('[AllExporter] Filters:', filters);
  
  console.log('[AllExporter] Calling handleExport for export all cookies');
  handleExport(
    {
      action: "exportAllCookies",
      filters: filters
    },
    button,
    chrome.i18n.getMessage("exportAll"),
    filename,
    true, // shouldDownload
    getExportFormat,
    showLoading,
    updateProgress,
    showError,
    showResult,
    downloadFile,
    updateCookieCount,
    getResultDiv,
    uiManager
  );
}

/**
 * 复制所有 Cookies 到剪贴板
 * @param {Function} handleExport - 处理导出的函数
 * @param {HTMLElement} button - 复制按钮
 * @param {Function} getFilters - 获取过滤条件的函数
 * @param {Function} getExportFormat - 获取导出格式的函数
 * @param {Function} showLoading - 显示加载状态的函数
 * @param {Function} updateProgress - 更新进度条的函数
 * @param {Function} showError - 显示错误信息的函数
 * @param {Function} showResult - 显示结果信息的函数
 * @param {Function} downloadFile - 下载文件的函数
 * @param {Function} updateCookieCount - 更新 Cookie 计数的函数
 * @param {Function} getResultDiv - 获取结果区域的函数
 * @param {Object} uiManager - UI 管理器
 */
function copyAllCookies(
  handleExport,
  button,
  getFilters,
  getExportFormat,
  showLoading,
  updateProgress,
  showError,
  showResult,
  downloadFile,
  updateCookieCount,
  getResultDiv,
  uiManager
) {
  console.log('[AllExporter] copyAllCookies called with button:', button);
  
  const filters = getFilters();
  console.log('[AllExporter] Filters for copy:', filters);
  
  console.log('[AllExporter] Calling handleExport for copy all cookies');
  handleExport(
    {
      action: "exportAllCookies",
      filters: filters
    },
    button,
    chrome.i18n.getMessage("copyAll"),
    '',
    false, // shouldDownload
    getExportFormat,
    showLoading,
    updateProgress,
    showError,
    showResult,
    downloadFile,
    updateCookieCount,
    getResultDiv,
    uiManager
  );
}

export const AllExporter = {
  exportAllCookies,
  copyAllCookies
};
