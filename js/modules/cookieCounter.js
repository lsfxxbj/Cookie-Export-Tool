/**
 * Cookie 计数管理模块
 * 处理 Cookie 计数相关功能
 */

import { I18n } from './i18n/index.js';

/**
 * 更新 Cookie 计数显示
 * @param {HTMLElement} cookieCountElement - 显示 Cookie 计数的元素
 */
function updateCookieCount(cookieCountElement) {
  chrome.cookies.getAll({}, (cookies) => {
    // 使用本地化消息显示Cookie计数
    const message = I18n.getMessage("cookiesLoaded");
    if (message && typeof message === 'string') {
      cookieCountElement.textContent = message.replace("{{count}}", cookies.length);
    } else {
      cookieCountElement.textContent = `Cookies: ${cookies.length}`;
    }
  });
}

/**
 * 根据过滤条件更新 Cookie 计数显示
 * @param {HTMLElement} cookieCountElement - 显示 Cookie 计数的元素
 * @param {Function} getFiltersFunction - 获取过滤条件的函数
 */
function updateFilteredCookieCount(cookieCountElement, getFiltersFunction) {
  // 获取当前选择的过滤条件
  const filters = getFiltersFunction();
  
  if (!filters) {
    // 如果没有过滤条件，显示总 Cookie 数量
    updateCookieCount(cookieCountElement);
    return;
  }
  
  // 根据过滤条件获取 Cookie
  chrome.cookies.getAll({}, (allCookies) => {
    let filteredCookies = allCookies;
    
    // 应用 Cookie 类型过滤
    if (filters.cookieType === 'secure') {
      filteredCookies = filteredCookies.filter(cookie => cookie.secure);
    } else if (filters.cookieType === 'http') {
      filteredCookies = filteredCookies.filter(cookie => !cookie.secure);
    }
    
    // 使用本地化消息显示过滤后的 Cookie 计数
    const message = I18n.getMessage("cookiesLoaded");
    if (message && typeof message === 'string') {
      cookieCountElement.textContent = message.replace("{{count}}", filteredCookies.length);
    } else {
      cookieCountElement.textContent = `Cookies: ${filteredCookies.length}`;
    }
  });
}

// 导出所有函数
export const CookieCounter = {
  updateCookieCount,
  updateFilteredCookieCount
};