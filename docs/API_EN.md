# API Documentation

## Module Structure

### Core Modules

Core modules located in the `js/modules/` directory provide the main functionality of the application.

#### PopupInitializer

Popup initializer responsible for initializing all popup functions.

##### Methods

- `initializePopup()`
  - Initialize the popup
  - Example:
    ```javascript
    import { PopupInitializer } from './js/modules/popupInitializer.js';
    document.addEventListener('DOMContentLoaded', function() {
      PopupInitializer.initializePopup();
    });
    ```

#### CookieOperations

Cookie operations module responsible for handling all Cookie-related operations.

##### Methods

- `updateCookieCount(cookieCountElement)`
  - Update Cookie count display
  - Parameters:
    - `cookieCountElement` (HTMLElement): Element to display Cookie count

- `updateFilteredCookieCount(cookieCountElement, cookieTypeSelect)`
  - Update Cookie count display based on filter conditions
  - Parameters:
    - `cookieCountElement` (HTMLElement): Element to display Cookie count
    - `cookieTypeSelect` (HTMLElement): Cookie type selection element

#### FileOperations

File operations module responsible for handling all file-related operations.

##### Methods

- `handleFileSelection(e, fileInput, browseFilesBtn, dropArea, importProgress, cookieCount)`
  - Handle file selection event
  - Parameters:
    - `e` (Event): Selection event
    - `fileInput` (HTMLInputElement): File input element
    - `browseFilesBtn` (HTMLElement): Browse files button
    - `dropArea` (HTMLElement): Drop area
    - `importProgress` (HTMLElement): Import progress bar element
    - `cookieCount` (HTMLElement): Cookie count display element

- `handleFileDrop(e, fileInput, dropArea, importProgress, cookieCount, browseFilesBtn)`
  - Handle file drop event
  - Parameters:
    - `e` (Event): Drop event
    - `fileInput` (HTMLInputElement): File input element
    - `dropArea` (HTMLElement): Drop area
    - `importProgress` (HTMLElement): Import progress bar element
    - `cookieCount` (HTMLElement): Cookie count display element
    - `browseFilesBtn` (HTMLElement): Browse files button

- `importSelectedFile(fileInput, browseFilesBtn, importProgress, cookieCount)`
  - Import selected file
  - Parameters:
    - `fileInput` (HTMLInputElement): File input element
    - `browseFilesBtn` (HTMLElement): Browse files button
    - `importProgress` (HTMLElement): Import progress bar element
    - `cookieCount` (HTMLElement): Cookie count display element

#### ExportOperations

Export operations module responsible for handling all export-related operations.

##### Methods

- `exportCurrentCookies(button, formatSelect, cookieTypeSelect, exportProgress, cookieCount)`
  - Export current website Cookies
  - Parameters:
    - `button` (HTMLElement): Button that triggers export
    - `formatSelect` (HTMLElement): Format selection element
    - `cookieTypeSelect` (HTMLElement): Cookie type selection element
    - `exportProgress` (HTMLElement): Export progress bar element
    - `cookieCount` (HTMLElement): Cookie count display element

- `exportAllCookies(button, formatSelect, cookieTypeSelect, exportProgress, cookieCount)`
  - Export all Cookies
  - Parameters:
    - `button` (HTMLElement): Button that triggers export
    - `formatSelect` (HTMLElement): Format selection element
    - `cookieTypeSelect` (HTMLElement): Cookie type selection element
    - `exportProgress` (HTMLElement): Export progress bar element
    - `cookieCount` (HTMLElement): Cookie count display element

- `copyCurrentCookies(button, formatSelect, cookieTypeSelect, exportProgress, cookieCount)`
  - Copy current website Cookies to clipboard
  - Parameters:
    - `button` (HTMLElement): Button that triggers copy
    - `formatSelect` (HTMLElement): Format selection element
    - `cookieTypeSelect` (HTMLElement): Cookie type selection element
    - `exportProgress` (HTMLElement): Export progress bar element
    - `cookieCount` (HTMLElement): Cookie count display element

- `copyAllCookies(button, formatSelect, cookieTypeSelect, exportProgress, cookieCount)`
  - Copy all Cookies to clipboard
  - Parameters:
    - `button` (HTMLElement): Button that triggers copy
    - `formatSelect` (HTMLElement): Format selection element
    - `cookieTypeSelect` (HTMLElement): Cookie type selection element
    - `exportProgress` (HTMLElement): Export progress bar element
    - `cookieCount` (HTMLElement): Cookie count display element

#### ImportManager

Import manager module responsible for handling all import-related operations.

##### Methods

