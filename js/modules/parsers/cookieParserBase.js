/**
 * Cookie 解析基础模块
 * 提供解析不同格式输入数据并转换为Cookie对象数组的功能
 * 
 * 该模块包含以下主要功能:
 * 1. 解析不同格式的输入数据并转换为Cookie对象数组 (JSON, CSV, XML, Netscape)
 */

import { Utils } from '../../utils/utils.js';

/**
 * 解析导入的 Cookies 数据
 * 根据指定的格式解析输入数据并转换为Cookie对象数组
 * 
 * @param {string} data - 导入的数据字符串
 * @param {string} format - 数据格式 (json, csv, netscape, xml)
 * @returns {Array} 解析后的 Cookies 数组
 * @throws {Error} 当格式不支持或数据解析失败时抛出错误
 */
function parseImportedCookies(data, format) {
  switch (format) {
    case 'json':
      return parseJsonCookies(data);
    case 'csv':
      return parseCsvCookies(data);
    case 'netscape':
      return parseNetscapeCookies(data);
    case 'xml':
      return parseXmlCookies(data);
    default:
      throw new Error('不支持的文件格式');
  }
}

/**
 * 解析 JSON 格式的 Cookies
 * 支持数组格式和按域名分组的对象格式
 * 
 * @param {string} data - JSON 数据字符串
 * @returns {Array} Cookies 数组
 * @throws {Error} 当JSON格式无效或解析失败时抛出错误
 */
function parseJsonCookies(data) {
  try {
    const parsedData = JSON.parse(data);
    
    // 检查是否为直接的数组格式（我们新的导出格式）
    if (Array.isArray(parsedData)) {
      // 处理数组中的每个cookie，确保字段类型正确
      return parsedData.map(cookie => normalizeCookieFields(cookie));
    } 
    // 检查是否为旧的导出格式 { cookies: [...] }
    else if (typeof parsedData === 'object' && parsedData !== null && 'cookies' in parsedData) {
      const cookies = parsedData.cookies;
      // 验证是否为有效的 cookies 数组
      if (Array.isArray(cookies)) {
        // 处理数组中的每个cookie，确保字段类型正确
        return cookies.map(cookie => normalizeCookieFields(cookie));
      } else if (typeof cookies === 'object' && cookies !== null) {
        // 如果是按域名分组的对象，合并所有 cookies
        const flattened = Object.values(cookies).flat();
        return flattened.map(cookie => normalizeCookieFields(cookie));
      }
    } 
    // 检查是否为按域名分组的对象格式
    else if (typeof parsedData === 'object' && parsedData !== null) {
      // 如果是按域名分组的对象，合并所有 cookies
      const flattened = Object.values(parsedData).flat();
      return flattened.map(cookie => normalizeCookieFields(cookie));
    }
    
    throw new Error('无效的 JSON 格式');
  } catch (e) {
    throw new Error('JSON 解析失败: ' + e.message);
  }
}

/**
 * 标准化 Cookie 字段，确保数据类型正确
 * @param {Object} cookie - Cookie 对象
 * @returns {Object} 标准化后的 Cookie 对象
 */
function normalizeCookieFields(cookie) {
  if (!cookie || typeof cookie !== 'object') {
    return cookie;
  }
  
  // 创建一个新的cookie对象，避免修改原始对象
  const normalizedCookie = { ...cookie };
  
  // 确保必需字段存在
  normalizedCookie.name = cookie.name || '';
  normalizedCookie.value = cookie.value || '';
  normalizedCookie.domain = cookie.domain || '';
  normalizedCookie.path = cookie.path || '/';
  
  // 确保字段类型正确
  normalizedCookie.name = String(normalizedCookie.name);
  normalizedCookie.value = String(normalizedCookie.value);
  normalizedCookie.domain = String(normalizedCookie.domain);
  normalizedCookie.path = String(normalizedCookie.path);
  
  // 处理过期时间
  if (cookie.expirationDate !== undefined && cookie.expirationDate !== null) {
    if (typeof cookie.expirationDate === 'string') {
      const parsed = parseFloat(cookie.expirationDate);
      normalizedCookie.expirationDate = !isNaN(parsed) ? parsed : null;
    } else if (typeof cookie.expirationDate === 'number') {
      normalizedCookie.expirationDate = cookie.expirationDate;
    } else {
      normalizedCookie.expirationDate = null;
    }
  } else {
    normalizedCookie.expirationDate = null;
  }
  
  // 处理布尔字段
  if (cookie.secure !== undefined) {
    if (typeof cookie.secure === 'string') {
      normalizedCookie.secure = cookie.secure.toLowerCase() === 'true';
    } else if (typeof cookie.secure === 'number') {
      normalizedCookie.secure = cookie.secure !== 0;
    } else if (typeof cookie.secure === 'boolean') {
      normalizedCookie.secure = cookie.secure;
    } else {
      normalizedCookie.secure = false;
    }
  } else {
    normalizedCookie.secure = false;
  }
  
  if (cookie.httpOnly !== undefined) {
    if (typeof cookie.httpOnly === 'string') {
      normalizedCookie.httpOnly = cookie.httpOnly.toLowerCase() === 'true';
    } else if (typeof cookie.httpOnly === 'number') {
      normalizedCookie.httpOnly = cookie.httpOnly !== 0;
    } else if (typeof cookie.httpOnly === 'boolean') {
      normalizedCookie.httpOnly = cookie.httpOnly;
    } else {
      normalizedCookie.httpOnly = false;
    }
  } else {
    normalizedCookie.httpOnly = false;
  }
  
  return normalizedCookie;
}

