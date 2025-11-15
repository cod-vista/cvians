## Overview

* Remove React context usage that causes stale rendering when datasets change without length change.

* Introduce a per-table external store built only with React (no new packages) to isolate updates and fix rerender issues.

* Rework filters to scale to 10k+ rows, add option pagination (50/page), show accurate counts, handle null/undefined consistently, and support case-sensitive/insensitive modes.

* Integrate filtering/sorting with body rendering so visible rows always reflect active filters/sort.

* Provide tests and benchmarks using plain TypeScript/JS harnesses (no test frameworks).

## Reported Bug & Root Cause

* Symptom: Rendering a different dataset of the same length shows stale filter options/rows.

* Cause: Length-based guard preventing recomputation in header unique-values logic.

  * Reference: `packages/excel-table/src/components/excel-table.tsx:1187–1224` tracks `previousRowsLength` and skips recompute when length unchanged.

* Fix: Remove the length guard and invalidate caches on data change using a `rowsVersion` increment keyed off `rawRows` reference changes.

## State Management (Context Removal)

* Delete `TableContext` and stop using `useContext`.

  * Reference: `packages/excel-table/src/components/excel-table-context.tsx:39`.

* Implement `ExcelTableStore` per instance using React `useRef` + `useSyncExternalStore` (built-in React, not a new dependency).

  * Store fields: `rows`, `rowsVersion`, `filters`, `dateFilters`, `sorts`, `columnTypes`.

  * Actions: `setRows`, `setFilter`, `setDateFilter`, `setSort`, `registerColumn`.

  * Selectors: `selectFilteredRows`, `selectOptionsWithCounts(column)`, `selectSort`.

* Pass the store to `ExcelTableHead`, `ExcelTableBody`, and related components via props to maintain component isolation and precise subscriptions.

## Filter Improvements

* Options & counts:

  * Build per-column `Map<canonicalValue, count>` in O(n) over `rows`; cache per `rowsVersion`.

  * Canonicalize values: strings (lowercased when insensitive), numbers, booleans, dates, nullish → special `(empty)` token.

* Pagination:

  * In the filter popover, render options with client-side paging at 50 items per page using existing UI components; no new libs.

* Case sensitivity:

  * Per-column flag toggled in UI; comparisons respect the mode.

* Date filters:

  * Reuse existing `matchesDateFilter` logic; ensure it only applies to date-typed columns.

* Maintain filter state on data updates:

  * Preserve selected options across `setRows`; recompute counts; keep selected values even if their count becomes zero.

## Core Behavior Corrections

* Apply all filter conditions exactly as specified using inclusion sets per column after canonicalization.

* Null/undefined handled consistently and displayed as `(empty)` with accurate counts.

* Sorting remains type-aware and operates on extracted values; caches invalidated on `rowsVersion` to avoid stale comparisons.

## Rendering Integration

* Update `ExcelTableBody` to render `selectFilteredRows()` instead of raw children to ensure filters/sort affect visible rows.

* Remove length-based memo optim

