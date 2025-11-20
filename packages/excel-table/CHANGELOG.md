## 2.9.0 (2025-11-20)

### Stable Release - Rollback from v2.8.x

- **Complete rollback to v2.7.0 codebase** - All changes from v2.8.x reverted
- **Reason:** v2.8.0, v2.8.1, v2.8.2 caused critical issues (infinite loops, crashes, broken filtering)
- **Status:** Back to last known stable working version
- **Deprecated:** v2.8.0, v2.8.1, v2.8.2 marked as deprecated on npm

### What This Means:
- All functionality works exactly as in v2.7.0
- No new features or changes from v2.8.x
- Stable, tested, and working version
- Use this version instead of any 2.8.x version

## 2.8.2 (2025-11-20) - DEPRECATED

### DO NOT USE - Causes critical issues

## 2.8.1 (2025-11-20) - DEPRECATED

### DO NOT USE - Causes critical issues

## 2.8.0 (2025-11-20) - DEPRECATED

### DO NOT USE - Causes critical issues

## 2.8.2 (2025-11-20)

### Hotfix - Revert Sort Changes

- **Reverted sort comparison logic** - Removed try-catch and localeCompare that were causing issues
- **Kept array copy fix** - Still creates copy before sorting to prevent state mutation
- **Kept bounds checking** - Safety checks for column access remain in place
- **Kept error handling in unique values** - Prevents filter popover crashes

### What Changed:
- Sort logic reverted to original working implementation (v2.7.0)
- Only keeping the critical fix: array copy before sort to prevent mutation
- Sorting should now work exactly as it did before v2.8.0

## 2.8.1 (2025-11-20)

### Critical Hotfix

- **Fixed array mutation bug** - Sort operation was mutating the original rawRows array, causing React state corruption and crashes
- **Added bounds checking** - Prevent crashes when accessing columns that don't exist
- **Added error handling** - Wrapped unique values extraction in try-catch to prevent filter popover crashes
- **Fixed empty filter display** - Added validation to ensure column index is valid before extracting values

### What Was Fixed:
- Sort button now works without freezing the UI
- Filter popover correctly shows all data values (not empty)
- Page no longer crashes after sorting
- All features remain functional after sort operations

## 2.8.0 (2025-11-20)

### Critical Fixes

- **Fixed infinite render loop** - Removed nested `React.useMemo` inside `getFilteredAndSortedData` callback that caused React error #310
- **Fixed sort crashes** - Added comprehensive error handling to prevent application crashes during sort operations
- **Fixed filter application** - Corrected filter matching logic to properly handle empty values and case sensitivity
- **Fixed unique values extraction** - Properly handles null/undefined/empty values as filterable "(Empty)" option

### Performance Improvements

- **Optimized sort comparison** - Changed string comparison to use `localeCompare` for better performance
- **Single-pass filtering** - Improved filter processing for large datasets (10,000+ rows)
- **Removed unnecessary pagination** - Eliminated confusing pagination controls from filter popover, replaced with simple scrollable list
- **Updated pagination defaults** - Changed default rows per page from 30 to 100 for better large dataset handling

### UI Enhancements

- **Sticky header** - Table header now stays visible when scrolling with `position: sticky`
- **Cleaner filter UI** - Removed pagination buttons for more intuitive filter selection experience
- **Better empty value handling** - Empty/null values now clearly labeled as "(Empty)" and fully filterable

### Scalability

- All changes maintain backward compatibility
- No new dependencies added
- Optimized for datasets with 10,000+ rows
- Stable dependency arrays prevent unnecessary re-renders

## 2.6.0 (2025-11-15)

## 2.7.0

### Minor Changes

- stale UI issues fix

### Context Management

- Removed length-only recompute guard in header unique-value calculation to fix stale rendering when datasets change without length change.
- Preserved component isolation: header maintains its own UI state; table body reads filtered/sorted rows only when filters/sorts are active.

### Filter Functionality Improvements

- Added high-performance option aggregation with accurate counts for each value (including `(Empty)` for null/undefined).
- Implemented pagination in filter popovers (50 options per page) with prev/next controls.
- Ensured all available options are shown regardless of dataset size.
- Added per-column case sensitivity toggle; default is case-insensitive.

### Core Filter Behavior

- Applied all filter conditions exactly using inclusion sets after canonicalization.
- Consistent handling of null/undefined values as `(Empty)` in UI and `__EMPTY__` in internal matching.
- Supported case-sensitive and case-insensitive filtering paths.
- Maintained filter state and recomputed counts on data updates.

### Rendering Integration

- `ExcelTableBody` now renders filtered/sorted rows when filters/sorts are active, aligning visible output with filter state.

### Performance & Testing

- Optimized single-pass option aggregation for large datasets (10,000+ rows).
- Added dev-only performance benchmark harness (`src/dev/bench.ts`) and minimal unit tests (`src/dev/tests.ts`) without new dependencies.
- Verified rendering stability after removing problematic optimization.
- Prepared for manual cross-browser verification (Chrome, Firefox, Safari, Edge).

### Internal Notes

- No new external dependencies added.
- API remains compatible; improvements are non-breaking.
