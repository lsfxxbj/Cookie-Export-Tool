/**
 * DOM 管理模块
 * 负责获取和管理 DOM 元素
 */

// 缓存DOM元素，避免重复查询
let cachedElements = null;

/**
 * 获取所有需要操作的 DOM 元素
 * @returns {Object} 包含所有 DOM 元素的对象
 */
function getDOMElements() {
  // 如果已有缓存，直接返回
  if (cachedElements) {
    return cachedElements;
  }
  
  console.log('[DOMManager] getDOMElements called');
  cachedElements = {
    // 导出相关按钮
    exportCurrentBtn: document.getElementById('export-current-btn'),
    exportAllBtn: document.getElementById('export-all-btn'),
    copyCurrentBtn: document.getElementById('copy-current-btn'),
    copyAllBtn: document.getElementById('copy-all-btn'),

    // 导入相关元素
    importBtn: document.getElementById('browse-and-import'), // 更新为新的合并按钮
    fileInput: document.getElementById('file-input'),
    browseFilesBtn: document.getElementById('browse-and-import'), // 更新为新的合并按钮
    dropArea: document.getElementById('drop-area'),
    
    // 界面显示元素
    cookieCount: document.getElementById('cookie-count'),
    languageSelector: document.getElementById('language-selector'),
    
    // 过滤和格式选择元素
    domainFilter: document.getElementById('domain-filter'),
    formatSelect: document.getElementById('format-select'),
    cookieTypeSelect: document.getElementById('cookie-type'),
    
    // 标签页相关元素
    tabButtons: document.querySelectorAll('.tab-button'),
    tabContents: document.querySelectorAll('.tab-content'),
    
    // 进度条元素
    exportProgress: document.getElementById('export-progress'),
    importProgress: document.getElementById('import-progress')
  };
  
  return cachedElements;
}

/**
 * 清除DOM元素缓存
 * 当DOM结构发生变化时调用此方法
 */
function clearCache() {
  cachedElements = null;
}

/**
 * 获取当前活动标签页的结果区域
 * @returns {HTMLElement|null} 结果显示区域元素或 null
 */
function getResultDiv() {
  console.log('[DOMManager] getResultDiv called');
  const activeTab = document.querySelector('.tab-content.active');
  console.log('[DOMManager] Active tab element:', activeTab);
  if (activeTab) {
    const resultDiv = activeTab.querySelector('.result');
    console.log('[DOMManager] Active tab:', activeTab.id, 'Result div found:', !!resultDiv, 'Result div element:', resultDiv);
    if (resultDiv) {
      console.log('[DOMManager] Result div class list:', resultDiv.classList);
    }
    return resultDiv;
  }
  console.log('[DOMManager] No active tab found, trying fallback selector');
  // 尝试备用选择器
  const fallbackResultDiv = document.querySelector('.result');
  console.log('[DOMManager] Fallback result div:', fallbackResultDiv);
  return fallbackResultDiv;
}

// 导出所有函数
export const DOMManager = {
  getDOMElements,
  getResultDiv,
  clearCache
};