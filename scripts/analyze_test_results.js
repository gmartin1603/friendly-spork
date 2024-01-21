const fs = require('fs');
const core = require('@actions/core');

const results = JSON.parse(fs.readFileSync('path/to/result_index.json', 'utf8'));
const failedTests = results.tests.filter(test => test.status === 'failed').length;

core.setOutput("failed_tests", failedTests.toString());