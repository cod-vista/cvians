# Cvians UI

## Overview

- Cvians is a TypeScript React/Preact component library designed to provide high‑quality, framework‑friendly UI building blocks.  
- It follows shadcn-style conventions and ships with a lightweight CLI to install components into existing projects with predictable structure and utilities.  
- The first stable component is an Excel‑like table that brings first‑class filtering, sorting, date handling, and pagination while preserving plain HTML table semantics.  
- Components share consistent primitives, accessibility defaults, and styling practices; each component can be adopted incrementally via the CLI or direct imports.  
- The table engine is context-driven and data‑type aware, enabling accurate numeric, boolean, and date operations without forcing consumers into a custom data model.  
- The monorepo uses pnpm and Turborepo for builds, Changesets for versioning, and GitHub Actions for CI and automated releases.  
- The design favors zero-backend coupling and SSR compatibility, making it usable across React frameworks (Next.js, Vite, CRA) and with Preact via compat.

## Problem It Solves

- Teams need reliable, accessible UI pieces that fit existing React codebases without heavy rewrites or bespoke design systems.  
- Many table/grid solutions are heavyweight or require non‑HTML data models; typical UI kits don’t provide Excel‑like interactions out of the box.  
- Cvians standardizes component structure and styling, and provides a CLI to automate file placement and utilities. The Excel Table component addresses the concrete need for spreadsheet‑style interactions in internal tools and admin UIs.

## Target Users

- Frontend engineers building React or Next.js apps who want table UX beyond basic HTML tables.  
- Internal tools and operations dashboards that need quick, reliable filtering/sorting with minimal setup.  
- Teams standardizing on shadcn-style component organization and Tailwind-based styling.  
- Preact users that want React-compatible UI primitives via compat.

## Architecture & Technical Design

- Backend structure
  - No backend included. This repository is a frontend UI library plus a CLI. Data is passed in via table cells; no server APIs or database are required.
