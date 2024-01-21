const fs = require('fs');
const path = require('path');

// Construct the absolute path to result_index.json
const resultIndexPath = path.join(__dirname, '..', 'cypress', 'report', 'result_index.json');

try {
  const results = JSON.parse(fs.readFileSync(resultIndexPath, 'utf8'));
  // const failedTests = results.tests.filter(test => test.status === 'failed').length;
  const failedTests = results.stats.failures > 0;

  core.setOutput("failed_tests", failedTests.toString());
} catch (error) {
  console.error('Error reading result_index.json:', error);
  process.exit(1);
}
