/**
 * Cookie format化工具模块
 * 提供将Cookie数据转换为不同格式的功能
 * 
 * 该模块包含以下主要功能:
 * 1. 将Cookie数据格式化为多种输出格式 (JSON, CSV, XML, Netscape)
 * 2. 解析不同格式的输入数据并转换为Cookie对象数组
 * 3. 提供XML转义等辅助功能
 * 
 * 支持的格式说明:
 * - JSON: JavaScript对象表示法，易于程序处理
 * - CSV: 逗号分隔值，适用于电子表格软件
 * - XML: 可扩展标记语言，结构化良好
 * - Netscape: Netscape Cookie格式，兼容curl等工具
 */

import { Utils } from '../utils/utils.js';

/**
 * Cookie 格式化工具模块
 * 提供将Cookie数据转换为不同格式和从不同格式解析Cookie数据的功能
 * 
 * 该模块包含以下主要功能:
 * 1. 将Cookie数据格式化为多种输出格式 (JSON, CSV, XML, Netscape)
 * 2. 解析不同格式的输入数据并转换为Cookie对象数组
 */

// 导入格式化功能
import { CookieFormatterBase } from './formatters/cookieFormatterBase.js';
// 导入解析功能
import { CookieParserBase } from './parsers/cookieParserBase.js';

// 合并导出所有功能
export const CookieFormatter = {
  // 格式化功能
  formatCookiesData: CookieFormatterBase.formatCookiesData,
  cookiesToCsv: CookieFormatterBase.cookiesToCsv,
  cookiesToXml: CookieFormatterBase.cookiesToXml,
  cookiesToNetscape: CookieFormatterBase.cookiesToNetscape,
  
  // 解析功能
  parseImportedCookies: CookieParserBase.parseImportedCookies,
  parseJsonCookies: CookieParserBase.parseJsonCookies,
  parseCsvCookies: CookieParserBase.parseCsvCookies,
  parseNetscapeCookies: CookieParserBase.parseNetscapeCookies,
  parseXmlCookies: CookieParserBase.parseXmlCookies,
  
  // 工具函数
  normalizeCookieFields: CookieParserBase.normalizeCookieFields
};
