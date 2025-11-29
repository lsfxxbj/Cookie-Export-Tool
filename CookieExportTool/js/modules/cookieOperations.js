/**
 * Cookie 操作模块
 * 负责处理所有 Cookie 相关的操作
 */

import { CookieCounter } from './cookieCounter.js';
import { FilterManager } from './filterManager.js';

/**
 * 更新 Cookie 计数显示
 * @param {HTMLElement} cookieCountElement - 显示 Cookie 计数的元素
 */
function updateCookieCount(cookieCountElement) {
  CookieCounter.updateCookieCount(cookieCountElement);
}

/**
 * 根据过滤条件更新 Cookie 计数显示
 * @param {HTMLElement} cookieCountElement - 显示 Cookie 计数的元素
 * @param {HTMLElement} cookieTypeSelect - Cookie 类型选择元素
 */
function updateFilteredCookieCount(cookieCountElement, cookieTypeSelect) {
  const getFiltersFunction = () => FilterManager.getFilters(cookieTypeSelect);
  CookieCounter.updateFilteredCookieCount(cookieCountElement, getFiltersFunction);
}

export const CookieOperations = {
  updateCookieCount,
  updateFilteredCookieCount
};