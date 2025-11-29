/**
 * 当前页面导出器模块
 * 处理当前网站 Cookie 的导出和复制功能
 */

import { Utils } from '../../utils/utils.js';
import { ExportErrorHandler } from './errorHandler.js';

/**
 * 导出当前网站的 Cookies
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
function exportCurrentCookies(
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
  console.log('[CurrentExporter] exportCurrentCookies called with button:', button);
  // 获取当前活动标签页
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log('[CurrentExporter] tabs query result:', tabs);
    if (chrome.runtime.lastError) {
      console.error('[CurrentExporter] Tab query error:', chrome.runtime.lastError);
      // 显示网络错误
      ExportErrorHandler.handleTabQueryError(chrome.runtime.lastError, getResultDiv);
      return;
    }
    
    const currentTab = tabs[0];
    if (!currentTab || !currentTab.url) {
      console.warn('[CurrentExporter] Invalid tab or URL');
      // 显示网络错误
      ExportErrorHandler.handleInvalidTabError(getResultDiv);
      return;
    }
    
    console.log('[CurrentExporter] Valid tab found:', currentTab.url);
    const domain = Utils.getDomain(currentTab.url);
    const filename = `cookies-${domain}`;
    console.log('[CurrentExporter] Domain:', domain, 'Filename:', filename);
    
    const filters = getFilters();
    console.log('[CurrentExporter] Filters:', filters);
    
    console.log('[CurrentExporter] Calling handleExport for export current cookies');
    handleExport(
      {
        action: "exportCookies",
        url: currentTab.url,
        filters: filters
      },
      button,
      chrome.i18n.getMessage("exportCurrent"),
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
  });
}

/**
 * 复制当前网站的 Cookies 到剪贴板
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
function copyCurrentCookies(
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
  console.log('[CurrentExporter] copyCurrentCookies called with button:', button);
  // 获取当前活动标签页
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log('[CurrentExporter] tabs query result for copy:', tabs);
    if (chrome.runtime.lastError) {
      console.error('[CurrentExporter] Tab query error for copy:', chrome.runtime.lastError);
      // 显示网络错误
      ExportErrorHandler.handleTabQueryError(chrome.runtime.lastError, getResultDiv);
      return;
    }
    
    const currentTab = tabs[0];
    if (!currentTab || !currentTab.url) {
      console.warn('[CurrentExporter] Invalid tab or URL for copy');
      // 显示网络错误
      ExportErrorHandler.handleInvalidTabError(getResultDiv);
      return;
    }
    
    console.log('[CurrentExporter] Valid tab found for copy:', currentTab.url);
    
    const filters = getFilters();
    console.log('[CurrentExporter] Filters for copy:', filters);
    
    console.log('[CurrentExporter] Calling handleExport for copy current cookies');
    handleExport(
      {
        action: "exportCookies",
        url: currentTab.url,
        filters: filters
      },
      button,
      chrome.i18n.getMessage("copyCurrent"),
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
  });
}

export const CurrentExporter = {
  exportCurrentCookies,
  copyCurrentCookies
};
