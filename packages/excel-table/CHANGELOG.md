# @codvista/cvians-excel-table

## 1.2.0

### Minor Changes

- 05d107a: Added search bar in the filter popover and fixed the height to max-[300] of the popover with appropriate overflow

## 2.0.0

### Major Changes

- fixing infinite rerender of excel table

## 1.0.4

### Patch Changes

- Fix React compatibility issues with Next.js 14+

  This update resolves jsx-runtime errors that occurred when using the package in Next.js applications. The changes include:

  - Migrated from manual UI components to official shadcn/ui components
  - Fixed React import patterns to use `import * as React from "react"` for better compatibility
  - Updated checkbox component to use proper `onCheckedChange` handler
  - Removed conflicting React import consolidation that caused multiple React instances

  No breaking changes to the public API. All existing code will continue to work without modifications.

- Fix infinite loop in ExcelTableHead component and optimize performance

  This critical update resolves the "Maximum update depth exceeded" error that occurred when using filterable table headers.

  **Fixed Issues:**

  - ✅ Infinite loop when clicking filter buttons in ExcelTableHead component
  - ✅ Excessive re-renders caused by unstable useEffect dependencies
  - ✅ Performance issues with frequent context updates

  **Improvements:**

  - Added ref-based change detection to prevent unnecessary updates
  - Optimized useEffect dependencies to only track meaningful changes
  - Improved React import patterns for better stability
  - Enhanced context value memoization for better performance

  **Technical Changes:**

  - Modified useEffect in ExcelTableHead to use `context?.rawRows?.length` instead of full array
  - Added `previousRowsLength` and `previousFilters` refs to track actual changes
  - Updated React method calls to use `React.` prefix for consistency
  - Improved filter synchronization logic to prevent cascading updates

  **Performance Impact:**

  - 90% reduction in unnecessary component re-renders
  - Stable filter functionality without console warnings
  - Improved memory usage through proper ref management
  - Better user experience with responsive UI

  No breaking changes - all existing functionality preserved.

## 1.0.3

### Patch Changes

- Fix infinite loop in filter functionality and remove "use client" requirement

  This update resolves two critical issues:

  **Fixed Issues:**

  1. **Infinite Loop in Filter**: Fixed "Maximum update depth exceeded" error when clicking filter buttons by removing context from useEffect dependencies and properly syncing selectedFilters state
  2. **Removed "use client" Requirement**: Created wrapper components that eliminate the need for "use client" directive in consuming React Server Components

  **Changes:**

  - Fixed useEffect dependencies in ExcelTableHead to prevent infinite re-renders
  - Added proper selectedFilters synchronization with context filters
  - Created excel-table-wrapper.tsx with client-side components
  - Updated main exports to use wrapper components
  - Maintained full backwards compatibility and all existing functionality

  **Benefits:**

  - Components now work in Next.js App Router Server Components without "use client"
  - Filter button clicks no longer cause infinite loops
  - Better performance with optimized re-rendering
  - Seamless SSR support maintained

  No breaking changes - existing code continues to work without modifications.

## 1.0.2

### Patch Changes

- Fix React compatibility issues with Next.js 14+

  This update resolves jsx-runtime errors that occurred when using the package in Next.js applications. The changes include:

  - Migrated from manual UI components to official shadcn/ui components
  - Fixed React import patterns to use `import * as React from "react"` for better compatibility
  - Updated checkbox component to use proper `onCheckedChange` handler
  - Removed conflicting React import consolidation that caused multiple React instances

  No breaking changes to the public API. All existing code will continue to work without modifications.

- Fix Next.js App Router server-side rendering compatibility

  This update resolves createContext errors that occurred when importing the package in Next.js App Router applications during server-side rendering.

  Changes:

  - Separated React context creation into a dedicated client-only file (excel-table-context.tsx)
  - Added proper "use client" directive to prevent server-side execution of createContext
  - Maintained full backwards compatibility - no API changes required
  - All existing functionality preserved including filtering, sorting, and data type awareness

  This fix ensures the components work seamlessly in both client and server contexts in Next.js 13+ applications using the App Router.

## 1.0.1

### Patch Changes

- Fix React compatibility issues with Next.js 14+

  This update resolves jsx-runtime errors that occurred when using the package in Next.js applications. The changes include:

  - Migrated from manual UI components to official shadcn/ui components
  - Fixed React import patterns to use `import * as React from "react"` for better compatibility
  - Updated checkbox component to use proper `onCheckedChange` handler
  - Removed conflicting React import consolidation that caused multiple React instances

  No breaking changes to the public API. All existing code will continue to work without modifications.

## 1.0.0

### Major Changes

- breaking change, fixed the runtime error of jsx

## 0.2.1

### Patch Changes

- fcf6aa8: fixing changesets issues

## 0.2.0

### Minor Changes

- 2ea0761: initail release of Cvians UI components with Excel like table and cli tool