- Frontend structure
  - Monorepo with pnpm/Turborepo. Current packages include the Excel Table component at packages/excel-table and the CLI at packages/cli.  
  - Component model: shared UI primitives (shadcn-style), Tailwind utilities, and consistent prop conventions across components.  
  - The Excel Table is implemented as a set of components and a context that manages filters, sorts, date filters, and pagination state. See [excel-table.tsx](/packages/excel-table/src/components/excel-table.tsx) and the context definition in [excel-table-context.tsx](/packages/excel-table/src/components/excel-table-context.tsx#L22-L40).  
  - To keep server components clean, a wrapper re-exports client components without requiring consumers to sprinkle "use client". See [excel-table-wrapper.tsx](/packages/excel-table/src/components/excel-table-wrapper.tsx).  
  - UI primitives are local shadcn-style components using Tailwind utilities, for example [table.tsx](/packages/excel-table/src/components/ui/table.tsx).
- Database design approach
  - None. The library is view‑layer only and operates on rendered table rows; it extracts and normalizes cell content for typed operations.
- Key integrations
  - Radix UI primitives (accordion, popover, select), lucide-react icons, Tailwind utility classes, and shadcn conventions. Preact supported via react/compat and a tiny framework layer ([framework.ts](/packages/excel-table/src/lib/framework.ts)).  
  - Tooling: pnpm + Turborepo, TypeScript, ESLint, GitHub Actions, Changesets.
- Patterns used
  - Context-based state management for column registration, filter/sort coordination, and derived row computation.  
  - Layered/Modular architecture: UI primitives, table logic, framework compatibility, and a thin SSR-friendly wrapper.  
  - Single-responsibility components with memoization for rows/cells.
- Scalability considerations
  - Sorting uses a value cache during comparisons; raw rows are copied before in-place sort to avoid mutating state. See getFilteredAndSortedData in [excel-table.tsx](/packages/excel-table/src/components/excel-table.tsx#L955-L1083).  
  - Extract/normalize paths handle strings, numbers, booleans, and dates consistently. See extractCellValue in [excel-table.tsx](/packages/excel-table/src/components/excel-table.tsx#L826-L877).  
  - Row and cell components are memoized to avoid unnecessary re-renders.

## Key Features

- Component library fundamentals: TypeScript-first, shadcn-compatible primitives, accessible by default, and SSR-friendly exports.  
- CLI-driven installation that places files and utilities consistently; components are adoptable individually.  
- React and Preact compatibility without forking component logic.  
- Current stable component — Excel Table:
  - Excel-like filtering with unique-value checklists and per-column case sensitivity.  
  - Typed sorting and filtering across string, number, boolean, and date columns, including relative and range-based date filters.  
  - Optional client-side pagination with simple controls.  
  - Preserves standard HTML table ergonomics for incremental adoption.

## Automation & Optimization

- CLI automates project setup (components/ui, lib/utils.ts, components.json) and component installation. See [init.ts](/packages/cli/src/commands/init.ts) and [add.ts](/packages/cli/src/commands/add.ts).  
- CI builds, lints, and type-checks on push/PR; release workflow builds and publishes via Changesets. See [ci.yml](/.github/workflows/ci.yml) and [release.yml](/.github/workflows/release.yml).  
- Turborepo task graph caches artifacts across packages; pnpm manages workspaces efficiently.

## Installation & Setup

- Use in an app
  - For the Excel Table:  
    - npm: npm install @codvista/cvians-excel-table  
    - pnpm: pnpm add @codvista/cvians-excel-table
- Optional CLI
  - npm install -g @codvista/cvians-cli  
  - cvians init  
  - cvians add excel-table  
  - Future components will be installed with the same workflow as they are added to the library.
- Monorepo development
  - Node 18+, pnpm 8+.  
  - pnpm install  
  - pnpm build (or pnpm dev via Turborepo tasks).

## Example Usage

```tsx
import {
  ExcelTable,
  ExcelTableHeader,
  ExcelTableHead,
  ExcelTableBody,
  ExcelTableRow,
  ExcelTableCell,
} from "@codvista/cvians-excel-table";

export function BasicExample() {
  const data = [
    { id: 1, name: "Alice", age: 30, active: true, joined: "2023-01-15" },
    { id: 2, name: "Bob", age: 25, active: false, joined: "2023-03-20" },
    { id: 3, name: "Carol", age: 35, active: true, joined: "2022-11-10" },
  ];

  return (
    <ExcelTable>
      <ExcelTableHeader>
        <ExcelTableRow>
          <ExcelTableHead sortable dataType="number">ID</ExcelTableHead>
          <ExcelTableHead filterable sortable dataType="string">Name</ExcelTableHead>
          <ExcelTableHead filterable sortable dataType="number">Age</ExcelTableHead>
          <ExcelTableHead filterable dataType="boolean">Active</ExcelTableHead>
          <ExcelTableHead filterable sortable dataType="date">Joined</ExcelTableHead>
        </ExcelTableRow>
      </ExcelTableHeader>
      <ExcelTableBody pagination defaultRowsPerPage={20}>
        {data.map((row) => (
          <ExcelTableRow key={row.id}>
            <ExcelTableCell>{row.id}</ExcelTableCell>
            <ExcelTableCell>{row.name}</ExcelTableCell>
            <ExcelTableCell>{row.age}</ExcelTableCell>
            <ExcelTableCell>{row.active ? "true" : "false"}</ExcelTableCell>
            <ExcelTableCell>{row.joined}</ExcelTableCell>
          </ExcelTableRow>
        ))}
      </ExcelTableBody>
    </ExcelTable>
  );
}
```

## Engineering Highlights

- Performance decisions
  - Memoized row/cell components reduce re-renders; sort uses value caching and avoids mutating raw rows. See [excel-table.tsx](/packages/excel-table/src/components/excel-table.tsx#L955-L1083).  
  - Filters are applied in a single pass over rows, and date filters use normalized ISO strings for efficient matching.  
- Security decisions
  - No network or credential handling; library contains no secret management or remote calls. CI uses standard GitHub tokens for releases.  
- Design trade-offs
  - Single-column sort mirrors Excel’s straightforward UX and simplifies predictable ordering; multi-column could be added later.  
  - Operates on rendered table cells to preserve HTML ergonomics; in exchange, consumers must ensure cell contents are canonical for their data types.  
- Technology choices
  - Radix UI for accessible primitives; Tailwind/shadcn for consistent design tokens; TypeScript for maintainability; Turborepo + pnpm for efficient multi-package builds; Changesets for safe versioning.

## Future Improvements

- Additional components across forms, navigation, feedback, and layout with the same conventions.  
- Multi-column stable sort with priority indicators in table headers.  
- Virtualized rendering for very large datasets in the table.  
- Column resizing and reordering.  
- Export helpers (CSV/Excel) respecting active filters and sort.  
- Extended CLI recipes for framework-specific setup (Next.js App Router, Vite SSR).
