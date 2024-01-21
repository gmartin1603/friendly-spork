const fs = require('fs');
const path = require('path');
const core = require('@actions/core');

// Construct the absolute path to result_index.json
const resultIndexPath = path.join(__dirname, '..', 'cypress', 'report', 'result_index.json');

try {
  const results = JSON.parse(fs.readFileSync(resultIndexPath, 'utf8'));
  console.log('results:', results);
  // const failedTests = results.tests.filter(test => test.status === 'failed').length;
  const failedTests = results.stats.failures;

  core.setOutput("failed_tests", failedTests.toString());
} catch (error) {
  console.error('Error reading result_index.json:', error);
  process.exit(1);
}
