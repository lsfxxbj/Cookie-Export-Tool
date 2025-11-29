/**
 * 过滤管理模块
 * 处理过滤条件相关功能
 */

/**
 * 获取用户设置的过滤选项
 * @param {HTMLElement} cookieTypeSelect - Cookie 类型选择器元素
 * @returns {Object|null} 过滤选项对象或null（无过滤条件时）
 */
function getFilters(cookieTypeSelect) {
  const filters = {};
  
  // 获取Cookie类型过滤选项
  const cookieType = cookieTypeSelect.value;
  if (cookieType !== 'all') {
    filters.cookieType = cookieType;
  }
  
  // 只有当有过滤条件时才返回过滤器对象
  return Object.keys(filters).length > 0 ? filters : null;
}

/**
 * 获取选中的导出格式
 * @param {HTMLElement} formatSelect - 格式选择器元素
 * @returns {string} 导出格式
 */
function getExportFormat(formatSelect) {
  return formatSelect.value;
}

// 导出所有函数
export const FilterManager = {
  getFilters,
  getExportFormat
};