- `importCookies(file, triggerButton, importProgress, updateProgress, updateCookieCount, showResult, showError, uiManager, fileInput)`
  - Import Cookies
  - Parameters:
    - `file` (File): File to import
    - `triggerButton` (HTMLElement): Button that triggers import
    - `importProgress` (HTMLElement): Import progress bar element
    - `updateProgress` (Function): Function to update progress bar
    - `updateCookieCount` (Function): Function to update Cookie count
    - `showResult` (Function): Function to show result message
    - `showError` (Function): Function to show error message
    - `uiManager` (Object): UI manager
    - `fileInput` (HTMLInputElement): File input element

### Internationalization Module

Internationalization modules located in the `js/modules/i18n/` directory handle all localization and internationalization related functions.

#### I18nManager

Internationalization manager that handles all internationalization related functions.

##### Methods

- `getSupportedLanguages()`
  - Get list of supported languages
  - Return value:
    - (Array): Array of supported language codes

- `getCurrentLanguage()`
  - Get current language
  - Return value:
    - (string): Current language code

- `setCurrentLanguage(language)`
  - Set current language
  - Parameters:
    - `language` (string): Language code

- `getMessage(key, language)`
  - Get translated message for specified key
  - Parameters:
    - `key` (string): Translation key
    - `language` (string): Language code (optional, defaults to current language)
  - Return value:
    - (string): Translated message

- `formatMessage(key, params, language)`
  - Format message with parameter replacement
  - Parameters:
    - `key` (string): Translation key
    - `params` (Object): Parameter object
    - `language` (string): Language code (optional, defaults to current language)
  - Return value:
    - (string): Formatted message

- `applyLocalization(languageSelector, updateCookieCountFunction)`
  - Apply localization to interface elements
  - Parameters:
    - `languageSelector` (HTMLElement): Language selector element
    - `updateCookieCountFunction` (Function): Function to update Cookie count

### Error Handling Modules

Error handling modules located in the `js/modules/errors/` directory provide a unified error handling mechanism.

#### ErrorHandler

Core error handling functionality.

##### Methods

- `handleError(error, context, metadata)`
  - Handle and log errors
  - Parameters:
    - `error` (Error): Error object
    - `context` (string): Error context information
    - `metadata` (Object): Metadata

- `handleAsyncError(promise, context, metadata)`
  - Handle errors in asynchronous operations
  - Parameters:
    - `promise` (Promise): Asynchronous operation
    - `context` (string): Error context information
    - `metadata` (Object): Metadata
  - Return value:
    - (Promise): Wrapped Promise

- `withErrorHandling(fn, context)`
  - Add error handling decorator to function
  - Parameters:
    - `fn` (Function): Function to wrap
    - `context` (string): Error context information
  - Return value:
    - (Function): Wrapped function

#### ErrorLogger

Error logging functionality.

##### Methods

- `logError(type, operation, message, details)`
  - Log error
  - Parameters:
    - `type` (string): Error type
    - `operation` (string): Operation name
    - `message` (string): Error message
    - `details` (Object): Error details

- `logWarning(type, operation, message, details)`
  - Log warning
  - Parameters:
    - `type` (string): Warning type
    - `operation` (string): Operation name
    - `message` (string): Warning message
    - `details` (Object): Warning details

- `getErrorLogs()`
  - Get all error logs
  - Return value:
    - (Array): Error log array

- `clearErrorLogs()`
  - Clear all error logs

- `exportErrorLogs()`
  - Export error logs as text format
  - Return value:
    - (string): Formatted error log text

#### ErrorDisplay

Error display functionality.

##### Methods

- `displayError(error, resultDiv, options)`
  - Display general error message
  - Parameters:
    - `error` (string|Error): Error message or error object
    - `resultDiv` (HTMLElement): Result display element
    - `options` (Object): Display options

- `displayNetworkError(operation, details, resultDiv)`
  - Display network error
  - Parameters:
    - `operation` (string): Operation name
    - `details` (string): Error details
    - `resultDiv` (HTMLElement): Result display element

- `displayFileError(operation, details, resultDiv)`
  - Display file error
  - Parameters:
    - `operation` (string): Operation name
    - `details` (string): Error details
    - `resultDiv` (HTMLElement): Result display element

- `displayFormatError(format, details, resultDiv)`
  - Display format error
  - Parameters:
    - `format` (string): Format type
    - `details` (string): Error details
    - `resultDiv` (HTMLElement): Result display element

### Export Modules

Export modules located in the `js/modules/export/` directory handle all export related functions.

#### ExportHandler

Generic export handling functionality.

##### Methods

