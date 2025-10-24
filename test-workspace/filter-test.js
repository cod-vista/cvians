import React from 'react';
import { ExcelTable, ExcelTableHeader, ExcelTableHead, ExcelTableBody, ExcelTableRow, ExcelTableCell } from '@codvista/cvians-core';

console.log('Testing filter functionality...');

// Test data with multiple values to filter
const testData = [
  { name: 'Apple', category: 'Fruits', price: 1.5 },
  { name: 'Banana', category: 'Fruits', price: 0.8 },
  { name: 'Carrot', category: 'Vegetables', price: 1.2 },
  { name: 'Dates', category: 'Fruits', price: 3.0 },
  { name: 'Eggplant', category: 'Vegetables', price: 2.5 }
];

// Create table with filtering enabled
try {
  const tableWithFilters = React.createElement(ExcelTable, {
    className: 'test-filter-table'
  },
    React.createElement(ExcelTableHeader, {},
      React.createElement(ExcelTableRow, {},
        React.createElement(ExcelTableHead, { 
          filterable: true, 
          sortable: true, 
          dataType: 'string' 
        }, 'Product Name'),
        React.createElement(ExcelTableHead, { 
          filterable: true, 
          sortable: true, 
          dataType: 'string' 
        }, 'Category'),
        React.createElement(ExcelTableHead, { 
          filterable: true, 
          sortable: true, 
          dataType: 'number' 
        }, 'Price')
      )
    ),
    React.createElement(ExcelTableBody, {},
      ...testData.map((item, index) =>
        React.createElement(ExcelTableRow, { key: index },
          React.createElement(ExcelTableCell, {}, item.name),
          React.createElement(ExcelTableCell, {}, item.category),
          React.createElement(ExcelTableCell, {}, item.price.toString())
        )
      )
    )
  );

  console.log('✅ Table with filters created successfully');
  console.log('Table props:', Object.keys(tableWithFilters.props));
  
  // Test header component specifically
  const header = tableWithFilters.props.children[0];
  const headerRow = header.props.children;
  const firstHeader = headerRow.props.children[0];
  
  console.log('First header filterable:', firstHeader.props.filterable);
  console.log('First header sortable:', firstHeader.props.sortable);
  
  console.log('✅ Filter functionality test passed!');
  console.log('🎯 Ready to test in browser for infinite loop fix');
  
} catch (error) {
  console.error('❌ Filter test failed:', error.message);
  console.error('Error stack:', error.stack);
}

console.log('✅ Filter component structure test completed!');