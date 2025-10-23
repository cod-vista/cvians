// Simple test file to verify the package works locally
import React from 'react';
import { createRoot } from 'react-dom/client';

// Use local build
const { ExcelTable } = require('../packages/core/dist/index.js');

const testData = [
  { name: 'John Doe', age: 30, city: 'New York', active: true },
  { name: 'Jane Smith', age: 25, city: 'San Francisco', active: false },
  { name: 'Bob Johnson', age: 35, city: 'Chicago', active: true },
];

function TestApp() {
  return React.createElement('div', { style: { padding: '20px' } },
    React.createElement('h1', null, 'Cvians Excel Table Test'),
    React.createElement(ExcelTable, { data: testData })
  );
}

// This is just a test to check if the component can be imported without errors
console.log('ExcelTable component:', ExcelTable);
console.log('Test completed successfully!');