- `handleExport(sendMessageParams, button, defaultText, filename, shouldDownload, getExportFormat, showLoading, updateProgress, showError, showResult, downloadFile, updateCookieCount, getResultDiv, uiManager)`
  - Generic export handling function
  - Parameters:
    - `sendMessageParams` (Object): Message parameters to send to background
    - `button` (HTMLElement): Button that triggers export
    - `defaultText` (string): Button default text
    - `filename` (string): Download filename
    - `shouldDownload` (boolean): Whether to download file
    - `getExportFormat` (Function): Function to get export format
    - `showLoading` (Function): Function to show loading state
    - `updateProgress` (Function): Function to update progress bar
    - `showError` (Function): Function to show error message
    - `showResult` (Function): Function to show result message
    - `downloadFile` (Function): Function to download file
    - `updateCookieCount` (Function): Function to update Cookie count
    - `getResultDiv` (Function): Function to get result area
    - `uiManager` (Object): UI manager

#### CurrentExporter

Current website Cookie export functionality.

##### Methods

- `exportCurrentCookies(handleExport, button, getFilters, getExportFormat, showLoading, updateProgress, showError, showResult, downloadFile, updateCookieCount, getResultDiv, uiManager)`
  - Export current website Cookies
  - Parameters:
    - `handleExport` (Function): Export handling function
    - `button` (HTMLElement): Export button
    - `getFilters` (Function): Function to get filter conditions
    - `getExportFormat` (Function): Function to get export format
    - `showLoading` (Function): Function to show loading state
    - `updateProgress` (Function): Function to update progress bar
    - `showError` (Function): Function to show error message
    - `showResult` (Function): Function to show result message
    - `downloadFile` (Function): Function to download file
    - `updateCookieCount` (Function): Function to update Cookie count
    - `getResultDiv` (Function): Function to get result area
    - `uiManager` (Object): UI manager

- `copyCurrentCookies(handleExport, button, getFilters, getExportFormat, showLoading, updateProgress, showError, showResult, downloadFile, updateCookieCount, getResultDiv, uiManager)`
  - Copy current website Cookies to clipboard
  - Parameters are the same as above

#### AllExporter

All Cookie export functionality.

##### Methods

- `exportAllCookies(handleExport, button, getFilters, getExportFormat, showLoading, updateProgress, showError, showResult, downloadFile, updateCookieCount, getResultDiv, uiManager)`
  - Export all Cookies
  - Parameters:
    - `handleExport` (Function): Export handling function
    - `button` (HTMLElement): Export button
    - `getFilters` (Function): Function to get filter conditions
    - `getExportFormat` (Function): Function to get export format
    - `showLoading` (Function): Function to show loading state
    - `updateProgress` (Function): Function to update progress bar
    - `showError` (Function): Function to show error message
    - `showResult` (Function): Function to show result message
    - `downloadFile` (Function): Function to download file
    - `updateCookieCount` (Function): Function to update Cookie count
    - `getResultDiv` (Function): Function to get result area
    - `uiManager` (Object): UI manager

- `copyAllCookies(handleExport, button, getFilters, getExportFormat, showLoading, updateProgress, showError, showResult, downloadFile, updateCookieCount, getResultDiv, uiManager)`
  - Copy all Cookies to clipboard
  - Parameters are the same as above

#### ExportErrorHandler

Export module specific error handling tools.

##### Methods

- `handleTabQueryError(error, getResultDiv)`
  - Handle tab query error
  - Parameters:
    - `error` (Object): Error object returned by Chrome API
    - `getResultDiv` (Function): Function to get result area

- `handleInvalidTabError(getResultDiv)`
  - Handle invalid tab error
  - Parameters:
    - `getResultDiv` (Function): Function to get result area

### Import Module

Import module located in the `js/modules/importManager.js` file handles Cookie import functionality.

#### ImportManager

Cookie import functionality.

##### Methods

- `importCookies(fileInput, triggerButton, importProgress, showLoading, updateProgress, showError, showResult, updateCookieCount, getResultDiv, uiManager)`
  - Import Cookies
  - Parameters:
    - `fileInput` (HTMLElement): File input element
    - `triggerButton` (HTMLElement): Button that triggers import
    - `importProgress` (HTMLElement): Import progress bar element
    - `showLoading` (Function): Function to show loading state
    - `updateProgress` (Function): Function to update progress bar
    - `showError` (Function): Function to show error message
    - `showResult` (Function): Function to show result message
    - `updateCookieCount` (Function): Function to update Cookie count
    - `getResultDiv` (Function): Function to get result area
    - `uiManager` (Object): UI manager

### UI Module

UI module located in the `js/ui/uiManager.js` file handles user interface related functions.

#### UIManager

UI management functionality.

##### Methods

- `showLoading(message, resultDiv)`
  - Show loading state
  - Parameters:
    - `message` (string): Loading message to display
    - `resultDiv` (HTMLElement): Result display element

- `showResult(message, type, resultDiv)`
  - Show result message
  - Parameters:
    - `message` (string): Message to display
    - `type` (string): Message type (success|error|loading)
    - `resultDiv` (HTMLElement): Result display element

