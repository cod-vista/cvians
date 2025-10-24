"use client"

import {
  ExcelTable,
  ExcelTableBody,
  ExcelTableCell,
  ExcelTableHead,
  ExcelTableHeader,
  ExcelTableRow
} from "@codvista/cvians-core"

const sampleData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    status: "Active",
    dateAdded: "2024-01-15" // Using ISO date format
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    age: 25,
    status: "Inactive",
    dateAdded: "2024-02-10"
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    age: 35,
    status: "Active",
    dateAdded: "2024-01-20"
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    age: 28,
    status: "Pending",
    dateAdded: "2024-03-05"
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    age: 42,
    status: "Active",
    dateAdded: "2024-03-12"
  },
  {
    id: 6,
    name: "Diana Davis",
    email: "diana@example.com",
    age: 31,
    status: "Inactive",
    dateAdded: "2024-02-28"
  },
]

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🚀 Cvians Excel Table v2.1.2</h1>
        <p className="text-gray-600 mb-4">
          Excel-style table with hierarchical date filtering, sorting, and type-aware filtering
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">✨ Try the Excel-Style Date Filter!</h3>
          <p className="text-blue-700 text-sm mb-2">
            Click the filter icon (🔽) in the "📅 Date Added" column to see the hierarchical date filtering:
          </p>
          <ul className="text-blue-700 text-sm space-y-1 ml-4">
            <li>📁 <strong>Dates Tab:</strong> Year → Month → Day hierarchy with checkboxes</li>
            <li>⚡ <strong>Quick Tab:</strong> Today, This Week, This Month, etc.</li>
            <li>🎯 <strong>Custom Tab:</strong> Before, After, Between date ranges</li>
          </ul>
        </div>
      </div>

      <ExcelTable>
        <ExcelTableHeader>
          <ExcelTableRow>
            <ExcelTableHead sortable dataType="number">ID</ExcelTableHead>
            <ExcelTableHead filterable sortable dataType="string">👤 Name</ExcelTableHead>
            <ExcelTableHead filterable sortable dataType="string">📧 Email</ExcelTableHead>
            <ExcelTableHead filterable sortable dataType="number">🎂 Age</ExcelTableHead>
            <ExcelTableHead filterable sortable dataType="string">📊 Status</ExcelTableHead>
            <ExcelTableHead
              filterable
              sortable
              dataType="date"
              className="bg-yellow-50 border-yellow-200"
            >
              📅 Date Added
            </ExcelTableHead>
          </ExcelTableRow>
        </ExcelTableHeader>
        <ExcelTableBody>
          {sampleData.map((row) => (
            <ExcelTableRow key={row.id}>
              <ExcelTableCell>{row.id}</ExcelTableCell>
              <ExcelTableCell>{row.name}</ExcelTableCell>
              <ExcelTableCell>{row.email}</ExcelTableCell>
              <ExcelTableCell>{row.age}</ExcelTableCell>
              <ExcelTableCell>{row.status}</ExcelTableCell>
              <ExcelTableCell>{row.dateAdded}</ExcelTableCell>
            </ExcelTableRow>
          ))}
        </ExcelTableBody>
      </ExcelTable>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">🧪 Test Features:</h3>
        <ul className="text-sm space-y-1">
          <li>✅ <strong>Date Filtering:</strong> Click 📅 Date Added filter for hierarchical options</li>
          <li>✅ <strong>String Filtering:</strong> Click 👤 Name filter for checkbox selection</li>
          <li>✅ <strong>Number Filtering:</strong> Click 🎂 Age filter for value selection</li>
          <li>✅ <strong>Sorting:</strong> Click any column header to sort</li>
          <li>✅ <strong>Multi-filtering:</strong> Apply multiple filters simultaneously</li>
        </ul>
      </div>
    </div>
  )
}