/**
 * 下载管理模块
 * 处理文件下载相关功能
 */

import { ErrorLogger, ErrorHandler } from './errors/index.js';
import { I18n } from './i18n/index.js';

// 存储活动的定时器和对象URL，以便正确清理
const activeTimers = new Set();
const activeUrls = new Set();

/**
 * 下载文件
 * 使用Blob API创建文件并触发浏览器下载，确保资源得到正确清理
 * 
 * @param {string} content - 文件内容
 * @param {string} baseFilename - 基础文件名（不含扩展名）
 * @param {string} format - 文件格式 (json, csv, xml, netscape)
 * @param {Function} showErrorFunction - 显示错误信息的函数
 */
function downloadFile(content, baseFilename, format, showErrorFunction) {
  console.log('[DownloadManager] downloadFile called with:', { content: content ? `${content.length} chars` : 'null', baseFilename, format });
  // 初始化MIME类型和文件扩展名
  let mimeType = 'application/octet-stream';
  let extension = format;
  let url = null;
  let a = null;
  let cleanupTimer = null;
  let urlRevokeTimer = null;
  
  try {
    // 根据格式设置正确的MIME类型和扩展名
    switch (format) {
      case 'json':
        mimeType = 'application/json';
        break;
      case 'csv':
        mimeType = 'text/csv';
        break;
      case 'xml':
        mimeType = 'application/xml';
        break;
      case 'netscape':
        extension = 'txt';
        mimeType = 'text/plain';
        break;
    }
    
    console.log('[DownloadManager] MIME type set to:', mimeType, 'Extension:', extension);
    
    // 构造完整文件名
    const filename = `${baseFilename}.${extension}`;
    console.log('[DownloadManager] Full filename:', filename);
    // 创建Blob对象
    const blob = new Blob([content], {type: mimeType});
    console.log('[DownloadManager] Created blob with size:', blob.size);
    // 创建对象URL
    url = URL.createObjectURL(blob);
    activeUrls.add(url);
    console.log('[DownloadManager] Created object URL:', url);
    
    // 创建临时<a>元素用于触发下载
    a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    console.log('[DownloadManager] Created and appended anchor element, href:', a.href, 'download:', a.download);
    a.click();
    console.log('[DownloadManager] Triggered click event on anchor element');
  } catch (error) {
    console.error('[DownloadManager] Error during download:', error);
    console.error('[DownloadManager] Error stack:', error.stack);
    // 使用统一的错误处理机制
    ErrorHandler.handleError(error, 'downloadManager.downloadFile', {
      operation: '下载文件',
      filename: baseFilename,
      format: format
    });
    if (showErrorFunction) {
      showErrorFunction(`${I18n.getMessage("downloadFailed")}: ${error.message}`);
    } else {
      console.warn('[DownloadManager] No showErrorFunction provided');
    }
    // 记录错误日志
    ErrorLogger.logError('file', '下载文件', error.message);
  } finally {
    // 清理DOM元素
    if (a && a.parentNode) {
      console.log('[DownloadManager] Scheduling cleanup of anchor element');
      cleanupTimer = setTimeout(() => {
        if (a && a.parentNode) {
          a.parentNode.removeChild(a);
          console.log('[DownloadManager] Removed anchor element from DOM');
          a = null;
        }
        // 从活动定时器集合中移除
        if (cleanupTimer) {
          activeTimers.delete(cleanupTimer);
        }
      }, 100);
      activeTimers.add(cleanupTimer);
    }
    
    // 清理对象URL，释放内存
    if (url) {
      console.log('[DownloadManager] Scheduling revocation of object URL');
      urlRevokeTimer = setTimeout(() => {
        URL.revokeObjectURL(url);
        console.log('[DownloadManager] Revoked object URL');
        activeUrls.delete(url);
        url = null;
        // 从活动定时器集合中移除
        if (urlRevokeTimer) {
          activeTimers.delete(urlRevokeTimer);
        }
      }, 100);
      activeTimers.add(urlRevokeTimer);
    }
  }
}

/**
 * 清理所有活动的定时器和对象URL
 * 在适当的时候调用此函数以释放所有资源
 */
function cleanupAllResources() {
  console.log('[DownloadManager] Cleaning up all resources, timers:', activeTimers.size, 'urls:', activeUrls.size);
  // 清理所有活动的定时器
  activeTimers.forEach(timer => {
    clearTimeout(timer);
  });
  activeTimers.clear();
  
  // 撤销所有活动的对象URL
  activeUrls.forEach(url => {
    URL.revokeObjectURL(url);
  });
  activeUrls.clear();
  console.log('[DownloadManager] All resources cleaned up');
}

// 导出所有函数
export const DownloadManager = {
  downloadFile,
  cleanupAllResources
};