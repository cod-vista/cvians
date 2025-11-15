## 2.6.0 (2025-11-15)

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
