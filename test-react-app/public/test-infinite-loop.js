// Test to verify infinite loop is fixed
console.log('Testing for infinite loops...');

// Create a test that monitors for rapid console warnings
let warningCount = 0;
const originalWarn = console.warn;
console.warn = function(...args) {
  warningCount++;
  if (args[0] && args[0].includes('Maximum update depth')) {
    console.error('❌ INFINITE LOOP DETECTED:', warningCount, 'warnings');
  }
  originalWarn.apply(console, args);
};

// Reset after 3 seconds
setTimeout(() => {
  console.warn = originalWarn;
  if (warningCount === 0) {
    console.log('✅ No infinite loop warnings detected!');
  } else if (warningCount < 10) {
    console.log('⚠️ Some warnings but no infinite loop');
  } else {
    console.log('❌ Possible infinite loop detected');
  }
  console.log('Total warning count:', warningCount);
}, 3000);