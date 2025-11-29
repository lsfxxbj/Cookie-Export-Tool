# Developer Guide

## Project Overview

Cookie Exporter is a Chrome extension for exporting, importing, and managing browser Cookies. The project adopts a modular design concept, splitting functions into multiple independent modules to improve code maintainability and extensibility.

## Technology Stack

- JavaScript (ES6+)
- HTML5
- CSS3
- Chrome Extension APIs

## Project Structure

```
.
├── _locales/                 # Internationalization resource files
├── js/
│   ├── modules/             # Core function modules
│   │   ├── errors/          # Error handling modules
│   │   ├── export/          # Export related modules
│   │   └── ...              # Other function modules
│   ├── ui/                  # UI management modules
│   └── utils/               # Utility function modules
├── background.js            # Background service worker
├── popup.js                 # Popup main script
├── popup.html               # Popup interface
├── popup.css                # Popup styles
├── manifest.json            # Extension manifest file
└── docs/                   # Documentation directory
```

## Modular Design

The project adopts modular design, with each function encapsulated in one or more modules. The benefits of this approach include:

1. **Maintainability** - Each module has clear responsibilities, making it easy to understand and modify
2. **Reusability** - Modules can be reused in different places
3. **Testability** - Each module can be tested independently
4. **Team Collaboration** - Different developers can work on different modules in parallel

### Core Module Dependencies

The following is a dependency diagram of modules in the project:

```
popup.js
  ↓
popupInitializer.js
  ↓ ↘
cookieOperations.js  exportOperations.js  fileOperations.js  eventListeners/index.js
  ↓                    ↓                  ↓                  ↓
cookieCounter.js    export/*           importManager.js   eventListenerManager.js
  ↓                    ↓                  ↓                  ↓
filterManager.js    export/*           ui/uiManager.js    DOMManager.js
  ↓                    ↓                  ↓                  ↓
i18n/index.js       ui/uiManager.js   DOMManager.js       ...
  ↓                    ↓                  ↓
DOMManager.js       DOMManager.js      i18n/index.js
  ↓                    ↓
ui/uiManager.js     i18n/index.js
  ↓
i18n/index.js
```

Module dependencies follow these principles:
1. **Avoid circular dependencies** - Modules should not form circular dependencies
2. **Layered dependencies** - Upper layer modules can depend on lower layer modules, but not vice versa
3. **Functional aggregation** - Related functions should be placed at the same level or adjacent levels

### Core Modules

#### Error Handling Modules

Error handling is an important part of any application. We have implemented a unified error handling mechanism in the `js/modules/errors/` directory:

- `ErrorHandler.js` - Core error handling logic
- `ErrorLogger.js` - Error logging
- `ErrorDisplay.js` - Error message display

All errors should be handled through these modules rather than using console or alert directly.

#### Data Processing Modules

Data processing modules are responsible for handling Cookie import and export:

- `export/` - Export related modules
- `importManager.js` - Import related functions

#### UI Modules

UI modules are responsible for handling user interface related functions:

- `ui/uiManager.js` - UI management functions

#### Internationalization Modules

Internationalization modules are responsible for all localization and internationalization related functions:

- `i18n/i18nManager.js` - Internationalization core functions
- `localization/translations.js` - Translation resources

The internationalization module supports three languages: Chinese (zh-CN), English (en), and French (fr), and automatically selects the default language based on the user's browser language.

## Coding Standards

### Naming Conventions

1. **Filenames** - Use camelCase, e.g., `errorHandler.js`
2. **Function names** - Use camelCase, e.g., `handleError`
3. **Variable names** - Use camelCase, e.g., `errorMessage`
4. **Constant names** - Use ALL_CAPS with underscores, e.g., `MAX_RETRY_COUNT`

### Parameter Naming Standards

Function parameter names must accurately reflect the actual variables being passed in, avoiding names that may cause confusion. For example, if a parameter actually receives a browse files button, it should be named `triggerButton` or a similar descriptive name.

Function parameters involving button elements should be uniformly named `button` or `triggerButton` to ensure consistency and accuracy throughout the project.

### Comment Standards

All functions need detailed JSDoc comments, including:

```javascript
/**
 * Function description
 * @param {Type} paramName - Parameter description
 * @returns {Type} Return value description
 */
function functionName(param) {
  // Function implementation
}
```

### Error Handling

All places where errors may occur should have error handling:

```javascript
try {
  // Code that may cause errors
} catch (error) {
  ErrorHandler.handleError(error, 'Context information');
}
```

## Internationalization

The project supports multiple languages through language packs in the `_locales/` directory. Use the `chrome.i18n.getMessage()` method to get localized strings.

### Language Support

The project supports the following three languages:
1. Chinese (zh-CN)
2. English (en)
3. French (fr)

### Automatic Language Detection

The extension automatically detects the user's browser language settings and selects the default language according to the following priority:
1. If the browser language is in the supported list, use that language
2. If the browser language starts with "zh", use Chinese
3. Otherwise, default to English

### Localization Implementation

Localization is implemented through the following methods:
1. Use `data-i18n` attribute to mark elements that need localization
2. Use `data-i18n-placeholder` attribute to mark input elements that need localized placeholders
3. Use `data-i18n-aria-label` attribute to mark elements that need localized aria-label
4. Apply localization through the `I18n.applyLocalization()` method

### Adding New Languages

To add support for a new language, follow these steps:
1. Create a subdirectory for the corresponding language in the `_locales/` directory
2. Create a `messages.json` file in that directory containing all translation key-value pairs
3. Add the language's translation mapping in `js/modules/localization/translations.js`
4. Add the corresponding language option in the language selector

## Testing

Currently, the project does not have automated testing, but we plan to add unit testing and integration testing in the future.

The following testing frameworks are recommended:

1. **Unit Testing** - Jest or Mocha
2. **Integration Testing** - Puppeteer or Selenium

Testing should cover the following aspects:

1. **Core Functions** - Cookie import/export functions
2. **Error Handling** - Handling of various exception situations
3. **UI Interaction** - Various operations on the user interface
4. **Data Validation** - Validation of input data
5. **Internationalization** - Behavior in different language environments

## Building and Deployment

### Development Environment Setup

1. Clone the project repository
2. Open `chrome://extensions/` in Chrome browser
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the project root directory

### Production Deployment

1. Ensure all function tests pass
2. Update version number in `manifest.json`
3. Package the extension
4. Submit to Chrome Web Store

## Performance Optimization

### UI Optimization

1. **Prevent UI Jumping** - Pre-set fixed height and width to prevent jumping caused by element size changes
2. **Animation Effects** - Use CSS animations to provide smooth user feedback
3. **Progress Bars** - Show progress bars during long operations to enhance user experience

### Code Optimization

1. **Avoid Duplicate DOM Queries** - Cache commonly used DOM element references
2. **Prevent Duplicate Clicks** - Prevent duplicate clicks during asynchronous operations
3. **Modular Design** - Decompose functions into small modules to improve maintainability

## Best Practices

### Module Design

1. **Single Responsibility Principle** - Each module should have only one reason to change
2. **Open/Closed Principle** - Modules should be open for extension but closed for modification
3. **Dependency Inversion Principle** - Depend on abstractions rather than concrete implementations

### Error Handling

1. **Unified Error Handling** - Use unified error handling modules
2. **Error Logging** - Log detailed error information for debugging
3. **User-Friendly Notifications** - Provide clear and understandable error messages to users

### Internationalization

1. **String Externalization** - All user-visible strings should be externalized
2. **Parameterized Messages** - Use parameterized messages to support dynamic content
3. **Language Consistency** - Ensure content consistency across all language versions