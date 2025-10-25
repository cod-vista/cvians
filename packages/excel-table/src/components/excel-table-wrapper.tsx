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

// Define proper interfaces that extend HTML element props
interface ExcelTableProps extends React.ComponentPropsWithoutRef<"table"> {
  children: ReactNode;
}

interface ExcelTableHeaderProps extends React.ComponentPropsWithoutRef<"th"> {
  children: ReactNode;
}

interface ExcelTableHeadProps extends React.ComponentPropsWithoutRef<"thead"> {
  children: ReactNode;
  filterable?: boolean;
  sortable?: boolean;
  dataType?: DataType;
}

interface ExcelTableBodyProps extends React.ComponentPropsWithoutRef<"tbody"> {
  children: ReactNode;
}

interface ExcelTableRowProps extends React.ComponentPropsWithoutRef<"tr"> {
  children: ReactNode;
}

interface ExcelTableCellProps extends React.ComponentPropsWithoutRef<"td"> {
  children: ReactNode;
}

// Create client-side wrapper components that can be imported without "use client"
export function ExcelTable({ children, ...props }: ExcelTableProps) {
  return <ExcelTableClient {...props}>{children}</ExcelTableClient>
}

export function ExcelTableHeader({ children, ...props }: ExcelTableHeaderProps) {
  return <ExcelTableHeaderClient {...props}>{children}</ExcelTableHeaderClient>
}

export function ExcelTableHead({ 
  children, 
  filterable = false, 
  sortable = false, 
  dataType = 'string' as DataType,
  ...props
}: ExcelTableHeadProps) {
  return (
    <ExcelTableHeadClient 
      filterable={filterable} 
      sortable={sortable} 
      dataType={dataType}
      {...props}
    >
      {children}
    </ExcelTableHeadClient>
  )
}

export function ExcelTableBody({ children, ...props }: ExcelTableBodyProps) {
  return <ExcelTableBodyClient {...props}>{children}</ExcelTableBodyClient>
}

export function ExcelTableRow({ children, ...props }: ExcelTableRowProps) {
  return <ExcelTableRowClient {...props}>{children}</ExcelTableRowClient>
}

export function ExcelTableCell({ children, ...props }: ExcelTableCellProps) {
  return <ExcelTableCellClient {...props}>{children}</ExcelTableCellClient>
}