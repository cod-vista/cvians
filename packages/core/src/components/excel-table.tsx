"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode, Children, isValidElement } from 'react'
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/table'
import { cn } from '../lib/utils'

// Types
export type DataType = 'string' | 'number' | 'date' | 'boolean'
export type SortDirection = 'asc' | 'desc' | null

interface TableContextType {
  filters: Record<string, string[]>
  sorts: Record<string, SortDirection>
  setFilter: (column: string, values: string[]) => void
  setSort: (column: string, direction: SortDirection) => void
  registerColumn: (column: string, dataType: DataType) => void
  getFilteredAndSortedData: () => ReactNode[]
  rawRows: ReactNode[]
  setRawRows: (rows: ReactNode[]) => void
  columnTypes: Record<string, DataType>
  headerRefs: Record<string, HTMLElement>
  setHeaderRef: (index: string, element: HTMLElement) => void
}

const TableContext = createContext<TableContextType | null>(null)

// Utility function to extract cell value
const extractCellValue = (cell: ReactNode, dataType: DataType): string | number | boolean | Date => {
  if (typeof cell === 'string' || typeof cell === 'number') {
    const content = cell
    switch (dataType) {
      case 'number':
        return parseFloat(String(content)) || 0
      case 'date':
        return new Date(String(content))
      case 'boolean':
        return String(content) === 'true' || String(content) === '1'
      default:
        return String(content)
    }
  }
  
  if (isValidElement(cell) && cell.props.children) {
    const content = cell.props.children
    if (typeof content === 'string' || typeof content === 'number') {
      switch (dataType) {
        case 'number':
          return parseFloat(String(content)) || 0
        case 'date':
          return new Date(String(content))
        case 'boolean':
          return String(content) === 'true' || String(content) === '1'
        default:
          return String(content)
      }
    }
  }
  return ''
}

// Main ExcelTable Component
interface ExcelTableProps {
  children: ReactNode
  className?: string
}

export function ExcelTable({ children, className }: ExcelTableProps) {
  const [filters, setFilters] = useState<Record<string, string[]>>({})
  const [sorts, setSorts] = useState<Record<string, SortDirection>>({})
  const [columnTypes, setColumnTypes] = useState<Record<string, DataType>>({})
  const [rawRows, setRawRows] = useState<ReactNode[]>([])
  const [headerRefs, setHeaderRefs] = useState<Record<string, HTMLElement>>({})

  const setFilter = (column: string, values: string[]) => {
    setFilters(prev => ({ ...prev, [column]: values }))
  }

  const setSort = (column: string, direction: SortDirection) => {
    setSorts(prev => ({ ...prev, [column]: direction }))
  }

  const registerColumn = (column: string, dataType: DataType) => {
    setColumnTypes(prev => ({ ...prev, [column]: dataType }))
  }

  const setHeaderRef = (index: string, element: HTMLElement) => {
    setHeaderRefs(prev => ({ ...prev, [index]: element }))
  }

  const getFilteredAndSortedData = (): ReactNode[] => {
    let processedRows = [...rawRows]

    // Apply filters
    Object.entries(filters).forEach(([columnIndex, filterValues]) => {
      if (filterValues.length === 0) return

      processedRows = processedRows.filter(row => {
        if (!isValidElement(row)) return true
        
        const cells = Children.toArray(row.props.children)
        const cellValue = extractCellValue(cells[parseInt(columnIndex)], columnTypes[columnIndex] || 'string')
        
        return filterValues.includes(String(cellValue))
      })
    })

    // Apply sorting
    const sortEntries = Object.entries(sorts).filter(([, direction]) => direction !== null)
    if (sortEntries.length > 0) {
      const [columnIndex, direction] = sortEntries[sortEntries.length - 1]
      
      processedRows.sort((a, b) => {
        if (!isValidElement(a) || !isValidElement(b)) return 0
        
        const aCells = Children.toArray(a.props.children)
        const bCells = Children.toArray(b.props.children)
        
        const aValue = extractCellValue(aCells[parseInt(columnIndex)], columnTypes[columnIndex] || 'string')
        const bValue = extractCellValue(bCells[parseInt(columnIndex)], columnTypes[columnIndex] || 'string')
        
        let comparison = 0
        if (aValue < bValue) comparison = -1
        else if (aValue > bValue) comparison = 1
        
        return direction === 'desc' ? -comparison : comparison
      })
    }

    return processedRows
  }

  const contextValue: TableContextType = {
    filters,
    sorts,
    setFilter,
    setSort,
    registerColumn,
    getFilteredAndSortedData,
    rawRows,
    setRawRows,
    columnTypes,
    headerRefs,
    setHeaderRef
  }

  return (
    <TableContext.Provider value={contextValue}>
      <div className={cn("rounded-md border", className)}>
        <Table>
          {children}
        </Table>
      </div>
    </TableContext.Provider>
  )
}

// ExcelTableHeader Component
interface ExcelTableHeaderProps {
  children: ReactNode
  className?: string
}

