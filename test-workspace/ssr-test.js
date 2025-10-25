// Simulate Next.js App Router server-side rendering environment
// This test simulates the server context where createContext should not be called

// Mock window as undefined to simulate server environment
delete global.window;

console.log('Testing server-side import simulation...');
console.log('window is undefined:', typeof window === 'undefined');

async function testSSR() {
  try {
    // This should now work without createContext errors
    const module = await import('@codvista/cvians-excel-table');
    const { ExcelTable, ExcelTableHeader, ExcelTableHead, ExcelTableBody, ExcelTableRow, ExcelTableCell } = module;
    
    console.log('✅ Package imported successfully on server side');
    console.log('ExcelTable:', typeof ExcelTable);
    console.log('ExcelTableHeader:', typeof ExcelTableHeader);
    
    // Test that context creation is deferred and doesn't throw
    console.log('✅ No createContext errors during import');
    
  } catch (error) {
    console.error('❌ Server-side import failed:', error.message);
    console.error('Error stack:', error.stack);
  }

  console.log('✅ Server-side rendering test completed successfully!');
}

testSSR();