/**
 * UI 管理模块
 * 处理用户界面相关的功能
 */

import { ErrorDisplay } from '../modules/errors/index.js';
import { I18n } from '../modules/i18n/index.js';

/**
 * 显示加载状态
 * @param {string} message - 显示的加载消息
 * @param {HTMLElement} resultDiv - 结果显示元素
 */
function showLoading(message, resultDiv) {
  console.log('[UIManager] showLoading called with:', { message, resultDiv });
  // 确保 message 是字符串类型
  const displayMessage = typeof message === 'string' ? message : String(message);
  
  // 清除任何现有的动画效果
  resultDiv.style.animation = 'none';
  resultDiv.offsetHeight; // 触发重排
  
  resultDiv.textContent = displayMessage; // 使用textContent而不是innerHTML
  resultDiv.className = 'result loading visible';
  
  // 添加动画效果
  resultDiv.style.animation = 'pulse 1s infinite';
  
  console.log('[UIManager] Showing loading message:', message, 'Result div class after:', resultDiv.className);
}

/**
 * 显示结果消息
 * @param {string} message - 要显示的消息
 * @param {string} type - 消息类型 (success|error|loading)
 * @param {HTMLElement} resultDiv - 结果显示元素
 */
function showResult(message, type, resultDiv) {
  console.log('[UIManager] showResult called with:', { message, type, resultDiv });
  // 确保 message 是字符串类型
  const displayMessage = typeof message === 'string' ? message : String(message);
  
  console.log(`[UIManager] Displaying ${type} message:`, displayMessage);
  
  // 使用textContent而不是innerHTML来避免HTML解析问题
  resultDiv.textContent = displayMessage;
  resultDiv.className = `result ${type} visible`;
  
  // 强制重绘以确保动画重新开始
  resultDiv.style.animation = 'none';
  resultDiv.offsetHeight; // 触发重排
  
  // 添加视觉反馈效果
  if (type === 'success') {
    resultDiv.style.animation = 'fadeInOut 3s forwards';
    console.log('[UIManager] Applied success animation to result div');
  } else if (type === 'error') {
    resultDiv.style.animation = 'shake 0.5s';
    console.log('[UIManager] Applied error animation to result div');
  } else if (type === 'loading') {
    resultDiv.style.animation = 'pulse 1s infinite';
    console.log('[UIManager] Applied loading animation to result div');
  }
  
  console.log('[UIManager] Showing result message:', message, 'Type:', type, 'Result div class after:', resultDiv.className);
}

/**
 * 显示详细错误信息
 * @param {string} message - 错误消息
 * @param {Array|string} details - 详细错误信息
 * @param {HTMLElement} resultDiv - 结果显示元素
 */
function showError(message, details, resultDiv) {
  console.log('[UIManager] showError called with:', { message, details, resultDiv });
  let errorText = message;
  
  if (Array.isArray(details) && details.length > 0) {
    errorText += '\n' + details.join('\n');
  } else if (typeof details === 'string' && details) {
    errorText += '\n' + details;
  } else if (typeof details === 'object' && details !== null) {
    // 处理对象类型的错误详情
    try {
      errorText += '\n' + JSON.stringify(details, null, 2);
    } catch (e) {
      errorText += '\n[object Object]';
    }
  }
  
  console.log('[UIManager] Formatted error text:', errorText);
  showResult(errorText, 'error', resultDiv);
}

/**
 * 显示网络错误
 * @param {string} operation - 操作名称
 * @param {string} error - 错误详情
 * @param {HTMLElement} resultDiv - 结果显示元素
 */
function showNetworkError(operation, error, resultDiv) {
  console.log('[UIManager] showNetworkError called with:', { operation, error, resultDiv });
  ErrorDisplay.displayNetworkError(operation, error, resultDiv);
}

/**
 * 显示文件错误
 * @param {string} operation - 操作名称
 * @param {string} error - 错误详情
 * @param {HTMLElement} resultDiv - 结果显示元素
 */
function showFileError(operation, error, resultDiv) {
  console.log('[UIManager] showFileError called with:', { operation, error, resultDiv });
  ErrorDisplay.displayFileError(operation, error, resultDiv);
}

/**
 * 显示格式错误
 * @param {string} format - 格式类型
 * @param {string} error - 错误详情
 * @param {HTMLElement} resultDiv - 结果显示元素
 */
function showFormatError(format, error, resultDiv) {
  console.log('[UIManager] showFormatError called with:', { format, error, resultDiv });
  ErrorDisplay.displayFormatError(format, error, resultDiv);
}

/**
 * 更新进度条
 * @param {HTMLElement} progressContainer - 进度条容器元素
 * @param {number} progress - 进度值 (0-100)
 */
