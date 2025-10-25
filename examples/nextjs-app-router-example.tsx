// Next.js App Router Component Example
// This demonstrates how to use the Cvians Excel Table in a Next.js app
// with proper server-side rendering support

import { ExcelTable, ExcelTableHeader, ExcelTableHead, ExcelTableBody, ExcelTableRow, ExcelTableCell } from '@codvista/cvians-excel-table'

// Sample data
const products = [
  { id: 1, name: 'MacBook Pro', price: 2499, category: 'Electronics', inStock: true },
  { id: 2, name: 'Dell XPS 13', price: 1299, category: 'Electronics', inStock: false },
  { id: 3, name: 'Coffee Mug', price: 15, category: 'Kitchen', inStock: true },
  { id: 4, name: 'React Handbook', price: 29, category: 'Books', inStock: true },
  { id: 5, name: 'Wireless Mouse', price: 45, category: 'Electronics', inStock: true }
]

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Product Inventory</h1>
      
      <ExcelTable className="w-full">
        <ExcelTableHeader>
          <ExcelTableRow>
            <ExcelTableHead 
              filterable 
              sortable 
              dataType="string"
            >
              Product Name
            </ExcelTableHead>
            <ExcelTableHead 
              filterable 
              sortable 
              dataType="number"
            >
              Price ($)
            </ExcelTableHead>
            <ExcelTableHead 
              filterable 
              sortable 
              dataType="string"
            >
              Category
            </ExcelTableHead>
            <ExcelTableHead 
              filterable 
              sortable 
              dataType="boolean"
            >
              In Stock
            </ExcelTableHead>
          </ExcelTableRow>
        </ExcelTableHeader>
        <ExcelTableBody>
          {products.map((product) => (
            <ExcelTableRow key={product.id}>
              <ExcelTableCell>{product.name}</ExcelTableCell>
              <ExcelTableCell>{product.price}</ExcelTableCell>
              <ExcelTableCell>{product.category}</ExcelTableCell>
              <ExcelTableCell>{product.inStock ? 'Yes' : 'No'}</ExcelTableCell>
            </ExcelTableRow>
          ))}
        </ExcelTableBody>
      </ExcelTable>
      
      <div className="mt-6 text-sm text-gray-600">
        <p>✅ This component now works seamlessly in Next.js App Router</p>
        <p>✅ No more createContext server-side rendering errors</p>
        <p>✅ Full Excel-like filtering and sorting functionality</p>
        <p>✅ Type-aware data handling (string, number, date, boolean)</p>
      </div>
    </div>
  )
}

// Usage in Next.js app/page.tsx:
// Simply import and use - no special configuration needed!