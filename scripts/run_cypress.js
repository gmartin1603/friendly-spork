const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const path = require('path');

const REPORT_DIR = './cypress/report';
const reportDir = './cypress/report/mochawesome-report';

// Read environment configuration
const envFilePath = path.join(__dirname, '../cypress.env.json');
let CYPRESS_ENV;
try {
  CYPRESS_ENV = JSON.parse(fs.readFileSync(envFilePath, 'utf8'));
} catch (err) {
  console.error(`Failed to read or parse cypress.env.json: ${err}`);
  process.exit(1);
}

const customer = "mvp-release";

// Parse command line arguments
let user = process.argv[2] || "admin";
user = user.toLowerCase().replace(/ /g, "_");

let headed = process.argv[3];
headed = (headed && headed.toLowerCase().includes("headed")) ? "--headed" : "";

// Function to determine the spec string based on customer and user
function determineSpec(customer, user) {
  return `./cypress/e2e/mvp-release/**/*`;
  if (customer === "") {
    return "";
  } else if (!CYPRESS_ENV[customer]) {
    console.error(" * Customer not found in cypress.env.json");
    return "";
  }

  let tests = CYPRESS_ENV[customer]['tests'] || [];

  if (user === "PORTAL_ADMIN") {
    tests.push("users/portal_admin");
  }

  console.log("\n - " + customer.toUpperCase() + " Tests: ", tests);
  return tests.map(test => `./cypress/e2e/mvp-release/${test}/*`).join(",");
}

function cleanUpReports() {
  if (fs.existsSync(REPORT_DIR)) {
    fs.rmSync(REPORT_DIR, { recursive: true, force: true });
    console.log('\n - Old report files cleaned up. \n');
  }
}

async function updateCypressEnv(user) {
  let envConfig = { ...CYPRESS_ENV, user };
  try {
    fs.writeFileSync(envFilePath, JSON.stringify(envConfig, null, 4), 'utf8');
    console.log("\n - cypress.env.json updated for user: " + user);
  } catch (error) {
    throw new Error(`Failed to update cypress.env.json: ${error}`);
  }
}

async function runCommand(command, timeout = 5000) {
  try {
    const { stdout } = await exec(command, { timeout });
    return stdout;
  } catch (error) {
    // Check if the failure is due to test failures or an actual error
    if (fs.existsSync(reportDir) && fs.readdirSync(reportDir).length > 0) {
      // If report files exist, consider it a test failure, not a script error
      console.log("Tests completed with failures.");
      return; // Return normally, indicating that the process should continue
    } else {
      // If no report files exist, it's an actual error in the script or execution environment
      throw new Error(`Error in command ${command}: ${error}`);
    }
  }
}


async function runCypressTests() {
  try {
    await updateCypressEnv(user);
    cleanUpReports();
    const specString = determineSpec(customer, user);

    const cypressCommand = `npx cypress run ${headed} --browser chrome --spec "${specString}"`;
    console.log("\n - Cypress is running: ", cypressCommand, "\n");
    await runCommand(cypressCommand, 1200000); // 20 minutes timeout

    if (fs.existsSync(reportDir)) {
      await runCommand(`mochawesome-merge ${reportDir}/*.json > ${REPORT_DIR}/result_index.json`);
      await runCommand(`marge ${REPORT_DIR}/result_index.json -f result_report -o ${REPORT_DIR} --encoding utf-8`);
      console.log("\n**************************************************************************************");
      console.log("*   The report has been generated, please open ./cypress/report/result_index.html    *");
      console.log("**************************************************************************************\n");
    }
  } catch (error) {
    console.error('An error occurred during the test process:', error);
    process.exit(1);
  }
}

runCypressTests();
