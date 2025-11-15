"use client";
import * as React from "react";
import type { ReactNode } from "react";
import type { DateFilter, DataType, SortDirection } from "../components/excel-table-context";

const formatDate = (date: Date): string => date.toISOString().split("T")[0];

const extractCellValue = (
  cell: ReactNode,
  dataType: DataType
): string | number | boolean | Date => {
  if (typeof cell === "string" || typeof cell === "number") {
    const content = cell;
    switch (dataType) {
      case "number":
        return parseFloat(String(content)) || 0;
      case "date": {
        const date = new Date(String(content));
        return isNaN(date.getTime()) ? new Date() : date;
      }
      case "boolean": {
        if (typeof content === "boolean") return String(content);
        const strContent = String(content).toLowerCase();
        if (strContent === "true" || strContent === "1") return "true";
        if (strContent === "false" || strContent === "0") return "false";
        return String(Boolean(content));
      }
      default:
        return String(content);
    }
  }
  if (React.isValidElement(cell) && (cell.props as any)?.children) {
    const content = (cell.props as any).children;
    if (typeof content === "string" || typeof content === "number") {
      switch (dataType) {
        case "number":
          return parseFloat(String(content)) || 0;
        case "date": {
          const date = new Date(String(content));
          return isNaN(date.getTime()) ? new Date() : date;
        }
        case "boolean": {
          if (typeof content === "boolean") return String(content);
          const strContent = String(content).toLowerCase();
          if (strContent === "true" || strContent === "1") return "true";
          if (strContent === "false" || strContent === "0") return "false";
          return String(Boolean(content));
        }
        default:
          return String(content);
      }
    }
  }
  return "";
};

export function benchFilterPerformance(rows: ReactNode[], columnTypes: Record<string, DataType>, filters: Record<string, string[]>, dateFilters: Record<string, DateFilter[]>, sorts: Record<string, SortDirection>) {
  console.time("aggregate-options-10k");
  const counts: Record<string, number> = {};
  rows.forEach((row) => {
    if (!React.isValidElement(row)) return;
    const cells = React.Children.toArray((row.props as any).children);
    Object.keys(columnTypes).forEach((columnIndex) => {
      const colIdx = parseInt(columnIndex);
      const dataType = columnTypes[columnIndex] || "string";
      const v = extractCellValue(cells[colIdx], dataType);
      const key = v == null || v === "" ? "__EMPTY__" : String(v).toLowerCase();
      counts[key] = (counts[key] ?? 0) + 1;
    });
  });
  console.timeEnd("aggregate-options-10k");

  console.time("apply-filters-10k");
  let processedRows = rows;
  processedRows = processedRows.filter((row) => {
    if (!React.isValidElement(row)) return true;
    const cells = React.Children.toArray((row.props as any).children);
    for (const [columnIndex, filterValues] of Object.entries(filters)) {
      if (filterValues.length === 0) continue;
      const colIdx = parseInt(columnIndex);
      const dataType = columnTypes[columnIndex] || "string";
      const cellValue = extractCellValue(cells[colIdx], dataType);
      const canonical = (v: any) => (v == null || v === "" ? "__EMPTY__" : String(v).toLowerCase());
      const selected = new Set(filterValues.map((v) => String(v).toLowerCase()));
      if (!selected.has(canonical(cellValue))) return false;
    }
    return true;
  });
  console.timeEnd("apply-filters-10k");

  return { counts, processedRowsLength: processedRows.length };
}

