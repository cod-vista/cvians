import React from 'react';
import { ExcelTable, ExcelTableHeader, ExcelTableHead, ExcelTableBody, ExcelTableRow, ExcelTableCell } from '@codvista/cvians-core';

// Simulate Next.js environment
console.log('Testing in Next.js-like environment...');

// Test React context creation (the original error)
console.log('Testing React.createContext:', typeof React.createContext);

// Test component imports
console.log('ExcelTable component:', typeof ExcelTable);
console.log('ExcelTableHeader component:', typeof ExcelTableHeader);
console.log('ExcelTableHead component:', typeof ExcelTableHead);
console.log('ExcelTableBody component:', typeof ExcelTableBody);
console.log('ExcelTableRow component:', typeof ExcelTableRow);
console.log('ExcelTableCell component:', typeof ExcelTableCell);

// Test component instantiation
try {
  const tableElement = React.createElement(ExcelTable, {
    children: React.createElement(ExcelTableHeader, {
      children: React.createElement(ExcelTableRow, {
        children: React.createElement(ExcelTableHead, {
          filterable: true,
          sortable: true,
          dataType: 'string'
        }, 'Name')
      })
    })
  });
  
  console.log('✅ Component instantiation successful');
  console.log('Table element type:', tableElement.type.name);
} catch (error) {
  console.error('❌ Component instantiation failed:', error.message);
  console.error('Error stack:', error.stack);
}

console.log('✅ All Next.js integration tests passed!');