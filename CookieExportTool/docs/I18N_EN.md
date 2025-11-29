# Internationalization Documentation

## Table of Contents

- [Overview](#overview)
- [Supported Languages](#supported-languages)
- [Language Detection and Switching](#language-detection-and-switching)
- [Translation Resource Management](#translation-resource-management)
- [Localization Implementation](#localization-implementation)
- [Adding New Languages](#adding-new-languages)
- [Best Practices](#best-practices)

## Overview

The Cookie Exporter extension supports multilingual interfaces, aiming to provide a friendly user experience for global users. The project adopts modern internationalization (i18n) and localization (l10n) practices, implementing flexible language support through modular design.

## Supported Languages

The project currently supports the following three languages:

1. **Chinese (zh-CN)** - Simplified Chinese
2. **English (en)** - English
3. **French (fr)** - French

Language selection is based on the user's browser language settings, while also allowing users to manually switch languages.

## Language Detection and Switching

### Automatic Language Detection

The extension automatically detects the user's browser language settings and selects the default language according to the following priority:

1. If the browser language is in the supported list, use that language
2. If the browser language starts with "zh", use Chinese
3. Otherwise, default to English

Related code is implemented in [popupInitializer.js](../js/modules/popupInitializer.js):

```javascript
// First try to get language settings from storage, if not, use browser default language
UserConfig.getLanguage(function(savedLanguage) {
  if (!savedLanguage) {
    // Get browser UI language
    const browserLanguage = chrome.i18n.getUILanguage();
    
    // Set default language based on browser language
    const supportedLanguages = I18n.getSupportedLanguages();
    if (supportedLanguages.includes(browserLanguage)) {
      savedLanguage = browserLanguage;
    } else if (browserLanguage.startsWith('zh')) {
      savedLanguage = 'zh-CN';
    } else {
      // Default to English
      savedLanguage = 'en';
    }
    
    // Save language settings
    UserConfig.setLanguage(savedLanguage);
  }
  
  // Set the value of the language selector
  languageSelector.value = savedLanguage;
  
  // Apply interface localization settings
  LocalizationManager.applyLocalization(languageSelector, () => CookieCounter.updateCookieCount(cookieCount));
});
```

### Manual Language Switching

Users can manually switch languages through the language selector at the top of the interface. Language switching functionality is implemented in [popupInitializer.js](../js/modules/popupInitializer.js):

```javascript
/**
 * Switch language
 */
function changeLanguage(languageSelector, cookieCount) {
  const selectedLanguage = languageSelector.value;
  console.log('Changing language to:', selectedLanguage);
  
  // Save language settings to storage
  UserConfig.setLanguage(selectedLanguage, function() {
    console.log('Language setting saved: ' + selectedLanguage);
  });
  
  // Re-apply localization to update interface text
  LocalizationManager.applyLocalization(languageSelector, () => CookieCounter.updateCookieCount(cookieCount));
  console.log('Localization applied');
  
  // Show language switching success message
  const lang = languageSelector.value;
  const langNames = {
    'zh-CN': I18n.getMessage("chinese"),
    'en': I18n.getMessage("english"),
    'fr': I18n.getMessage("french")
  };
  const resultDiv = DOMManager.getResultDiv();
  if (resultDiv) UIManager.showResult(`${I18n.getMessage("languageChanged")} ${langNames[lang] || lang}`, 'success', resultDiv);
  setTimeout(() => {
    const resultDiv = DOMManager.getResultDiv();
    if (resultDiv) resultDiv.classList.remove('visible');
  }, 1500);
}
```

## Translation Resource Management

Translation resources are managed through two methods:

### 1. Chrome Extension Standard Format

In the [_locales](../_locales/) directory, each language has a corresponding subdirectory containing a [messages.json](../_locales/zh_CN/messages.json) file:

```
_locales/
├── zh_CN/
│   └── messages.json
├── en/
│   └── messages.json
└── fr/
    └── messages.json
```

Each [messages.json](../_locales/zh_CN/messages.json) file contains translation resources in key-value pair form:

```json
{
  "extensionName": {
    "message": "Cookie Export Tool"
  },
  "exportTab": {
    "message": "Export"
  }
}
```

### 2. Custom Translation Mapping

In [js/modules/localization/translations.js](../js/modules/localization/translations.js), a JavaScript object form translation mapping table is maintained:

```javascript
export const translations = {
  "zh-CN": {
    "extensionName": "Cookie 导出工具",
    "exportTab": "导出"
  },
  "en": {
    "extensionName": "Cookie Export Tool",
    "exportTab": "Export"
  },
  "fr": {
    "extensionName": "Outil d'exportation de cookies",
    "exportTab": "Exporter"
  }
};
```

This method is mainly used for runtime dynamic translation and some special localization needs.

## Localization Implementation

Localization is implemented through the [I18nManager](../js/modules/i18n/i18nManager.js) module, mainly including the following aspects:

### 1. HTML Element Localization

Use the `data-i18n` attribute to mark elements that need localization:

```html
<button id="export-current-btn" data-i18n="exportCurrent">Export Current Site Cookies</button>
<span id="cookie-count" data-i18n="cookieCountInitialText">Cookies: 0</span>
```

### 2. Placeholder Localization

Use the `data-i18n-placeholder` attribute to mark input elements that need localized placeholders:

```html
<input type="text" id="domain-filter" data-i18n-placeholder="domainFilterPlaceholder" placeholder="e.g.: example.com">
```

### 3. ARIA Label Localization

Use the `data-i18n-aria-label` attribute to mark elements that need localized aria-label:

```html
<select id="format-select" data-i18n-aria-label="exportFormatAriaLabel">
  <option value="json" data-i18n="jsonFormat">JSON</option>
  <option value="csv" data-i18n="csvFormat">CSV</option>
</select>
```

### 4. Localization Application Function

The [I18nManager.applyLocalization()](file:///C:/Users/82490/Desktop/PythonProject/js/modules/i18n/i18nManager.js) function is responsible for applying localization:

```javascript
/**
 * Apply localization to interface elements
 * @param {HTMLElement} languageSelector - Language selector element
 * @param {Function} updateCookieCountFunction - Function to update Cookie count
 */
function applyLocalization(languageSelector, updateCookieCountFunction) {
  console.log('Applying localization');
  // Get the currently selected language
  const currentLanguage = languageSelector.value;
  console.log('Current selected language:', currentLanguage);
  
  // Localize all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const message = getLocalizedMessage(key, currentLanguage);
    console.log('Localizing element:', element, 'Key:', key, 'Message:', message);
    if (message) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = message;
      } else if (element.tagName === 'TITLE') {
        // Special handling for title element
        document.title = message;
      } else if (element.tagName === 'OPTION') {
        // Special handling for option element
        element.textContent = message;
      } else {
        // For ordinary elements, directly update textContent
        element.textContent = message;
        console.log('Updated element content to', message);
      }
    }
  });
  
  // Localize options within select elements
  document.querySelectorAll('select[data-i18n-aria-label]').forEach(select => {
    select.querySelectorAll('option[data-i18n]').forEach(option => {
      const key = option.getAttribute('data-i18n');
      const message = getLocalizedMessage(key, currentLanguage);
      if (message) {
        option.textContent = message;
      }
    });
  });
  
  // Localize placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const message = getLocalizedMessage(key, currentLanguage);
    if (message) {
      element.placeholder = message;
    }
  });
  
  // Localize aria-label attribute
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const key = element.getAttribute('data-i18n-aria');
    const message = getLocalizedMessage(key, currentLanguage);
    if (message) {
      element.setAttribute('aria-label', message);
    }
  });
  
  // Localize aria-label attribute (using data-i18n-aria-label)
  document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
    const key = element.getAttribute('data-i18n-aria-label');
    const message = getLocalizedMessage(key, currentLanguage);
    if (message) {
      element.setAttribute('aria-label', message);
    }
  });
  
  // Update HTML lang attribute
  document.documentElement.lang = currentLanguage;
  
  // Update Cookie count
  if (updateCookieCountFunction) {
    updateCookieCountFunction();
  }
}
```

## Adding New Languages

To add support for a new language, follow these steps:

### 1. Create Language Directory

Create a subdirectory for the new language in the [_locales](../_locales/) directory, for example, `es` for Spanish.

### 2. Create Message File

Create a [messages.json](../_locales/zh_CN/messages.json) file in the newly created language directory, containing all translation key-value pairs:

```json
{
  "extensionName": {
    "message": "Cookie Export Tool"
  },
  "exportTab": {
    "message": "Export"
  }
}
```

### 3. Update Translation Mapping

Add the new language's translation mapping in [js/modules/localization/translations.js](../js/modules/localization/translations.js):

```javascript
export const translations = {
  // ... other languages
  "es": {
    "extensionName": "Herramienta de Exportación de Cookies",
    "exportTab": "Exportar"
  }
};
```

### 4. Add Language Option

Add the new language option in [popup.html](../popup.html):

```html
<select id="language-selector">
  <!-- other options -->
  <option value="es" data-i18n="spanish">Español</option>
</select>
```

Also add the `spanish` key translation in all language translation files.

### 5. Update Language List

Update the supported language list in [js/modules/i18n/i18nManager.js](../js/modules/i18n/i18nManager.js):

```javascript
/**
 * Get list of supported languages
 * @returns {Array} Array of supported language codes
 */
function getSupportedLanguages() {
  return ['zh-CN', 'en', 'fr', 'es'];
}
```

## Best Practices

### 1. String Externalization

All user-visible strings should be externalized to translation resource files, avoiding hardcoding in the code.

### 2. Consistent Key Naming

Use consistent and meaningful key names, for example, using functional descriptions as prefixes:
- `exportTab` - Export tab
- `importTab` - Import tab
- `exportCurrent` - Export current website
- `copyAll` - Copy all

### 3. Parameterized Messages

For messages containing dynamic content, use parameterized format:

```json
{
  "importSuccess": {
    "message": "Successfully imported $count$ Cookies",
    "placeholders": {
      "count": {
        "content": "$1",
        "example": "10"
      }
    }
  }
}
```

In code, use:

```javascript
I18n.formatMessage("importSuccess", [count])
```

### 4. Test All Languages

Ensure testing the interface in all supported language environments, checking:
- Whether text is correctly translated
- Whether layout is reasonable (text length may vary in different languages)
- Whether functions work properly

### 5. Maintain Synchronization

When adding new features or modifying the interface, ensure:
- Update translation files for all languages
- Add new translation keys
- Remove unused translation keys