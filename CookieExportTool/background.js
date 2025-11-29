/**
 * Cookie 导出工具 - 后台脚本
 * 处理来自 popup 的消息并执行 Cookie 导出操作
 * 
 * 该脚本作为 Service Worker 运行，负责与 Chrome API 交互，
 * 处理所有与 Cookie 相关的操作，包括导出、导入和格式化等
 */

// 导入 CookieFormatter 模块
import { CookieFormatter } from './js/modules/cookieFormatter.js';

// 监听来自 popup 或 content script 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('[Background] Received message:', request, 'from sender:', sender);
  // 验证消息来源，确保消息来自扩展本身，防止跨站攻击
  if (!sender || !sender.id || sender.id !== chrome.runtime.id) {
    console.warn('[Background] Invalid message source detected');
    sendResponse({error: chrome.i18n.getMessage("invalidMessageSource")});
    return true;
  }
  
  // 根据请求的操作类型进行不同的处理
  if (request.action === "exportCookies") {
    console.log('[Background] Processing exportCookies request');
    // 导出当前网站的 cookies
    // 验证URL参数是否存在且为字符串类型
    if (!request.url || typeof request.url !== 'string') {
      console.warn('[Background] Invalid URL parameter for exportCookies');
      sendResponse({error: chrome.i18n.getMessage("invalidUrlParameter")});
      return true;
    }
    
    // 简单的URL验证，确保URL格式正确
    try {
      new URL(request.url);
    } catch (e) {
      console.warn('[Background] Invalid URL format for exportCookies');
      sendResponse({error: chrome.i18n.getMessage("invalidUrlFormat")});
      return true;
    }
    
    // 获取当前活动标签页的 cookies
    // 使用 chrome.cookies.getAll API 根据 URL 获取对应的 cookies
    chrome.cookies.getAll({url: request.url}, (cookies) => {
      console.log('[Background] Retrieved cookies for URL:', request.url, 'Count:', cookies ? cookies.length : 0);
      // 检查是否有错误发生
      if (chrome.runtime.lastError) {
        console.error('[Background] Failed to get cookies:', chrome.runtime.lastError);
        sendResponse({error: chrome.i18n.getMessage("getCookiesFailed") + ": " + chrome.runtime.lastError.message});
      } else {
        // 应用过滤器，根据用户设置的条件过滤 cookies
        const filteredCookies = filterCookies(cookies, request.filters);
        console.log('[Background] Filtered cookies count:', filteredCookies.length);
        // 根据用户选择的格式返回数据
        const formattedData = CookieFormatter.formatCookiesData(filteredCookies, request.format || 'json', false);
        const response = {
          count: filteredCookies.length,
          grouped: false
        };
        
        // 根据格式设置响应数据
        if (request.format === 'csv') {
          response.csv = formattedData.csv;
        } else if (request.format === 'xml') {
          response.xml = formattedData.xml;
        } else if (request.format === 'netscape') {
          response.netscape = formattedData.netscape;
        } else {
          // JSON格式直接返回cookies数组
          response.cookies = formattedData;
        }
        
        console.log('[Background] Sending exportCookies response with count:', response.count);
        sendResponse(response);
      }
    });
    // 保持消息通道开放，直到异步操作完成
    return true;
  } else if (request.action === "exportAllCookies") {
    console.log('[Background] Processing exportAllCookies request');
    // 导出所有 cookies
    // 获取所有 cookies，不指定特定 URL
    chrome.cookies.getAll({}, (cookies) => {
      console.log('[Background] Retrieved all cookies, count:', cookies ? cookies.length : 0);
      // 检查是否有错误发生
      if (chrome.runtime.lastError) {
        console.error('[Background] Failed to get all cookies:', chrome.runtime.lastError);
        sendResponse({error: chrome.i18n.getMessage("getCookiesFailed") + ": " + chrome.runtime.lastError.message});
      } else {
        // 性能优化：如果cookies数量很大(超过5000个)，使用分批处理以避免阻塞主线程
        const totalCookies = cookies.length;
        console.log('[Background] Total cookies count:', totalCookies);
        
        // 使用setTimeout分批处理大量数据，避免阻塞
        setTimeout(() => {
          if (totalCookies > 5000) {
            console.log('[Background] Large cookie set detected, using batch processing for performance');
            // 对于大量cookies，直接返回而不分组以提高性能
            const filteredCookies = request.filters ? filterCookies(cookies, request.filters) : cookies;
            // 根据格式返回数据
            const response = CookieFormatter.formatCookiesData(filteredCookies, request.format || 'json', false);
            response.count = filteredCookies.length;
            response.grouped = false;
            console.log('[Background] Sending large dataset response with count:', response.count);
            sendResponse(response);
          } else {
            // 按域名分组 cookies，便于用户查看和管理
            console.log('[Background] Grouping cookies by domain');
            let groupedCookies = {};
            cookies.forEach(cookie => {
              const domain = cookie.domain;
              // 如果该域名还没有对应的数组，则创建一个空数组
              if (!groupedCookies[domain]) {
                groupedCookies[domain] = [];
              }
              // 将当前 cookie 添加到对应域名的数组中
              groupedCookies[domain].push(cookie);
            });
            
            console.log('[Background] Grouped cookies into', Object.keys(groupedCookies).length, 'domains');
            
            let filteredTotal = 0;
            // 应用过滤器
            if (request.filters) {
              console.log('[Background] Applying filters to grouped cookies');
              // 遍历所有域名，对每个域名下的 cookies 应用过滤器
              Object.keys(groupedCookies).forEach(domain => {
                groupedCookies[domain] = filterCookies(groupedCookies[domain], request.filters);
                // 累计过滤后的 cookies 数量
                filteredTotal += groupedCookies[domain].length;
                // 如果过滤后没有 cookies，删除该域名条目以节省空间
                if (groupedCookies[domain].length === 0) {
                  delete groupedCookies[domain];
                }
              });
            } else {
              filteredTotal = totalCookies;
            }
            
            console.log('[Background] Filtered total cookies:', filteredTotal);
            
            // 根据格式返回数据
            const formattedData = CookieFormatter.formatCookiesData(groupedCookies, request.format || 'json', true);
            const response = {
              count: filteredTotal,
              grouped: true
            };
            
            // 根据格式设置响应数据
            if (request.format === 'csv') {
              response.csv = formattedData.csv;
            } else if (request.format === 'xml') {
              response.xml = formattedData.xml;
            } else if (request.format === 'netscape') {
              response.netscape = formattedData.netscape;
            } else {
              // JSON格式直接返回cookies数组
              response.cookies = formattedData;
            }
            
            console.log('[Background] Sending exportAllCookies response with count:', response.count);
            sendResponse(response);
          }
        }, 0); // 将处理推迟到下一个事件循环周期
      }
    });
    // 保持消息通道开放，直到异步操作完成
    return true;
  } else if (request.action === "importCookies") {
    console.log('[Background] Processing importCookies request');
    // 导入 cookies
    try {
      // 使用 CookieFormatter 解析导入的数据
      console.log('[Background] Parsing imported cookies data');
      const importedCookies = CookieFormatter.parseImportedCookies(request.data, request.format);
      console.log('[Background] Successfully parsed', importedCookies.length, 'cookies');
      sendResponse({success: true, count: importedCookies.length, cookies: importedCookies});
    } catch (error) {
      console.error('[Background] Failed to parse imported cookies:', error);
      // 如果解析过程中出现错误，返回错误信息
      sendResponse({error: chrome.i18n.getMessage("importFailed") + ": " + error.message});
    }
    return true;
  } else {
    console.warn('[Background] Unknown action received:', request.action);
    // 如果请求的操作类型未知，返回错误信息
    sendResponse({error: chrome.i18n.getMessage("unknownAction")});
  }
});