function updateProgress(progressContainer, progress) {
  console.log('[UIManager] updateProgress called with:', { progressContainer, progress });
  console.log('[UIManager] Progress container class list:', progressContainer.classList);
  
  const progressBar = progressContainer.querySelector('.progress-bar');
  const progressText = progressContainer.querySelector('.progress-text');
  
  console.log('[UIManager] Progress bar element:', progressBar);
  console.log('[UIManager] Progress text element:', progressText);
  
  // 记录更新前的进度条状态
  if (progressBar) {
    console.log('[UIManager] Progress bar width before update:', progressBar.style.width);
  }
  
  if (progressText) {
    console.log('[UIManager] Progress text before update:', progressText.textContent);
  }
  
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
    console.log('[UIManager] Set progress bar width to:', `${progress}%`);
  }
  
  if (progressText) {
    progressText.textContent = `${Math.round(progress)}%`;
    console.log('[UIManager] Set progress text to:', `${Math.round(progress)}%`);
  }
  
  // 始终保持进度条容器可见，防止页面跳动
  progressContainer.classList.add('visible');
  console.log('[UIManager] Added visible class to progress container');
  console.log('[UIManager] Progress container class list after adding visible:', progressContainer.classList);
  
  // 只有在进度完成时才添加隐藏的延时
  if (progress >= 100) {
    console.log('[UIManager] Progress reached 100%, setting timeout to hide progress bar');
    // 进度完成时不立即隐藏，而是保持可见状态一小段时间，让用户能够看到100%的完成状态
    setTimeout(() => {
      console.log('[UIManager] Removing visible class from progress container after timeout');
      progressContainer.classList.remove('visible');
      console.log('[UIManager] Progress container class list after removing visible:', progressContainer.classList);
    }, 500);
  }
}

/**
 * 重置进度条到初始状态
 * @param {HTMLElement} progressContainer - 进度条容器元素
 */
function resetProgress(progressContainer) {
  console.log('[UIManager] resetProgress called with:', { progressContainer });
  
  const progressBar = progressContainer.querySelector('.progress-bar');
  const progressText = progressContainer.querySelector('.progress-text');
  
  // 重置进度条宽度和文本
  if (progressBar) {
    progressBar.style.width = '0%';
    console.log('[UIManager] Reset progress bar width to 0%');
  }
  
  if (progressText) {
    progressText.textContent = '0%';
    console.log('[UIManager] Reset progress text to 0%');
  }
  
  // 移除可见类，隐藏进度条
  progressContainer.classList.remove('visible');
  console.log('[UIManager] Removed visible class from progress container');
  console.log('[UIManager] Progress container class list after reset:', progressContainer.classList);
}

/**
 * 处理拖拽悬停事件
 * @param {Event} e - 拖拽事件
 * @param {HTMLElement} dropArea - 拖放区域元素
 */
function handleDragOver(e, dropArea) {
  console.log('[UIManager] handleDragOver called');
  e.preventDefault();
  e.stopPropagation();
  dropArea.style.backgroundColor = '#e6f3ff';
  dropArea.style.borderColor = '#007bff';
}

/**
 * 处理拖拽离开事件
 * @param {Event} e - 拖拽事件
 * @param {HTMLElement} dropArea - 拖放区域元素
 */
function handleDragLeave(e, dropArea) {
  console.log('[UIManager] handleDragLeave called');
  e.preventDefault();
  e.stopPropagation();
  dropArea.style.backgroundColor = '#f9f9f9';
  dropArea.style.borderColor = '#ccc';
}

/**
 * 处理文件拖放事件
 * @param {Event} e - 拖拽事件
 * @param {HTMLElement} dropArea - 拖放区域元素
 * @param {HTMLElement} fileInput - 文件输入元素
 */
function handleDrop(e, dropArea, fileInput) {
  console.log('[UIManager] handleDrop called');
  e.preventDefault();
  e.stopPropagation();
  
  dropArea.style.backgroundColor = '#f9f9f9';
  dropArea.style.borderColor = '#ccc';
  
  const files = e.dataTransfer.files;
  if (files.length) {
    fileInput.files = files;
    // 显示文件名
    dropArea.innerHTML = `<p>${I18n.getMessage("selectedFile")}: ${files[0].name}</p>
      <p data-i18n="dragAndDropHint">${I18n.getMessage("dragAndDropHint")}</p>`;
  }
}

/**
 * 处理文件选择事件
 * @param {Event} e - 选择事件
 * @param {HTMLElement} dropArea - 拖放区域元素
 */
function handleFileSelect(e, dropArea) {
  console.log('[UIManager] handleFileSelect called');
  if (e.target.files.length) {
    // 显示文件名
    dropArea.innerHTML = `<p>${I18n.getMessage("selectedFile")}: ${e.target.files[0].name}</p>
      <p data-i18n="dragAndDropHint">${I18n.getMessage("dragAndDropHint")}</p>`;
  }
}

// 导出所有函数
export const UIManager = {
  showLoading,
  showResult,
  showError,
  showNetworkError,
  showFileError,
  showFormatError,
  updateProgress,
  resetProgress,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleFileSelect
};