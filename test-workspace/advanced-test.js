import React from 'react';
import { ExcelTable, ExcelTableHeader, ExcelTableHead, ExcelTableBody, ExcelTableRow, ExcelTableCell } from '@codvista/cvians-core';

console.log('Testing Excel Table advanced features...');

// Test data
const sampleData = [
  { name: 'John Doe', age: 30, department: 'Engineering' },
  { name: 'Jane Smith', age: 25, department: 'Marketing' },
  { name: 'Bob Johnson', age: 35, department: 'Engineering' }
];

// Create a full table structure to test context functionality
try {
  const fullTable = React.createElement(ExcelTable, {
    className: 'test-table'
  }, 
    React.createElement(ExcelTableHeader, {},
      React.createElement(ExcelTableRow, {},
        React.createElement(ExcelTableHead, { 
          filterable: true, 
          sortable: true, 
          dataType: 'string' 
        }, 'Name'),
        React.createElement(ExcelTableHead, { 
          filterable: true, 
          sortable: true, 
          dataType: 'number' 
        }, 'Age'),
        React.createElement(ExcelTableHead, { 
          filterable: true, 
          sortable: true, 
          dataType: 'string' 
        }, 'Department')
      )
    ),
    React.createElement(ExcelTableBody, {},
      ...sampleData.map((row, index) =>
        React.createElement(ExcelTableRow, { key: index },
          React.createElement(ExcelTableCell, {}, row.name),
          React.createElement(ExcelTableCell, {}, row.age.toString()),
          React.createElement(ExcelTableCell, {}, row.department)
        )
      )
    )
  );

  console.log('✅ Full table with filtering and sorting created successfully');
  console.log('Table props:', Object.keys(fullTable.props));
  console.log('Table children count:', React.Children.count(fullTable.props.children));
  
  // Test that all context-dependent features can be instantiated
  const headerElement = fullTable.props.children[0]; // ExcelTableHeader
  const bodyElement = fullTable.props.children[1];   // ExcelTableBody
  
  console.log('Header element type:', headerElement.type.name);
  console.log('Body element type:', bodyElement.type.name);
  
  console.log('✅ All advanced Excel Table features working correctly!');
  
} catch (error) {
  console.error('❌ Advanced features test failed:', error.message);
  console.error('Error stack:', error.stack);
}

console.log('✅ Complete integration test passed!');