"use client";
import * as React from "react";
import type { ReactNode } from "react";
import type { DataType, DateFilter } from "../components/excel-table-context";
import { benchFilterPerformance } from "./bench";

function makeRow(cells: ReactNode[]): React.ReactElement {
  return React.createElement("tr", {}, cells.map((c, i) => React.createElement("td", { key: i }, c)));
}

export function runUnitTests() {
  const rows = [
    makeRow(["Alice", "", "true", "2024-01-02"]),
    makeRow(["bob", null as any, "false", "2024-01-03"]),
    makeRow(["ALICE", undefined as any, "true", "2024-02-01"]),
  ];
  const columnTypes: Record<string, DataType> = { "0": "string", "1": "string", "2": "boolean", "3": "date" };

  // Case-insensitive string filter
  const res1 = benchFilterPerformance(rows, columnTypes, { "0": ["alice"] }, {}, {});
  if (res1.processedRowsLength !== 2) throw new Error("Case-insensitive filter failed");

  // Null/undefined handling
  const res2 = benchFilterPerformance(rows, columnTypes, { "1": ["__EMPTY__"] }, {}, {});
  if (res2.processedRowsLength !== 3) throw new Error("Empty value handling failed");

  // Boolean filter
  const res3 = benchFilterPerformance(rows, columnTypes, { "2": ["true"] }, {}, {});
  if (res3.processedRowsLength !== 2) throw new Error("Boolean filter failed");

  // Date equals filter (via values set)
  const res4 = benchFilterPerformance(rows, columnTypes, { "3": ["2024-01-02"] }, {}, {});
  if (res4.processedRowsLength !== 1) throw new Error("Date equals failed");

  return "OK";
}