/**
 * 解析 CSV 格式的 Cookies
 * 解析符合Netscape Cookie格式标准的CSV数据
 * 
 * @param {string} data - CSV 数据字符串
 * @returns {Array} Cookies 数组
 * @throws {Error} 当CSV格式无效时抛出错误
 */
function parseCsvCookies(data) {
  // 按行分割并过滤空行
  const lines = data.split('\n').filter(line => line.trim() !== '');
  // 至少需要包含头部行和一行数据
  if (lines.length < 2) {
    throw new Error('CSV 数据格式不正确');
  }
  
  // 解析头部行，获取字段名
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const cookies = [];
  
  // 解析数据行
  for (let i = 1; i < lines.length; i++) {
    // 按逗号分割各字段
    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
    // 确保有足够的字段
    if (values.length >= 7) {
      const cookie = {
        domain: values[0],                    // 域名
        httpOnly: values[1].toUpperCase() === 'TRUE',  // HttpOnly标志
        path: values[2],                      // 路径
        secure: values[3].toUpperCase() === 'TRUE',    // 安全标志
        expirationDate: values[4] ? parseFloat(values[4]) : null,   // 过期时间
        name: values[5],                      // Cookie名称
        value: values[6]                      // Cookie值
      };
      
      // 标准化cookie字段
      normalizeCookieFields(cookie);
      
      // 确保数值类型正确
      if (cookie.expirationDate !== null && !isNaN(cookie.expirationDate)) {
        cookie.expirationDate = Number(cookie.expirationDate);
      } else {
        cookie.expirationDate = null;
      }
      
      cookies.push(cookie);
    }
  }
  
  return cookies;
}

/**
 * 解析 XML 格式的 Cookies
 * 解析XML格式的Cookie数据
 * 
 * @param {string} data - XML 数据字符串
 * @returns {Array} Cookies 数组
 * @throws {Error} 当XML格式无效时抛出错误
 */
function parseXmlCookies(data) {
  try {
    // 简单的XML解析实现，不依赖DOMParser
    const cookies = [];
    
    // 使用正则表达式提取cookie块
    const cookieRegex = /<cookie>([\s\S]*?)<\/cookie>/g;
    let match;
    
    while ((match = cookieRegex.exec(data)) !== null) {
      const cookieBlock = match[1];
      
      // 提取各个字段
      const getField = (field) => {
        const fieldRegex = new RegExp(`<${field}>(.*?)<\/${field}>`, 's');
        const fieldMatch = cookieBlock.match(fieldRegex);
        return fieldMatch ? fieldMatch[1] : "";
      };
      
      const expirationStr = getField("expiration");
      let expirationDate = null;
      if (expirationStr) {
        const parsed = parseFloat(expirationStr);
        if (!isNaN(parsed)) {
          expirationDate = parsed;
        }
      }
      
      const cookie = {
        name: getField("name"),
        value: getField("value"),
        domain: getField("domain"),
        path: getField("path") || "/",
        secure: getField("secure").toUpperCase() === "TRUE",
        httpOnly: getField("flag").toUpperCase() === "TRUE",
        expirationDate: expirationDate
      };
      
      // 标准化cookie字段
      normalizeCookieFields(cookie);
      
      cookies.push(cookie);
    }
    
    return cookies;
  } catch (e) {
    throw new Error('XML解析失败: ' + e.message);
  }
}

/**
 * 解析 Netscape 格式的 Cookies
 * 解析Netscape Cookie文件格式的数据
 * 
 * @param {string} data - Netscape Cookie 数据字符串
 * @returns {Array} Cookies 数组
 */
function parseNetscapeCookies(data) {
  // 按行分割，过滤空行和注释行
  const lines = data.split('\n').filter(line => 
    line.trim() !== '' && !line.startsWith('#')
  );
  
  const cookies = [];
  // 解析每一行
  for (const line of lines) {
    // 按制表符分割各字段
    const parts = line.split('\t');
    // 确保有足够的字段
    if (parts.length >= 7) {
      const expirationStr = parts[4];
      let expirationDate = null;
      if (expirationStr) {
        const parsed = parseFloat(expirationStr);
        if (!isNaN(parsed)) {
          expirationDate = parsed;
        }
      }
      
      const cookie = {
        domain: parts[0],                     // 域名
        httpOnly: parts[1].toUpperCase() === 'TRUE',   // HttpOnly标志
        path: parts[2],                       // 路径
        secure: parts[3].toUpperCase() === 'TRUE',     // 安全标志
        expirationDate: expirationDate,       // 过期时间
        name: parts[5],                       // Cookie名称
        value: parts[6]                       // Cookie值
      };
      
      // 标准化cookie字段
      normalizeCookieFields(cookie);
      
      cookies.push(cookie);
    }
  }
  
  return cookies;
}

// 导出所有函数，使其可以在其他模块中使用
export const CookieParserBase = {
  parseImportedCookies,
  parseJsonCookies,
  parseCsvCookies,
  parseNetscapeCookies,
  parseXmlCookies,
  normalizeCookieFields
};