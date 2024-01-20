const fs = require('fs');
const util = require('util');
const execPromise = util.promisify(require('child_process').exec);
const { exec } = require('child_process');
const path = require('path');
const CYPRESS_ENV = require('../cypress.env.json');

const REPORT_DIR = './cypress/report';
const reportDir = './cypress/report/mochawesome-report';

process.stdout.write("\n");
process.stdout.write("\n < =============================== TESTING STARTED ============================= >");
process.stdout.write("\n");

// Function to determine the spec string based on customer and user
function determineSpec(customer, user) {
  // console.log(CYPRESS_ENV[customer]);
  return `./cypress/e2e/mvp-release/**/*`
  if (customer === "") {
    return;
  } else if (CYPRESS_ENV[customer] == undefined) {
    console.error(" * Customer not found in cypress.env.json");
    return;
  }

  let tests = CYPRESS_ENV[customer]['tests'];

  if (user === "PORTAL_ADMIN") {
    tests.push("users/portal_admin");
    
  }
  console.log("\n - " + customer.toUpperCase() + " Tests: ", tests);
  let str = "";
  for (let i = 0; i < tests.length; i++) {
    str += `./cypress/e2e/mvp-release/${tests[i]}/*`;
    if (i != tests.length - 1) {
      str += ",";
    }
  }
  return str;
}

function cleanUpReports() {
  try {
    if (fs.existsSync(REPORT_DIR)) {
      fs.rmSync(REPORT_DIR, { recursive: true, force: true });
      process.stdout.write('\n - Old report files cleaned up. \n');
    }
  } catch (error) {
    console.error('Error cleaning up old report files:', error);
  }
}

const customer = "mvp-release"

// Parse command line arguments
// if (customer == undefined) {
//   console.error(" * A customer name is required as the first argument");
//   customer = "";
// } else {
//   customer = customer.toLowerCase().replace(/ /g, "_");
// }

// Set default user if not provided otherwise user.toUpperCase()
let user = process.argv[2];
// user = "ADMIN"
if (user == undefined) {
  user = "admin";
} else {
  user = user.toLowerCase().replace(/ /g, "_");
}

let headed = process.argv[3]
// headed = "--headed"
if (headed == undefined) {
  headed = "";
} else {
  headed = headed.toLowerCase().includes("headed") ? "--headed" : "";
}

// console.log(" - Updating cypress.env.json for customer: " + customer + " and user: " + user);
// console.log("\n");
// // Path to cypress.env.json
// const envFilePath = path.join(__dirname, 'cypress.env.json');

// // Read cypress.env.json and update it
// fs.readFile(envFilePath, 'utf8', (err, data) => {
//   if (err) {
//     console.error(`Error reading cypress.env.json: ${err}`);
//     return;
//   }

//   let envConfig = {};
//   try {
//     envConfig = JSON.parse(data);
//   } catch (parseErr) {
//     console.error(`Error parsing cypress.env.json: ${parseErr}`);
//     return;
//   }

//   // Update envConfig with new values
//   envConfig['client'] = customer;
//   envConfig['testUser'] = user;

//   // Write updated config back to cypress.env.json
//   fs.writeFile(envFilePath, JSON.stringify(envConfig, null, 4), 'utf8', (writeErr) => {
//     if (writeErr) {
//       console.error(`Error writing to cypress.env.json: ${writeErr}`);
//       return;
//     }

//     // Run Cypress tests after updating the env file
    runCypressTests();
//   });
// });


// Function to run Cypress tests
async function runCypressTests() {
  // Get the spec string
  cleanUpReports();
  const specString = determineSpec(customer, user);

  // Construct the Cypress command
  // const cypressCommand = `npx cypress run --reporter mochawesome --browser chrome --spec "${specString}"`;
  const cypressCommand = `npx cypress run ${headed} --browser chrome --spec "${specString}"`;

  console.log("\n")
  console.log(" - Cypress is running: ", cypressCommand);
  console.log("\n")
  // Start a timer to log that the tests are still running
  let counter = 0;
  let timerValue;
  let timer = setInterval(() => {
    counter += 5;
    let secondsValue = counter % 60 + " seconds";
    let minuteValue = Math.floor(counter / 60) === 1 ? Math.floor(counter / 60) + " minute and " + secondsValue : Math.floor(counter / 60) + " minutes and " + secondsValue;
    timerValue = counter > 60 ? minuteValue : counter + " seconds";
    process.stdout.write(`\r - Cypress tests have been running for ${timerValue}`);
  }, 5000);
  // Execute the Cypress command
  await execPromise(cypressCommand, { timeout: 1200000 })
    .catch((err) => {
      // process.stderr.write("\n * EXECUTION ERROR: ", err);
    })
    .finally(() => {
      // Clear the timer
      clearInterval(timer);

      // console.log("\n #timerValue: ", timerValue);
      console.log("\r")
      console.log("\n - Cypress tests completed in " + timerValue);
      process.stdout.write("\n");
      

      if (fs.existsSync(reportDir)) {
        const mergeCommand = `mochawesome-merge ./cypress/report/mochawesome-report/*.json > ./cypress/report/result_index.json`
        exec(mergeCommand, (mergeErr, mergeStdout, mergeStderr) => {
          if (mergeErr) {
            console.error(`Merge error: ${mergeErr}`);
            return;
          } else {
            process.stdout.write("\n - MERGE SUCCESSFUL, Building HTML Report\n");
            const reportCommand = `marge ./cypress/report/result_index.json -f result_report -o ./cypress/report --inline --encoding utf-8`
            exec(reportCommand, (reportErr, reportStdout, reportStderr) => {
              if (reportStderr) {
                process.stderr.write("\nREPORT STDERR: ", reportStderr);
              } else {
                if (reportErr) {
                  process.stderr.write("REPORT ERROR: ", reportErr);
                } else {
                  // process.stdout.write("\nREPORT STDOUT: ", reportStdout);
                  process.stdout.write("\n");
                  process.stdout.write("\n**************************************************************************************");
                  process.stdout.write("\n*   The report has been generated, please open ./cypress/report/result_index.html    *");
                  process.stdout.write("\n**************************************************************************************");
                  process.stdout.write("\n");
                } 
              }
            });

          }
        });
      }
    });
}