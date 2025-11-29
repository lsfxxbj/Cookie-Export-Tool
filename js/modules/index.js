/**
 * 模块入口文件
 * 统一导出所有模块接口
 */

// 导出各个功能模块
export { CookieCounter } from './cookieCounter.js';
export { CookieFormatter } from './cookieFormatter.js';
export { CookieValidator } from './cookieValidator.js';
export { DOMManager } from './domManager.js';
export { DownloadManager } from './downloadManager.js';
export { ErrorLogger } from './errorLogger.js';
export { FilterManager } from './filterManager.js';
export { ImportManager } from './importManager.js';
export { LocalizationManager } from './localizationManager.js';
export { UIManager } from '../ui/uiManager.js';
export { Utils } from '../utils/utils.js';
export { I18n } from './i18n/index.js';
export { EventListeners } from './eventListeners/index.js';
export { UserConfig } from './userConfig/index.js';

// 导出拆分后的导出管理模块
export { ExportHandler } from './export/exportHandler.js';
export { CurrentExporter } from './export/currentExporter.js';
export { AllExporter } from './export/allExporter.js';

// 导出新增的模块
export { ExportOperations } from './exportOperations.js';
export { FileOperations } from './fileOperations.js';
export { CookieOperations } from './cookieOperations.js';
export { PopupInitializer } from './popupInitializer.js';

// 导出拆分后的本地化模块
export { translations } from './localization/translations.js';
export { LocalizationHandler } from './localization/localizationHandler.js';

// 导出依赖注入容器
export { container } from './di/Container.js';