- `showError(message, details, resultDiv)`
  - Show detailed error message
  - Parameters:
    - `message` (string): Error message
    - `details` (Array|string): Detailed error information
    - `resultDiv` (HTMLElement): Result display element

- `showNetworkError(operation, error, resultDiv)`
  - Show network error
  - Parameters:
    - `operation` (string): Operation name
    - `error` (string): Error details
    - `resultDiv` (HTMLElement): Result display element

- `showFileError(operation, error, resultDiv)`
  - Show file error
  - Parameters:
    - `operation` (string): Operation name
    - `error` (string): Error details
    - `resultDiv` (HTMLElement): Result display element

- `showFormatError(format, error, resultDiv)`
  - Show format error
  - Parameters:
    - `format` (string): Format type
    - `error` (string): Error details
    - `resultDiv` (HTMLElement): Result display element

- `updateProgress(progressContainer, progress)`
  - Update progress bar
  - Parameters:
    - `progressContainer` (HTMLElement): Progress bar container element
    - `progress` (number): Progress value (0-100)

- `handleDragOver(e, dropArea)`
  - Handle drag over event
  - Parameters:
    - `e` (Event): Drag event
    - `dropArea` (HTMLElement): Drop area element

- `handleDragLeave(e, dropArea)`
  - Handle drag leave event
  - Parameters:
    - `e` (Event): Drag event
    - `dropArea` (HTMLElement): Drop area element

- `handleDrop(e, dropArea, fileInput)`
  - Handle file drop event
  - Parameters:
    - `e` (Event): Drag event
    - `dropArea` (HTMLElement): Drop area element
    - `fileInput` (HTMLElement): File input element

- `handleFileSelect(e, dropArea)`
  - Handle file selection event
  - Parameters:
    - `e` (Event): Selection event
    - `dropArea` (HTMLElement): Drop area element

### Utility Module

Utility module located in the `js/utils/utils.js` file provides general utility functions.

#### Utils

Utility function collection.

##### Methods

- `escapeHtml(unsafe)`
  - Escape HTML characters
  - Parameters:
    - `unsafe` (string): Unsafe HTML string
  - Return value:
    - (string): Escaped HTML string

- `escapeXml(unsafe)`
  - Escape XML characters
  - Parameters:
    - `unsafe` (string): Unsafe XML string
  - Return value:
    - (string): Escaped XML string

- `getDomain(url)`
  - Extract domain from URL
  - Parameters:
    - `url` (string): Full URL
  - Return value:
    - (string): Domain

- `detectFileFormat(filename)`
  - Automatically detect file format based on file extension
  - Parameters:
    - `filename` (string): Filename
  - Return value:
    - (string): Detected file format

## Usage Examples

### Initialize Popup

```javascript
// Initialize popup
import { PopupInitializer } from './js/modules/popupInitializer.js';

document.addEventListener('DOMContentLoaded', function() {
  PopupInitializer.initializePopup();
});
```

### Internationalization Usage Example

```javascript
// Get translated text
import { I18n } from './js/modules/i18n/index.js';

// Get simple text
const exportText = I18n.getMessage('exportTab');

// Get parameterized text
const cookieCountText = I18n.formatMessage('cookiesLoaded', { count: 10 });

// Apply localization
const languageSelector = document.getElementById('language-selector');
I18n.applyLocalization(languageSelector, updateCookieCount);
```

### Export Current Website Cookies

```javascript
// Export current website Cookies as JSON format file
import { ExportOperations } from './js/modules/exportOperations.js';

const {
  exportCurrentBtn,
  formatSelect,
  cookieTypeSelect,
  exportProgress,
  cookieCount
} = DOMManager.getDOMElements();

ExportOperations.exportCurrentCookies(
  exportCurrentBtn,
  formatSelect,
  cookieTypeSelect,
  exportProgress,
  cookieCount
);
```

### Copy All Cookies to Clipboard

```javascript
// Copy all Cookies to clipboard
import { ExportOperations } from './js/modules/exportOperations.js';

const {
  copyAllBtn,
  formatSelect,
  cookieTypeSelect,
  exportProgress,
  cookieCount
} = DOMManager.getDOMElements();

ExportOperations.copyAllCookies(
  copyAllBtn,
  formatSelect,
  cookieTypeSelect,
  exportProgress,
  cookieCount
);
```

### Import Cookies

```javascript
// Import Cookies from file
import { FileOperations } from './js/modules/fileOperations.js';

const {
  fileInput,
  browseFilesBtn,
  dropArea,
  importProgress,
  cookieCount
} = DOMManager.getDOMElements();

FileOperations.importSelectedFile(
  fileInput,
  browseFilesBtn,
  importProgress,
  cookieCount
);
```