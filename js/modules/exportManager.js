/**
 * 导出管理模块
 * 处理 Cookie 导出相关功能
 */

import { ExportHandler } from './export/exportHandler.js';
import { CurrentExporter } from './export/currentExporter.js';
import { AllExporter } from './export/allExporter.js';

// 重新导出所有函数，保持向后兼容性
export const ExportManager = {
  handleExport: ExportHandler.handleExport,
  exportCurrentCookies: CurrentExporter.exportCurrentCookies,
  exportAllCookies: AllExporter.exportAllCookies,
  copyCurrentCookies: CurrentExporter.copyCurrentCookies,
  copyAllCookies: AllExporter.copyAllCookies
};