// Complete Next.js App Router Example
// This component works WITHOUT requiring "use client" directive!

import { ExcelTable, ExcelTableHeader, ExcelTableHead, ExcelTableBody, ExcelTableRow, ExcelTableCell } from '@codvista/cvians-core'

const productsData = [
  { id: 1, name: 'MacBook Pro', price: 2499, category: 'Electronics', inStock: true },
  { id: 2, name: 'Dell XPS 13', price: 1299, category: 'Electronics', inStock: false },
  { id: 3, name: 'Coffee Mug', price: 15, category: 'Kitchen', inStock: true },
  { id: 4, name: 'React Handbook', price: 29, category: 'Books', inStock: true },
  { id: 5, name: 'Wireless Mouse', price: 45, category: 'Electronics', inStock: true },
  { id: 6, name: 'Desk Lamp', price: 35, category: 'Office', inStock: true },
  { id: 7, name: 'Python Guide', price: 39, category: 'Books', inStock: false },
  { id: 8, name: 'Gaming Keyboard', price: 120, category: 'Electronics', inStock: true }
]

// This is a regular React Server Component - no "use client" needed!
export default function ProductsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Product Inventory Dashboard</h1>
      
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
          {productsData.map((product) => (
            <ExcelTableRow key={product.id}>
              <ExcelTableCell>{product.name}</ExcelTableCell>
              <ExcelTableCell>{product.price}</ExcelTableCell>
              <ExcelTableCell>{product.category}</ExcelTableCell>
              <ExcelTableCell>{product.inStock ? 'Yes' : 'No'}</ExcelTableCell>
            </ExcelTableRow>
          ))}
        </ExcelTableBody>
      </ExcelTable>
      
      <div className="mt-6 space-y-2 text-sm text-gray-600">
        <p>✅ No "use client" directive required in this component</p>
        <p>✅ Works in Next.js App Router Server Components</p>
        <p>✅ Filter button infinite loop issue fixed</p>
        <p>✅ Full Excel-like filtering and sorting functionality</p>
        <p>✅ Multiple data types supported (string, number, boolean, date)</p>
        <p>🎯 Click filter buttons to test - no more infinite loops!</p>
      </div>
    </div>
  )
}

// Usage:
// Just import and use - works in Server Components!
// No special configuration or "use client" needed!