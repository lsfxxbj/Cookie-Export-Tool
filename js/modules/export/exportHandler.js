/**
 * 导出处理器模块
 * 处理 Cookie 导出相关功能
 */

import { Utils } from '../../utils/utils.js';
import { ErrorLogger, ErrorDisplay, ErrorHandler } from '../../modules/errors/index.js';
import { ExportErrorHandler } from './errorHandler.js';
import { I18n } from '../../modules/i18n/index.js';

// 存储最近一次导出操作的时间戳，用于防止重复点击
const lastExportTimes = new Map();

/**
 * 通用的导出处理函数
 * 处理所有导出和复制操作，根据参数决定是下载文件还是复制到剪贴板
 * 
 * @param {Object} sendMessageParams - 发送到后台的消息参数
 * @param {HTMLElement} button - 触发导出的按钮元素，用于状态更新
 * @param {string} defaultText - 按钮默认文本
 * @param {string} filename - 下载文件名（仅在下载时使用）
 * @param {boolean} shouldDownload - 是否下载文件，false表示复制到剪贴板
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
function handleExport(
  sendMessageParams, 
  button, 
  defaultText, 
  filename, 
  shouldDownload,
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
  console.log('[ExportHandler] handleExport called with:', { sendMessageParams, button, defaultText, filename, shouldDownload });
  
  // 检查是否是重复点击（3秒内）
  const buttonId = button.id;
  const now = Date.now();
  const lastExportTime = lastExportTimes.get(buttonId);
  
  if (lastExportTime && (now - lastExportTime) < 3000) {
    console.log('[ExportHandler] Preventing duplicate export, time since last export:', now - lastExportTime, 'ms');
    const resultDiv = getResultDiv();
    if (resultDiv) {
      // 直接设置防重复提示信息，避免动画冲突
      resultDiv.textContent = I18n.getMessage("exportInProgress");
      resultDiv.className = 'result error visible';
      
      // 更彻底地清除任何现有的动画效果并触发重排
      resultDiv.style.animation = 'none';
      resultDiv.offsetHeight; // 触发重排
      
      // 延迟一小段时间再应用动画，确保重排完成
      setTimeout(() => {
        // 应用错误动画
        resultDiv.style.animation = 'shake 0.5s';
        console.log('[ExportHandler] Applied shake animation to duplicate export warning');
      }, 10);
      
      console.log('[ExportHandler] Showed duplicate export warning message');
      
      // 2秒后隐藏提示信息
      setTimeout(() => {
        if (resultDiv) {
          resultDiv.classList.remove('visible');
          console.log('[ExportHandler] Hidden duplicate export warning message');
        }
      }, 1000); // 将2秒改为1秒，与其他UI反馈保持一致
    }
    return;
  }
  
  // 记录本次导出时间
  lastExportTimes.set(buttonId, now);
  console.log('[ExportHandler] Recorded export time for button:', buttonId);
  
  // 显示加载状态和初始化UI
  const exportProgress = document.getElementById('export-progress');
  console.log('[ExportHandler] Found export progress element:', exportProgress);
  
  // 重置进度条到初始状态
  if (exportProgress && uiManager) {
    uiManager.resetProgress(exportProgress);
    console.log('[ExportHandler] Reset export progress to initial state');
  }
  
  // 记录进度条初始状态
  if (exportProgress) {
    const progressBar = exportProgress.querySelector('.progress-bar');
    const progressText = exportProgress.querySelector('.progress-text');
    console.log('[ExportHandler] Initial progress bar state - width:', progressBar ? progressBar.style.width : 'N/A');
    console.log('[ExportHandler] Initial progress text state - content:', progressText ? progressText.textContent : 'N/A');
  }
  
  // 注意：showLoading 由调用方通过参数传递，不需要在这里重复调用
  // 要用按钮并更新文本
  button.disabled = true;
  button.textContent = I18n.getMessage("exporting");
  console.log('[ExportHandler] Disabled button and set text to exporting');
  
  // 显示导出进度条
  if (exportProgress) {
    updateProgress(exportProgress, 0);
    console.log('[ExportHandler] Updated progress to 0% and made progress visible');
  }
  
  // 添加格式参数
  sendMessageParams.format = getExportFormat();
  console.log('[ExportHandler] Sending message to background:', sendMessageParams);
  
  // 发送消息到后台脚本以获取 cookies
  chrome.runtime.sendMessage(sendMessageParams, function(response) {
    console.log('[ExportHandler] Received response from background:', response);
    if (response.error) {
      // 清除导出时间记录，允许下次导出
      lastExportTimes.delete(buttonId);
      console.log('[ExportHandler] Cleared export time record due to error');
      
      // 使用专门的错误处理函数处理导出错误
      ExportErrorHandler.handleExportError(response.error, getResultDiv, sendMessageParams.action, sendMessageParams.url);
      // 记录错误日志
      ErrorLogger.logError('export', '导出Cookie', response.error);
      // 使用统一的错误处理机制
      ErrorHandler.handleError(new Error(response.error), 'exportHandler.handleExport', {
        action: sendMessageParams.action,
        url: sendMessageParams.url
      });
      // 隐藏进度条
      exportProgress.classList.remove('visible');
      console.log('[ExportHandler] Removed visible class from export progress due to error');
      // 恢复按钮状态
      button.disabled = false;
      button.textContent = defaultText;
      console.log('[ExportHandler] Re-enabled button and restored text after error');
    } else if (response.count === 0) {
      // 清除导出时间记录，允许下次导出
      lastExportTimes.delete(buttonId);
      console.log('[ExportHandler] Cleared export time record (no cookies found)');
      
      // 如果没有匹配的 cookies，显示提示信息（不是错误）
      console.log('[ExportHandler] No cookies found for export');
      ExportErrorHandler.handleNoCookiesFound(getResultDiv);
      // 隐藏进度条
      exportProgress.classList.remove('visible');
      console.log('[ExportHandler] Removed visible class from export progress (no cookies found)');
      // 恢复按钮状态
      button.disabled = false;
      button.textContent = defaultText;
      console.log('[ExportHandler] Re-enabled button and restored text (no cookies found)');
    } else {
      // 更新进度到50%
      updateProgress(exportProgress, 50);
      console.log('[ExportHandler] Updated progress to 50%');
      
      // 显示统计信息 - 根据具体操作显示不同的提示信息
      let statsInfo = '';
      if (sendMessageParams.action === "exportCookies" && !shouldDownload) {
        // 复制当前网站 cookies
        statsInfo = I18n.formatMessage("copyCurrentSuccess", { count: response.count });
      } else if (sendMessageParams.action === "exportAllCookies" && !shouldDownload) {
        // 复制所有 cookies
        statsInfo = I18n.formatMessage("copyAllSuccess", { count: response.count });
      } else if (sendMessageParams.action === "exportCookies" && shouldDownload) {
        // 导出当前网站 cookies
        statsInfo = I18n.formatMessage("exportCurrentSuccess", { count: response.count });
      } else if (sendMessageParams.action === "exportAllCookies" && shouldDownload) {
        // 导出所有 cookies
        statsInfo = I18n.formatMessage("exportAllSuccess", { count: response.count });
      } else {
        // 默认消息
        if (response.count !== undefined) {
          if (shouldDownload) {
            statsInfo = `${I18n.getMessage("exportSuccess")} ${response.count} 个 cookies`;
          } else {
            statsInfo = `${I18n.getMessage("copied")} ${response.count} 个 cookies`;
          }
        }
      }
      
      console.log('[ExportHandler] Stats info:', statsInfo);
      
      // 根据格式显示内容
      let content = '';
      switch (getExportFormat()) {
        case 'csv':
          content = response.csv;
          break;
        case 'xml':
          content = response.xml;
          break;
        case 'netscape':
          content = response.netscape;
          break;
        default: // json
          content = JSON.stringify(response.cookies, null, 2);
      }
      
      console.log('[ExportHandler] Content length:', content.length);
      
      // 更新进度到75%
      updateProgress(exportProgress, 75);
      console.log('[ExportHandler] Updated progress to 75%');
      
      if (shouldDownload) {
        console.log('[ExportHandler] Downloading file');
        // 更新进度到100%
        updateProgress(exportProgress, 100);
        console.log('[ExportHandler] Updated progress to 100%');
        
        // 实际调用下载管理器下载文件
        console.log('[ExportHandler] Calling downloadFile with content length:', content.length, 'filename:', filename, 'format:', sendMessageParams.format);
        downloadFile(content, filename, sendMessageParams.format, function(errorMessage) {
          // 清除导出时间记录，允许下次导出
          lastExportTimes.delete(buttonId);
          console.log('[ExportHandler] Cleared export time record after download attempt');
          
          console.error('[ExportHandler] Download failed with error:', errorMessage);
          // 显示下载错误
          const resultDiv = getResultDiv();
          if (resultDiv) {
            showError(I18n.getMessage("downloadFailed"), errorMessage, resultDiv);
          }
        });
        console.log('[ExportHandler] downloadFile function called');
        
        // 显示结果但不包含复制按钮
        const resultDiv = getResultDiv();
        console.log('[ExportHandler] Result div for download:', resultDiv);
        if (resultDiv) {
          console.log('[ExportHandler] Calling showResult for download');
          showResult(statsInfo, 'success', resultDiv);
          console.log('[ExportHandler] Showed download success message:', statsInfo);
        }
        // 恢复按钮状态
        button.disabled = false;
        button.textContent = defaultText;
        console.log('[ExportHandler] Re-enabled button and restored text after download');
        
        // 确保结果信息显示一段时间后消失
        console.log('[ExportHandler] Setting timeout to hide download result');
        setTimeout(() => {
          // 清除导出时间记录，允许下次导出
          lastExportTimes.delete(buttonId);
          console.log('[ExportHandler] Cleared export time record after download success timeout');
          
          if (resultDiv) {
            console.log('[ExportHandler] Hiding download result after timeout');
            resultDiv.classList.remove('visible');
            console.log('[ExportHandler] Download result hidden');
          }
          // 隐藏进度条
          exportProgress.classList.remove('visible');
          console.log('[ExportHandler] Removed visible class from export progress');
        }, 1000);
      } else {
        console.log('[ExportHandler] Copying to clipboard');
        // 更新进度到100%
        updateProgress(exportProgress, 100);
        console.log('[ExportHandler] Updated progress to 100%');
        
        // 复制到剪贴板
        navigator.clipboard.writeText(content).then(function() {
          console.log('[ExportHandler] Successfully copied to clipboard');
          const resultDiv = getResultDiv();
          console.log('[ExportHandler] Result div for copy:', resultDiv);
          if (resultDiv) {
            console.log('[ExportHandler] Calling showResult for copy');
            showResult(statsInfo, 'success', resultDiv);
            console.log('[ExportHandler] Showed copy success message:', statsInfo);
          }
          // 恢复按钮状态
          button.disabled = false;
          button.textContent = defaultText;
          console.log('[ExportHandler] Re-enabled button and restored text after copy');
          
          setTimeout(() => {
            // 清除导出时间记录，允许下次导出
            lastExportTimes.delete(buttonId);
            console.log('[ExportHandler] Cleared export time record after copy success timeout');
            
            if (resultDiv) {
              console.log('[ExportHandler] Hiding copy result after timeout');
              resultDiv.classList.remove('visible');
              console.log('[ExportHandler] Copy result hidden');
            }
            // 隐藏进度条
            exportProgress.classList.remove('visible');
            console.log('[ExportHandler] Removed visible class from export progress');
          }, 1000);
        }).catch(function(err) {
          // 清除导出时间记录，允许下次导出
          lastExportTimes.delete(buttonId);
          console.log('[ExportHandler] Cleared export time record after copy error');
          
          console.error('[ExportHandler] Failed to copy to clipboard:', err);
          // 使用专门的错误处理函数处理复制错误
          ExportErrorHandler.handleCopyToClipboardError(err, getResultDiv);
          // 使用统一的错误处理机制
          ErrorHandler.handleError(err, 'exportHandler.copyToClipboard', {
            operation: '复制到剪贴板'
          });
          // 记录错误日志
          ErrorLogger.logError('clipboard', '复制到剪贴板', err.message);
          // 恢复按钮状态
          button.disabled = false;
          button.textContent = defaultText;
          console.log('[ExportHandler] Re-enabled button and restored text after copy error');
          
          // 确保错误信息显示一段时间后消失
          console.log('[ExportHandler] Setting timeout to hide copy error result');
          setTimeout(() => {
            const resultDiv = getResultDiv();
            if (resultDiv) {
              console.log('[ExportHandler] Hiding copy error result after timeout');
              resultDiv.classList.remove('visible');
              console.log('[ExportHandler] Copy error result hidden');
            }
            // 隐藏进度条
            exportProgress.classList.remove('visible');
            console.log('[ExportHandler] Removed visible class from export progress');
          }, 1000);
        });
      }
      
      // 完成导出操作的 UI 状态处理
      // 不再更新 Cookie 计数，保持用户当前的过滤状态显示
    }
  });
}

export const ExportHandler = {
  handleExport
};