export function ExcelTableHeader({ children, className }: ExcelTableHeaderProps) {
  return (
    <TableHeader className={className}>
      {children}
    </TableHeader>
  )
}

// ExcelTableHead Component
interface ExcelTableHeadProps {
  children: ReactNode
  filterable?: boolean
  sortable?: boolean
  dataType?: DataType
  className?: string
}

export function ExcelTableHead({ 
  children, 
  filterable = false, 
  sortable = false, 
  dataType = 'string',
  className 
}: ExcelTableHeadProps) {
  const context = useContext(TableContext)
  const [columnIndex, setColumnIndex] = useState<string>('')
  const [uniqueValues, setUniqueValues] = useState<string[]>([])
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [headerElement, setHeaderElement] = useState<HTMLElement | null>(null)

  // Find column index dynamically
  useEffect(() => {
    if (!context || !headerElement) return
    
    const headerRow = headerElement.parentElement
    if (headerRow) {
      const headers = Array.from(headerRow.children) as HTMLElement[]
      const index = headers.indexOf(headerElement).toString()
      setColumnIndex(index)
      context.registerColumn(index, dataType)
      context.setHeaderRef(index, headerElement)
    }
  }, [headerElement, dataType, context])

  // Extract unique values for filtering
  useEffect(() => {
    if (!context || !columnIndex || context.rawRows.length === 0) return
    
    const values = new Set<string>()
    context.rawRows.forEach(row => {
      if (isValidElement(row)) {
        const cells = Children.toArray(row.props.children)
        const cellValue = extractCellValue(cells[parseInt(columnIndex)], dataType)
        values.add(String(cellValue))
      }
    })
    setUniqueValues(Array.from(values).sort())
  }, [context?.rawRows, columnIndex, dataType, context])

  const handleSort = (direction: SortDirection) => {
    if (!context || !columnIndex) return
    context.setSort(columnIndex, direction)
  }

  const handleFilter = () => {
    if (!context || !columnIndex) return
    context.setFilter(columnIndex, selectedFilters)
    setIsPopoverOpen(false)
  }

  const clearFilter = () => {
    if (!context || !columnIndex) return
    setSelectedFilters([])
    context.setFilter(columnIndex, [])
  }

  const currentSort = context?.sorts[columnIndex]
  const hasActiveFilter = (context?.filters[columnIndex]?.length ?? 0) > 0

  return (
    <TableHead 
      ref={setHeaderElement}
      className={className}
    >
      <div className="flex items-center space-x-2">
        <span>{children}</span>
        
        {(filterable || sortable) && (
          <div className="flex items-center space-x-1">
            {sortable && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => handleSort(currentSort === 'asc' ? 'desc' : 'asc')}
              >
                {currentSort === 'asc' ? (
                  <ChevronUp className="h-3 w-3" />
                ) : currentSort === 'desc' ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3 opacity-50" />
                )}
              </Button>
            )}
            
            {filterable && (
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-6 w-6 p-0",
                      hasActiveFilter && "text-blue-600"
                    )}
                  >
                    <Filter className="h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0">
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Filter</h4>
                      {hasActiveFilter && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilter}
                          className="h-6 px-2"
                        >
                          <X className="h-3 w-3" />
                          Clear
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {uniqueValues.map(value => (
                        <div key={value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`filter-${value}`}
                            checked={selectedFilters.includes(value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFilters(prev => [...prev, value])
                              } else {
                                setSelectedFilters(prev => prev.filter(v => v !== value))
                              }
                            }}
                          />
                          <label
                            htmlFor={`filter-${value}`}
                            className="text-sm cursor-pointer flex-1 truncate"
                          >
                            {value || '(Empty)'}
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2 mt-3 pt-3 border-t">
                      <Button
                        size="sm"
                        onClick={handleFilter}
                        className="flex-1"
                      >
                        Apply
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsPopoverOpen(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        )}
      </div>
    </TableHead>
  )
}

// ExcelTableBody Component
interface ExcelTableBodyProps {
  children: ReactNode
  className?: string
}

export function ExcelTableBody({ children, className }: ExcelTableBodyProps) {
  const context = useContext(TableContext)
  
  useEffect(() => {
    if (context) {
      const rows = Children.toArray(children)
      context.setRawRows(rows)
    }
  }, [children, context])

  if (!context) return null

  const processedRows = context.getFilteredAndSortedData()

  return (
    <TableBody className={className}>
      {processedRows}
    </TableBody>
  )
}

// ExcelTableRow Component
interface ExcelTableRowProps {
  children: ReactNode
  className?: string
}

export function ExcelTableRow({ children, className }: ExcelTableRowProps) {
  return (
    <TableRow className={className}>
      {children}
    </TableRow>
  )
}

// ExcelTableCell Component
interface ExcelTableCellProps {
  children: ReactNode
  className?: string
}

export function ExcelTableCell({ children, className }: ExcelTableCellProps) {
  return (
    <TableCell className={className}>
      {children}
    </TableCell>
  )
}

// Export all components