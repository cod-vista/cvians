"use client"

import * as React from "react"
import type { ReactNode } from "react"

// Types
export type DataType = 'string' | 'number' | 'date' | 'boolean'
export type SortDirection = 'asc' | 'desc' | null

// Date filter types
export type DateFilterType = 'equals' | 'before' | 'after' | 'between' | 'relative'
export type RelativeDateType = 'today' | 'yesterday' | 'tomorrow' | 'thisWeek' | 'lastWeek' | 'nextWeek' | 'thisMonth' | 'lastMonth' | 'nextMonth' | 'thisYear' | 'lastYear'

export interface DateFilter {
  type: DateFilterType
  value?: string
  startDate?: string
  endDate?: string
  relative?: RelativeDateType
}

export interface TableContextType {
  filters: Record<string, string[]>
  dateFilters: Record<string, DateFilter[]>
  sorts: Record<string, SortDirection>
  setFilter: (column: string, values: string[]) => void
  setDateFilter: (column: string, filters: DateFilter[]) => void
  setSort: (column: string, direction: SortDirection) => void
  registerColumn: (column: string, dataType: DataType) => void
  getFilteredAndSortedData: () => ReactNode[]
  rawRows: ReactNode[]
  setRawRows: (rows: ReactNode[]) => void
  columnTypes: Record<string, DataType>
  headerRefs: Record<string, HTMLElement>
  setHeaderRef: (index: string, element: HTMLElement) => void
}

// Create context in client-only file
export const TableContext = React.createContext<TableContextType | null>(null)