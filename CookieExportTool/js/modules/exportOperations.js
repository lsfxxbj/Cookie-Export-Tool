/**
 * 导出操作模块
 * 负责处理所有导出相关的操作
 */

import { ExportManager } from './exportManager.js';
import { FilterManager } from './filterManager.js';
import { UIManager } from '../ui/uiManager.js';
import { I18n } from './i18n/index.js';
import { DOMManager } from './domManager.js';
import { CookieCounter } from './cookieCounter.js';
import { DownloadManager } from './downloadManager.js';

/**
 * 导出当前网站的 Cookies
 * @param {HTMLElement} button - 触发导出的按钮元素
 * @param {HTMLElement} formatSelect - 格式选择元素
 * @param {HTMLElement} cookieTypeSelect - Cookie 类型选择元素
 * @param {HTMLElement} exportProgress - 导出进度条元素
 * @param {HTMLElement} cookieCount - Cookie 计数显示元素
 */
function exportCurrentCookies(button, formatSelect, cookieTypeSelect, exportProgress, cookieCount) {
  console.log('[ExportOperations] exportCurrentCookies called with button:', button);
  // 缓存常用的DOM查询结果
  const getResultDiv = DOMManager.getResultDiv;
  console.log('[ExportOperations] Got getResultDiv function');
  
  ExportManager.exportCurrentCookies(
    ExportManager.handleExport,
    button,
    () => FilterManager.getFilters(cookieTypeSelect),
    () => FilterManager.getExportFormat(formatSelect),
    () => {
      const resultDiv = getResultDiv();
      console.log('[ExportOperations] showLoading called for export current, resultDiv:', resultDiv);
      if (resultDiv) {
        UIManager.showLoading(I18n.getMessage("exportCurrentLoading"), resultDiv);
        console.log('[ExportOperations] Loading message displayed for export current');
      } else {
        console.warn('[ExportOperations] Could not find result div for export current loading message');
      }
    },
    UIManager.updateProgress,
    function(message, details) {
      const resultDiv = getResultDiv();
      console.log('[ExportOperations] showError called for export current, resultDiv:', resultDiv);
      if (resultDiv) {
        UIManager.showError(message, details, resultDiv);
        console.log('[ExportOperations] Error message displayed for export current');
      } else {
        console.warn('[ExportOperations] Could not find result div for export current error message');
      }
    },
    function(message, type) {
      const resultDiv = getResultDiv();
      console.log('[ExportOperations] showResult called for export current, resultDiv:', resultDiv);
      if (resultDiv) {
        UIManager.showResult(message, type, resultDiv);
        console.log('[ExportOperations] Result message displayed for export current:', message, 'type:', type);
      } else {
        console.warn('[ExportOperations] Could not find result div for export current result message');
      }
    },
    function(content, filename, format, errorCallback) {
      console.log('[ExportOperations] DownloadManager.downloadFile called for export current');
      console.log('[ExportOperations] Content length:', content ? content.length : 0, 'Filename:', filename, 'Format:', format);
      DownloadManager.downloadFile(content, filename, format, errorCallback);
      console.log('[ExportOperations] DownloadManager.downloadFile completed for export current');
    },
    () => CookieCounter.updateCookieCount(cookieCount),
    getResultDiv,
    UIManager
  );
}

/**
 * 导出所有 Cookies
 * @param {HTMLElement} button - 触发导出的按钮元素
 * @param {HTMLElement} formatSelect - 格式选择元素
 * @param {HTMLElement} cookieTypeSelect - Cookie 类型选择元素
 * @param {HTMLElement} exportProgress - 导出进度条元素
 * @param {HTMLElement} cookieCount - Cookie 计数显示元素
 */
function exportAllCookies(button, formatSelect, cookieTypeSelect, exportProgress, cookieCount) {
  console.log('[ExportOperations] exportAllCookies called with button:', button);
  // 缓存常用的DOM查询结果
  const getResultDiv = DOMManager.getResultDiv;
  console.log('[ExportOperations] Got getResultDiv function');
  
  ExportManager.exportAllCookies(
    ExportManager.handleExport,
    button,
    () => FilterManager.getFilters(cookieTypeSelect),
    () => FilterManager.getExportFormat(formatSelect),
    () => {
      const resultDiv = getResultDiv();
      console.log('[ExportOperations] showLoading called for export all, resultDiv:', resultDiv);
      if (resultDiv) {
        UIManager.showLoading(I18n.getMessage("exportAllLoading"), resultDiv);
        console.log('[ExportOperations] Loading message displayed for export all');
      } else {
        console.warn('[ExportOperations] Could not find result div for export all loading message');
      }
    },
    UIManager.updateProgress,
    function(message, details) {
      const resultDiv = getResultDiv();
      console.log('[ExportOperations] showError called for export all, resultDiv:', resultDiv);
      if (resultDiv) {
        UIManager.showError(message, details, resultDiv);
        console.log('[ExportOperations] Error message displayed for export all');
      } else {
        console.warn('[ExportOperations] Could not find result div for export all error message');
      }
    },
    function(message, type) {
      const resultDiv = getResultDiv();
      console.log('[ExportOperations] showResult called for export all, resultDiv:', resultDiv);
      if (resultDiv) {
        UIManager.showResult(message, type, resultDiv);
        console.log('[ExportOperations] Result message displayed for export all:', message, 'type:', type);
      } else {
        console.warn('[ExportOperations] Could not find result div for export all result message');
      }
    },
    function(content, filename, format, errorCallback) {
      console.log('[ExportOperations] DownloadManager.downloadFile called for export all');
      console.log('[ExportOperations] Content length:', content ? content.length : 0, 'Filename:', filename, 'Format:', format);
      DownloadManager.downloadFile(content, filename, format, errorCallback);
      console.log('[ExportOperations] DownloadManager.downloadFile completed for export all');
    },
    () => CookieCounter.updateCookieCount(cookieCount),
    getResultDiv,
    UIManager
  );
}