/**
 * 根据过滤条件过滤 cookies
 * @param {Array} cookies - 要过滤的 cookies 数组
 * @param {Object} filters - 过滤条件对象，可能包含 domain, secureOnly, httpOnly, cookieType 等属性
 * @returns {Array} 过滤后的 cookies 数组
 */
function filterCookies(cookies, filters) {
  console.log('[Background] Filtering cookies, filters:', filters);
  // 如果没有提供过滤条件，直接返回原数组
  if (!filters) {
    console.log('[Background] No filters provided, returning all cookies');
    return cookies;
  }
  
  // 验证过滤器参数是否为对象类型
  if (typeof filters !== 'object') {
    console.warn('[Background] Filters is not an object, returning all cookies');
    return cookies;
  }
  
  // 使用数组的 filter 方法对 cookies 进行过滤
  const filtered = cookies.filter(cookie => {
    // 验证cookie对象是否存在且为对象类型
    if (!cookie || typeof cookie !== 'object') {
      console.warn('[Background] Invalid cookie object detected');
      return false;
    }
    
    // 域名过滤：检查 cookie 的域名是否包含指定的域名
    if (filters.domain && typeof filters.domain === 'string' && !cookie.domain.includes(filters.domain)) {
      return false;
    }
    
    // 仅安全 cookies：如果设置了 secureOnly 且 cookie 不是安全的，则过滤掉
    if (filters.secureOnly && !cookie.secure) {
      return false;
    }
    
    // 仅 HTTP-Only cookies：如果设置了 httpOnly 且 cookie 不是 HTTP-Only 的，则过滤掉
    if (filters.httpOnly && !cookie.httpOnly) {
      return false;
    }
    
    // Cookie 类型过滤
    if (filters.cookieType === 'secure' && !cookie.secure) {
      return false;
    }
    
    if (filters.cookieType === 'http' && cookie.secure) {
      return false;
    }
    
    // 如果所有条件都满足，保留该 cookie
    return true;
  });
  
  console.log('[Background] Filtered cookies count:', filtered.length);
  return filtered;
}

// 当插件安装时，显示一些说明
chrome.runtime.onInstalled.addListener(() => {
  console.log('[Background] Cookie 导出工具已安装');
});