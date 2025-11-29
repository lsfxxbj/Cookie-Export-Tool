/**
 * 导入管理模块
 * 处理 Cookie 导入相关功能
 */

import { Utils } from '../utils/utils.js';
import { ErrorLogger, ErrorDisplay, ErrorHandler } from '../modules/errors/index.js';
import { I18n } from '../modules/i18n/index.js';
import { DOMManager } from './domManager.js';

// 存储最近一次导入操作的时间戳，用于防止重复点击
const lastImportTimes = new Map();

/**
 * 导入 Cookies
 * @param {File} file - 要导入的文件
 * @param {HTMLElement} triggerButton - 触发导入的按钮元素
 * @param {HTMLElement} importProgress - 导入进度条元素
 * @param {Function} updateProgress - 更新进度条的函数
 * @param {Function} updateCookieCount - 更新 Cookie 计数的函数
 * @param {Function} showResult - 显示结果信息的函数
 * @param {Function} showError - 显示错误信息的函数
 * @param {Object} uiManager - UI 管理器
 * @param {HTMLInputElement} fileInput - 文件输入元素
 */
function importCookies(file, triggerButton, importProgress, updateProgress, updateCookieCount, showResult, showError, uiManager, fileInput) {
  console.log('[ImportManager] importCookies called with file:', file);
  const getResultDiv = DOMManager.getResultDiv;
  
  // 检查文件是否存在
  if (!file) {
    console.warn('[ImportManager] No file selected for import');
    const resultDiv = getResultDiv();
    if (resultDiv) showError(I18n.getMessage("selectFileError"), null, resultDiv);
    return;
  }
  
  // 自动识别文件格式
  const format = Utils.detectFileFormat(file.name);
  console.log('[ImportManager] Detected file format:', format);
  const reader = new FileReader();
  
  // 记录进度条初始状态
  const initialProgressBar = importProgress.querySelector('.progress-bar');
  const initialProgressText = importProgress.querySelector('.progress-text');
  console.log('[ImportManager] Initial progress bar state - width:', initialProgressBar ? initialProgressBar.style.width : 'N/A');
  console.log('[ImportManager] Initial progress text state - content:', initialProgressText ? initialProgressText.textContent : 'N/A');
  
  // 重置进度条到初始状态
  if (importProgress && uiManager) {
    uiManager.resetProgress(importProgress);
    console.log('[ImportManager] Reset import progress to initial state');
  }
  
  // 注意：showLoading 由调用方通过参数传递，不需要在这里重复调用
  triggerButton.disabled = true;
  triggerButton.textContent = I18n.getMessage("importing");
  console.log('[ImportManager] Disabled button and set text to importing');
  
  // 检查是否是重复点击（3秒内）
  const buttonId = triggerButton.id;
  const now = Date.now();
  const lastImportTime = lastImportTimes.get(buttonId);
  
  if (lastImportTime && (now - lastImportTime) < 3000) {
    console.log('[ImportManager] Preventing duplicate import, time since last import:', now - lastImportTime, 'ms');
    const resultDiv = getResultDiv();
    if (resultDiv) {
      // 直接设置防重复提示信息，避免动画冲突
      resultDiv.textContent = I18n.getMessage("importInProgress");
      resultDiv.className = 'result error visible';
      
      // 更彻底地清除任何现有的动画效果并触发重排
      resultDiv.style.animation = 'none';
      resultDiv.offsetHeight; // 触发重排
      
      // 延迟一小段时间再应用动画，确保重排完成
      setTimeout(() => {
        resultDiv.style.animation = 'shake 0.5s';
        console.log('[ImportManager] Applied shake animation to duplicate import warning');
      }, 10);
      
      console.log('[ImportManager] Showed duplicate import warning message');
      
      // 2秒后隐藏提示信息
      setTimeout(() => {
        if (resultDiv) {
          resultDiv.classList.remove('visible');
          console.log('[ImportManager] Hidden duplicate import warning message');
        }
      }, 1000); // 将2秒改为1秒，与其他UI反馈保持一致
    }
    return;
  }
  
  // 记录本次导入时间
  lastImportTimes.set(buttonId, now);
  console.log('[ImportManager] Recorded import time for button:', buttonId);
  
  // 显示导入进度条
  if (importProgress) {
    updateProgress(importProgress, 0);
    console.log('[ImportManager] Updated import progress to 0% and made progress visible');
  }
  
  reader.onload = function(e) {
    const content = e.target.result;
    console.log('[ImportManager] File content loaded, size:', content.length);
    
    // 更新进度到50%
    updateProgress(importProgress, 50);
    console.log('[ImportManager] Updated import progress to 50%');
    
    // 发送消息到后台脚本以导入 cookies
    console.log('[ImportManager] Sending import message to background');
    chrome.runtime.sendMessage({
      action: "importCookies",
      data: content,
      format: format
    }, function(response) {
      console.log('[ImportManager] Received response from background:', response);
      triggerButton.disabled = false;
      triggerButton.textContent = I18n.getMessage("importCookies");
      console.log('[ImportManager] Re-enabled button and restored text');
      
      if (response.error) {
        console.error('[ImportManager] Import failed:', response.error);
        // 根据错误类型显示不同的错误信息
        if (response.error.includes("网络")) {
          // 显示网络错误
          const resultDiv = getResultDiv();
          console.log('[ImportManager] Displaying network error, resultDiv:', resultDiv);
          if (resultDiv) ErrorDisplay.displayNetworkError("导入Cookie", response.error, resultDiv);
        } else if (response.error.includes("文件")) {
          // 显示文件错误
          const resultDiv = getResultDiv();
          console.log('[ImportManager] Displaying file error, resultDiv:', resultDiv);
          if (resultDiv) ErrorDisplay.displayFileError("导入Cookie", response.error, resultDiv);
        } else if (response.error.includes("格式")) {
          // 显示格式错误
          const resultDiv = getResultDiv();
          console.log('[ImportManager] Displaying format error, resultDiv:', resultDiv);
          if (resultDiv) ErrorDisplay.displayFormatError(format, response.error, resultDiv);
        } else {
          // 显示通用错误
          const resultDiv = getResultDiv();
          console.log('[ImportManager] Displaying general error, resultDiv:', resultDiv);
          if (resultDiv) showError(I18n.getMessage("importFailed"), response.error, resultDiv);
        }
        
        // 使用统一的错误处理机制
        ErrorHandler.handleError(new Error(response.error), 'importManager.importCookies', {
          format: format,
          fileSize: content.length
        });
        
        // 记录错误日志
        ErrorLogger.logError('import', '导入Cookie', response.error);
      } else {
        console.log('[ImportManager] Import successful, cookies count:', response.count);
        // 更新进度到100%
        updateProgress(importProgress, 100);
        console.log('[ImportManager] Updated import progress to 100%');
        
        // 显示成功信息
        const resultDiv = getResultDiv();
        console.log('[ImportManager] Displaying success message, resultDiv:', resultDiv);
        if (resultDiv) showResult(I18n.formatMessage("importSuccess", { count: response.count }), 'success', resultDiv);
        
        // 清空文件输入框
        if (fileInput) {
          fileInput.value = '';
          console.log('[ImportManager] Cleared file input');
        }
        
        // 更新 Cookie 计数
        updateCookieCount();
        console.log('[ImportManager] Updated cookie count');
        
        // 隐藏进度条
        console.log('[ImportManager] Setting timeout to hide import progress');
        setTimeout(() => {
          importProgress.classList.remove('visible');
          console.log('[ImportManager] Removed visible class from import progress');
        }, 1000);
      }
    });
  };
  
  reader.onerror = function(e) {
    console.error('[ImportManager] File reading error:', e);
    triggerButton.disabled = false;
    triggerButton.textContent = I18n.getMessage("importCookies");
    console.log('[ImportManager] Re-enabled button and restored text after file read error');
    
    const resultDiv = getResultDiv();
    console.log('[ImportManager] Displaying file read error, resultDiv:', resultDiv);
    if (resultDiv) showError(I18n.getMessage("fileReadError"), null, resultDiv);
    
    // 使用统一的错误处理机制
    ErrorHandler.handleError(new Error('文件读取失败'), 'importManager.importCookies', {
      fileName: file.name,
      fileSize: file.size
    });
    
    // 记录错误日志
    ErrorLogger.logError('file', '读取文件', '文件读取失败');
    
    // 隐藏进度条
    importProgress.classList.remove('visible');
    console.log('[ImportManager] Removed visible class from import progress after file read error');
  };
  
  // 读取文件内容
  console.log('[ImportManager] Reading file:', file.name);
  reader.readAsText(file, 'UTF-8');
}

export const ImportManager = {
  importCookies
};