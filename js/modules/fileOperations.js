/**
 * 文件操作模块
 * 负责处理所有文件相关的操作
 */

import { ImportManager } from './importManager.js';
import { UIManager } from '../ui/uiManager.js';
import { I18n } from './i18n/index.js';
import { CookieCounter } from './cookieCounter.js';
import { DOMManager } from './domManager.js';

/**
 * 处理文件选择事件
 * @param {Event} e - 选择事件
 * @param {HTMLInputElement} fileInput - 文件输入元素
 * @param {HTMLElement} browseFilesBtn - 浏览文件按钮
 * @param {HTMLElement} dropArea - 拖放区域
 * @param {HTMLElement} importProgress - 导入进度条元素
 * @param {HTMLElement} cookieCount - Cookie 计数显示元素
 */
function handleFileSelection(e, fileInput, browseFilesBtn, dropArea, importProgress, cookieCount) {
  if (e.target.files.length) {
    // 显示文件名
    UIManager.handleFileSelect(e, dropArea);
    // 自动导入文件
    importSelectedFile(fileInput, browseFilesBtn, importProgress, cookieCount);
  }
}

/**
 * 处理文件拖放事件
 * @param {Event} e - 拖放事件
 * @param {HTMLInputElement} fileInput - 文件输入元素
 * @param {HTMLElement} dropArea - 拖放区域
 * @param {HTMLElement} importProgress - 导入进度条元素
 * @param {HTMLElement} cookieCount - Cookie 计数显示元素
 * @param {HTMLElement} browseFilesBtn - 浏览文件按钮
 */
function handleFileDrop(e, fileInput, dropArea, importProgress, cookieCount, browseFilesBtn) {
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
    // 自动导入文件
    importSelectedFile(fileInput, browseFilesBtn, importProgress, cookieCount);
  }
}

/**
 * 导入选中的文件
 * @param {HTMLInputElement} fileInput - 文件输入元素
 * @param {HTMLElement} browseFilesBtn - 浏览文件按钮
 * @param {HTMLElement} importProgress - 导入进度条元素
 * @param {HTMLElement} cookieCount - Cookie 计数显示元素
 */
function importSelectedFile(fileInput, browseFilesBtn, importProgress, cookieCount) {
  // 缓存常用的DOM查询结果
  const getResultDiv = DOMManager.getResultDiv;
  
  ImportManager.importCookies(
    fileInput.files[0],
    browseFilesBtn,
    importProgress,
    UIManager.updateProgress,
    () => CookieCounter.updateCookieCount(cookieCount),
    function(message, type) {
      const resultDiv = getResultDiv();
      if (resultDiv) UIManager.showResult(message, type, resultDiv);
    },
    function(message, details) {
      const resultDiv = getResultDiv();
      if (resultDiv) UIManager.showError(message, details, resultDiv);
    },
    UIManager,
    fileInput
  );
}

export const FileOperations = {
  handleFileSelection,
  handleFileDrop,
  importSelectedFile
};