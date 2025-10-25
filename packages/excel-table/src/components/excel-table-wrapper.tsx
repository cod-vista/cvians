"use client"

import * as React from "react"
import type { ReactNode } from "react"

// Import the main components but only for client-side use
import { 
  ExcelTable as ExcelTableClient,
  ExcelTableHeader as ExcelTableHeaderClient,
  ExcelTableHead as ExcelTableHeadClient,
  ExcelTableBody as ExcelTableBodyClient,
  ExcelTableRow as ExcelTableRowClient,
  ExcelTableCell as ExcelTableCellClient,
  type DataType,
  type SortDirection
} from './excel-table'

// Re-export types
export type { DataType, SortDirection }

// Create client-side wrapper components that can be imported without "use client"
export function ExcelTable({ children, className }: { children: ReactNode; className?: string }) {
  return <ExcelTableClient className={className}>{children}</ExcelTableClient>
}

export function ExcelTableHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <ExcelTableHeaderClient className={className}>{children}</ExcelTableHeaderClient>
}

export function ExcelTableHead({ 
  children, 
  filterable = false, 
  sortable = false, 
  dataType = 'string' as DataType,
  className 
}: { 
  children: ReactNode
  filterable?: boolean
  sortable?: boolean
  dataType?: DataType
  className?: string 
}) {
  return (
    <ExcelTableHeadClient 
      filterable={filterable} 
      sortable={sortable} 
      dataType={dataType}
      className={className}
    >
      {children}
    </ExcelTableHeadClient>
  )
}

export function ExcelTableBody({ children, className }: { children: ReactNode; className?: string }) {
  return <ExcelTableBodyClient className={className}>{children}</ExcelTableBodyClient>
}

export function ExcelTableRow({ children, className }: { children: ReactNode; className?: string }) {
  return <ExcelTableRowClient className={className}>{children}</ExcelTableRowClient>
}

export function ExcelTableCell({ children, className }: { children: ReactNode; className?: string }) {
  return <ExcelTableCellClient className={className}>{children}</ExcelTableCellClient>
}