/**
 * 复制当前网站的 Cookies 到剪贴板
 * @param {HTMLElement} button - 触发复制的按钮元素
 * @param {HTMLElement} formatSelect - 格式选择元素
 * @param {HTMLElement} cookieTypeSelect - Cookie 类型选择元素
 * @param {HTMLElement} exportProgress - 导出进度条元素
 * @param {HTMLElement} cookieCount - Cookie 计数显示元素
 */
function copyCurrentCookies(button, formatSelect, cookieTypeSelect, exportProgress, cookieCount) {
  console.log('[ExportOperations] copyCurrentCookies called with button:', button);
  // 缓存常用的DOM查询结果
  const getResultDiv = DOMManager.getResultDiv;
  console.log('[ExportOperations] Got getResultDiv function');
  
  ExportManager.copyCurrentCookies(
    ExportManager.handleExport,
    button,
    () => FilterManager.getFilters(cookieTypeSelect),
    () => FilterManager.getExportFormat(formatSelect),
    () => {
      const resultDiv = getResultDiv();
      console.log('[ExportOperations] showLoading called for copy current, resultDiv:', resultDiv);
      if (resultDiv) {
        UIManager.showLoading(I18n.getMessage("exporting"), resultDiv);
        console.log('[ExportOperations] Loading message displayed for copy current');
      } else {
        console.warn('[ExportOperations] Could not find result div for copy current loading message');
      }
    },
    UIManager.updateProgress,
    function(message, details) {
      const resultDiv = getResultDiv();
      console.log('[ExportOperations] showError called for copy current, resultDiv:', resultDiv);
      if (resultDiv) {
        UIManager.showError(message, details, resultDiv);
        console.log('[ExportOperations] Error message displayed for copy current');
      } else {
        console.warn('[ExportOperations] Could not find result div for copy current error message');
      }
    },
    function(message, type) {
      const resultDiv = getResultDiv();
      console.log('[ExportOperations] showResult called for copy current, resultDiv:', resultDiv);
      if (resultDiv) {
        UIManager.showResult(message, type, resultDiv);
        console.log('[ExportOperations] Result message displayed for copy current:', message, 'type:', type);
      } else {
        console.warn('[ExportOperations] Could not find result div for copy current result message');
      }
    },
    DownloadManager.downloadFile,
    () => CookieCounter.updateCookieCount(cookieCount),
    getResultDiv,
    UIManager
  );
}

/**
 * 复制所有 Cookies 到剪贴板
 * @param {HTMLElement} button - 触发复制的按钮元素
 * @param {HTMLElement} formatSelect - 格式选择元素
 * @param {HTMLElement} cookieTypeSelect - Cookie 类型选择元素
 * @param {HTMLElement} exportProgress - 导出进度条元素
 * @param {HTMLElement} cookieCount - Cookie 计数显示元素
 */
function copyAllCookies(button, formatSelect, cookieTypeSelect, exportProgress, cookieCount) {
  console.log('[ExportOperations] copyAllCookies called with button:', button);
  // 缓存常用的DOM查询结果
  const getResultDiv = DOMManager.getResultDiv;
  console.log('[ExportOperations] Got getResultDiv function');
  
  ExportManager.copyAllCookies(
    ExportManager.handleExport,
    button,
    () => FilterManager.getFilters(cookieTypeSelect),
    () => FilterManager.getExportFormat(formatSelect),
    () => {
      const resultDiv = getResultDiv();
      console.log('[ExportOperations] showLoading called for copy all, resultDiv:', resultDiv);
      if (resultDiv) {
        UIManager.showLoading(I18n.getMessage("exporting"), resultDiv);
        console.log('[ExportOperations] Loading message displayed for copy all');
      } else {
        console.warn('[ExportOperations] Could not find result div for copy all loading message');
      }
    },
    UIManager.updateProgress,
    function(message, details) {
      const resultDiv = getResultDiv();
      console.log('[ExportOperations] showError called for copy all, resultDiv:', resultDiv);
      if (resultDiv) {
        UIManager.showError(message, details, resultDiv);
        console.log('[ExportOperations] Error message displayed for copy all');
      } else {
        console.warn('[ExportOperations] Could not find result div for copy all error message');
      }
    },
    function(message, type) {
      const resultDiv = getResultDiv();
      console.log('[ExportOperations] showResult called for copy all, resultDiv:', resultDiv);
      if (resultDiv) {
        UIManager.showResult(message, type, resultDiv);
        console.log('[ExportOperations] Result message displayed for copy all:', message, 'type:', type);
      } else {
        console.warn('[ExportOperations] Could not find result div for copy all result message');
      }
    },
    DownloadManager.downloadFile,
    () => CookieCounter.updateCookieCount(cookieCount),
    getResultDiv,
    UIManager
  );
}

export const ExportOperations = {
  exportCurrentCookies,
  exportAllCookies,
  copyCurrentCookies,
  copyAllCookies
};
