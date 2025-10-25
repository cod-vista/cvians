---
"@codvista/cvians-excel-table": patch
---

Fix HTML attributes support in wrapper components

- Updated wrapper components to extend proper HTML element interfaces
- All Excel table components now accept standard HTML attributes like onClick, className, id, data-*, style, etc.
- Improved TypeScript support for natural HTML attribute usage
- Components now behave more naturally and accept all standard DOM element props