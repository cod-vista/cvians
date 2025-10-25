import React from 'react'
import {
  ExcelTable,
  ExcelTableHeader,
  ExcelTableHead,
  ExcelTableBody,
  ExcelTableRow,
  ExcelTableCell,
} from '@codvista/cvians-excel-table'

// Sample data for demonstration
const vehicles = [
  {
    id: 1,
    vehicleNo: "TRK-001",
    driver: "Mike Johnson",
    status: "Active",
    lastTrip: "2023-10-20",
    mileage: 45000,
    isOperational: true
  },
  {
    id: 2,
    vehicleNo: "TRK-002", 
    driver: null,
    status: "Inactive",
    lastTrip: "2023-10-15",
    mileage: 32000,
    isOperational: false
  },
  {
    id: 3,
    vehicleNo: "TRK-003",
    driver: "Sarah Davis",
    status: "Maintenance", 
    lastTrip: "2023-10-18",
    mileage: 67000,
    isOperational: false
  },
  {
    id: 4,
    vehicleNo: "TRK-004",
    driver: "Tom Wilson",
    status: "Active",
    lastTrip: "2023-10-22", 
    mileage: 23000,
    isOperational: true
  }
]

const employees = [
  {
    id: 1,
    name: "John Doe",
    department: "Engineering",
    salary: 75000,
    isActive: true,
    joinDate: "2023-01-15",
    performance: 4.5
  },
  {
    id: 2,
    name: "Jane Smith", 
    department: "Marketing",
    salary: 65000,
    isActive: true,
    joinDate: "2023-03-20",
    performance: 4.8
  },
  {
    id: 3,
    name: "Bob Johnson",
    department: "Engineering",
    salary: 80000,
    isActive: false,
    joinDate: "2022-11-10", 
    performance: 4.2
  }
]

// Basic Excel Table Example
export function BasicExample() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Basic Employee Table</h2>
      
      <ExcelTable>
        <ExcelTableHeader>
          <ExcelTableRow>
            <ExcelTableHead sortable dataType="number">
              ID
            </ExcelTableHead>
            <ExcelTableHead filterable sortable dataType="string">
              Name
            </ExcelTableHead>
            <ExcelTableHead filterable sortable dataType="string">
              Department
            </ExcelTableHead>
            <ExcelTableHead sortable dataType="number">
              Salary
            </ExcelTableHead>
            <ExcelTableHead filterable dataType="boolean">
              Active
            </ExcelTableHead>
            <ExcelTableHead sortable dataType="date">
              Join Date
            </ExcelTableHead>
          </ExcelTableRow>
        </ExcelTableHeader>
        <ExcelTableBody>
          {employees.map((employee) => (
            <ExcelTableRow key={employee.id}>
              <ExcelTableCell>{employee.id}</ExcelTableCell>
              <ExcelTableCell>{employee.name}</ExcelTableCell>
              <ExcelTableCell>{employee.department}</ExcelTableCell>
              <ExcelTableCell>${employee.salary.toLocaleString()}</ExcelTableCell>
              <ExcelTableCell>{employee.isActive ? 'true' : 'false'}</ExcelTableCell>
              <ExcelTableCell>{employee.joinDate}</ExcelTableCell>
            </ExcelTableRow>
          ))}
        </ExcelTableBody>
      </ExcelTable>
    </div>
  )
}

// Advanced Vehicle Management Example
export function VehicleManagementExample() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Vehicle Management Table</h2>
      
      <ExcelTable>
        <ExcelTableHeader>
          <ExcelTableRow>
            <ExcelTableHead filterable sortable dataType="string">
              Vehicle No
            </ExcelTableHead>
            <ExcelTableHead filterable sortable dataType="string">
              Driver
            </ExcelTableHead>
            <ExcelTableHead filterable dataType="string">
              Status
            </ExcelTableHead>
            <ExcelTableHead sortable dataType="date">
              Last Trip
            </ExcelTableHead>
            <ExcelTableHead sortable dataType="number">
              Mileage
            </ExcelTableHead>
            <ExcelTableHead filterable dataType="boolean">
              Operational
            </ExcelTableHead>
          </ExcelTableRow>
        </ExcelTableHeader>
        <ExcelTableBody>
          {vehicles.map((vehicle) => (
            <ExcelTableRow key={vehicle.id}>
              <ExcelTableCell>
                <span className="font-mono font-semibold">
                  {vehicle.vehicleNo}
                </span>
              </ExcelTableCell>
              <ExcelTableCell>
                {vehicle.driver || 'No Driver'}
              </ExcelTableCell>
              <ExcelTableCell>
                <span className={`px-2 py-1 rounded text-xs ${
                  vehicle.status === 'Active' 
                    ? 'bg-green-100 text-green-800'
                    : vehicle.status === 'Maintenance'
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {vehicle.status}
                </span>
              </ExcelTableCell>
              <ExcelTableCell>{vehicle.lastTrip}</ExcelTableCell>
              <ExcelTableCell>
                {vehicle.mileage.toLocaleString()} km
              </ExcelTableCell>
              <ExcelTableCell>
                {vehicle.isOperational ? 'true' : 'false'}
              </ExcelTableCell>
            </ExcelTableRow>
          ))}
        </ExcelTableBody>
      </ExcelTable>
    </div>
  )
}

// Minimal Example
export function MinimalExample() {
  const simpleData = [
    { id: 1, name: "Product A", price: 29.99, inStock: true },
    { id: 2, name: "Product B", price: 49.99, inStock: false },
    { id: 3, name: "Product C", price: 19.99, inStock: true },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Simple Product Table</h2>
      
      <ExcelTable className="max-w-md">
        <ExcelTableHeader>
          <ExcelTableRow>
            <ExcelTableHead sortable dataType="string">
              Product
            </ExcelTableHead>
            <ExcelTableHead sortable dataType="number">
              Price
            </ExcelTableHead>
            <ExcelTableHead filterable dataType="boolean">
              In Stock
            </ExcelTableHead>
          </ExcelTableRow>
        </ExcelTableHeader>
        <ExcelTableBody>
          {simpleData.map((item) => (
            <ExcelTableRow key={item.id}>
              <ExcelTableCell>{item.name}</ExcelTableCell>
              <ExcelTableCell>${item.price}</ExcelTableCell>
              <ExcelTableCell>{item.inStock ? 'true' : 'false'}</ExcelTableCell>
            </ExcelTableRow>
          ))}
        </ExcelTableBody>
      </ExcelTable>
    </div>
  )
}

// Main App Component
export default function App() {
  return (
    <div className="container mx-auto p-6 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Cvians UI Components Examples</h1>
        <p className="text-xl text-gray-600">
          Interactive examples showcasing Excel-like table functionality
        </p>
      </div>

      <BasicExample />
      <VehicleManagementExample />  
      <MinimalExample />

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li><strong>Filtering:</strong> Click the filter icon to filter by unique values</li>
          <li><strong>Sorting:</strong> Click the sort arrows to sort ascending/descending</li>
          <li><strong>Data Types:</strong> String, number, date, and boolean data types</li>
          <li><strong>Custom Styling:</strong> Full Tailwind CSS customization support</li>
          <li><strong>Framework Agnostic:</strong> Works with React and Preact</li>
        </ul>
      </div>
    </div>
  )
}