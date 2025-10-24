import React from 'react';
import { ExcelTable, ExcelTableHeader, ExcelTableHead, ExcelTableBody, ExcelTableRow, ExcelTableCell } from '@codvista/cvians-core';

console.log('Testing React import...');
console.log('React version:', React.version);
console.log('Testing Excel Table components...');

// Test data for the table
const testData = [
  { name: 'Apple', category: 'Fruits', price: 1.5 },
  { name: 'Banana', category: 'Fruits', price: 0.8 },
  { name: 'Carrot', category: 'Vegetables', price: 1.2 },
  { name: 'Dates', category: 'Fruits', price: 3.0 },
  { name: 'Eggplant', category: 'Vegetables', price: 2.5 }
];

function TestComponent() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Excel Table Test - Infinite Loop Fix</h1>
      <p>Testing filterable headers that previously caused infinite loops</p>
      
      <ExcelTable style={{ marginTop: '20px' }}>
        <ExcelTableHeader>
          <ExcelTableRow>
            <ExcelTableHead filterable sortable dataType="string">
              Product Name
            </ExcelTableHead>
            <ExcelTableHead filterable sortable dataType="string">
              Category
            </ExcelTableHead>
            <ExcelTableHead filterable sortable dataType="number">
              Price ($)
            </ExcelTableHead>
          </ExcelTableRow>
        </ExcelTableHeader>
        <ExcelTableBody>
          {testData.map((item, index) => (
            <ExcelTableRow key={index}>
              <ExcelTableCell>{item.name}</ExcelTableCell>
              <ExcelTableCell>{item.category}</ExcelTableCell>
              <ExcelTableCell>{item.price}</ExcelTableCell>
            </ExcelTableRow>
          ))}
        </ExcelTableBody>
      </ExcelTable>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <h3>Test Instructions:</h3>
        <p>1. ✅ Table should render without console errors</p>
        <p>2. ✅ Click on filter buttons - no infinite loops</p>
        <p>3. ✅ Sorting should work without warnings</p>
        <p>4. ✅ No "Maximum update depth exceeded" errors</p>
      </div>
    </div>
  );
}

export default TestComponent;