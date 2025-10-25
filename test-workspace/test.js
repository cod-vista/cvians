// Test script to reproduce the React createContext issue
import React from 'react';

// Try to import the built package
try {
  console.log('Testing React import...');
  console.log('React.createContext:', typeof React.createContext);
  
  // Simulate the import that's failing
  const createContext = React.createContext;
  console.log('createContext function:', typeof createContext);
  
  if (typeof createContext !== 'function') {
    throw new Error('createContext is not a function');
  }
  
  // Test creating a context
  const TestContext = createContext(null);
  console.log('Context created successfully:', TestContext);
  
  console.log('✅ React createContext test passed');
  
} catch (error) {
  console.error('❌ React createContext test failed:', error.message);
  process.exit(1);
}

// Now try to import our package
try {
  console.log('\nTesting package import...');
  
  // Import the local built package
  const packagePath = '../packages/excel-table/dist/index.js';
  const { ExcelTable } = await import(packagePath);
  
  console.log('✅ Package imported successfully');
  console.log('ExcelTable:', typeof ExcelTable);
  
} catch (error) {
  console.error('❌ Package import failed:', error.message);
  console.error('Stack:', error.stack);
  process.exit(1);
}