/**
 * Cookie 验证模块
 * 提供 Cookie 数据验证功能
 */

/**
 * 验证导入的 Cookie 数据
 * @param {Array|Object} cookies - Cookie 数据
 * @param {string} format - 数据格式
 * @returns {Object} 验证结果
 */
function validateCookies(cookies, format) {
  const result = {
    valid: true,
    errors: [],
    validCookies: []
  };
  
  try {
    // 根据格式验证数据
    switch (format) {
      case 'json':
        // 检查cookies是否定义
        if (!cookies) {
          result.valid = false;
          result.errors.push('未提供有效的Cookie数据');
          return result;
        }
        
        // 检查是否为有效的数组或对象
        if (!Array.isArray(cookies) && (typeof cookies !== 'object' || cookies === null)) {
          result.valid = false;
          result.errors.push('JSON数据格式不正确，应为数组或对象。示例格式: [{"name": "cookie_name", "value": "cookie_value", "domain": "example.com"}]');
          return result;
        }
        
        // 如果是对象但不是数组，尝试转换为数组
        let cookieArray = Array.isArray(cookies) ? cookies : Object.values(cookies).flat();
        
        // 验证每个 Cookie
        cookieArray.forEach((cookie, index) => {
          const cookieErrors = validateCookie(cookie);
          if (cookieErrors.length === 0) {
            result.validCookies.push(cookie);
          } else {
            result.errors.push(`Cookie ${index + 1}: ${cookieErrors.join(', ')}`);
          }
        });
        break;
        
      case 'csv':
        // 检查cookies是否定义
        if (!cookies) {
          result.valid = false;
          result.errors.push('未提供有效的Cookie数据');
          return result;
        }
        
        // CSV 格式已经在解析时验证
        if (Array.isArray(cookies)) {
          cookies.forEach((cookie, index) => {
            const cookieErrors = validateCookie(cookie);
            if (cookieErrors.length === 0) {
              result.validCookies.push(cookie);
            } else {
              result.errors.push(`Cookie ${index + 1}: ${cookieErrors.join(', ')}`);
            }
          });
        }
        break;
        
      case 'netscape':
        // 检查cookies是否定义
        if (!cookies) {
          result.valid = false;
          result.errors.push('未提供有效的Cookie数据');
          return result;
        }
        
        // Netscape 格式已经在解析时验证
        if (Array.isArray(cookies)) {
          cookies.forEach((cookie, index) => {
            const cookieErrors = validateCookie(cookie);
            if (cookieErrors.length === 0) {
              result.validCookies.push(cookie);
            } else {
              result.errors.push(`Cookie ${index + 1}: ${cookieErrors.join(', ')}`);
            }
          });
        }
        break;
        
      case 'xml':
        // 检查cookies是否定义
        if (!cookies) {
          result.valid = false;
          result.errors.push('未提供有效的Cookie数据');
          return result;
        }
        
        // XML 格式验证
        if (Array.isArray(cookies)) {
          cookies.forEach((cookie, index) => {
            const cookieErrors = validateCookie(cookie);
            if (cookieErrors.length === 0) {
              result.validCookies.push(cookie);
            } else {
              result.errors.push(`Cookie ${index + 1}: ${cookieErrors.join(', ')}`);
            }
          });
        }
        break;
        
      default:
        result.valid = false;
        result.errors.push(`不支持的格式: ${format}`);
    }
    
    // 如果没有有效的 Cookie，标记为无效
    if (result.validCookies.length === 0 && cookieArray && cookieArray.length > 0) {
      result.valid = false;
    }
    
    // 添加对其他格式的支持
    if (result.validCookies.length === 0 && cookies && cookies.length > 0 && format !== 'json') {
      result.valid = false;
    }
    
  } catch (error) {
    result.valid = false;
    result.errors.push(`${chrome.i18n.getMessage("validationError")}: ${error.message}`);
  }
  
  return result;
}

/**
 * 验证单个 Cookie
 * @param {Object} cookie - Cookie 对象
 * @returns {Array} 错误信息数组
 */
function validateCookie(cookie) {
  const errors = [];
  
  // 检查必需字段
  if (!cookie.name) {
    errors.push('缺少 name 字段');
  }
  
  if (!cookie.value) {
    errors.push('缺少 value 字段');
  }
  
  if (!cookie.domain) {
    errors.push('缺少 domain 字段');
  }
  
  // 检查字段类型并尝试转换
  if (cookie.name && typeof cookie.name !== 'string') {
    // 尝试转换为字符串
    try {
      cookie.name = String(cookie.name);
    } catch (e) {
      errors.push('name 字段无法转换为字符串');
    }
  }
  
  if (cookie.value && typeof cookie.value !== 'string') {
    // 尝试转换为字符串
    try {
      cookie.value = String(cookie.value);
    } catch (e) {
      errors.push('value 字段无法转换为字符串');
    }
  }
  
  if (cookie.domain && typeof cookie.domain !== 'string') {
    // 尝试转换为字符串
    try {
      cookie.domain = String(cookie.domain);
    } catch (e) {
      errors.push('domain 字段无法转换为字符串');
    }
  }
  
  if (cookie.path && typeof cookie.path !== 'string') {
    // 尝试转换为字符串
    try {
      cookie.path = String(cookie.path);
    } catch (e) {
      errors.push('path 字段无法转换为字符串');
    }
  }
  
  // 检查过期时间并尝试转换
  if (cookie.expirationDate !== undefined && cookie.expirationDate !== null) {
    // 如果是字符串，尝试转换为数字
    if (typeof cookie.expirationDate === 'string') {
      const parsed = parseFloat(cookie.expirationDate);
      if (!isNaN(parsed) && parsed >= 0) {
        cookie.expirationDate = parsed;
      } else {
        // 无效的过期时间，设为null而不是报错
        cookie.expirationDate = null;
      }
    } else if (typeof cookie.expirationDate !== 'number' || cookie.expirationDate < 0) {
      // 无效的过期时间，设为null而不是报错
      cookie.expirationDate = null;
    }
  }
  
  // 检查布尔字段并尝试转换
  if (cookie.secure !== undefined && typeof cookie.secure !== 'boolean') {
    // 尝试转换为布尔值
    if (typeof cookie.secure === 'string') {
      cookie.secure = cookie.secure.toLowerCase() === 'true';
    } else if (typeof cookie.secure === 'number') {
      cookie.secure = cookie.secure !== 0;
    } else {
      // 默认为false而不是报错
      cookie.secure = false;
    }
  }
  
  if (cookie.httpOnly !== undefined && typeof cookie.httpOnly !== 'boolean') {
    // 尝试转换为布尔值
    if (typeof cookie.httpOnly === 'string') {
      cookie.httpOnly = cookie.httpOnly.toLowerCase() === 'true';
    } else if (typeof cookie.httpOnly === 'number') {
      cookie.httpOnly = cookie.httpOnly !== 0;
    } else {
      // 默认为false而不是报错
      cookie.httpOnly = false;
    }
  }
  
  return errors;
}

// 导出函数
export const CookieValidator = {
  validateCookies,
  validateCookie
};