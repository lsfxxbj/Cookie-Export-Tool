/**
 * 导出模块 UI 管理器
 * 处理导出功能中的 UI 相关操作，减少重复代码
 */

/**
 * 初始化导出操作的 UI 状态
 * @param {HTMLElement} button - 触发导出的按钮元素
 * @param {Function} showLoading - 显示加载状态的函数
 * @param {HTMLElement} exportProgress - 导出进度条元素
 * @param {Function} updateProgress - 更新进度条的函数
 */
function initExportUI(button, showLoading, exportProgress, updateProgress) {
  // 显示加载状态
  showLoading(chrome.i18n.getMessage("exportCurrentLoading"));
  // 禁用按钮并更新文本
  button.disabled = true;
  button.textContent = chrome.i18n.getMessage("exporting");
  
  // 显示导出进度条
  updateProgress(exportProgress, 0);
  exportProgress.classList.add('visible');
}

/**
 * 完成导出操作的 UI 状态处理
 * @param {HTMLElement} button - 触发导出的按钮元素
 * @param {string} defaultText - 按钮默认文本
 * @param {HTMLElement} exportProgress - 导出进度条元素
 */
function completeExportUI(button, defaultText, exportProgress) {
  // 恢复按钮状态
  button.disabled = false;
  button.textContent = defaultText;
  // 隐藏进度条
  exportProgress.classList.remove('visible');
}

/**
 * 处理导出完成的 UI 状态
 * @param {HTMLElement} button - 触发导出的按钮元素
 * @param {string} defaultText - 按钮默认文本
 * @param {HTMLElement} exportProgress - 导出进度条元素
 * @param {Function} updateProgress - 更新进度条的函数
 * @param {Function} showResult - 显示结果信息的函数
 * @param {string} statsInfo - 统计信息
 */
function finishExportUI(button, defaultText, exportProgress, updateProgress, showResult, statsInfo) {
  // 恢复按钮状态
  button.disabled = false;
  button.textContent = defaultText;
  
  // 更新进度到100%
  updateProgress(exportProgress, 100);
  
  // 显示结果
  showResult(statsInfo, 'success');
  
  // 不再更新 Cookie 计数，保持用户当前的过滤状态显示
}

export const ExportUIManager = {
  initExportUI,
  completeExportUI,
  finishExportUI
};